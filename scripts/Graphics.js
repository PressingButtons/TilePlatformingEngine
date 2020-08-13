'use strict';

const Graphics = function( canvas ) {
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;

  const drawObjects = ( objects ) => {
    for(var i = 0, obj; obj = objects[i]; i++ ) {
      drawShape[obj.shape]( obj.left(), obj.top(), obj.width, obj.height, obj.color);
    }
  }

  const drawShape = { };
  drawShape.rectangle = ( x, y, width, height, color = null, stroke = null) => {
    ctx.rect(x,y,width,height);
    ctx.strokeStyle = stroke;
    ctx.fillStyle = color;
    if( color == null ) return;
    ctx.fill();
    if( stroke == null) return;
    ctx.stroke();
  }

  const renderScene = (scene, camera) => {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.drawImage( scene, camera.x, camera.y, camera.width, camera.height, 0, 0, camera.width, camera.height );
  }

  const renderObjects = ( objects, camera ) => {
    ctx.beginPath();
    objects.forEach(function(object){
      ctx.fillStyle = object.color;
      drawShape[object.shape](object.left() - camera.x, object.top() - camera.y, object.width, object.height, object.color);
    })
  }

  return {
    begin: function( ) { ctx.beginPath() },
    drawShape: drawShape,
    finish: function(color, stroke = '#00000000') {
      ctx.fillStyle = color; ctx.fill();
      ctx.strokeStyle = stroke, ctx.stroke()
    },
    renderScene: renderScene,
    renderObjects: renderObjects,
  }

}
