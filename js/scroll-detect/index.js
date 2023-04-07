/**
 * Permet de determiner le sens de deplacement de la bare vertical.
 */
(function () {
  "use-strict";
  var lastScrollTop = 0;
  var height = 0;
  var HT_body = 0;
  var navbarCollapse = function () {
    st = $(window).scrollTop();
    if (st > height + 1) {
      $("#container-mainmenu").addClass("site-header--pinned");
      /// place sticky element
      $(".sticky").addClass("fixed");
    } else {
      $("#container-mainmenu").removeClass("site-header--pinned");
      /// remove sticky element
      $(".sticky").removeClass("fixed");
    }
    /**/
    if (st > lastScrollTop) {
      $("#container-mainmenu").addClass("site-scroll-top");
    } else {
      $("#container-mainmenu").removeClass("site-scroll-top");
    }
    lastScrollTop = st;
  };
  navbarCollapse();
})();
