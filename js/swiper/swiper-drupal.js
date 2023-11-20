import Swiper, { Navigation, Pagination, Parallax, Autoplay, Controller, Thumbs, EffectFade } from "swiper";
//import Swiper, { Navigation } from "swiper";
import AOS from "aos";
// configure Swiper to use modules
Swiper.use([Navigation, Pagination, Parallax, Autoplay, Controller, Thumbs, EffectFade]);
//Swiper.use([Navigation]);
// import Swiper styles
import "swiper/css/bundle";
/**
 * il faudra documenter.
 */
(function (Drupal) {
  Drupal.behaviors.swiperjs_options = {
    attach: function (context, settings) {
      if (context.querySelectorAll && context.querySelectorAll(".swiper-full-options")) {
        context.querySelectorAll(".swiper-full-options").forEach((item) => {
          try {
            if (!item.classList.contains("thumbnail-swiper") && !item.classList.contains("thumbs-carousel")) {
              const settings = JSON.parse(item.getAttribute("data-swiper"));
              // console.log("settings : ", settings);
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
                    // swiper.slides.forEach((item, index) => {
                    //   if (swiper.activeIndex !== index)
                    //     item.querySelectorAll(".aos-init").forEach((element) => {
                    //       element.classList.add("d-none");
                    //     });
                    //   else
                    //     item.querySelectorAll(".aos-init").forEach((element) => {
                    //       element.classList.remove("d-none");
                    //     });
                    // });
                  },
                  // slideChangeTransitionStart(swiper) {
                  //   swiper.slides.forEach((item, index) => {
                  //     if (swiper.activeIndex === index)
                  //       item.querySelectorAll(".aos-init").forEach((element) => {
                  //         element.classList.remove("d-none");
                  //       });
                  //   });
                  // },
                  slideChangeTransitionEnd(swiper) {
                    //console.log(" slideChangeTransitionEnd : ", swiper);
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
                          //   element.classList.add("d-none");
                        });
                      else {
                        // item.querySelectorAll(".aos-init").forEach((element) => {
                        //   element.classList.remove("d-none");
                        // });
                      }
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
        let thum_swiper = context.querySelector(".swiper-full-options.thumbs-carousel");
        let small_thum_swiper = context.querySelector(".swiper-full-options.thumbnail-swiper");
        if (thum_swiper && small_thum_swiper) {
          try {
            const settings = JSON.parse(thum_swiper.getAttribute("data-swiper"));
            const small_settings = JSON.parse(small_thum_swiper.getAttribute("data-swiper"));
            let small_thum_swiper_image = new Swiper(small_thum_swiper, small_settings);
            settings.thumbs = {
              swiper: small_thum_swiper_image,
              autoScrollOffset: 1,
            };
            console.log("items : item", small_thum_swiper_image);
            new Swiper(thum_swiper, settings, "trait trait ou un truc: ", settings);
          } catch (error) {
            console.log("Error swiper slide : ", error, " \n Element : ", thum_swiper);
          }
        } else if (thum_swiper) {
          try {
            const settings = JSON.parse(thum_swiper.getAttribute("data-swiper"));
            new Swiper(thum_swiper, settings);
          } catch (error) {
            console.log(" Error swiper slide : ", error, "\n Element : ", thum_swiper);
          }
        }
      }
    },
  };
})(window.Drupal);
