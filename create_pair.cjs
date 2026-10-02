const sharp = require('sharp');
const fs = require('fs');

async function createPair() {
  const input = 'f:/vertexOS/CLEAN SERVICE/public/images/service-sofa.jpg';
  const meta = await sharp(input).metadata();
  const w = meta.width;
  const h = meta.height;

  // Clean sofa is the full original
  await sharp(input)
    .jpeg({ quality: 95 })
    .toFile('f:/vertexOS/CLEAN SERVICE/public/images/sofa-clean-full.jpg');

  // Stains SVG that maps to cushions
  const stainsSvg = Buffer.from(`
    <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="coffee" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#3b2210" stop-opacity="0.9" />
          <stop offset="35%" stop-color="#5a371c" stop-opacity="0.8" />
          <stop offset="70%" stop-color="#784c28" stop-opacity="0.5" />
          <stop offset="100%" stop-color="#926338" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="dirt" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#22201d" stop-opacity="0.85" />
          <stop offset="40%" stop-color="#38332c" stop-opacity="0.65" />
          <stop offset="80%" stop-color="#524b42" stop-opacity="0.35" />
          <stop offset="100%" stop-color="#6e6559" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="dust" cx="40%" cy="65%" r="60%">
          <stop offset="0%" stop-color="#2d2720" stop-opacity="0.6" />
          <stop offset="60%" stop-color="#473f34" stop-opacity="0.35" />
          <stop offset="100%" stop-color="#000000" stop-opacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="${w * 0.45}" cy="${h * 0.65}" rx="${w * 0.38}" ry="${h * 0.24}" fill="url(#dust)" />
      <ellipse cx="${w * 0.42}" cy="${h * 0.62}" rx="${w * 0.12}" ry="${h * 0.08}" fill="url(#coffee)" transform="rotate(-10 ${w*0.42} ${h*0.62})" />
      <path d="M ${w*0.38} ${h*0.64} Q ${w*0.42} ${h*0.72} ${w*0.45} ${h*0.67} Q ${w*0.41} ${h*0.63} ${w*0.38} ${h*0.64} Z" fill="#3d210c" opacity="0.8" />
      <ellipse cx="${w * 0.25}" cy="${h * 0.68}" rx="${w * 0.09}" ry="${h * 0.07}" fill="url(#dirt)" />
      <ellipse cx="${w * 0.58}" cy="${h * 0.58}" rx="${w * 0.14}" ry="${h * 0.07}" fill="url(#dirt)" />
      <ellipse cx="${w * 0.18}" cy="${h * 0.58}" rx="${w * 0.07}" ry="${h * 0.08}" fill="url(#dirt)" />
      <ellipse cx="${w * 0.50}" cy="${h * 0.70}" rx="${w * 0.08}" ry="${h * 0.05}" fill="url(#coffee)" opacity="0.65" />
    </svg>
  `);

  await sharp(input)
    .modulate({ brightness: 0.88, saturation: 0.82 })
    .composite([{ input: stainsSvg, blend: 'multiply' }])
    .jpeg({ quality: 95 })
    .toFile('f:/vertexOS/CLEAN SERVICE/public/images/sofa-dirty-full.jpg');

  console.log('sofa-dirty-full.jpg and sofa-clean-full.jpg generated successfully!');
}

createPair();
