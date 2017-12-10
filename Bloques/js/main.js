var canvas = document.getElementById("areaDibujo");
var ctx = canvas.getContext("2d");
var radioPelota = 10;
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var paletaHeight = 10;
var paletaWidth = 90;
var paletaX = (canvas.width - paletaWidth) / 2;
var paletaY = canvas.height - paletaHeight;
var rightPressed = false;
var leftPressed = false
var colorPelota = "#0095DD";
var ladrilloRowCount = 3;
var ladrilloColumnCount = 5;
var ladrilloWidth = 75;
var ladrilloHeight = 20;
var ladrilloPadding = 10;
var ladrilloOffsetTop = 30;
var ladrilloOffsetLeft = 30;
var puntuacion = 0;

var ladrillos = [];
for(c = 0; c < ladrilloColumnCount; c++){
  ladrillos[c] = [];
  for(r = 0; r < ladrilloRowCount; r++){
    ladrillos[c][r] = {x: 0, y: 0, status: 1};
  }
}

document.addEventListener("keydown", controladorKeyDown, false);
document.addEventListener("keyup", controladorKeyUp, false);

/**
 * Detecta si se a presionado <- o -> del teclado
 * @param  {event} e        evento up o down
 * @param  {boolean} estado estado de tecla
 */
function codeKey(e, estado){
  if(e.keyCode == 39) {
    rightPressed = estado;
  } else if(e.keyCode == 37) {
    leftPressed = estado;
  }
}

function controladorKeyDown(e) {
  codeKey(e, true);
}

function controladorKeyUp(e) {
  codeKey(e, false)
}

/**
 * Deteccion de choque de pelota con los ladrillos
 */
function colisionLadrillos(){
  for(c = 0; c < ladrilloColumnCount; c++){
    for(r = 0; r < ladrilloRowCount; r++){
      var b = ladrillos[c][r];
      if(b.status == 1){
        if(x > b.x && x < b.x + ladrilloWidth && y > b.y && y < b.y + ladrilloHeight){
          dy = -dy;
          b.status = 0;
          colorPelota = getRandomColor();
          puntuacion++;
          if(puntuacion == ladrilloRowCount * ladrilloColumnCount){
            youWin();
          }
        }
      }
    }
  }
}

/**
* Dibujo de personaje pelota
*/
function dibujarPelota(){
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI * 2);
  ctx.fillStyle = colorPelota;
  ctx.fill();
  ctx.closePath();
}

/**
 * Dibuja la paleta del jugdor
 */
function dibujarPaleta(){
  ctx.beginPath();
  ctx.rect(paletaX, paletaY, paletaWidth, paletaHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

/**
 * Dibuja el arreglo de ladrillos
 */
function dibujarLadrillos(){
  for(c = 0; c < ladrilloColumnCount; c++){
    for(r = 0; r < ladrilloRowCount; r++){
      if(ladrillos[c][r].status == 1){
        var brickX = (c * (ladrilloWidth + ladrilloPadding)) + ladrilloOffsetLeft;
        var brickY = (r * (ladrilloHeight + ladrilloPadding)) + ladrilloOffsetTop;
        ladrillos[c][r].x = brickX;
        ladrillos[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, ladrilloWidth, ladrilloHeight);
        ctx.fillStyle = "0095DD";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

/**
 * Dibuja un mensaje de GAME OVER
 */
function gameOver(){
//  ctx.clearRect(0, 0, canvas.width, canvas.height);
  texto(ctx, "GAME OVER", false);
}

function youWin() {
  texto(ctx, "   YOU WIN! ");
  //document.location.reload();
  clearInterval(gameLoop);
}

function dibujarPuntuacion() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: " + puntuacion, 8, 20);
}

/**
 * Funcion proncipal del juego
 */
function dibujar(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dibujarLadrillos();
  dibujarPelota();
  dibujarPaleta();
  dibujarPuntuacion();
  colisionLadrillos();
  if(x + dx > canvas.width - radioPelota || x + dx < radioPelota){
    dx = - dx;
    colorPelota = getRandomColor();
  }
  if(y + dy < radioPelota){
    dy = -dy;
    colorPelota = getRandomColor();
  }
  else if(y + dy > paletaY - radioPelota) {
    if(x > paletaX - 6 && x < paletaX + paletaWidth + 6) {
      dy += 0.2;
      dy = -dy;
      colorPelota = getRandomColor();
    }
    else{
      console.log(x);
      console.log(paletaX);
      console.log(paletaWidth);
      gameOver();
      clearInterval(gameLoop);
    }
  }

  if(rightPressed && paletaX < canvas.width - paletaWidth) {
    paletaX += 5;
  }
  else if(leftPressed && paletaX > 0){
    paletaX -= 5;
  }

  x += dx;
  y += dy;
}
gameLoop = setInterval(dibujar, 10);
