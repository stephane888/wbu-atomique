const $ = (selectors) => { return document.querySelectorAll(selectors)}

const counters = $('.count-value')

counters.forEach((counter) => {
    counter.innerText = '0'
    

    const updateCounter = () => {
        const target = +counter.getAttribute('data-target')
        const c = +counter.innerText
        const increment = target / 200

        if (c < target ){
            counter.innerText = `${Math.ceil(c + increment)}`
            setTimeout(updateCounter, 55)
        }
    }
    updateCounter()
})
