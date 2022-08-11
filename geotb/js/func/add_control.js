var zoomHome = L.Control.zoomHome();
zoomHome.addTo(Lmap);


var btnTinh = L.easyButton('<h3>T</h3>', function () {
    //console.log("tinh");

    if (!allloaded) return;
    clicked_province = "";
    clicked_district = "";
    clicked_commune = "";
    color1 = true;
    if (clicked_province === "") {
        reset_adm1();
    }
}, "Xem mức tỉnh, thành");

var btnHuyen = L.easyButton('<h3>H</h3>', function () {
    //console.log("huyen");
    // clicked_province = "";
    // clicked_district = "";
    //clicked_commune = "";
    if (!allloaded) return;
    color1 = false;
    if (clicked_province === "") {
        reset_adm2();
    } else if (clicked_province) {

        clean_map();
        adm2_layer = L.geoJson(mydata2, {
            style: style,
            filter: provinceFilter,
            onEachFeature: onEachFeature2
        });
        adm2_layer.addTo(Lmap);
    }

    if (clicked_district) {
        clean_map();
        adm2_layer = L.geoJson(mydata2, {
            style: style,
            filter: districtFilter2,
            onEachFeature: onEachFeature2
        });
        adm2_layer.addTo(Lmap);
    }
}, "Xem mức quận, huyện");

var btnXa = L.easyButton('<h3>X</h3>', function () {
    //console.log("xa");	
    //clicked_province = "";
    // clicked_district = "";
    // clicked_commune = "";
    if (!allloaded) return;


    color1 = false;
    if (clicked_province === "") {
        reset_adm3();
    } else
        if (clicked_province) {
            clean_map();
            adm3_layer = L.geoJson(mydata3, {
                style: style,
                filter: provinceFilter,
                onEachFeature: onEachFeature3
            });
            adm3_layer.addTo(Lmap);
        }
    if (clicked_district) {
        clean_map();
        adm3_layer = L.geoJson(mydata3, {
            style: style,
            filter: districtFilter,
            onEachFeature: onEachFeature3
        });
        adm3_layer.addTo(Lmap);
    }

}, "Xem mức phường, xã");


// function build_slider() {
//     if (main_type_ == "geoai") {
//         slider = L.control.slider(function (value) {
//             // console.log(value);
//             slider_idx2 = value;
//             current_idx_Date = new Date(headers[slider_idx2]);
//             if (document.getElementById('month')) {
//                 document.getElementById('month').textContent = headers[slider_idx2];//d2.toLocaleDateString('vi-VN'); //months[month];
//             }
//             // showDisclaimer();
//             zoom_based_layerchange();
//         }, {
//             max: 100,
//             value: headers.length - 1,
//             step: 1,
//             size: '100px',
//             showValue: false,
//             orientation: 'vertical',
//             id: 'slider'
//         });
//         slider_idx2 = headers.length - 1;
//     } else {
//         slider = L.control.slider(function (value) {
//             // console.log(value);
//             slider_idx2 = value;
//             current_idx_Date = new Date(headers[slider_idx2]);
//             if (document.getElementById('month')) {
//                 document.getElementById('month').textContent = headers[slider_idx2];//d2.toLocaleDateString('vi-VN'); //months[month];
//             }
//             // showDisclaimer();
//             zoom_based_layerchange();
//         }, {
//             max: headers.length - 1,
//             value: headers.length - 1,
//             step: 1,
//             size: '100px',
//             showValue: false,
//             orientation: 'vertical',
//             id: 'slider'
//         });
//         slider_idx2 = headers.length - 1;
//     }
// }
// control that shows state info on hover


// function showDisclaimer() {
//     var div = document.getElementById("info legend");
//     div.innerHTML = 'Thời gian:<label class="text-danger" id="month">' + headers[slider_idx2] + '</label><table>' + legends_labels.join('');
// }

// function hideDisclaimer() {
//     var div = document.getElementById("info legend");
//     div.innerHTML = 'Thời gian:<label class="text-danger" id="month">' + headers[slider_idx2] + '</label><table>';
// }

