/**
 * - https://developers.facebook.com/tools/debug/
 */
(function (Drupal) {
  //
  /**
   * --
   */
  Drupal.behaviors.habeuk_utilitaire = {
    attach: function (context, settings) {
      //on lit les
      once("habeuk_utilitaire--sharerx-entities", ".sharerx-entities", context).forEach(function (sharerx) {
        const config = settings.habeuk_utilitaire;
        // Les données proviennent de metatag.
        const site_name = document.querySelector('meta[property="og:site_name"]') ? document.querySelector('meta[property="og:site_name"]').content : null;
        if (!site_name) console.log("Metatag : Propertie og:site_name not set");
        const type = document.querySelector('meta[property="og:type"]') ? document.querySelector('meta[property="og:type"]').content : null;
        if (!type) console.log("Metatag : Propertie og:type not set");
        const url = document.querySelector('meta[property="og:url"]') ? document.querySelector('meta[property="og:url"]').content : null;
        if (!url) console.log("Metatag : Propertie og:url not set");
        const title = document.querySelector('meta[property="og:title"]') ? document.querySelector('meta[property="og:title"]').content : null;
        if (!title) console.log("Metatag : Propertie og:title not set");
        const description = document.querySelector('meta[property="og:description"]') ? document.querySelector('meta[property="og:description"]').content : null;
        if (!description) console.log("Metatag : Propertie og:description not set");
        const image_url = document.querySelector('meta[property="og:image:url"]') ? document.querySelector('meta[property="og:image:url"]').content : null;
        if (!image_url) console.log("Metatag : Propertie og:image:url not set");
        //
        var popupCenter = function (url, title, width, height) {
          var popupWidth = width || 640;
          var popupHeight = height || 320;
          var windowLeft = window.screenLeft || window.screenX;
          var windowTop = window.screenTop || window.screenY;
          var windowWidth = window.innerWidth || document.documentElement.clientWidth;
          var windowHeight = window.innerHeight || document.documentElement.clientHeight;
          var popupLeft = windowLeft + windowWidth / 2 - popupWidth / 2;
          var popupTop = windowTop + windowHeight / 2 - popupHeight / 2;
          var popup = window.open(url, title, "scrollbars=yes, width=" + popupWidth + ", height=" + popupHeight + ", top=" + popupTop + ", left=" + popupLeft);
          popup.focus();
          return true;
        };
        //
        if (config) {
          console.log(" enter config ");
          // facebook.
          function shareFaceBook(url) {
            FB.ui(
              {
                method: "share",
                href: url,
              },
              function (response) {
                if (response && !response.error_message) {
                  //console.log('Posting completed.');
                } else {
                  console.log("Error while posting.");
                  console.log(response);
                }
              }
            );
          }
          if (window.FB) {
            console.log("run : window.FB ", window.FB);
            sharerx.querySelector(".habeukUtilitaireRxFacebook").addEventListener("click", () => {
              shareFaceBook(url);
            });
          } else {
            console.log(" Wait event : window.FB ", window.FB);
            // Cet event "hbk_fbInit" est declenché de maniere personnalisé apres le chargement du SDK.
            document.addEventListener("hbk_fbInit", () => {
              sharerx.querySelector(".habeukUtilitaireRxFacebook").addEventListener("click", () => {
                shareFaceBook(url);
              });
            });
          }
          //
          const TwitterShare = function () {
            sharerx.querySelector(".habeukUtilitaireRxTwitter").addEventListener("click", () => {
              let shareUrl = "https://x.com//intent/tweet?text=" + encodeURIComponent(title) + "&original_referer=" + encodeURIComponent(url) + "&url=" + encodeURIComponent(url);
              popupCenter(shareUrl, "Partager sur Twitter");
            });
          };
          //
          const EmailShare = function () {
            let shareUrl = "mailto:?body=" + encodeURIComponent(url);
            sharerx.querySelector(".habeukUtilitaireRxEmail").setAttribute("href", shareUrl);
          };
          //
          const PrintButton = function () {
            sharerx.querySelector(".habeukUtilitaireRxPrint").addEventListener("click", () => {
              window.print();
            });
          };
          // RUN
          TwitterShare();
          EmailShare();
          PrintButton();
        }
      });
    },
  };
})(Drupal);
