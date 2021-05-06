import "font-awesome/css/font-awesome.min.css";
//import "../scss/atome/typography/_default.scss";
//import "../scss/molecule/stan/projectHero-module.scss";
// import "../scss/molecule/stan/ourAchievments-module.scss";
import "../scss/molecule/stan/serviceBlock-module.scss";
// import "../scss/atome/stan/seeMore.scss";
//import "../scss/molecule/stan/reinsuranceItem.scss";
//import "../scss/molecule/stan/reinsuranceBlock.scss";
// import "../scss/molecule/stan/billetDeBlogTeaser.scss";
// import "../scss/molecule/stan/paragraphList.scss";
import "../scss/molecule/stan/pushNewsletter.scss";
import "../scss/molecule/stan/twoBlockCarousel.scss";
//import "../scss/molecule/stan/galeryImage.scss";
import "../scss/molecule/stan/galeryTitle.scss";
import "../scss/molecule/stan/projectSummary.scss";

//code pour le paramétrage de twoblockCarousel.scss
$(document).ready(function () {
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
          autoplaySpeed: 2000,
        },
      },
    ],
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
        dots: false,
      },
    },
    {
      breakpoint: 990,
      settings: {
        centerPadding: "60px",
      },
    },
    {
      breakpoint: 850,
      settings: {
        centerPadding: "50px",
      },
    },
  ],
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
        infinite: false,
      },
    },
    {
      breakpoint: 990,
      settings: {
        centerPadding: "-60px",
      },
    },
    {
      breakpoint: 850,
      settings: {
        slidesToShow: 1,
        centerPadding: "-20px",
      },
    },
  ],
});
var numa = "";
$(".bigImage").on("init", function (event, slick, currentSlide, nextSlide) {
  console.log(slick);
  var num = slick.slideOffset + 1;
  var total = slick.slideCount;
  document.getElementById("num").innerHTML = num;
  document.getElementById("total").innerHTML = total;
});
$(".bigImage").on(
  "beforeChange",
  function (event, slick, currentSlide, nextSlide) {
    if (slick.$nextArrow) {
      var num = nextSlide + 1;
    } else if (slick.$prevArrow) {
      var num = currentSlide - 1;
    } else {
      var num = currentSlide + 1;
    }
    document.getElementById("num").innerHTML = num;
  }
);