var legend = L.control({ position: 'topright' });
var legends_labels = [];
var legends1_labels = [];
var legends_ai_labels = [];
legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend');
    div.id = "info legend";
    // div.setAttribute("onmouseenter", "showDisclaimer()");
    // div.setAttribute("onmouseleave", "hideDisclaimer()");

    div.setAttribute("title", "Số ca trên 100 000 dân");
    div.innerHTML = 'Thời gian:<label class="text-danger" id="month">' + headers[slider_idx2] + '</label><table>';
    var grades = [182.86, 365.71, 548.57, 731.43, 914.29, 1097.14, 1280.00],// [182.86, '#fee5d9'],
        grades1 = [30, 60, 90, 120, 150, 180, 1280.00],
        // [365.71, '#fcbba1'],
        // [548.57, '#fc9272'],
        // [731.43, '#fb6a4a'],
        // [914.29, '#ef3b2c'],
        // [1097.14, '#cb181d'],
        // [1280.00, '#99000d']
        ptype = ["0", "182.86", "365.71", "548.57", "731.43", "914.29", "1097.14"],
        ptype1 = ["- 182.86", "- 365.71", "- 548.57", "- 731.43", "- 914.29", "- 1097.14", "- 1280.00+"],
        ptype_ = ["0", "30", "60", "90", "120", "150", "180"],
        ptype1_ = ["- 30", "- 60", "- 90", "- 120", "- 150", "- 180", "- 210+"],
        from, to;
    legends_labels.push('<table>');
    legends1_labels.push('<table>');

    legends_ai_labels.push('<table>');


    for (var i = 0; i < grades.length; i++) {
        from = grades[i];
        from1 = grades1[i];
        //to = grades[i + 1];


        legends_labels.push('<tr><td>' + ptype[i] + '</td><td>' + ptype1[i] + '</td>');
        legends_labels.push('<td><i style="background:' + getColor(from + 1) + '">&nbsp;&nbsp;&nbsp;</i></td></tr>');

        legends1_labels.push('<tr><td>' + ptype_[i] + '</td><td>' + ptype1_[i] + '</td>');
        legends1_labels.push('<td><i style="background:' + getColor1(from1 + 1) + '">&nbsp;&nbsp;&nbsp;</i></td></tr>');

        legends_ai_labels.push('<tr><td>' + ptype[i] + '</td><td>' + ptype1[i] + '</td>');
        legends_ai_labels.push('<td><i style="background:' + getColorAI(from + 1) + '">&nbsp;&nbsp;&nbsp;</i></td></tr>');
    }

    legends_labels.push('</table>');
    legends1_labels.push('</table>');
    legends_ai_labels.push('</table>');
    // console.log(legends_labels);
    div.innerHTML = legends_labels.join('');


    return div;
};
legend.addTo(Lmap);


var info = L.control({ position: 'topright' });

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update('');
    return this._div;
};


info.update = function (str) {
    this._div.innerHTML = str;
    // if (feature && feature.properties) {
    //     var sc = 0;
    //     sc = getScore(feature);
    //     this._div.innerHTML = '' + (feature.properties ?
    //         '<b>' + feature.properties.name + '</b>' +
    //         (feature.properties.name2 ? (", <b>" + feature.properties.name2 + "</b>") : "") +
    //         (feature.properties.name1 ? (", <b>" + feature.properties.name1 + "</b>") : "") +
    //         '<br />' + sc + '.' :
    //         '');

    // }
};

info.addTo(Lmap);



Lmap.addControl(new L.Control.Fullscreen({
    pseudoFullscreen: true,
    title: {
        'false': 'Xem toàn màn hình',
        'true': 'Thoát chế độ Toàn màn hình'
    }
}));


var searchText1 = "";
var searchText2 = "";
var searchText3 = "";
var sliderYear;
// select2DataCollectName(root);
var select2DataObject1 = [];
var select2DataObject2 = [];
var select2DataObject3 = [];
function add_select2() {
    var map1 = mapVN["VN"];
    select2DataObject1 = [];

    select2DataObject1.push({
        "id": "VN",
        "text": "Việt Nam"
    });
    for (var i = 0; i < map1.length; i++) {
        var item = map1[i];
        select2DataObject1.push({
            "id": i,
            "text": item
        });
    }
    $("#searchName1").empty();
    $("#searchName1").select2({
        placeholder: "Tỉnh/thành",
        data: select2DataObject1,
        closeOnSelect: false
    });
    $("#searchName1").val('').trigger('change');
    // $("#searchYear1").val('').trigger('change');

    // console.log(headers_sim.length);
    sliderYear = new Slider("#sldr_year", { min: 0, max: headers_sim.length - 1, value: [0, headers.length - 1], focus: true });
    sliderYear.on("slideStop", function (sliderValue) {
        document.getElementById("sldr_yearSliderVal").textContent = "từ " + headers_sim[sliderValue[0]] + " đến " + headers_sim[sliderValue[1]];
        slider_idx1 = sliderValue[0];
        slider_idx2 = sliderValue[1];
        zoom_based_layerchange();
    });
    sliderYear.on('change', function (event) {
        var a = event.newValue;
        var b = event.oldValue;

        document.getElementById("sldr_yearSliderVal").textContent = "từ " + headers_sim[a[0]] + " đến " + headers_sim[a[1]];

        zoom_based_layerchange();
    });
    $("#searchYear1").val(2020).trigger('change');

    slider_idx1 = 48;
    slider_idx2 = slider_idx1 + 6;

    sliderYear.setValue([slider_idx1, slider_idx2], false, true);
}
$("#searchName1").select2({
    placeholder: "Tỉnh/thành",
    data: select2DataObject1,
    closeOnSelect: false
});
$("#searchName2").select2({
    placeholder: "Quận/huyện",
    data: select2DataObject2,
    closeOnSelect: false
});
$("#searchName3").select2({
    placeholder: "Phường/Xã",
    data: select2DataObject3,
    closeOnSelect: false
});

