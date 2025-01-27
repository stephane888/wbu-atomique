/**
 * Pour le developpment ,
 * on peut ajouter "import "@stephane888/wbu-atomique/js/test/try_code.js;"
 */
// Code for orthers things.
Drupal.behaviors.hbk_d45d_navigate_to_next = {
  attach: function (context, settings) {
    if (context.querySelectorAll && context.querySelectorAll('[data-action="navigate-next"]')) {
      once("paragraph_navigate_to_next", '[data-action="navigate-next"]', context).forEach((scrollToTopBtn) => {
        scrollToTopBtn.addEventListener("click", function () {
          scrollToTopBtn.classList.add("is-active");
          // Obtenir la position du bouton par rapport au haut de la page
          const buttonPosition = scrollToTopBtn.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: buttonPosition,
            behavior: "smooth", // Pour un défilement fluide
          });
        });
      });
    }
  },
};
