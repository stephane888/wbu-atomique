/**
 * Specifique à la gallerie (field:type:more_fields_hbk_file_formatter)
 */
import Drift from "drift-zoom";
//
import "./zoom-for-gallerie.scss";

/**
 * il faudra documenter.
 */
(function (Drupal) {
  Drupal.behaviors.more_fields = {
    attach: function (context, settings) {
      if (context.querySelectorAll && context.querySelectorAll(".galleries-main img").length) {
        const imgs = context.querySelectorAll(".galleries-main img");
        const paneContainer = document.querySelector(".galleries-main-thumbs");
        imgs.forEach((img) => {
          new Drift(img, {
            paneContainer: paneContainer,
            inlinePane: false,
            handleTouch: false,
            zoomFactor: 2.0,
          });
        });
      }
    },
  };
})(window.Drupal);
