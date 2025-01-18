const defaultSettings = {
  image_wrapper: {
    type: "class",
    value: "img-wrapper",
  },
  overlay: {
    type: "id",
    value: "overlay",
  },
  prevButton: {
    type: "id",
    value: "prevButton",
  },
  nextButton: {
    type: "id",
    value: "nextButton",
  },
  exitButton: {
    type: "id",
    value: "exitButton",
  },
  image: {
    type: "class",
    value: "hello_world",
  },

  galleryContainer: {
    selector: ".",
    value: "gallery-overlay-section-gallery",
  },
  galleryElement: {
    selector: ".",
    value: "base-image-container",
  },
  image_overlay: {
    selector: ".",
    value: "img-overlay",
  },
  fade_time: 100,
};

class GalleryOverlay {
  constructor(context, settings = {}) {
    /**
     * Contient le context encours.
     */
    this.context = context;
    this.settings = settings;
    /**
     * contient l'element qui vient d'etre selectionner.
     */
    this.currentItem = null;
    /**
     * Largeur du layout. i.e espace utilisable.
     */
    this.layout = { width: context.offsetWidth, height: window.innerHeight };
    //this.windowWidth = window.innerWidth;
    //this.windowHeight = window.innerHeight;
  }

  /**
   * Construit le html au click et gere les transitions.
   */
  build() {
    this.effetOnItem();
    const settings = { ...defaultSettings, ...this.settings };
    const generatedElement = this.buildHtmlRender();
    const imagesOverlay = this.context.querySelectorAll(settings.image_overlay.selector + settings.image_overlay.value);
    const gallerySelector = settings.galleryContainer.selector + settings.galleryContainer.value;
    for (const key in generatedElement) {
      if (settings[key]) {
        if (settings[key].type === "class" && settings[key].value) {
          generatedElement[key].classList.add(settings[key].value);
        } else {
          generatedElement[key].setAttribute(settings[key].type, settings[key].value);
        }
      }
    }
    this.listernerClick(imagesOverlay, generatedElement);
    // document.generatedElement = generatedElement;
    // generatedElement.overlay.prepend(generatedElement.prevButton);
    generatedElement.overlay.appendChild(generatedElement.imagesContainer);
    // generatedElement.overlay.appendChild(generatedElement.nextButton);
    generatedElement.imagesContainer.appendChild(generatedElement.image);
    generatedElement.imagesContainer.appendChild(generatedElement.exitButton);
    generatedElement.imagesContainer.appendChild(generatedElement.loader);
    generatedElement.imagesContainer.appendChild(generatedElement.prevButton);
    generatedElement.imagesContainer.appendChild(generatedElement.nextButton);
    this.context.appendChild(generatedElement.overlay);
    // On empeche la propagation du click sur l'element parent.
    generatedElement.imagesContainer.addEventListener("click", (event) => {
      event.stopPropagation();
    });

    generatedElement.overlay.addEventListener("click", () => {
      this.closePoup(generatedElement);
    });
    generatedElement.exitButton.addEventListener("click", (event) => {
      this.closePoup(generatedElement);
      event.stopPropagation();
    });

    const elementSelector = settings.galleryElement.selector + settings.galleryElement.value;
    this.nextButton(generatedElement, gallerySelector, elementSelector);
    this.prevButton(generatedElement, gallerySelector, elementSelector);
  }

  /**
   *
   * @param {*} generatedElement
   * @param {*} gallerySelector
   * @param {*} elementSelector
   */
  nextButton(generatedElement, gallerySelector, elementSelector) {
    generatedElement.nextButton.addEventListener("click", (event) => {
      event.stopPropagation();
      // let imgRender = generatedElement.image;
      // const currentImgSrc = imgRender.getAttribute("data-location");
      // const currentImg = this.context.querySelector(gallerySelector + ' a[href="' + currentImgSrc + '"]');
      // const nextElement = currentImg.closest(elementSelector).nextElementSibling;
      const baseImageContainer = this.currentItem.closest(elementSelector).nextElementSibling;
      if (baseImageContainer) {
        this.currentItem = baseImageContainer.querySelector("a.img-overlay");
        this.LoadImage(generatedElement);
      } else {
        const images = this.context.querySelectorAll(gallerySelector + " a.img-overlay");
        if (images) {
          this.currentItem = images[0];
          this.LoadImage(generatedElement);
        }
      }
    });
  }

