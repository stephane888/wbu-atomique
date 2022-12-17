import html2pdf from "html2pdf.js";
console.log("htlml-pdf");
(function () {
  alert("ee");
  var opt = {
    margin: 1,
    filename: "myfile.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 1 },
    jsPDF: { unit: "in", format: "a3", orientation: "portrait" },
  };
  function generatePdf(event) {
    event.preventDefault();
    var element = document.getElementsByClassName("page-orther-custom");
    if (element) html2pdf(element[0], opt);
  }
  document.getElementsByClassName("button-export-pdf-js").forEach((button) => {
    button.addEventListener("click", generatePdf);
  });
})();
