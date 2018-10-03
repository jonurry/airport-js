describe('Plane', function() {
  let airport;
  let plane;

  beforeEach(function() {
    airport = jasmine.createSpyObj('airport', ['landPlane', 'takeOffPlane']);
    plane = new Plane();
  });

  describe('land', function() {
    it('should land at an airport', function() {
      plane.land(airport);
      expect(airport.landPlane).toHaveBeenCalledWith(plane);
    });
  });

  describe('_flyingStatus', function() {
    it('initially set to true', function() {
      expect(plane.flyingStatus).toBe(true);
    });
  });

  describe('isFlying', function() {
    it('should return true when flying', function() {
      expect(plane.isFlying()).toBe(true);
    });

    it('should return false when grounded', function() {
      plane.flyingStatus = false;
      expect(plane.isFlying()).toBe(false);
    });
  });

  describe('takeOff', function() {
    it('should take off from the airport', function() {
      plane.takeOff(airport);
      expect(airport.takeOffPlane).toHaveBeenCalledWith(plane);
    });
  });
});
