# Brief: rehacer el sitio copiando una maqueta de referencia

## Situación
El dueño del repo trajo una maqueta de diseño concreta y pidió que el sitio **se vea igual**, con
el contenido que ya está en `contenido/cv.json`. Vos no podés ver la imagen, así que abajo está
descrita sección por sección, con medidas y colores. **Seguila al pie de la letra**: esto no es una
guía de inspiración, es la especificación.

El archivo `docs/referencia-diseno.jpg` es la maqueta, por si tu modelo llega a poder abrirla.

## Lista cerrada de archivos
Creá y organizá libremente dentro de:
- `index.html`
- `css/**`
- `js/**`
- `README.md`

**No toques:** `contenido/cv.json`, `test/contenido.test.js`, `package.json`, `docs/**`, `assets/**`.
Podés borrar los CSS y JS actuales: se rehace todo.

---

## PALETA (derivada de la foto real de Daniela)

La foto `assets/daniela.jpg` (960×1280) tiene un fondo degradado cálido medido así: `#d19570` en la
esquina superior izquierda, `#79513d` como tono dominante, y `#efddd1` abajo a la derecha, con una
franja de luz en diagonal. La paleta sale de ahí para que la foto se integre y no quede pegada.

```
--arcilla:        #8c5e47   /* banda del hero: se funde con el fondo de la foto */
--arcilla-oscura: #6b4634
--arcilla-clara:  #d19570
--salvia:         #9fc3b8   /* banda de credenciales */
--salvia-oscura:  #7aa89c
--crema:          #f7f3ee   /* fondo general */
--blanco:         #ffffff
--tinta:          #3a332e   /* texto de cuerpo, gris cálido */
--tinta-tenue:    #7d736b
--terracota:      #c07a52   /* acento: frase de presentación, etiquetas */
```

La maqueta usa **dos bandas de color a todo el ancho** separadas por secciones blancas. Ese ritmo
—banda, blanco, banda, blanco— es lo que define el diseño. Respetálo.

## TIPOGRAFÍA
- Títulos y nombre: un sans geométrico de peso variable. Usá **Poppins** (300, 600, 800) de Google
  Fonts. La maqueta usa un geométrico redondeado; Poppins es la equivalencia correcta.
- Cuerpo: **Poppins 300/400** en tamaño chico, o **Inter** si preferís más legibilidad en párrafos.
- Todas las etiquetas chicas van en MAYÚSCULAS con `letter-spacing: 0.18em` y tamaño 11-12px.

---

## SECCIÓN 1 — HERO (banda arcilla)

Una banda horizontal de color `--arcilla`, **no a todo el ancho de la ventana**: dejá un margen
blanco/crema de unos 40px a izquierda y derecha, como una tarjeta ancha. Altura: `min(68vh, 520px)`.

Retícula de 2 columnas: **la izquierda ocupa ~55%, la derecha ~45%**.

**Columna izquierda** (texto, centrado verticalmente, con padding generoso a la izquierda, ~8% del ancho):
1. `DANIELA` — Poppins 300, tamaño `clamp(2.5rem, 6vw, 4.5rem)`, MAYÚSCULAS, color blanco,
   `letter-spacing: 0.22em`. Peso liviano: contrasta con la línea de abajo.
2. `VILLAFUERTE MENA` — Poppins 800, tamaño `clamp(2.8rem, 7.5vw, 5.5rem)`, MAYÚSCULAS, blanco,
   `letter-spacing: 0.02em`, `line-height: 0.95`. Es la línea más grande de todo el sitio.
3. `SENIOR AGILE SCRUM MASTER` — 12px, MAYÚSCULAS, `letter-spacing: 0.2em`, color
   `--arcilla-clara`, con ~1rem de separación arriba.
4. Botón `Descargar mi CV` — rectangular con radio 2px, **fondo transparente, borde de 1px blanco,
   texto blanco**, padding `0.9rem 2rem`, 13px. Al pasar el mouse se rellena de blanco con texto
   `--arcilla`. Al hacer clic llama a `window.print()`.

**Columna derecha** (la foto):
- `assets/daniela.jpg` ocupando toda la altura de la banda, `object-fit: cover`,
  `object-position: center top`.
- **La foto sobresale de la banda por arriba y por la derecha**, como en la maqueta: usá
  `margin-top: -40px` y que se extienda hasta el borde derecho de la banda, sin radio.
- Para que se funda con la banda, aplicá una máscara en el borde izquierdo:
  `mask-image: linear-gradient(to right, transparent 0%, #000 14%)` (con su `-webkit-mask-image`).
  Ese detalle es el que hace que no parezca una foto pegada.
- En celular la foto pasa arriba del texto, con altura de 320px.

---

## SECCIÓN 2 — PRESENTACIÓN (fondo crema, 3 columnas)

