window.onload = event => {

  window.example = (( ) =>{
    const TILESIZE = 40, FPS = 60;
    const aspectRatio = { width: 16, height: 9};
    const resolution = { width: 640, height: 360};
    const builder = new MapBuilder( TILESIZE );
    const graphics = new Graphics( document.getElementById('canvas') );
    const keys = new KeyReader();
    const camera = { x: 0, y: 0, width: resolution.width, height: resolution.height }
    var animation_id = 0;
    var demonstration = null;

    const createDemonstration = value => {
      if(demonstration != null) delete demonstration;
      demonstration = new Demonstration(TILESIZE);
      demonstration.target = demonstration.createObject(40,60,'#FFF', 'rectangle');
      demonstration.buildScene(builder, maps[value]).then(demonstration.run);
    }

    const drawExample = ( ) => {
      if( demonstration == null || demonstration.scene == null ) return;
      graphics.renderScene(demonstration.scene, camera );
      graphics.renderObjects(demonstration.objects, camera );
    }

    const updateCamera = ( dt ) => {
      const target = demonstration.target
      if( target == null ) return;
      camera.x = target.left(dt) - camera.width * 0.5;
      camera.y = target.top(dt) - camera.height * 0.5;
      const BOUNDS = demonstration.BOUNDARY;
      //x bounds
      camera.x = camera.x < BOUNDS.LEFT ? BOUNDS.LEFT :
      camera.x + camera.width > BOUNDS.RIGHT ? BOUNDS.RIGHT - camera.width :
      camera.x;
      //y bounds
      camera.y = camera.y < BOUNDS.TOP ? BOUNDS.TOP :
      camera.y + camera.height > BOUNDS.BOTTOM ? BOUNDS.BOTTOM - camera.height :
      camera.y;
    }

    const controlTarget = (target,dt) => {
      const SPD = 16
      const ACC = 5;
      const JUMP = -60;
      if( target == null ) return;
      if( keys.Key.Up && target.onland)  target.yspd = JUMP;
      if( keys.Key.Down )  target.yspd = target.yspd <  SPD ? target.yspd + ACC * dt :  SPD;
      if( keys.Key.Left )  target.xspd = target.xspd > -SPD ? target.xspd - ACC * dt : -SPD;
      if( keys.Key.Right ) target.xspd = target.xspd <  SPD ? target.xspd + ACC * dt :  SPD;
    }

    const moveTarget = (target,dt) => {
      target.x += target.xspd * dt;
      target.y += target.yspd * dt;
      friction(target, dt);
    }

    const friction = (target, dt) => {
      target.xspd = target.xspd > 0.1 ? target.xspd - dt : target.xspd < -0.1 ? target.xspd + dt : 0;
      target.yspd = target.yspd > 0.1 ? target.yspd - dt : target.yspd < -0.1 ? target.yspd + dt : 0;
    }

    document.getElementById('canvas').addEventListener('Render', drawExample );

    const stop = function( ) {
      window.cancelAnimationFrame(animation_id);
    }

    const run = function() {
      stop();
      let now = Date.now();
      let then = now;
      const GRAVITY = 13;
      const loop = ( ) => {
        now = Date.now();
        const dt = (now - then) * 0.01;
        if( demonstration != null ) {
          controlTarget(demonstration.target, dt);
          demonstration.target.yspd += GRAVITY * dt;
          demonstration.resolve_collisions(dt);
          moveTarget( demonstration.target, dt);
          updateCamera(dt);
          drawExample();
          statWriter( demonstration.target, graphics.ctx, TILESIZE );
        }
        then = now;
        animation_id = window.requestAnimationFrame( loop );
      }
      loop();
    }

    document.addEventListener('click', function(e){
      if( e.target == document.getElementById('canvas') ) {
        run();
      } else {
        stop();
      }
    });
    document.addEventListener('blur', stop);
    /*
    document.getElementById('canvas').addEventListener('click', run );
    */

    1000/60

    return {
      aspectRatio: aspectRatio,
      resolution: resolution,
      createDemonstration:createDemonstration,
    }

  })();

  window.onresize = window_resize;
  window_resize();
  example.createDemonstration(1);
  //example.run();
}