  /**
   * Selectionne l'image precedante.
   * @param {*} generatedElement
   * @param {*} gallerySelector
   * @param {*} elementSelector
   */
  prevButton(generatedElement, gallerySelector, elementSelector) {
    generatedElement.prevButton.addEventListener("click", (event) => {
      event.stopPropagation();
      // const currentImgSrc = generatedElement.image.getAttribute("data-location");
      // const currentImg = this.context.querySelector(gallerySelector + ' a[href="' + currentImgSrc + '"]');
      // const prevElement = currentImg.closest(elementSelector).previousElementSibling;
      const baseImageContainer = this.currentItem.closest(elementSelector).previousElementSibling;
      if (baseImageContainer) {
        this.currentItem = baseImageContainer.querySelector("a.img-overlay");
        this.LoadImage(generatedElement);
      } else {
        const images = this.context.querySelectorAll(gallerySelector + " a.img-overlay");
        if (images) {
          this.currentItem = images[images.length - 1];
          this.LoadImage(generatedElement);
        }
      }
    });
  }

  /**
   * Ecoute l'action click sur l'image.
   * @param {*} imagesOverlay
   * @param {*} generatedElement
   */
  listernerClick(imagesOverlay, generatedElement) {
    imagesOverlay.forEach((imageOverlay) => {
      imageOverlay.addEventListener("click", (event) => {
        event.preventDefault();
        this.currentItem = event.target;
        this.OpenPopup(generatedElement);
        this.LoadImage(generatedElement, "click");
        // console.log(event.target.getAttribute("href"));
      });
    });
  }

