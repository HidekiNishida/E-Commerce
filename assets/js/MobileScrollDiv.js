let lastScrollTop = 0;

window.addEventListener("scroll", function() {
  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  
  if (currentScroll > lastScrollTop) {
    // Scrolling down
    document.querySelector(".scroll-div").classList.remove("visible");
    document.querySelector(".white-box-menu").classList.remove("visible");
  } else {
    // Scrolling up
    document.querySelector(".scroll-div").classList.add("visible");
    document.querySelector(".white-box-menu").classList.add("visible");
  }

  verifyscrolltop();

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Para dispositivos móveis ou rolagem negativa
}, false);

verifyscrolltop();


function verifyscrolltop(){
  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  
  if (currentScroll === 0) {
    document.querySelector(".scroll-div").classList.add("visible");
  }
}

