/**
 * Reensambla el correo ofuscado en los atributos data- y recién entonces pone
 * el href mailto: y el texto visible del botón.
 */
(function () {
  'use strict';

  var boton = document.getElementById('boton-correo');
  if (!boton) return;

  var usuario = boton.getAttribute('data-u');
  var dominio = boton.getAttribute('data-d');
  if (!usuario || !dominio) return;

  var correo = usuario + '@' + dominio;
  boton.textContent = correo;
  boton.setAttribute('href', 'mailto:' + correo);
})();
