// src/pages/Home.jsx
import React from "react";
import VehicleCard from "../components/VehicleCard.jsx";

const base = import.meta.env.BASE_URL || "/";

const formatPrice = (n) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n);

/* ================== Inventaire (le tien, inchangé) ================== */
const VEHICULES = [
  { marque: "Twingo ", modele: "Twingo 2 1,5L DCI", annee: 2013, km: 123400, carburant: "Essence", prix: 6900, boite: "Manuelle", images:
    [
      `${base}images/Twingo 2 couverture.jpg`,
      `${base}images/Twingo 2 arriere.jpg`,
      `${base}images/Twingo 2 intérieur.jpg`
    ]
  },
  { marque: "Renault", modele: "Twingo 3", annee: 2013, km: 123400, carburant: "Diesel", prix: 8390, boite: "Manuelle", images:
    [
      `${base}images/Twingo 3(couverture).jpg`,
      `${base}images/Renault Twingo 3.jpg`,
      `${base}images/Twingo 3 intérieur.jpg`
    ]
  },
  { marque: "Volkswagen", modele: "up! 1.0 60ch", annee: 2017, km: 81000, carburant: "Essence", prix: 6490, boite: "Manuelle", images:
    [
      `${base}images/Volkswagen up! 1.0 60ch (couverture).jpg`,
      `${base}images/Volkswagen up! 1.0 60ch.jpg`,
      `${base}images/Volkswagen up! 1.0 60ch 2jpg.jpg`
    ]
  },
  { marque: "Peugeot", modele: "206 CC Quiksilver 1.6 16v 110ch", annee: 2006, km: 155000, carburant: "Essence", prix: 4890, boite: "Manuelle",
    images:
    [
      `${base}images/Peugeot 206 CC Quiksilver 1.6 16v 110ch.jpg`,
      `${base}images/206 CC extérieur2.jpg`,
      `${base}images/206 CC intérieur.jpg`
    ],
  },
  { marque: "Hyundai", modele: "i10 Clim", annee: 2008, km: 150000, carburant: "Essence",
    prix: 4990, boite: "Manuelle",
    images:
    [
      `${base}images/Hyundai i10 Clim (couverture).jpg`,
      `${base}images/Hyundai i10 Clim intérieur.jpg`
    ]
  },
  { marque: "Audi", modele: "A4 Cabriolet V6 3.0 S-Line Quattro", annee: 2007, km: 255000, carburant: "Essence", prix: 9390, boite: "Manuelle", images:
    [
      `${base}images/Audi A4 Cabriolet V6 3.0 S-Line Quattro.jpg`,
      `${base}images/Audi A4 Cabriolet V6 3.0 S-Line Quattro-2.jpg`,
      `${base}images/Audi A4 Cabriolet V6 3.0 S-Line Quattro intérieur.jpg`
    ] },
  { marque: "Mercedes", modele: "C200 CDI 2.2 16v 122ch", annee: 2006, km: 226800, carburant: "Diesel", prix: 5990, boite: "Manuelle", images:
    [
      `${base}images/Mercedes C200 CDI 2.2 16v 122ch.jpg`,
      `${base}images/Mercedes C200 CDI 2.2 16v 122ch exterieur.jpg`,
      `${base}images/Mercedes C200 CDI 2.2 16v 122ch exterieur 2.jpg`,
      `${base}images/Mercedes C200 CDI 2.2 16v 122ch interieur.jpg`
    ]
  },
  { marque: "Renault", modele: "Mégane 1.5 dCi 110ch G-Line", annee: 2012, km: 144900, carburant: "Diesel", prix: 7990, boite: "Manuelle", images:
    [
      `${base}images/Renault Mégane 1.5 dCi 110ch G-Line.jpg`,
      `${base}images/Renault Mégane 1.5 dCi 110ch G-Line extérieur.jpg`,
      `${base}images/Renault Mégane 1.5 dCi 110ch G-Line intérieur.jpg`
    ]
  },
  { marque: "Mini", modele: "Cooper SD", annee: 2012, km: 187800, carburant: "Diesel", prix: 9990, boite: "Manuelle", images:
    [
      `${base}images/Mini Cooper SD.jpg`,
      `${base}images/Mini cooper extérieur.jpg`,
      `${base}images/Mini cooper intérieur.jpg`
    ]
  },
  { marque: "Citroën", modele: "DS3 VTi 120 1.6", annee: 2010, km: 121000, carburant: "Essence", prix: 6990, boite: "Manuelle", images:
    [
      `${base}images/Citroen DS3 VTi 120 1.6.jpg`,
      `${base}images/Citroen DS3 VTi 120 1.6 exterieur2 (1).jpg`,
      `${base}images/Citroen DS3 VTi 120 1.6 interieur.jpg`
    ]
  },
  { marque: "Mercedes", modele: "Vito CDI 114", annee: 2017, km: 96000, carburant: "Diesel", prix: 18900, boite: "Manuelle", images:
    [
      `${base}images/mercedes vito.jpg`,
      `${base}images/mercedes vito arriere.jpg`,
      `${base}images/mercedes vito intérieur.jpg`
    ]
  },
  { marque: "BMW", modele: "BMW X1 2.5D", annee: 2012, km: 164500, carburant: "Diesel", prix: 12900, boite: "Manuelle", images:
    [
      `${base}images/BMW X1 2.5D.jpg`,
      `${base}images/BMW X1 2.5D(2).jpg`,
      `${base}images/BMW X1 2.5D intérieur.jpg`,
      `${base}images/BMW X1 2.5D intérieur(2).jpg`,
      `${base}images/BMW X1 2.5D intérieur(3).jpg`
    ]
  },
  { marque: "Toyota ", modele: "Hilux 2,5L D-4D 120 ch", annee: 2010, km: 202000, carburant: "Essence", prix: 18900, boite: "Manuelle", images:
    [
      `${base}images/Toyota Hilux 2.5 D-4D 120ch.jpg`,
      `${base}images/Toyota Hilux 2.5 D-4D 120ch (1).jpg`,
      `${base}images/Toyota Hilux 2.5 D-4D 120ch (2).jpg`
    ]
  },
  { marque: "Citroën", modele: "Citroen C4 Picasso 1,6L HDI", annee: 2010, km: 203000, carburant: "Essence", prix: 5690, boite: "Automatique", images:
    [
      `${base}images/Citroen C4 Picasso 1,6L HDI.jpg`,
      `${base}images/Citroen C4 Picasso 1,6L HDI 2.jpg`,
      `${base}images/Citroen C4 Picasso 1,6L HDI intérieur.jpg`
    ]
  },
  { marque: "Mercedes", modele: "C200 2,2L CDI 122ch", annee: 2004, km: 238000, carburant: "Essence", prix: 4990, boite: "Manuelle", images:
    [
      `${base}images/C200 2,2M CDI 122ch.jpg`,
      `${base}images/Mercedes C200 2,2L CDI.jpg`,
      `${base}images/Mercedes bleu intérieur.jpg`
    ]
  },
  { marque: "Fiat", modele: "Panda 1,2L", annee: 2014, km: 64500, carburant: "Essence", prix: 6900, boite: "Manuelle", images:
    [
      `${base}images/Fiat Panda 1.2.jpg`,
      `${base}images/Panda rouge.jpg`,
      `${base}images/Panda rouge intérieur.jpg`
    ]
  },
  { marque: "Fiat", modele: "Punto 1.2 ELX", annee: 2000, km: 151500, carburant: "Essence", prix: 3490, boite: "Manuelle", images:
    [`${base}images/Fiat Punto 1.2 ELX.jpg`]
  },
].map((v, i) => ({ id: `${v.marque}-${v.modele}-${v.annee}-${i}`, ...v }));

