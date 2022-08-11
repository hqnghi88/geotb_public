// Bar Chart Example
var myMDRrawChart = null;
// var sexagevn = null;
function showchart_mdrraw() {
  document.getElementById('mdrraw_num').textContent = "của Việt Nam";
  // if (sexagevn == null) {

  var map = mapVN["VN"];
  var array = [];
  for (var j = 0; j < 33; j++) {
    var tmp = [];
    for (var i = 0; i < map.length; i++) {
      var item = map[i];
      
      // console.log("sss" + id_.get(item) + "_" + j);
      // console.log(adm1_sexage.get("" + id_.get(item) + "_" + j));
      tmp.push(adm1_sexage.get("" + id_.get(item) + "_" + j).slice(slider_idx1, slider_idx2 * 1 + 1));
    }
    tmp = tmp.reduce((r, a) => a.map((b, i) => (r[i] || 0) + b), []);
    array.push(tmp);//.reduce((a, b) => a + b, 0));
  } 
  // console.log(array);
  // }
  internal_show_mdrraw(array);
}
function showchart_mdrraw1(selected_adm1) {
  document.getElementById('mdrraw_num').textContent = "của " + selected_adm1;


  var array = [];
  for (var j = 0; j < 33; j++) {
    var tmp = [];
    tmp.push(adm1_sexage.get("" + id_.get(selected_adm1) + "_" + j).slice(slider_idx1, slider_idx2 * 1 + 1));
    tmp = tmp.reduce((r, a) => a.map((b, i) => (r[i] || 0) + b), []);
    array.push(tmp);//.reduce((a, b) => a + b, 0));
  }
  // console.log(array);
  internal_show_mdrraw(array);
}
 
function internal_show_mdrraw(dd) {

  if (myMDRrawChart != null) {
    myMDRrawChart.destroy();
  }
  var ctx = document.getElementById('myMDRrawChart');
  myMDRrawChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: headers.slice(slider_idx1, slider_idx2 * 1 + 1),
      datasets: [{
        label: "MDR",
        pointRadius: 0,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 0.6)",
        data: dd[32]
      }],
    },
    options: {
      animation: {
        duration: 0
      },
      scales: {
        xAxes: [{
          time: {
            unit: 'date'
          },
          gridlines: {
            display: false
          }
        }],
        yAxes: [{
          gridlines: {
            color: "rgba(0, 0, 0, .125)",
          }
        }],
      },
      plugins: {
        legend: {
          display: false
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      onClick: onClick_mdrraw
    }
  });
}
const onClick_mdrraw = (event, clickedElements) => {
  // if (clickedElements.length === 0) return;

  // const { dataIndex, raw } = clickedElements[0].element.$context;
  // const barLabel = event.chart.data.labels[dataIndex];
  // console.log(clickedElements[0].datasetIndex);
  // console.log(event.chart.data);
  type_of_rate = 1;
  index_of_rate = 32;
  // if (clickedElements[0].datasetIndex == 0) {
  //   index_of_rate = 8 + dataIndex;
  // }
  update_layers();
}