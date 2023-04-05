import Swiper, {
  Navigation,
  Pagination,
  Parallax,
  Autoplay,
  Controller,
  Thumbs,
} from "swiper";
import AOS from "aos";
// configure Swiper to use modules
Swiper.use([Navigation, Pagination, Parallax, Autoplay, Controller, Thumbs]);
// import Swiper styles
import "swiper/css/bundle";
/**
 * il faudra documenter.
 */
(function () {
  document.querySelectorAll(".swiper-full-options").forEach((item) => {
    try {
      if (
        !item.classList.contains("thumbnail-swiper") &&
        !item.classList.contains("thumbs-carousel")
      ) {
        const settings = JSON.parse(item.getAttribute("data-swiper"));
        const overrideSettings = {
          ...settings,
          on: {
            // transitionStart(swiper) {
            //   swiper.slides.forEach((item) => {
            //     item.querySelectorAll(".aos-init").forEach((element) => {
            //       element.classList.remove("aos-init", "aos-animate");
            //     });
            //   });
            // },
            // slideChange(swiper) {
            //   // swiper.slides[swiper.activeIndex]
            //   //   .querySelectorAll(".aos-init")
            //   //   .forEach((element) => {
            //   //     element.classList.remove("aos-init", "aos-animate");
            //   //   });
            //   swiper.slides.forEach((item) => {
            //     item.querySelectorAll(".aos-init").forEach((element) => {
            //       element.classList.remove("aos-init", "aos-animate");
            //     });
            //   });
            // },
            beforeTransitionStart(swiper) {
              // swiper.slides[swiper.activeIndex]
              //   .querySelectorAll(".aos-init")
              //   .forEach((element) => {
              //     element.classList.remove("aos-init", "aos-animate");
              //   });
              //
              // swiper.slides.forEach((item) => {
              //   // aos
              //   item.querySelectorAll(".aos-init").forEach((element) => {
              //     element.classList.remove("aos-init", "aos-animate");
              //   });
              //   // animate
              //   item.querySelectorAll(".animate-css").forEach((element) => {
              //     element.classList.remove(
              //       "animate__animated",
              //       "animate__bounce"
              //     );
              //   });
              // });
            },
            // slideChangeTransitionStart(swiper) {
            //   swiper.slides[swiper.activeIndex]
            //     .querySelectorAll(".aos-init")
            //     .forEach((element) => {
            //       element.classList.remove("aos-init", "aos-animate");
            //     });
            // },
            slideChangeTransitionEnd(swiper) {
              console.log("slideChangeTransitionEnd : ", swiper);
              // swiper.slides[swiper.activeIndex]
              //   .querySelectorAll(".animate-css")
              //   .forEach((element) => {
              //     element.classList.add("animate__animated", "animate__bounce");
              //   });
              // On initialise AOS.
              AOS.init();
              //On le retire sur tous les elements sauf celui encours.
              swiper.slides.forEach((item, index) => {
                if (swiper.activeIndex !== index)
                  item.querySelectorAll(".aos-init").forEach((element) => {
                    element.classList.remove("aos-init", "aos-animate");
                  });
              });
            },
          },
        };
        new Swiper(item, overrideSettings);
      } else {
        console.log("Display items : ", item);
      }
    } catch (error) {
      console.log("Error swiper slide : ", error, " \n Element : ", item);
    }
  });
  // this will are defined for snipsets slides
  let thum_swiper = document.querySelector(
    ".swiper-full-options.thumbs-carousel"
  );
  let small_thum_swiper = document.querySelector(
    ".swiper-full-options.thumbnail-swiper"
  );
  if (thum_swiper && small_thum_swiper) {
    try {
      const settings = JSON.parse(thum_swiper.getAttribute("data-swiper"));
      const small_settings = JSON.parse(
        small_thum_swiper.getAttribute("data-swiper")
      );
      let small_thum_swiper_image = new Swiper(
        small_thum_swiper,
        small_settings
      );
      settings.thumbs = {
        swiper: small_thum_swiper_image,
        autoScrollOffset: 1,
      };
      console.log("items : item", small_thum_swiper_image);
      new Swiper(thum_swiper, settings, "trait trait ou un truc: ", settings);
    } catch (error) {
      console.log(
        "Error swiper slide : ",
        error,
        " \n Element : ",
        thum_swiper
      );
    }
  } else if (thum_swiper) {
    try {
      const settings = JSON.parse(thum_swiper.getAttribute("data-swiper"));
      new Swiper(thum_swiper, settings);
    } catch (error) {
      console.log(
        " Error swiper slide : ",
        error,
        "\n Element : ",
        thum_swiper
      );
    }
  }
})();
