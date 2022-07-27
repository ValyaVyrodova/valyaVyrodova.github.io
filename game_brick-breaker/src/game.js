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

        this.gameState = GAMESTATE.MENU;
        this.ball = new Ball(this);
        this.paddle = new Paddle(this);
        this.gameObjects = [];
        new InputHandler(this.paddle, this);
    }

    start() {
        if(this.gameState !== GAMESTATE.MENU) return;

        let bricks = buildLevel(this, level1);
        this.gameObjects = [this.ball, this.paddle, ...bricks];

        this.gameState = GAMESTATE.RUNNING;
    }

    update(deltaTime) {
        if (
            this.gameState === GAMESTATE.PAUSED ||
            this.gameState === GAMESTATE.MENU)
            return;

        this.gameObjects.forEach(object => object.update(deltaTime));

        this.gameObjects = this.gameObjects.filter(object => !object.markedForDeletion);
    }

    draw(ctx) {
        this.gameObjects.forEach(object => object.draw(ctx))

        if (this.gameState === GAMESTATE.PAUSED) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
            ctx.fill();

            ctx.font = '60px Arial';
            ctx.fillStyle = 'rgb(255, 255, 255)';
            ctx.textAlign = 'center';
            ctx.fillText('Paused', this.gameWidth / 2, this.gameHeight / 2)
        }

        if (this.gameState === GAMESTATE.MENU) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = 'rgba(208, 95, 255, 1)';
            ctx.fill();

            ctx.font = '60px Arial';
            ctx.fillStyle = 'rgb(255, 255, 255)';
            ctx.textAlign = 'center';
            ctx.fillText('Press SPACEBAR To Start', this.gameWidth / 2, this.gameHeight / 2)
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