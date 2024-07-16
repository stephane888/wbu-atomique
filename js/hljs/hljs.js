/**
 *  Permet de charger de maniere asynchone hljs.
 *  import hljs from "highlight.js";
 *  https://github.com/highlightjs/highlight.js?tab=readme-ov-file#nodejs--require
 *  Il faudra essayer de charger via les CDNs.
 */
// import hljs from "highlight.js";
/**
 * --
 */
class ManageHljs {
  constructor(hauteur, largeur) {
    this.hauteur = hauteur;
    this.largeur = largeur;
  }

  /**
   * --
   * @param {*} src
   * @returns
   */
  loadstyle(src) {
    return new Promise((resolv) => {
      var s = document.createElement("link");
      s.setAttribute("rel", "stylesheet");
      s.setAttribute("href", src);
      s.onload = function () {
        //console.log("Chargement du Style ok : ", src);
        resolv(true);
      };
      document.head.appendChild(s);
    });
  }

  /**
   * --
   * @param {*} src
   * @returns
   */
  loadScript(src) {
    return new Promise((resolv) => {
      var s = document.createElement("script");
      s.setAttribute("src", src);
      s.onload = function () {
        // console.log(" Chargement du script ok : ", src);
        resolv(true);
      };
      document.head.appendChild(s);
    });
  }

  initHljs() {
    const urlJs = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js";
    const urlCss = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css";
    const themeJS = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/go.min.js";
    // const themeCss = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/base16/google-dark.min.css";
    const themeCss = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css";
    // const themeCss = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/monokai.min.css";
    setTimeout(() => {
      this.loadScript(urlJs).then(() => {
        this.loadstyle(urlCss).then(() => {
          this.loadScript(themeJS).then(() => {
            this.loadstyle(themeCss);
            window.hljs.highlightAll();
          });
        });
      });
    }, 2000);
  }
}
const ManHljs = new ManageHljs();
ManHljs.initHljs();
