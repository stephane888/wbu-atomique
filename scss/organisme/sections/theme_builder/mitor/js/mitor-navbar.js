function initNavbar() {
  let bars = document.querySelector(".menu-icons");
  let menu = document.querySelector(".mitor-navbar");
  let navList = document.querySelector(".mitor-navbar .nav-list");

  function toggleNavigation() {
    bars.addEventListener("click", function () {
      animationOpenNav();
    });
  }
  function animationOpenNav() {
    if (navList) {
      let navListHeight = navList.scrollHeight;
      if (menu.classList.contains("mitor-navbar--active")) {
        navList.style.maxHeight = navListHeight + 10 + "px";
        menu.classList.toggle("mitor-navbar--active");
        setTimeout(() => {
          navList.style.maxHeight = null;
        }, 100);
      } else {
        navList.style.maxHeight = navListHeight + 10 + "px";
        menu.classList.toggle("mitor-navbar--active");
        setTimeout(() => {
          navList.style.maxHeight = null;
        }, 500);
      }
    }
  }
  if (bars && menu) {
    toggleNavigation();
  } else {
    console.log("nonne");
  }
  /* add sub-alt class to nav-item */
  function addSubAltClass() {
    let allSubmenu = Array.from(
      document.querySelectorAll(".mitor-navbar .sub-menu")
    );
    if (allSubmenu && allSubmenu.length) {
      allSubmenu.forEach((sub_menu) => {
        sub_menu.parentElement.classList.add("sub-alt");
      });
    } else {
      console.log("no sub-menu", allSubmenu);
    }
  }
  addSubAltClass();
  /* menu accordeon */
  let allNav = Array.from(
    document.querySelectorAll(".nav-list .nav-item .nav-link")
  );

  allNav.forEach((element) => {
    element.addEventListener("click", initAccordeon);
  });

  function initAccordeon() {
    let li = this.parentElement;

    let allNavActive = Array.from(
      this.parentElement.parentElement.querySelectorAll(".nav-item--active")
    );

    allNavActive.forEach((active) => {
      if (active != li) {
        let submenu = active.querySelector(".sub-menu");
        if (submenu) {
          let parentHeight = submenu.scrollHeight;
          submenu.style.maxHeight = parentHeight + "px";
          active.classList.remove("nav-item--active");
          setTimeout(() => {
            submenu.style = " ";
          }, 100);
        } else {
          active.classList.remove("nav-item--active");
        }
        // active.classList.remove("nav-item--active");
      }
    });
    buildToggleAnimation(li);
  }
  function buildToggleAnimation(li) {
    let submenu = li.querySelector(".sub-menu");
    let parentHeight;
    if (submenu) {
      parentHeight = submenu.scrollHeight;
      if (li && !li.classList.contains("nav-item--active")) {
        submenu.style.maxHeight = parentHeight + "px";
        li.classList.add("nav-item--active");
        setTimeout(() => {
          submenu.style = null;
        }, 1000);
      } else {
        submenu.style.maxHeight = parentHeight + "px";
        li.classList.remove("nav-item--active");
        setTimeout(() => {
          submenu.style = " ";
        }, 100);
      }
    } else {
      li.classList.toggle("nav-item--active");
    }
  }
  /* manage sticky onscroll */
  let trigger;
  function initOnscroll() {
    let scrollPosition = window.scrollY;
    if (scrollPosition > 30) {
      menu.classList.add("mitor-navbar--scroll");
    } else {
      menu.classList.remove("mitor-navbar--scroll");
    }
  }
  window.addEventListener("scroll", function () {
    initOnscroll();
  });
  /* fin function */
}
/* manage search */
function initSearch() {
  let searcBtn = document.querySelector(".search");
  let searcBloc = document.querySelector(".search-nav");
  if (searcBtn && searcBloc) {
    searcBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      searcBloc.classList.toggle("search-nav--active");
    });
    document.addEventListener("click", function (ev) {
      let current = searcBloc.contains(ev.target);
      if (searcBloc.classList.contains("search-nav--active") && !current) {
        searcBloc.classList.remove("search-nav--active");
      }
      // console.log("stapps", ev.target, "--", current);
    });
  }
}

window.addEventListener("DOMContentLoaded", function () {
  initNavbar();
  initSearch();
});
