import Swiper, { Navigation, Pagination, Parallax, Autoplay } from "swiper";
Swiper.use([Navigation, Pagination, Parallax, Autoplay]);

var swiper = new Swiper(".mySwiper", {
  direction: "vertical",
  slidesPerView: 1,
  spaceBetween: 0,
  mousewheel: false,
  loop: true,
  autoplay: {
    Delay: 5000
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  }
});
