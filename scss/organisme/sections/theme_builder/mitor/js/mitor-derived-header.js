import Swiper, { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

const swiper_un = new Swiper(".carousel-hero", {
  modules: [Pagination, Navigation],
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  },
  direction: "horizontal",
  loop: true
});
console.log("swiper on", swiper_un);
