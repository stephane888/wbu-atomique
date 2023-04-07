/**
 * Permet de determiner le sens de deplacement de la bare vertical pour un element donnée.
 */
(function () {
  "use-strict";
  checkScrollDirection(event){
  console.log('event : ', event)
  };
  document.querySelectorAll('[data-hbk="scroll"]').forEach((elment) => {
    elment.addEventListener("scroll", checkScrollDirection);
  });
})();
