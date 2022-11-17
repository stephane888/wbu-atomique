import Glide from "@glidejs/glide";
import "@glidejs/glide/src/assets/sass/glide.core.scss";
import "@glidejs/glide/src/assets/sass/glide.theme.scss";
new Glide(".glide", {
  type: "slider",
  startAt: 0,
  perView: 2,
  gap: 30,
  autowidth: "auto",
  animationDuration: 500,
  focusAt: "center",
  animationTimingFunc: "cubic-bezier(0.165, 0.840, 0.440, 1.000)"
}).mount();
/*
{# module glidejs #}
         <div class="glide">
              <div data-glide-el="track" class="glide__track">
                   <div class="glide__slides">
                        {% for block in content.slick_carousel_img|layout_value %}
                            {% for field in block %}
                                <div class="glide__slide">
                                     {{ field }}
                                </div>
                            {% endfor %}
                        {% endfor %}
                   </div>
              </div>
         </div>
         /**/
