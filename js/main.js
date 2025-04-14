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
const popup = document.getElementById("popup");
const icono = popup.querySelector("img");
const mensaje = document.getElementById("mensaje");

function showPopup(msg, type) {
  mensaje.innerText = msg;
  icono.setAttribute("src", iconos[type]);
  popup.classList.add("show", type);

  setTimeout(() => {
    popup.classList.remove("show", type);
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
    showPopup("El telefono no es valido.", "warning");
    return;
  }

  showPopup("Los datos se enviaron con exito!!!", "success");
  formulario.reset();
});
