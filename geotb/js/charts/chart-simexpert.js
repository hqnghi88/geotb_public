// Area Chart Example
var expert_data=[];
var mysimexpertChart = null;
var mysimexpertRateChart = null;
// var simres=[0,0,0,1,2,5,9,12,15,17,18,20,21,21,22,22,23,23,24,25,25,25,25,25,25,25,25,25,25,25,25,25,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,25,25,25,24,24,23,23,22,21,19,18,17,15,14,12,11,10,9,7,6,5,4,3,3,2,2,1,1,1,1,1,1,0,0,0,0,0,0,0];
var simres = [0, 2, 6, 15, 40, 67, 90, 110, 145, 170, 194, 208, 227, 239, 253, 255, 257, 257, 260, 263, 264, 265, 269, 269, 269, 272, 271, 272, 273, 273, 274, 273, 273, 273, 274, 274, 275, 276, 276, 276, 276, 276, 275, 275, 276, 276, 276, 276, 276, 276, 276, 276, 276, 276, 276, 276, 276, 276, 276, 276, 276, 276, 276, 276, 276, 276, 276, 276, 276, 276, 276, 276, 276, 276, 276, 276, 276, 276, 276, 276, 274, 271, 270, 270, 266, 264, 253, 242, 236, 226, 213, 206, 193, 177, 161, 150, 130, 117, 102, 91, 82, 75, 72, 63, 55, 41, 33, 27, 21, 18, 15, 13, 12, 12, 11, 10, 7, 7, 4, 3, 3];
var simvn = null;
function showchart_simexpert() {
    // document.getElementById('sim_num').textContent = "của Việt Nam";
    var map = mapVN["VN"];
    var array = [];
    var cm0 = [];
    var cm1 = [];
    var cm2 = null;
    var cm3 = null;
    var cm4 = null;
    var c0 = [];
    var c1 = [];
    var c2 = [];
    var c3 = [];
    var c4 = [];
    for (var i = 0; i < map.length; i++) {
        var item = map[i];
        array.push(adm1_time.get("" + id_.get(item)));
        // c0.push(adm1_pcm.get("" + id_.get(item) + "_0"));
        // c1.push(adm1_pcm.get("" + id_.get(item) + "_1"));
        c2.push(adm1_pcm.get("" + id_.get(item) + "_2"));
        c3.push(adm1_pcm.get("" + id_.get(item) + "_3"));
        c4.push(adm1_pcm.get("" + id_.get(item) + "_4"));
    }

    for (var i = 0; i < map.length; i++) {
        var item = map[i];
        var tt = JSON.parse(JSON.stringify(adm1_sexage.get("" + id_.get(item) + "_" + 16)));
        for (var j = 17; j < 23; j++) {
            var ttt = adm1_sexage.get("" + id_.get(item) + "_" + j);//.slice(slider_idx1, slider_idx2 * 1 + 1));
            tt = tt.map(function (x, index) {
                return x + ttt[index];
            });
        }
        cm1.push(tt);
        // .map(function (x, index) {
        //     return x * 100000 / p[index] * (cm0[index] * param[0] + cm1[index] * param[1] + cm2[index] * param[2] + cm3[index] * param[3] + cm4[index] * param[4]) / 500;
        // })
        // tmp = tmp.reduce((r, a) => a.map((b, i) => (r[i] || 0) + b), []);
        // ahiv.push(tmp);
    }
    // if (p) {
    //     return (sc.slice(slider_idx1,slider_idx2*1+1).reduce((a, b) => a + b, 0)) * 100000 / p[current_idx_Date.getFullYear() - 2016];
    // } 
    simvn = JSON.parse(JSON.stringify(array));//;//.slice(slider_idx1,slider_idx2 * 1+1);
    // cm1 = JSON.parse(JSON.stringify(c1));
    cm2 = JSON.parse(JSON.stringify(c2));
    cm3 = JSON.parse(JSON.stringify(c3));
    cm4 = JSON.parse(JSON.stringify(c4));
    // console.log(timevn);B
    // console.log(tmpar);
    for (var i = 1; i < 63; i++) {
        for (var j = 0; j < 55; j++) {
            simvn[0][j] += simvn[i][j];
            // cm0[0][j] += cm0[i][j];
            cm1[0][j] += cm1[i][j];
            cm2[0][j] += cm2[i][j];
            cm3[0][j] += cm3[i][j];
            cm4[0][j] += cm4[i][j];

            // console.log(i+" "+j+" "+tmpar[i][j]);
        }
    }

    var cas = JSON.parse(JSON.stringify(simvn));
    var cm_sim = JSON.parse(JSON.stringify(simres));




    var array_tmp_2016 = cas[0].slice(0, 11);
    var avg_2016 = array_tmp_2016.reduce((a, v, i) => (a * i + v) / (i + 1));
    var mmax_2016 = Math.max(...array_tmp_2016);
    mmax_2016 = (mmax_2016 + avg_2016) / 2;



    var array_tmp_2017 = cas[0].slice(12, 12 + 11);
    var avg_2017 = array_tmp_2016.reduce((a, v, i) => (a * i + v) / (i + 1));
    var mmax_2017 = Math.max(...array_tmp_2017);
    mmax_2017 = (mmax_2017 + avg_2017) / 2;



    var array_tmp_2018 = cas[0].slice(24, 24 + 11);
    var avg_2018 = array_tmp_2016.reduce((a, v, i) => (a * i + v) / (i + 1));
    var mmax_2018 = Math.max(...array_tmp_2018);
    mmax_2018 = (mmax_2018 + avg_2018) / 2;



    var array_tmp_2019 = cas[0].slice(36, 36 + 11);
    var avg_2019 = array_tmp_2019.reduce((a, v, i) => (a * i + v) / (i + 1));
    var mmax_2019 = Math.max(...array_tmp_2019);
    mmax_2019 = (mmax_2019 + avg_2019) / 2;

    // var array_tmp = cas[0];//.slice(10,55);
    
    
    var array_tmp_2020 = cas[0].slice(48, 48 + 6);
    var avg_2020 = array_tmp_2020.reduce((a, v, i) => (a * i + v) / (i + 1));
    var mmax_2020 = Math.max(...array_tmp_2020);
    mmax_2020 = (mmax_2020 + avg_2020) / 2;
    
    
    var avg = (avg_2016 + avg_2017 + avg_2018 + avg_2019 + avg_2020) / 5;//array_tmp.reduce((a, v, i) => (a * i + v) / (i + 1));
    var mmax = (mmax_2016 + mmax_2017 + mmax_2018 + mmax_2019 + mmax_2020) / 5;//Math.max(...array_tmp);
    mmax = (mmax + avg + avg) / 3;


    var cmax = Math.max(...cm_sim);
    var cmax_2016 = Math.max(...cm_sim.slice(0, 11));
    var cmax_2017 = Math.max(...cm_sim.slice(12, 12 + 11));
    var cmax_2018 = Math.max(...cm_sim.slice(24, 24 + 11));
    var cmax_2019 = Math.max(...cm_sim.slice(36, 36 + 11));
    var cmax_2020 = Math.max(...cm_sim.slice(48, 48 + 6));

    var old_t_avg=0;
    for (var i=0; i<50; i++){
        var t_avg=0;
        for(var j=-5; j<5; j++){
            t_avg+=(cas[0][i+j]?cas[0][i+j]:0); 
        }
        t_avg=t_avg/10;
        old_t_avg=(t_avg>0?t_avg:old_t_avg);
        cm_sim[i]=cm_sim[i]* old_t_avg / cmax; 
    }
    for (var i=50; i<121; i++){ 
        cm_sim[i]=cm_sim[i]* old_t_avg / cmax; 
    }
    // cm_sim = cm_sim.map(function (x, idx) { 
    //     if (0 <= idx && idx <= 11) {
    //         return x * mmax_2016 / cmax_2016;
    //     } else if (12 <= idx && idx <= 12 + 11) {
    //         return x * mmax_2017 / cmax_2017;
    //     } else if (24 <= idx && idx <= 24 + 11) {
    //         return x * mmax_2018 / cmax_2018;
    //     } else if (36 <= idx && idx <= 36 + 11) {
    //         return x * mmax_2019 / cmax_2019;
    //     } else if (48 <= idx && idx <= 48 + 6) {
    //         return x * mmax_2020 / cmax_2020;
    //     } else {
    //         return x * mmax / cmax;
    //     }
    // });

    // internal_show_simexpert(cas[0], cm_sim);
    cm0 = JSON.parse(JSON.stringify(simvn));
    // console.log(cm1[0]);
    // console.log((expert_data[2]));
    var p = pops["VN"];
    for (var j = 0; j < headers_sim.length; j++) {
        var B1 = cm_sim[j] * 100000 / p[j % 50] * (1 + j / 50 / 10);
        var B2 = cm1[0][j % 50] * 100000 / p[j % 50] * (1 + j / 50 / 10);
        var B3 = cm2[0][j % 50] * 100000 / p[j % 50] * (1 + j / 50 / 10);
        var B4 = cm3[0][j % 50] * 100000 / p[j % 50] * (1 + j / 50 / 10);
        var B5 = cm4[0][j % 50] * (1 + j / 50 / 10);
        // console.log(B1 + "," + B2 + "," + B3 + "," + B4 + "," + B5);
        cm0[0][j] = B1 * ((param[0] / 5) * B2 + (1 - (param[0] / 5)) * B3) * B4 * B5 / 5000000;
        simvn[0][j] = (simvn[0][j] * 100000 / p[j]) * ((expert_data[2] / 5) * B2 + (1 - (expert_data[2] / 5)) * B3) * B4 * B5 / 5000000;
        // simvn[0][j] = simvn[0][j] * 100000 / p[j];
        // console.log(i+" "+j+" "+tmpar[i][j]);.map(x => x * 100000 / p[yy])
    }
    // console.log(cm0[0]);
    // console.log(adm1_time.get("An Giang"));

    internal_show_simexpert_rate(simvn[0], cm0[0]);
}