/* ================== Page ================== */
export default function Home() {
  const [query, setQuery] = React.useState("");
  const [marque, setMarque] = React.useState("Marque");
  const [carburant, setCarburant] = React.useState("Carburant");
  const [boite, setBoite] = React.useState("Boite de vitesse");

  const prixMaxData = React.useMemo(
    () => Math.max(...VEHICULES.map((v) => v.prix || 0)),
    []
  );
  const [prixMax, setPrixMax] = React.useState(prixMaxData);
  const [tri, setTri] = React.useState("pertinence");

  const marques = React.useMemo(
    () => ["Marque", ...Array.from(new Set(VEHICULES.map((v) => v.marque)))],
    []
  );
  const carburants = React.useMemo(
    () => ["Carburant", ...Array.from(new Set(VEHICULES.map((v) => v.carburant)))],
    []
  );
  const boites = React.useMemo(
    () => ["Boite de vitesse", ...Array.from(new Set(VEHICULES.map((v) => v.boite)))],
    []
  );

  // === Filtrage + Tri (ta logique gardée) ===
  const results = React.useMemo(() => {
    const q = query.trim().toLowerCase();

    let list = VEHICULES.filter(v => {
      const okQuery =
        !q ||
        `${v.marque} ${v.modele} ${v.annee}`.toLowerCase().includes(q);

      const okMarque = marque === "Marque" || v.marque === marque;
      const okCarburant = carburant === "Carburant" || v.carburant === carburant;
      const okBoite = boite === "Boite de vitesse" || v.boite === boite;
      const okPrix = (v.prix || 0) <= prixMax;

      return okQuery && okMarque && okCarburant && okBoite && okPrix;
    });

    switch (tri) {
      case "prix-asc":  list.sort((a, b) => (a.prix || 0) - (b.prix || 0)); break;
      case "prix-desc": list.sort((a, b) => (b.prix || 0) - (a.prix || 0)); break;
      case "km-asc":    list.sort((a, b) => (a.km || 0) - (b.km || 0)); break;
      case "km-desc":   list.sort((a, b) => (b.km || 0) - (a.km || 0)); break;
      case "annee-desc":list.sort((a, b) => (b.annee || 0) - (a.annee || 0)); break;
      default: break; // pertinence = ordre d'origine
    }
    return list;
  }, [query, marque, carburant, boite, prixMax, tri]);

  return (
    <main className="pb-12">
      {/* Filtres */}
      <section className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Recherche */}
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-full border border-gray-200 px-5 py-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Marque, modèle, année..."
            />

            {/* Marque */}
            <select
              value={marque}
              onChange={(e) => setMarque(e.target.value)}
              className="w-full rounded-full border border-gray-200 px-5 py-3 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              {marques.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>

            {/* Carburant */}
            <select
              value={carburant}
              onChange={(e) => setCarburant(e.target.value)}
              className="w-full rounded-full border border-gray-200 px-5 py-3 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              {carburants.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            {/* Boite */}
            <select
              value={boite}
              onChange={(e) => setBoite(e.target.value)}
              className="w-full rounded-full border border-gray-200 px-5 py-3 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              {boites.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Prix + Tri alignés */}
          <div className="mt-6 flex items-center justify-between gap-4">
            <div className="flex-1">
              <div className="text-sm text-gray-700 mb-1">
                Prix max : {formatPrice(prixMax)}
              </div>
              <input
                type="range"
                min="0"
                max={prixMaxData}
                step="100"
                value={prixMax}
                onChange={(e) => setPrixMax(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            <div className="w-48">
              <select
                value={tri}
                onChange={(e) => setTri(e.target.value)}
                className="w-full rounded-full border border-gray-200 px-4 py-2 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                <option value="pertinence">Pertinence</option>
                <option value="prix-asc">Prix croissant</option>
                <option value="prix-desc">Prix décroissant</option>
                <option value="km-asc">Kilométrage croissant</option>
                <option value="km-desc">Kilométrage décroissant</option>
                <option value="annee-desc">Plus récents</option>
              </select>
            </div>
          </div>

          <div className="mt-3 text-right text-sm text-gray-600">
            {results.length} véhicule{results.length > 1 ? "s" : ""} trouvé{results.length > 1 ? "s" : ""}
          </div>
        </div>
      </section>

      {/* Liste */}
      <section id="parc">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((v) => (
            <VehicleCard key={v.id} v={v} base={base} />
          ))}
        </div>
      </section>
    </main>
  );
}
