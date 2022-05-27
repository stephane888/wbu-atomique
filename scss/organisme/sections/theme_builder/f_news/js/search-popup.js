(function () {
  ("use-strict");
  /*
   *@params {HTMLelement} search=".sn-search" l'element qui permet d'ouvrir le popup au click
   *@params {HTMLelement} fermer=".sn-hide" le bouton permenttant de fermer le popup
   *@params {HTMLelement} blockSearch=".sn-search-popup" la div du contenu  du popup qui recevra la clasese "sn-search-popup--show" au click
   */
  /* pop up recherche */
  let search = document.querySelector(".sn-search");
  let fermer = document.querySelector(".sn-hide");
  let blocSearch = document.querySelector(".sn-search-popup");
  if (search && fermer) {
    search.addEventListener("click", activeSearch);
    fermer.addEventListener("click", activeSearch);
  } else {
    console.error("desoler pas de div pour la recherche");
  }

  function activeSearch() {
    blocSearch.classList.toggle("sn-search-popup--show");
  }
})();
