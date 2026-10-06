/**
 * Conecta los botones "Descargar mi CV" con la ruta de impresión del navegador.
 */
(function () {
  'use strict';

  var botones = document.querySelectorAll('.boton-imprimir');
  botones.forEach(function (boton) {
    boton.addEventListener('click', function () {
      window.print();
    });
  });
})();
