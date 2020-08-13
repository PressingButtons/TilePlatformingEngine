'use strict';
var GameObject = function( width, height, shape, color ) {
  return {
    x:0, y:0, width: width, height: height, color: color, shape: shape,
    xspd: 0, yspd: 0, onland: false,
    top    : function( dt = 0 ) { return this.y + this.yspd * dt},
    bottom : function( dt = 0 ) { return this.y + this.height + this.yspd * dt},
    left   : function( dt = 0 ) { return this.x + this.xspd * dt},
    right  : function( dt = 0 ) { return this.x + this.width + this.xspd * dt }
  }
}
