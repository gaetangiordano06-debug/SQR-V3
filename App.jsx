import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

// --- Coordonnées --- (⚡ personnalise ici)
const PHONE = "0123456789";
const WHATSAPP = "33612345678"; // format international sans + ni 0
const EMAIL = "contact@sur4roues.fr";

const base = import.meta.env.BASE_URL;
const logo = ${base}images/logo-sqr.jpg;

// ---- Inventaire ----
const VEHICULES = [
  { marque: "Fiat", modele: "Punto 1.2 ELX", annee: 2000, km: 151500, carburant: "Essence", prix: 3490, boite: "Manuelle", image: ${base}images/Fiat Punto 1.2 ELX.jpg },
  { marque: "Peugeot", modele: "206 CC Quiksilver 1.6 16v 110ch", annee: 2006, km: 155000, carburant: "Essence", prix: 4890, boite: "Manuelle", image: ${base}images/Peugeot 206 CC Quiksilver 1.6 16v 110ch.jpg },
  { marque: "Hyundai", modele: "i10 Clim", annee: 2008, km: 150000, carburant: "Essence", prix: 4990, boite: "Manuelle", image: ${base}images/Hyundai i10 Clim.jpg },
  { marque: "Audi", modele: "A4 Cabriolet V6 3.0 S-Line Quattro", annee: 2007, km: 255000, carburant: "Essence", prix: 9390, boite: "Manuelle", image: ${base}images/Audi A4 Cabriolet V6 3.0 S-Line Quattro.jpg },
  { marque: "Mercedes", modele: "C200 CDI 2.2 16v 122ch", annee: 2006, km: 226800, carburant: "Diesel", prix: 5990, boite: "Manuelle", image: ${base}images/Mercedes C200 CDI 2.2 16v 122ch.jpg },
  { marque: "Renault", modele: "Mégane 1.5 dCi 110ch G-Line", annee: 2012, km: 144900, carburant: "Diesel", prix: 7990, boite: "Manuelle", image: ${base}images/Renault Mégane 1.5 dCi 110ch G-Line.jpg },
  { marque: "Mini", modele: "Cooper SD", annee: 2012, km: 187800, carburant: "Diesel", prix: 9990, boite: "Manuelle", image: ${base}images/Mini Cooper SD.jpg },
  { marque: "Citroën", modele: "DS3 VTi 120 1.6", annee: 2010, km: 121000, carburant: "Essence", prix: 6990, boite: "Manuelle", image: ${base}images/Citroën DS3 VTi 120 1.6.jpg },
  { marque: "Volkswagen", modele: "up! 1.0 60ch", annee: 2017, km: 81000, carburant: "Essence", prix: 6490, boite: "Manuelle", image: ${base}images/Volkswagen up! 1.0 60ch.jpg },
  { marque: "Renault", modele: "Twingo 3", annee: 2013, km: 123400, carburant: "Diesel", prix: 6900, boite: "Manuelle", image: ${base}images/Renault Twingo 3.jpg },
  { marque: "Mercedes", modele: "Vito CDI 114", annee: 2017, km: 96000, carburant: "Diesel", prix: 18900, boite: "Manuelle", image: ${base}images/mercedes vito.jpg },
].map((v, i) => ({ id: ${v.marque}-${v.modele}-${v.annee}-${i}, ...v }));

const unique = (arr) => Array.from(new Set(arr));
const formatPrice = (eur) => eur.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
const formatKm = (km) => new Intl.NumberFormat("fr-FR").format(km) + " km";

