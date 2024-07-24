document.querySelectorAll('input[id*="edit-wishlist"').forEach(function (element) {
    console.log(element)
})

var callback = function (mutationsList) {
    for (var mutation of mutationsList) {
        console.log(mutation);
        if (mutation.type == "childList") {
            console.log("Un noeud enfant a été ajouté ou supprimé.");
        } else if (mutation.type == "attributes") {
            console.log("L'attribut '" + mutation.attributeName + "' a été modifié.");
        }
    }
};
var cards = document.querySelectorAll('div[class*="portrait"').forEach(function (element) {
    var config = { attributes: true, childList: true };
    const target = element;
    

    // Créé une instance de l'observateur lié à la fonction de callback
    var observer = new MutationObserver(callback);

    // Commence à observer le noeud cible pour les mutations précédemment configurées
    observer.observe(target, config);
});


(function (Drupal) {
    Drupal.behaviors.fashion_card = {
      attach: function (context, settings) {
        console.log(context);
      }
    }
  })(window.Drupal)

