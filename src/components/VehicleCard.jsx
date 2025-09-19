import React, { useState } from "react";

// --- Flèche réutilisable ---
function ArrowBtn({ dir = "next", onClick }) {
  const side = dir === "prev" ? "left-2 sm:left-3" : "right-2 sm:right-3";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "prev" ? "Photo précédente" : "Photo suivante"}
      className={`absolute top-1/2 -translate-y-1/2 ${side}
        h-10 w-10 sm:h-12 sm:w-12 rounded-full
        bg-white/90 backdrop-blur border border-gray-200 shadow-lg
        flex items-center justify-center
        hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500
        transition`}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5 sm:h-6 sm:w-6 text-gray-800"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {dir === "prev" ? (
          <path d="M15 18l-6-6 6-6" />
        ) : (
          <path d="M9 18l6-6-6-6" />
        )}
      </svg>
    </button>
  );
}

// --- VehicleCard principal ---
export default function VehicleCard({ v, base }) {
  const photos = v.images || [];
  const [idx, setIdx] = useState(0);

  const hasPhotos = photos.length > 0;

  const prev = (e) => {
    e?.stopPropagation?.();
    if (!hasPhotos) return;
    setIdx((i) => (i - 1 + photos.length) % photos.length);
  };

  const next = (e) => {
    e?.stopPropagation?.();
    if (!hasPhotos) return;
    setIdx((i) => (i + 1) % photos.length);
  };

  // swipe mobile
  const [touchStart, setTouchStart] = useState(null);
  const onTouchStart = (e) => setTouchStart(e.changedTouches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchStart == null) return;
    const dx = e.changedTouches[0].clientX - touchStart;
    if (Math.abs(dx) > 40) (dx > 0 ? prev() : next());
    setTouchStart(null);
  };

  return (
    <div className="rounded-2xl border border-gray-200 shadow-sm overflow-hidden bg-white">
      {/* Carousel photo */}
      <div
        className="relative aspect-[4/3] bg-gray-100 overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <img
          src={encodeURI(photos[idx] || `${base}images/placeholder.jpg`)}
          alt={`${v.marque} ${v.modele}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* Dégradé pour lisibilité */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent" />

        {/* Flèches */}
        {hasPhotos && photos.length > 1 && (
          <>
            <ArrowBtn dir="prev" onClick={prev} />
            <ArrowBtn dir="next" onClick={next} />
          </>
        )}

        {/* Dots */}
        {hasPhotos && photos.length > 1 && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setIdx(i);
                }}
                aria-label={`Aller à la photo ${i + 1}`}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  i === idx
                    ? "bg-white shadow ring-1 ring-black/10"
                    : "bg-white/70 hover:bg-white"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Infos véhicule */}
      <div className="p-4">
        <h3 className="text-lg font-semibold">
          {v.marque} {v.modele}
        </h3>
        <p className="text-sm text-gray-600">
          {v.annee} • {v.km.toLocaleString()} km • {v.carburant} • {v.boite}
        </p>
        <p className="mt-2 text-right text-blue-600 font-bold text-xl">
          {v.prix.toLocaleString()} €
        </p>
      </div>
    </div>
  );
}
