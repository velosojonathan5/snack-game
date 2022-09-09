
let canvas = document.getElementById("game-panel");
let contextCanvas = canvas.getContext("2d")

let panelMatrix = [
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,4,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,3,2,1,0,0,0,0],
];

const colors = {
    0: "white",
    1: "red",
    2: "red",
    3: "red",
    4: "yellow"
}

const pixelSize = 25;

const directions = {
    top: 'top',
    left: 'left',
    down: 'down',
    right: 'right'
}

class SnakeGame {
    panel = panelMatrix;
    direction = directions.right;
    process = undefined;

    getSnakeHeadPosition() {
        for(let i=0; i < this.panel.length; i++) {
            for(let j=0;j < this.panel[i].length; j++) {
                const value = this.panel[i][j];
                if(value === 1) {
                    return {i, j}
                }
            }
        }
    }

    getSnakeTailPosition() {
        for(let i=0; i < this.panel.length; i++) {
            for(let j=0;j < this.panel[i].length; j++) {
                const value = this.panel[i][j];
                if(value === 3) {
                    return {i, j}
                }
            }
        }
    }

    changeDirection(d) {
        if(this.direction === directions.top && d === directions.down){
            return;
        }
        if(this.direction === directions.down && d === directions.top){
            return;
        }
        if(this.direction === directions.left && d === directions.right){
            return;
        }
        if(this.direction === directions.right && d === directions.left){
            return;
        }
        this.direction = d;
    }

    moveSnake() {
        const snakePositions = this.getSnakeHeadPosition();
        
        if(this.direction == directions.right){
            if(this.panel[snakePositions.i][snakePositions.j + 1] !== undefined){
                this.panel[snakePositions.i][snakePositions.j + 1] = 1;
                this.panel[snakePositions.i][snakePositions.j] = 2;
            } else {
                this.stopGame();
                alert("game over");
                return;
            }
        }
        if(this.direction == directions.left){
            if(this.panel[snakePositions.i][snakePositions.j - 1] !== undefined){
                this.panel[snakePositions.i][snakePositions.j - 1] = 1;
                this.panel[snakePositions.i][snakePositions.j] = 2;
            } else {
                this.stopGame();
                alert("game over");
                return;
            }
        }
        if(this.direction == directions.top){
            

            if(this.panel[snakePositions.i - 1] && this.panel[snakePositions.i - 1][snakePositions.j] !== undefined){
                this.panel[snakePositions.i - 1][snakePositions.j] = 1;
                this.panel[snakePositions.i][snakePositions.j] = 2;
            } else {
                this.stopGame();
                alert("game over");
                return;
            }
        }
        if(this.direction == directions.down){
            

            if(this.panel[snakePositions.i + 1] && this.panel[snakePositions.i + 1][snakePositions.j] !== undefined){
                this.panel[snakePositions.i + 1][snakePositions.j] = 1;
                this.panel[snakePositions.i][snakePositions.j] = 2;
            } else {
                this.stopGame();
                alert("game over");
                return;
            }
        }
        this.moveTail()

        
    }

    moveTail() {
        const snakeTailPosition = this.getSnakeTailPosition();
        if(this.panel[snakeTailPosition.i + 1] && this.panel[snakeTailPosition.i + 1][snakeTailPosition.j] == 2) {
            this.panel[snakeTailPosition.i + 1][snakeTailPosition.j] = 3;
        } else if(this.panel[snakeTailPosition.i - 1] && this.panel[snakeTailPosition.i - 1][snakeTailPosition.j] == 2) {
            this.panel[snakeTailPosition.i - 1][snakeTailPosition.j] = 3;
        } else if(this.panel[snakeTailPosition.i][snakeTailPosition.j + 1] == 2) {
            this.panel[snakeTailPosition.i][snakeTailPosition.j + 1] = 3;
        } else if(this.panel[snakeTailPosition.i][snakeTailPosition.j - 1] == 2) {
            this.panel[snakeTailPosition.i][snakeTailPosition.j - 1] = 3;
        }
        this.panel[snakeTailPosition.i][snakeTailPosition.j] = 0;
    }

    renderInfoDirection() {
        document.getElementById('direction').innerHTML = this.direction;
    }

    renderPanel() {
        for(let i=0; i < this.panel.length; i++) {
            for(let j=0;j < this.panel[i].length; j++) {
                const value = this.panel[i][j];
                let color = colors[this.panel[i][j]];
                contextCanvas.fillStyle = color;
                const x = i * pixelSize;
                const y = j * pixelSize;
                contextCanvas.fillRect(y, x, pixelSize, pixelSize);
            }
        }
    }

    startGame() {
        this.process = setInterval(() => {
            this.moveSnake();
            this.renderPanel();
            this.renderInfoDirection();
        }, 500)
    }

    stopGame() {
        clearInterval(this.process);
    }
}

const snakeGame = new SnakeGame();

snakeGame.renderPanel();

document.addEventListener("keydown", (event) => {
    if (event.defaultPrevented) {
        return;
    }
    console.log(event.key)
    switch (event.key) {
        case "ArrowDown":
            snakeGame.changeDirection(directions.down)
            break;
        case 's':
            snakeGame.changeDirection(directions.down)
            break;
        case "ArrowUp":
            snakeGame.changeDirection(directions.top)
            break;
        case 'w':
            snakeGame.changeDirection(directions.top)
            break;
        case "ArrowLeft":
            snakeGame.changeDirection(directions.left)
            break;
        case 'a':
            snakeGame.changeDirection(directions.left)
            break;
        case "ArrowRight":
            snakeGame.changeDirection(directions.right)
            break;
        case 'd':
            snakeGame.changeDirection(directions.right)
            break;
        default:
          return;
    }
})