  /**
   * Charge et affiche la nouvelle image.
   * @param {*} location
   * @returns
   */
  LoadImage(generatedElement, source = "navigation") {
    return new Promise((resolv) => {
      generatedElement.overlay.classList.add("loading-file");
      this.toggleLoader(generatedElement, true);
      const runTransition = { with: false, height: false };
      const loaderImage = () => {
        return new Promise((img_resolv) => {
          const img = document.createElement("img");
          img.addEventListener("load", () => {
            setTimeout(() => {
              let margin = 30;
              var imgWidth = img.naturalWidth;
              var imgHeight = img.naturalHeight;
              const aspectRatio = img.naturalWidth / img.naturalHeight;
              // Si la hauteur de l'image depasse la taille, de l'ecran, on fixe la hauteur et on determine la largeur.
              if (img.naturalHeight + margin >= this.layout.height) {
                const fixeHeight = this.layout.height - margin - 15;
                imgHeight = fixeHeight;
                imgWidth = fixeHeight * aspectRatio;
                if (imgWidth > this.layout.width) {
                  const fixeWidth = this.layout.width;
                  imgWidth = fixeWidth;
                  imgHeight = fixeWidth / aspectRatio;
                }
              } else if (img.naturalWidth > this.layout.width) {
                const fixeWidth = this.layout.width;
                imgWidth = fixeWidth;
                imgHeight = fixeWidth / aspectRatio;
              }
              console.log("imgWidth/imgHeight : ", imgWidth + "/" + imgHeight);
              console.log("layout.dimension  : ", this.layout);
              // On ajuste la taille du container par rapport à l'image reelle.
              generatedElement.imagesContainer.style.width = imgWidth + "px";
              generatedElement.imagesContainer.style.height = imgHeight + "px";
              generatedElement.image.setAttribute("src", img.src);
              generatedElement.image.classList.add("show");
              //
              // generatedElement.image.style.width = imgWidth + "px";
              // generatedElement.image.style.height = imgHeight + "px";
              //
              this.toggleLoader(generatedElement, false);
              img_resolv(img);
            }, 100);
          });
          // img.src = location;
          if (this.currentItem) img.src = this.currentItem.getAttribute("href");
          else console.log("No image find");
        });
      };
      loaderImage().then((img) => {
        generatedElement.imagesContainer.addEventListener("transitionend", (event) => {
          // On verifie si la transition sur width est terminée.
          if (!runTransition.with && event.propertyName == "width") {
            runTransition.with = true;
            // console.log("La transition est terminée.", event.propertyName);
            // generatedElement.imagesContainer.style.width = generatedElement.image.offsetWidth + "px";
            generatedElement.overlay.classList.remove("loading-file");
          }
          // On verifie si la transition sur width est terminée.
          if (!runTransition.height && event.propertyName == "height") {
            runTransition.height = true;
            // console.log("La transition est terminée.", event.propertyName);
            // generatedElement.imagesContainer.style.height = generatedElement.image.offsetHeight + "px";
            generatedElement.overlay.classList.remove("loading-file");
          }
        });
        //
        if (source == "click") generatedElement.overlay.classList.remove("loading-file");
        // Dans la mesure ou on a pas de transsition, on reaffiche la navigation.
        setTimeout(() => {
          generatedElement.overlay.classList.remove("loading-file");
        }, 1100);
        resolv(img);
      });
    });
  }
  /**
   * Ferme le popup.
   */
  OpenPopup(generatedElement) {
    generatedElement.overlay.classList.add("show");
    document.body.classList.add("overflow-hidden");
  }
  /**
   * Ouvre le popup
   * @param {*} generatedElement
   * @param {*} item
   */
  closePoup(generatedElement) {
    generatedElement.overlay.classList.remove("show");
    generatedElement.image.classList.remove("show");
    generatedElement.image.setAttribute("src", "");
    document.body.classList.remove("overflow-hidden");
  }
  /**
   * Construit le html
   * @returns
   */
  buildHtmlRender() {
    const generatedElement = {
      overlay: document.createElement("div"),
      imagesContainer: document.createElement("div"),
      image: document.createElement("img"),
      prevButton: document.createElement("div"),
      nextButton: document.createElement("div"),
      exitButton: document.createElement("div"),
      loader: document.createElement("div"),
    };

    generatedElement.overlay.className = "gallery-overlay-section-overlay";
    generatedElement.imagesContainer.classList.add("gallery-overlay-images-container", "d-flex", "justify-content-center", "align-items-center");
    generatedElement.image.classList.add("gallery-overlay-section-current-image", "img-responsive", "img-fluid");
    generatedElement.prevButton.className = "gallery-overlay-navigation btn-prev d-flex align-items-center";
    generatedElement.prevButton.innerHTML =
      '<svg fill="#fff" width="80" height="80" viewBox="-1.5 -0.938 4.5 4.5" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin" class="jam jam-chevron-right" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" transform="matrix(-1,0,0,-1,0,0)"><path d="M.996 1.326.068.398A.188.188 0 0 1 .333.133l1.061 1.061a.19.19 0 0 1 0 .265L.333 2.52a.188.188 0 0 1-.265-.265z"></path></svg>';
    generatedElement.nextButton.className = "gallery-overlay-navigation btn-next d-flex align-items-center justify-content-end";
    generatedElement.nextButton.innerHTML =
      '<svg fill="#fff" width="80" height="80" viewBox="-1.5 -0.938 4.5 4.5" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin" class="jam jam-chevron-right"><path d="M.996 1.326.068.398A.188.188 0 0 1 .333.133l1.061 1.061a.19.19 0 0 1 0 .265L.333 2.52a.188.188 0 0 1-.265-.265z"/></svg>';
    generatedElement.exitButton.className = "gallery-overlay-section-btn-exit";
    generatedElement.exitButton.innerHTML =
      '<svg viewBox="0 0 3 3" fill="#fff" xmlns="http://www.w3.org/2000/svg"><path fill-opacity=".01" d="M0 0h3v3H0z"/><path d="m.5.5 2 2m-2 0 2-2" stroke="#fff" stroke-width=".25" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    generatedElement.loader.classList.add("loader");
    generatedElement.loader.innerHTML = `<svg version="1.1" id="L4" width="10rem" height="10rem" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
  viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
  <circle fill="#fff" stroke="none" cx="6" cy="50" r="6">
    <animate
      attributeName="opacity"
      dur="1s"
      values="0;1;0"
      repeatCount="indefinite"
      begin="0.1"/>    
  </circle>
  <circle fill="#fff" stroke="none" cx="26" cy="50" r="6">
    <animate
      attributeName="opacity"
      dur="1s"
      values="0;1;0"
      repeatCount="indefinite" 
      begin="0.2"/>       
  </circle>
  <circle fill="#fff" stroke="none" cx="46" cy="50" r="6">
    <animate
      attributeName="opacity"
      dur="1s"
      values="0;1;0"
      repeatCount="indefinite" 
      begin="0.3"/>     
  </circle>
</svg>`;

    return generatedElement;
  }

  /**
   * Gere les effets sur l'image.
   */
  effetOnItem() {
    this.context.querySelectorAll(".img-wrapper").forEach((wrapper) => {
      wrapper.addEventListener("mouseenter", function () {
        this.querySelector(".img-overlay").style.opacity = 1;
      });
      wrapper.addEventListener("mouseleave", function () {
        this.querySelector(".img-overlay").style.opacity = 0;
      });
    });
  }
  /**
   * Affiche ou masque le loader.
   * @param {*} generatedElement
   * @param {*} show
   */
  toggleLoader(generatedElement, show = true) {
    generatedElement.loader.style.display = show ? "block" : "none";
    // si on affiche le loader, il ne doit pas avoir d'image.
    if (show) {
      generatedElement.image.classList.remove("show");
      generatedElement.image.setAttribute("src", "");
    }
  }
}

export default GalleryOverlay;
