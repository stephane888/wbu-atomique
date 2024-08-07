jQuery(document).ready(function ($) {
  jQuery(document).bind("fb_Init2", function () {
    console.log("Facebook api is loaded test ");
  });
  $(document).trigger("fb_Init2");
  /**
   * Display bouton to share
   * https://ogp.me/
   * https://stackoverflow.com/questions/19778620/provide-an-image-for-whatsapp-link-sharing
   * https://stackoverflow.com/questions/25100917/showing-thumbnail-for-link-in-whatsapp-ogimage-meta-tag-doesnt-work/39182227#39182227
   * https://amprandom.blogspot.com/2016/12/blogger-whatsapp-rich-link-preview.html
   * https://api.whatsapp.com/send?phone=23796436433&text=&source=&data=
   * https://web.whatsapp.com/send?phone=23796436433&text=bjr&source=&data=
   * https://api.whatsapp.com/send?phone=23796436433&text=https://appart-logement.com/fr/appartement/tam-tam-weekend/appartement-louer
   * https://forum.webflow.com/t/dynamic-share-buttons-for-different-social-media/30991
   *
   * https://drupal.stackexchange.com/questions/185494/user-login-rest-format
   *
   */
  (function () {
    var rx = {
      facebook: true,
      tweet: true,
      google: true,
      whatsapp: true,
    };
    if ($(".socialmediaicons").length > 0) {
      var html = "";
      var href = $("main article.full-wb_universe").attr("data-history-node-id");
      var title = $("head title").html();
      var description = $('meta[property="og:description"]').attr("content");
      var img = $('meta[property="og:image"]').attr("content");
      href = window.location.protocol + "://" + window.location.host + "/node/" + href;
      $.each(rx, function (i, f) {
        if (f && i == "facebook") {
          html += '<a class="fb-share fab fa-facebook-f" data-href="' + href + '"><span>Partage</span></a>';
        } else if (f && i == "whatsapp") {
          // support https://faq.whatsapp.com/fr/android/26000030/
          // https://forum.webflow.com/t/dynamic-page-sharing-on-whatsapp/31465
          // "\r\n\r\n"
          /**
           * Custom for appart-logement
           */
          var price = $("header.container-header .price").text();
          //console.log(price);
          var price = price
            .replace(/(\r\n|\n|\r)/gm, "")
            .replace(/ +(?= )/g, "")
            .trim();
          var texte = "*" + title.toUpperCase() + "*";
          texte += "\r\n\r\n";
          texte += description;
          texte += "\r\n\r\n";
          if (price) {
            texte += "*Prix : " + price + "*";
            texte += "\r\n\r\n";
          }
          texte += "Publier vos annonces sur *appart-logement.com*";
          texte += "\r\n";
          texte += "Lire la suite : ";
          //texte += "\r\n";
          texte += href;
          html += '<a class="fb-whatsapp fab fa-whatsapp" href="whatsapp://send?text=' + encodeURIComponent(texte) + "&source=" + href + '"><span>Partage</span></a>';
        }
      });
      $(".socialmediaicons").html(html);
    }
  })();
  /**
   * Facebook
   *
   */
  (function () {
    // ** wait facebook initialise
    jQuery(document).bind("fbInit", function () {
      console.log("Facebook api is loaded");
      /**
       * 	share on facebook
       */
      function shareFaceBook(url) {
        FB.ui(
          {
            method: "share",
            //display: 'iframe',
            href: url,
          }, // callback
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
      $(" .fb-share ").click(function () {
        shareFaceBook($(this).attr("data-href"));
      });

      /**
       * count number share facebook
       * https://developers.facebook.com/docs/graph-api/reference/v3.3/url
       * https://developers.facebook.com/docs/facebook-login/permissions/overview/
       * https://developers.facebook.com/docs/apps/review
       *
       */
      (function () {
        // console.log(' Face Count ');
        FB.api(
          "/",
          {
            id: "http://drupal-wb_universe.kksa/page-de-base/apporteur-daffaire-commercial-independant",
          },
          function (response) {
            if (response && !response.error) {
              //console.log('OK');
              //console.log(response);
            } else {
              console.log("error");
              console.log(response);
            }
          }
        );
      })();

      /**
       *  inscription et connection via facabook
       */
      (function () {
        // on verifie si la personne est déja connecté à l'application
        function CheckStatusLogin() {
          FB.getLoginStatus(function (response) {
            //console.log('check statut of connection');
            //console.log(response);
            //statusChangeCallback(response);
            if (response.status == "connected") {
              console.log("user is connected");
              //LogoutByFB();createusersilence/create-login-user-ajax
              getdatsForUser();
            } else {
              LoginByFB();
            }
          });
        }
        /**
         * on lance la boite de login
         */
        function LoginByFB() {
          //console.log('LoginByFB');
          FB.login(
            function (response) {
              // console.log('appel de la function FB.login 1');
              // console.log(response);
              if (response.authResponse) {
                console.log("Welcome!  Fetching your information.... ");
                console.log(response);
                getdatsForUser();
              } else {
                console.log("User cancelled login or did not fully authorize.");
              }
            },
            { scope: "public_profile,email" }
          );
        }
        /**
         * deconnecyion de facebook
         */
        function LogoutByFB() {
          FB.logout(function (response) {
            console.log("deconnexion de app");
          });
        }
        $(".rxconnexion.facebook").click(function () {
          $("i", this).removeClass("d-none");
          // console.log('Retour du stutus de connection : '+ CheckStatusLogin());
          // if( CheckStatusLogin() != "connected"){LoginByFB();}else{LogoutByFB();}
          // tout ce qui est la dessus na pas d'importance car javascript s'execute en bulk et non en sequentiel.
          // donc on appelle les fonction dans les autres.
          CheckStatusLogin();
        });
        //
        $(".btnUserFacebook").click(function () {
          getdatsForUser();
        });
        /**
         *  recuperation des données de l'utilisateur
         *  https://developers.facebook.com/docs/graph-api/reference/user/
         */
        function getdatsForUser() {
          console.log("infos users");
          //  gender, name, verified, name_format, hometown, address, age_range, birthday, cover, currency, devices, education, email, employee_number
          FB.api(
            "/me",
            "GET",
            {
              fields: "first_name,last_name,gender,name,email,verified,name_format,picture,hometown,address,age_range,birthday,cover",
            },
            function (response) {
              console.log("Get data from user");
              var datas = "";
              if (response.id) {
                response["plateforme"] = "facebook";
                datas = JSON.stringify(response);
                console.log(" Infos de L'utilisateur : ", response);
                postDatas("/rxlogin/identification", datas, false);
              } else {
                console.log(response);
                LogoutByFB();
                alert("impossible de se connecter Via Facebook");
              }

              /**
               * Load large image for user
               */
              FB.api(
                "/me/picture", ///  /me or user-id
                "GET",
                { redirect: "false", type: "large" },
                function (pictureUser) {
                  console.log("Get Large Picture from user");
                  console.log(pictureUser);
                }
              );
            }
          );

          // get
          FB.api("/me/permissions", function (response) {
            //console.log(' liste de permission ');
            //console.log(response);
          });
        }
      });
    })();
    /**
     * Initialise API
     */
    (function () {
      /**
       * Initialisation de faceBook
       */
      window.fbAsyncInit = function () {
        FB.init({
          appId: "640972499722140",
          autoLogAppEvents: true,
          xfbml: true,
          version: "v4.0",
        });
        //  ***  Permet de detecter le chargement complet de fb.init via jquery
        $(document).trigger("fbInit"); // trigger event
      };
      (function (d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/fr_FR/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");
    })();
  });
  /**
   * Post data
   */
  function postDatas(url, datas, reload) {
    var reponse = "";
    $.ajax({
      url: url,
      data: datas,
      method: "POST",
      dataType: "json",
      async: false,
      success: function (data) {
        reponse = data;
        console.log(data);
        if (data.url) {
          $.each(data.url, function (rx, href) {
            $(".rxconnexion." + rx).attr("href", href);
          });
          return false;
        }
        if (data.connected) {
          if (data.redirect == "") {
            location.reload();
          } else {
            window.location = "/immo-gestion/users/infos/create";
          }
        }
      },
      error: function (errormessage) {
        console.log(errormessage);
      },
      complete: function () {
        console.log("exécution complete avec succes");
        //if( reload ){ location.reload(); }
      },
    });
    return reponse;
  }
  reponse = JSON.stringify({});
  postDatas("/rxlogin/loginurl", reponse, false);
  /**
      *
     $('footer .widget-title').click(function(){
    	 var reponse = {
    			first_name: "Stephane kks6",
    			id: "2177680055674478-6",
    			last_name: "Kouwa",
    			name: "Stephane Armand Kouwa",
    			name_format: "{first} {last}",
    			email:"kkshuehhd@fjkd6.com",
    			picture: {
    				data :{
    					height: 50,
    					is_silhouette: false,
    					url: "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=2177680055674478&height=50&width=50&ext=1570265064&hash=AeT1VYyi7RV_Q99Y",
    					width: 50,
    				}
    			   }
    			}
    	 reponse['plateforme']='facebook';
    	reponse = JSON.stringify(reponse);
    	postDatas('/rxlogin/identification', reponse, false);

     });
     */
});

/*
 *
 */
