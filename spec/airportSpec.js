describe('Airport', function() {
  let airport;
  let plane;
  let weather;

  beforeEach(function() {
    weather = jasmine.createSpyObj('weather', ['forecast']);
    airport = new Airport(weather);
    plane = jasmine.createSpyObj('plane', ['setFlyingStatus', 'isFlying']);
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
        plane.isFlying.and.returnValue(true);
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
            let plane = jasmine.createSpyObj('plane', [
              'setFlyingStatus',
              'isFlying'
            ]);
            plane.isFlying.and.returnValue(true);
            airport.landPlane(plane);
          }
          expect(function() {
            let plane = jasmine.createSpyObj('plane', [
              'setFlyingStatus',
              'isFlying'
            ]);
            plane.isFlying.and.returnValue(true);
            airport.landPlane(plane);
          }).toThrowError('Cannot land. Airport is at full capacity.');
        });
      });

      describe('already at the airport', function() {
        it('should throw an error', function() {
          expect(function() {
            airport.landPlane(plane);
          }).toThrowError('The plane is already at the airport.');
        });
      });

      describe('already grounded', function() {
        it('should throw an error', function() {
          expect(function() {
            let anotherAirport = new Airport(weather);
            plane.isFlying.and.returnValue(false);
            anotherAirport.landPlane(plane);
          }).toThrowError('The plane is already grounded.');
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

  describe('takeOffPlane', function() {
    beforeEach(function() {
      weather.forecast.and.returnValue('sunny');
      plane.isFlying.and.returnValue(true);
      airport.landPlane(plane);
    });

    describe('sunny weather', function() {
      it('the plane should take off', function() {
        airport.takeOffPlane(plane);
        expect(airport.planes.length).toEqual(0);
        expect(airport.planes).not.toContain(plane);
      });

      it('should not take off if not at the airport', function() {
        airport.takeOffPlane(plane);
        expect(function() {
          airport.takeOffPlane(plane);
        }).toThrowError('The plane is not at this airport.');
      });
    });

    describe('stormy weather', function() {
      it('should not take off due to weather', function() {
        weather.forecast.and.returnValue('stormy');
        expect(function() {
          airport.takeOffPlane(plane);
        }).toThrowError('Too stormy to take off.');
        expect(airport.planes()).toContain(plane);
      });
    });
  });

  describe('isStormy', function() {
    it('should delegate weather forecast', function() {
      airport.isStormy();
      expect(weather.forecast).toHaveBeenCalled();
    });
  });

  describe('airport capacity', function() {
    it('should default to 20 planes', function() {
      expect(airport.capacity).toEqual(CAPACITY);
    });

    it('can be over-ridden with a different capacity', function() {
      let capacity = 50;
      let largeAirport = new Airport(weather, capacity);
      expect(largeAirport.capacity).toEqual(capacity);
    });
  });
});
