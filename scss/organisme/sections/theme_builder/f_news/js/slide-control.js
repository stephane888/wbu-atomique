import Swiper, {
  Navigation,
  Pagination,
  Parallax,
  Autoplay,
  EffectFade,
} from "swiper";
// configure Swiper to use modules
Swiper.use([Navigation, Pagination, Parallax, Autoplay, EffectFade]);
// import Swiper styles
import "swiper/css/bundle";
try {
  (function () {
    "use-strict";
    function managePlayPause(pause, play, slideControl) {
      if (play.style.display == "none") {
        // console.log("play est caché");
        play.style.display = "block";
        pause.style.display = "none";

        slideControl.autoplay.stop();
      } else {
        // console.log("play est visible");
        play.style.display = "none";
        pause.style.display = "block";
        slideControl.autoplay.start();
      }
    }
    const pausePlay = document.querySelector(".play-pause");
    const slideControl = new Swiper(".swiper-sc", {
      // Optional parameters
      loop: true,
      speed: 800,
      effect: "fade",
      navigation: {
        nextEl: ".button-next",
        prevEl: ".button-prev",
      },
      allowTouchMove: false,
      fadeEffect: {
        crossFade: true,
      },
      autoplay: {
        delay: 3000,
        disableOnInteraction: true,
        // pauseOnMouseEnter: true
      },
      slidesPerView: "auto",
      slidesPerGroup: 1,
    });
    if (pausePlay) {
      console.log("Slider controls lancé");
      let pause = pausePlay.querySelector(".wbu-pause");
      let play = pausePlay.querySelector(".wbu-play");
      play.style.display = "none";
      pausePlay.addEventListener("click", () => {
        managePlayPause(pause, play, slideControl);
      });
      slideControl.on("autoplayStop", function () {
        play.style.display = "block";
        pause.style.display = "none";
      });
    } else {
      console.error(
        "l'élement html avec la classe \"play-pause\" permettant de mettre en pose le slide n'existe pas"
      );
    }
  })();
} catch (er) {
  console.error("erreur swiper:", er);
}
