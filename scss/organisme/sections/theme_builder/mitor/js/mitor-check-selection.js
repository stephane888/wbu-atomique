window.addEventListener("load", () => {
  function addActive(i, textArray) {
    textArray.forEach((item) => item.classList.remove("active"));
    textArray[i].classList.add("active");
  }
  (function () {
    let navLink = Array.from(
      document.querySelectorAll(".check-selection .nav-item .nav-link")
    );
    let itemText = Array.from(
      document.querySelectorAll(".check-selection .tab-switch-tex .item-txt")
    );
    if (navLink.length === itemText.length) {
      navLink.forEach((item, i) => {
        if (item.classList.contains("active")) {
          itemText.forEach((item) => item.classList.remove("active"));
          itemText[i].classList.add("active");
        }
        item.addEventListener("click", () => {
          addActive(i, itemText);
        });
      });
    } else {
      console.error("Problème de structure sur check-selection");
    }
  })();
});
