// As an air traffic controller
// So I can get passengers to a destination
// I want to instruct a plane to land at an airport
describe('ATC instructs plane to land at airport', function() {
  let plane;
  let airport;
  let weather;
  beforeEach(function() {
    weather = new Weather();
    airport = new Airport(weather);
    plane = new Plane();
  });
  describe('sunny weather', function() {
    it('should land the plane', function() {
      spyOn(weather, 'forecast').and.returnValue('sunny');
      plane.land(airport);
      expect(airport.planes()).toContain(plane);
      expect(plane.isFlying()).toEqual(false);
    });
  });
  describe('storm weather', function() {
    it('should not allow the plane to land', function() {
      spyOn(weather, 'forecast').and.returnValue('stormy');
      expect(function() {
        plane.land(airport);
      }).toThrowError('Too stormy to land.');
    });
  });
});
