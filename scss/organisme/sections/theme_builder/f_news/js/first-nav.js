function firstNav() {
  "use-strict";
  let fnewsHeader = document.querySelector(".fnews-header");
  let firstNavUl = fnewsHeader.querySelector(".first-nav > ul");
  let liList = fnewsHeader.querySelectorAll(".first-nav  ul li");
  let toggleSM = fnewsHeader.querySelector(".menu-icons");
  let activeLi = Array.from(fnewsHeader.querySelectorAll(".nav-item--active"));
  window.addEventListener("load", () => {
    // enabledHover(true);
    addSubAlt(liList);
    // console.log("activeLi", activeLi);
    for (let active of activeLi) {
      putActiveToParent(active);
    }
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
  /* put active class in all parent */
  function putActiveToParent(el) {
    if (el) {
      if (el.parentElement.classList.contains("sub-menu")) {
        el.parentElement.parentElement.classList.add("nav-item--active");
        putActiveToParent(el.parentElement.parentElement);
        // console.log("activeLi", el.outerHTML);
      }
    }
  }
  /* permet de plier deplier le menu sur petit ecran */
  function isActive() {
    let active = fnewsHeader.classList.contains("active");
    if (active) {
      showSmNav(firstNavUl);
      setTimeout(() => {
        fnewsHeader.classList.remove("active");
        firstNavUl.style = null;
      }, 600);
    } else {
      fnewsHeader.classList.add("active");

      showSmNav(firstNavUl);
    }
  }
  let attendre = false,
    finAccordeon;
  function addRemoveActive(e) {
    // firstNavUl.classList.toggle("nav-list");
    // firstNavUl.classList.toggle("nav-list-mobile");
    e.preventDefault();

    if (attendre) {
      return;
    }
    attendre = true;
    clearInterval(finAccordeon);

    setTimeout(() => {
      attendre = false;
    }, 100);
    finAccordeon = setTimeout(() => {
      isActive();
    }, 200);
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
  let attendreLi = false,
    finAccordeonLi;
  function activeClick(e) {
    if (this.parentElement.classList.contains("sub-alt")) {
      e.preventDefault();
    }

    if (attendre) {
      return false;
    }
    attendreLi = true;
    clearInterval(finAccordeonLi);
    setTimeout(() => {
      attendre = false;
    }, 100);
    finAccordeonLi = setTimeout(() => {
      toggleAfterInterval(this);
    }, 200);
  }
  function toggleAfterInterval(th) {
    const allChild = th.parentElement.parentElement.querySelectorAll("li.nav-item--open");

    allChild.forEach((al) => {
      const ch = al;
      if (ch !== th.parentElement) {
        ch.classList.remove("nav-item--open");
        toggleAnimation(ch);
      }
    });
    if (th.parentElement.querySelector(".sub-menu")) {
      th.parentElement.classList.toggle("nav-item--open");
    }
    toggleAnimation(th.parentElement);
  }
  /* animation a l'ouverture de l'accordeon */
  function toggleAnimation(el) {
    const ul = el.querySelector("ul");
    if (ul) {
      if (ul.style.maxHeight) {
        ul.style.maxHeight = ul.scrollHeight + "px";

        setTimeout(() => {
          ul.style.maxHeight = null;
        }, 200);
      } else {
        ul.style.maxHeight = ul.scrollHeight + "px";

        setTimeout(() => {
          ul.style.maxHeight = "none";
        }, 600);
      }
    }
  }
  function showSmNav(nav) {
    if (nav) {
      if (nav.style.maxHeight) {
        nav.style.maxHeight = nav.scrollHeight + "px";
        setTimeout(() => {
          nav.style.maxHeight = null;
        }, 100);
      } else {
        nav.style.maxHeight = nav.scrollHeight + "px";
        console.log("taille du nav:", nav.scrollHeight, nav.style.maxHeight);

        setTimeout(() => {
          nav.style.maxHeight = "none";
        }, 600);
      }
    }
  }
}

try {
  firstNav();
} catch (er) {
  console.log("error script first-nav.js", er);
}
