const fs = require('fs');
const path = require('path');

const ARTWORKS_DIR = path.join(__dirname, '../public/images/artworks');
const META_PATH = path.join(__dirname, '../src/data/artworks-meta.json');
const OUTPUT_PATH = path.join(__dirname, '../src/data/artworks.ts');

// 오늘 날짜 (YYYY-MM-DD)
function today() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

// 메타데이터 로드
let meta = {};
if (fs.existsSync(META_PATH)) {
  meta = JSON.parse(fs.readFileSync(META_PATH, 'utf-8'));
}

// 이미지 파일 목록
const files = fs.readdirSync(ARTWORKS_DIR)
  .filter(function(f) { return /\.(jpg|jpeg|png|webp)$/i.test(f); })
  .sort();

// artworks 배열 생성
const artworks = files.map(function(file, idx) {
  const m = meta[file] || {};
  return {
    id: idx + 1,
    title: m.title || file.replace(/[_-]/g, ' ').replace(/\.[^.]+$/, ''),
    description: m.description || '',
    imageUrl: `/images/artworks/${file}`,
    date: m.date || today(),
    tags: m.tags || [],
  };
});

// TypeScript 파일로 출력
const output = `// 자동 생성 파일. 직접 수정하지 마세요!\n\nexport interface Artwork {\n  id: number;\n  title: string;\n  description: string;\n  imageUrl: string;\n  date: string;\n  tags: string[];\n}\n\nexport const artworks: Artwork[] = ${JSON.stringify(artworks, null, 2)};\n`;

fs.writeFileSync(OUTPUT_PATH, output, 'utf-8');

console.log(`✅ ${artworks.length}개 작품이 artworks.ts로 생성되었습니다.`); 