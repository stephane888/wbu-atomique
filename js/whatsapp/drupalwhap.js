import whatsappMessage from "../scss/organisme/sections/theme_builder/restoRed/js/teaserbutonwhat.js";
/**
 * il faudra documenter.
 */
(function (Drupal) {
  Drupal.behaviors.swiperjs_options = {
    attach: function (context, settings) {
      if (context.querySelectorAll && context.querySelectorAll(".whatsapp-widget").length) {
        // tu mets ton code ici.
      }
    },
  };
})(window.Drupal);
