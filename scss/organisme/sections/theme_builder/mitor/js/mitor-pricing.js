(function () {
  console.log("pricing-increment chargée");
  function selectAllElement() {
    let table = document.querySelectorAll(".er-handler");
    if (table) {
      return Array.from(table);
    }
    return [];
  }
  function setInputIncrement(el) {
    let input = el.querySelector('input[data-input="quantity"');
    input.setAttribute("min", 1);
    input.setAttribute("max", 10);

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
        let realVal = parseInt(input.value, 10);
        if (realVal + 1 <= maxVal) {
          input.value++;
        } else {
          input.value = minVal;
        }
      });
      decrement.addEventListener("click", function (e) {
        e.preventDefault();
        let realVal = parseInt(input.value, 10);
        if (realVal - 1 > minVal) {
          input.value--;
        } else {
          input.value = minVal;
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
