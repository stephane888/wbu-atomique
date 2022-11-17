console.log("me")
const $ = (element) => { return document.querySelector(element) }

let longtext = $(".card-text").innerText
if (longtext.length >= 15) {
    let longer = longtext.length>15
    let shotText = longtext.replace(longer, '...')
    console.log(longer)
} else {
    
}

console.log(longtext.length)