import Swiper, { Navigation, Pagination, Parallax, Autoplay } from "swiper";
Swiper.use([Navigation, Pagination, Parallax, Autoplay]);

var swiper = new Swiper('.swiper-container', {
    speed: 500,
    effect: 'fade',
    navigation: {
      nextEl: '.next',
      prevEl: '.prev',
    },

  });