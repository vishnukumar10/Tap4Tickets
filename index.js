var navigation = $('#nav-main').okayNav();
var data = [
    {
    "Dag":"vrijdag",
    "Datum":"11 sept.",
    "Slaapeffi":0.85,
    "Slaapuren":7.07,
    "Beginslapen":"01:52",
    "Eindslapen":"08:58",
    },
    {
    "Dag":"vrijdag",
    "Datum":"11 sept.",
    "Slaapeffi":0.88,
    "Slaapuren":7.97,
    "Beginslapen":"00:35",
    "Eindslapen":"08:32",
    },
    {
    "Dag":"zaterdag",
    "Datum":"12 sept.",
    "Slaapeffi":0.90,
    "Slaapuren":8.18,
    "Beginslapen":"01:30",
    "Eindslapen":"09:48",
  },
  {
    "Dag":"zondag",
    "Datum":"13 sept.",
    "Slaapeffi":0.93,
    "Slaapuren":6.57,
    "Beginslapen":"02:19",
    "Eindslapen":"09:16",
  },
  {
    "Dag":"maandag",
    "Datum":"14 sept.",
    "Slaapeffi":0.88,
    "Slaapuren":6.18,
    "Beginslapen":"00:46",
    "Eindslapen":"07:04",
  },
  {
    "Dag":"dinsdag",
    "Datum":"15 sept.",
    "Slaapeffi":0.90,
    "Slaapuren":7.18,
    "Beginslapen":"00:32",
    "Eindslapen":"07:50",
  },
  {
    "Dag":"woensdag",
    "Datum":"16 sept.",
    "Slaapeffi":0.92,
    "Slaapuren":7.32,
    "Beginslapen":"00:32",
    "Eindslapen":"08:05",
  },
  {
    "Dag":"donderdag",
    "Datum":"17 sept.",
    "Slaapeffi":0.89,
    "Slaapuren":5.59,
    "Beginslapen":"23:50",
    "Eindslapen":"05:49",
  },
  {
    "Dag":"vrijdag",
    "Datum":"18 sept.",
    "Slaapeffi": 0.91,
    "Slaapuren":6.4,
    "Inslapen":0.03,
    "Beginslapen":"00:29",
    "Eindslapen":"07:10",
  },
  {
    "Dag":"zaterdag",
    "Datum":"19 sept.",
    "Slaapeffi":0.90,
    "Slaapuren":8.04,
    "Beginslapen":"01:11",
    "Eindslapen":"09:15",
  },
  {
    "Dag":"zondag",
    "Datum":"20 sept.",
    "Slaapeffi":0.8,
    "Slaapuren":9.45,
    "Beginslapen":"01:13",
    "Eindslapen":"10:59",
  },
  {
    "Dag":"maandag",
    "Datum":"21 sept.",
    "Slaapeffi":0.78,
    "Slaapuren":9.38,
    "Beginslapen":"22:32",
    "Eindslapen":"08:11",
  },
  {
    "Dag":"dinsdag",
    "Datum":"22 sept",
    "Slaapeffi":0.90,
    "Slaapuren":7.31,
    "Beginslapen":"00:16",
    "Eindslapen":"07:48",
  },
  {
    "Dag":"woensdag ",
    "Datum":"23 sept.",
    "Slaapeffi":0.88,
    "Slaapuren":7.06,
    "Beginslapen":"00:32",
    "Eindslapen":"07:38",
  },
  {
    "Dag":"donderdag ",
    "Datum":"24 sept.",
    "Slaapeffi":0.88,
    "Slaapuren":6.07,
    "Beginslapen":"01:35",
    "Eindslapen":"07:42",
  },
  {
    "Dag":"vrijdag",
    "Datum":"25 sept.",
    "Slaapeffi":0.90,
    "Slaapuren":5.40,
    "Beginslapen":"02:41",
    "Eindslapen":"08:22",
  }
]
// margins om assen goed te positioneren
var margin = {
    top: 20,
    right: 30,
    bottom: 40,
    left: 40
  },
  width = 1100 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

// x schaal definiëren
var x = d3.scale.ordinal()
  .domain(data.map(function(d) {
    return d.Datum;
  }))
  .rangeRoundBands([0, width], 0.2);

// y schaal definiëren 
var y = d3.scale.linear()
  .domain([0, d3.max(data, function(d) {
    return d.Slaapuren;
  })])
  .range([height, 0]);

// y schaal definiëren 
var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom");

var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left");

var svg = d3.select(".graph").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Rectangles groupen in een bar en data toevoegen + class toevoegen op basis van slaapefficiëntie + hoogte en breedte bepalen op basis van de x en y schaal
svg.selectAll("rect")
  .data(data)
  .enter()
  .append("g")
  .attr("class", "bar")
  .append("rect")
  .attr("class", function(d) {
    
    if (d.Slaapeffi > 0.9) {
      return "sleep-good";
    } else if (d.Slaapeffi <= 0.8) {
      return "sleep-bad";
    } else if (d.Slaapeffi <= 0.9) {
      return "sleep-medium";
    }
  })
  .attr("x", function(d) {
    return x(d.Datum);
  })
  .attr("y", function(d) {
    return y(d.Slaapuren);
  })
  .attr("height", function(d) {
    return height - y(d.Slaapuren);
  })
  .attr("width", x.rangeBand())

// oproepen X en Y assen
svg.append("g")
  .attr("class", "y axis")
  .call(yAxis)
  .append("text")
  .attr("class", "x-axis-title")
  .attr("transform", "rotate(-90)")
  .attr("x", -height / 4)
  .attr("y", -margin.bottom)
  .attr("dy", ".71em")
  .style("text-anchor", "end")
  .text("Aantal uren slaap");
// labels van de X as
svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis)

// Begintijd toevoegen op de bars
svg.selectAll('.bar')
  .append("text")
  .attr("x", function(d) {
    return x(d.Datum);
  })
  .attr("y", function(d) {
    return y(d.Slaapuren);
  })
  .attr("transform", "translate(10 ,20)")
  .attr("fill", 'white')
  .attr("class", "start-time")
  .text(function(d) {
    return d.Beginslapen
  });

// Eindtijd toevoegen op de bars
svg.selectAll('.bar')
  .append("text")
  .attr("x", function(d) {
    return x(d.Datum)
  })
  .attr("y", height)
  .attr("fill", 'white')
  .attr("class", "end-time")
  .attr("transform", "translate(10,-12)")
  .text(function(d) {
    return d.Eindslapen
  });

// Greensock animatie
var tl = new TimelineMax;

tl.staggerFrom(('.bar'), 0.25, {
    scale: 0.9,
    opacity: 0,
    y: -100,
    transformOrigin: "50%, 50%",
    ease: Expo.easeInOut
  }, 0.15)
  .staggerFrom(('.start-time'), 0.25, {
    opacity: 0,
    ease: Expo.easeInOut
  }, 0.1)
  .staggerFrom(('.end-time'), 0.25, {
    opacity: 0,
    ease: Expo.easeInOut
  }, 0.1)