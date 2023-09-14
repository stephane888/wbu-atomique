/**
 *  Permet d'initialiser le fonctionnement sur drupal.
 */
import HbkMegaMenu from "./mega-menu";
(function ($, Drupal) {
  Drupal.behaviors.myModuleBehavior = {
    attach: function (context, settings) {
      if (once("myCustomBehavior", ".hbk-mega-menu", context).length > 0) {
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
