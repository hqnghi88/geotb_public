// Bar Chart Example
var myMDRChart = null;
// var sexagevn = null;
function showchart_mdr() {
  document.getElementById('mdr_num').textContent = "của Việt Nam";
  // if (sexagevn == null) {

  var map = mapVN["VN"];
  var array = [];
  for (var j = 0; j < 32; j++) {
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
  internal_show_mdr(array);
}
function showchart_mdr1(selected_adm1) {
  document.getElementById('mdr_num').textContent = "của " + selected_adm1;


  var array = [];
  for (var j = 0; j < 32; j++) {
    var tmp = [];
    tmp.push(adm1_sexage.get("" + id_.get(selected_adm1) + "_" + j).slice(slider_idx1, slider_idx2 * 1 + 1));
    tmp = tmp.reduce((r, a) => a.map((b, i) => (r[i] || 0) + b), []);
    array.push(tmp);//.reduce((a, b) => a + b, 0));
  }
  // console.log(array);
  internal_show_mdr(array);
}

function showchart_mdr2(selected_adm1, selected_adm2) {
  document.getElementById('mdr_num').textContent = "của " + selected_adm2 + ", " + selected_adm1;
  var array = [];
  for (var j = 0; j < 32; j++) {
    var tmp = [];
    tmp.push(adm2_sexage.get("" + id_.get(selected_adm1 + selected_adm2) + "_" + j).slice(slider_idx1, slider_idx2 * 1 + 1));
    tmp = tmp.reduce((r, a) => a.map((b, i) => (r[i] || 0) + b), []);
    array.push(tmp);//.reduce((a, b) => a + b, 0));
  }
  internal_show_mdr(array);
}

function showchart_mdr3(selected_adm1, selected_adm2, selected_adm3) {
  document.getElementById('mdr_num').textContent = "của " + selected_adm3 + ", " + selected_adm2 + ", " + selected_adm1;
  var array = [];
  for (var j = 0; j < 32; j++) {
    var tmp = [];
    tmp.push(adm3_sexage.get("" + id_.get(selected_adm1 + selected_adm2 + selected_adm3) + "_" + j).slice(slider_idx1, slider_idx2 * 1 + 1));
    tmp = tmp.reduce((r, a) => a.map((b, i) => (r[i] || 0) + b), []);
    array.push(tmp.reduce((a, b) => a + b, 0));
  }
  // var dd = array;
  // var dd = adm3_sexage.get("" + id_.get(selected_adm1 + selected_adm2 + selected_adm3));
  internal_show_mdr(array);
}

function internal_show_mdr(dd) {

  if (myMDRChart != null) {
    myMDRChart.destroy();
  }
  var ctx = document.getElementById('myMDRChart');
  myMDRChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: headers.slice(slider_idx1, slider_idx2 * 1 + 1),
      datasets: [{
        label: "MDR",
        pointRadius: 0,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 0.6)",
        data: dd[31]
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
      onClick: onClick_mdr
    }
  });
}
const onClick_mdr = (event, clickedElements) => {
  // if (clickedElements.length === 0) return;

  // const { dataIndex, raw } = clickedElements[0].element.$context;
  // const barLabel = event.chart.data.labels[dataIndex];
  // console.log(clickedElements[0].datasetIndex);
  // console.log(event.chart.data);
  type_of_rate = 1;
  index_of_rate = 31;
  // if (clickedElements[0].datasetIndex == 0) {
  //   index_of_rate = 8 + dataIndex;
  // }
  update_layers();
}