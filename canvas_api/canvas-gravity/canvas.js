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

addEventListener('mousemove', 
function(event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
}); 

addEventListener('resize', function() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
});

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max-min + 1) + min)
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

function Ball(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    this.update = function() {
        this.draw();
    }

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    };
}

let bal;

function init() {
    ball = new Ball(canvas.width/2, canvas.height/2, 30, 'red');

}

function animate() {
    requestAnimationFrame(animate);

    c.clearRect(0, 0, canvas.width, canvas.height);
    c.fillText("HTML CANVAS BOILERPLATE", mouse.x, mouse.y);
    ball.update()
}

init()
animate()


