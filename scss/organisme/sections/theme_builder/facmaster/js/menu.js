$(document).ready(function () {
  // Toggle menu on click
  
  $("#menu-toggler").click(function () {
    toggleBodyClass("menu-active");
console.log("landry")
  });

  function toggleBodyClass(className) {
    document.body.classList.toggle(className);
  }
});
