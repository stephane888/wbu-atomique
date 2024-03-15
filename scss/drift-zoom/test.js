// Zoom de l'image
import Drift from "drift-zoom";
import "./test.scss";
const img = document.querySelector(".imge-auto-zoom");
// const paneContainer = document.querySelector(".zomm-img-display");
const paneContainer = document.querySelector(".detail2");
console.log("img : ", img);
console.log("paneContainer : ", paneContainer);
new Drift(img, {
  paneContainer: paneContainer,
  inlinePane: false,
  handleTouch: false,
  zoomFactor: 2.2,
});
