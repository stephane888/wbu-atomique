import Swiper from "swiper";
import { Navigation, Pagination, Parallax, Autoplay } from "swiper/modules";
// configure Swiper to use modules
Swiper.use([Navigation, Pagination, Parallax, Autoplay]);
// import Swiper styles
import "swiper/css/bundle";
//import "../../scss/organisme/sections/swiper-big-v2.scss";

/**
 * --
 */
var mySwiper = new Swiper(".swiper-big-v2", {
  direction: "horizontal",
  loop: true,
  pagination: { el: ".swiper-pagination", type: "bullets", clickable: true },
  //grabCursor: true,
  speed: 1000,
  parallax: true,
  //effect: "slide",
  //mousewheelControl: 1,
  autoplay: {
    delay: 8000,
  },
  //autoplay: false,
});
