import Glider from "glider-js";
import "glider-js/glider.css";
new Glider(document.querySelector(".glider"), {
  slidesToShow: "auto",
  slidesToScroll: "auto",
  draggable: true,
  itemWidth: 600,
  exactWidth: 600,
  duration: 0.25,
  dots: ".dots",
  arrows: {
    prev: ".glider-prev",
    next: ".glider-next"
  }
});

/**

{# module glider-js #}
         <div class="glider-contain">
              <div class="glider">
                   {% for block in content.slick_carousel_img|layout_value %}
                       {% for field in block %}
                           <div class="glide__slide">
                                {{ field }}
                           </div>
                       {% endfor %}
                   {% endfor %}
              </div>
              <button aria-label="Previous" class="glider-prev">«</button>
              <button aria-label="Next" class="glider-next">»</button>
              <div role="tablist" class="dots"></div>
         </div>
         /**/
