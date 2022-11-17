var icons = document.querySelectorAll(".menu01 .menu01__search .icon");
console.log("List : ", icons);
icons.forEach(icon => {
  icon.addEventListener("click", event => {
    if (icon.classList.contains("ouvert")) {
      icon.parentNode.classList.remove("fermer");
      icon.parentNode.classList.add("ouvert");
    } else if (icon.classList.contains("fermer")) {
      icon.parentNode.classList.add("fermer");
      icon.parentNode.classList.remove("ouvert");
    }
  });
});
