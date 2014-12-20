
// Create space
var width = 960,
    height = 500;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "space")
    .append("g")
    .attr("transform", "translate(32," + (height / 2) + ")");

//Create an SVG circle
