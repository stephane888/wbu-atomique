import Swiper, { Autoplay, Controller, Navigation } from 'swiper';

const swiper = new Swiper(".swiper", {
    modules: [Autoplay, Controller, Navigation],
    autoplay: {
        delay: 5000,
        disableOnInteraction: false
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    speed: 500,
})

const swiper2 = new Swiper(".slider-thumb", {
    modules: [Autoplay, Controller],
    speed: 500,
    centeredSlides: true,
    slidesPerView: 10,
    slideToClickedSlide: true,
})
swiper.controller.control = swiper2
swiper2.controller.control = swiper