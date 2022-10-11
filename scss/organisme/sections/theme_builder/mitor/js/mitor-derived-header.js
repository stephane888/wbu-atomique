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

const swiper_blog = new Swiper(".blog-carousel", {
  modules: [Pagination],
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  },
  direction: "horizontal",
  loopedSlides: 10,
  loop: true,
  spaceBetween: 20,
  slidesPerView: 1,
  grabCursor: true,
  watchSlidesVisibility: true,
  breakpoints: {
    769: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    1300: {
      slidesPerView: 3
    }
  }
});

const project_tabs = new Swiper(".project-tabs", {
  modules: [Pagination],
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  },
  slideClass: "mpt-img",
  slideActiveClass: "mpt-img--active",
  loopedSlides: 10,
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
    992: {
      slidesPerView: 3,
      spaceBetween: 20
    },
    1200: {
      slidesPerView: 4
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

/**
 * Les carousel de testimony
 */
const carousel_testy = new Swiper(".carousel-testy", {
  modules: [Pagination],
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  },
  loopedSlides: 4,
  spaceBetween: 20,
  //slidesPerGroup: 2,
  slidesPerView: 1,
  loop: true,
  breakpoints: {
    993: {
      slidesPerView: 2,
      spaceBetween: 30
    }
  }
});
const carousel_testy_nav = new Swiper(".carousel-testy-nav", {
  modules: [Pagination, Navigation],
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  loopedSlides: 4,
  spaceBetween: 10,
  slidesPerView: 1,
  loop: true,
  slideToClickedSlide: true,
  breakpoints: {
    1200: {
      centeredSlides: true,
      slidesPerView: 2,
      spaceBetween: 40
    }
  }
});
const carousel_testy_nav_ronded = new Swiper(".carousel-testy-nav-rond", {
  modules: [Pagination, Navigation],
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  loopedSlides: 4,
  spaceBetween: 20,
  slidesPerView: 1,
  loop: true,
  slideToClickedSlide: true,
  breakpoints: {
    992: {
      slidesPerView: 2,
      spaceBetween: 40
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 40
    }
  }
});
console.log("swiper on : ", swiper_un);
