var canvas;
var contexto;
var PIEZAS_OBJETIVO = 7;
var CASTIGO_FALLA = 2;
var RECOMPENSA_GOLPE = 3;
var INTERVALO_TIEMPO = 25;

var temporizadorIntervalo;
var conteotemporizador;

var tiempoRestante;
var disparosRealizados;
var tiempoTranscurrido;

var bloqueador;
var distanciaBloqueador;
var inicioBloqueador;
var finBloqueador;
var velocidadInicialBloqueador;
var velocidadBloqueador;

var objetivo;
var distanciaObjetivo;
var inicioObjetivo;
var finObjetivo;
var longitudPieza;
var velocidadInicialObjetivo;
var velocidadObjetivo;

var anchuraLinea;
var estadoGolpe;
var piezasGolpeadasObjetivo;

var balaCanion;
var velocidadBalaCanion;
var balaEnPantalla;
var radioBala;
var velocidadBala;
var radioBaseCanion;
var longitudCanion;
var finBarril;
var anchoCanvas;
var altoCanvas;

var sonidoObjetivo;
var sonidoCanion;
var sonidoBloqueador;

function configuraciones(){
  document.addEventListener("unload", detenerTemporizador, false);
  canvas = document.getElementById("canvas");
  contexto = canvas.getContext("2d");
  document.getElementById("botonIniciar").addEventListener("click", nuevoJuego, false);

  bloqueador = new Object();
  bloqueador.inicio = new Object();
  bloqueador.fin = new Object();
  objetivo = new Object();
  objetivo.inicio = new Object();
  objetivo.fin = new Object();
  balaCanion = new Object();
  finBarril = new Object();

  estadoGolpe = new Array(PIEZAS_OBJETIVO);

  sonidoObjetivo = document.getElementById("sonidoObjetivo");
  sonidoObjetivo = document.getElementById("sonidoCanion");
  sonidoObjetivo = document.getElementById("sonidoBloqueador");
}

function iniciarTemporizador(){
  canvas.addEventListener("click", dispararBalaCanion, false);
  temporizadorIntervalo = window.setInterval(actualizarPosiciones, INTERVALO_TIEMPO);
}

function detenerTemporizador(){
  canvas.removeEventListener("click", dispararBalaCanion, false);
  window.clearInterval(temporizadorIntervalo);
}

function reiniciarElementos(){
  var w = canvas.width;
  var h = canvas.height;

  anchoCanvas = w;
  altoCanvas = h;
  radioBaseCanion = h / 18;
  longitudCanion = w / 8;

  radioBala = w / 6;
  velocidadBala = w * 3 / 2;

  anchuraLinea = w / 24;

  distanciaBloqueador = w * 5 / 8;
  inicioBloqueador = h / 8;
  finBloqueador = h * 3 / 8;
  velocidadInicialBloqueador = h / 2;
  bloqueador.inicio.x = distanciaBloqueador;
  bloqueador.inicio.y = inicioBloqueador;
  bloqueador.fin.x = distanciaBloqueador;
  bloqueador.fin.y = finBloqueador;

  distanciaObjetivo = w * 7 / 8;
  inicioObjetivo = h / 8;
  finObjetivo = h * 7 / 8;
  longitudPieza = (finObjetivo - inicioObjetivo) / PIEZAS_OBJETIVO;
  velocidadInicialObjetivo = h / 4;
  objetivo.inicio.x = distanciaObjetivo;
  objetivo.inicio.y = inicioObjetivo;
  objetivo.fin.x = distanciaObjetivo;
  objetivo.fin.y = finObjetivo;

  finBarril.x = longitudCanion;
  finBarril.y = h / 2;
}

function nuevoJuego(){
  reiniciarElementos();
  detenerTemporizador();

  for(var i = 0; i < PIEZAS_OBJETIVO; ++i){
    estadoGolpe[i] = false;
  }

  piezasGolpeadasObjetivo = 0;
  velocidadBloqueador = velocidadInicialBloqueador;
  velocidadObjetivo = velocidadInicialObjetivo
  tiempoRestante = 10;
  conteotemporizador = 0;
  balaEnPantalla = false;
  disparosRealizados = 0;
  tiempoTranscurrido = 0;

  iniciarTemporizador();
}

function actiualizarPosiciones(){
  var actualizarBloqueador = INTERVALO_TIEMPO / 1000.0 * velocidadBloqueador;
  bloqueador.inicio.y += actualizarBloqueador;
  bloqueador.fin.y += actualizarBloqueador;

  var actualizarObjetivo = INTERVALO_TIEMPO / 1000.0 * velocidadObjetivo;
  objetivo.inicio.y += actualizarObjetivo;
  objetivo.fin.y += actualizarObjetivo;

  if(bloqueador.inicio.y < 0 || bloqueador.fin.y > altoCanvas){
    velocidadBloqueador *= -1;
  }
  if(objetivo.inicio.y < 0 || objetivo.fin.y > altoCanvas){
    velocidadObjetivo *= -1;
  }

  if(balaEnPantalla){
    var intervalo = INTERVALO_TIEMPO / 1000.0;

    balaCanion.x += intervalo * velocidadBalaCanionX;
    balaCanion.y += intervalo * velocidadBalaCanionY;

    if(velocidadBalaCanionX > 0 &&
      balaCanion.x + radioBala >= distanciaBloqueador &&
      balaCanion.x + radioBala <= distanciaBloqueador + anchuraLinea &&
      balaCanion.y - radioBala > bloqueador.inicio.y &&
      balaCanion.y + radioBala < bloqueador.fin.y){
        sonidoBloqueador.play();
        velocidadBalaCanionX *= -1;
        tiempoRestante -= CASTIGO_FALLA;
      }
      else if(balaCanion.x + radioBala > anchoCanvas || balaCanion.x - radioBala < 0){
        balaEnPantalla = false;
      }
      else if(balaCanion.y + radioBala > altoCanvas || balaCanion.y - radioBala < 0){
        balaEnPantalla = false;
      }
      else if(velocidadBalaCanionX > 0 &&
        balaCanion.x + radioBala >= distanciaObjetivo &&
        balaCanion.x + radioBala <= distanciaObjetivo + anchuraLinea &&
        balaCanion.y - radioBala > objetivo > objetivo.inicio.y &&
        balaCanion.y + radioBala < objetivo.fin.y){

      }
  }
}
