(function () {
  console.log("il-action-card chargée");
  function selectAllElement() {
    let table = document.querySelectorAll(".bouton-quantity-card");
    if (table) {
      return Array.from(table);
    }
    return [];
  }
  function setInputIncrement(el) {
    let input = el.querySelector('input[data-input="quantity"');
    let value = parseInt(input.value, 10);
    const minVal = parseInt(input.min, 10);
    const maxVal = parseInt(input.max, 10);
    let increment = el.querySelector('[data-type="plus"]');
    let decrement = el.querySelector('[data-type="minus"]');
    if (input && increment && decrement) {
      increment.addEventListener("click", function (e) {
        e.preventDefault();
        //if(input.val)
        // if (input.value)

        if (!isNaN(input.valueAsNumber)) {
          if (!isNaN(maxVal) && input.valueAsNumber < maxVal) {
            input.valueAsNumber++;
          } else if (input.valueAsNumber > maxVal) {
            if (!isNaN(minVal)) {
              input.valueAsNumber = minVal;
            } else {
              input.valueAsNumber = 0;
            }
          } else if (!isNaN(maxVal) && input.valueAsNumber == maxVal) {
            if (!isNaN(minVal)) {
              input.valueAsNumber = minVal;
            } else {
              input.valueAsNumber = 0;
            }
          } else {
            input.valueAsNumber++;
          }
        } else {
          input.valueAsNumber = 0;
        }
      });
      decrement.addEventListener("click", function (e) {
        e.preventDefault();
        if (!isNaN(input.valueAsNumber)) {
          if (!isNaN(minVal) && input.valueAsNumber > minVal) {
            input.valueAsNumber--;
          } else if (!isNaN(minVal) && input.valueAsNumber <= minVal) {
            if (!isNaN(maxVal)) {
              input.valueAsNumber = maxVal;
            } else {
              input.valueAsNumber = minVal;
            }
          } else {
            input.valueAsNumber = 0;
          }
        } else {
          input.valueAsNumber = 0;
        }
      });
    }
  }

  window.addEventListener("load", function () {
    const allInput = selectAllElement();
    if (allInput.length) {
      for (let input of allInput) {
        setInputIncrement(input);
      }
    }
  });
})();