var select2DataObjectYear = [];
select2DataObjectYear.push({
    "id": "all",
    "text": "Tất cả"
});
for (var i = 2020; i > 2015; i--) {
    select2DataObjectYear.push({
        "id": i,
        "text": i
    });
}
$("#searchYear1").select2({
    placeholder: "Năm",
    data: select2DataObjectYear,
    closeOnSelect: false
});
$("#searchYear1").on("select2:select", function (e) {
    var year_ = e.params.data.text;
    if (year_ === "Tất cả") {
        slider_idx1 = 0;
        slider_idx2 = 54;
    }
    if (year_ == 2020) {
        slider_idx1 = 48;
        slider_idx2 = slider_idx1 + 6;
    }
    if (year_ == 2019) {
        slider_idx1 = 36;
        slider_idx2 = slider_idx1 + 11;
    }
    if (year_ == 2018) {
        slider_idx1 = 24;
        slider_idx2 = slider_idx1 + 11;
    }
    if (year_ == 2017) {
        slider_idx1 = 12;
        slider_idx2 = slider_idx1 + 11;
    }
    if (year_ == 2016) {
        slider_idx1 = 0;
        slider_idx2 = slider_idx1 + 11;
    }
    sliderYear.setValue([slider_idx1, slider_idx2], false, true);
});


$("#searchName1").on("select2:select", function (e) {
    searchText1 = e.params.data.text;
    if (searchText1 === "Việt Nam") {
        if (allloaded) {
            $("#searchName2").empty();
            $("#searchName3").empty();
            // main_type_ = "default";
            type_of_rate = 0;
            index_of_rate = 0;
            Lmap.setView([16.0376435, 107.5341797], 5.5);
            reset_adm1();
        }
    } else {
        dosearch();
    }
});
function dosearch() {
    // console.log(searchText1);
    var map2 = mapVN[searchText1];
    fit_zoom_to1(searchText1);
    select2DataObject2 = [];
    select2DataObject2.push({
        "id": "all",
        "text": "Tất cả"
    });
    for (var i = 0; i < map2.length; i++) {
        var item = map2[i];
        select2DataObject2.push({
            "id": i,
            "text": item
        });
    }
    $("#searchName2").empty();
    $("#searchName2").select2({
        placeholder: "Quận/huyện",
        data: select2DataObject2,
        closeOnSelect: false
    });
    $("#searchName2").on("select2:select", function (e) {
        $("#searchName3").empty();
        if (e.params.data.text === "Tất cả") {
            fit_zoom_to1(searchText1);
        } else {

            searchText2 = e.params.data.text;
            fit_zoom_to2(searchText1, searchText2);
            var map3 = mapVN[searchText1 + searchText2];
            select2DataObject3 = [];
            select2DataObject3.push({
                "id": "all",
                "text": "Tất cả"
            })
            for (var i = 0; i < map3.length; i++) {
                var item = map3[i];
                select2DataObject3.push({
                    "id": i,
                    "text": item
                });
            }
            $("#searchName3").select2({
                placeholder: "Phường/Xã",
                data: select2DataObject3,
                closeOnSelect: false
            });
            $("#searchName3").on("select2:select", function (e) {
                if (e.params.data.text === "Tất cả") {
                    fit_zoom_to2(searchText1, searchText2);
                } else {
                    searchText3 = e.params.data.text;
                    fit_zoom_to3(searchText1, searchText2, searchText3);
                }
                // console.log(searchText1 + searchText2 + searchText3);
            });
        }

    })
}

function changeFunc(i) {
    // console.log(i);
    if (i === "AI") {
        main_type_ = "geoai";
        // if(!load_pcm){
        //     getdata_pcm();
        // }
    } else {
        main_type_ = "default";
    }
    if (loaded_pcm) {
        update_layers();
    }
}
