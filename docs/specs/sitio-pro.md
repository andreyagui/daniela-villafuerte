<!-- Generado por el orquestador desde sitio-pro.md -->
<!-- Revisar y aprobar antes de ejecutar -->

Tengo todo el contexto: el brief, el `cv.json` completo (4 empresas, 7 puestos, 5 competencias, 5 logros, 2 títulos, 4 certificaciones), el test que compara frase por frase (y exige que el string `dvillafuerte93xto` aparezca en el HTML crudo y que el teléfono no aparezca), el lint que verifica la base del HTML, y el estado actual (`index.html` + `estilos.css` en raíz). Acá está el spec.

---

# SPEC — Sitio personal de nivel consultoría ejecutiva

## Contexto y decisiones tomadas (no son tareas)

- **Stack:** HTML + CSS + JS puros, sin dependencias ni build. Google Fonts permitido. Se mantienen **Fraunces** (títulos, serif editorial) + **Inter** (cuerpo), ya cargadas hoy.
- **Paleta:** azul marino/grafito con un único acento bronce, en dos temas (claro y oscuro) cuidados ambos.
- **Estructura de la experiencia:** puestos agrupados por empresa en una línea de tiempo lateral, con la empresa como nodo y jerarquía visible (7 puestos, 4 empresas).
- **Orden de las tareas:** primero los CSS (aún no enlazados, commits inertes que pasan puertas), luego la reescritura del HTML en una sola tarea atómica (el test exige el contenido completo en todo momento), luego el JS, luego limpieza y README.
- **Puertas después de cada tarea, antes de commitear:** `npm run lint` y `npm run test`. Son las únicas; el repo no tiene typecheck ni build.
- **Restricciones globales (aplican a todas las tareas que tocan `index.html`):**
  - Todo texto de `contenido/cv.json` va textual, completo, escrito en el HTML (no inyectado con JS).
  - El teléfono no puede aparecer en ninguna forma.
  - El correo va ofuscado, pero el string `dvillafuerte93xto` debe existir en el HTML crudo (el test lo exige): se logra con `data-u="dvillafuerte93xto"` y texto visible con entidades (`dvillafuerte93xto&#64;gmail&#46;com`).
  - `index.html` debe conservar `<!doctype html`, `<html lang=`, `<title` y `viewport` (los exige el lint).
  - Nada de emojis, neón ni gradientes estridentes. `prefers-reduced-motion` respetado.
- **Prohibido:** `git push`, deploys, tocar `contenido/cv.json`, `test/contenido.test.js`, `package.json`, `docs/**`. Un commit por tarea.

---

## Tarea 1 — Tokens del sistema de diseño

- **Qué y por qué:** crear el archivo de variables que concentra toda decisión visual (paleta de ambos temas, escala tipográfica fluida, espaciado, radios, sombras, contenedor, gutter y curva de easing), para que ningún otro archivo tenga valores sueltos.
- **Archivos:** `css/variables.css`
- **Contenido mínimo:** `:root` con `--fondo`, `--texto`, `--titulos`, `--tenue`, `--linea`, `--acento` (tema claro); bloque `[data-tema="oscuro"]` que redefine los mismos tokens; `--fuente-titulos`, `--fuente-cuerpo`; escala fluida con `clamp()` (`--paso--1` a `--paso-4` mínimo); `--espacio-1` a `--espacio-6`; `--radio-*`, `--sombra-*`; `--contenedor-ancho`, `--gutter` fluido con `clamp()`; `--transicion` con `cubic-bezier(...)` propio; `--encabezado-alto`.
- **Criterio de aceptación:** el archivo existe, no contiene ningún valor de color fuera de los bloques de tokens, y `npm run lint` + `npm run test` pasan.
- **Commit:** `feat: define los tokens del sistema de diseño y los dos temas`

## Tarea 2 — Base tipográfica, retícula y detalles de oficio

- **Qué y por qué:** crear la base global (reset, tipografía fluida, contenedor con CSS Grid/gutter, foco accesible, selección con acento, cifras tabulares, reduced-motion) porque es el 80% del resultado editorial.
- **Archivos:** `css/base.css`
- **Contenido mínimo:** reset de `box-sizing`/márgenes; `body` con fuente cuerpo y fondo/token; `h1–h4` con `--fuente-titulos` y escala `clamp()`; contenedor `.contenedor` con `max-width: var(--contenedor-ancho)` y padding `var(--gutter)`; `::selection` con `--acento`; `:focus-visible` visible en todos los enlaces y botones; clase/selector para `font-variant-numeric: tabular-nums` en años y cifras; `section[id] { scroll-margin-top: var(--encabezado-alto) }`; `@media (prefers-reduced-motion: reduce)` que anula animaciones y `scroll-behavior: smooth`.
- **Criterio de aceptación:** todos los valores provienen de variables de `css/variables.css` (no hay px/hex sueltos salvo en `border` de 1px) y `npm run lint` + `npm run test` pasan.
- **Commit:** `feat: agrega estilos base, tipografía fluida y retícula`

