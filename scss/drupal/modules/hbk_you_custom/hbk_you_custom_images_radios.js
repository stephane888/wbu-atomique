Drupal.behaviors.hbk_you_custom_bef_radios = {
  attach: function (context, settings) {
    if (context.querySelectorAll && context.querySelectorAll(".form-radios.hbk_you_custom_bef_radios")) {
      once("hbk_youcustobefdios", ".form-radios.hbk_you_custom_bef_radios", context).forEach((item) => {
        var anyChecked = false;
        const radios = item.querySelectorAll('li .form-check input[type="radio"]');
        const labels = document.querySelectorAll("li .form-check  label");
        if (radios) {
          radios.forEach(function (radio) {
            radio.addEventListener(
              "click",
              () => {
                ManageCheckbox(radio);
              },
              false
            );
          });
        }

        const ManageCheckbox = (radio) => {
          console.log("radio", radio.value);
          // Si cest deja coché, on coche le premier element.
          if (radio.getAttribute("checked")) {
            radios[0].click();
          }
        };

        function updateOpacity() {
          anyChecked = false;
          radios.forEach(function (radio) {
            if (radio.checked && radio.value !== "All") {
              anyChecked = true;
            }
          });
        }
        updateOpacity();
        //
        labels.forEach(function (label) {
          label.style.opacity = anyChecked ? "0.3" : "1";
        });
        radios.forEach(function (radio) {
          if (radio.checked) {
            radio.nextElementSibling.style.opacity = "1";
            radio.nextElementSibling.style["box-shadow"] = "1px 1px 1px 1px #adadad";
          }
        });
      });
    }
  },
};
/**
 * Ajoute l'animation sur les formulaires.
 */
Drupal.behaviors.page_user = {
  attach: function (context, settings) {
    if (context.querySelectorAll && context.querySelectorAll("form.custom-form-you")) {
      const formatInputs = (fields) => {
        fields.forEach((field) => {
          // Si le champs est rempli, on masque le label
          if (field.querySelector("input").value) {
            field.querySelector("label").style.display = "none";
          }
          // si l'utilisateur clique sur le champs, on masque le label
          field.querySelector("input").addEventListener("focus", () => {
            field.querySelector("label").style.display = "none";
          });
          // si l'utilisateur quitte le champs et que le contenu est vide, on affiche le label
          field.querySelector("input").addEventListener("blur", () => {
            if (!field.querySelector("input").value) {
              field.querySelector("label").style.display = "block";
            }
          });
          //  si l'utilisateur tape quelque chose, on masque le label
          field.querySelector("input").addEventListener("keyup", () => {
            field.querySelector("label").style.display = "none";
          });
        });
      };
      once("hbk_style_form", "form.custom-form-you", context).forEach((form) => {
        const textfields = form.querySelectorAll(".form-item.form-type-textfield");
        const passwords = form.querySelectorAll(".form-item.form-type-password");
        formatInputs(textfields);
        formatInputs(passwords);
      });
    }
  },
};

(function ($) {
  $(document).ready(function () {
    $("#kictchen-collapse-button").on("click", function () {
      $(this).parent().toggleClass("active");
    });
  });
})(jQuery);