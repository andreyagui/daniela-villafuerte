<!-- Generado por el orquestador desde diseno-ejecutivo.md -->
<!-- Revisar y aprobar antes de ejecutar -->

Leí el brief, el `index.html`, `estilos.css`, `test/contenido.test.js` y `package.json`. Contexto clave que condiciona el spec:

- El test normaliza el HTML quitando etiquetas y compara contra `cv.json` → puedo agregar contenedores, clases y spans libremente, pero ningún carácter de texto del CV puede cambiar.
- El lint verifica que `index.html` conserve `<!doctype html`, `<html`, `lang=`, `<title`, `viewport`.
- Puertas: sólo `npm run test` y `npm run lint`. No hay typecheck ni build.
- Archivos tocables: `index.html` y `estilos.css`. Prohibidos: `contenido/cv.json`, `test/contenido.test.js`, `package.json`, `README.md`.

---

# SPEC: Diseño ejecutivo del CV

## Restricciones globales (valen para todas las tareas)

- Después de cada tarea, antes de commitear: `npm run test` y `npm run lint` deben pasar. No hay otras puertas.
- Prohibido agregar JavaScript, librerías, imágenes, emojis, gradientes llamativos o sombras de color.
- Prohibido tocar `contenido/cv.json`, `test/contenido.test.js`, `package.json`, `README.md`.
- Prohibido `git push`, deploys o cambios de configuración.
- Ningún texto del CV se borra, acorta, reescribe ni resume. Sólo se envuelve en contenedores/clases nuevas.
- El correo ofuscado (`dvillafuerte93xto&#64;gmail&#46;com`) y la URL de LinkedIn se conservan tal cual.
- `index.html` debe seguir abriendo con doble clic, sin servidor, y legible sin JavaScript. Las fuentes de Google Fonts se cargan por `<link>` con `display=swap` y stack de respaldo del sistema (si no hay red, el sitio se ve con las fuentes de respaldo, nunca roto).

---

## Tarea 1: Preparar la estructura del HTML

**Qué cambia y por qué:** se agregan los contenedores y el `<link>` de fuentes que el diseño necesita, sin tocar ningún texto, para que las tareas de CSS siguientes no vuelvan a tocar el HTML.

**Archivos:**
- `/Users/andreyagui/dev/cv-daniela/index.html`

**Cambios concretos:**
1. En `<head>`, agregar `<link rel="preconnect" href="https://fonts.googleapis.com">`, `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` y el `<link>` de Google Fonts con la pareja tipográfica decidida en PREGUNTAS (con `display=swap`). El `<link rel="stylesheet" href="estilos.css">` queda después de los de fuentes.
2. En `.encabezado`: envolver `<h1>` y `.titular` en un `<div class="identidad">`; envolver `.sector`, `.ubicacion` y `.contacto` en un `<div class="datos">`.
3. En cada `<article class="empresa">`: envolver el `<h3>` y el `.periodo-empresa` en un `<header class="empresa-cabecera">`.
4. En cada `<div class="puesto">`: envolver el `<h4>`, el `.cliente` (cuando existe) y el `.periodo` en un `<header class="puesto-cabecera">`.
5. No se modifica, agrega ni quita ningún texto visible fuera de estos envoltorios.

**Criterio de aceptación:**
- `npm run test` pasa (contenido intacto palabra por palabra).
- `npm run lint` pasa (siguen `<!doctype html`, `<html`, `lang=`, `<title`, `viewport`).
- `grep -c "fonts.googleapis.com" index.html` ≥ 1.
- `grep -c "empresa-cabecera" index.html` = 5 (una por empresa) y `grep -c "puesto-cabecera" index.html` = 6 (uno por puesto).

**Commit:** `feat: prepara la estructura del HTML para el diseño ejecutivo`

---

## Tarea 2: Reescribir la base de `estilos.css` (sistema de diseño)

**Qué cambia y por qué:** se reemplaza la hoja actual por una base con variables (paleta, escala de espaciado, tipografías) y la tipografía global, que es el 80% del resultado según el brief.