## Tarea 3 — Encabezado fijo y hero

- **Qué y por qué:** crear los estilos del encabezado con navegación translúcida y del hero a pantalla completa con las 4 métricas como protagonistas, porque son la primera impresión de marca ejecutiva.
- **Archivos:** `css/encabezado.css`, `css/hero.css`
- **Contenido mínimo:** encabezado fijo con `backdrop-filter` y fondo translúcido, altura `--encabezado-alto`, navegación horizontal que colapsa sin scroll horizontal en celular; botón de tema; hero con `min-height` de viewport, nombre en el paso tipográfico mayor, propuesta de valor, fila/grilla de 4 métricas con cifras en tabular-nums y CTAs con estados hover/focus; en pantalla ancha la grilla aprovecha el ancho (CSS Grid, no columna angosta).
- **Criterio de aceptación:** no hay valores sueltos (todo via tokens), ninguna animación rebota ni parpadea, y `npm run lint` + `npm run test` pasan.
- **Commit:** `feat: agrega estilos del encabezado fijo y del hero`

## Tarea 4 — Secciones de contenido, experiencia y contacto

- **Qué y por qué:** crear los estilos de las secciones con respiro amplio y la línea de tiempo de experiencia agrupada por empresa, porque la experiencia es el corazón del sitio y debe leerse de un vistazo.
- **Archivos:** `css/secciones.css`, `css/experiencia.css`, `css/contacto.css`
- **Contenido mínimo:** `secciones.css`: separación vertical generosa entre secciones (tokens), encabezados de sección consistentes, grillas para competencias (5 áreas) y logros destacados; `experiencia.css`: línea de tiempo con empresa como nodo (nombre + período de empresa) y puestos con cargo, cliente, período y lista de logros, con `break-inside` preparado para print; `contacto.css`: bloque de contacto y pie de página.
- **Criterio de aceptación:** en escritorio la experiencia usa retícula de dos columnas (línea + contenido) y en celular colapsa a una sin scroll horizontal; `npm run lint` + `npm run test` pasan.
- **Commit:** `feat: agrega estilos de secciones, línea de tiempo de experiencia y contacto`

## Tarea 5 — Ajustes de tema oscuro y hoja de impresión

- **Qué y por qué:** crear la capa de transición entre temas y la hoja `@media print`, porque imprimir el CV es un caso de uso real de reclutadores y el tema oscuro debe verse cuidado, no de relleno.
- **Archivos:** `css/temas.css`, `css/print.css`
- **Contenido mínimo:** `temas.css`: transición suave de `background-color`/`color` (dentro de `prefers-reduced-motion: no-preference`) y ajustes de componentes que lo necesiten en oscuro; `print.css`: fuerza los tokens del tema claro, esconde encabezado/navegación/botones de tema e imprimir, `break-inside: avoid` en cada puesto, hero sin altura de viewport, tamaños que entren en 2–3 páginas.
- **Criterio de aceptación:** en `@media print` no queda ninguna regla del tema oscuro activa y la navegación no se imprime; `npm run lint` + `npm run test` pasan.
- **Commit:** `feat: agrega transición de temas y hoja de impresión`

## Tarea 6 — Reescritura completa de index.html

- **Qué y por qué:** reemplazar la "hoja PDF" por la estructura semántica del sitio (encabezado+nav, hero, secciones con anclas, experiencia agrupada, contacto, pie) enlazando los CSS nuevos, conservando íntegro todo el texto de `cv.json`.
- **Archivos:** `index.html`
- **Contenido mínimo:**
  - `<head>`: metas actuales + Google Fonts + los 9 CSS en orden (`variables`, `base`, `encabezado`, `hero`, `secciones`, `experiencia`, `contacto`, `temas`, `print`) + `<script src="js/tema.js" defer>` y `<script src="js/contacto.js" defer>`; ya **no** referencia `estilos.css`.
  - Encabezado fijo con nav a `#resumen`, `#competencias`, `#experiencia`, `#logros`, `#formacion`, `#contacto` y botón de tema con `hidden` (lo revela JS).
  - Hero: nombre, titular textual, propuesta de valor (ver PREGUNTA 1), ubicación, las 4 métricas con valor+etiqueta textuales, CTAs "Ver trayectoria" (ancla) y "Escribirme" (botón con `data-u="dvillafuerte93xto" data-d="gmail.com"`).
  - Secciones con el contenido textual del JSON: resumen ejecutivo entero; 5 competencias con su detalle completo; experiencia con las 4 empresas, sus períodos, los 7 puestos (cargo, cliente cuando existe, período) y **todos** los logros; nota de experiencia previa; los 5 logros destacados; formación con los 2 títulos, las 4 certificaciones e idiomas; contacto con correo ofuscado visible como `dvillafuerte93xto&#64;gmail&#46;com` y enlace LinkedIn con su URL completa visible.
  - Botón "Imprimir" con `hidden` (lo revela JS) y pie de página.
