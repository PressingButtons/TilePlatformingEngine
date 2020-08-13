'use strict';
const MapBuilder = function(tilesize) {

  const createCanvas = map => {
    const canvas = document.createElement('canvas');
    canvas.height = map.length * tilesize;
    canvas.width = map[0].length * tilesize;
    return canvas;
  }

  const build = map => {

    const tiletypes = {
      '.' : null,
      '#' : 'rectangle',
    }

    return new Promise(function(resolve, reject) {
      const canvas = createCanvas( map );
      const g = new Graphics( canvas );
      g.begin();
      for( var i = 0, row; i < map.length; i++ ) {
          row = map[i];
        for( var j = 0, value; j < row.length ; j++ ) {
          value = row[j]
          if( value == '.' || value == 's' ) continue;
          g.drawShape[tiletypes[value]]( j * tilesize, i * tilesize, tilesize, tilesize);
        }
      }
      g.finish('#00ACE0AC','#004085FF');
      resolve(canvas);
    });
  }

  return {
    build: build,
  }

}
