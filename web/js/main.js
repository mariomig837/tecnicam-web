// Número de WhatsApp del negocio (formato internacional sin "+" ni espacios)
const WHATSAPP = "34673245045";

// Menú móvil
const toggle = document.querySelector(".menu-toggle");
const menu = document.getElementById("menu");
if (toggle && menu) {
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    toggle.setAttribute("aria-label", open ? "Abrir menú" : "Cerrar menú");
    menu.classList.toggle("is-open", !open);
  });
  menu.addEventListener("click", (e) => {
    if (e.target.closest("a")) {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menú");
      menu.classList.remove("is-open");
    }
  });
}

// Formulario de cita: compone el mensaje y abre WhatsApp
const form = document.getElementById("booking-form");
if (form) {
  const error = document.getElementById("form-error");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const nombre = (data.get("nombre") || "").trim();
    const equipo = (data.get("equipo") || "").trim();

    const missing = [];
    form.querySelectorAll("[required]").forEach((el) => {
      const empty = !el.value.trim();
      el.setAttribute("aria-invalid", String(empty));
      if (empty) missing.push(el);
    });
    if (missing.length) {
      error.textContent = "Escribe tu nombre y el equipo (marca y modelo) para pedir la cita.";
      missing[0].focus();
      return;
    }
    error.textContent = "";

    const lines = [
      "Hola, quiero pedir cita en Tecnicam.",
      "",
      `Nombre: ${nombre}`,
      `Servicio: ${data.get("servicio")}`,
      `Equipo: ${equipo}`,
    ];
    const problema = (data.get("problema") || "").trim();
    if (problema) lines.push(`Qué le pasa: ${problema}`);
    lines.push(`Me viene mejor: ${data.get("preferencia")}`);

    const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener");
  });
}

// Carrusel de reseñas: duplica las tarjetas para que el bucle no tenga cortes
const marquee = document.querySelector(".marquee");
if (marquee) {
  const track = marquee.querySelector(".marquee-track");
  [...track.children].forEach((item) => {
    const clone = item.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    track.appendChild(clone);
  });
  // En móvil no hay "hover": tocar el carrusel lo pausa o lo reanuda
  marquee.addEventListener("click", () => marquee.classList.toggle("is-paused"));
}

document.getElementById("year").textContent = new Date().getFullYear();
