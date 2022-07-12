const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Create player, that move cursor to the left and right 

const player = {
    w: 80,
    h: 15,
    x: 275,
    y: 570,
    speed: 5,
    dx: 0,
    dy: 0
}

const circle = {
    x: 200,
    y: 200,
    size: 20,
    dx: 5,
    dy: 4
}

function drawPlayer() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.w, player.h);
}

function drawCircle() {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
    ctx.fillStyle = 'orange';
    ctx.fill();
    ctx.stroke();
}


function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function newPos() {
    player.x += player.dx

    detectPlayerWalls()
}

function moveCircle() {
    circle.x += circle.dx;
    circle.y += circle.dy;

    detectCircleWalls()
}

function detectPlayerWalls() {
    //Detect side walls for player
    if (player.x < 0) {
        player.x = 0
    }

    if (player.x + player.w > canvas.width) {
        player.x = canvas.width - player.w
    }
}

function detectCircleWalls() {
    //Detect side walls
    if (circle.x + circle.size > canvas.width || circle.x - circle.size < 0) {
        circle.dx *= -1;
    }

    //Detect top and bottom walls
    if (circle.y + circle.size > canvas.height || circle.y - circle.size < 0) {
        circle.dy *= -1;
    }

    //Detect Player cursor

    let circleCoordinates = {
        x: circle.x,
        y: circle.y + circle.size
    }
    let playerCoordinatesA = {
        x: player.x,
        y: player.y
    }
    let playerCoordinatesB = {
        x: player.x + player.w,
        y: player.y
    }

    if (circleCoordinates.x >= playerCoordinatesA.x &&
        circleCoordinates.x <= playerCoordinatesB.x &&
        circleCoordinates.y >= playerCoordinatesA.y) {
        console.log('inter');
        circle.dy *= -1;
    }
}

function moveRight() {
    player.dx = player.speed
}

function moveLeft() {
    player.dx = -player.speed
}



function update() {
    clear();
    drawPlayer();
    drawCircle();

    newPos()
    moveCircle()

    requestAnimationFrame(update);
}

update()

function keyDown(e) {
    if (e.key === 'ArrowRight' || e.key === 'Right') {
        moveRight()
    } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
        moveLeft()
    }
}

function keyUp(e) {
    if (e.key == 'Right' ||
        e.key == 'ArrowRight' ||
        e.key == 'Left' ||
        e.key == 'ArrowLeft') {
        player.dx = 0;
        player.dy = 0;
    }
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);