'use strict';
const Demonstration = function( tilesize ) {

  var objects = [];
  var scene = null;
  var map = null;
  var boundary = {
    top:0, left:0, right:0, bottom:0
  }

  var tce = null;

  const buildScene = ( builder, tilemap ) => {
    return new Promise(async function(resolve, reject) {
      scene = await builder.build(tilemap);
      map = tilemap;
      boundary.top = 0;
      boundary.left = 0;
      boundary.right = tilemap[0].length * tilesize;
      boundary.bottom = tilemap.length * tilesize;
      tce = new Tile_Collision_Engine( tilesize, tilemap );
      resolve( 'complete' );
    });
  }

  const createObject = ( width, height, color, shape, row = 1, col = 1 ) => {
    const obj = new GameObject(width, height, shape, color );
    obj.x = col * tilesize, obj.y = row * tilesize;
    objects.push(obj);
    return obj;
  }

  return {
    get objects() { return objects },
    get scene( ) { return scene },
    get BOUNDARY() {
      return { LEFT: boundary.left,
               RIGHT: boundary.right,
               TOP: boundary.top,
               BOTTOM: boundary.bottom
             }
    },
    buildScene: buildScene,
    createObject : createObject,
    target: null,
    resolve_collisions: function(dt) {
      if( tce == null ) return;
      tce.resolve_collisions(objects,dt);
    }
  }

}