function showchart_simexpert1(selected_adm1) {


    var p = pops["" + id_.get(selected_adm1)];
    var array = JSON.parse(JSON.stringify(adm1_time.get("" + id_.get(selected_adm1))));
    var cm_sim = JSON.parse(JSON.stringify(simres));
    // array = array.map(function (x, index) {
    //     return x * 100000 / p[index];
    // });
    // for (var j = 0; j < headers.length; j++) {
    //     array[j] = array[j] * 100000 / p[j];
    // }
    // var array_tmp = array;//.slice(10,55);
    // var avg = array_tmp.reduce((a, v, i) => (a * i + v) / (i + 1));

    var cas = JSON.parse(JSON.stringify(array));
    var cm_sim = JSON.parse(JSON.stringify(simres));
    // var mmax = Math.max(...array);
    // mmax = (mmax + avg + avg) / 3;
    // var cmax = Math.max(...cm_sim);

    // var array_tmp = cas;//.slice(10,55);
    // var avg = array_tmp.reduce((a, v, i) => (a * i + v) / (i + 1));
    // var mmax = Math.max(...array_tmp);
    // mmax = (mmax + avg + avg) / 3;



    var array_tmp_2016 = cas.slice(0, 11);
    var avg_2016 = array_tmp_2016.reduce((a, v, i) => (a * i + v) / (i + 1));
    var mmax_2016 = Math.max(...array_tmp_2016);
    mmax_2016 = (mmax_2016 + avg_2016) / 2;



    var array_tmp_2017 = cas.slice(12, 12 + 11);
    var avg_2017 = array_tmp_2016.reduce((a, v, i) => (a * i + v) / (i + 1));
    var mmax_2017 = Math.max(...array_tmp_2017);
    mmax_2017 = (mmax_2017 + avg_2017) / 2;



    var array_tmp_2018 = cas.slice(24, 24 + 11);
    var avg_2018 = array_tmp_2016.reduce((a, v, i) => (a * i + v) / (i + 1));
    var mmax_2018 = Math.max(...array_tmp_2018);
    mmax_2018 = (mmax_2018 + avg_2018) / 2;



    var array_tmp_2019 = cas.slice(36, 36 + 11);
    var avg_2019 = array_tmp_2019.reduce((a, v, i) => (a * i + v) / (i + 1));
    var mmax_2019 = Math.max(...array_tmp_2019);
    mmax_2019 = (mmax_2019 + avg_2019) / 2;



    var array_tmp_2020 = cas.slice(48, 48 + 6);
    var avg_2020 = array_tmp_2020.reduce((a, v, i) => (a * i + v) / (i + 1));
    var mmax_2020 = Math.max(...array_tmp_2020);
    mmax_2020 = (mmax_2020 + avg_2020) / 2;



    var avg = (avg_2016 + avg_2017 + avg_2018 + avg_2019 + avg_2020) / 5;//array_tmp.reduce((a, v, i) => (a * i + v) / (i + 1));
    var mmax = (mmax_2016 + mmax_2017 + mmax_2018 + mmax_2019 + mmax_2020) / 5;//Math.max(...array_tmp);
    mmax = (mmax + avg + avg) / 3;


    var cmax = Math.max(...cm_sim);
    var cmax_2016 = Math.max(...cm_sim.slice(0, 11));
    var cmax_2017 = Math.max(...cm_sim.slice(12, 12 + 11));
    var cmax_2018 = Math.max(...cm_sim.slice(24, 24 + 11));
    var cmax_2019 = Math.max(...cm_sim.slice(36, 36 + 11));
    var cmax_2020 = Math.max(...cm_sim.slice(48, 48 + 6));

    var old_t_avg=0;
    for (var i=0; i<50; i++){
        var t_avg=0;
        for(var j=-5; j<5; j++){
            t_avg+=(cas[i+j]?cas[i+j]:0); 
        }
        t_avg=t_avg/10;
        old_t_avg=(t_avg>0?t_avg:old_t_avg);
        cm_sim[i]=cm_sim[i]* old_t_avg / cmax; 
    }
    for (var i=50; i<121; i++){ 
        cm_sim[i]=cm_sim[i]* old_t_avg / cmax; 
    }
    // cm_sim = cm_sim.map(function (x, idx) {
    //     if (0 <= idx && idx <= 11) {
    //         return x * mmax_2016 / cmax_2016;
    //     } else if (12 <= idx && idx <= 12 + 11) {
    //         return x * mmax_2017 / cmax_2017;
    //     } else if (24 <= idx && idx <= 24 + 11) {
    //         return x * mmax_2018 / cmax_2018;
    //     } else if (36 <= idx && idx <= 36 + 11) {
    //         return x * mmax_2019 / cmax_2019;
    //     } else if (48 <= idx && idx <= 48 + 6) {
    //         return x * mmax_2020 / cmax_2020;
    //     } else {
    //         return x * mmax / cmax;
    //     }
    // });



    // internal_show_simexpert(cas, cm_sim);
    // cm0 = cm0.map(function (x) {
    //     return x * mmax / cmax;
    // });

    var simvn = JSON.parse(JSON.stringify(array));
    cm0 = JSON.parse(JSON.stringify(cm_sim));
    var c0 = [];
    var c1 = [];
    var c2 = [];
    var c3 = [];
    var c4 = [];
    // c0.push(adm1_pcm.get("" + id_.get(item) + "_0"));
    // c1.push(adm1_pcm.get("" + id_.get(item) + "_1"));
    c2 = adm1_pcm.get("" + id_.get(selected_adm1) + "_2");
    c3 = adm1_pcm.get("" + id_.get(selected_adm1) + "_3");
    c4 = adm1_pcm.get("" + id_.get(selected_adm1) + "_4");

    cm1 = JSON.parse(JSON.stringify(adm1_sexage.get("" + id_.get(selected_adm1) + "_" + 16)));
    for (var j = 17; j < 23; j++) {
        var ttt = adm1_sexage.get("" + id_.get(selected_adm1) + "_" + j);//.slice(slider_idx1, slider_idx2 * 1 + 1));
        cm1 = cm1.map(function (x, index) {
            return x + ttt[index];
        });
    }

    cm2 = JSON.parse(JSON.stringify(c2));
    cm3 = JSON.parse(JSON.stringify(c3));
    cm4 = JSON.parse(JSON.stringify(c4));
    

    
    for (var j = 0; j < headers_sim.length; j++) {
        var B1 = cm_sim[j] * 100000 / p[j % 50] * (1 + j / 50 / 10);
        var B2 = cm1[j % 50] * 100000 / p[j % 50] * (1 + j / 50 / 10);
        var B3 = cm2[j % 50] * 100000 / p[j % 50] * (1 + j / 50 / 10);
        var B4 = cm3[j % 50] * 100000 / p[j % 50] * (1 + j / 50 / 10);
        var B5 = cm4[j % 50] * (1 + j / 50 / 10);
        // console.log(B1 + "," + B2 + "," + B3 + "," + B4 + "," + B5);
        cm0[j] = B1 * ((param[0] / 5) * B2 + (1 - (param[0] / 5)) * B3) * B4 * B5 / 50000;
        simvn[j] = (simvn[j] * 100000 / p[j]) * ((param[0] / 5) * B2 + (1 - (param[0] / 5)) * B3) * B4 * B5 / 50000;
        // simvn[0][j] = simvn[0][j] * 100000 / p[j];
        // console.log(i+" "+j+" "+tmpar[i][j]);.map(x => x * 100000 / p[yy])
    }
    internal_show_simexpert_rate(simvn, cm0);
}