**Archivos:**
- `/Users/andreyagui/dev/cv-daniela/estilos.css` (reescritura completa del archivo; las tareas 3–7 lo extienden)

**Cambios concretos:**
1. `:root` con variables: `--fondo` (blanco o blanco roto), `--texto`, `--titulos` (azul marino profundo o grafito, según PREGUNTAS), `--tenue` (para etiquetas y metadatos), `--linea` (gris muy claro para reglas de 1px), `--acento` (un solo color de acento, según PREGUNTAS), `--fuente-titulos` (serif editorial con respaldo), `--fuente-cuerpo` (sans limpio con respaldo).
2. Escala de espaciado en variables: `--espacio-1: 4px` … `--espacio-6: 64px` (4/8/16/24/40/64). Todos los márgenes y paddings de la hoja usan estas variables, no números sueltos.
3. Reset: `box-sizing: border-box` universal.
4. `body`: fuente cuerpo, tamaño entre 16 y 17px, `line-height: 1.6`, fondo y texto con variables.
5. `.hoja`: ancho de medida máximo 68ch, centrada, padding generoso con variables de la escala.
6. `h1`: fuente de títulos, tamaño grande (≥ 2.5rem en escritorio), `letter-spacing` negativo.
7. `h2` (títulos de sección): mayúsculas (`text-transform: uppercase`), tamaño pequeño (≤ 0.85rem), `letter-spacing` ≥ 0.12em, color `--tenue`.
8. `::selection` con el color de acento (fondo acento, texto legible sobre él).
9. Enlaces: color de acento, transición suave de color (`transition` ≤ 200ms), sin subrayado llamativo.
10. `font-variant-numeric: tabular-nums` en `.valor`, `.periodo` y `.periodo-empresa`.
11. `scroll-behavior: smooth` en `html`.
12. Reglas horizontales entre secciones con borde de 1px en `--linea` (vía `border-top` en `section + section`, sin bordes gruesos).
13. Se conserva compat visual razonable: el sitio ya debe verse ordenado al terminar esta tarea, aunque los componentes finos llegan en las tareas 3 y 4.

**Criterio de aceptación:**
- `npm run test` y `npm run lint` pasan.
- `estilos.css` define las variables `--espacio-1` a `--espacio-6` y no contiene `margin`/`padding` con valores en px/rem fuera de `var(--espacio-*)` (salvo el caso 0).
- `grep -E "letter-spacing: -" estilos.css` tiene resultado (h1) y `grep "0.12em" estilos.css` también (h2).
- `grep "::selection" estilos.css` y `grep "tabular-nums" estilos.css` tienen resultado.
- El acento (`var(--acento)`) se usa en como máximo 3 contextos: enlaces, `::selection` y un detalle (a definir, p. ej. marca de la línea de tiempo). Sin gradientes ni sombras de color.

**Commit:** `feat: reescribe la base tipográfica y el sistema de diseño`

---

## Tarea 3: Encabezado y banda de métricas

**Qué cambia y por qué:** la banda de métricas es lo primero que se mira; se trata como portada de informe anual, con números grandes y separadores finos.

**Archivos:**
- `/Users/andreyagui/dev/cv-daniela/estilos.css`

**Cambios concretos:**
1. `.encabezado`: layout con `.identidad` y `.datos` (en escritorio pueden ir en dos columnas o apilados con ritmo generoso; decisión libre dentro del sistema); el nombre manda visualmente; `.titular` con peso medio y tamaño intermedio; `.sector` y `.ubicacion` en color `--tenue`.
2. `.contacto`: fila con separación, sin borde de acento grueso (se elimina el estilo actual de borde izquierdo si quedara).
3. `.metricas ul`: fila de 4 columnas iguales, separadas por líneas verticales finas de 1px en `--linea` (bordes entre items, no recuadros), `list-style: none`.
4. `.metricas .valor`: fuente de títulos, tamaño grande (≥ 2rem), `tabular-nums`, color `--titulos` (no acento: los números ya destacan por tamaño).
5. `.metricas .etiqueta`: mayúsculas pequeñas con `letter-spacing` amplio, color `--tenue`, debajo del valor (`display: block`).
6. Sin recuadros de fondo ni sombras: sólo tipografía, espacio y líneas finas.

