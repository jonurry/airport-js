'use strict';

function Plane() {
  this.flyingStatus = true;
}

Plane.prototype.land = function(airport) {
  airport.landPlane(this);
};

Plane.prototype.takeOff = function(airport) {
  airport.takeOffPlane(this);
};

Plane.prototype.isFlying = function() {
  return this.flyingStatus === true;
};

Plane.prototype.setFlyingStatus = function(status) {
  this.flyingStatus = !!status;
};
