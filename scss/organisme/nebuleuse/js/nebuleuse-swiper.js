import Swiper, { Autoplay, Controller } from 'swiper';

const swiper = new Swiper(".swiper", {
    modules: [Autoplay, Controller],
    autoplay: {
        delay: 5000,
        disableOnInteraction: false
    },
    speed: 500,
})

const swiper2 = new Swiper(".slider-thumb", {
    modules: [Autoplay, Controller],
    speed: 500,
    centeredSlides: true,
    slidesPerView: 'auto',
    slideToClickedSlide: true,
})
swiper.controller.control = swiper2
swiper2.controller.control = swiper