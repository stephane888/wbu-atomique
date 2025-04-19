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
Drupal.behaviors.paragraph__section_formulaire__default = {
  attach: function (context, settings) {
    const key = "creation-de-site-v2-form.choix_radio";
    if (context.querySelectorAll && context.querySelectorAll(".custom-form .main").length > 0) {
      once("paragraph__section_formulaire__default--custom-form", ".custom-form .main", context).forEach((formDisplay) => {
        //const formElements = context.querySelectorAll(".form-display");
        const form = formDisplay.querySelector(".webform-submission-demande-de-creation-de-site-v2-form");
        if (form) {
          if (window.location.href.includes("token")) {
            // on masque le formulaire
            formDisplay.classList.add("d-none");
          } else {
            formDisplay.classList.remove("d-none");
          }
        }

        if (form) {
          // sauvegarde du choix de l'utilisateur.
          form.querySelectorAll('input[name="souhaitez_vous_prendre_rendez_vous"]').forEach((choix) => {
            choix.addEventListener("click", () => {
              console.log("choix.value : ", choix.value);
              sessionStorage.setItem(key, choix.value);
            });
          });

          if (window.location.href.includes("token")) {
            // si l'utilisateur à choisie plus tard, on le redirige sur la page d'accueil.
            const choixSaved = sessionStorage.getItem(key);
            console.log("choixSaved : ", choixSaved);
            if (choixSaved == "Plus tard") {
              window.location.replace("/");
            }
          }
        }
      });
    }
    if (context.querySelectorAll && context.querySelectorAll(".cal-display").length > 0) {
      once("paragraph__section_formulaire__default--cal-display", ".cal-display", context).forEach((calElements) => {
        const choixSaved = sessionStorage.getItem(key);
        if (choixSaved) {
          if (choixSaved == "Oui") {
            // on masque le formulaire
            calElements.classList.remove("d-none");
            // Préremplissage Calendly
            const urlParams = new URLSearchParams(window.location.search);
            const email = urlParams.get("email");
            const telephone = urlParams.get("telephone");

            let calendlyBaseURL = "https://calendly.com/contact-wb-horizon";

            if (email || telephone) {
              const calendlyParams = new URLSearchParams();
              if (email) calendlyParams.append("email", email);
              if (telephone) calendlyParams.append("phone_number", telephone);
              calendlyBaseURL += "?" + calendlyParams.toString();
            }

            const iframe = context.querySelector("iframe[src*='calendly.com']");
            if (iframe) {
              iframe.src = calendlyBaseURL;
            }
          } else {
            calElements.classList.add("d-none");
          }
        } else {
          calElements.classList.add("d-none");
        }
      });
    }
    if (context.querySelectorAll && context.querySelectorAll(".laoder-form").length > 0) {
      once("paragraph__section_formulaire__default--laoder-form", ".laoder-form", context).forEach((loadElements) => {
        loadElements.classList.add("d-none");
      });
    }
  },
};
