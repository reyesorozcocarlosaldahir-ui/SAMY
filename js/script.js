
/* =====================================================
   GALA CHARRA IMPERIAL
   XV AÑOS DE MARIA SAMYRETH JARAMILLO OROZCO
   JAVASCRIPT COMPLETO
===================================================== */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

  /* ===================================================
     01. ELEMENTOS DE LA INVITACIÓN
  =================================================== */

  const bienvenida = document.getElementById("bienvenida");
  const abrirSobre = document.getElementById("abrirSobre");
  const invitacion = document.getElementById("invitacion");
  const portada = document.querySelector(".portada");

  const musica = document.getElementById("musica");
  const botonMusica = document.getElementById("botonMusica");

  const imagenQuinceanera =
    document.getElementById("imagenQuinceanera");

  const ilustracionFallback =
    document.getElementById("ilustracionFallback");

  const prefiereMovimientoReducido =
    window.matchMedia("(prefers-reduced-motion: reduce)");

  let invitacionAbierta = false;

  /* ===================================================
     02. APERTURA DEL SOBRE
  =================================================== */

  function mostrarInvitacion() {

    // Hacer visible toda la invitación.
    invitacion.hidden = false;

    // Permitir nuevamente el desplazamiento.
    document.body.classList.remove("bloqueado");

    // Ir al inicio de la página.
    window.scrollTo(0, 0);

    // Retirar la pantalla de bienvenida.
    bienvenida.classList.add("desaparecer");

    // Mostrar el botón de música.
    botonMusica.hidden = false;

    // Iniciar el efecto cinematográfico del retrato.
    requestAnimationFrame(() => {

      requestAnimationFrame(() => {
        portada.classList.add("revelada");
      });

    });

    // Quitar la bienvenida después del fundido.
    window.setTimeout(() => {
      bienvenida.hidden = true;
    }, 1100);

  }

  abrirSobre.addEventListener("click", () => {

    // Evitar que se abra varias veces.
    if (invitacionAbierta) return;

    invitacionAbierta = true;

    // Desactivar nuevos clics sobre el sello.
    abrirSobre.disabled = true;

    // Activar la animación CSS del sobre.
    abrirSobre.classList.add("abierto");

    // Comenzar música desde la interacción del usuario.
    // Si el MP3 no existe, la invitación abrirá igual.
    iniciarMusica();

    // Esperar la animación antes de mostrar la portada.
    const tiempoApertura =
      prefiereMovimientoReducido.matches ? 150 : 1700;

    window.setTimeout(
      mostrarInvitacion,
      tiempoApertura
    );

  });

  /* ===================================================
     03. MÚSICA DE FONDO
  =================================================== */

  function actualizarBotonMusica() {

    if (musica.paused) {
      botonMusica.textContent = "♪";
      botonMusica.title = "Reproducir música";
      botonMusica.setAttribute(
        "aria-label",
        "Reproducir música"
      );
    } else {
      botonMusica.textContent = "♫";
      botonMusica.title = "Pausar música";
      botonMusica.setAttribute(
        "aria-label",
        "Pausar música"
      );
    }

  }

  function iniciarMusica() {

    musica.volume = 0.35;

    // play() puede fallar si no hay archivo,
    // si el navegador lo bloquea o si no se cargó.
    const reproduccion = musica.play();

    if (reproduccion &&
        typeof reproduccion.then === "function") {

      reproduccion
        .then(() => {
          actualizarBotonMusica();
        })
        .catch(() => {
          actualizarBotonMusica();
          console.info(
            "La invitación continuará sin música."
          );
        });

    }

  }

  botonMusica.addEventListener("click", () => {

    if (musica.paused) {

      iniciarMusica();

    } else {

      musica.pause();
      actualizarBotonMusica();

    }

  });

  // Sincronizar el botón cuando cambia el audio.
  musica.addEventListener(
    "play",
    actualizarBotonMusica
  );

  musica.addEventListener(
    "pause",
    actualizarBotonMusica
  );

  musica.addEventListener(
    "ended",
    actualizarBotonMusica
  );

  actualizarBotonMusica();

  /* ===================================================
     04. ILUSTRACIÓN PRINCIPAL
  =================================================== */

  function mostrarIlustracionAlternativa() {

    imagenQuinceanera.hidden = true;
    ilustracionFallback.hidden = false;

  }

  imagenQuinceanera.addEventListener(
    "error",
    mostrarIlustracionAlternativa
  );

  // Si la imagen ya terminó de cargarse,
  // comprobar que realmente existe.
  if (
    imagenQuinceanera.complete &&
    imagenQuinceanera.naturalWidth === 0
  ) {
    mostrarIlustracionAlternativa();
  }

  /* ===================================================
     05. CUENTA REGRESIVA
     SÁBADO 28 DE NOVIEMBRE DE 2026
     1:00 P. M. - HORA DEL CENTRO DE MÉXICO
  =================================================== */

  const fechaEvento = new Date(
    "2026-11-28T13:00:00-06:00"
  ).getTime();

  const elementoDias =
    document.getElementById("dias");

  const elementoHoras =
    document.getElementById("horas");

  const elementoMinutos =
    document.getElementById("minutos");

  const elementoSegundos =
    document.getElementById("segundos");

  function formatoNumero(numero) {
    return String(numero).padStart(2, "0");
  }

  function actualizarCuentaRegresiva() {

    const ahora = Date.now();

    // Nunca mostrar números negativos.
    const diferencia = Math.max(
      0,
      fechaEvento - ahora
    );

    const dias = Math.floor(
      diferencia / (1000 * 60 * 60 * 24)
    );

    const horas = Math.floor(
      (diferencia / (1000 * 60 * 60)) % 24
    );

    const minutos = Math.floor(
      (diferencia / (1000 * 60)) % 60
    );

    const segundos = Math.floor(
      (diferencia / 1000) % 60
    );

    elementoDias.textContent =
      formatoNumero(dias);

    elementoHoras.textContent =
      formatoNumero(horas);

    elementoMinutos.textContent =
      formatoNumero(minutos);

    elementoSegundos.textContent =
      formatoNumero(segundos);

  }

  // Mostrar inmediatamente los valores.
  actualizarCuentaRegresiva();

  // Actualizar cada segundo.
  window.setInterval(
    actualizarCuentaRegresiva,
    1000
  );

  /* ===================================================
     06. ANIMACIONES AL DESPLAZARSE
  =================================================== */

  const elementosParaRevelar =
    document.querySelectorAll(".revelar");

  function revelarTodos() {

    elementosParaRevelar.forEach((elemento) => {
      elemento.classList.add("visible");
    });

  }

  if (
    prefiereMovimientoReducido.matches ||
    !("IntersectionObserver" in window)
  ) {

    revelarTodos();

  } else {

    const observador = new IntersectionObserver(

      (entradas, instancia) => {

        entradas.forEach((entrada) => {

          if (entrada.isIntersecting) {

            entrada.target.classList.add("visible");

            instancia.unobserve(entrada.target);

          }

        });

      },

      {
        root: null,
        rootMargin: "0px 0px 50px 0px",
        threshold: 0.08
      }

    );

    elementosParaRevelar.forEach((elemento) => {
      observador.observe(elemento);
    });

  }

  /* ===================================================
     07. GALERÍA CINEMATOGRÁFICA
  =================================================== */

  // Puedes agregar hasta 8 fotografías.
  // Los archivos deben estar dentro de:
  // assets/imagenes/

  const rutasFotografias = [

    "assets/imagenes/foto-01.webp",
    "assets/imagenes/foto-02.webp",
    "assets/imagenes/foto-03.webp",
    "assets/imagenes/foto-04.webp",
    "assets/imagenes/foto-05.webp",
    "assets/imagenes/foto-06.webp",
    "assets/imagenes/foto-07.webp",
    "assets/imagenes/foto-08.webp"

  ];

  const fotoActual =
    document.getElementById("fotoActual");

  const galeriaPlaceholder =
    document.getElementById("galeriaPlaceholder");

  const numeroFoto =
    document.getElementById("numeroFoto");

  const botonAnterior =
    document.getElementById("anterior");

  const botonSiguiente =
    document.getElementById("siguiente");

  const marcoGaleria =
    document.getElementById("marcoGaleria");

  let fotografiasDisponibles = [];
  let indiceActual = 0;

  /* ===================================================
     08. VERIFICACIÓN DE FOTOGRAFÍAS
  =================================================== */

  function verificarFotografia(ruta) {

    return new Promise((resolver) => {

      const imagen = new Image();

      imagen.onload = () => {
        resolver(ruta);
      };

      imagen.onerror = () => {
        resolver(null);
      };

      imagen.src = ruta;

    });

  }

  async function cargarGaleria() {

    const resultados = await Promise.all(
      rutasFotografias.map(verificarFotografia)
    );

    fotografiasDisponibles =
      resultados.filter(Boolean);

    indiceActual = 0;

    mostrarFotografia();

  }

  /* ===================================================
     09. MOSTRAR FOTOGRAFÍA
  =================================================== */

  function mostrarFotografia() {

    const cantidad =
      fotografiasDisponibles.length;

    // Si todavía no hay fotografías,
    // mostrar la tarjeta decorativa XV.
    if (cantidad === 0) {

      fotoActual.hidden = true;
      galeriaPlaceholder.hidden = false;

      numeroFoto.textContent = "—";

      botonAnterior.disabled = true;
      botonSiguiente.disabled = true;

      return;

    }

    galeriaPlaceholder.hidden = true;

    fotoActual.src =
      fotografiasDisponibles[indiceActual];

    fotoActual.hidden = false;

    // Actualizar descripción accesible.
    fotoActual.alt =
      `Fotografía ${indiceActual + 1} de Maria Samyreth`;

    // Reiniciar transición visual.
    fotoActual.style.animation = "none";

    void fotoActual.offsetWidth;

    fotoActual.style.animation = "";

    // Ejemplo: 2 / 5
    numeroFoto.textContent =
      `${indiceActual + 1} / ${cantidad}`;

    const hayVarias = cantidad > 1;

    botonAnterior.disabled = !hayVarias;
    botonSiguiente.disabled = !hayVarias;

  }

  /* ===================================================
     10. CAMBIAR FOTOGRAFÍAS
  =================================================== */

  function cambiarFotografia(direccion) {

    const cantidad =
      fotografiasDisponibles.length;

    if (cantidad < 2) return;

    indiceActual = (
      indiceActual + direccion + cantidad
    ) % cantidad;

    mostrarFotografia();

  }

  botonAnterior.addEventListener("click", () => {
    cambiarFotografia(-1);
  });

  botonSiguiente.addEventListener("click", () => {
    cambiarFotografia(1);
  });

  /* ===================================================
     11. DESLIZAR CON EL DEDO EN CELULARES
  =================================================== */

  let posicionInicialX = 0;

  marcoGaleria.addEventListener(

    "touchstart",

    (evento) => {

      posicionInicialX =
        evento.changedTouches[0].screenX;

    },

    { passive: true }

  );

  marcoGaleria.addEventListener(

    "touchend",

    (evento) => {

      const posicionFinalX =
        evento.changedTouches[0].screenX;

      const diferencia =
        posicionFinalX - posicionInicialX;

      // Evitar cambios por movimientos mínimos.
      if (Math.abs(diferencia) < 45) {
        return;
      }

      if (diferencia < 0) {

        // Deslizar hacia la izquierda.
        cambiarFotografia(1);

      } else {

        // Deslizar hacia la derecha.
        cambiarFotografia(-1);

      }

    },

    { passive: true }

  );

  /* ===================================================
     12. NAVEGACIÓN DE GALERÍA CON TECLADO
  =================================================== */

  marcoGaleria.setAttribute("tabindex", "0");

  marcoGaleria.addEventListener(
    "keydown",
    (evento) => {

      if (evento.key === "ArrowRight") {

        evento.preventDefault();
        cambiarFotografia(1);

      } else if (evento.key === "ArrowLeft") {

        evento.preventDefault();
        cambiarFotografia(-1);

      }

    }
  );

  /* ===================================================
     13. INICIAR GALERÍA
  =================================================== */

  cargarGaleria().catch((error) => {

    console.warn(
      "No se pudieron cargar las fotografías:",
      error
    );

    fotografiasDisponibles = [];
    mostrarFotografia();

  });

  /* ===================================================
     14. FINAL DE LA CONFIGURACIÓN
  =================================================== */

  console.info(
    "Gala Charra Imperial: programación inicializada."
  );

});

/* =====================================================
   FIN DEL ARCHIVO SCRIPT.JS
===================================================== */
