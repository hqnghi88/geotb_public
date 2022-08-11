const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

province = urlParams.get('p');
//console.log(province); 

district = urlParams.get('d');
//console.log(district); 

commune = urlParams.get('c');
//console.log(commune); 
var clicked_province = "";
var clicked_district = "";
var clicked_commune = "";
var color1 = false;
var slider_idx1 = 0;
var slider_idx2 = 70;

// var adm1_layer;
// var adm2_layer;
// var adm3_layer; 

var Lmap = L.map('map', {
    zoomControl: false,
    scrollWheelZoom: false
}).setView([16.0376435, 107.5341797], 5.5);


adm1_layer = L.geoJson(mydata1, {
    style: style,
    onEachFeature: onEachFeature1
}).addTo(Lmap);

adm2_layer = L.geoJson(mydata2, {
    style: style,
    onEachFeature: onEachFeature2
});
adm3_layer = L.geoJson(mydata3, {
    style: style,
    onEachFeature: onEachFeature3
});

L.tileLayer('https://maps.vnpost.vn/api/tm/{z}/{x}/{y}@2x.png?apikey={accessToken}', {
    // attribution: 'Map data &copy; <a href="https://vmap.vn">Vmap</a>, <a href="http://openstreetmap.org">OSM Contributors</a>',
    maxZoom: 20,
    id: 'Vmap.streets',
    accessToken: '26f9804e1ff6d86f72a33ebd518f057e0aff542de23c724d'
}).addTo(Lmap);
// L.tileLayer('https://maps.vietmap.vn/api/tm/{z}/{x}/{y}.png?apikey=383a90729d0590f9e1074083a11791ff64767fb56c1d9c4f', {
//     // attribution: 'Map data &copy; <a href="https://maps.vietmap.vn">VIETMAP</a>',
//     maxZoom: 20,
//     minZoom: 5.5,
//     id: 'mapbox/light-v9',
//     tileSize: 512,
//     zoomOffset: -1
// }).addTo(Lmap);


Lmap.on('zoomend', function (e) {
    zoom_based_layerchange();
});

function clean_map() {
    if (allloaded) {
        Lmap.eachLayer(function (layer) {
            if (layer instanceof L.GeoJSON)
            //Do marker specific actions here
            {
                //layer._leaflet_id = null;
                Lmap.removeLayer(layer);
            }
            //console.log(layer);
        });
    }
}


function reset_adm1() {
    if (allloaded) {
        document.getElementById("info legend").innerHTML = legends_labels.join('');
        if (color1) {
            document.getElementById("info legend").innerHTML = legends1_labels.join('');
        }
        if (main_type_ == "geoai") {
            document.getElementById("info legend").innerHTML = legends_ai_labels.join('');
        }
        $("#searchName1").val('').trigger('change');
        $("#searchName2").empty();
        $("#searchName3").empty();
        // $("#searchName2").val('').trigger('change');
        // $("#searchName3").val('').trigger('change');


        showallchart();
        clean_map();
        clicked_province = "";
        clicked_district = "";
        clicked_commune = "";
        adm1_layer = L.geoJson(mydata1, {
            style: style,
            onEachFeature: onEachFeature1
        }).addTo(Lmap);
    }
    // Lmap.setView([21.000511, 105.714817], 9);

    //Lmap.fitBounds(adm1_layer.getBounds());
}


function reset_adm2() {
    if (allloaded) {
        if (clicked_province === "") {
            clean_map();
            adm2_layer = L.geoJson(mydata2, {
                style: style,
                filter: provinceFilter,
                onEachFeature: onEachFeature2
            });
            adm2_layer.addTo(Lmap);
        } else if (clicked_province) {

            clean_map();
            adm2_layer = L.geoJson(mydata2, {
                style: style,
                filter: provinceFilter,
                onEachFeature: onEachFeature2
            });
            adm2_layer.addTo(Lmap);
            showallchart1();
        }
    }
    // if (clicked_district) {
    //     clean_map();
    //     adm2_layer = L.geoJson(mydata2, {
    //         style: style,
    //         filter: districtFilter2,
    //         onEachFeature: onEachFeature2
    //     });
    //     adm2_layer.addTo(Lmap);
    // }
    // Lmap.fitBounds(adm2_layer.getBounds());
}

