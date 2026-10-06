/**
 * Anima los arcos de los anillos de cifras desde 0 hasta su largo final cuando
 * entran en pantalla. Sin IntersectionObserver, o con prefers-reduced-motion,
 * los arcos quedan como están en el HTML (ya dibujados).
 */
(function () {
  'use strict';

  var DURACION_MS = 900;

  var arcos = document.querySelectorAll('.anillo-arco');
  if (arcos.length === 0) return;

  var sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (sinMovimiento || typeof IntersectionObserver === 'undefined') return;

  function largoDelArco(arco) {
    var guion = arco.getAttribute('stroke-dasharray') || '';
    return parseFloat(guion);
  }

  arcos.forEach(function (arco) {
    var largo = largoDelArco(arco);
    if (!Number.isFinite(largo) || largo <= 0) return;
    arco.style.transition = 'none';
    arco.style.strokeDashoffset = String(largo);
  });

  var observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (!entrada.isIntersecting) return;
      var arco = entrada.target;
      arco.style.transition = 'stroke-dashoffset ' + DURACION_MS + 'ms ease-out';
      arco.style.strokeDashoffset = '0';
      observador.unobserve(arco);
    });
  }, { threshold: 0.4 });

  arcos.forEach(function (arco) {
    observador.observe(arco);
  });
})();
