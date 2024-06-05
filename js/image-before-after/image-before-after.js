//import $ from "jquery";
//à remplacer car utiliser jquery 
// import "zurb-twentytwenty/js/jquery.event.move.js";
// import "zurb-twentytwenty/js/jquery.twentytwenty.js";
import "bootstrap/js/src/tab.js";

if (window.jQuery) {
  var $ = window.jQuery;
  $(document).ready(function () {
    //add src
    document.querySelectorAll(".zurb-twentytwenty img").forEach((item) => {
      item.src = item.getAttribute("data-src");
    });
    setTimeout(() => {
      (function () {
        console.log("zurb-twentytwenty");
        $(".zurb-twentytwenty").twentytwenty({
          default_offset_pct: 0.5, // How much of the before image is visible when the page loads
          //orientation: "vertical", // Orientation of the before and after images ('horizontal' or 'vertical')
          //before_label: "January 2017", // Set a custom before label
          //after_label: "March 2017", // Set a custom after label
          no_overlay: true, //Do not show the overlay with before and after
          //move_slider_on_hover: true, // Move slider on mouse hover?
          //move_with_handle_only: true, // Allow a user to swipe anywhere on the image to control slider movement.
          //click_to_move: true // Allow a user to click (or tap) anywhere on the image to move the slider to that location.
        });
      })();
    }, 2000);
    //**************
    // Selection de la vue au click.
    //***************
    (function () {
      //
      $(" .main-twentytwenty .buttons .after-before ").addClass("active");
      //
      $(" .main-twentytwenty .buttons ").on("click", ".seeMore", function () {
        // console.log($(this));
        $(" .main-twentytwenty .buttons .seeMore ").removeClass("active");
        $(this).addClass("active");
        // *****************
        // Tabs
        // ******************
        var idTab = $(this).attr("data-tab");
        console.log("idTab : ", idTab);
        $(".main-twentytwenty .tab-content .tab-pane").removeClass(
          "show active"
        );
        $(idTab).addClass("show active");
      });
      //
    })();
  });
}
