function success(data) {
    var layout = { margin: { t: 0 } }
    var LINE = document.getElementById('line');
    Plotly.plot(LINE, data, layout)
  }
d3.json('/line').then(success)