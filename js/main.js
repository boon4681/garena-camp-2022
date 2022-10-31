/**
 * @param {Element} ele 
 * @param {IntersectionObserverCallback} func
 * @param {IntersectionObserverInit} options
 */
const onVisible = (ele, func, options) => {
    const observer = new IntersectionObserver(func, options)
    observer.observe(ele)
}

/**
 * @param {Element} root 
 */
const review = (root) => {
    root.classList.add('review')
    const img = root.querySelector('img')
    img.src = img.src.replace('-mask', '')
}


/**
 * @param {HTMLAnchorElement} ele,
 * @param {string[]} classList
 */
const linkActive = (ele, classList) => {
    const check_activate = () => {
        const href = new URL(ele.href)
        if (href.pathname === location.pathname || (href.pathname === '/index.html' && location.pathname === '/')) {
            typeof classList === 'object' ? ele.classList.add(...classList) : ele.classList.add(classList)
        }
        window.removeEventListener('load', this)
    }
    window.addEventListener('load', check_activate)
}

[...document.querySelectorAll('.link-active')].forEach(a => {
    linkActive(a, 'focus')
})

const a = [...document.querySelectorAll("div[id*=minigame-animal-]")];
a.forEach(a => {
    a.onclick = (e) => {
        e.preventDefault()
        shake(a, 5, 5, 5, 50, 15)
    }
    a.ondragstart = (e) => {
        e.preventDefault()
    }
})


/**
 * 
 * @param {HTMLDivElement} slider
 * @param {Object} data
 */
const carousel = (slider, data) => {
    const lists = slider.querySelector('div.slider-list')
    const btnLeft = slider.querySelector('div.arrow.left')
    const btnRight = slider.querySelector('div.arrow.right')
    lists.style.width = `${(data.length + 2) * 100}vw`
    let is_end = true
    const slide = async (i) => {
        if (!is_end) return;
        let items = lists.querySelectorAll('div.slide')
        let copy = [...items]
        const view = lists.querySelector('div.slide.view')
        let now = copy.indexOf(view)
        let j = now + i
        let shift = false
        if (j == 0 && i < 0) {
            now = copy.length - 1
            shift = true
        }
        if (j == copy.length - 1 && i > 0) {
            now = 0
            shift = true
        }
        let n = (now + i)
        copy[n].classList.add('view')
        view.classList.remove('view')
        lists.ontransitionend = () => {
            if (shift) {
                lists.style.transition = 'all 0s'
                lists.style.transform = `translateX(${-n}00vw)`
                setTimeout(() => {
                    lists.style.transition = 'transform 0.65s'
                }, 1)
                lists.removeEventListener('transformed', this)
                shift = false
            }
            is_end = true
        }
        if (shift) {
            lists.style.transform = `translateX(${-j}00vw)`
        } else {
            lists.style.transform = `translateX(${-n}00vw)`
        }
        is_end = false
    }
    btnLeft.onclick = () => {
        slide(-1)
    }
    btnRight.onclick = () => {
        slide(1)
    }
    const createSlide = (i, data) => {
        const { icon, name, genre, clone } = data
        let images = [...data.images]
        if (images.length > 4) images.pop()
        const ele = document.createElement('div')
        lists.appendChild(ele)

        let startX = 0
        let lastX = 0
        let startY = 0
        let onDrag = false

        const dragStart = (e) => {
            if (!is_end) return;
            lists.style.transition = 'all 0s'
            if (e.type == 'touchstart') {
                startX = e.touches[0].clientX
                startY = e.touches[0].clientY
                onDrag = true
            } else {
                startX = e.clientX
                startY = e.clientY
                onDrag = true
            }
            lastX = startX
        }

        const dragMove = (e) => {
            let x = 0
            let y = 0
            if (e.type == 'touchmove') {
                x = e.touches[0].clientX
                y = e.touches[0].clientY
            } else {
                x = e.clientX
                y = e.clientX
            }
            let deltaX = Math.abs(x - startX)
            let deltaY = Math.abs(y - startY)
            if (deltaY > deltaX) return;
            if (!is_end || !onDrag) return;
            const w = document.body.getBoundingClientRect().width
            if (x > startX) {
                let pos = Math.min(Math.max(x - startX, -w / 2), w / 2)
                lists.style.transform = `translateX(calc(${-i}00vw + ${pos}px))`
            } else {
                let pos = Math.min(Math.max(startX - x, -w / 2), w / 2)
                lists.style.transform = `translateX(calc(${-i}00vw - ${pos}px))`
            }
            lastX = x
        }

        const dragEnd = (e) => {
            if (!is_end || !onDrag) return;
            onDrag = false
            let shift = false
            const ratio = 50
            lists.style.transition = 'transform 0.65s'
            if (lastX - startX < -ratio) {
                slide(1)
                shift = true
            }
            else if (lastX - startX > ratio) {
                slide(-1)
                shift = true
            }
            if (!shift) {
                lists.style.transform = `translateX(${-i}00vw)`
            }
        }
        ele.addEventListener('touchstart', dragStart)
        ele.addEventListener('touchmove', dragMove)
        ele.addEventListener('touchend', dragEnd)
        ele.addEventListener('mousedown', dragStart)
        ele.addEventListener('mousemove', dragMove)
        document.addEventListener('mouseup', dragEnd)
        ele.classList.add('slide')
        i == 1 ? ele.classList.add('view') : ''
        clone ? ele.classList.add('clone') : ''
        ele.style.width = '100vw'
        ele.innerHTML = (`
            <div class="wrap-here">
                <div class="slide-box">
                    <div class="image-box">
                        <div class="image-box-inner">
                            <img src="${icon}" alt="${name} icon">
                        </div>
                    </div>
                    <div class="content">
                        <div class="header">
                            <h2 class="heading">
                                <span>${name}</span>
                            </h2>
                            <div class="genres">
                                ${genre.map(a => '<div class="genre">' + a + '</div>').join('')}
                            </div>
                        </div>
                        <div class="images-container">
                            ${images.map(a => '<div class="image"><img src="' + a + '" alt="' + a + '" /></div>').join('')}
                        </div>
                    </div>
                </div>
            </div>
        `)
    }
    data.unshift({ ...data[data.length - 1], clone: true })
    data.push({ ...data[1], clone: true })
    data.forEach((a, i) => createSlide(i, a))
    lists.style.transition = 'all 0s'
    lists.style.transform = `translateX(-100vw)`
    setTimeout(() => {
        lists.style.transition = 'transform 0.65s'
    }, 1)
}

