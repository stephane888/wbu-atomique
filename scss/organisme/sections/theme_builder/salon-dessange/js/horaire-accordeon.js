(function () {
  function addClick() {
    let horaireBtn = document.querySelector(".horaire__list--trigger");
    let listUl = document.querySelector(".horaire-bloc");
    if (horaireBtn && listUl) {
      horaireBtn.addEventListener("click", function () {
        listUl.classList.toggle("horaire-bloc--active");
        console.log("ok");
      });
      document.addEventListener("click", function (ev) {
        let current = listUl.contains(ev.target);
        if (listUl.classList.contains("horaire-bloc--active") && !current) {
          listUl.classList.remove("horaire-bloc--active");
        }
      });
    }
  }
  window.addEventListener("load", function () {
    addClick();
  });
})();
