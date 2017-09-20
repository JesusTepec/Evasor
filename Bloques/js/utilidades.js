function getRandomColor() {
  var carateres = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += carateres[Math.floor(Math.random() * 16)];
  }
  return color;
}

function obtenerRadianes(grados){
  return grados * Math.PI / 180;
}
