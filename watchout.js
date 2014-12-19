// Object decorator function that generate a random position of an asteroid within the canvas
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
var asteroids = [{},{},{},{},{}];

// Creates SVG canvas in html
var width = 960,
    height = 500;

var space = d3.select("body").append("div")
    .attr("width", width + "px")
    .attr("height", height + "px")
    .attr("class", "space");

// Create asteroid nodes
var asteroid = space.selectAll("div").data(asteroids);

// Initial placement of asteroid nodes on canvas
asteroid.enter().append("img")
    .attr("class", "asteroid")
    .style("top", function (d) { return d['top'] + "px";})
    .style("left", function (d) { return d['left'] + "px";});

// Runs initial placement
positionGenerator(asteroids);

// Interval


  // Select asteroids

  // Update positioning




//positionGenerator();
