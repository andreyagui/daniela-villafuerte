# CV de Daniela Villafuerte Mena

## Qué es

Sitio personal estático con el CV completo de Daniela Villafuerte Mena: hero con métricas destacadas, resumen ejecutivo, competencias, experiencia en línea de tiempo agrupada por empresa, logros destacados, formación y contacto. No hay build ni dependencias: es HTML, CSS y JS puros.

Incluye dos temas (claro y oscuro) conmutables con persistencia en `localStorage`, correo ofuscado que se reensambla como `mailto:` sólo con JS, y una hoja de impresión propia para exportar el CV en 2–3 páginas.

## Estructura de archivos

```
index.html            Página única con todo el contenido
css/variables.css     Tokens del sistema de diseño (paleta de ambos temas, tipografía, espaciado)
css/base.css          Reset, tipografía fluida, retícula y foco accesible
css/encabezado.css    Encabezado fijo con navegación translúcida
css/hero.css          Hero a pantalla completa con métricas y CTAs
css/secciones.css     Secciones de contenido, competencias, logros y formación
css/experiencia.css   Línea de tiempo de experiencia agrupada por empresa
css/contacto.css      Bloque de contacto y pie de página
css/temas.css         Transición entre temas y ajustes del tema oscuro
css/print.css         Hoja de impresión (fuerza tema claro, oculta navegación)
js/tema.js            Conmutador de tema claro/oscuro con persistencia
js/contacto.js        Reensamblado del correo ofuscado y botón de imprimir
contenido/cv.json     Fuente de verdad del contenido (verificada por el test)
```

## Cómo verlo en local

Doble clic en `index.html`. Se abre directo en el navegador, sin servidor ni instalación previa.

## Cómo verificar el sitio

El test compara el HTML contra `contenido/cv.json` frase por frase (y verifica que el teléfono no aparezca); el lint verifica la base del HTML:

```
npm run test
npm run lint
```

## Cómo publicarlo en GitHub Pages

1. Subir este repositorio a GitHub.
2. En el repositorio: **Settings → Pages**.
3. En **Source**, elegir la rama `main` y la carpeta raíz (`/`), y guardar.

GitHub publica la página en `https://<usuario>.github.io/<repositorio>/`.
