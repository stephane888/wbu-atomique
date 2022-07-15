(function () {
  "use-strict";
  function getTruePosition(element) {
    let valeur = Math.abs(element.getBoundingClientRect().top);
    valeur = Math.round(valeur);
    if (window.scrollY > 0) {
      return window.scrollY - valeur;
    } else {
      return valeur;
    }
  }

  window.addEventListener("load", function () {
    let secondNav = document.querySelector(".second-nav--fixed");
    let lastscroll = 0;
    let callTime = null;
    if (secondNav) {
      let secondNavContent = document.querySelector(
        ".second-nav--fixed .content"
      );
      let secondNavHeight = secondNav.scrollHeight;
      let secondNavWindowPosition = getTruePosition(secondNav);
      let limitToStatic = secondNavWindowPosition + 30;

      secondNav.style.minHeight = secondNavHeight;
      // console.log("limit", limitToStatic, "----", lastscroll);
      window.addEventListener("scroll", () => {
        // clearTimeout(callTime);
        //callTime = this.setTimeout(buildStatic, 30);
        buildStatic();
      });
      function buildStatic() {
        const currentScroll = window.pageYOffset;
        //console.log("position", limitToStatic, "----", currentScroll);

        if (lastscroll > currentScroll && limitToStatic < currentScroll) {
          if (!secondNav.classList.contains("second-nav--static")) {
            onStaticNav();
          }
          console.log("position", limitToStatic, "----", currentScroll);
        } else if (
          lastscroll < currentScroll &&
          limitToStatic < currentScroll &&
          secondNav.classList.contains("second-nav--static") == true
        ) {
          console.log("retire", limitToStatic, "----", currentScroll);
          if (!secondNavContent.style.opacity) {
            secondNavContent.style.opacity = 0;
          }
          this.setTimeout(function () {
            // if (lastscroll < currentScroll && limitToStatic < currentScroll) {
            //secondNav.classList.remove("second-nav--static");
            // }
            secondNavContent.style.opacity = null;
          }, 400);
          this.setTimeout(function () {
            // if (lastscroll < currentScroll && limitToStatic < currentScroll) {
            secondNav.classList.remove("second-nav--static");
            // }
            //  secondNavContent.style.opacity = null;
          }, 200);
        } else if (limitToStatic > currentScroll) {
          if (secondNav.classList.contains("second-nav--static")) {
            offStaticNav();
          }
          console.log("do nothing", limitToStatic, "----", currentScroll);
        }

        lastscroll = currentScroll;
      }
      function onStaticNav() {
        secondNav.classList.add("second-nav--static");
      }
      function offStaticNav() {
        secondNav.classList.remove("second-nav--static");
      }
    } else {
      console.log("No second nav element");
    }
  });
})();
