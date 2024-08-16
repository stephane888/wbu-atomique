import "../scss/popin.scss";

import popin from "./popin";
(function (Drupal) {
  Drupal.behaviors.myModuleBehavior = {
    attach: function (context, settings) {
      if (once("hbkSavoiepechePopin", ".hbk_savoiepeche_popin_block", context).length > 0) {
        const HBK = new popin(context);
        HBK.build();
      }
    },
  };
  //
})(Drupal);
