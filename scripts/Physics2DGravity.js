'use strict';
const Physics2DGravity = function( world_collision_engine, object_collision_engine. physics_parms ) {

  const applyForces = (objects,dt) => {
    for(var i = 0; i < objects[i]; i++ ) {
      moveObject(objects[i]);
      frictionalForce(objects[i]);
    }
  }

  const applyGravity = (object,dt) => {
    //apply gravity to spd
    object.yspd = object.yspd + (physics_parms.gravity * dt)  < physics_parms.terminalG ? object.yspd + (physics_parms.gravity * dt) : object.yspd;
  }

  const frictionalForce = object => {

  }

  const moveObject = (object,dt) => {
    object.x += object.xspd; //move in x direction
    object.y += object.yspd; //move in y direction
  }

  const update = ( dt, ...parms ) => {
    applyForces( dt, parms[0] ); //move the objects
  }

  return {
    update : update
  }

}
