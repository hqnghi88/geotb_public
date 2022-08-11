// Bar Chart Example
var mySexAgeChart = null;
// var sexagevn = null;
function showchart_sexage() {
  document.getElementById('sexage_num').textContent = "của Việt Nam";
  // if (sexagevn == null) {
  var map = mapVN["VN"];
  var array = [];
  for (var j = 0; j < 31; j++) {
    var tmp = [];
    for (var i = 0; i < map.length; i++) {
      var item = map[i];
      tmp.push(adm1_sexage.get("" + id_.get(item) + "_" + j).slice(slider_idx1, slider_idx2 * 1 + 1));
    }
    tmp = tmp.reduce((r, a) => a.map((b, i) => (r[i] || 0) + b), []);
    array.push(tmp.reduce((a, b) => a + b, 0));
  }
  // sexagevn = array;
  // sexagevn = array.reduce((r, a) => a.map((b, i) => (r[i] || 0) + b), []);
  // console.log(array);
  // }
  internal_show_sexage(array);
}
function showchart_sexage1(selected_adm1) {
  document.getElementById('sexage_num').textContent = "của " + selected_adm1;

  var array = [];
  for (var j = 0; j < 31; j++) {
    var tmp = [];
    tmp.push(adm1_sexage.get("" + id_.get(selected_adm1) + "_" + j).slice(slider_idx1, slider_idx2 * 1 + 1));
    tmp = tmp.reduce((r, a) => a.map((b, i) => (r[i] || 0) + b), []);
    array.push(tmp.reduce((a, b) => a + b, 0));
  }
  // console.log(array);
  internal_show_sexage(array);
}

function showchart_sexage2(selected_adm1, selected_adm2) {
  document.getElementById('sexage_num').textContent = "của " + selected_adm2 + ", " + selected_adm1;
  var array = [];
  for (var j = 0; j < 31; j++) {
    var tmp = [];
    tmp.push(adm2_sexage.get("" + id_.get(selected_adm1 + selected_adm2) + "_" + j).slice(slider_idx1, slider_idx2 * 1 + 1));
    tmp = tmp.reduce((r, a) => a.map((b, i) => (r[i] || 0) + b), []);
    array.push(tmp.reduce((a, b) => a + b, 0));
  }
  internal_show_sexage(array);
}

function showchart_sexage3(selected_adm1, selected_adm2, selected_adm3) {
  document.getElementById('sexage_num').textContent = "của " + selected_adm3 + ", " + selected_adm2 + ", " + selected_adm1;
  var array = [];
  for (var j = 0; j < 31; j++) {
    var tmp = [];
    tmp.push(adm3_sexage.get("" + id_.get(selected_adm1 + selected_adm2 + selected_adm3) + "_" + j).slice(slider_idx1, slider_idx2 * 1 + 1));
    tmp = tmp.reduce((r, a) => a.map((b, i) => (r[i] || 0) + b), []);
    array.push(tmp.reduce((a, b) => a + b, 0));
  }
  // var dd = array;
  // var dd = adm3_sexage.get("" + id_.get(selected_adm1 + selected_adm2 + selected_adm3));
  internal_show_sexage(array);
}

function internal_show_sexage(dd) {

  if (mySexAgeChart != null) {
    mySexAgeChart.destroy();
  }
  var ctx = document.getElementById('mySexAgeChart');
  mySexAgeChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ["0-4", "5-14", "15-24", "25-34", "35-44", "45-54", "55-64", "65+"],
      datasets: [{
        label: 'Nữ',
        data: [
          [
            0,
            -dd[8]
          ],
          [
            0,
            -dd[9]
          ],
          [
            0,
            -dd[10]
          ],
          [
            0,
            -dd[11]
          ],
          [
            0,
            -dd[12]
          ],
          [
            0,
            -dd[13]
          ],
          [
            0,
            -dd[14]
          ],
          [
            0,
            -dd[15]
          ]
        ],
        backgroundColor: 'pink',
        barPercentage: 1,
        categoryPercentage: 1,
        borderColor: 'black',
        borderWidth: 1,
        borderSkipped: 'none' // Leave this line out to remove middle border at 0 line
      }, {
        label: 'Nam',
        data: [
          [
            0,
            dd[0]
          ],
          [
            0,
            dd[1]
          ],
          [
            0,
            dd[2]
          ],
          [
            0,
            dd[3]
          ],
          [
            0,
            dd[4]
          ],
          [
            0,
            dd[5]
          ],
          [
            0,
            dd[6]
          ],
          [
            0,
            dd[7]
          ]
        ],
        backgroundColor: 'lightBlue',
        barPercentage: 1,
        categoryPercentage: 1,
        borderColor: 'black',
        borderWidth: 1
      }

      ]
    },
    options: {
      animation: {
        duration: 0,
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: (ttItem) => (Math.abs(ttItem.parsed.x)) // Inverse negatives to positive numbers
          }
        }
      },
      indexAxis: 'y',
      scales: {
        y: {
          stacked: true,
          grid: {
            display: false
          }
        },
        x: {
          // min: -300,
          // max: 300,
          ticks: {
            callback: (val) => (Math.abs(val)) // Inverrt negatives to positive numbers
          }
        }
      },
      responsive: true,
      maintainAspectRatio: false,
      onClick: onClick_sexage
    }
  });
}
const onClick_sexage = (event, clickedElements) => {
  if (clickedElements.length === 0) return;

  const { dataIndex, raw } = clickedElements[0].element.$context;
  const barLabel = event.chart.data.labels[dataIndex];
  // console.log(clickedElements[0].datasetIndex);
  // console.log(event.chart.data);
  type_of_rate = 1;
  index_of_rate = dataIndex;
  if (clickedElements[0].datasetIndex == 0) {
    index_of_rate = 8 + dataIndex;
  }
  update_layers();
}