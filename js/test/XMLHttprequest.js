/**
 * --
 * @returns
 */
function makeRequest(datas, methode = "POST", Route) {
  return new Promise((resolv) => {
    httpRequest = new XMLHttpRequest();
    if (!httpRequest) {
      alert(
        "Svp, veillez mettre à jour votre navigateur ou contactez notre support technique"
      );
      return false;
    }
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
          resolv(true);
        } else {
          //alert(" Il y a eu un problème avec la requête. ");
          console.log("error in request ", httpRequest);
        }
      }
    };
    httpRequest.open(methode, Route);
    httpRequest.setRequestHeader("Content-Type", "application/json");
    httpRequest.send(JSON.stringify(datas));
  });
}

makeRequest(
  {
    test: "test",
    other: "other",
  },
  "POST",
  "https://my.nutribe.fr/shopify/manage-clients-reviews.php"
).then((result) => {
  console.log("request ok ", result);
});
