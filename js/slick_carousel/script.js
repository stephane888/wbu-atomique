import testDE from "jquery";
import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";
//const $ = window.jQuery;
//const slick = require("slick-carousel/slick/slick.js");
//window.Slick2 = slick;
import "slick-carousel";
//if (!window.jQuery == null) alert("vide");
setTimeout(function() {
  if (window.jQuery) {
    jQuery(document).ready(function($) {
      // Use $ as usual here, e.g.:
      //$(".slider-wrapper").slick();
    });
    console.log("window.jQuery : ", window.jQuery, "\n ", window.$);
    window.jQuery(".slider-wrapper").slick();
  }
}, 5000);