function reset_adm3() {
    if (allloaded) {
        if (clicked_province === "") {
            clean_map();
            adm3_layer = L.geoJson(mydata3, {
                style: style,
                filter: districtFilter,
                onEachFeature: onEachFeature3
            });
            adm3_layer.addTo(Lmap);
        } else
            if (clicked_province) {
                clean_map();
                adm3_layer = L.geoJson(mydata3, {
                    style: style,
                    filter: provinceFilter,
                    onEachFeature: onEachFeature3
                });
                adm3_layer.addTo(Lmap);
                showallchart2();
            }
        if (clicked_district) {
            clean_map();
            adm3_layer = L.geoJson(mydata3, {
                style: style,
                filter: districtFilter,
                onEachFeature: onEachFeature3
            });
            adm3_layer.addTo(Lmap);
            showallchart2();
        }
    }
    // Lmap.fitBounds(adm3_layer.getBounds());
}

function reset_adm4() {
    if (allloaded) {
        clean_map();
        if (communeFilter != "") {
            adm3_layer = L.geoJson(mydata3, {
                style: style,
                filter: communeFilter,
                onEachFeature: onEachFeature3
            });
        } else {
            if (clicked_district != "") {
                adm3_layer = L.geoJson(mydata3, {
                    style: style,
                    filter: districtFilter,
                    onEachFeature: onEachFeature3
                });
            }
            else {
                adm3_layer = L.geoJson(mydata3, {
                    style: style,
                    filter: provinceFilter,
                    onEachFeature: onEachFeature3
                });
            }
        }

        adm3_layer.addTo(Lmap);
        showallchart3();
    }
}
function zoom_based_layerchange() {

    $("#zoomlevel").html(Lmap.getZoom());
    var currentZoom = Lmap.getZoom();
    // console.log(currentZoom);

    if (currentZoom < 8) {
        // clicked_district = "";
        // clicked_commune = "";

        // clean_map();
        reset_adm1();
        // adm1_layer.addTo(Lmap);
        // $("#layername").html("Coors Field");
    }
    if (currentZoom >= 8 && currentZoom < 11) {
        // clicked_commune = "";
        // clean_map();
        // adm2_layer.addTo(Lmap);
        reset_adm2();
    }
    if (currentZoom >= 11) {
        // clean_map();
        // adm3_layer.addTo(Lmap);
        reset_adm3();
    }
    // if (clicked_province == '' && clicked_district == '' && clicked_commune == '') {
    //     reset_adm1();
    //     // vn_loader.show();
    // }
    // if (clicked_province != '' && clicked_district == '' && clicked_commune == '') {
    //     reset_adm2();
    //     console.log('clicked_province', clicked_province);
    //     // province_loader.show(clicked_province);
    // }
    // if (clicked_province != '' && clicked_district != '' && clicked_commune == '') {
    //     reset_adm3();
    //     console.log('clicked_district', clicked_province, clicked_district);
    //     // district_loader.show(clicked_province, clicked_district);
    // }
    // if (clicked_province != '' && clicked_district != '' && clicked_commune != '') {
    //     // do nothing
    // }
}
function update_layers() {
    document.getElementById("info legend").innerHTML = legends_labels.join('');
    if (color1) {
        document.getElementById("info legend").innerHTML = legends1_labels.join('');
    }
    if (main_type_ == "geoai") {
        document.getElementById("info legend").innerHTML = legends_ai_labels.join('');
    }
    $("#zoomlevel").html(Lmap.getZoom());
    var currentZoom = Lmap.getZoom();
    // console.log(currentZoom);

    if (currentZoom < 8) {
        if (allloaded) {
            clean_map();
            adm1_layer = L.geoJson(mydata1, {
                style: style,
                onEachFeature: onEachFeature1
            }).addTo(Lmap);
        }
    }
    if (currentZoom >= 8 && currentZoom < 11) {
        if (allloaded) {
            if (clicked_province === "") {
                clean_map();
                adm2_layer = L.geoJson(mydata2, {
                    style: style,
                    filter: provinceFilter,
                    onEachFeature: onEachFeature2
                });
                adm2_layer.addTo(Lmap);
            } else if (clicked_province) {
                clean_map();
                adm2_layer = L.geoJson(mydata2, {
                    style: style,
                    filter: provinceFilter,
                    onEachFeature: onEachFeature2
                });
                adm2_layer.addTo(Lmap);
            }
        }
    }
    if (currentZoom >= 11) {
        if (allloaded) {
            if (clicked_province === "") {
                clean_map();
                adm3_layer = L.geoJson(mydata3, {
                    style: style,
                    filter: districtFilter,
                    onEachFeature: onEachFeature3
                });
                adm3_layer.addTo(Lmap);
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
        }
    }
}
function style(feature) {
    var tmp_color = main_type_ == "geoai" ? getColorAI(getRateAI(feature)) : getColor(getRate(feature));
    return {
        weight: 1,
        opacity: 1,
        color: LightenDarkenColor(tmp_color, -20),
        dashArray: '3',
        fillOpacity: 1.0,
        fillColor: tmp_color
    };
}
function getColorAI(d) {
    if (("" + d) === "undefined") { d = 0.0; }
    // return d > 90 ? '#DA4711' :
    //     d > 70 ? '#F28E12' :
    //         d > 50 ? '#F1BA15' :
    //             d > 3 ? '#0FA57F' :
    //                 '#0FA57F';
    return d > 1097.14 ? '#6e016b' :
        d > 914.29 ? '#88419d' :
            d > 731.43 ? '#8c6bb1' :
                d > 548.57 ? '#8c96c6' :
                    d > 365.71 ? '#9ebcda' :
                        d > 182.86 ? '#bfd3e6' :
                            d > 0.0 ? '#e0ecf4' :
                                '#fff';
}
function getColor(d) {
    if (("" + d) === "undefined") { d = 0.0; }
    if (color1) return getColor1(d);
    // if (index_of_rate > 30) {
    //     d = d * 50;
    // }
    // return d > 90 ? '#DA4711' :
    //     d > 70 ? '#F28E12' :
    //         d > 50 ? '#F1BA15' :
    //             d > 3 ? '#0FA57F' :
    //                 '#0FA57F';
    return d > 1097.14 ? '#99000d' :
        d > 914.29 ? '#cb181d' :
            d > 731.43 ? '#ef3b2c' :
                d > 548.57 ? '#fb6a4a' :
                    d > 365.71 ? '#fc9272' :
                        d > 182.86 ? '#fcbba1' :
                            d > 0.0 ? '#fee5d9' :
                                '#fff';
    // [182.86, '#fee5d9'],
    // [365.71, '#fcbba1'],
    // [548.57, '#fc9272'],
    // [731.43, '#fb6a4a'],
    // [914.29, '#ef3b2c'],
    // [1097.14, '#cb181d'],
    // [1280.00, '#99000d']
}

function getColor1(d) {
    if (("" + d) === "undefined") { d = 0.0; }
    // if (index_of_rate > 30) {
    //     d = d * 50;
    // }
    // return d > 90 ? '#DA4711' :
    //     d > 70 ? '#F28E12' :
    //         d > 50 ? '#F1BA15' :
    //             d > 3 ? '#0FA57F' :
    //                 '#0FA57F';
    return d > 180 ? '#99000d' :
        d > 150 ? '#cb181d' :
            d > 120 ? '#ef3b2c' :
                d > 90 ? '#fb6a4a' :
                    d > 60 ? '#fc9272' :
                        d > 30 ? '#fcbba1' :
                            d > 0.0 ? '#fee5d9' :
                                '#fff';
    // [182.86, '#fee5d9'],
    // [365.71, '#fcbba1'],
    // [548.57, '#fc9272'],
    // [731.43, '#fb6a4a'],
    // [914.29, '#ef3b2c'],
    // [1097.14, '#cb181d'],
    // [1280.00, '#99000d']
}


function getRateAI(feature) {
    if (allloaded) {
        var _d1 = adm1_time;
        var _d2 = adm2_time;
        var _d3 = adm3_time;
        var _c1 = adm1_pcm;
        var _c2 = adm2_pcm;
        var _c3 = adm3_pcm;
        var sc = _d1.get("" + id_.get(feature.properties.name));
        var cm0 = _c1.get("" + id_.get(feature.properties.name) + "_0");
        var cm1 = _c1.get("" + id_.get(feature.properties.name) + "_1");
        var cm2 = _c1.get("" + id_.get(feature.properties.name) + "_2");
        var cm3 = _c1.get("" + id_.get(feature.properties.name) + "_3");
        var cm4 = _c1.get("" + id_.get(feature.properties.name) + "_4");

        var p = pops["" + id_.get(feature.properties.name)];

        if (feature.properties.name1 && feature.properties.name2) {
            sc = _d3.get("" + id_.get(feature.properties.name1 + feature.properties.name2 + feature.properties.name));
            cm0 = _c3.get("" + id_.get(feature.properties.name1 + feature.properties.name2 + feature.properties.name) + "_0");
            cm1 = _c3.get("" + id_.get(feature.properties.name1 + feature.properties.name2 + feature.properties.name) + "_1");
            cm2 = _c3.get("" + id_.get(feature.properties.name1 + feature.properties.name2 + feature.properties.name) + "_2");
            cm3 = _c3.get("" + id_.get(feature.properties.name1 + feature.properties.name2 + feature.properties.name) + "_3");
            cm4 = _c3.get("" + id_.get(feature.properties.name1 + feature.properties.name2 + feature.properties.name) + "_4");

        } else if (feature.properties.name1) {
            sc = _d2.get("" + id_.get(feature.properties.name1 + feature.properties.name));
            cm0 = _c2.get("" + id_.get(feature.properties.name1 + feature.properties.name) + "_0");
            cm1 = _c2.get("" + id_.get(feature.properties.name1 + feature.properties.name) + "_1");
            cm2 = _c2.get("" + id_.get(feature.properties.name1 + feature.properties.name) + "_2");
            cm3 = _c2.get("" + id_.get(feature.properties.name1 + feature.properties.name) + "_3");
            cm4 = _c2.get("" + id_.get(feature.properties.name1 + feature.properties.name) + "_4");

            p = pops["" + id_.get(feature.properties.name1 + feature.properties.name)];
        }
        // if (type_of_rate == 1) {
        //     var tmp = [];
        //     tmp.push(adm1_sexage.get("" + id_.get(selected_adm1) + "_" + j).slice(slider_idx1, slider_idx2 * 1 + 1));
        //     tmp = tmp.reduce((r, a) => a.map((b, i) => (r[i] || 0) + b), []);

        // } else {
        if (sc == undefined) {
            // console.log(feature.properties.name);
            return feature.properties.score;
        } else {
            if (p) {
                return (sc.slice(slider_idx1, slider_idx2 * 1 + 1).map(function (x, index) {
                    return x * 100000 / p[index] * (cm0[index] * param[0] + cm1[index] * param[1] + cm2[index] * param[2] + cm3[index] * param[3] + cm4[index] * param[4]) / 10000;
                }).reduce((a, b) => a + b, 0)).toFixed(2);
            }
            return sc.slice(slider_idx1, slider_idx2 * 1 + 1).reduce((a, b) => a + b, 0);
        }
        // }
    } else {
        return 0;//feature.properties.score;
    }
}
var type_of_rate = 0;
var index_of_rate = 0;
function getRate(feature) {
    if (allloaded) {
        var _d1 = adm1_time;
        var _d2 = adm2_time;
        var _d3 = adm3_time;
        if (type_of_rate == 1) {
            _d1 = adm1_sexage;
            _d2 = adm2_sexage;
            _d3 = adm3_sexage;
        }
        var sc = _d1.get("" + id_.get(feature.properties.name));

        if (type_of_rate == 1) {
            sc = _d1.get("" + id_.get(feature.properties.name) + "_" + index_of_rate);
        }
        var p = pops["" + id_.get(feature.properties.name)];

        if (feature.properties.name1 && feature.properties.name2) {
            sc = _d3.get("" + id_.get(feature.properties.name1 + feature.properties.name2 + feature.properties.name));

            if (type_of_rate == 1) {
                sc = _d3.get("" + id_.get(feature.properties.name1 + feature.properties.name2 + feature.properties.name) + "_" + index_of_rate);
            }
        } else if (feature.properties.name1) {
            sc = _d2.get("" + id_.get(feature.properties.name1 + feature.properties.name));

            if (type_of_rate == 1) {
                sc = _d2.get("" + id_.get(feature.properties.name1 + feature.properties.name) + "_" + index_of_rate);
            }
            p = pops["" + id_.get(feature.properties.name1 + feature.properties.name)];
        }
        // if (type_of_rate == 1) {
        //     var tmp = [];
        //     tmp.push(adm1_sexage.get("" + id_.get(selected_adm1) + "_" + j).slice(slider_idx1, slider_idx2 * 1 + 1));
        //     tmp = tmp.reduce((r, a) => a.map((b, i) => (r[i] || 0) + b), []);

        // } else {
        if (sc == undefined) {
            // console.log(feature.properties.name);
            return feature.properties.score;
        } else {
            if (p) {
                return (sc.map(function (x, index) {
                    return x * 100000 / p[index];
                }).slice(slider_idx1, slider_idx2 * 1 + 1).reduce((a, b) => a * 1 + b, 0)).toFixed(2);
            }
            return sc.slice(slider_idx1, slider_idx2 * 1 + 1).reduce((a, b) => a * 1 + b, 0);
        }
        // }
    } else {
        return 0;//feature.properties.score;
    }
}
function getScore(feature) {
    if (allloaded) {
        var sc = adm1_time.get("" + id_.get(feature.properties.name));
        if (feature.properties.name1 && feature.properties.name2) {
            sc = adm3_time.get("" + id_.get(feature.properties.name1 + feature.properties.name2 + feature.properties.name));
        } else if (feature.properties.name1) {
            sc = adm2_time.get("" + id_.get(feature.properties.name1 + feature.properties.name));
        }
        if (sc == undefined) {
            // console.log(feature.properties.name);
            return feature.properties.score;
        } else {
            return sc.slice(slider_idx1, slider_idx2 * 1 + 1).reduce((a, b) => a * 1 + b, 0);
        }
    } else {
        return feature.properties.score;
    }
}

// var popup;
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 3,
        color: 'white',
        dashArray: '3',
        fillOpacity: 1.0
    });
    strpop = "";
    if (layer.feature && layer.feature.properties) {
        var sc = 0;
        sc = getScore(layer.feature);
        strpop = '' + (layer.feature.properties ?
            '<b>' + layer.feature.properties.name + '</b>' +
            (layer.feature.properties.name2 ? (", <b>" + layer.feature.properties.name2 + "</b>") : "") +
            (layer.feature.properties.name1 ? (", <b>" + layer.feature.properties.name1 + "</b>") : "") +
            '<br />Số ca: ' + sc + '.' + (layer.feature.properties.name2 ? '' : '<br />Tỉ lệ: ' + getRate(layer.feature) + '.') :
            '');
    }
    // popup = L.popup()
    //     .setLatLng([16.0376435, 107.5341797]) //(assuming e.latlng returns the coordinates of the event)
    //     .setContent(strpop)
    //     .openOn(Lmap);
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    info.update(strpop);
}

