let canvas = document.querySelector('canvas');
let c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

let colors = [
    '#058240',
    '#87C159',
    '#ADCACB',
    '#FEE3A2',
    '#F3C301'
]

const gravity = 0.6;
const friction = 0.8;

addEventListener('mousemove',
    function(event) {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    });

addEventListener('touchend', function() {
    init();
})

addEventListener('resize', function() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});

addEventListener('click', function() {
    init();
})

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

function Ball(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx
    this.dy = dy;
    this.radius = radius;
    this.color = color;

    this.update = function() {
        if (this.y + this.radius + this.dy > canvas.height) {
            this.dy = -this.dy;
            this.dy = this.dy * friction;
            this.dx = this.dx * friction;
        } else {
            this.dy += gravity;
        }

        if (this.x + this.radius > canvas.width ||
            this.x - this.radius <= 0) {
            this.dx = -this.dx * friction;
        }

        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.stroke();
        c.closePath();
    };
}

let bal;
let ballArray = [];

function init() {
    ballArray = [];
    for (let i = 0; i < 200; i++) {
        let radius = randomIntFromRange(8, 50);
        let x = randomIntFromRange(radius, canvas.width - radius);
        let y = randomIntFromRange(0, canvas.height - radius);
        let dx = randomIntFromRange(-2, 2);
        let dy = randomIntFromRange(-2, 2)
        let color = randomColor(colors);

        ballArray.push(new Ball(x, y, dx, dy, radius, color))
    }
    console.log(ballArray)

}

function animate() {
    requestAnimationFrame(animate);

    c.clearRect(0, 0, canvas.width, canvas.height);
    c.fillText("Click to restart", mouse.x, mouse.y);
    for (let i = 0; i < ballArray.length; i++) {
        ballArray[i].update();
    }
}

init()
animate()