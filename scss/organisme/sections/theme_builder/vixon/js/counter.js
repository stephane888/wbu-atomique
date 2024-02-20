(function (Drupal) {
  // var countDownDate = new Date("Nov 28, 2024 00:00:00").getTime();

  // // Update the count down every 1 second
  // var x = setInterval(function () {
  //   // Get today's date and time
  //   var now = new Date().getTime();

  //   // Find the distance between now and the count down date
  //   var distance = countDownDate - now;

  //   // Time calculations for days, hours, minutes and seconds
  //   var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  //   var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  //   var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  //   var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  //   //display timer for each element
  //   document.getElementById("nicamexCounterDays").innerHTML = days < 10 ? "0" + `${days}` : days;
  //   document.getElementById("nicamexCounterHours").innerHTML = hours < 10 ? "0" + `${hours}` : hours;
  //   document.getElementById("nicamexCounterMinutes").innerHTML = minutes < 10 ? "0" + `${minutes}` : minutes;
  //   document.getElementById("nicamexCounterSeconds").innerHTML = seconds < 10 ? "0" + `${seconds}` : seconds;

  //   // If the count down is finished, write some text
  //   if (distance < 0) {
  //     clearInterval(x);
  //     document.getElementById("nicamexCounter").innerHTML = "The countdown is finished!";
  //   }
  // }, 1000);

  /**
   * --
   */
  Drupal.behaviors.vixcon = {
    attach: function (context, settings) {
      const runDateDisplay = (countDownDate, counterContext) => {
        const x = setInterval(function () {
          var now = new Date().getTime();
          var distance = countDownDate - now;
          console.log("difference : ", countDownDate, now);
          var days = Math.floor(distance / (1000 * 60 * 60 * 24));
          var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = Math.floor((distance % (1000 * 60)) / 1000);
          //display timer for each element
          counterContext.querySelector(".nicamexCounterDays").innerHTML = "00";
          counterContext.querySelector(".nicamexCounterHours").innerHTML = "00";
          counterContext.querySelector(".nicamexCounterMinutes").innerHTML = "00";
          counterContext.querySelector(".nicamexCounterSeconds").innerHTML = "00";
          // If the count down is finished, write some text
          if (distance < 0) {
            clearInterval(x);
            counterContext.querySelector(".nicamexCounter").classList.remove("d-none");
          } else {
            //display timer for each element
            counterContext.querySelector(".nicamexCounterDays").innerHTML = days < 10 ? "0" + `${days}` : days;
            counterContext.querySelector(".nicamexCounterHours").innerHTML = hours < 10 ? "0" + `${hours}` : hours;
            counterContext.querySelector(".nicamexCounterMinutes").innerHTML = minutes < 10 ? "0" + `${minutes}` : minutes;
            counterContext.querySelector(".nicamexCounterSeconds").innerHTML = seconds < 10 ? "0" + `${seconds}` : seconds;
          }
        }, 1000);
      };
      const counters = context.querySelectorAll ? context.querySelectorAll(".vixon-counter-section") : [];
      if (counters)
        counters.forEach((counter) => {
          const tagTime = counter.querySelector(".counter-day time");
          if (tagTime) {
            var countDownDate = new Date(tagTime.getAttribute("datetime")).getTime();
            runDateDisplay(countDownDate, counter);
          }
        });
    },
  };
})(window.Drupal);
