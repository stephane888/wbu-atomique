const controllerClassName = 'video-play-button'
const playClass = "video-onplay"
const pauseClass = "video-onpause"

const changeLectureState = (parent, video) => {
    if (video.paused) {
        video.play();
        if (!parent.classList.replace(pauseClass, playClass)) {
            parent.classList.add(playClass);
        }
    }
    else {
        video.pause();
        if (!parent.classList.replace(playClass, pauseClass)) {
            parent.classList.add(pauseClass);
        }
    }
}

const controllers = document.getElementsByClassName(controllerClassName);
Array.from(controllers).forEach((controller) => {
    controller.addEventListener("click", () => {
        const sibling = controller.nextElementSibling;
        if (sibling) {

            if (sibling.tagName == "VIDEO") {
                changeLectureState(controller, sibling);
            }
            else {
                changeLectureState(controller, sibling.firstElementChild);
            }
        }
    })
})