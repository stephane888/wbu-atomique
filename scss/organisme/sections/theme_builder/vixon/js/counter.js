/** */
(function (Drupal) {
  Drupal.behaviors.vixcon = {
    attach: function (context, settings) {
      if (context.querySelectorAll && context.querySelectorAll(".vixon-counter-section").length) {
        once("vixcon-count-day", ".vixon-counter-section", context).forEach((item) => {
          var time = item.querySelector(".counter-day time");
          if (time) {
            time = time.getAttribute("datetime");
            // Set the date we're counting down to
            var countDownDate = new Date(time);
            if (countDownDate) {
              countDownDate = countDownDate.getTime();
              // Update the count down every 1 second
              var x = setInterval(function () {
                // Get today's date and time
                var now = new Date().getTime();
                // Find the distance between now and the count down date
                var distance = countDownDate - now;
                // Time calculations for days, hours, minutes and seconds
                var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                // Display timer for each element
                context.querySelector(".nicamexCounterDays").innerHTML = days < 10 ? "0" + `${days}` : days;
                context.querySelector(".nicamexCounterHours").innerHTML = hours < 10 ? "0" + `${hours}` : hours;
                context.querySelector(".nicamexCounterMinutes").innerHTML = minutes < 10 ? "0" + `${minutes}` : minutes;
                context.querySelector(".nicamexCounterSeconds").innerHTML = seconds < 10 ? "0" + `${seconds}` : seconds;
                // If the count down is finished, write some text
                if (distance < 0) {
                  clearInterval(x);
                  context.querySelector("nicamexCounter").innerHTML = "The countdown is finished!";
                }
              }, 1000);
            }
          }
        });
      }
    },
  };
})(window.Drupal);
