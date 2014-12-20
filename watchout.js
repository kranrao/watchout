//Function to generate a random position of an asteroid within the canvas
var positionGenerator = function (asteroids) {
  for (var i = 0; i < asteroids.length; i++) {
    var top = Math.floor(Math.random() * height);
    var left = Math.floor(Math.random() * width);
    asteroids[i]['top'] = top;
    asteroids[i]['left'] = left;
  }
  return asteroids;
};

// Creates asteroids object data
var asteroids = [{"a": "One"},{"b": "Two"},{"c": "Three"},{"d": "Four"},{"e": "Four"}];

// Creates SVG canvas in html
var width = 960,
    height = 500;

var space = d3.select("body").append("div")
    .attr("width", width + "px")
    .attr("height", height + "px")
    .attr("class", "space");

// Initializes space
var initGame = function (asteroids) {
  // Create asteroid nodes
  var asteroid = space.selectAll("div").data(asteroids);

  // Gets positions for asteroid nodes
  positionGenerator(asteroids);

  // Places asteroid nodes on canvas
  asteroid.enter().append("img")
      .attr("class", "asteroid")
      .style("top", function (d) { return d['top'] + "px";})
      .style("left", function (d) { return d['left'] + "px";});

};

initGame(asteroids);

// Move asteroids after initialize

var moveAsteroids = function () {
  var asteroid = d3.selectAll("img")
      .style("top", function (d) {
        return Math.floor(Math.random() * height) + "px";
      })
      .style("left", function (d) {
        return Math.floor(Math.random() * width) + "px";
      })

}

// Interval to change asteroid node positions

setInterval(function () {
  moveAsteroids();
}, 200);
