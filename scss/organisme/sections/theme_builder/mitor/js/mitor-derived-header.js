import Swiper, { Controller, Navigation, Pagination, Thumbs } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

const swiper_un = new Swiper(".carousel-hero", {
  modules: [Pagination, Navigation],
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  },
  direction: "horizontal",
  loop: true
});

const thumbs = new Swiper(".thumbnail-swiper", {
  modules: [Controller],
  loop: true,
  spaceBetween: 5,
  slidesPerView: 3,
  slidesPerScroll: 5,
  slideToClickedSlide: true
});
var thum_swiper = new Swiper(".thumbs-carousel", {
  modules: [Pagination, Controller, Thumbs],
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  },
  thumbs: {
    swiper: thumbs,
    autoScrollOffset: 1
  }
});

console.log("swiper on", swiper_un);