**Criterio de aceptación:**
- `npm run test` y `npm run lint` pasan.
- `.metricas .valor` usa `var(--fuente-titulos)` y `tabular-nums`.
- Las etiquetas de métricas usan `text-transform: uppercase` y `letter-spacing` ≥ 0.12em.
- No hay `box-shadow` ni `border` ≥ 2px en la banda de métricas.

**Commit:** `feat: diseña el encabezado y la banda de métricas`

---

## Tarea 4: Experiencia, listas y resto de secciones

**Qué cambia y por qué:** se da lectura de recorrido a la experiencia (empresas como bloques, puestos subordinados) y viñetas discretas a todas las listas.

**Archivos:**
- `/Users/andreyagui/dev/cv-daniela/estilos.css`

**Cambios concretos:**
1. `.empresa`: bloque claro con margen superior de la escala; `.empresa-cabecera` con el `<h3>` a la izquierda y `.periodo-empresa` alineado a la derecha (o en columna propia, según PREGUNTAS) en `tabular-nums` y color `--tenue`.
2. `.puesto`: visiblemente subordinado a la empresa (indentación o sangría + regla vertical fina de 1px en `--linea` a la izquierda como línea de tiempo discreta, con marca pequeña por puesto, si se decide en PREGUNTAS); `.puesto-cabecera` con `.periodo` a la derecha.
3. Viñetas discretas: en `.puesto ul li`, `.logros-destacados li`, `.educacion li`, `.certificaciones li` y `.competencias li` se reemplaza el bullet del navegador por un marcador propio vía `::marker` o `::before` (punto chico o regla corta en `--tenue` o acento, si es el tercer uso del acento), con `list-style: none` y padding consistente de la escala.
4. `.competencias`: cada `li` con su `h3` como etiqueta y el detalle en cuerpo; espaciado de la escala.
5. `.nota`: tamaño menor y color `--tenue`.
6. `.educacion`, `.certificaciones`, `.idiomas`: ritmo consistente con el resto; separación entre secciones ya dada por la regla de 1px de la tarea 2.

**Criterio de aceptación:**
- `npm run test` y `npm run lint` pasan.
- No queda `list-style` por defecto del navegador en las listas del CV (todas las listas de contenido tienen `list-style: none` o marcador propio definido).
- `.periodo` y `.periodo-empresa` tienen `tabular-nums` y se alinean a la derecha o en columna propia en escritorio.
- Ningún texto del CV queda oculto (`display: none`/`visibility: hidden` están prohibidos sobre contenido).

**Commit:** `feat: diseña la experiencia y las listas con lectura de recorrido`

---

## Tarea 5: Diseño para celular

**Qué cambia y por qué:** una columna, margen de 16px, sin scroll horizontal y métricas 2×2, para que el CV se lea bien en pantallas chicas.

**Archivos:**
- `/Users/andreyagui/dev/cv-daniela/estilos.css`

**Cambios concretos:**
1. `@media (max-width: 640px)` (o el breakpoint del sistema, único y con nombre en comentario):
   - `.hoja` con padding lateral de 16px.
   - `.metricas ul` pasa a grilla 2×2 (`grid-template-columns: 1fr 1fr` o flex con `flex: 1 1 45%`), manteniendo separadores finos sin que se corten feo.
   - `h1` con tamaño fluido o reducido para que "Daniela Villafuerte Mena" no se desborde; `overflow-wrap` donde haga falta.
   - `.empresa-cabecera` y `.puesto-cabecera` apilan título y período (el período deja de flotar a la derecha).
   - Todo en una sola columna.
2. Se verifica por inspección del CSS que no haya anchos fijos en px mayores que el viewport en ningún contenedor de contenido.

**Criterio de aceptación:**
- `npm run test` y `npm run lint` pasan.
- `grep -A2 "max-width: 640px" estilos.css` muestra la grilla 2×2 de métricas y el padding lateral de 16px.
- No hay reglas con `width` fija en px dentro de contenedores de contenido (los anchos son `max-width`, `%`, `ch` o `fr`).

