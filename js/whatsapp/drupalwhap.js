import whatsappMessage from "../../scss/organisme/sections/theme_builder/restoRed/js/teaserbutonwhat";
/**
 * il faudra documenter.
 */
(function (Drupal) {
  Drupal.behaviors.popup = {
    attach: function (context, settings) {
      if (context.querySelectorAll && context.querySelectorAll(".whatsapp-widget").length) {
        // tu mets ton code ici.
        const message = new whatsappMessage(context, settings);
        message.init();
      }
    },
  };
})(window.Drupal);
