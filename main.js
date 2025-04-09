const btnTheme = document.getElementById("btn-theme");

btnTheme.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  document.body.classList.toggle("dark-theme");
});
