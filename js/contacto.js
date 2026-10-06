/* ---------------------------------------------------------------------------
 * Contacto e impresión.
 * Reensambla el correo ofuscado (data-u + "@" + data-d) en un mailto: al
 * hacer click, y revela el botón "Imprimir" asignándole window.print().
 * Sin JS el correo visible sigue legible (entidades HTML) y el botón de
 * imprimir no aparece.
 * ------------------------------------------------------------------------ */
(function () {
  'use strict';

  function activarCorreo(elemento) {
    var usuario = elemento.getAttribute('data-u');
    var dominio = elemento.getAttribute('data-d');
    if (!usuario || !dominio) {
      return;
    }
    elemento.addEventListener('click', function () {
      window.location.href = 'mailto:' + usuario + '@' + dominio;
    });
  }

  function activarImpresion() {
    var boton = document.getElementById('boton-imprimir');
    if (!boton) {
      return;
    }
    boton.removeAttribute('hidden');
    boton.addEventListener('click', function () {
      window.print();
    });
  }

  function iniciar() {
    var elementosCorreo = document.querySelectorAll('[data-u][data-d]');
    for (var i = 0; i < elementosCorreo.length; i += 1) {
      activarCorreo(elementosCorreo[i]);
    }
    activarImpresion();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})();
