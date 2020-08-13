'use strict';
const KeyReader = function( ) {

  var Key = {
    Up : false,
    Down : false,
    Right: false,
    Left: false
  };

  var keyPressed = {};

  const listener = event => {
    keyPressed[event.key] = event.type == 'keydown' ? true : false;
    Key.Up = keyPressed['w'] == undefined ? false : keyPressed['w'];
    Key.Down = keyPressed['s'] == undefined ? false : keyPressed['s'];
    Key.Left = keyPressed['a'] == undefined ? false : keyPressed['a'];
    Key.Right = keyPressed['d'] == undefined ? false : keyPressed['d'];
  }

  document.addEventListener('keyup', listener)
  document.addEventListener('keydown', listener )

  return {
    Key:Key
  }
}
