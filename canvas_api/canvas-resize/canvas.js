let canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext('2d');

// ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
// ctx.fillRect(100, 100, 100, 100);
// ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
// ctx.fillRect(400, 100, 100, 100);
// ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
// ctx.fillRect(300, 300, 100, 100)

// Line
// ctx.beginPath();
// ctx.moveTo(50, 300);
// ctx.lineTo(300, 100);
// ctx.lineTo(400, 300);
// ctx.strokeStyle = '#fa34a3'
// ctx.stroke();


// Arc
// ctx.beginPath()
// ctx.arc(300, 300, 30, 0, Math.PI * 2, false);
// ctx.strokeStyle = 'blue';
// ctx.stroke();

// for (let i = 0; i < 100; i++) {
//     let x = Math.random() * window.innerWidth;
//     let y = Math.random() * window.innerHeight;
//     ctx.beginPath()
//     ctx.arc(x, y, 30, 0, Math.PI * 2, false);
//     ctx.strokeStyle = 'blue';
//     ctx.stroke();
// }

// ctx.beginPath()
// ctx.arc(200, 200, 30, 0, Math.PI * 2, false);
// ctx.strokeStyle = 'blue';
// ctx.stroke();

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;

    this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.strokeStyle = 'blue';
        ctx.stroke();
    }

    this.update = function() {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy
        }

        this.x += this.dx;
        this.y += this.dy;

        this.draw()
    }
}

let circleArray = []

for (let i = 0; i < 100; i++) {
    let x = Math.random() * innerWidth;
    let y = Math.random() * innerHeight;
    let dx = (Math.random() - 0.5) * 10;
    let dy = (Math.random() - 0.5) * 10;
    const radius = 30;
    circleArray.push(new Circle(x, y, dx, dy, radius));
}



function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }

}
animate();