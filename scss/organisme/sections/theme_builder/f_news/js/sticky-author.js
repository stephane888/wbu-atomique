function shareOnFacebook() {
  ("use-strict");

  /* Chargement du sdk */
  /* chargement du js sdk */
  (function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/fr_FR/sdk.js#xfbml=1&version=v3.0";
    fjs.parentNode.insertBefore(js, fjs);
  })(document, "script", "facebook-jssdk");
  /*  */
  function initFacebookShare() {
    if (window.FB) {
      FB.init({
        appId: "327735579426150",
        xfbml: true,
        version: "v3.0"
      });
      console.log("sdk init");
    } else {
      setTimeout(initFacebookShare, 1000);
      console.log("Le sdk js n'est pas chargé");
    }
  }
  /*  */
  function openShare(host) {
    // console.log("href:", host);
    FB.ui(
      {
        method: "share",
        href: host
      },
      function (response) {
        console.log("reponse", response);
      }
    );
  }
  /* pour fonctionner recherche un element html avec la classe "facebookShare" */
  window.addEventListener("load", () => {
    var facebookButton = document.querySelector(".facebookShare");
    if (facebookButton) {
      initFacebookShare();
      facebookButton.addEventListener("click", function (e) {
        let host = window.location.origin + window.location.pathname;
        e.preventDefault();
        openShare(host);
      });
    } else {
      console.error(
        'le bouton de partage facebook avec la classe ("facebookShare") est absent sur cette page'
      );
    }
  });
}
try {
  shareOnFacebook();
} catch (er) {
  console.error("er share : ", er);
}
