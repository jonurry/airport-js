describe('Airport', function() {
  let airport;
  let plane;
  let weather;

  beforeEach(function() {
    weather = new Weather();
    airport = new Airport(weather);
    plane = jasmine.createSpyObj('plane', ['setFlyingStatus']);
  });

  describe('constructor', function() {
    it('should have no planes by default (empty hanger)', function() {
      expect(airport.planes()).toEqual([]);
    });
  });

  describe('sunny weather:', function() {
    beforeEach(function() {
      spyOn(weather, 'forecast').and.returnValue('sunny');
    });
    describe('landPlane', function() {
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
});
