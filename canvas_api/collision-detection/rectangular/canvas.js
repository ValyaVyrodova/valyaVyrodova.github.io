const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
    x: 10,
    y: 10
}

const colors = ['#65483D', '#9E8279', '#FDBF6E', '#BC2041', '#564C55']

// Event Listeners
addEventListener('mousemove', (event) => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

window.addEventListener('touchmove', e => {
    [...e.changedTouches].forEach(touch => {
        mouse.x = touch.pageX;
        mouse.y = touch.pageY;
    })
})

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init()
})

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = '#1A1A23'
    c.fillRect(0, 0, canvas.width, canvas.height)
    // c.clearRect(0, 0, canvas.width, canvas.height)

    const redRectangles = {
        x: mouse.x,
        y: mouse.y,
        side: 100,
        color: '#E86262'
    }

    const blueRectangles = {
        x: canvas.width / 2 - 50,
        y: canvas.height / 2 - 50,
        side: 100,
        color: '#92ABEA'
    }

    if(redRectangles.x + redRectangles.side >= blueRectangles.x && 
        redRectangles.x <=  blueRectangles.x + blueRectangles.side && 
        redRectangles.y + redRectangles.side >= blueRectangles.y && 
        redRectangles.y  <= blueRectangles.y + blueRectangles.side ) {
            blueRectangles.color = '#E86262'
    } else {
        blueRectangles.color = '#92ABEA'
    }

    //red rectangle
    c.fillStyle = redRectangles.color
    c.fillRect(redRectangles.x, redRectangles.y, redRectangles.side, redRectangles.side)

    //blue rectangle
    c.fillStyle = blueRectangles.color
    c.fillRect(blueRectangles.x, blueRectangles.y, blueRectangles.side, blueRectangles.side)

}


animate()