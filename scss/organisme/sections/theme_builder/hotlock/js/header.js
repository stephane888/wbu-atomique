import Swiper, {Navigation, Pagination, Parallax, Autoplay} from "swiper"
Swiper.use([Navigation, Pagination, Parallax, Autoplay]);


/*var swiper = new Swiper(".mySwiper", {
    direction: "vertical",
    slidesPerView: 1,
    spaceBetween: 30,
    mousewheel: false,
    loop: true,
    autoplay: {
      Delay: 5000,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
*/

let bacTop = document.querySelector(".bac-top-btn");
bacTop.addEventListener("click", scrollUp);

window.onscroll = () => {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 500 ||
    document.documentElement.scrollTop > 500
  ) {
    bacTop.style.visibility = "visible";
    bacTop.style.opacity = "1";
  } else {
    bacTop.style = "";
  }
}

function scrollUp() {
  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth"
  });
}
