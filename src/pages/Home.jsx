import React from "react";
import { motion } from "framer-motion";

const base = import.meta.env.BASE_URL || "/";

// Utils
const formatPrice = (p) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(p);
const formatKm = (k) => `${k.toLocaleString("fr-FR")} km`;
const unique = (arr) => Array.from(new Set(arr));

/* Lightbox */
function Lightbox({ photos, startIndex = 0, onClose }) {
  const [idx, setIdx] = React.useState(startIndex);
  const prev = React.useCallback(() => setIdx((i) => (i - 1 + photos.length) % photos.length), [photos.length]);
  const next = React.useCallback(() => setIdx((i) => (i + 1) % photos.length), [photos.length]);

  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, onClose]);

  if (!photos || photos.length === 0) return null;
  const onBackdropClick = (e) => { if (e.target === e.currentTarget) onClose?.(); };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50" onClick={onBackdropClick} role="dialog" aria-modal="true">
      <button onClick={onClose} className="absolute top-4 right-6 text-white text-3xl" aria-label="Fermer">✕</button>
      <button onClick={prev} className="absolute left-6 text-white text-3xl select-none" aria-label="Précédente">◀</button>
      <img src={photos[idx]} alt="" className="max-h-[90vh] max-w-[90vw] object-contain" />
      <button onClick={next} className="absolute right-6 text-white text-3xl select-none" aria-label="Suivante">▶</button>
    </div>
  );
}

