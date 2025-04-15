const iconos = {
  error: "./img/danger.svg",
  success: "./img/success.svg",
  warning: "./img/warning.svg",
  info: "./img/info.svg",
};

const btnTema = document.getElementById("btn-theme");
const formulario = document.getElementById("formulario");
const popup = document.getElementById("popup");
const mensaje = document.getElementById("mensaje");
const inputs = formulario.querySelectorAll("input");
const icono = popup.querySelector("img");

function showPopup(msg, type) {
  icono.setAttribute("src", iconos[type]);
  mensaje.textContent = msg;
  popup.classList.add("show", type);

  setTimeout(() => {
    popup.classList.remove("show", type);
  }, 2000);
}

btnTema.addEventListener("click", () => {
  btnTema.classList.toggle("active");
  document.body.classList.toggle("dark-theme");

  setTimeout(() => {
    btnTema.classList.remove("active");
  }, 1000);
});

inputs.item(3).addEventListener("input", (event) => {
  event.stopPropagation();
  event.target.value = event.target.value.replace(/\D/g, "");
});

formulario.addEventListener("submit", function (event) {
  event.preventDefault();
  event.stopPropagation();

  const completos = Array.from(inputs).every((input) => !!input.value.trim());

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const telefonoRegex = /^\d{8,15}$/;

  if (!completos) {
    showPopup("Por favor, complete todos los campos.", "error");
    return;
  }

  if (!emailRegex.test(inputs.item(2).value)) {
    showPopup("El correo no es valido.", "warning");
    return;
  }

  if (!telefonoRegex.test(inputs.item(3).value)) {
    showPopup("El telefono debe tener de 8 a 15 dígitos.", "warning");
    return;
  }

  showPopup("Los datos se enviaron con exito!!!", "success");
  formulario.reset();
});

function cuentaRegresiva() {
  const fechaLimite = new Date("2025-05-05T23:59:59").getTime();
  const cuenta = document.getElementById("cuenta-regresiva");

  const intervalo = setInterval(() => {
    const ahora = new Date().getTime();
    const diferencia = fechaLimite - ahora;

    if (diferencia <= 0) {
      clearInterval(intervalo);
      cuenta.textContent = "¡Tiempo finalizado!";
      cuenta.style.color = "hsl(348, 83%, 45%)";
      return;
    }

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor(
      (diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

    cuenta.textContent = `${dias}d ${horas}h ${minutos}m ${segundos}s`;
  }, 1000);
}

cuentaRegresiva();
