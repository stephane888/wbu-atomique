// Set the date we're counting down to
var counterElement = document.querySelector('#evenex-conference-countdown');
var countDownDate = new Date(counterElement.dataset.date).getTime();

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

    //display timer for each element
    document.getElementById("evenex-conference-countdown-days").innerHTML = days < 10 ? '0' + `${days}` : days;
    document.getElementById("evenex-conference-countdown-hours").innerHTML = hours < 10 ? '0' + `${hours}` : hours;
    document.getElementById("evenex-conference-countdown-minutes").innerHTML = minutes < 10 ? '0' + `${minutes}` : minutes;
    document.getElementById("evenex-conference-countdown-seconds").innerHTML = seconds < 10 ? '0' + `${seconds}` : seconds;

    // If the count down is finished, write some text
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("evenex-conference-countdown'").innerHTML = "The countdown is finished!";
    }
}, 1000);