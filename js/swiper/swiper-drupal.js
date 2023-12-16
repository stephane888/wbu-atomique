import SwiperManager from "./swiper";
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
              new SwiperManager(item, overrideSettings);
            } else {
              console.log("Display items : ", item);
            }
          } catch (error) {
            console.log("Error swiper slide : ", error, " \n Element : ", item);
          }
        });
      }
    },
  };
})(window.Drupal);
