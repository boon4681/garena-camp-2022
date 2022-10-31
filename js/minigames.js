(async () => {
    const data = await fetch('https://gamertocoder.garena.co.th/api/minigames').then(res => res.json())
    const container = document.querySelector('.card-container')
    const card = (parent, data) => {
        const card = document.createElement('div')
        parent.appendChild(card)
        card.classList.add('mn-card')
        card.innerHTML = `
            <div class="header">
                <h3 class="heading">${data.name}</h3>
                <div class="image">
                    <img src="${data.icon}" alt="i/${data.name}">
                </div>
                <div class="genres">
                    ${data.genre.map(a => '<div class="tag">' + a + '</div>').join('')}
                </div>
            </div>
            <div class="description">
                <h3>Description</h3>
                <div class="inner">
                    ${data.description}
                </div>
            </div>`
        let toggle = false
        card.addEventListener('click', () => {
            toggle = !toggle
            const height = card.querySelector('.header').getBoundingClientRect().height
            card.style.height = card.getBoundingClientRect().height + 'px'
            card.querySelector('.header').classList.toggle('hide')
            card.querySelector('.description').classList.toggle('full')
            card.querySelector('.description').style.top = toggle ? (-height) + 'px' : 0
        })
    }
    data.forEach(a => {
        card(container, a)
    })
})();