/* Carte + mini-diaporama */
function VehicleCard({ v, onOpen }) {
  const [idx, setIdx] = React.useState(0);
  const photos = v.images ?? [];
  const hasPhotos = photos.length > 0;
  const img = hasPhotos ? photos[idx] : `${base}images/placeholder.jpg`;
  const prev = (e) => { e.stopPropagation(); if (!hasPhotos) return; setIdx(i => (i - 1 + photos.length) % photos.length); };
  const next = (e) => { e.stopPropagation(); if (!hasPhotos) return; setIdx(i => (i + 1) % photos.length); };

  return (
    <motion.article initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
      className="group rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-white">
      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
        <img src={img} alt={`${v.marque} ${v.modele}`} className="w-full h-full object-cover cursor-pointer" loading="lazy"
             onClick={() => onOpen(photos, idx)} />
        {hasPhotos && photos.length > 1 && (
          <>
            <button onClick={prev} aria-label="Précédente"
              className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity rounded-full bg-white/80 hover:bg-white backdrop-blur px-2.5 py-1.5 shadow">◀</button>
            <button onClick={next} aria-label="Suivante"
              className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity rounded-full bg-white/80 hover:bg-white backdrop-blur px-2.5 py-1.5 shadow">▶</button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
              {photos.map((_, i) => (
                <span key={i} className={`h-1.5 rounded-full transition-all ${i === idx ? "w-4 bg-white" : "w-2 bg-white/70"}`} />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold">
            {v.marque} {v.modele} <span className="text-gray-500 font-normal">{v.annee}</span>
          </h3>
          <div className="text-right font-semibold">{formatPrice(v.prix)}</div>
        </div>
        <div className="mt-2 text-sm text-gray-600 flex justify-between">
          <span>{formatKm(v.km)}</span>
          <span>{v.carburant} • {v.boite}</span>
        </div>
      </div>
    </motion.article>
  );
}

/* Inventaire (le tien, inchangé) */
const VEHICULES = [
  { marque: "Fiat", modele: "Punto 1.2 ELX", annee: 2000, km: 151500, carburant: "Essence", prix: 3490, boite: "Manuelle", images: [`${base}images/Fiat Punto 1.2 ELX.jpg`] },
  { marque: "Peugeot", modele: "206 CC Quiksilver 1.6 16v 110ch", annee: 2006, km: 155000, carburant: "Essence", prix: 4890, boite: "Manuelle", images: [`${base}images/Peugeot 206 CC Quiksilver 1.6 16v 110ch.jpg`] },
  { marque: "Hyundai", modele: "i10 Clim", annee: 2008, km: 150000, carburant: "Essence", prix: 4990, boite: "Manuelle", images: [`${base}images/Hyundai i10 Clim.jpg`] },
  { marque: "Audi", modele: "A4 Cabriolet V6 3.0 S-Line Quattro", annee: 2007, km: 255000, carburant: "Essence", prix: 9390, boite: "Manuelle", images: [`${base}images/Audi A4 Cabriolet V6 3.0 S-Line Quattro.jpg`] },
  { marque: "Mercedes", modele: "C200 CDI 2.2 16v 122ch", annee: 2006, km: 226800, carburant: "Diesel", prix: 5990, boite: "Manuelle", images: [`${base}images/Mercedes C200 CDI 2.2 16v 122ch.jpg`] },
  { marque: "Renault", modele: "Mégane 1.5 dCi 110ch G-Line", annee: 2012, km: 144900, carburant: "Diesel", prix: 7990, boite: "Manuelle", images: [`${base}images/Renault Mégane 1.5 dCi 110ch G-Line.jpg`] },
  { marque: "Mini", modele: "Cooper SD", annee: 2012, km: 187800, carburant: "Diesel", prix: 9990, boite: "Manuelle", images: [`${base}images/Mini Cooper SD.jpg`] },
  { marque: "Citroën", modele: "DS3 VTi 120 1.6", annee: 2010, km: 121000, carburant: "Essence", prix: 6990, boite: "Manuelle", images: [`${base}images/Citroën DS3 VTi 120 1.6.jpg`] },
  { marque: "Volkswagen", modele: "up! 1.0 60ch", annee: 2017, km: 81000, carburant: "Essence", prix: 6490, boite: "Manuelle", images: [`${base}images/Volkswagen up! 1.0 60ch.jpg`] },
  { marque: "Renault", modele: "Twingo 3", annee: 2013, km: 123400, carburant: "Diesel", prix: 6900, boite: "Manuelle", images: [`${base}images/Renault Twingo 3.jpg`] },
  { marque: "Mercedes", modele: "Vito CDI 114", annee: 2017, km: 96000, carburant: "Diesel", prix: 18900, boite: "Manuelle", images: [`${base}images/mercedes vito.jpg`] },
  { marque: "BMW", modele: "BMW X1 2.5D", annee: 2012, km: 164500, carburant: "Diesel", prix: 12900, boite: "Manuelle", images: [`${base}images/BMW X1 2.5D.jpg`] },
  { marque: "Twingo ", modele: "Twingo 2 1,5L DCI", annee: 2013, km: 123400, carburant: "Essence", prix: 6900, boite: "Manuelle", images: [`${base}images/Twingo 2.jpg`] },
  { marque: "Toyota ", modele: "Hilux 2,5L D-4D 120 ch", annee: 2010, km: 202000, carburant: "Essence", prix: 18900, boite: "Manuelle", images: [`${base}images/Toyota Hilux 2.5 D-4D 120ch.jpg`] },
  { marque: "Citroen", modele: "Citroen C4 Picasso 1,6L HDI", annee: 2010, km: 203000, carburant: "Essence", prix: 5690, boite: "Manuelle", images: [`${base}images/Citroen C4 Picasso 1,6L HDI.jpg`] },
  { marque: "Mercedes", modele: "C200 2,2M CDI 122ch", annee: 2004, km: 238000, carburant: "Essence", prix: 4990, boite: "Manuelle", images: [`${base}images/C200 2,2M CDI 122ch.jpg`] },
].map((v, i) => ({ id: `${v.marque}-${v.modele}-${v.annee}-${i}`, ...v }));

export default function Home() {
  const [lightbox, setLightbox] = React.useState(null);

  // États recherche/filtre
  const [query, setQuery] = React.useState("");
  const [marque, setMarque] = React.useState("Marque");
  const [carburant, setCarburant] = React.useState("Motorisation");
  const [boite, setBoite] = React.useState("Boite de vitesse");
  const prixHaut = React.useMemo(() => Math.max(...VEHICULES.map(v => v.prix), 20000), []);
  const [prixMax, setPrixMax] = React.useState(prixHaut);
  const [tri, setTri] = React.useState("pertinence");

  // Options filtres
  const marques = React.useMemo(() => ["Marque", ...unique(VEHICULES.map(v => v.marque)).sort()], []);
  const carburants = React.useMemo(() => ["Motorisation", ...unique(VEHICULES.map(v => v.carburant)).sort()], []);
  const boites = React.useMemo(() => ["Boite de vitesse", ...unique(VEHICULES.map(v => v.boite)).sort()], []);

  // Résultats filtrés + triés
  const results = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = VEHICULES.filter((v) => {
      const okQuery = !q ? true : [v.marque, v.modele, String(v.annee), v.carburant, v.boite].join(" ").toLowerCase().includes(q);
      const okMarque = marque === "Marque" || v.marque === marque;
      const okCarb = carburant === "Motorisation" || v.carburant === carburant;
      const okBoite = boite === "Boite de vitesse" || v.boite === boite;
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
    <>
      {/* Recherche + filtres */}
      <section className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-5">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-2xl border border-gray-200 px-4 py-3"
                placeholder="Marque, modèle, année..."
              />
            </div>
            <div className="md:col-span-2">
              <select value={marque} onChange={(e)=>setMarque(e.target.value)} className="w-full rounded-2xl border border-gray-200 px-4 py-3 bg-white">
                {marques.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <select value={carburant} onChange={(e)=>setCarburant(e.target.value)} className="w-full rounded-2xl border border-gray-200 px-4 py-3 bg-white">
                {carburants.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="md:col-span-3">
              <select value={boite} onChange={(e)=>setBoite(e.target.value)} className="w-full rounded-2xl border border-gray-200 px-4 py-3 bg-white">
                {boites.map(b => <option key={b} value={b}>{b}</option>)}
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
              {results.length} véhicule{results.length>1?"s":""} trouvé{results.length>1?"s":""}
            </div>
          </div>
        </div>
      </section>

      {/* Liste */}
      <section id="parc" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {results.length === 0 ? (
          <div className="text-center py-24">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-gray-100 grid place-items-center mb-4">🚗</div>
            <h3 className="text-xl font-semibold">Aucun véhicule ne correspond</h3>
            <p className="text-gray-600 mt-2">Modifiez vos filtres ou réinitialisez la recherche.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((v) => (
              <VehicleCard key={v.id} v={v} onOpen={(photos, startIndex)=>setLightbox({ photos, startIndex })}/>
            ))}
          </div>
        )}
      </section>

      {lightbox && (
        <Lightbox photos={lightbox.photos} startIndex={lightbox.startIndex} onClose={()=>setLightbox(null)} />
      )}
    </>
  );
}
