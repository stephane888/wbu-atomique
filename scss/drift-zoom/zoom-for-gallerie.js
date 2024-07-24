/**
 * Specifique à la gallerie (field:type:more_fields_hbk_file_formatter)
 */
import Drift from "drift-zoom";
//
import "./zoom-for-gallerie.scss";

/**
 * Fonctionne avec le slider.
 */
(function (Drupal) {
  Drupal.behaviors.moreFieldsBehavior = {
    attach: function (context, settings) {
      const ManageDriftOnimage = (img, instanceDrif) => {
        // img.classList.add("run-drift");
        // instanceDrif.disable();
        img.addEventListener("click", () => {
          if (img.classList.toggle("run-drift")) {
            //console.log("disable drift : ", img);
            instanceDrif.disable();
          } else {
            //console.log("enable drift : ", img);
            instanceDrif.enable();
          }
        });
      };
      once("GallerieMoreFieldsBehavior", ".galleries-main", context).forEach(function (GallerieContainer) {
        once("imgMoreFieldsBehavior", ".swiper-slide img", GallerieContainer).forEach((img) => {
          const drift = new Drift(img, {
            paneContainer: GallerieContainer,
            inlinePane: false,
            handleTouch: false,
            zoomFactor: 2.0,
            hoverDelay: 200,
            touchDelay: 200,
          });
          ManageDriftOnimage(img, drift);
        });
      });
    },
  };
})(window.Drupal);
