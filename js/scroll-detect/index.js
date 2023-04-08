/**
 * Permet de determiner le sens de deplacement de la bare vertical pour un element donnée.
 */
(function () {
  "use-strict";
  let oldValue = 0;
  let timer = null;
  const elements = document.querySelectorAll('[data-hbk="scroll"]');
  function addClass(direction, newValue = 0) {
    elements.forEach((elment) => {
      if (direction) {
        if (direction == "up") {
          elment.classList.add("scroll-up");
          elment.classList.remove("scroll-down");
        } else if (direction == "down") {
          elment.classList.add("scroll-down");
          elment.classList.remove("scroll-up");
        }
      } else {
        elment.classList.remove("scroll-down");
        elment.classList.remove("scroll-up");
      }
      /**
       * On determine si l'element n'est plus visible.
       * Utile pour faire apparaitre une partie de l'entete.(generalment uniquement le menu).
       * Pour le moment on a un probleme, lorsqu'on modifie la position de l'element on se retrouve avec la position qui change.
       * On pourrait determiner la position de basculement à partir de l'element avant.
       * il faudra etudier le cas de nutribe.
       */
      const position = elment.getBoundingClientRect();
      if (position.bottom <= 0) {
        elment.classList.add("scroll-element-exceeded");
      } else {
        elment.classList.remove("scroll-element-exceeded");
      }
      // console.log("position : ", position);
    });
  }
  function checkScrollDirection() {
    var newValue = window.pageYOffset;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      if (newValue == 0) {
        addClass(false);
      } else if (oldValue - newValue < 0) {
        addClass("down", newValue);
      } else if (oldValue - newValue > 0) {
        addClass("up", newValue);
      }
      oldValue = newValue;
    }, 50);
  }
  document.querySelectorAll('[data-hbk="scroll"]').forEach((elment) => {
    elment.addEventListener("scroll", checkScrollDirection);
    console.log("elment: ", elment);
  });
  document.addEventListener("scroll", checkScrollDirection);
})();
