// src/components/VehicleCard.jsx
import React from "react";
import ImgOptimized from "./ImgOptimized.jsx";

const formatPrice = (n) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n);

export default function VehicleCard({ v, base = "/", index = 0, onOpen }) {
  const photos = v.images || [];
  const [idx, setIdx] = React.useState(0);

  const next = (e) => {
    e?.stopPropagation?.();
    if (!photos.length) return;
    setIdx((i) => (i + 1) % photos.length);
  };
  const prev = (e) => {
    e?.stopPropagation?.();
    if (!photos.length) return;
    setIdx((i) => (i - 1 + photos.length) % photos.length);
  };

  const cover = photos[idx] || `${base}images/placeholder.jpg`;

  return (
    <article className="group rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition">
      {/* IMAGE */}
      <div className="relative aspect-[4/3] bg-gray-100">
        {/* priorité pour la toute 1ʳᵉ carte */}
        <ImgOptimized
          src={cover}
          alt={`${v.marque} ${v.modele} ${v.annee}`}
          width={1200}
          height={900}
          priority={index === 0}
          className="w-full h-full object-cover"
        />

        {/* Flèche gauche */}
        {photos.length > 1 && (
          <button
            type="button"
            onClick={prev}
            aria-label="Photo précédente"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 text-gray-800 shadow grid place-items-center hover:bg-white"
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
              <path d="M12.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L8.414 10l4.293 4.293a1 1 0 010 1.414z" />
            </svg>
          </button>
        )}

        {/* Flèche droite */}
        {photos.length > 1 && (
          <button
            type="button"
            onClick={next}
            aria-label="Photo suivante"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 text-gray-800 shadow grid place-items-center hover:bg-white"
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
              <path d="M7.293 4.293a1 1 0 011.414 0L13.707 9.293a1 1 0 010 1.414L8.707 15.707a1 1 0 01-1.414-1.414L11.586 10 7.293 5.707a1 1 0 010-1.414z" />
            </svg>
          </button>
        )}

        {/* Dots */}
        {photos.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {photos.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => { e.stopPropagation(); setIdx(i); }}
                aria-label={`Voir la photo ${i + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition ${
                  i === idx ? "bg-white shadow ring-1 ring-black/10" : "bg-white/60 hover:bg-white"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* INFOS */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {v.marque} {v.modele}
        </h3>
        <div className="mt-1 text-sm text-gray-600">
          {v.annee} • {v.km?.toLocaleString("fr-FR")} km • {v.carburant} • {v.boite}
        </div>

        <div className="mt-3 text-blue-600 font-semibold text-lg">
          {formatPrice(v.prix)}
        </div>
      </div>
    </article>
  );
}
