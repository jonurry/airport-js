// As an air traffic controller
// So I can get passengers to a destination
// I want to instruct a plane to land at an airport

// As an air traffic controller
// So I can get passengers on the way to their destination
// I want to instruct a plane to take off from an airport and confirm that it is no longer in the airport

// As an air traffic controller
// To ensure safety
// I want to prevent take-off when weather is stormy

// As an air traffic controller
// To ensure safety
// I want to prevent landing when weather is stormy

// As an air traffic controller
// To ensure safety
// I want to prevent landing when the airport is full

// As the system designer
// So that the software can be used for many different airports
// I would like a default airport capacity that can be overridden as appropriate

// planes can only take off from airports they are in
// planes that are already flying cannot takes off and/or be in an airport
// planes that are landed cannot land again and must be in an airport

describe('Feature Tests', function() {
  let plane;
  let airport;
  let weather;

  beforeEach(function() {
    weather = new Weather();
    airport = new Airport(weather);
    plane = new Plane();
  });

  describe('ATC instructs plane to land at airport', function() {
    describe('sunny weather', function() {
      beforeEach(function() {
        spyOn(weather, 'forecast').and.returnValue('sunny');
        plane.land(airport);
      });

      it('should land the plane', function() {
        expect(airport.planes()).toContain(plane);
        expect(plane.isFlying()).toEqual(false);
      });

      it('should not land the plane when airport is full', function() {
        for (let i = 2; i <= airport.capacity; i++) {
          let plane = new Plane();
          plane.land(airport);
        }
        expect(function() {
          let plane = new Plane();
          plane.land(airport);
        }).toThrowError('Cannot land. Airport is at full capacity.');
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

  describe('ATC instructs plane to take off from the airport', function() {
    beforeEach(function() {
      spyOn(weather, 'forecast').and.returnValue('sunny');
      plane.land(airport);
    });

    describe('sunny weather', function() {
      it('plane should take off', function() {
        plane.takeOff(airport);
        expect(airport.planes()).not.toContain(plane);
        expect(plane.isFlying()).toEqual(true);
      });
    });

    describe('storm weather', function() {
      it('should not allow the plane to land', function() {
        weather.forecast.and.returnValue('stormy');
        expect(function() {
          plane.takeOff(airport);
        }).toThrowError('Too stormy to take off.');
      });
    });

    describe('take off from a different airport', function() {
      it('should not take off and raise an error', function() {
        let differentAirport = new Airport(weather);
        expect(function() {
          plane.takeOff(differentAirport);
        }).toThrowError('The plane is not at this airport.');
        expect(airport.planes()).toContain(plane);
        expect(plane.isFlying()).toEqual(false);
      });
    });
  });
});
