const beam_template = (`
    <svg viewBox="0 0 396 166" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.290771 88.3608L395.291 0.86084L63.7908 165.861L0.290771 88.3608Z" fill="url(#paint0_linear_397_59)"/>
        <defs>
        <linearGradient id="paint0_linear_397_59" x1="351.506" y1="67.4872" x2="197.718" y2="244.688" gradientUnits="userSpaceOnUse">
            <stop stop-color="currentColor"/>
            <stop offset="1" stop-color="currentColor" stop-opacity="0"/>
        </linearGradient>
        </defs>
    </svg>
`)

const random = () => {
    return Math.random()
}

const randomMinus = () => {
    return random() * 2 - 1
}

/**
 * Created by boon4681
 * @param {Element} ele 
 * @param {number} multA 
 * @param {number} multB 
 * @param {number} multC 
 * @param {number} loop 
 * @param {number} speed 
 */
const shake = (ele, multA, multB, multC, loop, speed,callback) => {
    if (speed === undefined) speed = 15;
    const shaking = setInterval(() => {
        let x = Math.floor(Math.random() * multA + 0.3);
        let y = Math.floor(Math.random() * multB + 0.3);
        let rot = Math.floor(Math.random() * multC + 0.3);
        if (Math.random() > 0.5) x = x * -1
        if (Math.random() > 0.5) y = y * -1
        if (Math.random() > 0.5) rot = rot * -1
        ele.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg)`
        if (loop != undefined && loop != false) {
            loop = loop - 1
            if (loop <= 0) {
                if(callback) callback()
                clearInterval(shaking);
                ele.style.transform = "";
            }
        }
    }, speed);
}

/**
 * 
 * @param {HTMLDivElement} parent
 * @param {number} time
 */
const effectConfetti = (parent, time = 5) => {
    const count = 300;
    const root = document.createElement('div')
    root.classList.add('confetti')
    parent.appendChild(root)
    const pop = () => {
        const ele = document.createElement('div')
        const size = Math.random() * 15 + 5
        ele.classList.add('pop-effect')
        ele.style.width = size + 'px'
        ele.style.height = size * 1.667 + 'px'
        ele.style.top = `${randomMinus() * 500 - 500}px`
        ele.style.left = `${randomMinus() * window.innerWidth / 2 + window.innerWidth / 2}px`
        ele.style.backgroundColor = `hsl(${Math.round(Math.random() * 360)}deg, 86%, 57%)`
        ele.style.transform = `rotate(${randomMinus() * 45}deg)`
        ele.style.animationDelay = Math.random() * time * 0.4 + 's'
        ele.style.animationDuration = time * 0.4 + randomMinus() * time * 0.2 + 's'
        root.appendChild(ele)
    }
    for (let i = 0; i < count; i++) {
        pop()
    }
    setTimeout(() => {
        root.remove()
    }, time * 1000)
}

/**
 * @param {HTMLDivElement} parent
 * @param {number} time
 */
const effectBeam = (parent, time = 5) => {
    const count = 10
    const rot = 360 / 10
    const root = document.createElement('div')
    const wrapper = document.createElement('div')
    wrapper.classList.add('beam-wrapper')
    root.appendChild(wrapper)
    root.classList.add('beams')
    root.style.opacity = 1
    root.style.transform = 'scale(0)'
    root.style.transition = '0.25s'
    setTimeout(() => {
        root.style.transform = 'scale(1)'
    }, 1)
    parent.appendChild(root)
    for (let i = 0; i < count; i++) {
        const ele = document.createElement('div')
        wrapper.appendChild(ele)
        ele.innerHTML = beam_template
        ele.classList.add('beam')
        ele.style.transform = `rotate(${rot * i}deg)`
    }
    setTimeout(() => {
        root.style.transition = '0.65s'
        root.style.opacity = 0
    }, time * 0.9 * 1000)
    setTimeout(() => {
        root.remove()
    }, time * 1000)
}

/**
 * @param {HTMLDivElement} root
 * @param {number} time
 * @param {number} speed 
 * @param {number} amplitudeX 
 * @param {number} amplitudeY 
 */
const effectDoodle = (root, time, speed = 2, amplitudeX = 1, amplitudeY = 1) => {
    speed = 1 / speed
    root.style.transition = `${speed}s`
    root.style.transform = `scaleX(0) scaleY(0)`
    const loop = setInterval(() => {
        const x = randomMinus() * amplitudeX + 0.95
        const y = randomMinus() * amplitudeY + 0.95
        root.style.transform = `scaleX(${x}) scaleY(${y})`
    }, speed * 1000)

    setTimeout(() => {
        root.style.transform = `scaleX(1) scaleY(1)`
        clearInterval(loop)
    }, time * 1000)
}

/**
 * @param {HTMLDivElement} root
 * @param {number} time
 */
const effectFadeOutRemove = (root, time,callback) => {
    root.style.transition = `${time}s`
    root.style.opacity = '0'
    setTimeout(() => {
        if(callback){
            callback()
        }
        root.remove()
    }, time * 1000)
}

/**
 * @param {HTMLDivElement} root
 * @param {number} time
 */
 const effectFadeOut = (root, time) => {
    root.style.transition = `${time}s`
    root.style.opacity = '0'
    setTimeout(() => {
        root.style.transition = ''
    }, time * 1000)
}