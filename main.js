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

onVisible(
    document.querySelector('.header-news'),
    ([entry]) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('make-wow')
        }
    }
)
onVisible(
    document.querySelector('.header-hot-game'),
    ([entry]) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('make-wow')
        }
    }
)

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
 * @param {{fn:(root:HTMLDivElement,time:number)=>void,effect:boolean}} options 
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
    }, time * 1000)
}

const catchDeLion = () => {
    const lion = document.querySelector('img#catch-de-lion')
    let isVisible = false
    onVisible(
        lion,
        ([entry]) => {
            isVisible = entry.intersectionRect
        }
    )
    const update = () => {
        const windowRect = document.body.getBoundingClientRect()
        const w = windowRect.width
        const h = windowRect.height
        const eleRect = lion.getBoundingClientRect()
        const left = (((h - eleRect.y) / h) * w)
        if (left > 0 && left < w - eleRect.width) {
            lion.style.transform = `translateX(-${left}px)`
        }
    }
    window.addEventListener('scroll', (e) => {
        if (isVisible) {
            update()
        }
    })
    update()
    lion.onclick = () => {
        const card = `
        <div class="card card-found-you flex flex-row">
            <div class="animal">
                <img src="./images/minigame-lion.png" alt="mini_games-1">
            </div>
            <h2 class="heading font-md">
                <span>ยินดีด้วยคุณได้รับ</span>
            </h2>
            <div class="header">
                <h2 class="heading font-lg">
                    <span>ไลเก้อ</span>
                </h2>
            </div>
            <h2 class="heading font-sm">
                <span>ราชสีห์ป่าช้า</span>
            </h2>
        </div>
        `
        modal(card, 3.5, {
            fn: (e, time) => {
                const animal = e.querySelector('div.animal')
                effectDoodle(animal, time * 0.4, 8, 0.05, 0.2)
            },
            effect: true
        })
        effectFadeOutRemove(lion, 0.2)
    }
}

const gokuBall = () => {
    const goku = document.getElementById('goku')
    const ball = document.getElementById('goku-ball')
    const dino = document.getElementById('dino-goku-target')
    const gokuRealBall = document.getElementById('goku-real-ball')
    let isVisible = false
    let needReset = false
    onVisible(
        ball,
        ([entry]) => {
            isVisible = entry.intersectionRect
            if (needReset && entry.intersectionRatio == 0) {
                needReset = false
                ball.style.opacity = 1
                dino.style.opacity = 1
                ball.style.transform = `translateX(0px)`
            }
        }, {
        threshold: [0.01, 1]
    }
    )
    const update = () => {
        if (needReset) return;
        const windowRect = document.body.getBoundingClientRect()
        const w = windowRect.width
        const h = windowRect.height / 1.5
        const eleRect = ball.getBoundingClientRect()
        const dinoRect = dino.getBoundingClientRect()
        let left = (((h - eleRect.y) / (h - 100)) * w)
        left = Math.min(Math.max(0, left), w - eleRect.width) - 100
        if (left > 50) {
            shake(goku, 2, 2, 2, 1, 50)
        }
        ball.style.transform = `translateX(-${left}px)`
        shake(gokuRealBall, 5, 5, 5, false, 100)
        if (left > w - eleRect.width - dinoRect.width / 2 - 50) {
            needReset = true
            ball.style.opacity = 0
            shake(dino, 5, 5, 5, 10, 50, () => {
                effectFadeOut(dino, 0.5)
            })
        }
    }
    window.addEventListener('scroll', (e) => {
        if (isVisible) {
            update()
        }
    })
    update()
}


    ; (async () => {
        const raw = await fetch('https://gamertocoder.garena.co.th/api/minigames').then(res => res.json())
        const data = raw
        carousel(document.querySelector('div#hot-game-slider'), data.filter(a => a.images != undefined).splice(0, 3))
    })();


document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.noDragIMG').forEach(a => {
        a.querySelectorAll('img').forEach(a => {
            a.addEventListener('dragstart', (e) => {
                e.preventDefault()
            })
        })
    })
    gokuBall()
    catchDeLion()
})

// review(document.querySelector("div#minigame-animal-1"))
// review(document.querySelector("div#minigame-animal-2"))
// review(document.querySelector("div#minigame-animal-3"))
