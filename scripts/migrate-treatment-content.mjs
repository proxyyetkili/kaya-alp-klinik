import { writeFile } from 'node:fs/promises';

const sourcePages = [
  ['dental-implant', 'https://www.trakyadent.com.tr/tedavilerimiz/dental-implantlar/'], ['all-on-four', 'https://www.trakyadent.com.tr/tedavilerimiz/all-on-four-teknigi/'], ['implant-planlama', 'https://www.trakyadent.com.tr/tedavilerimiz/dental-implantlar/'], ['kemik-guclendirme', 'https://www.trakyadent.com.tr/tedavilerimiz/kemik-artirma-islemi/'],
  ['lamine-kaplama', 'https://www.trakyadent.com.tr/tedavilerimiz/lamine-dis/'], ['zirkonyum-kaplama', 'https://www.trakyadent.com.tr/tedavilerimiz/zirkonyum-dis-fiyatlari/'], ['porselen-kaplama', 'https://www.trakyadent.com.tr/tedavilerimiz/porselen-dis/'], ['emax-kaplama', 'https://www.trakyadent.com.tr/tedavilerimiz/emax-kaplama-nedir/'], ['gulus-tasarimi', 'https://www.trakyadent.com.tr/tedavilerimiz/gulus-tasarimi/'], ['pembe-estetik', 'https://www.trakyadent.com.tr/tedavilerimiz/pembe-estetik/'],
  ['kompozit-dolgu', 'https://www.trakyadent.com.tr/dis-dolgusu/'], ['inlay-onlay', 'https://www.trakyadent.com.tr/inlay-onlay-kisiye-ozel-dolgular/'], ['estetik-dolgu', 'https://www.trakyadent.com.tr/estetik-dolgu/'], ['dis-asinmasi', 'https://www.trakyadent.com.tr/tedavilerimiz/dis-asinmasi/'], ['dis-kiriklari', 'https://www.trakyadent.com.tr/tedavilerimiz/dis-kiriklari-tedavisi/'],
  ['seffaf-plak', 'https://www.trakyadent.com.tr/tedavilerimiz/seffaf-plak/'], ['seffaf-braket', 'https://www.trakyadent.com.tr/tedavilerimiz/seffaf-braket/'], ['ortodontik-muayene', 'https://www.trakyadent.com.tr/tedavilerimiz/seffaf-braket/'],
  ['cocuk-muayenesi', 'https://www.trakyadent.com.tr/cocuklarin-ilk-dis-muayenesi-hakkinda/'], ['sut-disi-dolgusu', 'https://www.trakyadent.com.tr/tedavilerimiz/sut-disi-dolgusu/'], ['sut-disi-kanal', 'https://www.trakyadent.com.tr/tedavilerimiz/sut-disi-kanal-tedavisi/'], ['cocuk-travma', 'https://www.trakyadent.com.tr/tedavilerimiz/cocuklarda-dis-travmasi/'], ['pulpotomi', 'https://www.trakyadent.com.tr/tedavilerimiz/sut-disi-pulpotomi-amputasyon/'],
  ['gomulu-dis', 'https://www.trakyadent.com.tr/tedavilerimiz/20-yas-dis-cekimi/'], ['cene-eklemi', 'https://www.trakyadent.com.tr/tedavilerimiz/cene-eklemi-rahatsizliklari/'], ['apikal-rezeksiyon', 'https://www.trakyadent.com.tr/tedavilerimiz/apikal-rezeksiyon/'], ['bruksizm', 'https://www.trakyadent.com.tr/bruksizm-dis-sikma/'], ['masseter', 'https://www.trakyadent.com.tr/tedavilerimiz/masseter-botoksu-cene-botoksu/'],
  ['kanal-tedavisi', 'https://www.trakyadent.com.tr/tedavilerimiz/kanal-tedavisi/'], ['fiber-post', 'https://www.trakyadent.com.tr/fiber-post-uygulamasi/'], ['intrakoronal-beyazlatma', 'https://www.trakyadent.com.tr/tedavilerimiz/intrakronal-beyazlatma/'],
  ['hareketli-protez', 'https://www.trakyadent.com.tr/tedavilerimiz/hareketli-protez/'], ['barli-protez', 'https://www.trakyadent.com.tr/tedavilerimiz/barli-protez/'], ['atasmanli-protez', 'https://www.trakyadent.com.tr/tedavilerimiz/locator-atacmanli-protez/'],
  ['dis-tasi', 'https://www.trakyadent.com.tr/dis-tasi-temizligi/'], ['dis-eti-cekilmesi', 'https://www.trakyadent.com.tr/dis-eti-cekilmesi/'], ['flap-operasyonu', 'https://www.trakyadent.com.tr/tedavilerimiz/flap-operasyonu/'], ['agiz-kokusu', 'https://www.trakyadent.com.tr/agiz-kokusu/'], ['dis-eti-grefti', 'https://www.trakyadent.com.tr/tedavilerimiz/bag-dokusu-grefti/'],
  ['dental-tomografi', 'https://www.trakyadent.com.tr/tedavilerimiz/dental-tomografi/'], ['panoramik-rontgen', 'https://www.trakyadent.com.tr/dis-rontgeni-nedir/'], ['dijital-olcu', 'https://www.trakyadent.com.tr/tedavilerimiz/dijital-olcu/'], ['dijital-anestezi', 'https://www.trakyadent.com.tr/tedavilerimiz/dijital-anestezi/'], ['sedasyon', 'https://www.trakyadent.com.tr/tedavilerimiz/genel-anestezi/']
];

