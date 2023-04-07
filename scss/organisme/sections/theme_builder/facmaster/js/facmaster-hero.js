import Swiper , { Pagination, Navigation, Autoplay } from "swiper";
  import 'swiper/css/navigation';
  import 'swiper/css/pagination';

import "swiper/css";

const swiper = new Swiper('.swiper', {
  modules: [Navigation, Pagination, Autoplay],
  autoplay: {
   delay: 8000,
 },
   
  // Optional parameters
  direction: 'horizontal',
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});