export default function App() {
  const [query, setQuery] = useState("");
  const [marque, setMarque] = useState("Toutes");
  const [carburant, setCarburant] = useState("Tous");
  const [boite, setBoite] = useState("Toutes");
  const [prixMax, setPrixMax] = useState(Math.max(...VEHICULES.map(v => v.prix), 20000));
  const [tri, setTri] = useState("pertinence");

  const marques = useMemo(() => ["Toutes", ...unique(VEHICULES.map(v => v.marque)).sort()], []);
  const carburants = useMemo(() => ["Tous", ...unique(VEHICULES.map(v => v.carburant)).sort()], []);
  const boites = useMemo(() => ["Toutes", ...unique(VEHICULES.map(v => v.boite)).sort()], []);
  const prixHaut = useMemo(() => Math.max(...VEHICULES.map(v => v.prix), 20000), []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = VEHICULES.filter((v) => {
      const okQuery = !q ? true : [v.marque, v.modele, String(v.annee), v.carburant, v.boite].join(" ").toLowerCase().includes(q);
      const okMarque = marque === "Toutes" || v.marque === marque;
      const okCarb = carburant === "Tous" || v.carburant === carburant;
      const okBoite = boite === "Toutes" || v.boite === boite;
      const okPrix = v.prix <= prixMax;
      return okQuery && okMarque && okCarb && okBoite && okPrix;
    });
    switch (tri) {
      case "prix-asc": list.sort((a,b)=>a.prix-b.prix); break;
      case "prix-desc": list.sort((a,b)=>b.prix-a.prix); break;
      case "km-asc": list.sort((a,b)=>a.km-b.km); break;
      case "km-desc": list.sort((a,b)=>b.km-a.km); break;
      case "annee-desc": list.sort((a,b)=>b.annee-a.annee); break;
      default: break;
    }
    return list;
  }, [query, marque, carburant, boite, prixMax, tri]);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-20 backdrop-blur bg-white/80 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo SQR" className="w-10 h-10 rounded-full object-contain" />
            <span className="text-xl font-semibold tracking-tight">Sur 4 Roues</span>
          </div>
        </div>
      </header>

      {/* Recherche */}
      <section className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Trouvez votre prochain véhicule</h1>
          <p className="mt-2 text-gray-600 max-w-2xl">Parcourez notre sélection disponible.</p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-5">
              <input value={query} onChange={(e)=>setQuery(e.target.value)} className="w-full rounded-2xl border border-gray-200 px-4 py-3" placeholder="Marque, modèle, année..." />
            </div>
            <div className="md:col-span-2">
              <select value={marque} onChange={(e)=>setMarque(e.target.value)} className="w-full rounded-2xl border border-gray-200 px-4 py-3 bg-white">
                {marques.map((m)=>(<option key={m} value={m}>{m}</option>))}
              </select>
            </div>
            <div className="md:col-span-2">
              <select value={carburant} onChange={(e)=>setCarburant(e.target.value)} className="w-full rounded-2xl border border-gray-200 px-4 py-3 bg-white">
                {carburants.map((c)=>(<option key={c} value={c}>{c}</option>))}
              </select>
            </div>
            <div className="md:col-span-2">
              <select value={boite} onChange={(e)=>setBoite(e.target.value)} className="w-full rounded-2xl border border-gray-200 px-4 py-3 bg-white">
                {boites.map((b)=>(<option key={b} value={b}>{b}</option>))}
              </select>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            <div className="md:col-span-6">
              <label className="text-sm text-gray-600">Prix max : {formatPrice(prixMax)}</label>
              <input type="range" min={1000} max={prixHaut} step={250} value={prixMax} onChange={(e)=>setPrixMax(parseInt(e.target.value))} className="w-full" />
            </div>
            <div className="md:col-span-3">
              <select value={tri} onChange={(e)=>setTri(e.target.value)} className="w-full rounded-2xl border border-gray-200 px-4 py-3 bg-white">
                <option value="pertinence">Trier : Pertinence</option>
                <option value="prix-asc">Prix croissant</option>
                <option value="prix-desc">Prix décroissant</option>
                <option value="km-asc">Kilométrage croissant</option>
                <option value="km-desc">Kilométrage décroissant</option>
                <option value="annee-desc">Plus récents</option>
              </select>
            </div>
            <div className="md:col-span-3 text-right text-sm text-gray-600">
              {results.length} véhicule{results.length > 1 ? "s" : ""} trouvé{results.length > 1 ? "s" : ""}
            </div>
          </div>
        </div>
      </section>

      {/* Liste véhicules */}
      <section id="parc">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {results.length === 0 ? (
            <div className="text-center py-24">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-gray-100 grid place-items-center mb-4">🚗</div>
              <h3 className="text-xl font-semibold">Aucun véhicule ne correspond</h3>
              <p className="text-gray-600 mt-2">Essayez d'élargir vos filtres ou réinitialisez la recherche.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((v) => (
                <motion.article key={v.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-white">
                  <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                    <img src={v.image} alt={${v.marque} ${v.modele}} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-semibold">{v.marque} {v.modele} <span className="text-gray-500 font-normal">{v.annee}</span></h3>
                      <div className="text-right font-semibold">{formatPrice(v.prix)}</div>
                    </div>
                    <div className="mt-2 text-sm text-gray-600 flex justify-between">
                      <span>{formatKm(v.km)}</span>
                      <span>{v.carburant} • {v.boite}</span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}