/**
 * 
 * @param {HTMLDivElement|string} inner 
 * @param {number} time 
 * @param {{fn:(root:HTMLDivElement,time:number)=>void,effect:boolean,callback}} options 
 */
const modal = (inner, time = 5, options) => {
    const root = document.body
    const overlay = document.createElement('div')
    const ontop = document.createElement('div')
    ontop.classList.add('modal')
    if (typeof inner == 'string') {
        ontop.innerHTML = inner
    } else {
        ontop.appendChild(inner)
    }
    overlay.classList.add('overlay')
    overlay.appendChild(ontop)
    root.appendChild(overlay)
    if (options.fn) {
        options.fn(ontop, time)
    }

    if (options.effect) {
        effectBeam(overlay, time)
        effectConfetti(overlay, time)
    }

    setTimeout(() => {
        overlay.style.transition = '0.65s'
        overlay.style.opacity = 0
    }, time * 0.9 * 1000)
    setTimeout(() => {
        overlay.remove()
        if(options.callback){
            options.callback()
        }
    }, time * 1000)
}

// review(document.querySelector("div#minigame-animal-1"))
// review(document.querySelector("div#minigame-animal-2"))
// review(document.querySelector("div#minigame-animal-3"))
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.noDragIMG').forEach(a => {
        a.querySelectorAll('img').forEach(a => {
            a.addEventListener('dragstart', (e) => {
                e.preventDefault()
            })
        })
    })
})


const menu = () => {
    const openBtn = document.getElementById('menu')
    const nav = document.getElementById('nav')
    const closeBtn = document.getElementById('close')
    const show = (state) => {
        if (state) {
            nav.style.left = '0px'
        } else {
            nav.style.left = ''
        }
    }
    openBtn.onclick = () => {
        show(true)
    }
    openBtn.ontouchend = () => {
        show(true)
    }
    closeBtn.onclick = () => {
        show(false)
    }
    closeBtn.ontouchend = () => {
        show(false)
    }
}
menu()