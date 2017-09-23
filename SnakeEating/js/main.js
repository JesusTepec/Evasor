var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var width = canvas.width;
var height = canvas.height;

var blockSize = 10;
var widthInBlocks = width / blockSize;
var heightInBlocks = height / blockSize;

var score = 0;

var drawBorder = function () {
	context.fillStyle = "Gray";
	context.fillRect(0, 0, width, blockSize);
	context.fillRect(0, height - blockSize, width, blockSize);
	context.fillRect(0, 0, blockSize, height);
	context.fillRect(width - blockSize, 0, blockSize, height);
}

var drawScore = function () {
	context.font = "20px Courier";
	context.fillStyle = "Black";
	context.textAlign = "left";
	context.textBaseline = "top";
	context.fillText("Score: " + score, blockSize, blockSize);
}

var gameOver = function(){
	clearInterval(intervalId);
	context.font = "60px Courier";
	context.fillStyle = "Black";
	context.textAlign = "center";
	context.textBaseline = "middle";
	context.fillText("Game Over", width / 2, height / 2);
}

var circle = function (x, y, radius, fill){
	context.beginPath();
	context.arc(x, y, radius, 0, 2 * Math.PI, false);
	if(fill){
		context.fill();
	} else {
		context.stroke();
	}
}

var snake = new Snake();
var apple = new Apple();

var intervalId = setInterval(function(){
	context.clearRect(0, 0, width, height);
	drawScore();
	snake.move();
	snake.draw();
	apple.draw();
	drawBorder();
}, 100);

var directions = {
	37: "left",
	38: "up",
	39: "right",
	40: "down"
};

$("body").keydown(function(event){
	var newDirection = directions[event.keyCode];
	if(newDirection !== undefined){
		snake.setDirection(newDirection);
	}
});