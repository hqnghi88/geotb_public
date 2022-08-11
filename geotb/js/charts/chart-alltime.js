// Area Chart Example
var myallTimeChart = null;
var comparevn = null;
function showchart_alltime() {
    document.getElementById('alldaily_num').textContent = "của Việt Nam";
    var map = mapVN["VN"];
    var array = [];
    for (var i = 0; i < map.length; i++) {
        var item = map[i];
        var p = pops["" + id_.get(item)];

        array.push((adm1_time.get("" + id_.get(item)).slice(slider_idx1,slider_idx2 * 1 + 1).map(function (x, index) {
            return x * 100000 / p[index];
        }).reduce((a, b) => a + b, 0)).toFixed(2));
    }

    // if (p) {
    //     return (sc.slice(slider_idx1,slider_idx2*1+1).reduce((a, b) => a + b, 0)) * 100000 / p[current_idx_Date.getFullYear() - 2016];
    // } 
    // console.log(array);
    // comparevn = JSON.parse(JSON.stringify(array));//;//.slice(slider_idx1,slider_idx2 * 1+1);
    // // console.log(tmpar);
    // for (var i = 1; i < 63; i++) {
    //     for (var j = 0; j < 55; j++) {
    //         comparevn[0][j] += comparevn[i][j];
    //         // console.log(i+" "+j+" "+comparevn[i][j]);
    //     }
    // }
    // for (var i = 0; i < 63; i++) {
    //     for (var j = 0; j < headers.slice(slider_idx1,slider_idx2 * 1 + 1).length; j++) {
    //         var p = pops["VN"];
    //         var idx_Date = new Date(headers[j]);
    //         var yy = idx_Date.getFullYear() - 2016;
    //         comparevn[i][j] = comparevn[i][j] * 100000 / p[yy];
    //         // console.log(i+" "+j+" "+tmpar[i][j]);.map(x => x * 100000 / p[yy])
    //     }
    //     comparevn[i] = comparevn[i].reduce((a, b) => a + b, 0);
    // }
    // console.log(comparevn);
    // console.log(headers);
    // console.log(adm1_time.get("An Giang"));
    if (myallTimeChart != null) {
        myallTimeChart.destroy();
    }
    // console.log(p);
    // console.log(comparevn);
    // comparevn = comparevn.map(function (x, index) { 
    //     return x * 100000 / p[slider_idx2];
    // });
    // console.log(comparevn);
    var ctx = document.getElementById("myallTimeChart");
    // console.log(Array.from(array, x => getColor(x) ) );
    myallTimeChart = new Chart(ctx, {
        type: 'polarArea',
        data: {
            labels: map,
            datasets: [{
                label: "Số ca",
                pointRadius: 0,
                backgroundColor: Array.from(array, x => getColor(x)),
                borderColor: Array.from(array, x => LightenDarkenColor(getColor(x), -20)),//array.map(x => getColor(x)), 
                data: array,//.reduce((r, a) => a.map((b, i) => (r[i] || 0) + b), [])
            }],
        },
        options: { 
            animation: {
                duration: 0,
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

function showchart_alltime1(selected_adm1) {


    // var p = pops["" + id_.get(selected_adm1)];
    // var yy = current_idx_Date.getFullYear() - 2016;
    document.getElementById('alldaily_num').textContent = "của " + selected_adm1;
    // console.log(headers);
    // console.log(adm1_time.get("An Giang"));
    if (myallTimeChart != null) {
        myallTimeChart.destroy();
    }
    var array = [];

    var map = mapVN[selected_adm1];
    for (var i = 0; i < map.length; i++) {
        var item = map[i];
        var p = pops["" + id_.get(selected_adm1 + item)];

        array.push((adm2_time.get("" + id_.get(selected_adm1 + item)).slice(slider_idx1,slider_idx2 * 1 + 1).map(function (x, index) {
            return x * 100000 / p[index];
        }).reduce((a, b) => a + b, 0)).toFixed(2));
    }
    // array = array.map(function (x, index) {
    //     return x * 100000 / p[slider_idx2];
    // });
    // console.log(array);
    var ctx = document.getElementById("myallTimeChart");
    myallTimeChart = new Chart(ctx, {
        type: 'polarArea',
        data: {
            labels: map,
            datasets: [{
                label: "Số ca",
                pointRadius: 0,
                backgroundColor: Array.from(array, x => getColor(x)),
                borderColor: Array.from(array, x => LightenDarkenColor(getColor(x), -20)),//array.map(x => getColor(x)), 
                data: array,

            }],
        },
        options: { 
            animation: {
                duration: 0,
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



function showchart_alltime2(selected_adm1, selected_adm2) {

    document.getElementById('alldaily_num').textContent = "của " + selected_adm2 + ", " + selected_adm1;
    // console.log(headers);
    // console.log(adm2_time.get(""+id_.get(selected_adm1 + selected_adm2)));
    if (myallTimeChart != null) {
        myallTimeChart.destroy();
    }
    var array = [];

    var map = mapVN[selected_adm1 + selected_adm2];
    var p = pops["" + id_.get(selected_adm1 + selected_adm2)];
    for (var i = 0; i < map.length; i++) {
        var item = map[i];
        if(item !=="" && adm3_time.get("" + id_.get(selected_adm1 + selected_adm2 + item))!=null) {
            
            // var p = pops["" + id_.get(selected_adm1)]; 
            
            array.push((adm3_time.get("" + id_.get(selected_adm1 + selected_adm2 + item)).slice(slider_idx1,slider_idx2 * 1 + 1).reduce((a, b) => a + b, 0)).toFixed(2));
        }
        // console.log(selected_adm1 + selected_adm2 + item);
        // console.log(adm3_time.get("" + id_.get(selected_adm1 + selected_adm2 + item)));
        // console.log(i+" "+j+" "+tmpar[i][j]);.map(x => x * 100000 / p[yy])
    }


    var ctx = document.getElementById("myallTimeChart");
    myallTimeChart = new Chart(ctx, {
        type: 'polarArea',
        data: {
            labels: map,
            datasets: [{
                label: "Số ca",
                pointRadius: 0,
                backgroundColor: Array.from(array, x => getColor(x)),
                borderColor: Array.from(array, x => LightenDarkenColor(getColor(x), -20)),//array.map(x => getColor(x)), 
                data: array,
            }],
        },
        options: { 
            animation: {
                duration: 0,
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

// function showchart_alltime3(selected_adm1, selected_adm2, selected_adm3) {


//     document.getElementById('alldaily_num').textContent = "của " + selected_adm3 + ", " + selected_adm2 + ", " + selected_adm1;
//     // console.log(headers);
//     // console.log(adm1_time.get("An Giang"));
//     if (myallTimeChart != null) {
//         myallTimeChart.destroy();
//     }
//     var ctx = document.getElementById("myallTimeChart");
//     myallTimeChart = new Chart(ctx, {
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



function LightenDarkenColor(colorCode, amount) {
    var usePound = false;

    if (colorCode[0] == "#") {
        colorCode = colorCode.slice(1);
        usePound = true;
    }

    var num = parseInt(colorCode, 16);

    var r = (num >> 16) + amount;

    if (r > 255) {
        r = 255;
    } else if (r < 0) {
        r = 0;
    }

    var b = ((num >> 8) & 0x00FF) + amount;

    if (b > 255) {
        b = 255;
    } else if (b < 0) {
        b = 0;
    }

    var g = (num & 0x0000FF) + amount;

    if (g > 255) {
        g = 255;
    } else if (g < 0) {
        g = 0;
    }

    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
}