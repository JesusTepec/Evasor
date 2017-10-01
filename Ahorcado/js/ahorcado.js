var ctx;
var canvas;
var palabras;
var letras = "qwertyuiopasdfghjklñzxcvbnm";
var colorTecla = "purple";
var colorMargen = "yellow";
var inicioX = 170;
var inicioY = 340;
var longitud = 35;
var margen = 20;
var arrayTeclas = new Array();
var arrayLetras = new Array();
var arrayPalabras = "PEGASO,AFRODITA,ATENEA,HARES,HERMES,DIONISIO,CRONOS,PERSEO,POSEIDON,APOLO".split(',');

var aciertos = 0;
var errores = 0;

function Tecla(x, y, ancho, alto, letra) {
  this.x = x;
  this.y = y;
  this.ancho = ancho;
  this.alto = alto;
  this.letra = letra;
  this.dibuja = dibujaTecla;
}

function Letra(x, y, ancho, alto, letra) {
  this.x = x;
  this.y = y;
  this.ancho = ancho;
  this.alto = alto;
  this.letra = letra;
  this.dibuja = function(){
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.fillRect(this.x, this.y, this.ancho, this.alto);
    ctx.strokeRect(this.x, this.y, this.ancho, this.alto);
  };
  this.dibujaLetra = function(){};
}

function dibujaTecla() {
  ctx.fillStyle = colorTecla;
  ctx.strokeStyle = colorMargen;
  ctx.fillRect(this.x, this.y, this.ancho, this.alto);
  ctx.strokeRect(this.x, this.y, this.ancho, this.alto);
  ctx.fillStyle = "white";
  ctx.font = "bold 20px Courier";
  ctx.fillText(this.letra, this.x + this.ancho / 2 - 5, this.y + this.alto /2 + 4);
}

function teclado(){
  var row = 0;
  var col = 0;
  var letra = "";
  var miTecla;
  var x = inicioX;
  var y = inicioY;
  for(var index in letras) {
    miTecla = new Tecla(x, y, longitud, longitud, letras[index]);
    miTecla.dibuja();
    arrayTeclas.push(miTecla);
    x += longitud + margen;
    col ++;
    if(col == 10){
      col = 0;
      row++;
      if(row == 2){
        x = 250;
      }else{
        x = inicioX;
      }
    }
    y = inicioY + row * 50;
  }
}

function pintaPalabra() {
  var indexRandom = Math.floor(Math.random() * arrayPalabras.length);
  palabra = arrayPalabras[indexRandom];
  var row = 0;
  var col = 0;
  var y = 230;
  var longitud = 50;
  var x = (canvas.width - (longitud + margen) * palabra.length) / 2;
  console.log(x);
  for (var i = 0; i < palabra.length; i++) {
    miLetra = new Letra(x, y, longitud, longitud, palabra[i]);
    miLetra.dibuja();
    arrayLetras.push(miLetra);
    x += longitud + margen;
  }
}

window.onload = function(){
  canvas = document.getElementById('gameArea');
  if(canvas && canvas.getContext){
    ctx = canvas.getContext("2d");
    teclado();
    pintaPalabra()
  }
}
