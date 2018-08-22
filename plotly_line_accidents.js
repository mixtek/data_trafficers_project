var file = "https://raw.githubusercontent.com/mattmurphey25/data_trafficers_project/master/crashData.json"
d3.json(file).then(successHandle);


function successHandle(big_list) {
    // console.log(big_list);

    //     var parseTime = d3.timeParse("%Q")
        
    //     big_list.forEach(function(data) {
    
    //         var a = parseTime(data.incidentDay);
    //         var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    //         var year = a.getFullYear();
    //         var month = months[a.getMonth()];
    //         var date = a.getDate();
    //         var hour = a.getHours();
    //         var min = a.getMinutes();
    //         var sec = a.getSeconds();
    //         var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    //         return time;
    //         });
      
};




var parseTime = d3.timeParse("%Q")

function fixEachObject(dataPoint) {
    // console.log(parseTime(dataPoint.incidentDay))
    const d = new Date(dataPoint.incidentDay * 1000)
    // console.log(dataPoint.incidentDay)
    console.log(d)
}

var file = "https://raw.githubusercontent.com/mattmurphey25/data_trafficers_project/master/crashData.json"
d3.json(file).then(successHandle);

function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
}


function successHandle(big_list) {
    console.log(big_list);
        big_list.forEach(fixEachObject);
      
};

var trace1 = {
    type: "scatter",
    mode: "lines",
    name: name,
    x: dates,
    y: closingPrices,
    line: {
      color: "#17BECF"
    }
  };