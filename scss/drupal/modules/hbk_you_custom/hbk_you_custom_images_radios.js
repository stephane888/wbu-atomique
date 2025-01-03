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