function resetHighlight(e) {
    // if (adm1_layer) {
    //     adm1_layer.resetStyle(e.target);
    // }
    // if (adm2_layer) {
    //     adm2_layer.resetStyle(e.target);
    // }
    // if (adm3_layer) {
    //     adm3_layer.resetStyle(e.target);
    // }

    adm1_layer.resetStyle(e.target);
    adm2_layer.resetStyle(e.target);
    adm3_layer.resetStyle(e.target);
    // popup.removeFrom(Lmap)

    info.update('');
}

function zoomToFeature(e) {
    Lmap.fitBounds(e.target.getBounds());
}

function showallchart() {
    if (stats1loaded) {
        showchart_alltime();
        showchart();
        showchart_rate();
        showchart_mdr();
        showchart_mdrraw();
        showchart_sexage();
        showHIVchart();
        showTreatchart();
        if (loaded_pcm) {
            showchart_sim();
            showchart_simexpert();
        }
        showtable();
    }
}


function showallchart1() {
    if (allloaded && clicked_province) {
        showchart_alltime1(clicked_province);
        showchart1(clicked_province);
        showchart_rate1(clicked_province);
        showchart_mdr1(clicked_province);
        showchart_mdrraw1(clicked_province);
        showchart_sexage1(clicked_province);
        showHIVchart1(clicked_province);
        showTreatchart1(clicked_province);

        if (loaded_pcm) {
            showchart_sim1(clicked_province);
            showchart_simexpert1(clicked_province);
        }
        showtable1(clicked_province);
    }
}

