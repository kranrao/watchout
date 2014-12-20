
//Create space
var width = 960;
var height = 500;
var neoData = [{}];
var enemies = [{},{},{},{},{},{},{},{},{}];
var currentScore = 0;
var highScore = 0;
var collisions = 0;

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

//Function to check for collisions
var collisionChecker = function (enemies, hero) {
  var hero = {}
  hero['cx'] = d3.select(".hero").attr("cx");
  hero['cy'] = d3.select(".hero").attr("cy");

  _.each(enemies, function (value, key) {
    console.log('hero : ' + hero['cx'] + ', ' + hero['cy']);
    console.log('enemy :', value['cx'] + ', ' + hero['cy']);
    console.log('-----------');
    if (Math.abs(value['cy'] - hero['cy']) < 50 && Math.abs(value['cx'] - hero['cx']) < 50) {
      console.log("COLLISION!");
    }
  })
};

//Move "Enemies"
var moveEnemies = function (enemies, hero, callback) {
  positionGenerator(enemies);
  var enemy = d3.selectAll(".enemy").transition().duration(1500)
    .attr("cx", function (d) { return d['cx'];})
    .attr("cy", function (d) { return d['cy'];});
    callback(enemies, hero);
}

//Creates SVG canvas
var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "space")
    .append("g")
    .attr("width", width)
    .attr("height", height);
    //.attr("transform", "translate(32," + (height / 2) + ")");

//Create "Hero" circle
// refactor drag function
positionGenerator(neoData);
var neo = svg.selectAll("circle")
    .data(neoData)
    .enter().append("circle")
    .attr("cx", function (d) { return d['cx'];})
    .attr("cy", function (d) { return d['cy'];})
    .attr("r", 10)
    .attr("class","hero")
    .style("fill", "white")
    .call(d3.behavior.drag().on("drag", function() {
        neo.attr('cx', d3.event.x)
        .attr('cy', d3.event.y); }
      ));

//Create "Enemies"
positionGenerator(enemies);
var enemy = svg.selectAll("circle")
    .data(enemies)
    .enter().append("circle")
    .attr("cx", function (d) { return d['cx'];})
    .attr("cy", function (d) { return d['cy'];})
    .attr("r", 10)
    .attr("class","enemy")
    .style("fill", "orange");

//Move "Enemies" at an interval
setInterval(function () {
  moveEnemies(enemies, neoData, collisionChecker);
  scoreCounter(15);
}, 1500);


//Track scoring
// not interacting with collisions or scoreboard on dom yet
var scoreCounter = function (amount) {
  var collision = false;
    currentScore += amount;
    //console.log(currentScore);

  collisions++;
  if (currentScore > highScore) {
    highScore = currentScore;
  } else {
    currentScore = 0;
  }
};






