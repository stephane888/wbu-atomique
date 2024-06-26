/**
 *  Permet de charger de maniere asynchone hljs.
 *  import hljs from "highlight.js";
 *  https://github.com/highlightjs/highlight.js?tab=readme-ov-file#nodejs--require
 *  Il faudra essayer de charger via les CDNs.
 */
import hljs from "highlight.js";
class Rectangle {
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
        console.log("Chargement du Style ok : ", src);
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
        console.log(" Chargement du script ok : ", src);
        resolv(true);
      };
      document.head.appendChild(s);
    });
  }
}
