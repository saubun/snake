const board_border = 'black';
const board_background = 'white';
const snake_color = 'lightblue';
const snake_border = 'darkblue';
let dx = 10;
let dy = 0;
let alive = true;
let snake = [
    { x: 200, y: 200 },
    { x: 190, y: 200 },
    { x: 180, y: 200 },
    { x: 170, y: 200 },
    { x: 160, y: 200 },
];
const snakeboard = document.getElementById('snakeboard');
const ctx = snakeboard.getContext('2d');
document.addEventListener('keydown', (e) => {
    if (e.code === 'KeyW' || e.code === 'ArrowUp') {
        dy = -10;
        dx = 0;
    }
    else if (e.code === 'KeyS' || e.code === 'ArrowDown') {
        dy = 10;
        dx = 0;
    }
    else if (e.code === 'KeyA' || e.code === 'ArrowLeft') {
        dy = 0;
        dx = -10;
    }
    else if (e.code === 'KeyD' || e.code === 'ArrowRight') {
        dy = 0;
        dx = 10;
    }
});
function main() {
    setTimeout(() => {
        if (alive) {
            clearCanvas();
            moveSnake();
            borderCheck();
            selfCollisionCheck();
            drawSnake();
        }
        main();
    }, 100);
}
function clearCanvas() {
    ctx.fillStyle = board_background;
    ctx.strokeStyle = board_border;
    ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
    ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}
function drawSnake() {
    snake.forEach(drawSnakePart);
}
function drawSnakePart(snakePart) {
    ctx.fillStyle = snake_color;
    ctx.strokeStyle = snake_border;
    ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}
function moveSnake() {
    const head = {
        x: snake[0].x + dx,
        y: snake[0].y + dy,
    };
    snake.unshift(head);
    snake.pop();
}
function borderCheck() {
    const head = {
        x: snake[0].x,
        y: snake[0].y,
    };
}
function selfCollisionCheck() {
    const head = {
        x: snake[0].x,
        y: snake[0].y,
    };
}
window.onload = main;
//# sourceMappingURL=render.js.map