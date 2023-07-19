// Cette fonction a été deplacer ici: modules/custom/layoutscommerce/js/layoutscommerce-add-to-cart.js
// en attendant une correction de :: Uncaught ReferenceError: once is not defined
// @see https://git.drupalcode.org/project/drupal/-/blob/9.4.x/core/themes/claro/claro.libraries.yml#L213
// @see use-ajax link => https://drupaloutsourcing.com/blog/ajax-api-creating-custom-ajax-command-drupal-8
// autre expiration => https://drupal.stackexchange.com/questions/121361/use-ajax-class-for-ajax-link-not-working-in-dynamic-content-load
(function ($, Drupal) {
  var httpRequest;

  /**
   * Cette fonction require core/drupal.ajax
   * ( cela est deja acivé dans le module commerceformatage,
   * si vous decidez de l'utiliser ailleurs rassurer vus que la libraie core/drupal.ajax est presente ).
   * @param {*} context : le conexte n'est pas forcement necessaire, mais le devien apres la MAJ du panier via ajax.
   */
  function reloadBloc(context = null) {
    console.log("relaodBlock ", context);
    const item = document.querySelector(
      ".commerceformatage_cart_habeuk_click.use-ajax"
    );
    item.click();
    // once n'est pas adapté, lorsqu'on soihaite cliquer plusieurs fois.
    // if (context)
    //   once(
    //     "commerceformatage",
    //     ".commerceformatage_cart_habeuk_click.use-ajax",
    //     context
    //   ).forEach((item) => {
    //     item.click();
    //     console.log("JS trigger reload button");
    //   });
    // else {
    //   console.log(
    //     "find element : ",
    //     document.querySelector(".commerceformatage_cart_habeuk_click.use-ajax")
    //   );
    //   console.log(
    //     "ONCE find elemnt click : ",
    //     once(
    //       "commerceformatage",
    //       ".commerceformatage_cart_habeuk_click.use-ajax"
    //     )
    //   );
    //   once(
    //     "commerceformatage",
    //     ".commerceformatage_cart_habeuk_click.use-ajax"
    //   ).forEach((item) => {
    //     item.click();
    //     console.log("JS trigger reload button");
    //   });
    //}
  }

  function ManageCover(action, context) {
    var div;
    if (action) {
      div = document.createElement("div");
      div.classList.add("commerceformatage_cart_habeuk_cover");
      document.body.appendChild(div);
      div.addEventListener("click", () => {
        openCartPopup(false, context);
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
  function openCartPopup(open, context = null) {
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
            //alert(" Il y a eu un problème avec la requête. ");
            console.log("error in request ", httpRequest);
          }
        }
      };
      httpRequest.open("post", "/cart/add?_format=json");
      httpRequest.setRequestHeader("Content-Type", "application/json");
      httpRequest.send(JSON.stringify(cartItem));
    });
  }

  function removeItem(orderId, itemId) {
    return new Promise((resolv, reject) => {
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
            console.log();
            reject(false);
          }
        }
      };
      httpRequest.open(
        "get",
        "/commerceformatage/remove-product/" + orderId + "/" + itemId
      );
      httpRequest.setRequestHeader("Content-Type", "application/json");
      httpRequest.send();
    });
  }

  /**
   * --
   * @param {*} context
   */
  function initAddTocart(context) {
    once(
      "commerceformatage",
      ".commerceformatage-button-add-to-cart",
      context
    ).forEach((item) => {
      item.addEventListener("click", (event) => {
        event.preventDefault();
        item.querySelector(".loading").classList.add("fa-spin");
        item.querySelector(".loading").classList.remove("d-none");
        item.disabled = true;
        const form = item.closest("form");
        var cartItem = false;
        if (form) {
          const formData = new FormData(form);
          const formProps = Object.fromEntries(formData);
          cartItem = [
            {
              purchased_entity_type: "commerce_product_variation",
              purchased_entity_id: formProps.commerce_product_variation_id,
              quantity: 1,
              combine: true,
            },
          ];
        } else {
          var id = item.getAttribute("data-procuct-variant-id");
          let qte = item.getAttribute("data-qty");
          console.log(".. qte :", qte);
          if (!qte || qte === undefined) {
            qte = 1;
          } else {
            qte = parseInt(qte);
          }

          if (id && qte) {
            cartItem = [
              {
                purchased_entity_type: "commerce_product_variation",
                purchased_entity_id: id,
                quantity: qte,
                combine: true,
              },
            ];
          }
        }

        if (cartItem)
          makeRequest(cartItem).then(() => {
            openCartPopup(true, context);
            ManageCover(true, context);
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
      once(
        "commerceformatage",
        ".commerceformatage_cart_habeuk_close",
        context
      ).forEach((item) => {
        item.addEventListener("click", () => {
          openCartPopup(false, context);
          ManageCover(false, context);
        });
      });
    }
  }

  // open cart popup
  function initOpenCart(context) {
    var cl =
      context && context.querySelector
        ? context.querySelector(".commerceformatage_cart_habeuk_open")
        : null;
    if (cl) {
      once(
        "commerceformatage",
        ".commerceformatage_cart_habeuk_open",
        context
      ).forEach((item) => {
        item.addEventListener("click", () => {
          openCartPopup(true, context);
          ManageCover(true, context);
          console.log("initOpenCart");
        });
      });
    }
  }

  // Remove items to cart
  function initRemoveItems(context) {
    var cl =
      context && context.querySelectorAll
        ? context.querySelectorAll(".commerceformatage_cart_habeuk_remove")
        : null;
    if (cl) {
      once(
        "commerceformatage",
        ".commerceformatage_cart_habeuk_remove",
        context
      ).forEach((item) => {
        item.addEventListener("click", () => {
          removeItem(
            item.getAttribute("data-order-id"),
            item.getAttribute("data-cart-id")
          ).then(() => {
            reloadBloc(context);
          });
        });
      });
    }
  }

  /**
   * --
   */
  Drupal.behaviors.commerceformatage = {
    attach: function (context, settings) {
      initAddTocart(context);
      initCloseCary(context);
      initOpenCart(context);
      initRemoveItems(context);
    },
  };
})(jQuery, Drupal);
