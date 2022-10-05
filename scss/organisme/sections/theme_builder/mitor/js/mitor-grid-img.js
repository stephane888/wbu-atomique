import "lightgallery/css/lightgallery-bundle.min.css";
import "lightgallery/css/lg-zoom.css";

import lightGallery from "lightgallery";
import lgZoom from "lightgallery/plugins/zoom";
import Thum from "lightgallery/plugins/thumbnail";

lightGallery(document.getElementById("mitor-top-project"), {
  plugins: [lgZoom, Thum],
  selector: ".grid-item a",
  hideControlOnEnd: true,
  backdropDuration: 100,
  speed: 500,
  download: false,
  thumbnail: true,
  animateThumb: false,
  zoomFromOrigin: false,
  allowMediaOverlap: true,
  toggleThumb: true
});
