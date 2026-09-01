import { readFile, writeFile } from 'node:fs/promises';

const decode = value => value
  .replace(/&amp;/g, '&')
  .replace(/<br\s*\/?>/gi, ' · ')
  .replace(/<[^>]*>/g, '')
  .replace(/\s+/g, ' ')
  .trim();

const slugify = value => value
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLocaleLowerCase('tr-TR')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/(^-|-$)/g, '');

const html = await readFile('index.html', 'utf8');
const section = html.match(/<div class="source-team-grid"[\s\S]*?<\/div><\/div><\/section>/i)?.[0];
if (!section) throw new Error('Ana sayfadaki hekim listesi bulunamadı.');

const doctors = [...section.matchAll(/<article><img src="([^"]+)" alt="([^"]+)"[^>]*><div><h3>([\s\S]*?)<\/h3><p>([\s\S]*?)<\/p><\/div><\/article>/gi)]
  .map(([, image, alt, name, area]) => ({
    id: slugify(decode(name).replace(/^(?:Uzm\.\s*)?(?:Dr\.\s*)?(?:Dt\.\s*)?/i, '')),
    name: decode(name),
    area: decode(area),
    image: decode(image),
    alt: decode(alt)
  }));

if (!doctors.length) throw new Error('Hekim kartları ayrıştırılamadı.');
await writeFile('doctor-roster.js', `window.KAYA_ALP_DOCTORS = ${JSON.stringify(doctors)};\n`, 'utf8');
console.log(JSON.stringify({ doctors: doctors.length }));
