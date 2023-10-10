let doc = document
let wrap = document.querySelector('.wrap')
let btn_first_five = document.querySelector('.first_five')
let btn_show_all = document.querySelector('.show_all')
let section_h1 = document.querySelector('section h1')
let modal = document.querySelector('.modal')
let modal_opener = document.querySelector('.modal_opener')
let modal_close = document.querySelector('.modal_close')
let scrolable = document.querySelector('.scrolable')

let mainDiv_arr = []

let selected_products_count = 0
let busket = []
let selected_btns = []
let allbtns = []

reload(arr)


function reload(arr) {
    for (let item of arr) {
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
        p.innerHTML = item.description.length > 100 ? item.description.slice(0, 90
        ) + "<b>...read</b>" : item.description
        box1p.innerHTML = item.price
        box2p.innerHTML = item.rating.rate
        box3p.innerHTML = item.rating.count
        btn.innerHTML = "В избранное"
        btn.setAttribute("id", item.id)
        allbtns.push(btn)


        wrap.append(mainDiv)
        mainDiv.append(mainImg, middleDiv)
        middleDiv.append(h1, p, bottomDiv, btn)
        bottomDiv.append(bottomDivBox1, bottomDivBox2, bottomDivBox3)
        bottomDivBox1.append(box1img, box1p)
        bottomDivBox2.append(box2img, box2p)
        bottomDivBox3.append(box3img, box3p)


        mainDiv_arr.push(mainDiv)

        btn_first_five.onclick = () => {
            for (i = 5; i <= mainDiv_arr.length; i++) {
                mainDiv_arr[i].classList.add('none')
            }
        }

        btn_show_all.onclick = () => {
            mainDiv_arr.forEach(div => {
                div.classList.contains('none') ? div.classList.remove('none') : null
            })
        }

        btn.onclick = () => {
            if (!btn.classList.contains('selected')) {
                // selected_products_count++
                busket.push(item.id)
                section_h1.innerHTML = `В корзине: ${busket.length} товар`
                btn.classList.add('selected')
                btn.innerHTML = "Добавлено"
                selected_btns.push(btn)

            } else {
                btn.classList.remove('selected')
                btn.innerHTML = "В избранное"
                // selected_products_count--
                busket = busket.filter(id => id !== item.id)
                section_h1.innerHTML = `В корзине: ${busket.length} товар`
                
            }
            busket_reload(busket)
        }

    }
}

busket_reload(busket)

function busket_reload(ids_arr) {
    scrolable.innerHTML = ""
    let temp = []


    for (let item of arr) {
        for (let id of ids_arr) {
            if (id == item.id) {
                temp.push(item)
            }
        }

    }

    for (let item of temp) {

        let main_item = document.createElement('div')
        let item_left = document.createElement('div')
        let img = document.createElement('img')
        let left_text = document.createElement('div')
        let h5 = document.createElement('h5')
        let p_type = document.createElement('p')
        let item_right = document.createElement('div')
        let count = document.createElement('div')
        let p_minus = document.createElement('p')
        let p_num = document.createElement('p')
        let p_plus = document.createElement('p')
        let p_price = document.createElement('p')
        let button_remove = document.createElement('button')


        main_item.classList.add('main_item')
        item_left.classList.add('item_left')
        img.setAttribute('src', item.image)
        img.alt = ""
        left_text.classList.add('left_text')
        h5.innerHTML = item.category.toUpperCase()
        p_type.classList.add('p_type')
        p_type.innerHTML = item.title
        item_right.classList.add('item_right')
        count.classList.add('count')
        let numcount = 1
        p_minus.classList.add('p_minus')
        p_minus.innerHTML = "-"
        p_num.classList.add('p_num')
        p_num.innerHTML = numcount
        p_plus.classList.add('p_plus')
        p_plus.innerHTML = "+"
        p_price.classList.add('p_price')
        p_price.innerHTML = `$${item.price}`
        button_remove.classList.add('button_remove')
        button_remove.innerHTML = "remove"


        scrolable.append(main_item)
        main_item.append(item_left, item_right)
        item_left.append(img, left_text)
        left_text.append(h5, p_type)

        item_right.append(count, p_price, button_remove)
        count.append(p_minus, p_num, p_plus)

        p_plus.onclick = () => {
            numcount++
            p_num.innerHTML = numcount
            p_price.innerHTML = `$${numcount * item.price}`
        }

        p_minus.onclick = () => {
            if (numcount !== 1) {
                numcount--
                p_num.innerHTML = numcount
                p_price.innerHTML = `$${numcount * item.price}`
            }
        }

        button_remove.onclick = () => {
            main_item.remove()
            busket = busket.filter(id => id !== item.id)
            section_h1.innerHTML = `В корзине: ${busket.length} товар`
            selected_btns.forEach(btn => {
                btn.classList.remove('selected')
                btn.innerHTML = "В избранное"
            })

            selected_btns.forEach(btn => {
                busket.forEach(num => {
                    if (btn.id == num) {
                        btn.classList.add('selected')
                        btn.innerHTML = "Добавлено"
                        
                    }
                })

            })

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

