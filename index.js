let doc = document
let wrap = document.querySelector('.wrap')
let btn_first_five = document.querySelector('.first_five')
let btn_show_all = document.querySelector('.show_all')
let section_h1 = document.querySelector('section h1')
let modal = document.querySelector('.modal')
let modal_opener = document.querySelector('.modal_opener')
let modal_close = document.querySelector('.modal_close')


let mainDiv_arr = []
let selected_products_count = 0
reload(arr)

function reload(arr) {
    for(let item of arr) {
        let mainDiv = doc.createElement('div')
        let mainImg = doc.createElement('img')
        let middleDiv = document.createElement('div')
        let h1 = doc.createElement('h1')
        let p = doc.createElement('p')
        let btn = doc.createElement('button')

        let bottomDiv = doc.createElement('div')
        let bottomDivBox1 = doc.createElement('div')
        let bottomDivBox2 = doc.createElement('div')
        let bottomDivBox3 = doc.createElement('div')

        let box1p = doc.createElement('p')
        let box2p = doc.createElement('p')
        let box3p = doc.createElement('p')
        let box1img = doc.createElement('img')
        let box2img = doc.createElement('img')
        let box3img = doc.createElement('img')

        mainDiv.classList.add('mainDiv')
        mainImg.classList.add('mainImg')
        middleDiv.classList.add('middleDiv')
        h1.classList.add('h1')
        p.classList.add('p')
        bottomDiv.classList.add('bottomDiv')
        bottomDivBox1.classList.add('bottomDivBox')
        bottomDivBox2.classList.add('bottomDivBox')
        bottomDivBox3.classList.add('bottomDivBox')
        box1p.classList.add('boxP')
        box2p.classList.add('boxP')
        box3p.classList.add('boxP')
        btn.classList.add('btn')
        box1img.classList.add('boxImg')
        box2img.classList.add('boxImg')
        box3img.classList.add('boxImg')

        mainImg.setAttribute('src', item.image)
        box1img.setAttribute('src', "./icons/price.svg")
        box2img.setAttribute('src', "./icons/star2.svg")
        box3img.setAttribute('src', "./icons/box.png")
        h1.innerHTML = `${item.category} (${item.rating.count})`
        p.innerHTML = item.description.length > 100 ? item.description.slice(0,90
            ) + "<b>...read</b>" : item.description
        box1p.innerHTML = item.price
        box2p.innerHTML = item.rating.rate
        box3p.innerHTML = item.rating.count
        btn.innerHTML = "В избранное"

        wrap.append(mainDiv)
        mainDiv.append(mainImg, middleDiv)
        middleDiv.append(h1, p, bottomDiv, btn)
        bottomDiv.append(bottomDivBox1, bottomDivBox2, bottomDivBox3)
        bottomDivBox1.append(box1img, box1p)
        bottomDivBox2.append(box2img, box2p)
        bottomDivBox3.append(box3img, box3p)


        mainDiv_arr.push(mainDiv)

        btn_first_five.onclick = () => {
            for(i=5; i<=mainDiv_arr.length; i++){
                mainDiv_arr[i].classList.add('none')
            }
        }

        btn_show_all.onclick = () => {
            mainDiv_arr.forEach(div => {
                div.classList.contains('none') ? div.classList.remove('none') : null
            })
        }

        btn.onclick = () => {
            if(!btn.classList.contains('selected')){
                selected_products_count++
                section_h1.innerHTML = `В корзине: ${selected_products_count} товар`
            }else{
                null
            }
            btn.classList.add('selected')
            btn.innerHTML = "Добавлено"
        }
    }
}

modal_opener.onclick = () => {
    modal.classList.remove('modal_close')
    modal.classList.add('modal_open')
}

modal_close.onclick = () => {
    modal.classList.remove('modal_open')
    modal.classList.add('modal_close')
}

