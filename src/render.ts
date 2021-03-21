const board_border = 'black';
const board_background = 'white';
const snake_color = 'lightblue';
const snake_border = 'darkblue';

interface Vector2 {
	x: number;
	y: number;
}

let snake: Vector2[] = [
	{ x: 200, y: 200 },
	{ x: 190, y: 200 },
	{ x: 180, y: 200 },
	{ x: 170, y: 200 },
	{ x: 160, y: 200 },
];

const snakeboard = document.getElementById('snakeboard') as HTMLCanvasElement;
const ctx = snakeboard.getContext('2d');

window.onload = (): void => {
	clearCanvas();
	drawSnake();
};

function clearCanvas(): void {
	ctx.fillStyle = board_background;
	ctx.strokeStyle = board_border;
	ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
	ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}

// Draw the snake on the canvas
function drawSnake() {
	// Draw each part
	snake.forEach(drawSnakePart);
}

// Draw one snake part
function drawSnakePart(snakePart: Vector2) {
	ctx.fillStyle = snake_color;
	ctx.strokeStyle = snake_border;
	ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
	ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}
