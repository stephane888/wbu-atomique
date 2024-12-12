Drupal.behaviors.more_fields_video_with_converter = {
  attach: function (context, settings) {
    // On se rassure que l'element est present dans le context.
    if (context.querySelectorAll && context.querySelectorAll(".video-container")) {
      // On se rasure que l'element est lu 1 seule foix.
      /**
       * Permet de jourer la video.
       * @param {*} video
       */
      const playVideo = (video, play, pause) => {
        if (!video.paused) video.play();
        play.classList.add("btn-fade");
        play.classList.remove("btn-show");
        pause.classList.add("btn-show");
        pause.classList.remove("btn-fade");
        // On ajoute un delais avant de faire disparaitre le bouton pause.
        pause.classList.add("show_delay");
        setTimeout(() => {
          pause.classList.remove("show_delay");
        }, 2500);
      };
      /**
       *
       * @param {*} video
       */
      const pauseVideo = (video, play, pause) => {
        if (video.paused) video.pause();
        pause.classList.add("btn-fade");
        pause.classList.remove("btn-show");
        play.classList.add("btn-show");
        play.classList.remove("btn-fade");
        pause.classList.remove("show_delay");
      };
      const mutedVideo = (video, volumeHigh, volumeOff) => {
        if (video.muted) {
          volumeOff.classList.add("btn-show");
          volumeHigh.classList.remove("btn-show");
        } else {
          volumeHigh.classList.add("btn-show");
          volumeOff.classList.remove("btn-show");
        }
      };
      once("more_fields_video_with_converter", ".video-container", context).forEach((item) => {
        const eltControls = item.querySelector(".elt-controls");
        const play = item.querySelector(".play");
        const pause = item.querySelector(".pause");
        const volumeHigh = item.querySelector(".volume-high");
        const volumeOff = item.querySelector(".volume-off");
        const video = item.querySelector("video.videos_control");
        eltControls.style.display = "flex";
        // Si le paramettre autoplay=1
        // On rassure que la video a effectivement demarrer
        if (!video.paused) {
          playVideo(video, play, pause);
        }
        // On determiner le bouton à afficher
        video.addEventListener(
          "play",
          () => {
            playVideo(video, play, pause);
            // Si on joue la video, on doit pouvoir controler le volume.
            mutedVideo(video, volumeHigh, volumeOff);
          },
          false
        );
        video.addEventListener(
          "pause",
          () => {
            pauseVideo(video, play, pause);
          },
          false
        );
        video.addEventListener(
          "volumechange",
          () => {
            mutedVideo(video, volumeHigh, volumeOff);
          },
          false
        );
        //
        pause.addEventListener(
          "click",
          () => {
            video.pause();
          },
          false
        );
        play.addEventListener(
          "click",
          () => {
            video.play();
          },
          false
        );
        volumeOff.addEventListener(
          "click",
          () => {
            video.muted = false;
            video.volume = 0.5;
          },
          false
        );
        volumeHigh.addEventListener(
          "click",
          () => {
            video.muted = true;
          },
          false
        );
      });
    }
  },
};