const getElementInnerHtml = (page, startIndex, tagName) => {
  const tagPattern = new RegExp(`<\\/?${tagName}\\b[^>]*>`, 'gi');
  tagPattern.lastIndex = startIndex;
  let depth = 0;
  let openingEnd = -1;
  let token;

  while ((token = tagPattern.exec(page))) {
    const isClosingTag = /^<\//.test(token[0]);
    const isSelfClosingTag = /\/>$/.test(token[0]);
    if (!isClosingTag && !isSelfClosingTag) {
      depth += 1;
      if (openingEnd === -1) openingEnd = tagPattern.lastIndex;
      continue;
    }
    if (isClosingTag) {
      depth -= 1;
      if (depth === 0) return page.slice(openingEnd, token.index);
    }
  }
  throw new Error('entry-content kapanışı bulunamadı');
};

const extractContent = page => {
  const articleStart = page.indexOf('<article');
  const searchablePage = articleStart === -1 ? page : page.slice(articleStart);
  const match = searchablePage.match(/<(div|section)[^>]+class=["'][^"']*entry-content[^"']*["'][^>]*>/i);
  if (!match || match.index === undefined) throw new Error('entry-content alanı bulunamadı');
  const contentStart = (articleStart === -1 ? 0 : articleStart) + match.index;
  const rawContent = getElementInnerHtml(page, contentStart, match[1]);
  return rawContent
    .replace(/<div\b[^>]*>(?:(?!<\/?div\b)[\s\S])*?Makaleyi\s+Yazan\s+Hekim(?:(?!<\/?div\b)[\s\S])*?<\/div>/gi, '')
    .replace(/<p\b[^>]*>(?:(?!<\/?p\b)[\s\S])*?Makaleyi\s+Yazan\s+Hekim(?:(?!<\/?p\b)[\s\S])*?<\/p>/gi, '')
    .replace(/Trakya\s*Dent\s*Trakyadent\s+Ağız ve Diş Sağlığı kliniklerine/gi, 'kliniğimize')
    .replace(/Trakyadent\s+Ağız ve Diş Sağlığı kliniklerinin/gi, 'kliniğimizin')
    .replace(/Trakyadent\s+Ağız ve Diş Sağlığı kliniklerinde/gi, 'kliniğimizde')
    .replace(/Trakyadent(?:['’]de|['’]te)/gi, 'Kliniğimizde')
    .replace(/Trakyadent/gi, 'Kliniğimiz')
    .replace(/(?:(?:Uzm\.|Prof\.|Doç\.|Dr\.|Dt\.)\s*)+[A-ZÇĞİÖŞÜ][A-Za-zÇĞİÖŞÜçğıöşü]+(?:\s+[A-ZÇĞİÖŞÜ][A-Za-zÇĞİÖŞÜçğıöşü]+){0,4}(?=\s|<|$)/g, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<(script|style|noscript|iframe|form|svg|button)[^>]*>[\s\S]*?<\/\1>/gi, '')
    .replace(/<\/?(input|select|option|textarea|img|source|picture|video|audio|canvas)[^>]*>/gi, '')
    .replace(/<a\b[^>]*>/gi, '')
    .replace(/<\/a>/gi, '')
    .replace(/<h[1-6][^>]*>/gi, '<h2>')
    .replace(/<\/h[1-6]>/gi, '</h2>')
    .replace(/\s(?:id|class|style|data-[\w-]+|aria-[\w-]+)=(?:"[^"]*"|'[^']*')/gi, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
};

const entries = await Promise.all(sourcePages.map(async ([id, url]) => {
  const response = await fetch(url, { headers: { 'user-agent': 'KayaAlpContentMigration/1.0' } });
  if (!response.ok) throw new Error(`${id}: HTTP ${response.status}`);
  try {
    return [id, extractContent(await response.text())];
  } catch (error) {
    throw new Error(`${id}: ${error.message}`);
  }
}));

const content = Object.fromEntries(entries);
await writeFile('treatment-source-content.js', `window.TREATMENT_SOURCE_CONTENT = ${JSON.stringify(content)};\n`, 'utf8');
console.log(JSON.stringify({ pages: Object.keys(content).length, characters: Object.values(content).reduce((sum, value) => sum + value.length, 0) }));
