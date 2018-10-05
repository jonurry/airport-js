'use strict';

class WeatherError extends Error {}

function Airport(weather = new Weather()) {
  this.hanger = [];
  this.weather = weather;
}

Airport.prototype.planes = function() {
  return this.hanger;
};

Airport.prototype.landPlane = function(plane) {
  if (this.isStormy()) {
    throw new WeatherError('Too stormy to land.');
  }
  plane.setFlyingStatus(false);
  this.hanger.push(plane);
};

Airport.prototype.takeOffPlane = function(plane) {
  if (this.isStormy()) {
    throw new WeatherError('Too stormy to take off.');
  }
  plane.setFlyingStatus(true);
  this.hanger = this.hanger.filter(element => element != plane);
};

Airport.prototype.isStormy = function() {
  return this.weather.forecast() === 'stormy';
};
