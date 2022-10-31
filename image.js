const get_image = (url) => new Promise(resolve => {
    const image = new Image()
    image.onload = () => {
        let { width, height } = image
        const a = 200 / width
        const b = 200 / height
        let scale = a > b ? a : b
        width = Math.floor(width * scale)
        height = Math.floor(height * scale)
        image.width = width
        image.height = height
        resolve(image)
    }
    image.crossOrigin = 'Anonymous'
    image.src = url
})

/**
 * @param {*} img 
 * @returns 
 */
const dim = async (img) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d', {
        willReadFrequently: true,
        antialias: false,
        preserveDrawingBuffer:true,
        desynchronized:true,
    })
    let { width, height } = img
    canvas.width = width
    canvas.height = height
    // const a = 200 / width
    // const b = 200 / height
    // let scale = a > b ? a : b
    // width = Math.floor(width * scale)
    // height = Math.floor(height * scale)
    ctx.drawImage(img, 0, 0, width, height)
    const pixels = ctx.getImageData(0, 0, width, height).data
    let top = -1
    let bottom = -1
    let left = -1
    let right = -1
    for (let y = 0; y < height; y++) {
        let k = false
        let lastX = 0
        for (let x = 0; x < width; x++) {
            let n = y * width * 4 + x * 4
            if (pixels[n] > 0) {
                if (left == -1 || left > x) {
                    left = x
                }
                lastX = x
                k = true
                break
            }
        }
        if (k) {
            for (let x = width; x > 0; x--) {
                if (x <= lastX) break;
                let n = y * width * 4 + x * 4
                if (pixels[n] > 0) {
                    if (right == -1 || right < x) {
                        right = x
                    }
                    k = true
                    break
                }
            }
            if (top == -1) {
                top = y
            }
            if (bottom == -1 || bottom < y) {
                bottom = y
            }
        }
    }
    const w = right - left
    const h = bottom - top
    const clone = document.createElement('canvas')
    clone.width = w
    clone.height = h
    const trim = ctx.getImageData(left, top, w, h)
    clone.getContext('2d').putImageData(trim, 0, 0)
    return clone.toDataURL()
}

    ; (async () => {
        const data = await fetch("https://gamertocoder.garena.co.th/api/assets").then(res => res.json())
            .then(data => data['characters'])
        const images = await Promise.all(data.map(url => get_image(url)))
        console.time('hell')
        for (let i = 0; i < images.length; i++) {
            const img = images[i]
            // dim(img)
            document.body.insertAdjacentHTML('beforeend', `<img src="${await dim(img)}" />`)
        }
        console.timeEnd('hell')
    })();
