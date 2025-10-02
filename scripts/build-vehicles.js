// scripts/build-vehicles.js
import fs from "fs";
import path from "path";
import slugify from "slugify";

const IMAGES_DIR = "public/images";
const OUTPUT_JSON = "src/data/vehicles.json";

// Mots clés pour nettoyer les variantes de nom
const VARIANTS = [
  "couverture", "cover", "exterieur", "extérieur",
  "interieur", "intérieur", "avant", "arriere", "arrière",
  "profil", "cote", "côté", "detail", "détail",
  "1", "2", "3", "4", "5", "6"
];

// Normalisation simple : supprime accents/ponctuation, passe en kebab
const toSlug = (str) => slugify(str, { lower: true, strict: true });

// Capitalise première lettre
const capitalize = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : s;

// Essaie d’inférer { marque, modele, annee } depuis un nom de fichier
function inferMetaFromFilename(filenameNoExt) {
  // Exemple: "Renault Twingo 3 intérieur.jpg" => ["Renault","Twingo","3","intérieur"]
  const raw = filenameNoExt.replace(/[_()-]/g, " ").replace(/\s+/g, " ").trim();

  // année si présent
  const yearMatch = raw.match(/\b(19|20)\d{2}\b/);
  const annee = yearMatch ? parseInt(yearMatch[0], 10) : null;

  const words = raw.split(" ");

  // marque = 1er mot
  const marque = words.length ? capitalize(words[0].toLowerCase()) : "Marque";

  // modèle = reste – on supprime l’année détectée et les variantes
  const restWords = words.slice(1).filter(w => {
    if (annee && w === String(annee)) return false;
    const wnorm = toSlug(w);
    return !VARIANTS.includes(wnorm);
  });

  const modele = restWords.join(" ").trim() || "Modèle";

  return { marque, modele, annee };
}

// Construit une clé de groupe pour regrouper les photos d’un même véhicule
function groupKeyFromFilename(filenameNoExt) {
  // On retire les variantes (intérieur, couverture, etc.) pour faire une clé stable
  let base = filenameNoExt.toLowerCase();

  // Retire extension d’année seule si elle est en fin
  base = base.replace(/\b(19|20)\d{2}\b/g, "").trim();

  // Retire mots variantes
  VARIANTS.forEach(v => {
    const rx = new RegExp(`\\b${v}\\b`, "gi");
    base = base.replace(rx, " ");
  });

  base = base.replace(/[_()-]/g, " ").replace(/\s+/g, " ").trim();
  // On limite la clé aux 4-5 premiers mots pour éviter les suffixes lourds
  const parts = base.split(" ").slice(0, 5);
  return parts.join(" ");
}

function isImage(file) {
  const ext = path.extname(file).toLowerCase();
  return [".webp", ".jpg", ".jpeg", ".png"].includes(ext);
}

function ensureOutputDir() {
  const dir = path.dirname(OUTPUT_JSON);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function run() {
  if (!fs.existsSync(IMAGES_DIR)) {
    console.error(`❌ Dossier introuvable : ${IMAGES_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(IMAGES_DIR).filter(isImage);
  if (!files.length) {
    console.warn(`⚠️ Aucune image dans ${IMAGES_DIR}`);
  }

  // On préfère les .webp si présents (sinon fallback .jpg/.png)
  // On construit une map stem -> meilleur fichier
  const pickBest = new Map(); // stem -> filename
  for (const f of files) {
    const ext = path.extname(f).toLowerCase();
    const stem = path.basename(f, ext);
    const current = pickBest.get(stem);
    // priorité au .webp
    if (!current) pickBest.set(stem, f);
    else if (!current.endsWith(".webp") && ext === ".webp") pickBest.set(stem, f);
  }

  // Regroupe par "groupKey"
  const groups = new Map(); // groupKey -> { photos:Set, meta }
  for (const [stem, fname] of pickBest.entries()) {
    const filenameNoExt = stem;
    const key = groupKeyFromFilename(filenameNoExt);
    const photoUrl = `/images/${fname}`;

    if (!groups.has(key)) {
      const meta = inferMetaFromFilename(filenameNoExt);
      groups.set(key, { meta, photos: new Set() });
    }
    groups.get(key).photos.add(photoUrl);
  }

  // Tri des photos : couverture d’abord si trouvée
  const scorePhoto = (p) => {
    const s = p.toLowerCase();
    if (s.includes("couverture")) return 0;
    if (s.includes("cover")) return 1;
    if (s.includes("exterieur") || s.includes("extérieur") || s.includes("avant")) return 2;
    if (s.includes("interieur") || s.includes("intérieur")) return 3;
    return 9;
  };

  // Génère le tableau final
  const result = [];
  for (const { meta, photos } of groups.values()) {
    const arr = Array.from(photos).sort((a, b) => scorePhoto(a) - scorePhoto(b));

    result.push({
      marque: meta.marque,
      modele: meta.modele,
      annee: meta.annee,
      km: null,              // à compléter si tu veux
      carburant: null,       // ex: "Essence" | "Diesel"
      prix: null,            // à compléter
      boite: "Manuelle",     // défaut (à ajuster)
      images: arr
    });
  }

  // Tri par marque puis modèle
  result.sort((a, b) => {
    const ma = (a.marque || "").localeCompare(b.marque || ""); 
    if (ma !== 0) return ma;
    return (a.modele || "").localeCompare(b.modele || "");
  });

  ensureOutputDir();
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(result, null, 2), "utf8");
  console.log(`✅ Inventaire généré → ${OUTPUT_JSON} (${result.length} véhicules)`);
}

run();
