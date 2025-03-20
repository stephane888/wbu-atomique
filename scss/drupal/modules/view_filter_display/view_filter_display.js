(function (Drupal, once) {
  Drupal.behaviors.view_filter_display_default_sort_filter = {
    attach: function (context) {
      if (context.querySelectorAll && context.querySelectorAll(".view_filter_display.sort").length) {
        once("view_filter_display_sort", ".view_filter_display.sort, .view_filter_display.filter", context).forEach((element) => {
          element.querySelector(".icon-fill ").addEventListener("click", () => {
            element.querySelector(".form__filtsort").classList.toggle("open");
          });
        });
      }
    },
  };
})(window.Drupal, window.once);
