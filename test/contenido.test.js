/**
 * Verifica que el sitio no omita ni altere nada del CV, y que no filtre datos privados.
 *
 * El peor fallo posible en el CV de una persona real es que se pierda un trabajo, una
 * certificación o un logro, o que aparezca algo que ella no escribió. Este test compara
 * el HTML renderizado contra contenido/cv.json, que es la única fuente de verdad.
 */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const RAIZ = path.join(__dirname, '..');
const cv = JSON.parse(fs.readFileSync(path.join(RAIZ, 'contenido/cv.json'), 'utf8'));

assert.ok(fs.existsSync(path.join(RAIZ, 'index.html')), 'falta index.html');
const html = fs.readFileSync(path.join(RAIZ, 'index.html'), 'utf8');

/** Deja el texto comparable: sin etiquetas, sin entidades y con espacios colapsados. */
function normalizar(texto) {
  return texto
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&laquo;/gi, '«')
    .replace(/&raquo;/gi, '»')
    .replace(/&ndash;/gi, '–')
    .replace(/&mdash;/gi, '—')
    .replace(/&hellip;/gi, '…')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/\s+/g, ' ')
    .trim();
}

const texto = normalizar(html);
const fallas = [];

function debeAparecer(valor, donde) {
  if (!valor) return;
  const buscado = normalizar(String(valor));
  if (!texto.includes(buscado)) {
    fallas.push(`${donde}: falta «${buscado.slice(0, 80)}${buscado.length > 80 ? '…' : ''}»`);
  }
}

// --- identidad -------------------------------------------------------------
debeAparecer(cv.nombre, 'nombre');
debeAparecer(cv.titular, 'titular');
debeAparecer(cv.ubicacion, 'ubicación');
debeAparecer(cv.resumen, 'resumen ejecutivo');
debeAparecer(cv.idiomas, 'idiomas');

// --- métricas: valor y etiqueta, los dos -----------------------------------
cv.metricas.forEach((m, i) => {
  debeAparecer(m.valor, `métrica ${i + 1} (valor)`);
  debeAparecer(m.etiqueta, `métrica ${i + 1} (etiqueta)`);
});

// --- competencias ----------------------------------------------------------
cv.competencias.forEach((c) => {
  debeAparecer(c.area, `competencia «${c.area}»`);
  debeAparecer(c.items, `detalle de «${c.area}»`);
});

// --- experiencia: cada empresa, cada puesto, cada logro --------------------
cv.experiencia.forEach((e) => {
  debeAparecer(e.empresa, 'empresa');
  debeAparecer(e.periodo_empresa, `período de ${e.empresa}`);
  e.puestos.forEach((p) => {
    debeAparecer(p.cargo, `cargo en ${e.empresa}`);
    debeAparecer(p.cliente, `cliente de ${p.cargo}`);
    debeAparecer(p.periodo, `período de ${p.cargo}`);
    p.logros.forEach((l, i) => debeAparecer(l, `logro ${i + 1} de ${p.cargo} (${e.empresa})`));
  });
});
debeAparecer(cv.nota_experiencia_previa, 'nota de experiencia previa');

// --- logros, educación, certificaciones ------------------------------------
cv.logros.forEach((l, i) => debeAparecer(l, `logro destacado ${i + 1}`));
cv.educacion.forEach((e, i) => debeAparecer(e, `educación ${i + 1}`));
cv.certificaciones.forEach((c, i) => debeAparecer(c, `certificación ${i + 1}`));

// --- contacto --------------------------------------------------------------
debeAparecer(cv.linkedin.replace('https://', ''), 'enlace de LinkedIn');

// --- privacidad: el teléfono NO puede estar, en ninguna forma --------------
const TELEFONOS_PROHIBIDOS = [
  '7215-0942', '72150942', '7215 0942', '+506 7215', '50672150942',
];
TELEFONOS_PROHIBIDOS.forEach((t) => {
  if (html.replace(/\s+/g, ' ').includes(t) || html.replace(/[\s()-]/g, '').includes(t.replace(/[\s()-]/g, ''))) {
    fallas.push(`PRIVACIDAD: el teléfono aparece en el HTML («${t}»). Decisión tomada: no se publica.`);
  }
});

// --- no se inventa nada ----------------------------------------------------
if (!/dvillafuerte93xto/.test(html)) {
  fallas.push('contacto: no se encontró el correo (puede estar ofuscado, pero el usuario debe poder escribirle)');
}

if (fallas.length > 0) {
  console.error(`\n${fallas.length} problema(s) de contenido:\n`);
  fallas.forEach((f) => console.error('  - ' + f));
  console.error('');
  process.exit(1);
}

const total = cv.experiencia.reduce((n, e) => n + e.puestos.length, 0);
console.log(`Contenido completo: ${cv.experiencia.length} empresas, ${total} puestos, ` +
            `${cv.logros.length} logros, ${cv.certificaciones.length} certificaciones. ` +
            `Teléfono no publicado.`);
