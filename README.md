# CV de Daniela Villafuerte Mena

Sitio personal estático con el CV completo de Daniela Villafuerte Mena: hero con
la foto integrada a una banda de color, presentación, competencias, credenciales,
cifras en anillos, experiencia en tarjetas por empresa, logros destacados y
contacto. No hay build ni dependencias: es HTML, CSS y JS puros, con Poppins de
Google Fonts y hoja de impresión propia.

El diseño sigue la maqueta de referencia (`docs/referencia-diseno.jpg`) y la
paleta deriva de la foto de Daniela (`assets/daniela.jpg`). La especificación
completa está en `docs/briefs/sitio-editorial.md`.

## Estructura de archivos

- `index.html` — página única con todo el contenido
- `css/variables.css` — tokens del sistema de diseño (paleta, medidas, sombras)
- `css/base.css` — reset, tipografía, retícula compartida y botones de borde
- `css/encabezado.css` — encabezado fijo con navegación translúcida
- `css/hero.css` — hero: banda arcilla con nombre y foto fundida
- `css/presentacion.css` — saludo y resumen en tres columnas
- `css/competencias.css` — fila de 5 competencias con íconos de línea
- `css/credenciales.css` — banda salvia con educación y certificaciones
- `css/cifras.css` — 4 anillos con métricas (sin porcentajes)
- `css/experiencia.css` — tarjetas de empresa con puestos y logros
- `css/logros.css` — retícula de tarjetas de logros destacados
- `css/contacto.css` — banda arcilla de contacto y pie
- `css/impresion.css` — hoja de impresión (fondos claros, sin navegación)
- `js/anillos.js` — animación de los anillos al entrar en pantalla
- `js/contacto.js` — reensamblado del correo ofuscado (mailto en runtime)
- `js/impresion.js` — botón "Descargar mi CV" → `window.print()`
- `contenido/cv.json` — fuente de verdad del contenido (verificada por el test)

## Cómo verlo en local

Doble clic en `index.html`. Se abre directo en el navegador, sin servidor ni
instalación previa.

## Cómo verificarlo

El test compara el HTML contra `contenido/cv.json` frase por frase (y verifica
que el teléfono no aparezca); el lint revisa la base del HTML:

```
npm run test
npm run lint
```

## Cómo publicarlo en GitHub Pages

1. Subir este repositorio a GitHub.
2. En el repositorio: **Settings → Pages**.
3. En **Source**, elegir la rama `main` y la carpeta raíz (`/`), y guardar.

GitHub publica la página en `https://<usuario>.github.io/<repositorio>/`.
