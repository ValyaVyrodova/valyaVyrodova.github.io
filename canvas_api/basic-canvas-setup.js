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

//Unity functions 
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
}

function getDistance(x1, y1, x2, y2) {
    let xDistance = x2 - x1
    let yDistanse = y2 - y1

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistanse, 2))
}



// Objects
function Object(x, y, radius, color) {

    this.x = x;
    this.y = y;
    this.velocity = {
        x: (Math.random() - 0.5) * 5,
        y: (Math.random() - 0.5) * 5
    };
    this.radius = radius;
    this.color = color;

    this.update = () => {
        this.draw()
    }

    this.draw = function() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color;
        c.fill()
        c.strokeStyle = this.color
        c.stroke()
        c.closePath()
    }


}

// Implementation
let array

function init() {
    array = []

    for (let i = 0; i < 100; i++) {
        
        array.push(new Object(x, y, radius, color))
    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    particles.forEach(particle => {
        particle.update(particles)
    })

}

init()
animate()