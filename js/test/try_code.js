/**
 * Pour le developpment ,
 * on peut ajouter  : import "@stephane888/wbu-atomique/js/test/try_code.js;"
 */
// Code for orthers things.
(function (Drupal) {
  Drupal.behaviors.habeuk_custom_block__modal = {
    attach: function (context) {
      if (context && context.querySelector && context.querySelector("#ecommerce-72h-modal")) {
        console.log("ecommerce-72h-modal ... DOMContentLoaded");
        // ecommerce-72h
        const modalElement = context.querySelector("#ecommerce-72h-modal");
        if (modalElement) {
          const modal = new window.bootstrap.Modal(modalElement);
          once("habeuk_custom_block__modal--ecommerce-72h-modal", ".trigger--ecommerce-72h-modal", context).forEach((b1) => {
            b1.addEventListener("click", () => {
              modal.show();
            });
          });
        }
      }
    },
  };
})(window.Drupal, window.once);
