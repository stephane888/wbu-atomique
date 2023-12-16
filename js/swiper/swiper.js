import Swiper, { Navigation, Pagination, Parallax, Autoplay, Controller, Thumbs, EffectFade } from "swiper";
//import Swiper, { Navigation } from "swiper";
import AOS from "aos";
// configure Swiper to use modules
Swiper.use([Navigation, Pagination, Parallax, Autoplay, Controller, Thumbs, EffectFade]);

import "swiper/css/bundle";
/**
 * Fichier de base pour le module swipper.
 */
class SwiperManager {
  /**
   *
   * @param {*} item element permettant de selectionner le slider.( elment object, #id)
   * @param {*} settings configuration du slider.
   */
  constructor(item, settings) {
    this.item = item;
    this.settings = settings;
    this.SwiperInstance;
  }

  init() {
    try {
      this.SwiperInstance = new Swiper(this.item, this.settings);
    } catch (error) {
      console.log("Error swiper slide : ", error, " \n Element : ", item);
    }
  }
  getInstance() {
    return this.SwiperInstance;
  }
}
export default SwiperManager;
