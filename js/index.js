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
let catched = 0

const catchDeAnimalAnimate = (ele, image, name, label) => {
    const card = `
    <div class="card card-found-you flex flex-row">
        <div class="animal">
            <img src="./images/minigame-${image}.png" alt="mini_games-1">
        </div>
        <h2 class="heading font-md">
            <span>ยินดีด้วยคุณได้รับ</span>
        </h2>
        <div class="header">
            <h2 class="heading font-lg">
                <span>${name}</span>
            </h2>
        </div>
        <h2 class="heading font-sm">
            <span>${label}</span>
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
    effectFadeOutRemove(ele, 0.2,()=>{
        catched++
    })
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
        const left = (h - eleRect.y) / h
        if (left > 0 && left < 1 - eleRect.width / w) {
            lion.style.transform = `translateX(${left * 100}vw)`
        }
    }
    window.addEventListener('scroll', (e) => {
        if (isVisible) {
            update()
        }
    })
    update()
    lion.onclick = () => {
        catchDeAnimalAnimate(lion, 'lion', 'ไลเก้อ', 'ราชสีห์ป่าช้า')
    }
}
const catchDePuffle = () => {
    const puffle = document.getElementById("puffle")
    let positionX;
    let positionY
    puffle.onclick = () => {
        catchDeAnimalAnimate(puffle, 'fish', 'พัฟเฟิล', 'เจ้าแห่งนครบาดาล')
    }
    setInterval(function () {
        positionY = Math.min(Math.max(0.4, Math.random()), 0.6);
        positionX = Math.min(Math.max(0.4, Math.random()), 0.6);
        puffle.style.transform = `translate(${positionX * 100}vw,${positionY * 100}vh)`
        puffle.style.transition = "all 1s ease"
    }, 1500);
}

const catchDePig = () => {
    const pig = document.getElementById("piggy")
    let positionX = 0;
    let positionY = 0;
    pig.onclick = () => {
        catchDeAnimalAnimate(pig, 'pig', 'พิกกี้', 'หมูเพกาซัส')
    }
    pig.addEventListener("mouseover", () => {
        positionX = Math.min(Math.max(0.4, Math.random()), 0.6);
        positionY = Math.min(Math.max(0.4, Math.random()), 0.6);
        pig.style.transform = `translate(${positionX * 100}vw,${positionY * 100}vh)`
        pig.style.transition = "all 1s ease"
    })
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
        const h = windowRect.height / 1.2
        const eleRect = ball.getBoundingClientRect()
        const dinoRect = dino.getBoundingClientRect()
        let left = ((h - eleRect.y) / (h - 50))
        left = Math.min(Math.max(0, left), 1 - eleRect.width / w) - 50 / w
        if (left > 50) {
            shake(goku, 2, 2, 2, 1, 50)
        }
        ball.style.transform = `translateX(-${left * 100}vw)`
        shake(gokuRealBall, 5, 5, 5, false, 100)
        if (left > 1 - eleRect.width / w - dinoRect.width / w / 2 - 50 / w) {
            needReset = true
            ball.style.opacity = 0
            shake(dino, 5, 5, 5, 10, 50, () => {
                // effectFadeOut(dino, 0.5)
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
    gokuBall()
    catchDeLion()
    catchDePig()
    catchDePuffle()
    const c = setInterval(() => {
        if (catched == 3) {
            clearInterval(c)
            window.location.href = './secretpage.html'
        }
    }, 50)
})
