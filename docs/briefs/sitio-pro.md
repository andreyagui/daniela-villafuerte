# Brief: rehacer el sitio como un sitio web de verdad, no un documento

## El problema con lo que hay
La versión actual parece un PDF puesto en línea: una hoja blanca con texto de arriba a abajo. No es
eso lo que queremos. Queremos un **sitio web personal de nivel profesional**, del mismo calibre que
`referencia/variables-referencia.css` (es el sistema de diseño real del sitio del dueño del repo:
mirálo para calibrar la ambición, no para copiarlo).

## Tenés libertad creativa
Esta vez no te voy a dictar la estética. Vos decidís paleta, tipografías, retícula, personalidad y
secciones. Lo único que no se negocia es el **nivel de oficio** y la **integridad del contenido**.

Dicho eso, tiene que servirle a **Daniela Villafuerte Mena: Senior Agile Scrum Master y Agile
Delivery Lead en banca y seguros, 13 años de experiencia, 6 equipos y hasta 28 personas a cargo.**
Su público son directores de tecnología, gerentes de delivery y reclutadores de banca. No es una
portfolio de diseñador ni de desarrollador front-end: es una líder de entrega en un sector
regulado. Que se vea capaz, sólida y contemporánea. Elegí la personalidad visual que mejor
comunique eso.

## Lista cerrada de archivos
Podés crear y organizar libremente **dentro de estas rutas**:
- `index.html`
- `css/**` (organizalo en varios archivos por sección, como el sitio de referencia)
- `js/**` (opcional)
- `README.md`

**No toques:** `contenido/cv.json`, `test/contenido.test.js`, `package.json`,
`referencia/**`, `docs/**`. Podés borrar el `estilos.css` viejo de la raíz si lo reemplazás.

## Lo que hace que un sitio se vea profesional (el estándar a alcanzar)

**Estructura de sitio, no de hoja.**
- Encabezado fijo con navegación a las secciones, con `backdrop-filter` y fondo translúcido.
- Un **hero** que ocupe pantalla: su nombre grande, el rol, las 4 métricas, y llamadas a la acción
  (ver experiencia, LinkedIn, descargar/imprimir).
- Secciones bien separadas con respiro generoso entre ellas, cada una con su identidad visual.
- Un pie de página.

**Sistema de diseño en variables CSS.** Mirá el archivo de referencia: paleta en variables, escala
tipográfica **fluida con `clamp()`**, escala de radios, escala de espaciado, una curva de
`cubic-bezier` propia, ancho de contenedor y `gutter` fluido. Nada de valores sueltos repartidos.

**Dos temas.** Claro y oscuro, conmutables por el usuario con un botón (guardá la preferencia en
`localStorage`, envuelto en `try/catch`) y respetando `prefers-color-scheme` como valor inicial.

**Retícula de verdad.** Usá CSS Grid para el hero, las métricas y las tarjetas. Que en pantalla
ancha se aproveche el ancho y no quede una columna angosta de texto en el medio.

**La experiencia profesional es el corazón.** Son 4 empresas y 7 puestos. Diseñá algo mejor que una
lista: una línea de tiempo, tarjetas, o puestos agrupados por empresa con jerarquía clara. Que se
entienda el recorrido de un vistazo: de administración y finanzas hacia liderazgo ágil en banca.

**Micro-interacciones, con criterio.** Transiciones suaves al pasar el mouse, aparición de secciones
al hacer scroll con `IntersectionObserver`, foco visible en los enlaces. Nada que parpadee, rebote
sin motivo ni distraiga. Respetá `prefers-reduced-motion`.

**Detalles que delatan oficio.** `font-variant-numeric: tabular-nums` en años y cifras,
`::selection` con el acento, `scroll-margin-top` en las secciones para que el encabezado fijo no las
tape, estados de foco accesibles, contraste suficiente en los dos temas.

## Reglas que no se negocian

1. **`npm run test` tiene que pasar.** Compara el HTML contra `contenido/cv.json` frase por frase.
   No podés borrar, acortar, resumir ni reescribir ningún texto del CV. Tienen que estar las 4
   empresas, los 7 puestos, **todos** los logros de cada puesto, las 5 competencias con su detalle
   completo, los 5 logros destacados, los 2 títulos, las 4 certificaciones y el resumen ejecutivo
   entero.
2. **El contenido va escrito en el HTML**, no inyectado con JavaScript. El test ignora lo que esté
   dentro de `<script>`, y además el sitio tiene que funcionar sin JS y ser indexable. El JS es sólo
   para comportamiento: tema, navegación, animaciones.
3. **El teléfono no existe para vos.** No está en el JSON a propósito; el test falla si aparece.
4. **El correo tiene que estar pero ofuscado** contra scrapers (texto partido y reensamblado, o
   entidades HTML, o `data-` atributos). No un `mailto:` en texto plano.
5. **Sin dependencias ni compilación.** Google Fonts sí. Nada de React, bundlers, npm install ni
   librerías de JS por CDN. GitHub Pages sirve `index.html` directo.
6. **Se tiene que poder imprimir.** `@media print` que fuerce tema claro, esconda la navegación y el
   botón de tema, evite cortar un puesto a la mitad (`break-inside: avoid`) y quepa en 2 o 3 páginas.

## Criterios de aceptación
- `npm run test` pasa.
- `npm run lint` pasa.
- `index.html` abre con doble clic, sin servidor, y se ve terminado.
- Se ve bien en celular (sin scroll horizontal, margen lateral cómodo) y aprovecha el ancho en
  escritorio.
- Los dos temas se ven cuidados, no uno bueno y el otro de relleno.
- Ni un texto del CV se perdió ni se alteró.

## Fuera de alcance
Inventar datos, agregar secciones que no salgan de `cv.json`, formulario de contacto, analítica,
versión en inglés.
