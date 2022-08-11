// Area Chart Example
var mylineChart = null;
var timevn = null;
function sum(a, b) {
    return a.map((v, i) => v + (b[i] || 0))
}

function showchart() {
    document.getElementById('daily_num').textContent = "của Việt Nam";
    // if (timevn == null) {

    var map = mapVN["VN"];
    var array = []; 
    // var ssss=""+headers+"\n"; 
    for (var i = 0; i < map.length; i++) {
        var item = map[i];
        array.push(adm1_time.get("" + id_.get(item)));

        // ssss+=item + "," + adm1_time.get("" + id_.get(item))+"\n";
    }
    // console.log(ssss);
    // } 
    // console.log(headers.slice(slider_idx1,slider_idx2*1+1));
    timevn = JSON.parse(JSON.stringify(array));//;//.slice(slider_idx1,slider_idx2 * 1+1);
    // console.log(timevn);
    // console.log(tmpar);
    for (var i = 1; i < 63; i++) {
        for (var j = 0; j < 55; j++) {
            timevn[0][j] += timevn[i][j];
            // console.log(i+" "+j+" "+tmpar[i][j]);
        }
    }
    // console.log(timevn.reduce((a, b) => a.length > b.length ? sum(a, b) : sum(b, a)));
    // console.log(tmpar);
    if (mylineChart != null) {
        mylineChart.destroy();
    }
    var ctx = document.getElementById("myTimeChart");
    mylineChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: headers.slice(slider_idx1, slider_idx2 * 1 + 1),
            datasets: [{
                label: "Số ca",
                pointRadius: 0,
                backgroundColor: "rgba(255, 99, 132, 0.6)",
                borderColor: "rgba(255, 99, 132, 0.6)",
                data: timevn[0].slice(slider_idx1, slider_idx2 * 1 + 1),//.reduce((r, a) => a.map((b, i) => (r[i] || 0) + b), [])
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

function showchart1(selected_adm1) {


    document.getElementById('daily_num').textContent = "của " + selected_adm1;
    // console.log(headers);
    // console.log(adm1_time.get("An Giang"));
    if (mylineChart != null) {
        mylineChart.destroy();
    }
    // console.log(headers);
    // console.log(selected_adm1+","+adm1_time.get("" + id_.get(selected_adm1)));
    var ctx = document.getElementById("myTimeChart");
    mylineChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: headers.slice(slider_idx1, slider_idx2 * 1 + 1),
            datasets: [{
                label: "Số ca",
                pointRadius: 0,
                backgroundColor: "rgba(255, 99, 132, 0.6)",
                borderColor: "rgba(255, 99, 132, 0.6)",
                data: adm1_time.get("" + id_.get(selected_adm1)).slice(slider_idx1, slider_idx2 * 1 + 1),
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



function showchart2(selected_adm1, selected_adm2) {


    document.getElementById('daily_num').textContent = "của " + selected_adm2 + ", " + selected_adm1;
    // console.log(headers);
    // console.log(adm2_time.get(""+id_.get(selected_adm1 + selected_adm2)));
    if (mylineChart != null) {
        mylineChart.destroy();
    }
    // console.log(selected_adm1 + selected_adm2);
    // console.log(id_.get(selected_adm1 + selected_adm2));
    // console.log(adm2_time.get("" + id_.get(selected_adm1 + selected_adm2)));
    // console.log(adm2_time);
    var ctx = document.getElementById("myTimeChart");
    mylineChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: headers.slice(slider_idx1, slider_idx2 * 1 + 1),
            datasets: [{
                label: "Số ca",
                pointRadius: 0,
                backgroundColor: "rgba(255, 99, 132, 0.6)",
                borderColor: "rgba(255, 99, 132, 0.6)",
                data: adm2_time.get("" + id_.get(selected_adm1 + selected_adm2)).slice(slider_idx1, slider_idx2 * 1 + 1),
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

function showchart3(selected_adm1, selected_adm2, selected_adm3) {


    document.getElementById('daily_num').textContent = "của " + selected_adm3 + ", " + selected_adm2 + ", " + selected_adm1;
    // console.log(selected_adm1 + selected_adm2 + selected_adm3);
    // console.log(adm1_time.get("An Giang"));
    if (mylineChart != null) {
        mylineChart.destroy();
    }
    var ctx = document.getElementById("myTimeChart");
    mylineChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: headers.slice(slider_idx1, slider_idx2 * 1 + 1),
            datasets: [{
                label: "Số ca",
                pointRadius: 0,
                backgroundColor: "rgba(255, 99, 132, 0.6)",
                borderColor: "rgba(255, 99, 132, 0.6)",
                data: adm3_time.get("" + id_.get(selected_adm1 + selected_adm2 + selected_adm3)).slice(slider_idx1, slider_idx2 * 1 + 1),
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