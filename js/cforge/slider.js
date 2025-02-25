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