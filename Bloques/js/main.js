var canvas = document.getElementById("areaDibujo");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var paletaHeight = 10;
var paletaWidth = 75;
var paletaX = (canvas.width - paletaWidth) / 2;
var rightPressed = false;
var leftPressed = false;

function dibujarPelota(){
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function dibujarPaleta(){
  ctx.beginPath();
  ctx.rect(paletaX, canvas.height - paletaHeight, paletaWidth, paletaHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function dibujar(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dibujarPelota();
  dibujarPaleta();

  if(x + dx > canvas.width - ballRadius || x + dx < ballRadius){
    dx = - dx;
  }
  if(y + dy > canvas.height - ballRadius || y + dy < ballRadius){
    dy = -dy;
  }

  x += dx;
  y += dy;
}

setInterval(dibujar, 10);
