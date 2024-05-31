document.addEventListener("DOMContentLoaded", function() {
    // Obtener todas las tarjetas de platos
    const plates = document.querySelectorAll(".plate");
  
    // Animación de Hover: Aumentar tamaño y sombra al pasar el cursor
    plates.forEach(plate => {
      plate.addEventListener("mouseenter", function() {
        plate.style.transform = "scale(1.05)";
        plate.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.3)";
      });
      plate.addEventListener("mouseleave", function() {
        plate.style.transform = "scale(1)";
        plate.style.boxShadow = "none";
      });
    });
  
    // Animación de Fade In: Aparecer con efecto de desvanecimiento al cargar la página
    plates.forEach(plate => {
      plate.style.opacity = 0;
    });
  
    setTimeout(() => {
      plates.forEach(plate => {
        plate.style.transition = "opacity 1s ease-in-out";
        plate.style.opacity = 1;
      });
    }, 500);
  
    // Animación de Slide In: Deslizarse desde el lado o desde abajo al cargar la página
    const menuPlates = document.getElementById("menu-plates");
    const menuRect = menuPlates.getBoundingClientRect();
    const windowHeight = window.innerHeight;
  
    if (menuRect.top < windowHeight) {
      plates.forEach(plate => {
        plate.style.transition = "transform 1s ease-out";
        plate.style.transform = "translateY(0)";
      });
    } else {
      window.addEventListener("scroll", function() {
        const scrollPosition = window.scrollY;
  
        if (menuRect.top - scrollPosition < windowHeight) {
          plates.forEach(plate => {
            plate.style.transition = "transform 1s ease-out";
            plate.style.transform = "translateY(0)";
          });
        }
      });
    }
  });