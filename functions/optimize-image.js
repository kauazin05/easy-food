// Função serverless (FaaS) de otimização de imagem - Aula 8.
// Roda de forma independente da API: em produção seria disparada por um evento
// de upload (ex.: S3 -> AWS Lambda). Requer: npm install sharp
const sharp = require("sharp");

async function optimizeImage(inputBuffer) {
  return sharp(inputBuffer)
    .resize({ width: 800, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer();
}

// Handler no formato Lambda para evento S3 (esqueleto de integração).
async function handler(event) {
  console.log("Nova imagem recebida:", JSON.stringify(event?.Records?.[0]?.s3?.object || {}));
  // 1) baixar a imagem original do bucket de origem
  // 2) const optimized = await optimizeImage(original)
  // 3) salvar no bucket de imagens otimizadas
  return { statusCode: 200 };
}

module.exports = { optimizeImage, handler };
