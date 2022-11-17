document.querySelectorAll(".product-gallery").forEach((carousel) => {
  const items = carousel.querySelectorAll(".product-gallery__image");

  const buttons = carousel.querySelectorAll(".product-gallery__bullets_item");

  buttons.forEach((button, i) => {
    button.addEventListener("click", () => {
      // un-select all the items
      items.forEach((item) =>
        item.classList.remove("product-gallery__image_selected")
      );
      buttons.forEach((button) =>
        button.classList.remove("product-gallery__bullets_item_selected")
      );

      // select the first element by default
      items[i].classList.add("product-gallery__image_selected");
      button.classList.add("product-gallery__bullets_item_selected");
    });
  });

  // select the first element by default
  items[0].classList.add("product-gallery__image_selected");
  buttons[0].classList.add("product-gallery__bullets_item_selected");
});
