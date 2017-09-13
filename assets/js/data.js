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
    statistics["high_school_graduation"].push({"year":i, "high_school_graduation":state.high_school_graduation[i]});
    statistics["some_college"].push({"year":i, "some_college":state.some_college[i]});
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

function createRingChart(data,data2, key, targetDiv, size) {
  console.log(targetDiv);
  var width = size, height = size-15, radius = Math.min(width, height) / 2;

  //var theCSV = "age,population\n<5,2704659\n5-13,4499890\n14-17,2159981\n18-24,3853788\n25-44,14106543\n45-64,8819342\n≥65,612463";
  var color = d3.scaleOrdinal().range(["#98abc5", "#a7a7a7", "#794e67", "#a7a7a7",]);
  var arc = d3.arc().outerRadius(radius - 6).innerRadius(radius - 30);
  var pie = d3.pie().sort(null).value(function(d) { return d["edu_level"]; });
  var svg = d3.select(targetDiv).append("svg")
              .attr("width", width)
              .attr("height", height)
              .append("g")
              .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  var div = d3.select("body").append("div")
              .attr("class", "tooltip")
              .style("opacity", 0);

  console.log(data);
  var g = svg.selectAll("arc").data(pie(data)).enter().append("g").attr("class", "arc").on("mouseover", function(d) {
    div.transition()
      .duration(200)
      .style("opacity", .9);
    div.html(d.data["edu_level"])
      .style("left", (d3.event.pageX) + "px")
      .style("top", (d3.event.pageY) + "px");
    })
    .on("mouseout", function(d) {
      div.transition()
      .duration(500)
      .style("opacity", 0);
    });;
    g.append("path").attr("d", arc).style("fill", function(d) { return color(d.data.edu_level);
  });

  var width2 = size-100, height2 = size-115, radius2 = Math.min(width2, height2) / 2;

  //var theCSV = "age,population\n<5,2704659\n5-13,4499890\n14-17,2159981\n18-24,3853788\n25-44,14106543\n45-64,8819342\n≥65,612463";
  var arc2 = d3.arc().outerRadius(radius2 - 6).innerRadius(radius2 - 30);
  var pie2 = d3.pie().sort(null).value(function(d) { return d["edu_level"]; });


  var div2 = d3.select("body").append("div")
              .attr("class", "tooltip")
              .style("opacity", 0);

  console.log(data2);
  var g2 = svg.selectAll("arc").data(pie(data2)).enter().append("g").attr("class", "arc").on("mouseover", function(d) {
    div2.transition()
      .duration(200)
      .style("opacity", .9);
    div2.html(d.data["edu_level"])
      .style("left", (d3.event.pageX) + "px")
      .style("top", (d3.event.pageY) + "px");
    })
    .on("mouseout", function(d) {
      div2.transition()
      .duration(500)
      .style("opacity", 0);
    });;
    g2.append("path").attr("d", arc2).style("fill", function(d) { return color(d.data.edu_level);

  });
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

/**
* @mimlowe [createTimeSeries description]
* @param  {[type]} data [state data set ex: data["median_age"]]
* @param {[type]} key  [data set key as string ex: "median_age"]
* @param {[type]} targetDiv  [div that the graph will be drawn in]
* @param {[type]} chartType  [dimple.js chart type ex: dimple.plot.line, dimple.plot.bubble]
*/
function createTimeSeries(data, key, targetDiv, chartType) {
  var svg = dimple.newSvg(targetDiv, 350, 200);
  var myChart = new dimple.chart(svg, data);
  myChart.setBounds(70, 30, 250, 150);
  var x =  myChart.addCategoryAxis("x", "year")
  x.showGridlines = true;
  x.addOrderRule("year");
  var y = myChart.addCategoryAxis("y", key);
  var s = myChart.addSeries(null,chartType);
  s.lineWeight = 4;
  s.lineMarkers = true;
  myChart.draw(800);
  y.titleShape.remove();
  x.titleShape.remove();
}
