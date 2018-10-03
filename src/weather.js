function Weather() {
  this.weatherArray = ['stormy', 'sunny', 'sunny', 'sunny', 'sunny'];
}

Weather.prototype.forecast = function() {
  return this.weatherArray[
    Math.floor(Math.random() * this.weatherArray.length)
  ];
};
