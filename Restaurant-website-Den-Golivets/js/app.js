//  ---------------------------- NavBar ----------------------------------------------------------------------

document.getElementById("menuToggle").addEventListener("click", function() {
  var navLinks = document.querySelector(".nav-links");
  navLinks.classList.toggle("active");
});

//  ---------------------------- Scrool для меню -------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function() {
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach(function(link) {
    link.addEventListener("click", function(event) {
      event.preventDefault();
      const targetId = link.getAttribute("href").substring(1);

      const targetBlock = document.getElementById(targetId);

      if (targetBlock) {
        targetBlock.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});

//  ------------------------------------  Scroll при наведении на img  ---------------------------------------------------------

document.addEventListener("DOMContentLoaded", function() {

  const scrollWrapper = document.getElementById("scroll-wrapper");
  const imgWrappers = scrollWrapper.querySelectorAll(".img-wrapper");

  function enableScrolling() {
    scrollWrapper.style.overflowY = "auto";
    scrollWrapper.style.overflowX = "hidden";
  }

  function disableScrolling() {
    scrollWrapper.style.overflowY = "hidden";
  }

  imgWrappers.forEach(function(imgWrapper) {
    imgWrapper.addEventListener("mouseover", enableScrolling);
    imgWrapper.addEventListener("mouseout", disableScrolling);
  });
});