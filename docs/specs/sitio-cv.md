<!-- Generado por el orquestador desde sitio-cv.md -->
<!-- Revisar y aprobar antes de ejecutar -->

He leído el brief completo, el JSON fuente (verifiqué también la parte truncada: Babel Group tiene 3 puestos — Senior Agile Scrum Master, Product Owner y Scrum Master célula T24 — lo que confirma los 7 puestos) y el test de verificación. Con eso, acá está el spec:

---

# Spec ejecutable: sitio web del CV de Daniela Villafuerte Mena

## Contexto y fuente de verdad
- Todo el contenido sale **verbatim** de `/Users/andreyagui/dev/cv-daniela/contenido/cv.json` (4 empresas, 7 puestos, 5 competencias, 5 logros destacados, 2 títulos, 4 certificaciones). No se inventa, no se omite, no se reescribe nada.
- El teléfono **no** aparece en ninguna forma.
- Restricción técnica que impone el test (`test/contenido.test.js`): el test normaliza el HTML quitando etiquetas y entidades, por lo que **todo el contenido verificado debe estar en texto visible, no en atributos** (`data-*`, `title`, etc. no cuentan). Además, la cadena `dvillafuerte93xto` debe aparecer **literal en el HTML crudo**, así que la ofuscación del correo no puede codificar esa parte con entidades.
- Ofuscación decidida para el correo: `dvillafuerte93xto&#64;gmail&#46;com` (entidades para `@` y `.`, sin `mailto:`). El usuario ve el correo completo; un scraper que busque emails en el fuente crudo no lo matchea.

## Puertas de calidad (después de cada tarea, antes de commitear)
1. `npm run lint` → debe terminar con `HTML base correcto`
2. `npm run test` → debe terminar con `Contenido completo: 4 empresas, 7 puestos, 5 logros, 4 certificaciones. Teléfono no publicado.`

No hay otras puertas. No hay pruebas de navegador.

## Archivos prohibidos
`contenido/cv.json`, `test/contenido.test.js`, `package.json`. Tampoco: `git push`, deploys, ni cambios de configuración.

---

## Tarea 1 — Página con el contenido completo del CV

**Qué cambia y por qué:** se crea `index.html` con todo el contenido del JSON en HTML semántico y texto visible, porque el contenido exacto es el criterio principal de aceptación y debe ser indexable sin JavaScript.

**Archivos (lista cerrada):**
- `/Users/andreyagui/dev/cv-daniela/index.html` (crear)

**Alcance:**
- `<!doctype html>`, `<html lang="es">`, `<meta charset="utf-8">`, meta `viewport`, `<title>Daniela Villafuerte Mena</title>`, meta `description` con el titular exacto del JSON, `<link rel="stylesheet" href="estilos.css">`.
- Secciones en este orden (jerarquía del brief): header con nombre (`h1`), titular, sector y ubicación, contacto (correo ofuscado como `dvillafuerte93xto&#64;gmail&#46;com`, sin `mailto:`; LinkedIn con texto visible `linkedin.com/in/daniela-villafuerte-mena-a70a90159` y `href` a la URL completa con `https://`) → 4 métricas (valor + etiqueta) → resumen → competencias (5 áreas, cada una con sus `items`) → experiencia (4 empresas con `periodo_empresa`; cada puesto con cargo, cliente cuando el JSON lo tiene, periodo y su lista de logros; 7 puestos en total) → nota de experiencia previa → 5 logros destacados → educación (2) y certificaciones (4) → idiomas.
- Todos los textos copiados tal cual del JSON, incluyendo guiones `–`/`—`, comillas `«»` y `(90 % completado)`.
- Cero JavaScript, cero estilos en línea, cero teléfono.

**Criterio de aceptación:** `npm run test` y `npm run lint` terminan con exit code 0 y los mensajes esperados citados en las puertas.

**Commit:** `feat: agregar index.html con el contenido completo del CV`

---

## Tarea 2 — Hoja de estilos base, layout de una columna y responsive

**Qué cambia y por qué:** se crea `estilos.css` con la presentación sobria de documento de consultoría (paleta, tipografía de sistema, jerarquía visual) y el comportamiento móvil, porque el contenido ya está completo pero sin presentación.

