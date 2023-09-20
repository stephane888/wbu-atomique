/**
 *  Permet d'initialiser le fonctionnement sur drupal.
 */
import HbkMegaMenu from "./mega-menu";
(function ($, Drupal) {
  Drupal.behaviors.myModuleBehavior = {
    attach: function (context, settings) {
      // console.log("myCustomBehavior : ", once("myCustomBehavior", ".hbk-mega-menu", context));
      if (once("myCustomBehavior", ".hbk-mega-menu", context).length > 0) {
        console.log("myCustomBehavior ....");
        const HBK = new HbkMegaMenu();
        HBK.toggleSubMenu();
        HBK.addIconClose();
        HBK.clickToOpenMobileMenu();
        HBK.openModelsearch();
      }
    },
  };
  //
})(jQuery, Drupal);
