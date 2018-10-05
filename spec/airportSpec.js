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
        airport.landPlane(plane);
      });

      it('plane should be grounded', function() {
        expect(plane.setFlyingStatus).toHaveBeenCalled();
      });

      it('plane should be in the hanger', function() {
        expect(airport.hanger).toContain(plane);
      });
      describe('when airport capacity is full', function() {
        it('should not land', function() {
          for (let i = 2; i <= airport.capacity; i++) {
            let plane = jasmine.createSpyObj('plane', ['setFlyingStatus']);
            airport.landPlane(plane);
          }
          expect(function() {
            let plane = jasmine.createSpyObj('plane', ['setFlyingStatus']);
            airport.landPlane(plane);
          }).toThrowError('Cannot land. Airport is at full capacity.');
        });
      });
    });

    describe('stormy weather', function() {
      it('should not land due to weather', function() {
        weather.forecast.and.returnValue('stormy');
        expect(function() {
          airport.landPlane(plane);
        }).toThrowError('Too stormy to land.');
        expect(airport.hanger).not.toContain(plane);
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
