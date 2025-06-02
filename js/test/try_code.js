/**
 * Pour le developpment ,
 * on peut ajouter  : import "@stephane888/wbu-atomique/js/test/try_code.js;"
 */
// Code for orthers things.
// (function (Drupal, once) {
//   Drupal.behaviors.habeuk_custom_limit_text = {
//     attach: function (context) {
//       const selec_paraph = " .paragraph__double_pricing---183 .block_content__pricing__presentation ";
//       if (context && context.querySelector && context.querySelectorAll(selec_paraph)) {
//         class ManageLimitText {
//           createButton() {
//             const button = document.createElement("span");
//             button.className = "show-all-btn position-absolute d-block w-100";
//             button.innerHTML = ` Afficher tout <svg class="arrow-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor">  <path d="M6 9l6 6 6-6"/>  </svg> `;
//             return button;
//           }
//         }
//         //
//         once("paragraph__double_pricing---183", selec_paraph, context).forEach((block_content) => {
//           const MLT = new ManageLimitText();
//           const item = block_content.querySelector(".custom-pricing > .item");
//           if (item) {
//             const containOptions = block_content.querySelector(".contain-options");
//             item.classList.add("position-relative");
//             const button = MLT.createButton();
//             button.addEventListener("click", () => {
//               containOptions.classList.toggle("show-all");
//             });
//             item.appendChild(button);
//           }
//         });
//       }
//     },
//   };
// })(window.Drupal, window.once);
//
Drupal.behaviors.customHead = {
  attach: function (context, settings) {
    if (context.querySelectorAll && context.querySelectorAll(".main")) {
      const testimonies = once("custom-head", ".main", context);
      testimonies.forEach((list, index) => {
        let lists = context.querySelectorAll(".step-item");

        // Vérifie si l'URL contient "seletion-design"
        if (window.location.href.includes("selection-design")) {
          if (lists.length >= 2) {
            // Ajoute la classe .active au premier élément
            lists[0].classList.add("termine");
            lists[0].classList.remove("en-cours");

            // Ajoute la classe .en-cours au deuxième élément
            lists[1].classList.add("en-cours");
            lists[1].classList.remove("termine");
          }
        }
        /*if (window.location.href.includes("pack")) {
                lists[0].classList.add("termine");
                lists[1].classList.add("termine");
                lists[0].classList.add("en-cours");
              }*/

        if (window.location.href.includes("prise-de-rendez-vous")) {
          if (lists.length >= 2) {
            // Ajoute la classe .active au premier élément
            lists[0].classList.add("termine");

            // Ajoute la classe .en-cours au deuxième élément
            lists[1].classList.add("termine");
            lists[2].classList.add("en-cours");
          }
        }
        // Récupérer les paramètres GET de l’URL
        const urlParams = new URLSearchParams(window.location.search);
        const email = urlParams.get("email");
        const telephone = urlParams.get("telephone");

        // Préparer l’URL Calendly avec les paramètres pré-remplis
        let calendlyBaseURL = "https://calendly.com/contact-wb-horizon";

        if (email || telephone) {
          calendlyBaseURL += "?";

          const calendlyParams = new URLSearchParams();

          if (email) calendlyParams.append("email", email);
          if (telephone) calendlyParams.append("a1", telephone); // a1 = champ personnalisé sur Calendly

          calendlyBaseURL += calendlyParams.toString();
        }

        // Mettre à jour la src de l’iframe
        const iframe = document.querySelector("iframe[src*='calendly.com']");
        if (iframe) {
          iframe.src = calendlyBaseURL;
        }
      });
    }
  },
};