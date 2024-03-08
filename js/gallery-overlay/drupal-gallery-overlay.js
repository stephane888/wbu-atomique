import GalleryOverlay from "./gallery-overlay";
/**
 * il faudra documenter.
 */
(function (Drupal) {
    Drupal.behaviors.swiperjs_options = {
        attach: function (context, settings) {
            if (context.querySelectorAll && context.querySelectorAll(".drupal-gallery-overlay").length) {
                const dg = new GalleryOverlay(context);
                dg.build();
            }
        },
    };
})(window.Drupal);
