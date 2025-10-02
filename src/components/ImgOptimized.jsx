// src/components/ImgOptimized.jsx
import React from "react";

/**
 * <ImgOptimized />
 * - Servez du WebP (fallback JPG/PNG)
 * - Lazy-loading par défaut
 * - Evite le CLS (width/height)
 * - "priority" pour les images critiques (eager + fetchpriority=high)
 */
export default function ImgOptimized({
  src,                 // ex: `${base}images/Volkswagen up! 1.0 60ch.jpg`
  alt,
  className = "",
  width,               // ex: 1200
  height,              // ex: 900
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  priority = false,    // true = image critique (eager)
}) {
  // On fabrique le chemin webp (même nom, extension .webp)
  const webp = src?.replace(/\.(jpe?g|png)$/i, ".webp");

  const loading = priority ? "eager" : "lazy";
  const decoding = priority ? "sync" : "async";
  const fetchpriority = priority ? "high" : "auto";

  return (
    <picture>
      {/* Si le .webp existe, le navigateur le choisira; sinon il utilisera l'img fallback */}
      <source srcSet={webp} type="image/webp" />
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding={decoding}
        fetchpriority={fetchpriority}
        sizes={sizes}
        className={className}
      />
    </picture>
  );
}