Retícula de 3 columnas con `gap` amplio (~3rem), ancho máximo 1120px, centrada, con mucho aire
arriba y abajo (`clamp(4rem, 9vw, 7rem)`).

- **Columna 1:** el texto de `cv.saludo` ("Hola, soy Daniela, Agile Delivery Lead en banca y
  seguros, en Costa Rica."), en color `--terracota`, Poppins 400, tamaño `clamp(1.15rem, 2vw,
  1.5rem)`, `line-height: 1.5`, **alineado a la derecha**. Así está en la maqueta y es parte del
  efecto.
- **Columnas 2 y 3:** el texto de `cv.resumen` **partido en dos mitades**, una en cada columna, en
  14px, color `--tinta-tenue`, `line-height: 1.8`. Partilo por una frase completa, nunca a mitad de
  oración. El texto completo tiene que quedar íntegro entre las dos columnas.

En pantallas menores a 900px pasa a una sola columna y el saludo se alinea a la izquierda.

---

## SECCIÓN 3 — COMPETENCIAS (fondo crema, fila de 5)

Una fila de **5 columnas iguales**, centradas, cada una con:
1. Un **icono de línea** de ~44px, dibujado en **SVG inline** con `stroke: currentColor`,
   `stroke-width: 1.2`, `fill: none`, color `--tinta-tenue`. Dibujá iconos simples y propios: un
   tablero para delivery, flechas en ciclo para agile, un grupo de personas para liderazgo, un
   edificio o columna para el sector financiero, y una llave o engranaje para herramientas.
2. Debajo, el nombre del área (`cv.competencias[].area`) en MAYÚSCULAS, 11px,
   `letter-spacing: 0.16em`, color `--tinta`.
3. Debajo, el detalle completo (`cv.competencias[].items`) en 12.5px, `--tinta-tenue`,
   `line-height: 1.7`. **El detalle completo tiene que estar**, no lo recortes: el test lo exige.

En celular pasa a 2 columnas, y a 1 abajo de 560px.

---

## SECCIÓN 4 — CREDENCIALES (banda salvia, dos columnas)

Banda a todo el ancho con fondo `--salvia`, con el mismo margen lateral de 40px que el hero, y
padding vertical de `clamp(3.5rem, 8vw, 6rem)`.

Dos columnas iguales con `gap` de 4rem:

**Columna izquierda — `Educación`**
- Título `Educación` en Poppins 800, `clamp(1.9rem, 4vw, 2.6rem)`, color blanco.
- Debajo, un icono de línea de libro abierto en SVG, 28px, blanco, con opacidad 0.75.
- Lista con los dos ítems de `cv.educacion`, cada uno en 13.5px blanco, `line-height: 1.6`, con
  1.5rem de separación entre ítems.

**Columna derecha — `Certificaciones`**
- Mismo tratamiento de título e icono (una insignia o un sello).
- Los 4 ítems de `cv.certificaciones`.

Debajo de las dos columnas, en una línea aparte centrada, `cv.idiomas` en 12px blanco con
`letter-spacing: 0.1em`.

---

## SECCIÓN 5 — CIFRAS (fondo crema, 4 anillos)

Título `Trayectoria en números` en Poppins 800, `clamp(1.8rem, 4vw, 2.4rem)`, color
`--salvia-oscura`, alineado a la izquierda del contenedor.

Fila de **4 anillos circulares**, uno por cada ítem de `cv.metricas`:
- Cada anillo son 130px de diámetro, hecho con **SVG**: un círculo de fondo con
  `stroke: rgba(0,0,0,0.07)` y `stroke-width: 6`, y encima un arco en `--salvia-oscura` del mismo
  grosor, con `stroke-linecap: round`, girado -90° para que arranque arriba.
- **Importante: no son porcentajes.** Daniela no tiene datos de porcentaje y no se pueden inventar.
  El arco es decorativo: usá fracciones fijas y distintas para que no parezcan iguales
  (por ejemplo 0.85, 0.7, 0.9, 0.75 de la circunferencia). Nunca escribas un signo `%`.
- En el centro del anillo va `cv.metricas[].valor` (por ejemplo `13 años`, `87+`) en Poppins 600,
  tamaño 22px, color `--tinta`, con `font-variant-numeric: tabular-nums`.
- Debajo del anillo, `cv.metricas[].etiqueta` en MAYÚSCULAS 10.5px, `letter-spacing: 0.14em`,
  color `--tinta-tenue`, centrada, máximo 2 líneas.
- El arco se anima desde 0 al entrar en pantalla con `IntersectionObserver` y
  `stroke-dashoffset`, en 900ms. Si hay `prefers-reduced-motion`, aparece ya dibujado.

En celular pasa a 2×2.

---

## SECCIÓN 6 — EXPERIENCIA (fondo blanco)

Es la sección más importante y la más larga: 4 empresas y 7 puestos, con todos sus logros.

Título `Experiencia` igual que el de la sección anterior, en `--salvia-oscura`.

Por cada empresa de `cv.experiencia`:
- Una **tarjeta** de fondo blanco sobre el crema, con `border-left: 3px solid var(--terracota)`,
  sombra muy suave (`0 2px 20px rgba(0,0,0,0.05)`), radio 3px y padding de 2rem.
- Encabezado de la tarjeta: `empresa` en Poppins 600, 20px, color `--tinta`; y `periodo_empresa` a
  la derecha, en MAYÚSCULAS 11px, `letter-spacing: 0.12em`, color `--terracota`,
  `font-variant-numeric: tabular-nums`.
- Dentro, cada puesto:
  - `cargo` en Poppins 600, 15px, color `--tinta`. Si hay `cliente`, va seguido con un separador
    `·` y el cliente en `--tinta-tenue`.
  - `periodo` del puesto en 11.5px `--tinta-tenue`, mayúsculas, tabular.
  - Los `logros` como lista, **cada uno completo y textual**, en 13.5px `--tinta-tenue`,
    `line-height: 1.75`. Viñeta discreta: un guion corto o un punto chico en `--terracota`,
    nunca el bullet por defecto del navegador.
  - Los puestos dentro de una empresa van separados por una línea de 1px en un gris muy claro.
- Después de la última empresa, `cv.nota_experiencia_previa` en 12.5px, `--tinta-tenue`, en itálica.

---

## SECCIÓN 7 — LOGROS DESTACADOS (fondo crema, tarjetas)

Título `Logros destacados` en `--salvia-oscura`.

Los 5 ítems de `cv.logros` como una **retícula de tarjetas** (3 columnas en escritorio, 2 en
tableta, 1 en celular):
- Fondo blanco, radio 3px, padding 1.75rem, sombra suave.
- Arriba de cada tarjeta, una barra corta de 40×3px en `--terracota`.
- El texto del logro **completo y textual**, 13.5px, `--tinta`, `line-height: 1.7`.
- Al pasar el mouse, la tarjeta sube 3px y la sombra crece. Transición de 250ms con una
  `cubic-bezier` propia.

---

## SECCIÓN 8 — CONTACTO Y PIE (banda arcilla)

Banda `--arcilla` con el mismo margen lateral, padding vertical de 4rem, texto centrado:
- `Hablemos` en Poppins 800, `clamp(1.8rem, 4vw, 2.4rem)`, blanco.
- `cv.ubicacion` en 13px, `--arcilla-clara`.
- Dos botones en línea, con el mismo estilo de borde del hero: uno de correo y uno de LinkedIn.
- **El correo va ofuscado**: partilo en atributos `data-` y reensamblalo con JS en `js/contacto.js`,
  poniendo el `href` `mailto:` recién en tiempo de ejecución. El texto visible también se arma por
  JS. Igual tiene que aparecer la cadena `dvillafuerte93xto` en algún atributo del HTML, porque el
  test la busca.
- Pie con el nombre y el año.

---

## REGLAS QUE NO SE NEGOCIAN

1. **`npm run test` tiene que pasar.** Compara el HTML contra `contenido/cv.json` frase por frase:
   las 4 empresas, los 7 puestos, **todos** los logros de cada puesto, las 5 competencias con su
   detalle completo, los 5 logros destacados, los 2 títulos, las 4 certificaciones, el resumen
   entero, el saludo, y la referencia a `assets/daniela.jpg`.
2. **El contenido va escrito en el HTML.** El test ignora lo que esté dentro de `<script>`. El JS es
   sólo para comportamiento: anillos, correo, scroll.
3. **El teléfono no existe.** No está en el JSON; el test falla si aparece.
4. **Nunca escribas un signo `%`** junto a las cifras de los anillos: no son porcentajes.
5. **Sin dependencias ni compilación.** Google Fonts sí. Nada de librerías por CDN ni `npm install`.
6. **Encabezado fijo** con navegación a las secciones, fondo crema translúcido con
   `backdrop-filter: blur(10px)`, y `scroll-margin-top` en cada sección.
7. **`@media print`:** esconde navegación y botones, fuerza fondos claros, `break-inside: avoid` en
   cada tarjeta de empresa, y entra en 3 páginas.
8. **Accesibilidad:** `alt` descriptivo en la foto, foco visible, contraste suficiente. El blanco
   sobre `--salvia` es justo: si no llega a 4.5:1, oscurecé la salvia hasta que llegue.

## Criterios de aceptación
- `npm run test` y `npm run lint` pasan.
- Se ven las dos bandas de color a todo el ancho con el ritmo banda/blanco/banda/blanco.
- La foto de Daniela está en el hero, fundida con la banda, sobresaliendo por arriba.
- Los 4 anillos existen y no dicen porcentajes.
- En celular no hay scroll horizontal.
- Ni un texto del CV se perdió ni se alteró.
