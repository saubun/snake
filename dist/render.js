const board_border = 'black';
const board_background = 'white';
const snake_color = 'lightblue';
const snake_border = 'darkblue';
const food_color = 'orange';
const food_border = 'darkorange';
let dx = 10;
let dy = 0;
let foodcount = 0;
let score = 0;
let alive = true;
let snake = [
    { x: 200, y: 200 },
    { x: 190, y: 200 },
    { x: 180, y: 200 },
    { x: 170, y: 200 },
    { x: 160, y: 200 },
    { x: 150, y: 200 },
    { x: 140, y: 200 },
    { x: 130, y: 200 },
];
let foodPos = {
    x: 100,
    y: 100,
};
const snakeboard = document.getElementById('snakeboard');
const ctx = snakeboard.getContext('2d');
document.addEventListener('keydown', (e) => {
    const goingUp = dy === -10 && dx === 0;
    const goingDown = dy === 10 && dx === 0;
    const goingRight = dy === 0 && dx === 10;
    const goingLeft = dy === 0 && dx === -10;
    if ((e.code === 'KeyW' || e.code === 'ArrowUp') && !goingDown) {
        dy = -10;
        dx = 0;
    }
    else if ((e.code === 'KeyS' || e.code === 'ArrowDown') && !goingUp) {
        dy = 10;
        dx = 0;
    }
    else if ((e.code === 'KeyA' || e.code === 'ArrowLeft') && !goingRight) {
        dy = 0;
        dx = -10;
    }
    else if ((e.code === 'KeyD' || e.code === 'ArrowRight') && !goingLeft) {
        dy = 0;
        dx = 10;
    }
});
function main() {
    setTimeout(() => {
        if (alive) {
            clearCanvas();
            selfCollisionCheck();
            borderCheck();
            moveSnake();
            drawSnake();
            drawFood();
            foodCollisionCheck();
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
    const head = snake[0];
    if (head.x < 0 || head.y < 0 || head.x > snakeboard.width || head.y > snakeboard.height) {
        alive = false;
    }
}
function selfCollisionCheck() {
    const head = snake[0];
    snake.slice(1).forEach((part) => {
        if (head.x === part.x && head.y === part.y) {
            alive = false;
        }
    });
}
function foodCollisionCheck() {
    const head = snake[0];
    if (head.x < foodPos.x + 10 &&
        head.x + 10 > foodPos.x &&
        head.y < foodPos.y + 10 &&
        head.y + 10 > foodPos.y) {
        updateScore();
        spawnFood();
        increaseLength();
    }
}
function spawnFood() {
    let posX = Math.round(((Math.random() * 400) / 10) * 10);
    let posY = Math.round(((Math.random() * 400) / 10) * 10);
    foodPos = { x: posX, y: posY };
}
function drawFood() {
    ctx.fillStyle = food_color;
    ctx.strokeStyle = food_border;
    ctx.fillRect(foodPos.x, foodPos.y, 10, 10);
    ctx.strokeRect(foodPos.x, foodPos.y, 10, 10);
}
function updateScore() {
    score += 1;
    document.getElementById('score').innerHTML = score.toString();
}
function increaseLength() {
    snake.push({ x: snake[snake.length - 1].x, y: snake[snake.length - 1].y });
}
window.onload = main;
//# sourceMappingURL=render.js.map