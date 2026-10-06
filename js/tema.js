/* ---------------------------------------------------------------------------
 * Conmutador de tema claro/oscuro.
 * Lee la preferencia guardada en localStorage (protegido con try/catch);
 * si no hay, usa prefers-color-scheme. Al hacer click alterna, guarda y
 * actualiza aria-pressed/aria-label. El botón llega con `hidden` y este
 * script lo revela: sin JS el sitio funciona y el botón no aparece.
 * ------------------------------------------------------------------------ */
(function () {
  'use strict';

  var CLAVE_TEMA = 'tema';
  var TEMA_OSCURO = 'oscuro';
  var TEMA_CLARO = 'claro';

  function leerPreferenciaGuardada() {
    try {
      return window.localStorage.getItem(CLAVE_TEMA);
    } catch (error) {
      return null;
    }
  }

  function guardarPreferencia(tema) {
    try {
      window.localStorage.setItem(CLAVE_TEMA, tema);
    } catch (error) {
      /* Sin almacenamiento disponible: el tema se aplica sólo en esta visita. */
    }
  }

  function temaInicial() {
    var guardado = leerPreferenciaGuardada();
    if (guardado === TEMA_OSCURO || guardado === TEMA_CLARO) {
      return guardado;
    }
    var prefiereOscuro = window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefiereOscuro ? TEMA_OSCURO : TEMA_CLARO;
  }

  function aplicarTema(boton, tema) {
    var esOscuro = tema === TEMA_OSCURO;
    document.documentElement.setAttribute('data-tema', tema);
    boton.setAttribute('aria-pressed', String(esOscuro));
    boton.setAttribute(
      'aria-label',
      esOscuro ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'
    );
    boton.textContent = esOscuro ? 'Tema claro' : 'Tema oscuro';
  }

  function iniciar() {
    var boton = document.getElementById('boton-tema');
    if (!boton) {
      return;
    }

    aplicarTema(boton, temaInicial());
    boton.removeAttribute('hidden');

    boton.addEventListener('click', function () {
      var actual = document.documentElement.getAttribute('data-tema');
      var siguiente = actual === TEMA_OSCURO ? TEMA_CLARO : TEMA_OSCURO;
      guardarPreferencia(siguiente);
      aplicarTema(boton, siguiente);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})();
