const board_border = 'black';
const board_background = 'white';
const snake_color = 'lightblue';
const snake_border = 'darkblue';
let dx: number = 10;
let dy: number = 0;

let alive = true;

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
];

// Get context
const snakeboard = document.getElementById('snakeboard')! as HTMLCanvasElement;
const ctx = snakeboard.getContext('2d')! as CanvasRenderingContext2D;

// Input
document.addEventListener('keydown', (e) => {
	if (e.code === 'KeyW' || e.code === 'ArrowUp') {
		dy = -10;
		dx = 0;
	} else if (e.code === 'KeyS' || e.code === 'ArrowDown') {
		dy = 10;
		dx = 0;
	} else if (e.code === 'KeyA' || e.code === 'ArrowLeft') {
		dy = 0;
		dx = -10;
	} else if (e.code === 'KeyD' || e.code === 'ArrowRight') {
		dy = 0;
		dx = 10;
	}
});

// Main function
function main(): void {
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
	const head: Vector2 = {
		x: snake[0].x,
		y: snake[0].y,
	};
}

// Checks if the snake touches itself
function selfCollisionCheck(): void {
	const head: Vector2 = {
		x: snake[0].x,
		y: snake[0].y,
	};
}

// Start the game
window.onload = main;
