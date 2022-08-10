const $ = (selector) => { return document.querySelector(selector) }
let monthly = $('#monthly')
let yearly = $('#yearly')

monthly.onclick = () => {
    if (monthly.classList[1] == 'target') {
        monthly.classList.remove("target")
        monthly.classList.add('untarget')
        yearly.classList.remove('untarget')  
        yearly.classList.add('target')
    }
     if(monthly.classList[1] == 'untarget') {
        monthly.classList.remove("untarget")
        monthly.classList.add('target')    
        yearly.classList.remove('target')  
        yearly.classList.add('untarget')
    }
}

yearly.onclick = () => {
    if (yearly.classList[1] == 'target') {
        yearly.classList.remove("target")
        yearly.classList.add('untarget')
        monthly.classList.remove('untarget')  
        monthly.classList.add('target')
    } 
     if(yearly.classList[1] == 'untarget') {
        yearly.classList.remove("untarget")
        yearly.classList.add('target')    
        monthly.classList.remove('target')  
        monthly.classList.add('untarget')
    }
}