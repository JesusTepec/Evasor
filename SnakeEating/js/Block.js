var Block = function (col, row, color){
	this.col = col;
	this.row = row;
	this.color = color;
	console.log(color);
}

Block.prototype.drawSquare = function () {
	var x = this.col * blockSize;
	var y = this.row * blockSize;
	context.fillStyle = this.color;
	context.fillRect(x, y, blockSize, blockSize);
}

Block.prototype.drawCircle = function (color) {
	var centerX = this.col * blockSize + blockSize / 2;
	var centerY = this.row * blockSize + blockSize / 2;
	context.fillStyle = color;
	circle(centerX, centerY, blockSize / 2, true);
}

Block.prototype.equal = function (otherBlock){
	return this.col === otherBlock.col && this.row === otherBlock.row;
}