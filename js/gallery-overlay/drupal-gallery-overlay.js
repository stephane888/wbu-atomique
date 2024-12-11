import GalleryOverlay from "./gallery-overlay";
/**
 * il faudra documenter.
 */
(function (Drupal) {
  Drupal.behaviors.gallery_overlay_options = {
    attach: function (context, settings) {
      if (context.querySelectorAll && context.querySelectorAll(".drupal-gallery-overlay").length) {
        if (![...context.querySelector(".drupal-gallery-overlay").classList].includes("loaded")) {
          [...context.querySelectorAll(".drupal-gallery-overlay")].forEach((element) => {
            element.classList.add("loaded");

            const settings = element.hasAttribute("data-gallery-overlay") ? JSON.parse(element.getAttribute("data-gallery-overlay")) : {};
            const dg = new GalleryOverlay(context, settings);
            dg.buildV2();
          });
        }
      }
    },
  };
})(window.Drupal);
