/**
 * Help to build, classic menu, mega-menu
 */
class HbkMegaMenu {
  constructor() {
    /**
     * Ce selecteur doit est un enfant direct de la balise conteneur.
     * il ajoute|retire la classe open
     */
    this.selectorOpenClose = document.querySelectorAll(".hbk-mega-menu .js-open-close");
    /**
     * Contient tous les elements de menus.
     */
    this.items = [];
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
    console.log("items  : ", this.items);
  }

  /**
   * Permet d'afficher un sous menu et de fermer le reste.
   */
  toggleSubMenu() {
    if (this.selectorOpenClose)
      this.selectorOpenClose.forEach((item) => {
        const element = item.parentElement;
        if (element)
          element.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            element.classList.toggle("open");
          });
      });
  }
}

const HBK = new HbkMegaMenu();
HBK.toggleSubMenu();
HBK.BuildItems();
