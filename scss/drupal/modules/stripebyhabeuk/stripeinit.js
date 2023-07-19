// Initialize Stripe.js using your publishable key
/**
 * @See https://stripe.com/docs/js
 */
if (window.Stripe) {
  (function ($, Drupal) {
    function init(context, settings) {
      const configs = settings.stripebyhabeuk;
      once("stripebyhabeuk_add_cart", "#" + configs.idhtml, context).forEach(
        (item) => {
          console.log("put cart form heriitem", item, "\n configs ", configs);
          const stripe = window.Stripe(configs.publishableKey);
          //on verifie que l'intention de payer a été creer par la serveur.
          stripe
            .retrievePaymentIntent(configs.paymentindent_client_secret)
            .then((paymentIntent) => {
              console.log("paymentIntent : ", paymentIntent);
              const options = {
                clientSecret: configs.paymentindent_client_secret,
                appearance: {},
                theme: "stripe",
              };
              // Set up Stripe.js and Elements to use in checkout form, passing the client secret obtained in step 2
              const elements = stripe.elements(options);
              // Create and mount the Payment Element
              //const paymentElement = elements.create("payment");
              const cardElement = elements.create("card");
              cardElement.mount(item);
              // Get tag form container.( Cela implique que les champs de recuperation des informations de la carte soit toujours dans un form. )
              const form = item.closest("form");
              if (form) {
                console.log("test 128");
                form.addEventListener("submit", async (event) => {
                  if (
                    form.getElementById("payment-method-id" + configs.idhtml)
                      .value.length > 0
                  ) {
                    return true;
                  }
                  event.preventDefault();
                  /**
                   * https://stripe.com/docs/api/payment_methods/create
                   */
                  stripe
                    .createPaymentMethod({
                      type: "card",
                      card: cardElement,
                    })
                    .then(({ paymentMethod, error }) => {
                      // Handle result.error or result.paymentMethod
                      if (paymentMethod) {
                        console.log("paymentMethod : ", paymentMethod);
                        form.getElementById(
                          "payment-method-id" + configs.idhtml
                        ).value = paymentMethod.id;
                        // Submit the form.
                        form
                          .querySelector('input.button--primary[name="op"]')
                          .click();
                      } else if (error) {
                        console.log("error : ", error);
                      }
                    });

                  // Pour la confirmation, on doit le faire au niveau du serveur.
                  // stripe
                  //   .confirmCardSetup(configs.paymentindent_client_secret, {
                  //     payment_method: {
                  //       card: paymentElement,
                  //     },
                  //   })
                  //   .then(({ error, setupIntent }) => {
                  //     if (setupIntent) {
                  //       console.log(" Pass to next step : ", setupIntent);
                  //     } else {
                  //       console.log(" Error : ", error);
                  //     }
                  //   })
                  //   .catch((error) => {
                  //     console.log(" Error catch : ", error);
                  //   });
                });
              }
            })
            .catch((error) => {
              console.log(" Error in paymentIntent : ", error);
            });
        }
      );
    }
    /**
     * --
     */
    Drupal.behaviors.stripebyhabeuk = {
      attach: function (context, settings) {
        init(context, settings);
      },
    };
  })(jQuery, Drupal);
}
