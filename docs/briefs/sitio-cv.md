# Brief: sitio web del CV de Daniela Villafuerte Mena

## Objetivo
Construir una página web estática con el CV de Daniela, lista para publicar en GitHub Pages.
Es el CV de una persona real que lo va a usar para buscar trabajo: la exactitud del contenido
importa más que cualquier decisión visual.

## Lista cerrada de archivos
- `index.html` (crear)
- `estilos.css` (crear)
- `README.md` (crear)

**No toques** `contenido/cv.json` ni `test/contenido.test.js` ni `package.json`. Son la fuente de
verdad y la verificación; si los modificás, el trabajo queda inválido.

## La fuente de verdad
Todo el contenido sale de `contenido/cv.json`. Leelo completo antes de empezar.

- **No inventes nada.** Ni una cifra, ni un logro, ni una fecha, ni un nombre de empresa.
- **No omitas nada.** Tienen que aparecer las 4 empresas, los 7 puestos, todos los logros de cada
  puesto, las 5 competencias con su detalle, los 5 logros destacados, los 2 títulos y las 4
  certificaciones.
- **No reescribas los textos.** Copiá las frases tal como están en el JSON. Podés elegir cómo
  mostrarlas, no cómo redactarlas.
- **El teléfono no está en el JSON a propósito.** No lo busques ni lo agregues.

## Requisitos técnicos
- **Sin compilación y sin dependencias.** GitHub Pages sirve `index.html` directamente. Nada de
  React, bundlers, npm install ni CDNs de JavaScript.
- **Un solo archivo CSS** (`estilos.css`), enlazado desde el HTML. Nada de estilos en línea
  repartidos por el documento.
- El contenido va **escrito en el HTML**, no cargado con `fetch` del JSON: tiene que funcionar sin
  JavaScript y ser indexable.
- `<html lang="es">`, `<title>` con su nombre, meta `viewport`, y meta `description` con el titular.
- El correo tiene que estar, pero **ofuscado contra scrapers**: por ejemplo el texto partido y
  reensamblado con CSS, o `data-` atributos, o entidades HTML. No un `mailto:` en texto plano.

## Diseño
Es una Senior Agile Scrum Master de banca y seguros con 13 años de experiencia. El tono tiene que
ser **sobrio y profesional**, no creativo ni juguetón. Pensá en un documento de consultoría, no en
un portfolio de diseñador.

- Una columna, lectura de arriba a abajo. Las 4 métricas destacadas arriba, cerca del nombre.
- Jerarquía clara: nombre > titular > métricas > resumen > competencias > experiencia > logros >
  educación y certificaciones > idiomas.
- Paleta sobria: un azul o gris oscuro para los títulos, texto en gris muy oscuro sobre blanco, y
  un solo color de acento usado con moderación.
- Tipografía del sistema (`system-ui`, `-apple-system`, etc.) o Google Fonts si hace falta.
- **Funciona en celular**, con margen lateral de 16px y sin scroll horizontal.
- **Se imprime bien**: incluí una `@media print` que quite fondos oscuros, evite cortar un puesto a
  mitad de página (`break-inside: avoid`) y deje márgenes razonables. Mucha gente va a guardarlo
  como PDF.
- Modo oscuro con `@media (prefers-color-scheme: dark)` si no te complica.

## Criterios de aceptación
- `npm run test` pasa. Ese test compara el HTML contra `cv.json` ítem por ítem y además falla si
  el teléfono aparece. Es el criterio principal.
- `npm run lint` pasa.
- `index.html` abre bien sin servidor, con doble clic.
- No hay JavaScript necesario para leer el contenido.
- `README.md` corto: qué es, cómo verlo en local, y cómo se publica en GitHub Pages.

## Fuera de alcance
Formulario de contacto, analítica, versión en inglés, generación de PDF por código, blog, y
cualquier dato que no esté en `cv.json`.
