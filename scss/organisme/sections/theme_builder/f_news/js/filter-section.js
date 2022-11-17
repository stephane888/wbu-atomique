(function () {
  let parent = document.querySelector(".filter-section-fnews");
  let filBtn = document.querySelector(".filter-button");
  let hide = parent.querySelector(".hide-btn");
  if (filBtn && hide) {
    filBtn.addEventListener("click", handleClick);
    hide.addEventListener("click", handleClick);
  } else {
    console.log("filbtn & hide not found:", filBtn, "", hide);
  }
  function handleClick() {
    parent.classList.toggle("fsf-side--show");
  }

  let sm = window.matchMedia("(max-width:992px)");
  sm.addEventListener("change", mathBp);
  mathBp(sm);
  function mathBp(bp) {
    console.log("yess", bp);
    if (bp.matches) {
      parent.classList.toggle("fsf-side");
    } else {
      parent.classList.remove("fsf-side");
    }
  }
})();
