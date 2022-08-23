
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel';
import 'jquery'
$(document).ready(function(){
    $('.slider-handler').owlCarousel({
        loop: true,
        margin: 5,
        nav: true,
        dots: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000:{
                items: 2
            }
        }
    })
})     