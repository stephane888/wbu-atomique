// Gallery image hover
document.querySelectorAll(".img-wrapper").forEach(function (wrapper) {
    wrapper.addEventListener("mouseenter", function () {
        this.querySelector(".img-overlay").style.opacity = 1;
    });
    wrapper.addEventListener("mouseleave", function () {
        this.querySelector(".img-overlay").style.opacity = 0;
    });
});

// Lightbox
var overlay = document.createElement("div");
overlay.id = "overlay";
var image = document.createElement("img");
var prevButton = document.createElement("div");
prevButton.id = "prevButton";
prevButton.innerHTML = '<i class="fa fa-chevron-left"></i>';
var nextButton = document.createElement("div");
nextButton.id = "nextButton";
nextButton.innerHTML = '<i class="fa fa-chevron-right"></i>';
var exitButton = document.createElement("div");
exitButton.id = "exitButton";
exitButton.innerHTML = '<i class="fa fa-times"></i>';

overlay.appendChild(image);
overlay.appendChild(prevButton);
overlay.appendChild(nextButton);
overlay.appendChild(exitButton);
document.getElementById("gallery").appendChild(overlay);

overlay.style.display = "none";

document.querySelectorAll(".img-overlay").forEach(function (overlay) {
    overlay.addEventListener("click", function (event) {
        event.preventDefault();
        var imageLocation = this.previousElementSibling.getAttribute("href");
        image.src = imageLocation;
        overlay.style.display = "block";
    });
});

overlay.addEventListener("click", function () {
    this.style.display = "none";
});

nextButton.addEventListener("click", function (event) {
    image.style.display = "none";
    var currentImgSrc = image.getAttribute("src");
    var currentImg = document.querySelector('#image-gallery img[src="' + currentImgSrc + '"]');
    var nextImg = currentImg.closest(".image").nextElementSibling.querySelector("img");
    var images = document.querySelectorAll("#image-gallery img");
    if (nextImg) {
        image.src = nextImg.src;
        image.style.display = "block";
    } else {
        image.src = images[0].src;
        image.style.display = "block";
    }
    event.stopPropagation();
});

prevButton.addEventListener("click", function (event) {
    image.style.display = "none";
    var currentImgSrc = image.getAttribute("src");
    var currentImg = document.querySelector('#image-gallery img[src="' + currentImgSrc + '"]');
    var nextImg = currentImg.closest(".image").previousElementSibling.querySelector("img");
    image.src = nextImg.src;
    image.style.display = "block";
    event.stopPropagation();
});

exitButton.addEventListener("click", function () {
    overlay.style.display = "none";
});