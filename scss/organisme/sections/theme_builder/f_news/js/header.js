(function () {
  "use-strict";
  let fnewsHeader = document.querySelector(".fnews-header");
  let firstNavUl = fnewsHeader.querySelector(".first-nav > ul");
  let liList = fnewsHeader.querySelectorAll(".first-nav  ul li");
  let toggleSM = fnewsHeader.querySelector(".menu-icons");
  window.addEventListener("load", () => {
    // enabledHover(true);

    addSubAlt(liList);
  });
  /* ajouter la classe sub-alt sur tous les li qui possède des sous-menu */
  function addSubAlt(list) {
    console.log("list");
    var ul = Array.from(list);
    if (ul && ul.length) {
      ul.forEach((li) => {
        let sm = li.querySelector("ul");
        if (sm) {
          li.classList.add("sub-alt");
        }
      });
    }
  }
  /* permet de reset l'etat des ul au changement des breakpoint */
  function resetUlStyle(list) {
    var ul = Array.from(list);
    if (ul && ul.length) {
      ul.forEach((li) => {
        let sm = li.querySelector("ul");
        if (sm) {
          li.classList.remove("nav-item--open");
          sm.style = null;
        }
      });
    }
  }
  /* breakpoint */
  let smallBp = window.matchMedia("(max-width: 768px");
  smallBp.addEventListener("change", smallFunction);
  smallFunction(smallBp);
  function smallFunction(bp) {
    if (bp.matches) {
      firstNavUl.classList.remove("nav-list");
      firstNavUl.classList.add("nav-list-mobile");
      fnewsHeader.classList.remove("active");
      toggleSM.addEventListener("click", addRemoveActive);
      resetUlStyle(liList);
      firstNavUl.style = "";
      enabledHover(false);
    } else {
      firstNavUl.classList.add("nav-list");
      firstNavUl.classList.remove("nav-list-mobile");
      fnewsHeader.classList.remove("active");
      toggleSM.removeEventListener("click", addRemoveActive);
      resetUlStyle(liList);
      enabledHover(true);
    }
  }
  /* permet de plier deplier le menu sur petit ecran */
  function addRemoveActive(e) {
    // firstNavUl.classList.toggle("nav-list");
    // firstNavUl.classList.toggle("nav-list-mobile");
    e.preventDefault();
    let active = fnewsHeader.classList.contains("active");
    if (active) {
      showSmNav(firstNavUl);
      setTimeout(() => {
        fnewsHeader.classList.remove("active");
      }, 800);
    } else {
      fnewsHeader.classList.add("active");
      showSmNav(firstNavUl);
    }
  }

  /* permet d'ajouter le click sur les li des menus et sous-menu  */
  function enabledHover(action = true) {
    let list = Array.from(fnewsHeader.querySelectorAll(".first-nav  ul li"));
    if (list && list.length) {
      if (action) {
        list.forEach((el) => {
          const a = el.querySelector(".nav-link");
          /* desable click */
          a.removeEventListener("click", activeClick);
        });
      } else {
        list.forEach((el) => {
          const a = el.querySelector(".nav-link");
          /* enable click */
          a.addEventListener("click", activeClick);
        });
      }
    }
  }

  function activeClick(e) {
    if (this.parentElement.classList.contains("sub-alt")) {
      e.preventDefault();
    }
    const allChild =
      this.parentElement.parentElement.querySelectorAll("li.nav-item--open");

    allChild.forEach((al) => {
      const ch = al;
      if (ch !== this.parentElement) {
        ch.classList.remove("nav-item--open");
        toggleAnimation(ch);
      }
    });
    this.parentElement.classList.toggle("nav-item--open");
    toggleAnimation(this.parentElement);
  }
  /* animation a l'ouverture de l'accordeon */
  function toggleAnimation(el) {
    const ul = el.querySelector("ul");
    if (ul) {
      console.log("taille du ul:", ul.scrollHeight);
      if (ul.style.maxHeight) {
        ul.style.maxHeight = ul.scrollHeight;
        ul.style.height = ul.scrollHeight;
        setTimeout(() => {
          ul.style.maxHeight = null;
          ul.style.height = 0;
        }, 100);
      } else {
        ul.style.maxHeight = ul.scrollHeight;
        ul.style.height = ul.scrollHeight;
        setTimeout(() => {
          ul.style.maxHeight = "none";
          ul.style.height = auto;
        }, 600);
      }
    }
  }
  function showSmNav(nav) {
    if (nav) {
      console.log("taille du nav:", nav.scrollHeight);
      if (nav.style.maxHeight) {
        nav.style.maxHeight = nav.scrollHeight;

        setTimeout(() => {
          nav.style.maxHeight = null;
        }, 100);
      } else {
        nav.style.maxHeight = nav.scrollHeight;
        setTimeout(() => {
          nav.style.maxHeight = "none";
        }, 500);
      }
    }
  }

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
