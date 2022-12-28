import Swiper , { Pagination } from "swiper";
import "swiper/css";

const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: false,
    modules: [ Pagination ],
    pagination: {
        el: ".swiper-pagination",
        type: 'bullets',
        clickable: true
    },

    breakpoints: {
        425: {
            slidesPerView: 2,
            spaceBetween: 20
        },
        
        1024: {
            slidesPerView: 1
        }
    }

    
});