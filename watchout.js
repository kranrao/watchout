//Function to generate a random position of an asteroid within the canvas
var positionGenerator = function (asteroids) {
  for (var i = 0; i < asteroids.length; i++) {
    var y = Math.floor(Math.random() * height);
    var x = Math.floor(Math.random() * width);
    asteroids[i]['y'] = y;
    asteroids[i]['x'] = x;
  }
  return asteroids;
};

// Creates asteroids object data
var asteroids = [{"a": "One"},{"b": "Two"},{"c": "Three"},{"d": "Four"},{"e": "Four"}];

// Creates canvas in html
var width = 960,
    height = 500;

var space = d3.select("body").append("div")
    .attr("width", width + "px")
    .attr("height", height + "px")
    .attr("class", "space");

// Initializes space
var initGame = function (data) {
  // Create asteroid nodes
  var asteroid = space.selectAll("img").data(data);

// Gets positions for asteroid nodes
  positionGenerator(data);

  // Places asteroid nodes on canvas
  asteroid.enter().append("img")
      .attr("class", "asteroid")
      .style("top", function (d) { return d['y'] + "px";})
      .style("left", function (d) { return d['x'] + "px";})
      .attr("x", function (d) { return d['x'];})
      .attr("y", function (d) { return d['y'];})
};

/*initGame(asteroids);*/

// Move asteroids after initialize

var moveAsteroids = function (data) {
  positionGenerator(data);
  var asteroid = d3.selectAll("img").transition().duration(500)
      .style("top", function (d) { return d['y'] + "px";})
      .style("left", function (d) { return d['x'] + "px";})
      .attr("x", function (d) { return d['x'];})         // position the left of the rectangle
      .attr("y", function (d) { return d['y'];});
}

// Interval to change asteroid node positions
initGame(asteroids);
setInterval(function () {
  moveAsteroids(asteroids);
}, 1000);