function showallchart2() {
    if (allloaded && clicked_province && clicked_district) {
        showchart_alltime2(clicked_province, clicked_district);
        showchart2(clicked_province, clicked_district);
        showchart_rate2(clicked_province, clicked_district);
        showchart_mdr2(clicked_province, clicked_district);
        showchart_sexage2(clicked_province, clicked_district);
        showHIVchart2(clicked_province, clicked_district);
        showTreatchart2(clicked_province, clicked_district);

        if (loaded_pcm) {
            showchart_sim2(clicked_province, clicked_district);
            showchart_simexpert2(clicked_province, clicked_district);
        }
        showtable2(clicked_province, clicked_district);
    }
}

function showallchart3() {
    if (allloaded && clicked_province && clicked_district && clicked_commune) {
        showchart3(clicked_province, clicked_district, clicked_commune);
        // showchart_rate3(clicked_province, clicked_district, clicked_commune);
        showchart_mdr3(clicked_province, clicked_district, clicked_commune);
        showchart_sexage3(clicked_province, clicked_district, clicked_commune);
        showHIVchart3(clicked_province, clicked_district, clicked_commune);
        showTreatchart3(clicked_province, clicked_district, clicked_commune);
        showtable2(clicked_province, clicked_district);
    }
}
function onEachFeature1(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });

    layer.on('click', function (e) {
        province = e.target.feature.properties.name;
        clicked_province = province;
        showallchart1();

        // province_loader.show(province);
    });
}

