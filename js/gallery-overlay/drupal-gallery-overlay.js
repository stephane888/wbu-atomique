import GalleryOverlay from "./gallery-overlay";
/**
 * il faudra documenter.
 */
(function (Drupal) {
    Drupal.behaviors.gallery_overlay_options = {
        attach: function (context, settings) {
            if (context.querySelectorAll && context.querySelectorAll(".drupal-gallery-overlay").length) {
                console.log(...context.querySelector(".drupal-gallery-overlay").classList);
                if (![...context.querySelector(".drupal-gallery-overlay").classList].includes("loaded")) {
                    const dg = new GalleryOverlay(context);
                    dg.build();
                    [...context.querySelectorAll(".drupal-gallery-overlay")].forEach(element => {
                        element.classList.add("loaded")
                    });
                }
            }
        },
    };
})(window.Drupal);
