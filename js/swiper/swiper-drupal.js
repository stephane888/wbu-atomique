import SwiperManager from "./swiper";
/**
 * il faudra documenter.
 */
(function (Drupal) {
  Drupal.behaviors.swiperjs_options = {
    attach: function (context, settings) {
      if (context.querySelectorAll && context.querySelectorAll(".swiper-full-options")) {
        /**
         * Contient tous les sliders.
         */
        const sliders = {};
        context.querySelectorAll(".swiper-full-options").forEach((item) => {
          try {
            /**
             * Contient la clée permettant d'identifier le parent.
             * ( cet element doit etre sur le slider thumbs et le slider principal )
             */
            const parent = item.getAttribute("data-key-parent");
            /**
             * Cet attribut doit etre sur le slider principal et sa valeur true.
             */
            const isParent = item.getAttribute("data-is-parent");
            /**
             * Contient la clée permettant d'identifier le slider enfant.
             * ( cet element doit etre sur le slider thumbs et le slider principal )
             */
            const children = item.getAttribute("data-key-children");
            /**
             * Cet attribut doit etre sur le slider thumb et sa valeur true.
             */
            const isChildren = item.getAttribute("data-is-children");

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
            /**
             * Si l'element est attaché avec un autre.
             */
            if (children && parent) {
              /**
               * On s'assure de toujours executé le parent apres le children.
               */
              if (isParent) {
                const SliderParent = new SwiperManager(item, overrideSettings);
                if (sliders[children]) {
                  sliders[children].init();
                  if (!overrideSettings.thumbs) overrideSettings.thumbs = {};
                  overrideSettings.thumbs.swiper = sliders[children].getInstance();
                  SliderParent.init();
                } else {
                  sliders[parent] = { item: item, overrideSettings: overrideSettings };
                }
              } else if (isChildren) {
                const SliderChilDren = new SwiperManager(item, overrideSettings);
                sliders[children] = SliderChilDren;
                if (sliders[parent]) {
                  SliderChilDren.init();
                  const cpS = sliders[parent];
                  if (!cpS.overrideSettings.thumbs) cpS.overrideSettings.thumbs = {};
                  cpS.overrideSettings.thumbs.swiper = SliderChilDren.getInstance();
                  new SwiperManager(cpS.item, cpS.overrideSettings);
                }
              }
            } else {
              const sl = new SwiperManager(item, overrideSettings);
              sl.init();
            }
          } catch (error) {
            console.log("Error swiper slide : ", error, " \n Element : ", item);
          }
        });
      }
    },
  };
})(window.Drupal);
