/**
 *  Permet d'initialiser le fonctionnement sur drupal.
 */
import HbkMegaMenu from './mega-menu';
(function (Drupal) {
  Drupal.behaviors.myModuleBehavior = {
    attach: function (context, settings) {
      const menus = once('HbkMegaMenu', '.hbk-mega-menu', context);
      if (menus.length > 0) {
        //const HBK = new HbkMegaMenu();
        //HBK.build();
        menus.forEach((menu) => {
          const HBK = new HbkMegaMenu(menu);
          HBK.build();
        });
      }
    },
  };
  //
})(Drupal);
