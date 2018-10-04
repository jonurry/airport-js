describe('Airport', function() {
  let airport;
  let plane;
  let weather;

  beforeEach(function() {
    weather = jasmine.createSpyObj('weather', ['forecast']);
    airport = new Airport(weather);
    plane = jasmine.createSpyObj('plane', ['setFlyingStatus']);
  });

  describe('constructor', function() {
    it('should have no planes by default (empty hanger)', function() {
      expect(airport.planes()).toEqual([]);
    });
  });

  describe('landPlane', function() {
    describe('sunny weather', function() {
      beforeEach(function() {
        weather.forecast.and.returnValue('sunny');
      });

      it('plane should be on ground', function() {
        airport.landPlane(plane);
        expect(plane.setFlyingStatus).toHaveBeenCalled();
      });

      it('plane should be in the hanger', function() {
        airport.landPlane(plane);
        expect(airport.hanger).toContain(plane);
      });
    });
  });

  describe('isStormy', function() {
    it('should delegate weather forecast', function() {
      airport.isStormy();
      expect(weather.forecast).toHaveBeenCalled();
    });
  });
});
