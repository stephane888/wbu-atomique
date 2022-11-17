import $ from "jquery";
//window.$ = window.jQuery = $;
import "slick-carousel";

if (window.jQuery) {
  //var $ = (window.$ = window.jQuery);
  //var slick = window.Slick;

  //console.log(slick);
  //code pour le paramétrage de twoblockCarousel.scss
  jQuery(document).ready(function($) {
    $(".galeryImage .small__voirPlus").click(function() {
      $(".stanCaroussel").toggleClass("open");
    });
    $(".stanCaroussel .close").click(function() {
      $(".stanCaroussel").toggleClass("open");
    });
  });
  $(document).ready(function() {
    $(".bigImage").slick({
      dots: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      bigImage: true,
      fade: true,
      centerMode: true,
      asNavFor: ".smallCarousel,.smallCarousell",
      accessibility: true,
      nextArrow: '<div class="stan-next">Next</div>',
      prevArrow: '<div class="stan-prev">prev</div>',
      infinite: false,
      autoplay: false,
      responsive: [
        {
          breakpoint: 769,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 2000
          }
        }
      ]
    });
  });

  $(".smallCarousel").slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    centerPadding: "81px",
    asNavFor: ".bigImage,.smallCarousell",
    dots: false,
    arrows: false,
    centerMode: true,
    focusOnSelect: true,
    accessibility: false,
    infinite: true,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2,
          centerPadding: "40px",
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 990,
        settings: {
          centerPadding: "60px"
        }
      },
      {
        breakpoint: 850,
        settings: {
          centerPadding: "50px"
        }
      }
    ]
  });

  $(".smallCarousell").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    centerPadding: "0px",
    draggable: false,
    dots: false,
    arrows: false,
    centerMode: true,
    focusOnSelect: true,
    accessibility: false,
    infinite: false,
    asNavFor: ".bigImage",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          centerPadding: "-40px",
          slidesToScroll: 1,
          infinite: false
        }
      },
      {
        breakpoint: 990,
        settings: {
          centerPadding: "-60px"
        }
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 1,
          centerPadding: "-20px"
        }
      }
    ]
  });

  $(".bigImage").on("init", function(event, slick, currentSlide, nextSlide) {
    var num = slick.slideOffset + 1;
    var total = slick.slideCount;
    document.getElementById("num").innerHTML = num;
    document.getElementById("total").innerHTML = total;
  });
  $(".bigImage").on("beforeChange", function(
    event,
    slick,
    currentSlide,
    nextSlide
  ) {
    if (slick.$nextArrow) {
      var num = nextSlide + 1;
    } else if (slick.$prevArrow) {
      var num = currentSlide - 1;
    } else {
      var num = currentSlide + 1;
    }
    document.getElementById("num").innerHTML = num;
  });
} else {
  console.log("La bibiotheque Jquery est requise");
}
