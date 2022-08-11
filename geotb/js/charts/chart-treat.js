// Area Chart Example
var mytreatChart = null;
function showTreatchart() {
    document.getElementById('treat_num').textContent = "của Việt Nam";
    // if (treatvn == null) {

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
    // }
    // console.log(headers);
    // console.log(adm1_time.get("An Giang"));
    internal_show_treat(array);
}

function showTreatchart1(selected_adm1) {


    document.getElementById('treat_num').textContent = "của " + selected_adm1;
    // console.log(headers);
    // console.log(adm1_time.get("An Giang"));

    var array = [];
    for (var j = 0; j < 31; j++) {
        var tmp = [];
        tmp.push(adm1_sexage.get("" + id_.get(selected_adm1) + "_" + j).slice(slider_idx1, slider_idx2 * 1 + 1));
        tmp = tmp.reduce((r, a) => a.map((b, i) => (r[i] || 0) + b), []);
        array.push(tmp.reduce((a, b) => a + b, 0));
    }
    internal_show_treat(array);
}



function showTreatchart2(selected_adm1, selected_adm2) {


    document.getElementById('treat_num').textContent = "của " + selected_adm2 + ", " + selected_adm1;
    // console.log(headers);
    // console.log(adm1_time.get("An Giang"));

    var array = [];
    for (var j = 0; j < 31; j++) {
        var tmp = [];
        tmp.push(adm2_sexage.get("" + id_.get(selected_adm1 + selected_adm2) + "_" + j).slice(slider_idx1, slider_idx2 * 1 + 1));
        tmp = tmp.reduce((r, a) => a.map((b, i) => (r[i] || 0) + b), []);
        array.push(tmp.reduce((a, b) => a + b, 0));
    }
    internal_show_treat(array);
}

function showTreatchart3(selected_adm1, selected_adm2, selected_adm3) {


    document.getElementById('treat_num').textContent = "của " + selected_adm3 + ", " + selected_adm2 + ", " + selected_adm1;
    // console.log(headers);
    // console.log(adm1_time.get("An Giang"));
    var array = [];
    for (var j = 0; j < 31; j++) {
        var tmp = [];
        tmp.push(adm3_sexage.get("" + id_.get(selected_adm1 + selected_adm2 + selected_adm3) + "_" + j).slice(slider_idx1, slider_idx2 * 1 + 1));
        tmp = tmp.reduce((r, a) => a.map((b, i) => (r[i] || 0) + b), []);
        array.push(tmp.reduce((a, b) => a + b, 0));
    }
    internal_show_treat(array);
}



function internal_show_treat(dd) {
    if (mytreatChart != null) {
        mytreatChart.destroy();
    }
    var ctx = document.getElementById("myTreatChart");
    mytreatChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Thiếu thông tin", "Khỏi", "Hoàn thành điều trị", "Thất bại", "Chết", "Không theo dõi được", "Không đánh giá", "Thành công"],
            datasets: [{
                label: "Kết quả điều trị",
                backgroundColor: [
                    '#e31a1c',
                    '#fdbf6f',
                    '#ff7f00',
                    '#cab2d6',
                    '#6a3d9a',
                    '#ffff99',
                    '#b15928'
                ],
                borderWidth: 1,
                data: dd.slice(23, 30)
            }],
        },
        options: {
            animation: {
                duration: 0,
            },
            indexAxis: 'y',
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    display: false
                },
            },
            responsive: true,
            maintainAspectRatio: false,
            onClick: onClick_treat
        }
    });
}

const onClick_treat = (event, clickedElements) => {
    if (clickedElements.length === 0) return;

    const { dataIndex, raw } = clickedElements[0].element.$context;
    const barLabel = event.chart.data.labels[dataIndex];
    // console.log(clickedElements[0].datasetIndex);
    // console.log(event.chart.data);
    type_of_rate = 1;
    index_of_rate = 23 + dataIndex;

    update_layers();
}