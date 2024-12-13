const defaultSettings = {
  image_wrapper: {
    type: "class",
    value: "img-wrapper",
  },
  image_overlay: {
    type: "class",
    value: "image-overlay",
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

const switchShowElement = (element1, element2) => {
  if (element1.classList.contains("show")) {
    element1.classList.remove("show");
    element2.classList.add("show");
    return element2;
  } else {
    element1.classList.add("show");
    element2.classList.remove("show");
    return element1;
  }
};

class GalleryOverlay {
  constructor(context, settings = {}) {
    this.section = context;
    this.settings = settings;
  }

  /**
   * Construit le html au click et gere les transitions.
   */
  build() {
    this.effetOnItem();
    const settings = { ...defaultSettings, ...this.settings };
    const generatedElement = this.buildHtmlRender();
    const imagesOverlay = this.section.querySelectorAll(settings.image_overlay.selector + settings.image_overlay.value);
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
    generatedElement.overlay.prepend(generatedElement.prevButton);
    generatedElement.overlay.appendChild(generatedElement.imagesContainer);
    generatedElement.overlay.appendChild(generatedElement.nextButton);
    generatedElement.imagesContainer.appendChild(generatedElement.image);
    generatedElement.imagesContainer.appendChild(generatedElement.exitButton);
    generatedElement.imagesContainer.appendChild(generatedElement.loader);
    this.section.appendChild(generatedElement.overlay);
    // On appeche la propagation du click sur l'element parent.
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
      let imgRender = generatedElement.image;
      const currentImgSrc = imgRender.getAttribute("src");
      const currentImg = this.section.querySelector(gallerySelector + ' a[href="' + currentImgSrc + '"]');
      const nextElement = currentImg.closest(elementSelector).nextElementSibling;
      if (nextElement) {
        this.LoadImage(generatedElement, nextElement.querySelector("a.img-overlay").getAttribute("href"));
      } else {
        const images = this.section.querySelectorAll(gallerySelector + " a.img-overlay");
        if (images) this.LoadImage(generatedElement, images[0].getAttribute("href"));
      }
      event.stopPropagation();
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
      const currentImgSrc = generatedElement.image.getAttribute("src");
      const currentImg = this.section.querySelector(gallerySelector + ' a[href="' + currentImgSrc + '"]');
      const prevElement = currentImg.closest(elementSelector).previousElementSibling;
      if (prevElement) {
        this.LoadImage(generatedElement, prevElement.querySelector("a.img-overlay").getAttribute("href"));
      } else {
        const images = this.section.querySelectorAll(gallerySelector + " a.img-overlay");
        if (images) this.LoadImage(generatedElement, images[images.length - 1].getAttribute("href"));
      }
      event.stopPropagation();
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
        this.OpenPopup(generatedElement);
        this.LoadImage(generatedElement, event.target.getAttribute("href"));
      });
    });
  }

  /**
   * Charge et affiche la nouvelle image.
   * @param {*} location
   * @returns
   */
  LoadImage(generatedElement, location) {
    return new Promise((resolv) => {
      this.toggleLoader(generatedElement, true);
      const img = document.createElement("img");
      img.addEventListener("load", () => {
        setTimeout(() => {
          generatedElement.imagesContainer.style.width = img.naturalWidth + "px";
          generatedElement.imagesContainer.style.height = img.naturalHeight + "px";
          generatedElement.image.setAttribute("src", img.src);
          generatedElement.image.classList.add("show");
          this.toggleLoader(generatedElement, false);
          resolv(img);
        }, 100);
      });
      img.src = location;
    });
  }
  /**
   * Ferme le popup
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
    generatedElement.prevButton.className = "gallery-overlay-section-btn-prev";
    generatedElement.prevButton.innerHTML =
      '<svg fill="#fff" width="150" height="150" viewBox="-1.5 -0.938 4.5 4.5" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin" class="jam jam-chevron-right" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" transform="matrix(-1,0,0,-1,0,0)"><path d="M.996 1.326.068.398A.188.188 0 0 1 .333.133l1.061 1.061a.19.19 0 0 1 0 .265L.333 2.52a.188.188 0 0 1-.265-.265z"></path></svg>';
    generatedElement.nextButton.className = "gallery-overlay-section-btn-next";
    generatedElement.nextButton.innerHTML =
      '<svg fill="#fff" width="150" height="150" viewBox="-1.5 -0.938 4.5 4.5" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin" class="jam jam-chevron-right"><path d="M.996 1.326.068.398A.188.188 0 0 1 .333.133l1.061 1.061a.19.19 0 0 1 0 .265L.333 2.52a.188.188 0 0 1-.265-.265z"/></svg>';
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
    this.section.querySelectorAll(".img-wrapper").forEach((wrapper) => {
      wrapper.addEventListener("mouseenter", function () {
        this.querySelector(".img-overlay").style.opacity = 1;
      });
      wrapper.addEventListener("mouseleave", function () {
        this.querySelector(".img-overlay").style.opacity = 0;
      });
    });
  }
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
