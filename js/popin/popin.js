const KEY = "hbk_popin__";
class Popin {
  constructor(context) {
    //
    this.timerScroll;
    this.timerResize;
    this.context = context;
    this.selector = ".hbk_savoiepeche_popin_block";
    this.PoPins = [];
  }

  /**
   * --
   * @returns
   */
  generateIconClose() {
    const iconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const iconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    //
    iconSvg.setAttribute("viewBox", "0 0 14 14");
    iconSvg.setAttribute("height", "14px");
    iconSvg.setAttribute("width", "14px");
    iconSvg.setAttribute("focusable", false);
    iconSvg.classList.add("svg-close");
    iconSvg.classList.add("js-close");
    //
    iconPath.setAttribute("d", "M13 13L1 1M13 1L1 13");
    iconPath.setAttribute("stroke", "currentColor");
    iconPath.setAttribute("stroke-width", "1.1");
    iconPath.setAttribute("fill", "none");
    iconSvg.appendChild(iconPath);
    return iconSvg;
  }

  /**
   * Ajoute l'icone de fermeture.
   */
  addIconClose(PoPin, idPopin = false, config = {}) {
    //hidden;
    const actionclose = (PoPin) => {
      PoPin.classList.remove("open");
      document.querySelector("body").classList.remove("modal-open");
      if (idPopin) this.setStatusToCache(idPopin, config);
      setTimeout(() => {
        PoPin.classList.add("hidden");
      }, 3000);
    };
    // add cover
    const covertDk = document.createElement("div");
    covertDk.setAttribute("class", "overlay");
    PoPin.appendChild(covertDk);
    PoPin.querySelector(".overlay").addEventListener("click", () => {
      // actionclose(PoPin);
    });
    // add button close.
    PoPin.querySelector(".hbk_savoiepeche_popin_block__container .hbk_content").appendChild(this.generateIconClose());
    PoPin.querySelector(".js-close").addEventListener("click", () => {
      actionclose(PoPin);
    });
    // close with click on link.
    const link = PoPin.querySelector(".hbk_savoiepeche_popin_block__link");
    if (link)
      link.addEventListener("click", (event) => {
        const listener = event.target;
        if (!listener.classList.contains("close")) {
          event.preventDefault();
          listener.classList.add("close");
          actionclose(PoPin);
          setTimeout(() => {
            listener.click();
          }, 100);
        }
      });
  }
  getCache(config) {
    if (config.type_affichage == "by_session") {
      return window.sessionStorage;
    }
    if (config.type_affichage == "by_user") {
      return window.localStorage;
    }
  }
  setStatusToCache(idPopin, config) {
    const cache = this.getCache(config);
    cache.setItem(KEY + idPopin, JSON.stringify({ user_close: true }));
  }
  getStatusFromCache(idPopin, config) {
    const cache = this.getCache(config);
    const value = cache.getItem(KEY + idPopin);
    if (!value) {
      return {
        user_close: false,
      };
    } else {
      return JSON.parse(value);
    }
  }

  openModal() {
    let addClassBody = false;
    this.PoPins.forEach((PoPin) => {
      const config = JSON.parse(PoPin.getAttribute("data-config"));
      const idPopin = PoPin.getAttribute("data-popin_id");
      const configCache = this.getStatusFromCache(idPopin, config);
      if (config && config.status && !configCache.user_close) {
        const delai = parseInt(config.delais);
        setTimeout(() => {
          PoPin.classList.add("open");
          this.addIconClose(PoPin, idPopin, config);
          if (!addClassBody) document.querySelector("body").classList.add("modal-open");
        }, delai * 1000);
      } else {
        PoPin.classList.add("hidden");
      }
    });
  }

  togglePopin(id) {
    const PoPin = this.context.getElementById(id);
    let addClassBody = false;
    if (PoPin) {
      PoPin.classList.remove("hidden");
      PoPin.classList.add("open");
      this.addIconClose(PoPin);
      if (!addClassBody) document.querySelector("body").classList.add("modal-open");
    }
  }

  /**
   * Initialisation
   */
  build() {
    window.addEventListener("load", () => {
      this.PoPins = this.context.querySelectorAll(this.selector);
      this.openModal();
    });
  }
}

export default Popin;
