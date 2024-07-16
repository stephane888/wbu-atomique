import { EditorView, basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { sass } from "@codemirror/lang-sass";
import "./manage-custom-styles_codemirror.scss";
(function (Drupal) {
  Drupal.behaviors.generate_style_theme = {
    attach: function (context, settings) {
      /**
       * @see https://codemirror.net/docs/migration/#codemirror.fromtextarea
       * @param {*} textarea
       * @param {*} extensions
       * @returns
       */
      const editorFromTextArea = (textarea, extensions) => {
        const view = new EditorView({
          doc: textarea.value,
          extensions,
          // ces elements ne fonctionnent pas.( mais juste pour permettre de pouvoir ajouter le fullScreen.)
          // lineNumbers: true,
          // theme: "night",
          // extraKeys: {
          //   F11: function (cm) {
          //     alert("dsd");
          //     cm.setOption("fullScreen", !cm.getOption("fullScreen"));
          //   },
          //   Esc: function (cm) {
          //     alert("dsd225");
          //     if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
          //   },
          // },
        });
        textarea.parentNode.insertBefore(view.dom, textarea);
        textarea.style.display = "none";
        if (textarea.form)
          textarea.form.addEventListener("submit", () => {
            textarea.value = view.state.doc.toString();
          });
        // Permet de faire les tests sui l'object EditorView afin de mieux comprendre son fonctionnement.
        window.current_mirror_editor = view;
        return view;
      };
      const addEditorOnTextarea = (textarea) => {
        var EditorView;
        if (!textarea.classList.contains("code_mirror_loaded")) {
          textarea.classList.add("code_mirror_loaded");
          if (textarea.classList.contains("lang_js")) {
            EditorView = editorFromTextArea(textarea, [basicSetup, javascript()]);
          } else if (textarea.classList.contains("lang_scss")) {
            EditorView = editorFromTextArea(textarea, [basicSetup, sass()]);
            // console.log("EditorView : ", EditorView);
          }
        }
        return EditorView;
      };
      if (context.querySelectorAll && context.querySelectorAll("textarea.codemirror").length) {
        const textareas = context.querySelectorAll("textarea.codemirror");
        textareas.forEach((textarea) => {
          /**
           * verifie si l'element se trouve dans un balise hiden(example :"details")
           * ( car dans ces conditions, l'editeur ne fonctionnera pas si c'est fermé ).
           */
          const details = textarea.closest("details");
          if (details) {
            // Cela ne fonctionne pas correctement dans les layouts definit au niveau builder peut etre du a ajax ou a un autre paramettre.
            details.addEventListener("toggle", () => {
              setTimeout(() => {
                if (details.hasAttribute("open")) {
                  addEditorOnTextarea(textarea);
                }
              }, 700);
            });
          } else addEditorOnTextarea(textarea);
        });
      }
    },
  };
})(window.Drupal);
