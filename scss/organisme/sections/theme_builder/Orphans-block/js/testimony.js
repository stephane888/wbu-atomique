import Swiper, { Navigation, Pagination, Parallax, Autoplay } from "swiper";
Swiper.use([Navigation, Pagination, Parallax, Autoplay]);

var swiper = new Swiper('.swiper', {
    effect: 'fade',
    slidesPerView: 1.6,
    direction: "vertical",
    navigation: {
      nextEl: '.next',
      prevEl: '.prev',
    },
    pagination: {
      clickable: true,
    }

  });