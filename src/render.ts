const board_border = 'black';
const board_background = 'white';
const snake_color = 'lightblue';
const snake_border = 'darkblue';
const food_color = 'orange';
const food_border = 'darkorange';

let dx: number = 10;
let dy: number = 0;
let foodcount: number = 0;
let score: number = 0;
let alive: boolean = true;

interface Vector2 {
	x: number;
	y: number;
}

// Snake body
let snake: Vector2[] = [
	{ x: 200, y: 200 },
	{ x: 190, y: 200 },
	{ x: 180, y: 200 },
	{ x: 170, y: 200 },
	{ x: 160, y: 200 },
	{ x: 150, y: 200 },
	{ x: 140, y: 200 },
	{ x: 130, y: 200 },
];

// Position of current piece of food
let foodPos: Vector2 = {
	x: 100,
	y: 100,
};

// Get context
const snakeboard = document.getElementById('snakeboard')! as HTMLCanvasElement;
const ctx = snakeboard.getContext('2d')! as CanvasRenderingContext2D;

// Input
document.addEventListener('keydown', (e): void => {
	// Don't let player just run into self by pressing opposite direction
	const goingUp = dy === -10 && dx === 0;
	const goingDown = dy === 10 && dx === 0;
	const goingRight = dy === 0 && dx === 10;
	const goingLeft = dy === 0 && dx === -10;

	if ((e.code === 'KeyW' || e.code === 'ArrowUp') && !goingDown) {
		dy = -10;
		dx = 0;
	} else if ((e.code === 'KeyS' || e.code === 'ArrowDown') && !goingUp) {
		dy = 10;
		dx = 0;
	} else if ((e.code === 'KeyA' || e.code === 'ArrowLeft') && !goingRight) {
		dy = 0;
		dx = -10;
	} else if ((e.code === 'KeyD' || e.code === 'ArrowRight') && !goingLeft) {
		dy = 0;
		dx = 10;
	}
});

// Main function
function main(): void {
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

// Clears the canvas with a white rectangle
function clearCanvas(): void {
	ctx.fillStyle = board_background;
	ctx.strokeStyle = board_border;
	ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
	ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}

// Draw the snake on the canvas
function drawSnake(): void {
	snake.forEach(drawSnakePart);
}

// Draw one snake part
function drawSnakePart(snakePart: Vector2): void {
	ctx.fillStyle = snake_color;
	ctx.strokeStyle = snake_border;
	ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
	ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

// Moves snake position based on dx and dy
function moveSnake(): void {
	const head: Vector2 = {
		x: snake[0].x + dx,
		y: snake[0].y + dy,
	};
	snake.unshift(head);
	snake.pop();
}

// Checks if the snake touches the border
function borderCheck(): void {
	const head = snake[0];

	// Borders are weird :/
	if (head.x < 0 || head.y < 0 || head.x > snakeboard.width || head.y > snakeboard.height) {
		alive = false;
	}
}

// Checks if the snake touches itself
function selfCollisionCheck(): void {
	const head = snake[0];

	// Slice so head isn't included
	snake.slice(1).forEach((part) => {
		if (head.x === part.x && head.y === part.y) {
			alive = false;
		}
	});
}

// Checks for collision with food <3
function foodCollisionCheck() {
	const head = snake[0];

	// Collision detection logic from
	// https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
	if (
		head.x < foodPos.x + 10 &&
		head.x + 10 > foodPos.x &&
		head.y < foodPos.y + 10 &&
		head.y + 10 > foodPos.y
	) {
		updateScore();
		spawnFood();
		increaseLength();
	}
}

// Spawn a piece of food when one is eaten
function spawnFood() {
	// Rounding to tens still isn't working :/
	let posX = Math.round(((Math.random() * 400) / 10) * 10);
	let posY = Math.round(((Math.random() * 400) / 10) * 10);

	foodPos = { x: posX, y: posY };
}

// Draw the food
function drawFood() {
	ctx.fillStyle = food_color;
	ctx.strokeStyle = food_border;
	ctx.fillRect(foodPos.x, foodPos.y, 10, 10);
	ctx.strokeRect(foodPos.x, foodPos.y, 10, 10);
}

// Increase score by one
function updateScore() {
	score += 1;
	document.getElementById('score')!.innerHTML = score.toString();
}

// Increase the length of the snake
function increaseLength() {
	snake.push({ x: snake[snake.length - 1].x, y: snake[snake.length - 1].y });
}

// Start the game
window.onload = main;
