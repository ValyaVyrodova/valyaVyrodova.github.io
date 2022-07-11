const navToggler = document.querySelector(".nav-toggler");
const links = document.querySelector(".links");

navToggler.addEventListener("click", function() {
  links.classList.toggle("show-links")
})