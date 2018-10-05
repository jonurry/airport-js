'use strict';

const CAPACITY = 20;

class WeatherError extends Error {}
class AirportError extends Error {}

function Airport(weather = new Weather(), capacity = CAPACITY) {
  this.capacity = capacity;
  this.hanger = [];
  this.weather = weather;
}

Airport.prototype.planes = function() {
  return this.hanger;
};

Airport.prototype.landPlane = function(plane) {
  if (this.canLandPlane(plane)) {
    plane.setFlyingStatus(false);
    this.hanger.push(plane);
  }
};

Airport.prototype.takeOffPlane = function(plane) {
  if (this.canTakeOffPlane(plane)) {
    plane.setFlyingStatus(true);
    this.hanger = this.hanger.filter(element => element != plane);
  }
};

Airport.prototype.isFull = function() {
  return this.hanger.length === this.capacity;
};

Airport.prototype.isStormy = function() {
  return this.weather.forecast() === 'stormy';
};

Airport.prototype.isInHanger = function(plane) {
  return this.hanger.includes(plane);
};

Airport.prototype.canLandPlane = function(plane) {
  if (this.isStormy()) throw new WeatherError('Too stormy to land.');
  if (this.isFull())
    throw new AirportError('Cannot land. Airport is at full capacity.');
  if (this.isInHanger(plane))
    throw new AirportError('The plane is already at the airport.');
  if (!plane.isFlying())
    throw new AirportError('The plane is already grounded.');
  return true;
};

Airport.prototype.canTakeOffPlane = function(plane) {
  if (this.isStormy()) throw new WeatherError('Too stormy to take off.');
  if (!this.isInHanger(plane))
    throw new AirportError('The plane is not at this airport.');
  return true;
};
