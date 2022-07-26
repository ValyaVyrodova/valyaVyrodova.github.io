document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Create player, that move cursor to the left and right 
// Create circle, that move randomly
// Create wall of cells for game

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
    dx: 0,
    dy: 0
}



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

    let circleNumX = parseInt(canvas.width / (wallCell.w + wallCell.x)) // 600 / (150+20) = 3
    let circleNumY = parseInt(canvas.height / 2 / (wallCell.h + wallCell.y)) // 600/2/(100+20) = 2

    for (let j = 0; j < circleNumX; j++) {
        for (let i = 0; i < circleNumY; i++) {
            // debugger
            drawCell(wallCell)
            // wall.push(wallCell)
            strikeCell(wallCell)

            wallCell.y = wallCell.y + cell.w + cell.y
        }

        wallCell.x = wallCell.x + cell.w + cell.x
        wallCell.y = cell.y
    }

}



function strikeCell(wallCell) {
    //    Detect cells
    let circleCoordinates = {
        x: circle.x,
        y: circle.y
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
    if (circleCoordinates.x >= cellCoordinateA.x &&
        circleCoordinates.x <= cellCoordinateB.x &&
        circleCoordinates.y - circle.size <= cellCoordinateA.y) {
        circle.dy *= -1;
        console.log('strike')
        
    }

    //upside
    if (circleCoordinates.x >= cellCoordinateD.x &&
        circleCoordinates.x <= cellCoordinateC.x &&
        circleCoordinates.y + circle.size >= cellCoordinateD.y) {
        circle.dy *= -1;
    }

     //left side
     if (circleCoordinates.x + circle.size <= cellCoordinateD.x &&
        circleCoordinates.y >= cellCoordinateD.x &&
        circleCoordinates.y <= cellCoordinateA.y) {
        circle.dx *= -1;
    }

     //left right
     if (circleCoordinates.x - circle.size >= cellCoordinateC.x &&
        circleCoordinates.y >= cellCoordinateC.x &&
        circleCoordinates.y <= cellCoordinateB.y) {
        circle.dx *= -1;
    }

}

function detectWall() {
    drawWall()
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