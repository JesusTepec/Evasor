/**
 * Dibuha un arco predefinido
 * @param  {[type]} contexto contexto canvas
 */
function dibujarArco(contexto){
  contexto.lineWidth = 4;
  contexto.strokeStyle = "#E84D0C";
  contexto.fillStyle ="#00B299";
  contexto.beginPath();
  contexto.arc(200, 200, 150, 0, obtenerRadianes(180), false);
  contexto.stroke();
  contexto.fill();
  contexto.closePath();
}

/**
 * Dibuja un ciculo con relleno o sin relleno
 * @param  {[type]}   contexto  contexto del canvas
 * @param  {array}    centro    [x, y]
 * @param  {entero}   radio     redio de la circunferencia
 * @param  {boolean}  relleno   true:relleno o false: sin relleno
 */
function circulo(contexto, centro, radio, relleno) {
  contexto.lineWidth = 2;
  contexto.strokeStyle = "#E84D0C";
  contexto.fillStyle ="#00B299";
  contexto.beginPath();
  contexto.arc(centro[0], centro[1], radio, 0, 2 * Math.PI);
  contexto.stroke();
  if(relleno)
    contexto.fill();
  contexto.closePath();
}

/**
 * Dibuja texto en posición predefinida
 * @param  {[type]}  contexto contexto de canvas
 * @param  {string}  texto    mensaje a mostrar
 * @param  {boolean} relleno  true = relleno o false = sin relleno
 */
function texto(contexto, texto, relleno) {
  contexto.fillStyle ="#00B299";
  contexto.strokeStyle = "#0095DD";
  contexto.font = "46pt Arial";
  if(relleno)
    contexto.fillText(texto, 60, 150);
  else
    contexto.strokeText(texto, 55, 200);
}