function onEachFeature2(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
    layer.on('click', function (e) {
        clicked_province = e.target.feature.properties.name1;
        clicked_district = e.target.feature.properties.name;

        province = e.target.feature.properties.name1;
        district = e.target.feature.properties.name;

        showallchart2();
        // district_loader.show(province, district);
    });
}

function onEachFeature3(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });

    //layer._leaflet_id = feature.id;  
    layer.on('click', function (e) {

        commune = e.target.feature.properties.name;
        province = e.target.feature.properties.name1;
        district = e.target.feature.properties.name2;
        clicked_province = province;
        clicked_district = district;
        clicked_commune = commune;
        showallchart3();
        // fit_zoom_to3(province, district, commune);
    });
}


// Lmap.attributionControl.addAttribution('Data &copy; <a href="https://itrithuc.vn/">iTriThuc</a>');
// document.getElementById("thelist").innerHTML = `
// <table id='customers' style="width: 680">
//     <tr><th>
//         Thống kê theo tháng
//         <a data-toggle="collapse" href="#divF0daily"
//             aria-expanded="true" aria-controls="divF0daily">
//             <i style="float: right;"class="fas fa-angle-up rotate-icon">&nbsp;</i>
//         </a>
//     </th></tr>
// </table><div id="divF0daily" style="width: 680;border-style: outset;" class="collapse show">
//     <canvas id="F0dailyChart" width="680" height="400"></canvas>
// </div>
// `;