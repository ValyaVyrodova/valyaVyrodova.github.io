
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


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
    x: 150,
    y: 400,
    size: 20,
    dx: 5,
    dy: 4
}

const cell = {
    x: 20,
    y: 20,
    w: 150,
    h: 100,
}

let wall = [];


function drawCell(el) {
    ctx.fillStyle = 'red';
    ctx.fillRect(el.x, el.y, el.w, el.h);

}

function drawWall() {

    let wallCell = {
        x: cell.x,
        y: cell.y,
        w: cell.w,
        h: cell.h
    }

    let markedForDeletion = false;

    let circleNumX = parseInt(canvas.width / (wallCell.w + wallCell.x)) // 600 / (150+20) = 3
    let circleNumY = parseInt(canvas.height / 2 / (wallCell.h + wallCell.y)) // 600/2/(100+20) = 2

    for (let j = 0; j < circleNumX; j++) {
        for (let i = 0; i < circleNumY; i++) {
            drawCell(wallCell)
            wallCell.y = wallCell.y + cell.w + cell.y
            if(strikeCell(wallCell)) {
            markedForDeletion = true;
            }
        }
        wallCell.x = wallCell.x + cell.w + cell.x
        wallCell.y = cell.y
    }
    wall.push(wallCell)

}



function strikeCell(wallCell) {
    //    Detect cells
    let circleCoordinates = {
        x: circle.x,
        y: circle.y,
        size: circle.size,
    }

    let cellCoordinateA = {
        x: wallCell.x,
        y: wallCell.y + wallCell.h
    }

    let cellCoordinateB = {
        x: wallCell.x + wallCell.w,
        y: wallCell.y + wallCell.h
    }

    let cellCoordinateC = {
        x: wallCell.x + wallCell.w,
        y: wallCell.y
    }

    let cellCoordinateD = {
        x: wallCell.x,
        y: wallCell.y
    }

    //downside
    if (circleCoordinates.x + circleCoordinates.size >= cellCoordinateA.x &&
        circleCoordinates.x - + circleCoordinates.size <= cellCoordinateB.x &&
        circleCoordinates.y - circleCoordinates.size <= cellCoordinateA.y) {
        circle.dy *= -1;
        return true;
    }

    //upside
    if (circleCoordinates.x + circleCoordinates.size >= cellCoordinateD.x &&
        circleCoordinates.x - circleCoordinates.size <= cellCoordinateC.x &&
        circleCoordinates.y + circleCoordinates.size <= cellCoordinateD.y) {
        circle.dy *= -1;
        return true;
    }

     //left side
     if (circleCoordinates.x + circleCoordinates.size >= cellCoordinateD.x &&
        circleCoordinates.y + circleCoordinates.size>= cellCoordinateD.x &&
        circleCoordinates.y - circleCoordinates.size <= cellCoordinateA.y) {
        circle.dx *= -1;
        return true;
    }

     //Right side
     if (circleCoordinates.x - circleCoordinates.size <= cellCoordinateC.x &&
        circleCoordinates.y + circleCoordinates.size >= cellCoordinateC.x &&
        circleCoordinates.y - circleCoordinates.size <= cellCoordinateB.y) {
        circle.dx *= -1;
        return true;
    }

}

function detectCollision() {
    let bottomOfBall = circle.y + circle.size;
    let topOfBall = circle.y;

    
    let topOfObject = cell.y;
    let leftSideOfObject = cell.x;
    let rightSideOfObject = cell.x + cell.w;
    let bottomOfObject = cell.y + cell.h;

    if (bottomOfBall >= topOfObject &&
        topOfBall <= bottomOfObject &&
        ball.position.x >= leftSideOfObject &&
        ball.position.x + ball.size <= rightSideOfObject) 
        {
            console.log('blue')
        return true
    } else {
        return false
    }
}

function detectWall() {
    drawWall()
    wall.filter(brick => !brick.markedForDeletion)
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
        circle.dy *= -1;
    }
}

function moveRight() {
    player.dx = player.speed
    console.log('right')
}

function moveLeft() {
    player.dx = -player.speed
    console.log('left')
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

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

function update() {
    clear();
    drawPlayer();
    drawCircle();
    detectWall()

    newPos()
    moveCircle()

    requestAnimationFrame(update);
}

update()