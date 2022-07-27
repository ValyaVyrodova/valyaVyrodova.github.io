const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3
}

class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
    }

    start() {
        this.gameState = GAMESTATE.RUNNING;
        this.ball = new Ball(this);
        this.paddle = new Paddle(this);

        let bricks = buildLevel(this, level1);


        this.gameObjects = [this.ball, this.paddle, ...bricks]

        new InputHandler(this.paddle, this);
    }

    update(deltaTime) {
        if (this.gameState == GAMESTATE.PAUSED) return;

        this.gameObjects.forEach(object => object.update(deltaTime));

        this.gameObjects = this.gameObjects.filter(object => !object.markedForDeletion);
    }

    draw(ctx) {
        this.gameObjects.forEach(object => object.draw(ctx))

        if (this.gameState == GAMESTATE.PAUSED) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
            ctx.fill();

            ctx.font = '60px Arial';
            ctx.fillStyle = 'rgb(255, 255, 255)';
            ctx.textAlign = 'center';
            ctx.fillText('Paused', this.gameWidth / 2, this.gameHeight / 2)
        }
    }

    togglePause() {
        if (this.gameState == GAMESTATE.PAUSED) {
            this.gameState = GAMESTATE.RUNNING;
        } else {
            this.gameState = GAMESTATE.PAUSED
        }
    }

}