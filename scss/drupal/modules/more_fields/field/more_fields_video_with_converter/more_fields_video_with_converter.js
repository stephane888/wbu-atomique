// On a cette erreur qui est recurrente : Uncaught (in promise) AbortError: The play() request was interrupted by a call to pause()
Drupal.behaviors.more_fields_video_with_converter = {
  attach: function (context, settings) {
    // On se rassure que l'element est present dans le context.
    if (context.querySelectorAll && context.querySelectorAll(".video-container")) {
      // On se rasure que l'element est lu 1 seule foix.
      /**
       * Permet de jourer la video.
       * @param {*} video
       */
      const playVideo = (video, play, pause, key = null) => {
        console.log("function : playVideo. \n video en pause : ", video.paused, "\n key : ", key);
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
      const pauseVideo = (video, play, pause, key = null) => {
        console.log("function : pauseVideo. \n video en pause : ", video.paused, "\n key : ", key);
        pause.classList.add("btn-fade");
        pause.classList.remove("btn-show");
        play.classList.add("btn-show");
        play.classList.remove("btn-fade");
        pause.classList.remove("show_delay");
      };

      /**
       *
       * @param {*} video
       * @param {*} volumeHigh
       * @param {*} volumeOff
       */
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
        if (eltControls) {
          const dataSettings = eltControls.getAttribute("data-settings") ? JSON.parse(eltControls.getAttribute("data-settings")) : {};
          //console.log("dataSettings : ", dataSettings);
          const configs = {
            read_auto: true, // Lit la video de maniere automatique.
            muted: false, // son desactivé par defaut
            read_mouse_enter: true, //  Demarre la lecture si le cuiseur survol la video.
            stop_video_over_display: true, // Stop la video si'elle n'est plus dans la zone visible (50%)
            start_video_is_display: false,
            show_custom_control: true,
            ...dataSettings,
          };
          // Ajustement de la config
          if (configs.read_auto && configs.read_mouse_enter) configs.read_auto = 0;
          const play = item.querySelector(".play");
          const pause = item.querySelector(".pause");
          const volumeHigh = item.querySelector(".volume-high");
          const volumeOff = item.querySelector(".volume-off");
          const video = item.querySelector("video.videos_control");
          eltControls.style.display = "flex";
          console.log("configs : ", configs, "\n Video en pause : ", video.paused);
          if (configs.show_custom_control) {
            if (!configs.read_auto) {
              if (!video.paused) {
                video.pause();
              }
              // La video etant en pause on doit l'initialiser.
              pauseVideo(video, play, pause, "Initialisation");
            }
            if (configs.read_auto && video.paused) {
              // Si le paramettre autoplay=1
              // On se rassure que la video a effectivement demarrer.
              video.play();
              // Si on joue la video, on doit pouvoir controler le volume.
              mutedVideo(video, volumeHigh, volumeOff);
            }
            // lit la video au survol
            if (configs.read_mouse_enter)
              video.addEventListener(
                "mouseenter",
                () => {
                  if (configs.read_mouse_enter) {
                    video.play();
                    // Si on joue la video, on doit pouvoir controler le volume.
                    mutedVideo(video, volumeHigh, volumeOff);
                  }
                },
                false
              );
            // On determiner le bouton à afficher
            video.addEventListener(
              "play",
              () => {
                playVideo(video, play, pause, "event lister play");
                // Si on joue la video, on doit pouvoir controler le volume.
                mutedVideo(video, volumeHigh, volumeOff);
              },
              false
            );
            video.addEventListener(
              "pause",
              () => {
                pauseVideo(video, play, pause, "Event lister pause ...");
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
                // lorsqu'on met une video en pause on doit desactiver mouseEnter Read.
                configs.read_mouse_enter = false;
                // On retire l'evement "mouseenter"
                video.removeEventListener(
                  "mouseenter",
                  () => {
                    console.log("evenement mousedown retirer ");
                  },
                  false
                );
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
            //
            // Créez un observateur d'intersection
            const observer = new IntersectionObserver(
              (entries) => {
                entries.forEach((entry) => {
                  if (!entry.isIntersecting) {
                    !video.pause();
                  }
                });
              },
              {
                threshold: 0.5, // Ajustez ce seuil selon vos besoins
              }
            );
            // Observez la vidéo
            observer.observe(video);
          }
        }
      });
    }
  },
};
