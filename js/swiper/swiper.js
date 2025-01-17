import Swiper from "swiper";
import { Navigation, Pagination, Parallax, Autoplay, Controller, Thumbs, Scrollbar, EffectFade, Zoom, FreeMode } from "swiper/modules";
//import Swiper, { Navigation } from "swiper";
import AOS from "aos";
// configure Swiper to use modules
Swiper.use([Navigation, Pagination, Parallax, Autoplay, Controller, Thumbs, Scrollbar, EffectFade, Zoom, FreeMode]);

import "swiper/css/bundle";
/**
 * Fichier de base pour le module swipper.
 * - Chaque slider doit doit contenir la class ".swiper-full-options"
 * - L'attribut data-swiper (optinnel) doit contenir la configuration.
 * -
 */
/**
 * Permet de ne pas traiter les sliders ( parent et enfant) 2 fois.
 * Contient l'identifiant du parent ou la clee du slider unique.
 */
const sliderKeys = [];
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
    /**
     * Contient les instances de swiper trouver sur la pages.
     */
    this.SwipersInstances = {};
    /**
     * Contient les configurations des etats des differents instances.
     * Par exemple permet de suivre l'etat play/pause d'un slide.
     */
    this.SwipersInstancesConfig = [];
    this.waitterResizeWindow;
    this.aosRunning = false;
  }
  /**
   * Permet de verifier si le slider est bien construit.
   * @param {*} slider
   */
  validator(slider) {
    const swiperWrapper = slider.querySelector(".swiper-wrapper");
    if (swiperWrapper) {
      const swiperSlide = swiperWrapper.querySelectorAll(".swiper-slide");
      if (swiperSlide) {
        return swiperSlide.length > 1 ? true : false;
      } else {
        console.log(" Le slider ne contient pas assez de slide ", slider);
        return false;
      }
    } else {
      console.log(" Le slider ne contient pas 'swiper-wrapper' ", slider);
      return false;
    }
  }

  initAos() {
    if (!this.aosRunning) {
      AOS.init();
      this.aosRunning = true;
    }
  }

  /**
   * Construit tous les sliders.
   */
  build() {
    if (this.context.querySelectorAll && this.context.querySelectorAll(".swiper-full-options").length) {
      const sliders = this.context.querySelectorAll(".swiper-full-options");
      sliders.forEach((item, key) => {
        if (this.validator(item))
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
            //console.log("my__settings: ", { ...this.settings, ...settings });
            const overrideSettings = {
              ...this.settings,
              ...settings,
              // il est preferable d'injecter cela dans use. c'est plus element.
              // modules: [Navigation, Pagination, Parallax, Autoplay, Controller, Thumbs, EffectFade, Scrollbar],
              on: {
                slideChangeTransitionEnd(swiper) {
                  // On le retire sur tous les elements sauf celui encours.
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
                    // on recherche une propri
                  });
                },
                // lorsque la construction du slider est ok.
                init(swiper) {
                  // console.log("Le slider est initialiser : ", swiper.hostEl);
                  // //
                  // if (swiper.hostEl) {
                  //   swiper.hostEl.addEventListener("mouseenter", () => {
                  //     swiper.autoplay.stop();
                  //   });
                  //   swiper.hostEl.addEventListener("mouseleave", () => {
                  //     swiper.autoplay.start();
                  //   });
                  // }
                  // // On verifie si dans l'enssemble des slides on a une video.
                  // swiper.slides.forEach((item) => {
                  //   item.querySelectorAll("video").forEach((video) => {});
                  // });
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
                  this.ChangeDirenctionThumb(this.getInstances(children));
                  // console.log(" Run swiper slider by parent : test => 30/12/2024 ");
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
                  this.ChangeDirenctionThumb(this.getInstances(children));
                }
              }
              /**
               * On ajoute les paramettres
               * -> la cle "swiper_status" permet de savoir si le slider doit suivre un comportement par defaut ou s'il est gerer par un module externe.
               * -> la cle "manager" Permet de determiner l'element externe qui gere le slider.
               * ( Pour l'instant un seul paramettre suffit, on ferra le choix plus tard et supprimer l'autre ).
               */
              this.SwipersInstancesConfig.push({
                double: { parent: parent, children: children },
                config: { ...overrideSettings, custom_config: { swiper_status: "auto", manager: "auto" } },
              });
            } else {
              this.SwipersInstances["Slider--" + key] = new Swiper(item, overrideSettings);
              this.SwipersInstancesConfig.push({ unique: "Slider--" + key, config: { ...overrideSettings, custom_config: { swiper_status: "auto", manager: "auto" } } });
            }
            // On verifie si cest le dernier slider
            if (sliders.length == key + 1) {
              this.GestionDeLanimation();
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
  /**
   * Permet de gerer de maniere efficace l'animation.
   */
  GestionDeLanimation() {
    this.initAos();
    /**
     * Fonctionne uniquement pour le comportement par defaut.
     *
     * @param {*} reference
     * @param {*} custom_config
     */
    const pauseSliders = (reference, custom_config, manager = "auto") => {
      if (custom_config.swiper_status == "auto" || custom_config.swiper_status == manager) {
        custom_config.swiper_status = manager;
        custom_config.manager = manager;
        if (reference.parent) reference.parent.autoplay.stop();
        if (reference.children) reference.children.autoplay.stop();
      }
    };
    /**
     * Fonctionne uniquement pour le comportement par defaut.
     *
     * @param {*} reference
     * @param {*} custom_config
     */
    const playSliders = (reference, custom_config, manager = "auto") => {
      if (custom_config.swiper_status == "auto" || custom_config.swiper_status == manager) {
        custom_config.swiper_status = manager;
        custom_config.manager = manager;
        if (reference.parent) reference.parent.autoplay.start();
        if (reference.children) reference.children.autoplay.start();
      }
    };
    /**
     * Controle la video dans le slider.
     * @param {*} reference
     * @param {*} params
     */
    const manageVideosInSlider = (reference, params) => {
      const swiperParent = reference.parent;
      const swiperChildren = reference.children;
      // On gere la presence de la video.
      const videos = swiperParent.hostEl.querySelectorAll("video");
      if (videos) {
        videos.forEach((video) => {
          // Par defaut on arrete la lecture sur toute les videos.
          if (!video.paused) {
            video.pause();
            video.currentTime = 0;
          }
          video.addEventListener(
            "play",
            () => {
              // On utilise le paramettre "video" afin d'empecher d'autres elements de pouvoir controller le slider.
              pauseSliders({ parent: swiperParent, children: swiperChildren }, params.config.custom_config, "video");
              console.log("video demarrer, slider en pause : ", swiperParent);
            },
            false
          );
          video.addEventListener(
            "pause",
            () => {
              // La video mis en pause, on ne demarre par le slide.
              // L'utilisateur choisira une action.
              console.log("video mise en pause");
            },
            false
          );
          video.addEventListener(
            "ended",
            () => {
              // On utilise le paramettre auto afin de permettre à d'autres elements de pouvoir controller le slider.
              params.config.custom_config.swiper_status = "auto";
              params.config.custom_config.manager = "auto";
              playSliders({ parent: swiperParent, children: swiperChildren }, params.config.custom_config);
              console.log("video terminé, slider run");
            },
            false
          );
        });
        // si une transition se produit on met les videos en pause.
        swiperParent.on("slideChangeTransitionStart", () => {
          videos.forEach((video) => {
            if (!video.paused) {
              video.pause();
            }
          });
          // Si le slider est en pause, on le lance avec les valeurs par defaut.
          if (!swiperParent.autoplay.running && params.config.custom_config.manager == "video") {
            params.config.custom_config.swiper_status = "auto";
            params.config.custom_config.manager = "auto";
            playSliders({ parent: swiperParent, children: swiperChildren }, params.config.custom_config, "auto");
          }
        });
      }
    };
    console.log("SwipersInstancesConfig : ", this.SwipersInstancesConfig);
    this.SwipersInstancesConfig.forEach((params) => {
      if (params.unique && !sliderKeys.includes(params.unique)) {
        sliderKeys.push(params.unique);
        const swiper = this.getInstances(params.unique);
        if (swiper) {
          swiper.hostEl.addEventListener("mouseenter", () => {
            pauseSliders({ parent: swiper }, params.config.custom_config);
          });
          swiper.hostEl.addEventListener("mouseleave", () => {
            swiper.autoplay.start();
            playSliders({ parent: swiper }, params.config.custom_config);
          });
          manageVideosInSlider({ parent: swiper, children: null }, params);
        }
      } else if (params.double && !sliderKeys.includes(params.double.parent)) {
        sliderKeys.push(params.double.parent);
        const swiperParent = this.getInstances(params.double.parent);
        const swiperChildren = this.getInstances(params.double.children);
        if (swiperParent && swiperChildren) {
          // On gere mouseenter et mouseleave.
          const sliders = [swiperParent, swiperChildren];
          sliders.forEach((slider) => {
            slider.hostEl.addEventListener("mouseenter", () => {
              pauseSliders({ parent: swiperParent, children: swiperChildren }, params.config.custom_config);
            });
            slider.hostEl.addEventListener("mouseleave", () => {
              playSliders({ parent: swiperParent, children: swiperChildren }, params.config.custom_config);
            });
          });
          manageVideosInSlider({ parent: swiperParent, children: swiperChildren }, params);
        }
      }
    });
  }

  /**
   * Permet aux sliders main et thumb d'etre synchroniser.
   *  ( semble avoir un bug dans la selection, pas evident à reproduire. )
   * @param {*} galleryMain
   * @param {*} galleryThumb
   */
  TransistionOrders(galleryMain, galleryThumb) {
    // lorsque le slider main change, le slider thumb suit.
    galleryMain.on("slideChangeTransitionStart", function () {
      galleryThumb.slideTo(galleryMain.activeIndex);
    });
    // Lorsqu'on slide sur le thumb le slider main passe sur le thumb actif.
    galleryThumb.on("transitionStart", function () {
      galleryMain.slideTo(galleryThumb.activeIndex);
    });
  }
  /**
   * Permet de changer la disrection du slider en function de la lageur de l'ecran.
   */
  ChangeDirenctionThumb(swiper) {
    // On load
    const changeDirection = () => {
      if (window.innerWidth < 992) {
        swiper.changeDirection("horizontal");
      } else {
        swiper.changeDirection("vertical");
      }
      swiper.pagination.render();
      swiper.pagination.update();
    };
    changeDirection();
    // On resize window.
    window.addEventListener(
      "resize",
      () => {
        if (this.waitterResizeWindow) clearTimeout(this.waitterResizeWindow);
        this.waitterResizeWindow = setTimeout(() => {
          changeDirection();
        }, 50);
      },
      true
    );
  }
}
export default SwiperManager;
