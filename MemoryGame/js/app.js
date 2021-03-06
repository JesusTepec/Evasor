
window.addEventListener("load", eventWindowLoaded, false);

var tarjeta = null;
var tarjetas = [];
var margen = 10;
var rows = 3;
var cols = 3;

function eventWindowLoaded(){
  canvasApp();
}

function canvasSupport(){
  return Modernizr.canvas;
}

function canvasApp(){

  if(!canvasSupport()){
    return;
  } else {
    var canvas = document.getElementById("Canvas");
    var context = canvas.getContext("2d");
    var canvasPos = canvas.getBoundingClientRect();
  }

   function dibujarTexto(info, x, y){
    context.save()
    context.fillStyle = "#58777F";
    context.font = "50px Dimitri Swank";
    context.fillText(info, x, y);
    context.restore;
  }

  function dibujaTarjeta(tarjeta, seleccionado){
  	context.fillStyle = "white";
  	context.fillRect(tarjeta.x, tarjeta.y, tarjeta.w, tarjeta.h);
    context.strokeRect(tarjeta.x, tarjeta.y, tarjeta.w, tarjeta.h);
    if(seleccionado) {
    	dibujarTexto(tarjeta.info, tarjeta.x + tarjeta.w / 3, tarjeta.y + tarjeta.h / 1.5);
    }
  }

  function crearTarjetas() {
    var width = (canvas.width -margen * 2) / rows;
    var height = (canvas.height -margen * 2) / cols;
    var xx = margen;
    var yy = margen;
    var n = 0;

    for(i = 0; i < rows; i++){
      for(j = 0; j < cols; j++){
        var tarjeta = {x: xx, y: yy, w: width, h: height, info: n};
        tarjetas.push(tarjeta);
        dibujaTarjeta(tarjeta);
        xx += width;
        n++;
      }
      xx = margen;
      yy += height;
    }
  }

  function enArea(pos){
    for (index in tarjetas){
      var tarjeta = tarjetas[index];
      if(pos.x > tarjeta.x && pos.x < tarjeta.x + tarjeta.w && pos.y > tarjeta.y && pos.y < tarjeta.y + tarjeta.h){
        return tarjeta;
      }
    }
  }

  function voltearTarjeta(){
    dibujaTarjeta(tarjeta, false)
  }

  function seleccionarTajeta(posicionRaton) {
    tarjeta = enArea(posicionRaton);
    dibujaTarjeta(tarjeta, true);
    setTimeout(voltearTarjeta, 600);
  }

  function drawScene(){
    context.setLineDash([15]);
    crearTarjetas();
  }

  canvas.onclick = function(e){
    var pos = {x: e.clientX - canvasPos.left, y: e.clientY - canvasPos.top};
    seleccionarTajeta(pos);
  }
  drawScene();

}
