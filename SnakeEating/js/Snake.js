var Snake = function () {
	this.segments = [
		new Block(7, 5, "green"),
		new Block(6, 5, "blue"),
		new Block(5, 5, "yellow")
	];
	this.direction = "right";
	this.nexDirection = "right"
};

Snake.prototype.draw = function(){
	for(var i = 0; i < this.segments.length; i++){
		this.segments[i].drawSquare();
	}
};

Snake.prototype.move = function () {
	var head = this.segments[0];
	var newHead;

	this.direction = this.nexDirection;

	if(this.direction === "right"){
		newHead = new Block(head.col + 1, head.row, "green");
	} else if (this.direction === "down") {
		newHead = new Block(head.col, head.row + 1, "green");
	} else if (this.direction === "left") {
		newHead = new Block(head.col - 1, head.row, "green");
	} else if (this.direction === "up") {
		newHead = new Block(head.col, head.row - 1, "green");
	}

	if(this.checkCollision(newHead)){
		gameOver();
		return;
	}

	this.segments.unshift(newHead);

	if(newHead.equal(apple.position)){
		score ++;
		apple.move();
	} else {
		this.segments.pop();
	}
};

Snake.prototype.checkCollision = function(head) {
	var leftCollision  = (head.col === 0);
	var topCollision = (head.row === 0);
	var rightCollision = (head.col === widthInBlocks -1);
	var bottomCollision = (head.row === heightInBlocks -1);

	var wallCollision = leftCollision || topCollision || rightCollision || bottomCollision;

	var selfCollision = false;
	for (var i = 0; i < this.segments.length; i++) {
		if(head.equal(this.segments[i])) {
			selfCollision = true;
		}
	} 

	return wallCollision || selfCollision;
};

Snake.prototype.setDirection = function(newDirection) {
	if(this.direction === "up" && newDirection === "down") {
		return;
	} else if (this.direction === "right" && newDirection === "left") {
		return;
	} else if (this.direction === "down" && newDirection === "up") {

	} else if (this.direction === "left" && newDirection === "right") {
		return;
	}

	this.nexDirection = newDirection;
};