**Commit:** `feat: adapta el diseño a pantallas chicas`

---

## Tarea 6: Modo oscuro

**Qué cambia y por qué:** soporte de `prefers-color-scheme: dark` redefiniendo sólo variables, con fondo gris muy oscuro (no negro) y texto blanco roto.

**Archivos:**
- `/Users/andreyagui/dev/cv-daniela/estilos.css`

**Cambios concretos:**
1. `@media (prefers-color-scheme: dark)` que redefine únicamente las variables de color de `:root`: `--fondo` en gris muy oscuro (no `#000`), `--texto` en blanco roto, `--titulos`, `--tenue`, `--linea` (gris oscuro perceptible) y `--acento` en una variante que mantenga contraste legible sobre el fondo oscuro.
2. Sin duplicar reglas de componentes: todo el contraste sale de las variables.

**Criterio de aceptación:**
- `npm run test` y `npm run lint` pasan.
- `grep "prefers-color-scheme: dark" estilos.css` tiene resultado.
- Dentro del bloque oscuro sólo se redefinen variables (sin reglas de layout duplicadas).
- El fondo oscuro no es `#000` ni `#000000`.

**Commit:** `feat: agrega modo oscuro por preferencia del sistema`

---

## Tarea 7: Estilos de impresión

**Qué cambia y por qué:** el CV se guarda como PDF para adjuntarlo; la impresión debe salir limpia en 2–3 páginas sin partir puestos.

**Archivos:**
- `/Users/andreyagui/dev/cv-daniela/estilos.css`

**Cambios concretos:**
1. `@media print`:
   - `body` con fondo `#ffffff` y texto negro (o casi negro), independiente del modo oscuro del sistema.
   - Tamaño de cuerpo reducido (11–12pt) y márgenes de la escala ajustados para que quepa en 2–3 páginas.
   - `break-inside: avoid` en `.empresa` y `.puesto`.
   - Los enlaces muestran su URL junto al texto en papel: `a[href^="http"]::after { content: " (" attr(href) ")"; }` en tamaño menor y color negro, o como mínimo sin quedar como azul subrayado sin contexto.
   - Se ocultan sólo elementos decorativos si los hubiera (nunca contenido del CV).
2. `@page { margin: 1.5cm 2cm; }` (márgenes entre 1.5cm y 2cm).

**Criterio de aceptación:**
- `npm run test` y `npm run lint` pasan.
- `grep "break-inside: avoid" estilos.css` cubre `.empresa` y `.puesto` dentro de `@media print`.
- `grep "@page" estilos.css` con margen entre 1.5cm y 2cm.
- `grep "attr(href)" estilos.css` tiene resultado dentro de `@media print`.
- El bloque `@media print` fuerza fondo blanco y texto negro explícitos.

**Commit:** `feat: agrega estilos de impresión para exportar a PDF`

---

## PREGUNTAS (resolver antes de ejecutar; el spec no inventa estas decisiones)

1. **Pareja tipográfica:** ¿cuál de las opciones del brief? (a) Fraunces + Inter, (b) Newsreader + Inter, (c) Instrument Serif + Public Sans, (d) Libre Baskerville + Inter, (e) un solo sans de calidad en varios pesos (¿cuál?).
2. **Paleta:** ¿color estructural azul marino profundo o grafito? ¿Y el único acento: bronce, terracota apagado o azul más saturado?
3. **Línea de tiempo en Experiencia:** el brief dice "ayuda si no satura". ¿Se implementa la regla vertical fina con marcas (tarea 4.2) o se omite?
4. **Períodos en Experiencia:** ¿alineados a la derecha del título o en una columna propia a la izquierda (grid de dos columnas)?
5. **Tercer uso del acento:** el brief permite máximo tres. Enlaces y `::selection` ya son dos. ¿El tercero es la marca de la línea de tiempo/viñetas, o se reserva para otra cosa (p. ej. nada más, dejándolo en dos usos)?