**Archivos (lista cerrada):**
- `/Users/andreyagui/dev/cv-daniela/estilos.css` (crear)

**Alcance:**
- Variables CSS con la paleta: fondo `#ffffff`, texto `#2d3748`, títulos `#1e3a5f` (azul oscuro), un único acento `#2b6cb0` usado con moderación (enlaces, detalles de métricas).
- Tipografía del sistema (`system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`); sin Google Fonts ni CDNs.
- Contenedor de una columna, `max-width: 760px`, centrado, con margen lateral de **16px** en pantallas angostas; sin scroll horizontal a 375px de ancho.
- Las 4 métricas destacadas arriba, cerca del nombre, en fila con `flex-wrap`.
- Jerarquía visual: nombre > titular > métricas > títulos de sección > cuerpo.

**Criterio de aceptación:** `npm run lint` y `npm run test` pasan; `grep -c "rel=\"stylesheet\"" index.html` ≥ 1; verificación manual (doble clic, sin servidor): la página se ve estilizada y a 375px no hay scroll horizontal.

**Commit:** `feat: agregar estilos base con layout de una columna y diseño responsive`

---

## Tarea 3 — Estilos de impresión y modo oscuro

**Qué cambia y por qué:** se agrega `@media print` para que el CV se exporte bien a PDF (uso real esperado) y `@media (prefers-color-scheme: dark)` aprovechando que la paleta ya vive en variables CSS, por lo que el costo es mínimo.

**Archivos (lista cerrada):**
- `/Users/andreyagui/dev/cv-daniela/estilos.css` (modificar)

**Alcance:**
- `@media print`: fondo blanco y texto oscuro forzados (sin fondos oscuros), `break-inside: avoid` en el bloque de cada puesto para no cortarlo entre páginas, y `@page` con márgenes razonables (2cm).
- `@media (prefers-color-scheme: dark)`: redefinir solo las variables (fondo `#1a202c`, texto `#e2e8f0`, títulos `#90cdf4`, acento `#63b3ed`), sin duplicar reglas.

**Criterio de aceptación:** `npm run lint` y `npm run test` pasan; `grep -c "@media print" estilos.css` ≥ 1 y `grep -c "break-inside" estilos.css` ≥ 1; `grep -c "prefers-color-scheme" estilos.css` ≥ 1.

**Commit:** `feat: agregar estilos de impresión y modo oscuro`

---

## Tarea 4 — README

**Qué cambia y por qué:** se documenta qué es el proyecto, cómo verlo en local y cómo publicarlo en GitHub Pages, porque el dueño del repo necesita esas instrucciones para publicarlo (la publicación la hace él, no este flujo).

**Archivos (lista cerrada):**
- `/Users/andreyagui/dev/cv-daniela/README.md` (crear)

**Alcance:** tres secciones cortas: qué es (página estática del CV, sin build ni dependencias), cómo verlo en local (doble clic en `index.html`, sin servidor), cómo publicarlo (Settings → Pages → rama `main`, carpeta raíz).

**Criterio de aceptación:** el archivo existe y contiene las tres secciones; `npm run lint` y `npm run test` siguen pasando.

**Commit:** `docs: agregar README con instrucciones de uso y publicación`

---

## PREGUNTAS

1. **Modo oscuro:** el brief lo deja opcional ("si no te complica"). Con variables CSS el costo es bajo, así que lo incluí en la tarea 3. Si preferís dejarlo fuera, la tarea 3 queda solo con `@media print` y ajusto el mensaje de commit a `feat: agregar estilos de impresión para exportar el CV a PDF`. ¿Lo mantengo?
2. **Nivel de ofuscación del correo:** el test exige que `dvillafuerte93xto` aparezca literal en el HTML crudo, lo que limita la ofuscación a codificar el dominio con entidades (`&#64;`, `&#46;`). ¿Ese nivel es suficiente, o querés además un reensamblado visual por CSS (por ejemplo, invertir el dominio con `direction: rtl`)? Más allá de eso no se puede ir sin romper el test.
