// function shareOnFacebook() {
//   ("use-strict");

//   /* Chargement du sdk */
//   /* chargement du js sdk */
//   (function (d, s, id) {
//     var js,
//       fjs = d.getElementsByTagName(s)[0];
//     if (d.getElementById(id)) return;
//     js = d.createElement(s);
//     js.id = id;
//     js.src = "https://connect.facebook.net/fr_FR/sdk.js#xfbml=1&version=v3.0";
//     fjs.parentNode.insertBefore(js, fjs);
//   })(document, "script", "facebook-jssdk");
//   /*  */
//   function initFacebookShare() {
//     if (window.FB) {
//       FB.init({
//         appId: "327735579426150",
//         xfbml: true,
//         version: "v3.0"
//       });
//       console.log("sdk init");
//     } else {
//       setTimeout(initFacebookShare, 1000);
//       console.log("Le sdk js n'est pas chargé");
//     }
//   }
//   /*  */
//   function openShare(host) {
//     // console.log("href:", host);
//     FB.ui(
//       {
//         method: "share",
//         href: host
//       },
//       function (response) {
//         console.log("reponse", response);
//       }
//     );
//   }
//   /* pour fonctionner recherche un element html avec la classe "facebookShare" */
//   window.addEventListener("load", () => {
//     var facebookButton = document.querySelector(".facebookShare");
//     if (facebookButton) {
//       initFacebookShare();
//       facebookButton.addEventListener("click", function (e) {
//         let host = window.location.origin + window.location.pathname;
//         e.preventDefault();
//         openShare(host);
//       });
//     } else {
//       console.error(
//         'le bouton de partage facebook avec la classe ("facebookShare") est absent sur cette page'
//       );
//     }
//   });
// }

/* Cette fonction gère la partage sur différent réseau sociaux */
(function () {
  var popupCenter = function (url, title, width, height) {
    var popupWidth = width || 640;
    var popupHeight = height || 320;
    var windowLeft = window.screenLeft || window.screenX;
    var windowTop = window.screenTop || window.screenY;
    var windowWidth = window.innerWidth || document.documentElement.clientWidth;
    var windowHeight =
      window.innerHeight || document.documentElement.clientHeight;
    var popupLeft = windowLeft + windowWidth / 2 - popupWidth / 2;
    var popupTop = windowTop + windowHeight / 2 - popupHeight / 2;
    var popup = window.open(
      url,
      title,
      "scrollbars=yes, width=" +
        popupWidth +
        ", height=" +
        popupHeight +
        ", top=" +
        popupTop +
        ", left=" +
        popupLeft
    );
    popup.focus();
    return true;
  };

  let FacebookShare = function () {
    let facebook = document.querySelector(".facebookShare");
    if (facebook) {
      facebook.addEventListener("click", function (e) {
        e.preventDefault();
        var url = window.location.origin + window.location.pathname;
        var shareUrl =
          "https://www.facebook.com/sharer/sharer.php?u=" +
          encodeURIComponent(url);
        popupCenter(shareUrl, "Partager sur facebook");
      });
    } else {
      console.error("no facebook el");
    }
  };
  let linkedinShare = function () {
    let linkedin = document.querySelector(".linkedinShare");
    if (linkedin) {
      linkedin.addEventListener("click", function (e) {
        e.preventDefault();
        var url = window.location.origin + window.location.pathname;
        var shareUrl =
          "https://www.linkedin.com/shareArticle?url=" +
          encodeURIComponent(url);
        popupCenter(shareUrl, "Partager sur linkedin");
      });
    } else {
      console.error("no linkedin el");
    }
  };

  let TwitterShare = function () {
    let twitter = document.querySelector(".twitterShare");
    if (twitter) {
      twitter.addEventListener("click", function (e) {
        e.preventDefault();
        var url = window.location.origin + window.location.pathname;
        var shareUrl =
          "https://twitter.com/intent/tweet?text=" +
          encodeURIComponent(document.title) +
          "&original_referer=" +
          encodeURIComponent(url) +
          "&url=" +
          encodeURIComponent(url);
        popupCenter(shareUrl, "Partager sur Twitter");
      });
    } else {
      console.error("no twitter el ");
    }
  };
  let EmailShare = function () {
    let emailShare = document.querySelector(".emailShare");
    if (emailShare) {
      let url = window.location.origin + window.location.pathname;
      let shareUrl = "mailto:?body=" + encodeURIComponent(url);
      emailShare.setAttribute("href", shareUrl);
    } else {
      console.error("no Email el ");
    }
  };
  let PrintButton = function () {
    let print = document.querySelector(".printButton");
    if (print) {
      print.addEventListener("click", function (e) {
        e.preventDefault();
        window.print();
      });
    } else {
      console.error("no print el");
    }
  };
  /* execution */
  FacebookShare();
  linkedinShare();
  TwitterShare();
  EmailShare();
  PrintButton();
})();
