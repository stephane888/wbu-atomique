//fonction permettante de reduit au maximum la syntaxe du DOM 
const $$ = (selector) => { return document.querySelectorAll(selector)}

const counters = $$('.number')
//parcour de chaque element du html qui porte la classe (number)
counters.forEach((number) => {
    //reinitalisation de la constante
    counters.innerText = '0'
    //fonction permetante d'effectuer le countDown
    const updateCounter = () => {
        const target = +number.getAttribute('data-target')
        const c = +number.innerText
        const increment = target / 500
        if (c < target) {
            number.innerText = `${Math.ceil(c + increment)}`
            setTimeout(updateCounter, 1);
        }else{
            number.innerText = target
        }
    }
    updateCounter()
})
console.log("hello mother fucker")