function showchart_simexpert2(selected_adm1, selected_adm2) {

    var p = pops["" + id_.get(selected_adm1 + selected_adm2)];

    var array = JSON.parse(JSON.stringify(adm2_time.get("" + id_.get(selected_adm1 + selected_adm2))));


    var cm0 = JSON.parse(JSON.stringify(simres));
    array = array.map(function (x, index) {
        return x * 100000 / p[index];
    });
    // for (var j = 0; j < headers.length; j++) {
    //     array[j] = array[j] * 100000 / p[j];
    // }

    var array_tmp = array.slice(30, 55);
    var avg = array_tmp.reduce((a, v, i) => (a * i + v) / (i + 1));
    var mmax = Math.max(...array);
    mmax = (mmax + avg) / 2;
    var cmax = Math.max(...cm0);
    cm0 = cm0.map(function (x) {
        return x * mmax / cmax;
    });
    internal_show_simexpert_rate(array, cm0);
}


function internal_show_simexpert(data, sim) {
    if (mysimexpertChart != null) {
        mysimexpertChart.destroy();
    }
    var ctx = document.getElementById("mysimexpertChart");
    mysimexpertChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: headers_sim.slice(slider_idx1, slider_idx2 * 1 + 1),// headers.slice(slider_idx1, slider_idx2 * 1 + 1),
            datasets: [{
                label: "Ý kiến chuyên gia",
                pointRadius: 0,
                backgroundColor: "green",
                borderColor: "green",
                borderDash: [10, 5],
                data: data.slice(slider_idx1, slider_idx2 * 1 + 1),
            }
                , {
                label: "Mô phỏng",
                pointRadius: 0,
                backgroundColor: "blue",
                borderColor: "blue",
                data: sim.slice(slider_idx1, slider_idx2 * 1 + 1),

            }
            ],
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
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function internal_show_simexpert_rate(simvn, cm0) {
    if (mysimexpertRateChart != null) {
        mysimexpertRateChart.destroy();
    }
    var ctx = document.getElementById("mysimexpertRateChart");
    mysimexpertRateChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: headers_sim.slice(slider_idx1, slider_idx2 * 1 + 1),// headers.slice(slider_idx1, slider_idx2 * 1 + 1),
            datasets: [{
                label: "Ý kiến chuyên gia",
                pointRadius: 0,
                backgroundColor: "green",
                borderColor: "green",
                borderDash: [10, 5],
                data: simvn.slice(slider_idx1, slider_idx2 * 1 + 1),
            }
                , {
                label: "Mô phỏng",
                pointRadius: 0,
                backgroundColor: "blue",
                borderColor: "blue",
                data: cm0.slice(slider_idx1, slider_idx2 * 1 + 1),

            }
            ],
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
            responsive: true,
            maintainAspectRatio: false
        }
    });
}
// function showchart_simexpert3(selected_adm1, selected_adm2, selected_adm3) {


//     document.getElementById('sim_num').textContent = "của " + selected_adm3 + ", " + selected_adm2 + ", " + selected_adm1;
//     // console.log(headers);
//     // console.log(adm1_time.get("An Giang"));
//     if (mysimexpertRateChart != null) {
//         mysimexpertRateChart.destroy();
//     }
//     var ctx = document.getElementById("mysimexpertRateChart");
//     mysimexpertRateChart = new Chart(ctx, {
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