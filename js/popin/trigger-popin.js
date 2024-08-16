import "../scss/popin.scss";

import popin from "./popin";
(function (Drupal) {
  Drupal.behaviors.myModuleBehavior = {
    attach: function (context, settings) {
      if (context.querySelectorAll(".hbk_button_open_popin") && context.querySelectorAll(".hbk_button_open_popin").length) {
        once("hbk_buttons_open_popin", ".hbk_button_open_popin", context).forEach((button) => {
          button.addEventListener("click", () => {
            const id = button.getAttribute("data-id-popin-trigger");
            if (id) {
              const HBK = new popin(context);
              HBK.togglePopin(id);
            }
          });
        });
      }
    },
  };
  //
})(Drupal);
