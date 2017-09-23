var canvas = undefined;
var context = undefined;

function start() {
  canvas = document.getElementById("myCanvas");
  context = canvas.getContext("2d");
  mainLoop();
}

document.addEventListener('DOMContentLoaded', start);

function update(){

}

function draw() {

}

function mainLoop() {
  context.fillStyle = "yellow";
  context.fillRect(0, 0, canvas.width, canvas.height);
  update();
  draw();
  window.setTimeout(mainLoop, 1000 / 60);
}
