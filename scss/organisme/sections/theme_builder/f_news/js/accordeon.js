(function () {
  let allAccord = Array.from(
    document.querySelectorAll(".acf-bloc > .acf-bloc__item")
  );
  console.log("allca", allAccord);
  let opened = document.querySelector(".opened");
  window.addEventListener("load", function () {
    console.log("opened", opened);
    if (opened) {
      opened.classList.toggle("opened");
      opened.style.maxHeight = opened.scrollHeight + 20 + "px";
      opened.classList.add("opened");
    }
  });
  allAccord.forEach((element) => {
    element.addEventListener("click", toggleAccordeon);
  });
  function toggleAccordeon() {
    //desableAll();
    allAccord.forEach((element) => {
      if (element !== this) {
        element.classList.remove("opened");
        element.style = null;
      }
    });
    //console.log("athisa", this.classList);
    animeToggle(this);
  }
  function animeToggle(el) {
    let etat = el.classList.contains("opened");
    let p = el.querySelector("p");
    let height;
    if (etat) {
      el.style = null;
      el.classList.toggle("opened");
    } else {
      el.classList.toggle("opened");
      el.style.maxHeight = el.scrollHeight + 10 + "px";
      el.classList.add("opened");
      //p.style.height = height;
      console.log("p", p);
    }
  }
})();
console.log("accordeon");
