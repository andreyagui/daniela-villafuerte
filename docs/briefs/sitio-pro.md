# Brief: sitio personal de nivel consultoría ejecutiva

## El problema con lo que hay
La versión actual parece un PDF puesto en línea: una hoja blanca con texto de arriba a abajo. Hay
que rehacerlo como un **sitio web personal** del calibre que se usa en marca personal ejecutiva y
consultoría.

## Para quién es
**Daniela Villafuerte Mena: Senior Agile Scrum Master y Agile Delivery Lead en banca y seguros.**
13 años de experiencia, 6 equipos, hasta 28 personas a cargo, 87+ pases a producción, core bancario
T24, entorno regulado.

Su público son directores de tecnología, gerentes de delivery y reclutadores de banca y seguros. No
es un portfolio de diseñador ni de desarrollador: es la marca personal de una **líder de entrega en
un sector regulado**. El sitio tiene que comunicar criterio, solidez y capacidad de gobierno, no
destreza técnica ni audacia visual.

## Tenés libertad creativa
Vos decidís paleta, tipografías, retícula, secciones y personalidad. No se negocian el **nivel de
oficio** y la **integridad del contenido**.

## Referencia de estilo: editorial y de consultoría premium
Lo que distingue a un sitio de marca personal ejecutiva de una plantilla, según la práctica del
nicho:

- **La tipografía es el 80% del resultado.** Familias de verdad, bien pareadas, en varios pesos.
  Un serif editorial para los títulos con un sans limpio para el cuerpo funciona muy bien en este
  nicho; un solo sans de alta calidad en varios pesos también. Jerarquía inequívoca.
- **Espaciado generoso y deliberado.** El respiro es lo que lee como "caro". El apuro se nota.
- **Las señales de confianza son el contenido principal.** En su caso: las cifras de entrega
  (13 años, 6 equipos, 28 personas, 87+ pases, 20+ requerimientos en paralelo), los proyectos
  nombrados (ABANKS, CICAC, Emisión MasterCard, IVA Transfronterizo, SINPE Pagos Inmediatos) y las
  certificaciones. En este nicho una métrica de entrega creíble vale más que un párrafo de teoría de
  frameworks: tratalas como protagonistas, no como adorno.
- **Un hero que diga a quién ayuda y qué entrega**, no sólo su nombre y puesto. Con una o dos
  llamadas a la acción claras (escribirle, LinkedIn, ver trayectoria, imprimir).
- **Navegación simple** y sistema de layout consistente.
- **Movimiento suave pero controlado.** Nada que rebote, parpadee ni llame la atención sobre sí
  mismo. Respetá `prefers-reduced-motion`.
- **Paleta sobria y madura.** Azul marino, grafito, verde profundo o beige editorial funcionan en
  banca; un solo acento usado con moderación. Nada de neón, gradientes estridentes ni emojis.

## Lista cerrada de archivos
Creá y organizá libremente **dentro de estas rutas**:
- `index.html`
- `css/**` (varios archivos por sección, con un archivo de variables)
- `js/**` (opcional, sólo comportamiento)
- `README.md`

**No toques:** `contenido/cv.json`, `test/contenido.test.js`, `package.json`, `docs/**`.
Podés borrar el `estilos.css` viejo de la raíz al reemplazarlo.

## Estructura que se espera
- Encabezado fijo con navegación a las secciones, fondo translúcido con `backdrop-filter`.
- **Hero** que ocupe pantalla: nombre, rol, la propuesta de valor y las 4 métricas.
- Secciones separadas con respiro amplio: resumen, competencias, experiencia, logros, formación,
  contacto. Un pie de página.
- **La experiencia es el corazón:** 4 empresas y 7 puestos. Diseñá algo mejor que una lista. Una
  línea de tiempo, tarjetas, o puestos agrupados por empresa con jerarquía visible. Que se entienda
  de un vistazo el recorrido: de administración y finanzas hacia liderazgo ágil en banca.
- **Retícula real** con CSS Grid. En pantalla ancha aprovechá el ancho; no dejes una columna angosta
  de texto en el medio.

## Sistema de diseño
Todo en variables CSS: paleta, escala tipográfica **fluida con `clamp()`**, escala de espaciado,
radios, sombras, ancho de contenedor, `gutter` fluido y una curva de `cubic-bezier` propia. Nada de
valores sueltos repartidos por los archivos.

**Dos temas**, claro y oscuro, conmutables con un botón, guardando la preferencia en `localStorage`
envuelto en `try/catch`, y tomando `prefers-color-scheme` como valor inicial. Los dos tienen que
verse cuidados: ninguno de relleno.

**Detalles que delatan oficio:** `font-variant-numeric: tabular-nums` en años y cifras,
`::selection` con el acento, `scroll-margin-top` para que el encabezado fijo no tape las secciones,
foco visible y accesible en todos los enlaces, contraste suficiente en ambos temas.

## Reglas que no se negocian
1. **`npm run test` tiene que pasar.** Compara el HTML contra `contenido/cv.json` frase por frase.
   No podés borrar, acortar, resumir ni reescribir ningún texto del CV: las 4 empresas, los 7
   puestos, **todos** los logros de cada puesto, las 5 competencias con su detalle completo, los 5
   logros destacados, los 2 títulos, las 4 certificaciones y el resumen ejecutivo entero.
2. **El contenido va escrito en el HTML**, no inyectado con JavaScript. El test ignora lo que esté
   dentro de `<script>`, y el sitio tiene que funcionar sin JS y ser indexable.
3. **El teléfono no existe para vos.** No está en el JSON a propósito; el test falla si aparece.
4. **El correo va ofuscado** contra scrapers (partido y reensamblado, entidades HTML o atributos
   `data-`). No un `mailto:` en texto plano.
5. **Sin dependencias ni compilación.** Google Fonts sí. Nada de React, bundlers, `npm install` ni
   librerías por CDN. GitHub Pages sirve `index.html` directo.
6. **`@media print`:** fuerza tema claro, esconde navegación y botón de tema, `break-inside: avoid`
   en cada puesto, y entra en 2 o 3 páginas.

## Criterios de aceptación
- `npm run test` y `npm run lint` pasan.
- `index.html` abre con doble clic y se ve terminado.
- Celular sin scroll horizontal; escritorio aprovecha el ancho.
- Los dos temas se ven cuidados.
- Ni un texto del CV se perdió ni se alteró.

## Fuera de alcance
Inventar datos, secciones que no salgan de `cv.json`, formulario de contacto, analítica, versión en
inglés.
