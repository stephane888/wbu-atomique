/**
 * Help to build, classic menu, mega-menu
 */
class HbkMegaMenu {
  constructor() {
    /**
     * Contient tous les elements de menus.
     */
    this.items = [];
  }
  /**
   * Ajoute les icones svg, à tous les elements qui possedent de
   * sous menus + un ecouter de click.
   */
  addIconSvgOnItem() {
    const items = document.querySelectorAll(".hbk-mega-menu .item");
    items.forEach((item) => {
      const submenu = item.querySelector(".hbk-mega-menu--items__sub");
      const MegaMenu = item.querySelector(".hbk-mega-menu--block");
      if (submenu || MegaMenu) {
        item.appendChild(this.generateIconSvg());
        const svgElement = item.querySelector(".js-open-close");
        this.addEventListenerToSvg(svgElement);
      }
    });
  }

  /**
   * Permet d'afficher un sous menu au click.
   */
  toggleSubMenu() {
    this.addIconSvgOnItem();
  }

  /**
   *
   * @param {*} svgElement( <svg> )
   */
  addEventListenerToSvg(svgElement) {
    const container = document.querySelector(".hbk-mega-menu");
    const element = svgElement.parentElement;
    svgElement.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const OpenMenu = element.classList.contains("open");

      if (OpenMenu) element.classList.remove("open");
      else element.classList.add("open");
      if (!OpenMenu) container.classList.add("has-open-item");
      else container.classList.remove("has-open-item");
    });
  }

  CloseAllItems(MainMenu) {
    return new Promise((resolv) => {
      const items = MainMenu.querySelectorAll(".item");
      items.forEach((item) => {
        item.classList.remove("open");
      });
      setTimeout(() => {
        resolv(true);
      }, 150);
    });
  }

  /**
   * Construit les itemps pour les menus classic.
   */
  BuildItems() {
    const menus = document.querySelectorAll(".hbk-mega-menu .hbk-mega-menu--items");
    if (menus) {
      /**
       * Permet de generer le tableu de sous menus.
       * @param {*} item
       */
      const loopSubItems = (item) => {
        //
      };
      menus.forEach((menu) => {
        // On parcourt les elements.
        for (const i in menu.children) {
          const item = menu.children[i];
          if (item.classList) {
            const hasSubItems = item.querySelector(".hbk-mega-menu--items__sub");
            const element = {
              open: false,
              has_submenu: hasSubItems ? true : false,
              items: hasSubItems ? loopSubItems(item) : [],
            };
            this.items.push(element);
          }
        }
      });
    }
  }
  /**
   * Svg icon open close.
   * @returns
   */
  generateIconSvg() {
    const iconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const iconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    //
    iconSvg.setAttribute("viewBox", "0 0 100 80");
    iconSvg.setAttribute("height", "20px");
    iconSvg.setAttribute("width", "20px");
    iconSvg.setAttribute("xml:space", "preserve");
    iconSvg.classList.add("svg-arrow");
    iconSvg.classList.add("js-open-close");
    //
    iconPath.setAttribute(
      "d",
      "M 90 24.25 c 0 -0.896 -0.342 -1.792 -1.025 -2.475 c -1.366 -1.367 -3.583 -1.367 -4.949 0 L 45 60.8 L 5.975 21.775 c -1.367 -1.367 -3.583 -1.367 -4.95 0 c -1.366 1.367 -1.366 3.583 0 4.95 l 41.5 41.5 c 1.366 1.367 3.583 1.367 4.949 0 l 41.5 -41.5 C 89.658 26.042 90 25.146 90 24.25 z"
    );
    iconSvg.appendChild(iconPath);
    return iconSvg;
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
   * --
   */
  openCloseMobileMenu(menu) {
    const body = document.querySelector("body");
    if (menu.classList.contains("open")) {
      menu.classList.remove("open");
      body.classList.remove("hbk-mega-menu-open");
    } else {
      menu.classList.add("open");
      body.classList.add("hbk-mega-menu-open");
    }
  }

  /**
   * --
   */
  burgerSvgAnim(burger) {
    // const burger = document.querySelector(".hbk-mega-menu .burger__button");
    const stat = burger.classList.toggle("opened");
    burger.setAttribute("aria-expanded", stat);
  }

  /**
   * Ajoute l'icone de fermeture. (afficher generalement sur mobile)
   */
  addIconClose() {
    const MainMenus = document.querySelectorAll(".hbk-mega-menu");
    MainMenus.forEach((MainMenu) => {
      const menu = MainMenu.querySelector(".hbk-mega-menu--items");
      const burger = MainMenu.querySelector(".burger__button");
      menu.appendChild(this.generateIconClose());
      const covertDk = document.createElement("div");
      covertDk.setAttribute("class", "overlay-descktop overlay");
      menu.appendChild(covertDk);
      menu.querySelector(".overlay-descktop").addEventListener("click", () => {
        this.CloseAllItems(MainMenu);
      });
      menu.querySelector(".js-close").addEventListener("click", () => {
        this.openCloseMobileMenu(menu);
        this.burgerSvgAnim(burger);
      });
      //
      const div = document.createElement("div");
      div.setAttribute("class", "overlay overlay-mobile");
      MainMenu.appendChild(div);
      MainMenu.querySelector(".overlay-mobile").addEventListener("click", () => {
        this.openCloseMobileMenu(menu);
        this.burgerSvgAnim(burger);
      });
    });
  }
  /**
   * From burger
   */
  clickToOpenMobileMenu() {
    const MainMenus = document.querySelectorAll(".hbk-mega-menu");
    MainMenus.forEach((MainMenu) => {
      const menu = MainMenu.querySelector(".hbk-mega-menu--items");
      const burger = MainMenu.querySelector(".burger__button");
      burger.addEventListener("click", () => {
        this.openCloseMobileMenu(menu);
        this.burgerSvgAnim(burger);
      });
    });
  }

  /**
   * open formulaire
   */
  openModelsearch() {
    const body = document.querySelector("body");
    const MainMenus = document.querySelectorAll(".hbk-mega-menu");
    const openClose = (MainMenu) => {
      body.classList.toggle("hbk-mega-menu-open");
      MainMenu.classList.toggle("open-search");
    };
    MainMenus.forEach((MainMenu) => {
      // Add cover
      const div = document.createElement("div");
      div.setAttribute("class", "overlay overlay-search");
      div.appendChild(this.generateIconClose());
      MainMenu.appendChild(div);
      // add listener to close.
      const iconClose = MainMenu.querySelector(".overlay-search .js-close");
      iconClose.addEventListener("click", () => {
        openClose(MainMenu);
      });
      //
      const iconSearch = MainMenu.querySelector(".icon-search");
      iconSearch.addEventListener("click", () => {
        openClose(MainMenu);
        // add focus in input.
        const inputSearch = MainMenu.querySelector(".blm-key-search");
        console.log("inputSearch : ", inputSearch);
        if (inputSearch) {
          inputSearch.focus();
        }
      });
    });
  }
}

const HBK = new HbkMegaMenu();
HBK.toggleSubMenu();
HBK.BuildItems();
HBK.addIconClose();
HBK.clickToOpenMobileMenu();
HBK.openModelsearch();
