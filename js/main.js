// cambio de tema
const btnTema = document.getElementById("btn-theme");

btnTema.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  document.body.classList.toggle("dark-theme");
});

// iconos para popup
const iconos = {
  error: "./img/danger.svg",
  success: "./img/success.svg",
  warning: "./img/warning.svg",
  info: "./img/info.svg",
};

const formulario = document.getElementById("formulario");
const inputs = formulario.querySelectorAll("input");
const errorPopup = document.getElementById("error-popup");
const icono = errorPopup.querySelector("img");
const mensaje = document.getElementById("mensaje");

function showPopup(msg, type) {
  mensaje.innerText = msg;
  errorPopup.classList.remove(type);

  icono.setAttribute("src", iconos[type] || iconos.info);

  errorPopup.classList.add("show", type);

  setTimeout(() => {
    errorPopup.classList.remove("show", type);
  }, 2000);
}

// evitar que ingresen letras
inputs.item(3).addEventListener("input", (event) => {
  event.stopPropagation();
  event.target.value = event.target.value.replace(/\D/g, "");
});

formulario.addEventListener("submit", function (event) {
  event.preventDefault();
  event.stopPropagation();

  const completos = Array.from(inputs).every((input) => !!input.value.trim());

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const telefonoRegex = /^\d{8,15}$/;

  if (!completos) {
    showPopup("Por favor, complete todos los campos.", "error");
    return;
  }

  if (!emailRegex.test(inputs.item(2).value)) {
    showPopup("Por favor, revise el correo.", "warning");
    return;
  }

  if (!telefonoRegex.test(inputs.item(3).value)) {
    showPopup("Por favor, revise el telefono.", "warning");
    return;
  }

  showPopup("Los datos se enviaron con exito!!!", "success");
  formulario.reset();
});
