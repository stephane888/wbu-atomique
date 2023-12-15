import Swiper, { Autoplay, Controller, Navigation } from 'swiper';
const breakPoints = {
    XS: 441,
    SM: 576,
    MD: 769,
    DD: 992,
    MS: 1025,
    M: 1201,
    LM: 1451,
    L: 1601,
    XL: 1921
}

const selectedBP = "XS";
const swiperSpeed = 500;
const swiperDelay = 5000;
const swiperClass = ".commerce-swiper";
const swiperThumbClass = ".commerce-swiper-thumb";
const swiperPrevButtonClass = ".swiper-button-prev"
const swiperNextButtonClass = ".swiper-button-next"
let swiperElement = document.querySelector(swiperClass);

//defining if the thumb should be vertical(desktop) or horizontal(modile)
let thumbOrientation = swiperElement.offsetWidth < breakPoints[selectedBP] ? "horizontal" : "vertical";
if (swiperElement.offsetWidth < breakPoints[selectedBP]) {
    thumbElements = document.getElementsByClassName()
}
const swiper = new Swiper(swiperClass, {
    modules: [Autoplay, Controller, Navigation],
    autoplay: {
        delay: swiperDelay,
        disableOnInteraction: false
    },
    navigation: {
        nextEl: swiperNextButtonClass,
        prevEl: swiperPrevButtonClass
    },
    speed: swiperSpeed,
    pauseOnMouseEnter: true
})

const swiper2 = new Swiper(swiperThumbClass, {
    modules: [Autoplay, Controller, Navigation],
    centeredSlides: true,
    slidesPerView: 3,
    direction: thumbOrientation,
    slideToClickedSlide: true,
    spaceBetween: 3,
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    pauseOnMouseEnter: true
})
swiper.controller.control = swiper2
swiper2.controller.control = swiper