- **Criterio de aceptación:** `npm run test` y `npm run lint` pasan; `grep -c "estilos.css" index.html` da 0; el HTML no contiene ninguna de las cadenas de teléfono prohibidas; el sitio se abre con doble clic y muestra todo el contenido sin JS habilitado.
- **Commit:** `feat: reestructura el sitio como página personal con hero y navegación`

## Tarea 7 — Conmutador de tema con persistencia

- **Qué y por qué:** crear el JS que alterna claro/oscuro recordando la preferencia, porque el brief exige dos temas conmutables con `localStorage` protegido y `prefers-color-scheme` como inicial.
- **Archivos:** `js/tema.js`, `index.html` (una sola adición: snippet inline mínimo en `<head>` que fija `data-tema` antes del primer pintado para evitar el destello)
- **Contenido mínimo:** lectura de `localStorage` dentro de `try/catch`; si no hay preferencia guardada, `matchMedia('(prefers-color-scheme: dark)')`; aplica `data-tema` en `<html>`; al hacer click alterna, guarda (también en `try/catch`) y actualiza `aria-pressed`/`aria-label`; remueve el atributo `hidden` del botón.
- **Criterio de aceptación:** con JS deshabilitado el sitio funciona y el botón no aparece; con JS, el tema persiste entre recargas; `npm run lint` + `npm run test` pasan.
- **Commit:** `feat: agrega conmutador de tema claro y oscuro con persistencia`

## Tarea 8 — Comportamiento de contacto e impresión

- **Qué y por qué:** crear el JS que reensambla el correo ofuscado en un `mailto:` al hacer click y revela el botón de imprimir, porque el correo no puede quedar como `mailto:` en texto plano y la impresión debe ser accesible.
- **Archivos:** `js/contacto.js`
- **Contenido mínimo:** para cada elemento con `data-u`/`data-d`, al click abre `mailto:` reensamblado; revela el botón "Imprimir" (`hidden`) y le asigna `window.print()`; todo con validación temprana si faltan atributos y sin romper nada si algún elemento no existe.
- **Criterio de aceptación:** sin JS el correo visible sigue legible (entidades HTML) y el botón imprimir no aparece; con JS el click en "Escribirme" abre el cliente de correo con la dirección correcta; `npm run lint` + `npm run test` pasan.
- **Commit:** `feat: reensambla el correo ofuscado y agrega el botón de imprimir`

## Tarea 9 — Eliminar la hoja de estilos anterior

- **Qué y por qué:** borrar `estilos.css` porque el sitio ya no lo referencia y mantenerlo duplica el sistema de diseño.
- **Archivos:** `estilos.css` (borrado)
- **Criterio de aceptación:** el archivo no existe, `grep -c "estilos.css" index.html` da 0, y `npm run lint` + `npm run test` pasan.
- **Commit:** `chore: elimina la hoja de estilos anterior`

## Tarea 10 — README actualizado

- **Qué y por qué:** actualizar el README para que describa la nueva estructura (`css/`, `js/`, dos temas, impresión) y cómo verificar el sitio.
- **Archivos:** `README.md`
- **Contenido mínimo:** qué es el sitio, estructura de archivos (`index.html`, `css/variables.css`, `css/base.css`, `css/encabezado.css`, `css/hero.css`, `css/secciones.css`, `css/experiencia.css`, `css/contacto.css`, `css/temas.css`, `css/print.css`, `js/tema.js`, `js/contacto.js`), cómo verlo en local (doble clic), cómo correr `npm run test` y `npm run lint`, y las instrucciones de GitHub Pages que ya estaban.
- **Criterio de aceptación:** el README nombra exactamente los archivos que existen en el repo y `npm run lint` + `npm run test` pasan.
- **Commit:** `docs: actualiza el README con la nueva estructura del sitio`

---

## PREGUNTAS (ambigüedades del brief)

1. **Propuesta de valor del hero.** El brief pide un hero "que diga a quién ayuda y qué entrega", pero también prohíbe inventar contenido fuera de `cv.json`. Propongo usar un fragmento **textual** del resumen ("Aseguro el delivery tecnológico en banca y seguros (Banco Popular y Popular Seguros)…") como frase del hero. ¿Se aprueba ese fragmento textual, o preferís que redacte una frase editorial nueva (lo cual contradice la regla de integridad)?
2. **Botón "Imprimir" como CTA.** El brief lo lista como opción ("escribirle, LinkedIn, ver trayectoria, imprimir"). Lo incluí como CTA secundaria visible solo con JS. ¿Se mantiene, o el hero queda solo con "Escribirme" + "Ver trayectoria" + LinkedIn?
3. **Ubicación de "Idiomas".** No es una sección propia en la lista del brief; lo ubiqué dentro de Formación. ¿Va ahí, en Contacto, o como sección independiente?
