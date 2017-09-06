createRingChart([
                  {"age":"<5", "population":"2704659"},
                  {"age":"5-13", "population":"4499890"},
                  {"age":"14-17", "population":"2159981"},
                  {"age":"18-24", "population":"3853788"},
                  {"age":"25-44", "population":"14106543"},
                  {"age":"45-64", "population":"8819342"},
                  {"age":">64", "population":"612463"}], ".chartDiv");



function createRingChart(data, targetDiv) {
  var width = 400, height = 250, radius = Math.min(width, height) / 2;
//  var theCSV = "age,population\n<5,2704659\n5-13,4499890\n14-17,2159981\n18-24,3853788\n25-44,14106543\n45-64,8819342\n≥65,612463";
  var color = d3.scaleOrdinal().range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
  var arc = d3.arc().outerRadius(radius - 10).innerRadius(radius - 70);
  var pie = d3.pie().sort(null).value(function(d) { return d.population; });
  var svg = d3.select(targetDiv).append("svg")
              .attr("width", width)
              .attr("height", height)
              .append("g")
              .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  //var data = d3.csvParse(theCSV);
  console.log(data);
  var g = svg.selectAll(".arc").data(pie(data)).enter().append("g").attr("class", "arc");
  g.append("path").attr("d", arc).style("fill", function(d) { return color(d.data.age); });
  g.append("text").attr("transform", function(d) {
      return "translate(" + arc.centroid(d) + ")";
  }).attr("dy", ".35em").text(function(d) {
      return d.data.age;
  });

  function type(d) {
    d.population = +d.population;
    return d;
  }
}
