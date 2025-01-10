import GalleryOverlay from "./gallery-overlay";
/**
 * il faudra documenter.
 */
(function (Drupal) {
  Drupal.behaviors.more_fields__gallery_overlay_options = {
    attach: function (context, settings) {
      if (context.querySelectorAll && context.querySelectorAll(".drupal-gallery-overlay").length) {
        once("more_fields_drupal-gallery-overlay", ".drupal-gallery-overlay", context).forEach((element) => {
          const settings = element.hasAttribute("data-gallery-overlay") ? JSON.parse(element.getAttribute("data-gallery-overlay")) : {};
          const dg = new GalleryOverlay(element, settings);
          dg.build();
        });
      }
    },
  };
})(window.Drupal);
