class ManageLoginFacebook {
  constructor(FB) {
    this.FB = FB;
  }
  /**
   * on verifie si la personne est déja connecté à l'application
   */
  CheckStatusLogin() {
    if (this.FB)
      this.FB.getLoginStatus((response) => {
        console.log("check statut of connection");
        console.log(response);
        if (response.status == "connected") {
          console.log("user is connected");
          //LogoutByFB();createusersilence/create-login-user-ajax
          getdatsForUser();
        } else {
          this.LoginByFB();
        }
      });
    else {
      console.log("Erreur d'initialisation de FB");
    }
  }

  /**
   * on lance la boite de login
   */
  LoginByFB() {
    this.FB.login(
      function (response) {
        //console.log('appel de la function FB.login 1');
        //console.log(response);
        if (response.authResponse) {
          console.log("Welcome!  Fetching your information.... ");
          console.log(response);
          this.getdatsForUser();
        } else {
          console.log("User cancelled login or did not fully authorize.");
        }
      },
      { scope: "public_profile,email" }
    );
  }
  /**
   *  recuperation des données de l'utilisateur
   *  https://developers.facebook.com/docs/graph-api/reference/user/
   */
  getdatsForUser() {
    const FB = this.FB;
    console.log("infos users");
    //  gender, name, verified, name_format, hometown, address, age_range, birthday, cover, currency, devices, education, email, employee_number
    FB.api(
      "/me",
      "GET",
      {
        fields: "first_name,last_name,gender,name,email,verified,name_format,picture,hometown,address,age_range,birthday,cover",
      },
      (response) => {
        console.log("Get data from user");
        var datas = "";
        if (response.id) {
          response["plateforme"] = "facebook";
          datas = JSON.stringify(response);
          console.log(" Infos de L'utilisateur : ", response);
          this.postDatas("/rxlogin/identification", datas, false);
        } else {
          console.log(response);
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
      console.log(" liste de permission ");
      console.log(response);
    });
  }
  /**
   * Post data
   */
  postDatas(url, datas, reload) {
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
}

export default ManageLoginFacebook;
