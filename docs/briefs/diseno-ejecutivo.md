# Brief: elevar el diseño a nivel ejecutivo

## Objetivo
El sitio ya tiene el contenido completo y correcto, pero se ve como un documento plano. Hay que
elevarlo a un diseño que una Senior Agile Scrum Master de banca pueda mandar a un director sin
dudar. Tiene que verse **caro, deliberado y confiable**, no plantilla.

## Lista cerrada de archivos
- `estilos.css` (reescribir por completo)
- `index.html` (sólo para agregar o reorganizar contenedores, clases y `<span>` que el diseño
  necesite)

**No toques** `contenido/cv.json`, `test/contenido.test.js`, `package.json` ni `README.md`.

## Regla que no se negocia
`npm run test` compara el HTML contra `cv.json` palabra por palabra. **No podés borrar, acortar,
reescribir ni resumir ningún texto del CV.** Podés envolverlo, reordenarlo visualmente y agregarle
estructura, pero cada frase tiene que seguir completa y literal en el documento. Si el test falla,
el trabajo no sirve.

## Qué significa "nivel ejecutivo" acá

**Tipografía: es el 80% del resultado.**
- Traé una familia de verdad desde Google Fonts, no dependas de la del sistema. Una buena apuesta:
  un serif editorial para el nombre y los títulos de sección (Fraunces, Newsreader, Instrument
  Serif o Libre Baskerville) con un sans limpio para el cuerpo (Inter, Geist o Public Sans).
  Alternativa igual de válida: un solo sans de calidad en varios pesos.
- El nombre tiene que mandar: grande, con `letter-spacing` ajustado (negativo en tamaños grandes).
- Los títulos de sección como etiquetas pequeñas en mayúsculas con `letter-spacing` amplio
  (0.12em o más) y un color tenue. Ese detalle solo ya cambia la percepción.
- Cuerpo entre 16 y 17px, `line-height` de 1.6, y ancho de medida máximo de 68 caracteres.

**Espacio en blanco: generoso y rítmico.**
- Márgenes amplios. Que respire. El apuro se ve.
- Una escala de espaciado consistente (por ejemplo 4/8/16/24/40/64) en variables CSS, no números
  sueltos.

**Color: contenido, con intención.**
- Un azul marino profundo o un grafito como color estructural, blanco o un blanco roto como fondo.
- **Un solo** acento, usado poco: un bronce, un terracota apagado o un azul más saturado. Si lo usás
  en más de tres lugares, ya es demasiado.
- Nada de gradientes llamativos, nada de sombras de colores, nada de emojis.

**La banda de métricas (13 años · 6 equipos · 87+ · 20+).**
Es lo primero que alguien va a mirar. Tratala como la portada de un informe anual: los números
grandes, con la tipografía de títulos, separados por líneas finas, con sus etiquetas chicas debajo
en mayúsculas espaciadas.

**Experiencia: que se lea el recorrido.**
- Cada empresa como un bloque claro, con su período alineado a la derecha o en una columna propia.
- Los puestos dentro de la empresa visiblemente subordinados, no al mismo nivel.
- Una línea de tiempo discreta (una regla vertical fina con marcas) ayuda si no satura.
- Los logros como lista, con viñetas discretas (una regla corta o un punto chico, no un bullet
  grande del navegador).

**Detalles que distinguen un diseño cuidado:**
- Reglas horizontales de 1px en un gris muy claro, no bordes gruesos.
- `font-variant-numeric: tabular-nums` en los años y las cifras, para que alineen.
- Transiciones suaves en los enlaces, nada que se mueva solo.
- `::selection` con el color de acento.
- Un `scroll-behavior: smooth` si agregás navegación interna.

## Impresión: importa de verdad
La van a guardar como PDF para adjuntarla. En `@media print`:
- Fondo blanco, texto negro, sin modo oscuro.
- `break-inside: avoid` en cada bloque de puesto y de empresa.
- Los enlaces que muestren su URL al lado, o que al menos no queden como texto azul subrayado sin
  sentido en papel.
- Que quepa en 2 o 3 páginas, con márgenes de 1.5cm a 2cm.

## Celular
Una columna, margen lateral de 16px, sin scroll horizontal, y el nombre que no se desborde. La banda
de métricas pasa a 2×2 en pantallas chicas.

## Modo oscuro
`@media (prefers-color-scheme: dark)` con el fondo en un gris muy oscuro (no negro puro) y el texto
en un blanco roto. El acento tiene que seguir legible.

## Criterios de aceptación
- `npm run test` pasa. Es lo primero que se verifica.
- `npm run lint` pasa.
- `index.html` abre bien con doble clic, sin servidor.
- El contenido sigue legible sin JavaScript.
- Ni un texto del CV se perdió ni se reescribió.

## Fuera de alcance
JavaScript de animaciones, librerías, cambiar el contenido, agregar secciones nuevas o inventar datos.
