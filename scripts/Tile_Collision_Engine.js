'use strict';
const Tile_Collision_Engine = function( tilesize, map ) {

  var tile_types = {
    OPEN: '.',
    SOLID: '#',
    PLATFORM: '-',
  }

  const get_tile_type = value => {
    let result = tile_types.OPEN.indexOf(value);
    if( result != -1 ) return 'OPEN';
    result = tile_types.SOLID.indexOf(value);
    if( result != -1 ) return 'SOLID';
    result = tile_types.PLATFORM.indexOf(value);
    if( result != -1 ) return 'PLATFORM';
    return null;
  }

  const get_tile = ( x, y ) => {
    const row = Math.floor( y / tilesize );
    const col = Math.floor( x / tilesize );
    var result = null;
    try {
      result = map[row][col];
    } catch (err) {
      result = null
    }
    return result;
  }

  const collide_left = (target, map, dt ) => {
    if( get_tile_type(get_tile( target.left(dt), target.top() )) == 'SOLID' || get_tile_type(get_tile(target.left(dt), target.bottom() - 0.1 )) == 'SOLID') {
      target.x = (Math.floor( target.left(dt) / tilesize ) + 1) * tilesize;
      target.xspd = target.xspd < 0 ? 0 : target.xspd;
    }
  }

  const collide_right = (target, map, dt ) => {
    if( get_tile_type(get_tile( target.right(dt), target.top() )) == 'SOLID' || get_tile_type(get_tile(target.right(dt), target.bottom() - 0.1 )) == 'SOLID') {
      target.x = (Math.floor( target.right(dt) / tilesize )) * tilesize - target.width;
      target.xspd = target.xspd > 0 ? 0 : target.xspd;
    }
  }

  const collide_top = (target, map, dt ) => {
    if( get_tile_type( get_tile( target.left(dt), target.top(dt))) == 'SOLID' || get_tile_type(get_tile(target.right(dt) - 0.1 , target.top(dt))) == 'SOLID') {
      target.y = (Math.floor(target.top(dt) / tilesize) + 1) * tilesize;
      target.yspd = target.yspd < 0 ? 0 : target.yspd;
    }
  }

  const collide_bottom = ( target, map, dt ) => {
    if( get_tile_type( get_tile( target.left(dt), target.bottom(dt))) == 'SOLID' || get_tile_type(get_tile(target.right(dt) - 0.1, target.bottom(dt))) == 'SOLID') {
      target.y = (Math.floor(target.bottom(dt) / tilesize)) * tilesize - target.height;
      target.yspd = target.yspd > 0 ? 0 : target.yspd;
      if( target.hasOwnProperty('onland')) target.onland = true;
    }
  }

  const collide_x = ( target, map, dt ) => {
    if( target.xspd <= 0 ) collide_left( target, map, dt );
    else collide_right( target, map, dt );
  }

  const collide_y = (target, map, dt ) => {
    if( target.yspd <= 0 ) collide_top(target, map, dt);
    collide_bottom(target, map, dt);
  }

  const resolve_collisions = (objects, dt) => {
    for(var i = 0, object; i < objects.length; i++ ) {
      object = objects[i];
      collide_x( object, map, dt );
      if( object.hasOwnProperty('onland')) object.onland = false;
      collide_y( object, map, dt );
    }
  }

  return {
    resolve_collisions : resolve_collisions,
  }
}
