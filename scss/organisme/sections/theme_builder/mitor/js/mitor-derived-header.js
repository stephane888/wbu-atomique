import Swiper, { Controller, Navigation, Pagination, Thumbs } from "swiper";
import "swiper/css";

const swiper_un = new Swiper(".carousel-hero", {
  modules: [Pagination, Navigation],
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  },
  direction: "horizontal",
  loop: true
});

const carousel_testy = new Swiper(".carousel-testy", {
  modules: [Pagination],
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  },
  loopedSlides: 4,
  spaceBetween: 20,
  //slidesPerGroup: 2,
  slidesPerView: 2,
  loop: true
});
const project_tabs = new Swiper(".project-tabs", {
  modules: [Pagination],
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  },
  slideClass: "mpt-img",
  slideActiveClass: "mpt-img--active",
  loopedSlides: 4,
  spaceBetween: 20,
  slidesPerView: 1,
  grabCursor: true,
  slideToClickedSlide: true,
  loop: true,
  breakpoints: {
    769: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    1200: {
      slidesPerView: 3
    }
  }
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
