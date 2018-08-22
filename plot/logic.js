function plot(startDate, endDate) {
  d3.csv("hourly_data.csv").then(data => {
    var incidents = [],
    volume = [],
    speed = [],
    time = [];
  
    data
      .filter(d => Date.parse(d.Date) >= Date.parse(startDate) && Date.parse(d.Date) <= Date.parse(endDate))
      .map(d => {
        d.Number_of_Incidents = +d.Number_of_Incidents;
        d.Total_Volume = +d.Total_Volume;
        d.Average_Speed = +d.Average_Speed;
        incidents.push(d.Number_of_Incidents);
        volume.push(d.Total_Volume);
        speed.push(d.Average_Speed);
        time.push(`${d.Date}, ${d.Hour}:00`);
      });
  
    var trace1 = {
      x: volume,
      y: incidents,
      mode: "markers",
      type: "scatter",
      opacity: .5,
      text: time,
      marker: {
        size: 12,
        line: {
          color: "white",
          width: 1
        }
      }
    };

    var trace2 = {
      x: speed,
      y: incidents,
      mode: "markers",
      type: "scatter",
      opacity: .5,
      text: time,
      marker: {
        size: 12,
        line: {
          color: "white",
          width: 1
        }
      }
    };

    var layout1 = {
      title: `Traffic Volume vs. Incidents (${startDate}-${endDate})`,
      xaxis: { title: "Total Volume" },
      yaxis: { title: "Number of Incidents" }
    };

    var layout2 = {
      title: `Vehicle Speed vs. Incidents (${startDate}-${endDate})`,
      xaxis: { title: "Average Speed" },
      yaxis: { title: "Number of Incidents" }
    };

    Plotly.newPlot("plot1", [trace1], layout1);
    Plotly.newPlot("plot2", [trace2], layout2);
  });

  d3.csv("issue_data.csv").then(data => {
    var incidents = [],
    issues = [];
    
    var filtered_data = data.filter(d => Date.parse(d.Date) >= Date.parse(startDate) && Date.parse(d.Date) <= Date.parse(endDate));

    filtered_data.map(d => issues.push(d.Issue_Reported));

    var issues_list = Array.from(new Set(issues));

    for (var i = 0; i < issues_list.length; i++) {
      var counter = 0;
      filtered_data
        .filter(d => d.Issue_Reported === issues_list[i])
        .map(d => {
          d.Number_of_Incidents = +d.Number_of_Incidents;
          counter += d.Number_of_Incidents;
        });
      incidents.push(counter);
    }
  
    var trace3 = {
      values: incidents,
      labels: issues_list,
      type: "pie"
    };
      
    var layout3 = { title: `Incidents by Issue Reported (${startDate}-${endDate})` };
  
    Plotly.newPlot("plot3", [trace3], layout3);
  });
  
  d3.csv("hour_data.csv").then(data => {
    var incidents = [],
    hours = [];
  
    var filtered_data = data.filter(d => Date.parse(d.Date) >= Date.parse(startDate) && Date.parse(d.Date) <= Date.parse(endDate));

    filtered_data.map(d => hours.push(d.Hour));

    var hours_list = Array.from(new Set(hours));

    for (var i = 0; i < hours_list.length; i++) {
      var counter = 0;
      filtered_data
        .filter(d => d.Hour === hours_list[i])
        .map(d => {
          d.Number_of_Incidents = +d.Number_of_Incidents;
          counter += d.Number_of_Incidents;
        });
      incidents.push(counter);
    }
  
    var trace4 = {
      x: hours_list,
      y: incidents,
      type: "bar"
    };
  
    var layout4 = {
      title: `Incidents by Hour of Day (${startDate}-${endDate})`,
      xaxis: { title: "Hour of Day" },
      yaxis: { title: "Number of Incidents" }
    };
  
    Plotly.newPlot("plot4", [trace4], layout4);
  });
}

plot("11/23/2017", "05/04/2018");

d3.select("button").on("click", function() {
  d3.event.preventDefault();
  var startValue = d3.select("#start").property("value");
  var endValue = d3.select("#end").property("value");
  plot(startValue, endValue);
});
