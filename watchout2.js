
//Define global variables
var width = 1660;
var height = 800;
var neoData = [{}];
var enemies = [{},{},{}];//,{},{},{},{},{},{},{},{},{},{},{}];
var currentScore = 0;
var highScore = 0;
var collisions = 0;
var collisionCheck = false;

//Randomizes cx and cy coordinates for enemies
var positionGenerator = function (enemies) {
  for (var i = 0; i < enemies.length; i++) {
    var cy = Math.floor(Math.random() * height);
    var cx = Math.floor(Math.random() * width);
    enemies[i]['cy'] = cy;
    enemies[i]['cx'] = cx;
  }
  return enemies;
};

//Check for collisions
var collisionChecker = function (enemies) {
  var hero = {};
  hero['cx'] = d3.select(".hero").attr("cx");
  hero['cy'] = d3.select(".hero").attr("cy");

  _.each(enemies, function (value, key) {
    if ((Math.abs(value['cy'] - hero['cy']) < 10) && (Math.abs(value['cx'] - hero['cx']) < 10)) {
       if (highScore < Math.floor(currentScore/100)) {
        highScore = Math.floor(currentScore/100);
        document.getElementById('highScore').innerHTML = Math.floor(currentScore/100);
       }
      currentScore = 0;
      document.getElementById('currentScore').innerHTML = Math.floor(currentScore);
      collisions++;
      document.getElementById('collisionCounter').innerHTML = Math.ceil(collisions/100);
    }
    currentScore += Math.sqrt(1 * Math.log(enemies.length));
    document.getElementById('currentScore').innerHTML = Math.floor(currentScore/100);
  });
};

//Move "Enemies"
var moveEnemies = function (enemies) {
  positionGenerator(enemies);
  var enemy = d3.selectAll(".enemy").transition().duration(3000)
    .attr("cx", function (d) { return d['cx'];})
    .attr("cy", function (d) { return d['cy'];});
}

//Creates SVG canvas
var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "space")
    .append("g")
    .attr("width", width)
    .attr("height", height);

//Create "Hero" circle
positionGenerator(neoData);
var neo = svg.selectAll("circle")
    .data(neoData)
    .enter().append("circle")
    .attr("cx", function (d) { return d['cx'];})
    .attr("cy", function (d) { return d['cy'];})
    .attr("r", 8)
    .attr("class","hero")
    .style("fill", "red")
    .call(d3.behavior.drag().on("drag", function() {
        neo.attr('cx', d3.event.x)
        .attr('cy', d3.event.y); }
      ));

//Create "Enemies"
var createEnemies = function () {
  positionGenerator(enemies);
  var enemy = svg.selectAll("circle")
      .data(enemies)
      .enter().append("circle")
      .attr("cx", function (d) { return d['cx'];})
      .attr("cy", function (d) { return d['cy'];})
      .attr("r", 10)
      .attr("class","enemy")
      .style("fill", "orange");
}

//Checks collisions on an interval
setInterval(function () {
    collisionChecker(enemies);
  }, 10);

//Move "Enemies" at an interval
  setInterval(function () {
    createEnemies();
    moveEnemies(enemies);
    enemies.push({});
  }, 3000);





