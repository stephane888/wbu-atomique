class whatsappMessage {
    constructor(context) {
        this.context = context;
    }
    init() {
        console.log(this.context, "texte de debugg");
        this.context.querySelectorAll(".whatsapp-widget").forEach(whatsappElement => {
            this.closebox(whatsappElement);
            this.envoyerMessage(whatsappElement);
            this.toggleWhatsappChat(whatsappElement);
        });
    }
    toggleWhatsappChat(whatsappElement) {
        whatsappElement.querySelector(".whatsapp-btn").addEventListener("click", function () {
            whatsappElement.querySelector(".whatsapp-chat").style.display = "block";  // Affiche la zone de message
            whatsappElement.querySelector(".whatsapp-btn").style.display = "none";   // Cache le bouton WhatsApp
        });
    };

    envoyerMessage(whatsappElement) {
        whatsappElement.querySelector(".whatsapp-message-btn").addEventListener("click", function (event) {
            event.preventDefault();
            var message = whatsappElement.querySelector(".whatsapp-message").value;
            var numero = "+237658647156";  // Remplace par ton numéro WhatsApp
            var url = "https://wa.me/" + numero + "?text=" + encodeURIComponent(message);
            window.open(url, "_blank");  // Ouvre WhatsApp avec le message
        })
    };

    closebox(whatsappElement) {
        whatsappElement.querySelector(".icone-close").addEventListener("click", function () {
            whatsappElement.querySelector(".whatsapp-chat").style.display = "none"; // Cache la zone de message
            whatsappElement.querySelector(".icone-close").style.display = "block"; // Réaffiche le bouton WhatsApp
        });
    }

}
export default whatsappMessage;