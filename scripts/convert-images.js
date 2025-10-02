// scripts/convert-images.js
import fs from "fs";
import path from "path";
import sharp from "sharp";
import slugify from "slugify";

const inputDir = "public/images";
const outputDir = "public/images";

// Vérifie si le dossier existe
if (!fs.existsSync(inputDir)) {
  console.error(`❌ Le dossier ${inputDir} n'existe pas.`);
  process.exit(1);
}

// Fonction pour convertir en webp + renommer
async function convertAndRename(file) {
  const ext = path.extname(file).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) return;

  const baseName = path.basename(file, ext);

  // Nom propre (pas d'espaces, pas d'accents, tout en minuscule avec -)
  const cleanName = slugify(baseName, {
    lower: true,
    strict: true, // supprime caractères spéciaux
  });

  const inputPath = path.join(inputDir, file);
  const outputPath = path.join(outputDir, `${cleanName}.webp`);

  try {
    await sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputPath);

    console.log(`✅ Converti : ${file} → ${cleanName}.webp`);
  } catch (err) {
    console.error(`❌ Erreur avec ${file}:`, err);
  }
}

// Lancer sur tous les fichiers du dossier
fs.readdirSync(inputDir).forEach((file) => convertAndRename(file));

