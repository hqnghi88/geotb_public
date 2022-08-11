// Area Chart Example
var myrateChart = null;
var ratevn = null;
function showchart_rate() {
    document.getElementById('rate_num').textContent = "của Việt Nam";
    var map = mapVN["VN"];
    var array = [];
    for (var i = 0; i < map.length; i++) {
        var item = map[i];
        array.push(adm1_time.get("" + id_.get(item)));
    }
    // if (p) {
        //     return (sc.slice(slider_idx1,slider_idx2*1+1).reduce((a, b) => a + b, 0)) * 100000 / p[current_idx_Date.getFullYear() - 2016];
        // } 
    ratevn = JSON.parse(JSON.stringify(array));//;//.slice(slider_idx1,slider_idx2 * 1+1);
    // console.log(timevn);
    // console.log(tmpar);
    for (var i = 1; i < 63; i++) {
        for (var j = 0; j < 55; j++) {
            ratevn[0][j] += ratevn[i][j];
            // console.log(i+" "+j+" "+tmpar[i][j]);
        }
    }
    // console.log(ratevn);
    for (var j = 0; j < headers.length; j++) {
        var p = pops["VN"]; 
        ratevn[0][j] = ratevn[0][j] * 100000 / p[j];
        // console.log(i+" "+j+" "+tmpar[i][j]);.map(x => x * 100000 / p[yy])
    }
    // console.log(headers);
    // console.log(adm1_time.get("An Giang"));
    if (myrateChart != null) {
        myrateChart.destroy();
    }
    var ctx = document.getElementById("myRateChart");
    myrateChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: headers.slice(slider_idx1,slider_idx2 * 1 + 1),
            datasets: [{
                label: "Số ca",
                pointRadius: 0,
                backgroundColor: "rgba(255, 99, 132, 0.6)",
                borderColor: "rgba(255, 99, 132, 0.6)",
                data: ratevn[0].slice(slider_idx1,slider_idx2 * 1 + 1),//.reduce((r, a) => a.map((b, i) => (r[i] || 0) + b), [])
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
            maintainAspectRatio: false
        }
    });
}

function showchart_rate1(selected_adm1) {


    var p = pops["" + id_.get(selected_adm1)];
    // var yy = current_idx_Date.getFullYear() - 2016;
    document.getElementById('rate_num').textContent = "của " + selected_adm1;
    // console.log(headers);
    // console.log(adm1_time.get("An Giang"));
    if (myrateChart != null) {
        myrateChart.destroy();
    }
    var array=JSON.parse(JSON.stringify(adm1_time.get("" + id_.get(selected_adm1))));
    for (var j = 0; j < headers.length; j++) {
        // var p = pops["" + id_.get(selected_adm1)];
        var idx_Date = new Date(headers[j]);
        var yy = idx_Date.getFullYear() - 2016;
        array[j] = array[j] * 100000 / p[yy];
        // console.log(i+" "+j+" "+tmpar[i][j]);.map(x => x * 100000 / p[yy])
    }
    // console.log(array);
    var ctx = document.getElementById("myRateChart");
    myrateChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: headers.slice(slider_idx1,slider_idx2 * 1 + 1),
            datasets: [{
                label: "Số ca",
                pointRadius: 0,
                backgroundColor: "rgba(255, 99, 132, 0.6)",
                borderColor: "rgba(255, 99, 132, 0.6)",
                data: array.slice(slider_idx1,slider_idx2 * 1 + 1),

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
            maintainAspectRatio: false
        }
    });
}



function showchart_rate2(selected_adm1, selected_adm2) {

    var p = pops["" + id_.get(selected_adm1 + selected_adm2)]; 
    document.getElementById('rate_num').textContent = "của " + selected_adm2 + ", " + selected_adm1;
    // console.log(headers);
    // console.log(adm2_time.get(""+id_.get(selected_adm1 + selected_adm2)));
    if (myrateChart != null) {
        myrateChart.destroy();
    }
    var array=JSON.parse(JSON.stringify(adm2_time.get("" + id_.get(selected_adm1 + selected_adm2))));
    for (var j = 0; j < headers.length; j++) {
        // var p = pops["" + id_.get(selected_adm1)];
        var idx_Date = new Date(headers[j]);
        var yy = idx_Date.getFullYear() - 2016;
        array[j] = array[j] * 100000 / p[yy];
        // console.log(i+" "+j+" "+tmpar[i][j]);.map(x => x * 100000 / p[yy])
    }
    var ctx = document.getElementById("myRateChart");
    myrateChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: headers.slice(slider_idx1,slider_idx2 * 1 + 1),
            datasets: [{
                label: "Số ca",
                pointRadius: 0,
                backgroundColor: "rgba(255, 99, 132, 0.6)",
                borderColor: "rgba(255, 99, 132, 0.6)",
                data: array.slice(slider_idx1,slider_idx2 * 1 + 1),
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
            maintainAspectRatio: false
        }
    });
}

// function showchart_rate3(selected_adm1, selected_adm2, selected_adm3) {


//     document.getElementById('rate_num').textContent = "của " + selected_adm3 + ", " + selected_adm2 + ", " + selected_adm1;
//     // console.log(headers);
//     // console.log(adm1_time.get("An Giang"));
//     if (myrateChart != null) {
//         myrateChart.destroy();
//     }
//     var ctx = document.getElementById("myRateChart");
//     myrateChart = new Chart(ctx, {
//         type: 'line',
//         data: {
//             labels: headers.slice(slider_idx1,slider_idx2 * 1 + 1),
//             datasets: [{
//                 label: "Số ca",
//                 pointRadius: 0,
//                 backgroundColor: "rgba(255, 99, 132, 0.6)",
//                 borderColor: "rgba(255, 99, 132, 0.6)",
//                 data: adm3_time.get("" + id_.get(selected_adm1 + selected_adm2 + selected_adm3)).slice(slider_idx1,slider_idx2 * 1 + 1).map(x => x * 100000 / p[yy]),
//             }],
//         },
//         options: {
//             animation: {
//                 duration: 0
//             },
//             scales: {
//                 xAxes: [{
//                     time: {
//                         unit: 'date'
//                     },
//                     gridlines: {
//                         display: false
//                     }
//                 }],
//                 yAxes: [{
//                     gridlines: {
//                         color: "rgba(0, 0, 0, .125)",
//                     }
//                 }],
//             },
//             plugins: {
//                 legend: {
//                     display: false
//                 },
//             },
//             responsive: true,
//             maintainAspectRatio: false
//         }
//     });
// }