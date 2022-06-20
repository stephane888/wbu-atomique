let bacTop = document.querySelector(".vsp-bac-top");
bacTop.addEventListener("click", scrollUp);

window.onscroll = () => {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 500 ||
    document.documentElement.scrollTop > 100
  ) {
    bacTop.style.visibility = "visible";
    bacTop.style.opacity = "1";
  } else {
    bacTop.style = "";
  }
}

function scrollUp() {
  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth"
  });
}
