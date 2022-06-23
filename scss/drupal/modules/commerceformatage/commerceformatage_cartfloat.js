(function ($, Drupal) {
  var httpRequest;

  function reloadBloc() {
    document.querySelector(".commerceformatage_cart_habeuk_click").click();
  }

  function ManageCover(action = true) {
    var div;
    if (action) {
      div = document.createElement("div");
      div.classList.add("commerceformatage_cart_habeuk_cover");
      document.body.appendChild(div);
      div.addEventListener("click", () => {
        console.log("close pop-up");
        openCartPopup(false);
        div.remove();
      });
    } else {
      div = document.querySelector(".commerceformatage_cart_habeuk_cover");
      if (div) div.remove();
    }
  }

  /**
   * Ouvre le popup
   * @param {*} open
   */
  function openCartPopup(open = true) {
    if (open) {
      document
        .querySelector(".commerceformatage_cart_habeuk")
        .classList.add("show");
      reloadBloc();
    } else
      document
        .querySelector(".commerceformatage_cart_habeuk")
        .classList.remove("show");
  }
  /**
   * --
   * @returns
   */
  function makeRequest(cartItem) {
    return new Promise((resolv) => {
      httpRequest = new XMLHttpRequest();
      if (!httpRequest) {
        alert(
          "Svp, veillez mettre à jour votre navigateur ou contactez notre support technique"
        );
        return false;
      }
      httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
          if (httpRequest.status === 200) {
            resolv(true);
          } else {
            alert(" Il y a eu un problème avec la requête. ");
          }
        }
      };
      httpRequest.open("post", "/cart/add?_format=json");
      httpRequest.setRequestHeader("Content-Type", "application/json");
      httpRequest.send(JSON.stringify(cartItem));
    });
  }

  /**
   * --
   * @param {*} context
   */
  function initAddTocart(context) {
    context
      .querySelectorAll(".commerceformatage-button-add-to-cart")
      .forEach((item) => {
        console.log(" item : ", item);
        item.addEventListener("click", (event) => {
          event.preventDefault();
          item.querySelector(".loading").classList.add("fa-spin");
          item.querySelector(".loading").classList.remove("d-none");
          item.disabled = true;
          const form = item.closest("form");
          const formData = new FormData(form);
          const formProps = Object.fromEntries(formData);
          const cartItem = [
            {
              purchased_entity_type: "commerce_product_variation",
              purchased_entity_id: formProps.commerce_product_variation_id,
              quantity: 1,
              combine: true,
            },
          ];
          makeRequest(cartItem).then(() => {
            openCartPopup();
            ManageCover();
            item.querySelector(".loading").classList.remove("fa-spin");
            item.querySelector(".loading").classList.add("d-none");
            item.disabled = false;
          });
          //
        });
      });
  }
  // Close cart popup
  function initCloseCary(context) {
    var cl =
      context && context.querySelector
        ? context.querySelector(".commerceformatage_cart_habeuk_close")
        : null;
    if (cl) {
      cl.addEventListener("click", () => {
        openCartPopup(false);
        ManageCover(false);
      });
      //
    }
  }

  /**
   *
   */
  Drupal.behaviors.commerceformatage = {
    attach: function (context, settings) {
      initAddTocart(context);
      initCloseCary(context);
    },
  };
})(jQuery, Drupal);
