/**
 * [getTimeSeries description]
 * @param  {[type]} state [description]
 * @param  {[type]} start [description]
 * @param  {[type]} end   [description]
 * @return {[type]}       [description]
 */

function getTimeSeries(state, start, end) {
  console.log('HIT');
  let statistics = {};
  let stat_keys = stats;
  for (el in stat_keys) {
    statistics[stat_keys[el]] = [];
  }

  for (var i = start; i <= end; i++) {
    statistics["population"].push({"year":i, "population":state.population[i]});
    statistics["median_age"].push({"year":i, "median_age":state.median_age[i]});
    statistics["median_income"].push({"year":i, "median_income":state.median_income[i]});
  }
  console.log(statistics);
  return statistics;
}

/**
 * @mimlowe [createRingChart description]
 * @param  {[type]} data      [description]
 * @param  {[type]} targetDiv [description]
 * @return {[type]}           [description]
 */

function createRingChart(data, key, targetDiv) {
  console.log(targetDiv);
  var width = 400, height = 250, radius = Math.min(width, height) / 2;
  //var theCSV = "age,population\n<5,2704659\n5-13,4499890\n14-17,2159981\n18-24,3853788\n25-44,14106543\n45-64,8819342\n≥65,612463";
  var color = d3.scaleOrdinal().range(["#98abc5", "#8a89a6", "#7b6888"]);
  var arc = d3.arc().outerRadius(radius - 10).innerRadius(radius - 70);
  var pie = d3.pie().sort(null).value(function(d) { return d[key]; });
  var svg = d3.select(targetDiv).append("svg")
              .attr("width", width)
              .attr("height", height)
              .append("g")
              .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  var div = d3.select("body").append("div")
              .attr("class", "tooltip")
              .style("opacity", 0);
  //var data = d3.csvParse(theCSV);
  console.log(data);
  var g = svg.selectAll("arc").data(pie(data)).enter().append("g").attr("class", "arc").on("mouseover", function(d) {
    div.transition()
      .duration(200)
      .style("opacity", .9);
    div.html(d.data["year"] + ":\n" + d.data[key] + "\n\n")
      .style("left", (d3.event.pageX) + "px")
      .style("top", (d3.event.pageY) + "px");
    })
  .on("mouseout", function(d) {
    div.transition()
      .duration(500)
      .style("opacity", 0);
    });;
  g.append("path").attr("d", arc).style("fill", function(d) { return color(d.data.age); });
  /*g.append("text").attr("transform", function(d) {
      return "translate(" + arc.centroid(d) + ")";
  }).attr("dy", ".35em").text(function(d) {
      return d.data["year"] + ":\n" + d.data[key];
  });*/





   /**
   * [type description]
   * @param  {[type]} d [description]
   * @return {[type]}   [description]
   */
  function type(d) {
    // could this be rewritten as d.population += d.population?
    d.population = +d.population;
    return d;
  }
}
