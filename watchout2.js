
//Create space
var width = 960;
var height = 500;
var neoData = [1];

//Creates SVG canvas
var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "space")
    .append("g")
    .attr("transform", "translate(32," + (height / 2) + ")");

//Create "Hero" circle
// refactor drag function
var neo = svg.selectAll("circle")
    .data(neoData)
    .enter().append("circle")
    .attr("cx", 25)
    .attr("cy", 25)
    .attr("r", 20)
    .attr("class","hero")
    .style("fill", "white")
    .call(d3.behavior.drag().on("drag", function() {
        neo.attr('cx', d3.event.x)
        .attr('cy', d3.event.y); }
      ));



