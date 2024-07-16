/**
 *  Permet d'initialiser le fonctionnement sur drupal.
 */
import HbkMegaMenu from "./mega-menu";
(function (Drupal) {
  Drupal.behaviors.myModuleBehavior = {
    attach: function (context, settings) {
      if (once("HbkMegaMenu", ".hbk-mega-menu", context).length > 0) {
        const HBK = new HbkMegaMenu();
        HBK.build();
      }
    },
  };
  //
})(Drupal);
