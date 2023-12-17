import Swiper, { Navigation, Pagination, Parallax, Autoplay, Controller, Thumbs, EffectFade } from "swiper";
//import Swiper, { Navigation } from "swiper";
import AOS from "aos";
// configure Swiper to use modules
Swiper.use([Navigation, Pagination, Parallax, Autoplay, Controller, Thumbs, EffectFade]);

import "swiper/css/bundle";
/**
 * Fichier de base pour le module swipper.
 * - Chaque slider doit doit contenir la class ".swiper-full-options"
 * - L'attribut data-swiper (optinnel) doit contenir la configuration.
 * -
 */
class SwiperManager {
  /**
   *
   * @param {*} context Le html ou node ou on doit aller chercher les sliders.
   * @param {*} settings configuration de base de tous les sliders.
   */
  constructor(context = null, settings = {}) {
    if (context) this.context = context;
    else this.context = document;
    this.settings = settings;
    this.SwipersInstances = {};
  }

  /**
   * construit tous les sliders.
   */
  build() {
    if (this.context.querySelectorAll && this.context.querySelectorAll(".swiper-full-options")) {
      this.context.querySelectorAll(".swiper-full-options").forEach((item, key) => {
        try {
          /**
           * Contient la clée permettant d'identifier le parent.
           * ( cet element doit etre sur le slider thumbs et le slider principal )
           */
          const parent = item.hasAttribute("data-key-parent") ? item.getAttribute("data-key-parent") : null;
          /**
           * Cet attribut doit etre sur le slider principal et sa valeur true.
           */
          const isParent = item.hasAttribute("data-is-parent") ? item.getAttribute("data-is-parent") : false;
          /**
           * Contient la clée permettant d'identifier le slider enfant.
           * ( cet element doit etre sur le slider thumbs et le slider principal )
           */
          const children = item.hasAttribute("data-key-children") ? item.getAttribute("data-key-children") : null;
          /**
           * Cet attribut doit etre sur le slider thumb et sa valeur true.
           */
          const isChildren = item.hasAttribute("data-is-children") ? item.getAttribute("data-is-children") : false;

          const settings = item.hasAttribute("data-swiper") ? JSON.parse(item.getAttribute("data-swiper")) : {};
          const overrideSettings = {
            ...this.settings,
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
           * On execute cette partie si le slider contient le thumb.
           *  - On s'assure de toujours executer le parent apres le children.
           */
          if (children && parent) {
            if (isParent) {
              // si on a deja recuperer les données concernants le slider thumb.
              if (this.SwipersInstances[children]) {
                const elt_CL = this.SwipersInstances[children];
                this.SwipersInstances[children] = new Swiper(elt_CL.item, elt_CL.overrideSettings);
                if (!overrideSettings.thumbs) overrideSettings.thumbs = {};
                overrideSettings.thumbs.swiper = this.getInstances(children);
                this.SwipersInstances[parent] = new Swiper(item, overrideSettings);
                this.TransistionOrders(this.getInstances(parent), this.getInstances(children));
                console.log(" Run swiper slider by parent : test => 30/12/2024 ");
              } else {
                this.SwipersInstances[parent] = { item: item, overrideSettings: overrideSettings };
              }
            } else if (isChildren) {
              this.SwipersInstances[children] = { item: item, overrideSettings: overrideSettings };
              // si on a deja recuperer les données concernants le slider parent.
              if (this.SwipersInstances[parent]) {
                this.SwipersInstances[children] = new Swiper(item, overrideSettings);
                const elt_PP = this.SwipersInstances[parent];
                if (!elt_PP.overrideSettings.thumbs) elt_PP.overrideSettings.thumbs = {};
                elt_PP.overrideSettings.thumbs.swiper = this.getInstances(children);
                this.SwipersInstances[parent] = new Swiper(elt_PP.item, elt_PP.overrideSettings);
                this.TransistionOrders(this.getInstances(parent), this.getInstances(children));
                console.log(" Run swiper slider by children : test => 30/12/2024 ");
              }
            }
          } else {
            this.SwipersInstances["Slider--" + key] = new Swiper(item, overrideSettings);
          }
        } catch (error) {
          console.log("Error d'execution de swiper  : ", error, "\n Slider : ", item);
        }
      });
    } else {
      console.log(" Error swiper slide : AUCUN item trouvé ");
    }
  }
  getInstances(key = null) {
    if (key) return this.SwipersInstances[key];
    return this.SwipersInstances;
  }

  TransistionOrders(galleryMain, galleryThumb) {
    galleryMain.on("slideChangeTransitionStart", function () {
      galleryThumb.slideTo(galleryMain.activeIndex);
    });
    galleryThumb.on("transitionStart", function () {
      galleryMain.slideTo(galleryThumb.activeIndex);
    });
    console.log("galleryMain : ", galleryMain);
    console.log("galleryThumb : ", galleryThumb);
  }
}
export default SwiperManager;
