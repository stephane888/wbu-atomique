import Swiper, {
  Navigation,
  Pagination,
  Parallax,
  Autoplay,
  Controller,
  Thumbs,
} from "swiper";
// configure Swiper to use modules
Swiper.use([Navigation, Pagination, Parallax, Autoplay, Controller, Thumbs]);
// import Swiper styles
import "swiper/css/bundle";
import "../../scss/swipper/swipper.scss";

(function () {
  document.querySelectorAll(".swiper-full-options").forEach((item) => {
    const settings = JSON.parse(item.getAttribute("data-swiper"));
    new Swiper(item, settings);
  });
})();
