describe('Weather', function() {
  let weather;

  beforeEach(function() {
    weather = new Weather();
  });

  describe('return the weather', function() {
    it('returns sunny', function() {
      spyOn(weather, 'forecast').and.returnValue('sunny');
      expect(weather.forecast()).toEqual('sunny');
    });

    it('returns stormy', function() {
      spyOn(weather, 'forecast').and.returnValue('stormy');
      expect(weather.forecast()).toEqual('stormy');
    });
  });
});
