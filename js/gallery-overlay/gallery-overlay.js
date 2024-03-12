// Gallery image hover
import $ from "jquery"


const defaultSettings = {
    image_wrapper: {
        type: "class",
        value: "img-wrapper"
    },
    image_overlay: {
        type: "class",
        value: "image-overlay"
    },
    overlay: {
        type: "id",
        value: "overlay"
    },

    prevButton: {
        type: "id",
        value: "prevButton"
    },
    nextButton: {
        type: "id",
        value: "nextButton"
    },
    exitButton: {
        type: "id",
        value: "exitButton"
    },
    image: {
        type: "class",
        value: ""
    },
    section: {
        selector: "#",
        value: "gallery"
    },
    galleryContainer: {
        selector: "#",
        value: "image-gallery"
    },
    image_overlay: {
        selector: ".",
        value: "img-overlay"
    },
    fade_time: 100
}


class GalleryOverlay {


    /**
   *
   * @param { Element | Document} context Le html ou node ou on doit aller chercher les sliders.
   * @param {Object} settings configuration de base de tous les sliders.
   */
    constructor(context = null, settings = {}) {
        if (context) {
            this.context = context;
        }
        else {
            this.context = document;
        }
        this.settings = settings;
    }


    build() {

        $(".img-wrapper").hover(
            function () {
                $(this).find(".img-overlay").animate({ opacity: 1 }, 600);
            }, function () {
                $(this).find(".img-overlay").animate({ opacity: 0 }, 600);
            }
        );

        const settings = { ...defaultSettings, ...this.settings };
        /**
         * @var {Array < Element | Document >} $generatedElement
         */
        const $generatedElement = {

            overlay: $('<div class="gallery-overlay-section-overlay"></div>'),
            image: $('<img class="gallery-overlay-section-current-image"=>'),
            prevButton: $('<div class="gallery-overlay-section-btn-prev"><i class="fa fa-chevron-left"></i></div>'),
            nextButton: $('<div class="gallery-overlay-section-btn-next"><i class="fa fa-chevron-right"></i></div>'),
            exitButton: $('<div class="gallery-overlay-section-btn-exit><i class="fa fa-times"></i></div>')
        }

        const $section = $(settings.section.selector + settings.section.value);
        const $imagesOverlay = $(settings.image_overlay.selector + settings.image_overlay.value);
        const $gallerySelector = settings.galleryContainer.selector + settings.galleryContainer.value;
        //adding class and id 
        for (const key in $generatedElement) {
            if ($generatedElement[key]) {
                if (settings[key].type == "class") {
                    $generatedElement[key].addClass(settings[key].value);
                }
                else {
                    $generatedElement[key].attr(settings[key].type, settings[key].value);
                }
            }
        }

        document.generatedElement = $generatedElement
        // Add overlay
        $generatedElement.overlay.append($generatedElement.image).prepend($generatedElement.prevButton).append($generatedElement.nextButton).append($generatedElement.exitButton);
        $section.append($generatedElement.overlay);

        // Hide overlay on default
        $generatedElement.overlay.hide();

        // When an image is clicked
        $imagesOverlay.click(function (event) {
            // Prevents default behavior
            event.preventDefault();
            // Adds href attribute to variable
            var imageLocation = $(this).prev().attr("href");
            // Add the image src to $generatedElement.image
            $generatedElement.image.attr("src", imageLocation);
            // Fade in the overlay
            $generatedElement.overlay.fadeIn("slow");
        });

        // When the overlay is clicked
        $generatedElement.overlay.click(function () {
            // Fade out the overlay
            $(this).fadeOut("slow");
        });

        // When next button is clicked
        $generatedElement.nextButton.click(function (event) {
            // Hide the current image
            $generatedElement.image.hide();
            // Overlay image location
            var $currentImgSrc = $generatedElement.image.attr("src");
            // Image with matching location of the overlay image
            var $currentImg = $($gallerySelector + ' a[href="' + $currentImgSrc + '"]');
            // Finds the next image
            var $nextImg = $($currentImg.closest('.base-image-container').next().find('a'));
            // If there is a next image
            if ($nextImg.length > 0) {
                // Fade in the next image
                var imageLocation = $nextImg.prev().attr("href");
                console.log({ "next": $nextImg, "location": imageLocation });
                $generatedElement.image.attr("src", $nextImg.attr("href")).fadeIn(settings.fade_time);
            } else {
                // Otherwise fade in the first image
                var $images = $($gallerySelector + ' a');
                $generatedElement.image.attr("src", $($images[0]).attr("href")).fadeIn(settings.fade_time);
            }
            // Prevents overlay from being hidden
            event.stopPropagation();
        });

        // When previous button is clicked
        $generatedElement.prevButton.click(function (event) {
            // Hide the current image
            $generatedElement.image.hide();
            // Overlay image location
            var $currentImgSrc = $generatedElement.image.attr("src");
            // Image with matching location of the overlay image
            var $currentImg = $($gallerySelector + ' a[href="' + $currentImgSrc + '"]');
            // Finds the next image
            var $nextImg = $($currentImg.closest(".base-image-container").prev().find("a"));
            // Fade in the next image
            if ($nextImg.length > 0) {
                // Fade in the next image
                var imageLocation = $nextImg.prev().attr("href");
                console.log({ "next": $nextImg, "location": imageLocation });
                $generatedElement.image.attr("src", $nextImg.attr("href")).fadeIn(settings.fade_time);
            } else {
                // Otherwise fade in the last image
                var $images = $($gallerySelector + ' a');
                $generatedElement.image.attr("src", $($images.slice(-1)[0]).attr("href")).fadeIn(settings.fade_time);
            }
            // Prevents overlay from being hidden   
            event.stopPropagation();
        });

        // When the exit button is clicked
        $generatedElement.exitButton.click(function () {
            // Fade out the overlay
            $generatedElement.overlay.fadeOut("slow");
        });
    }
}

export default GalleryOverlay;
