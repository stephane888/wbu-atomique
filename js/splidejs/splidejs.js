import Splide from "@splidejs/splide";
import "@splidejs/splide/dist/css/splide.min.css";
new Splide("#splide", {
  perPage: 3,
  autoWidth: true,
  focus: "center",
  pagination: false,
  trimSpace: false
}).mount();
