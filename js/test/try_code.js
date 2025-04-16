/**
 * Pour le developpment ,
 * on peut ajouter  : import "@stephane888/wbu-atomique/js/test/try_code.js;"
 */
// Code for orthers things.
(function (Drupal, once) {
  Drupal.behaviors.habeuk_custom_limit_text = {
    attach: function (context) {
      const selec_paraph = " .paragraph__double_pricing---183 .block_content__pricing__presentation ";
      if (context && context.querySelector && context.querySelectorAll(selec_paraph)) {
        class ManageLimitText {
          createButton() {
            const button = document.createElement("span");
            button.className = "show-all-btn position-absolute d-block w-100";
            button.innerHTML = ` Afficher tout <svg class="arrow-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor">  <path d="M6 9l6 6 6-6"/>  </svg> `;
            return button;
          }
        }
        //
        once("paragraph__double_pricing---183", selec_paraph, context).forEach((block_content) => {
          const MLT = new ManageLimitText();
          const item = block_content.querySelector(".custom-pricing > .item");
          if (item) {
            const containOptions = block_content.querySelector(".contain-options");
            item.classList.add("position-relative");
            const button = MLT.createButton();
            button.addEventListener("click", () => {
              containOptions.classList.toggle("show-all");
            });
            item.appendChild(button);
          }
        });
      }
    },
  };
})(window.Drupal, window.once);
