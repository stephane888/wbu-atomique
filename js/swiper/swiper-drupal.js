import SwiperManager from "./swiper";
/**
 * il faudra documenter.
 */
(function (Drupal) {
  Drupal.behaviors.swiperjs_options = {
    attach: function (context, settings) {
      if (context.querySelectorAll && context.querySelectorAll(".swiper-full-options")) {
        const sw = new SwiperManager(context);
        sw.build();
      }
    },
  };
})(window.Drupal);
