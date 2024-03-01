/**
 * Pour l'env. Drupal, il faudra importer : import "@stephane888/wbu-atomique/js/swiper/swiper-drupal.js";
 */
import SwiperManager from "../../../../../../js/swiper/swiper";

const settingsGalleryTops = {
  direction: "horizontal",
  effect: "cover",
  speed: 5000,
  spaceBetween: 10,
  loop: true,
  pagination: { el: ".swiper-pagination", clickable: true, enabled: 1 },
  navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev", enabled: 1 },
  parallax: false, // https://swiperjs.com/swiper-api#parallax
  freeMode: {
    enabled: true,
    minimumVelocity: 0.2,
    momentum: true,
    momentumBounce: true,
    momentumBounceRatio: 1,
    momentumRatio: 1,
    momentumVelocityRatio: 1,
  },
  autoplay: {
    delay: 900000,
    pauseOnMouseEnter: true,
    disableOnInteraction: false,
    waitForTransition: true,
    stopOnLastSlide: false,
  },
  centeredSlides: 0,
  slidesPerView: 1,
  grabCursor: 0,
};
document.querySelector(".testslider.swiper-full-options").setAttribute("data-swiper", JSON.stringify(settingsGalleryTops));

const galleryThumbs = new SwiperManager();
galleryThumbs.build();
