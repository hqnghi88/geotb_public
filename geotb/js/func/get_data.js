
var mydata1;
var mydata2;
var mydata3;
var adm1_time = new Map();
var adm2_time = new Map();
var adm3_time = new Map();
var adm1_sexage = new Map();
var adm2_sexage = new Map();
var adm3_sexage = new Map();
var adm1_pcm = new Map();
var adm2_pcm = new Map();
var adm3_pcm = new Map();
var headers = [];
var headers_sim = [];
var promisespcm = [];
var promisestinh = [];
var promiseshuyen = [];
var promisesxa = [];
var promisesStats = [];

var timedata1_path = main_type_ == "geoai" ? 'geotb_gama/js/gentime/gentimeAdm1' : 'geotb_gama/js/time/timeAdm1';
var timedata2_path = main_type_ == "geoai" ? 'geotb_gama/js/gentime/gentimeAdm2' : 'geotb_gama/js/time/timeAdm2';
var timedata3_path = main_type_ == "geoai" ? 'geotb_gama/js/gentime/gentimeAdm3' : 'geotb_gama/js/time/timeAdm3';
function loadScript(url) {
	// return new Promise(function  
	res = $.ajax({
		type: "GET",
		url: url,
		success: function () {
		},
		dataType: "script",
		cache: true
	});
	return res.promise();
}
// var startDate = new Date("01-01-2020");
// function filterBy(idx) {
// 	// const filters2 = ['>=', 'month', month - 2];
// 	// const filters1 = ['<=', 'month', month];
// 	// var d1 = new Date(startDate);
// 	// d1.setDate(d1.getDate() + idx - 0);
// 	// var d2 = new Date(startDate);
// 	// d2.setDate(d2.getDate() + idx);
// 	// // console.log(d1.getTime());
// 	// // console.log(d2.getTime());
// 	// const filters = [
// 	// 	"all", // [">=", 'time', d1.getTime()],
// 	// 	["<=", 'time', d2.getTime()]
// 	// ];
// 	// Lmap.setFilter('earthquake-circles', filters);
// 	// map.setFilter('earthquake-labels', filters);

// 	// Set the label to the month
// 	if (document.getElementById('month')) {

// 		document.getElementById('month').textContent = headers[idx];//d2.toLocaleDateString('vi-VN'); //months[month];
// 	}
// }

function loadCSV1(url) {
	// return new Promise(function  
	res = $.ajax({
		type: "GET",
		url: url,
		dataType: "text",
		cache: true,
		success: function (data) { processData(data); }// dd = $.csv.toArrays(data); console.log(dd); 
	});
	return res.promise();
}
function loadCSV2(url) {
	// return new Promise(function  
	res = $.ajax({
		type: "GET",
		url: url,
		dataType: "text",
		cache: true,
		success: function (data) { processData2(data); }// dd = $.csv.toArrays(data); console.log(dd); 
	});
	return res.promise();
}
function loadCSV3(url) {
	// return new Promise(function  
	res = $.ajax({
		type: "GET",
		url: url,
		dataType: "text",
		cache: true,
		success: function (data) { processData3(data); }// dd = $.csv.toArrays(data); console.log(dd); 
	});
	return res.promise();
}

function loadCSV_sexage1(url) {
	// return new Promise(function  
	res = $.ajax({
		type: "GET",
		url: url,
		dataType: "text",
		cache: true,
		success: function (data) { processDataSexage1(data); }// dd = $.csv.toArrays(data); console.log(dd); 
	});
	return res.promise();
}

function loadCSV_sexage2(url) {
	// return new Promise(function  
	res = $.ajax({
		type: "GET",
		url: url,
		dataType: "text",
		cache: true,
		success: function (data) { processDataSexage2(data); }// dd = $.csv.toArrays(data); console.log(dd); 
	});
	return res.promise();
}

function loadCSV_sexage3(url) {
	// return new Promise(function  
	res = $.ajax({
		type: "GET",
		url: url,
		dataType: "text",
		cache: true,
		success: function (data) { processDataSexage3(data); }// dd = $.csv.toArrays(data); console.log(dd); 
	});
	return res.promise();
}
function processDataSexage1(allText) {
	var allTextLines = allText.split(/\r\n|\n/);
	for (var i = 1; i < allTextLines.length; i++) {
		var data = allTextLines[i].split(',');
		var aname = data[0];
		data.shift();
		var ttt = data.map(d => { return parseInt(d) });
		adm1_sexage.set(aname, ttt);
	}
}
function processDataSexage2(allText) {
	var allTextLines = allText.split(/\r\n|\n/);
	for (var i = 1; i < allTextLines.length; i++) {
		var data = allTextLines[i].split(',');
		var aname = data[0];
		data.shift();
		var ttt = data.map(d => { return parseInt(d) });
		adm2_sexage.set(aname, ttt);
	}
}
function processDataSexage3(allText) {
	var allTextLines = allText.split(/\r\n|\n/);
	for (var i = 1; i < allTextLines.length; i++) {
		var data = allTextLines[i].split(',');
		var aname = data[0];
		data.shift();
		var ttt = data.map(d => { return parseInt(d) });
		adm3_sexage.set(aname, ttt);
	}
}

function loadCSV_pcm1(url) {
	// return new Promise(function  
	res = $.ajax({
		type: "GET",
		url: url,
		dataType: "text",
		cache: true,
		success: function (data) { processDataPcm1(data); }// dd = $.csv.toArrays(data); console.log(dd); 
	});
	return res.promise();
}

function loadCSV_pcm2(url) {
	// return new Promise(function  
	res = $.ajax({
		type: "GET",
		url: url,
		dataType: "text",
		cache: true,
		success: function (data) { processDataPcm2(data); }// dd = $.csv.toArrays(data); console.log(dd); 
	});
	return res.promise();
}

function loadCSV_pcm3(url) {
	// return new Promise(function  
	res = $.ajax({
		type: "GET",
		url: url,
		dataType: "text",
		cache: true,
		success: function (data) { processDataPcm3(data); }// dd = $.csv.toArrays(data); console.log(dd); 
	});
	return res.promise();
}
function processDataPcm1(allText) {
	var allTextLines = allText.split(/\r\n|\n/);
	var tmp = allTextLines[0].split(',');
	headers_sim=[];
	tmp.shift();
	headers_sim = headers_sim.concat(tmp);
	for (var i = 1; i < allTextLines.length; i++) {
		var data = allTextLines[i].split(',');
		var aname = data[0];
		data.shift();
		var ttt = data.map(d => { return parseInt(d) });
		adm1_pcm.set(aname, ttt);
	}
}
function processDataPcm2(allText) {
	var allTextLines = allText.split(/\r\n|\n/);
	for (var i = 1; i < allTextLines.length; i++) {
		var data = allTextLines[i].split(',');
		var aname = data[0];
		data.shift();
		var ttt = data.map(d => { return parseInt(d) });
		adm2_pcm.set(aname, ttt);
	}
}
function processDataPcm3(allText) {
	var allTextLines = allText.split(/\r\n|\n/);
	for (var i = 1; i < allTextLines.length; i++) {
		var data = allTextLines[i].split(',');
		var aname = data[0];
		data.shift();
		var ttt = data.map(d => { return parseInt(d) });
		adm3_pcm.set(aname, ttt);
	}
}
function processData(allText) {
	var allTextLines = allText.split(/\r\n|\n/);
	// if(!headers) {
	var tmp = allTextLines[0].split(',');
	tmp.shift();
	headers = headers.concat(tmp);
	// console.log(headers);

	for (var i = 1; i < allTextLines.length; i++) {
		var data = allTextLines[i].split(',');
		var aname = data[0];
		data.shift();
		var tmp = adm1_time.get(aname);
		var ttt = data.map(d => { return parseInt(d) });
		if (tmp) {
			tmp = tmp.concat(ttt);
		} else {
			tmp = ttt;
		}
		adm1_time.set(aname, tmp);
	}
}

function processData2(allText) {
	var allTextLines = allText.split(/\r\n|\n/);

	for (var i = 1; i < allTextLines.length; i++) {
		var data = allTextLines[i].split(',');
		// if (data.length == headers.length) { 
		var aname = data[0];
		// console.log(aname);
		data.shift();
		var tmp = adm2_time.get(aname);
		var ttt = data.map(d => { return parseInt(d) });
		if (tmp) {
			tmp = tmp.concat(ttt);
		} else {
			tmp = ttt;
		}
		adm2_time.set(aname, tmp);
	}
}

function processData3(allText) {
	var allTextLines = allText.split(/\r\n|\n/);

	for (var i = 1; i < allTextLines.length; i++) {
		var data = allTextLines[i].split(',');
		// if (data.length == headers.length) { 
		var aname = data[0];
		// console.log(aname);
		data.shift();
		var tmp = adm3_time.get(aname);
		var ttt = data.map(d => { return parseInt(d) });
		if (tmp) {
			tmp = tmp.concat(ttt);
		} else {
			tmp = ttt;
		}
		adm3_time.set(aname, tmp);
	}
}

//Then this returns a promise that will resolve when ALL are so.
// for (let i = 0; i < 20; i++) {
// 	url = 'geotb_gama/js/timeAdm1' + i + '.csv';
// 	promisesStats.push(loadCSV1(url));
// }

var loaded_adm = new Map();
// for (let i = 0; i < 20; i++) {
// 	url = 'geotb_gama/js/timeAdm2' + i + '.csv';
// 	promisesStats.push(loadCSV2(url));
// }
// for (let i = 0; i < 63; i++) {
// 	if (i < 21) {
// 	}
// }
// basket
// 	.require({ url: 'geotb_gama/js/adm_region1.js' })
// 	.then(function () {
// 		btnTinh.addTo(Lmap);
// 		mydata1 = mydata1_;
// 		loaded_adm.set('adm_region1.js', true); 
// 		console.log("'geotb_gama/js/adm_region1.js'");
// 	}, function (error) {
// 		// There was an error fetching the script
// 		console.log(error);
// 	});
// for (let i = 0; i < 63; i++) {

// 	// url = 'geotb_gama/js/region/adm_region1' + i + '.js';
// 	// promisestinh.push(loadScript(url));
// 	if (i < 21) {
// 		url = timedata1_path + i + '.csv';
// 		promisesStats.push(loadCSV1(url));
// 	}
// }
promisestinh.push(loadCSV1('geotb_gama/js/time/timeAdm1.csv'));
for (let i = 1; i < 8; i++) {
	url = 'geotb_gama/js/sexageAdm1' + i + '0.csv';
	promisestinh.push(loadCSV_sexage1(url));
}

url = 'geotb_gama/js/adm_region1.js';
promisestinh.push(loadScript(url));

promisesStats.push(loadCSV2('geotb_gama/js/time/timeAdm2.csv'));
promisesStats.push(loadCSV3('geotb_gama/js/time/timeAdm3.csv'));
// promisesStats.push(loadCSV_sexage1('geotb_gama/js/sexageAdm1.csv'));
// promisesStats.push(loadCSV_sexage2('geotb_gama/js/sexageAdm2.csv'));
// promisesStats.push(loadCSV_sexage3('geotb_gama/js/sexageAdm3.csv'));
for (let i = 1; i < 8; i++) {
	url = 'geotb_gama/js/sexageAdm2' + i + '0.csv';
	promisesStats.push(loadCSV_sexage2(url));
	url = 'geotb_gama/js/sexageAdm3' + i + '0.csv';
	promisesStats.push(loadCSV_sexage3(url));
}

getdata_pcm();
basket.timeout = 1000000000;
promiseshuyen.push(basket
	.require({ url: 'geotb_gama/js/adm_region2.js' })
	.then(function () {
		btnHuyen.addTo(Lmap);
		loaded_adm.set('adm_region2.js', true);
		mydata2 = mydata2_;
		console.log("'geotb_gama/js/adm_region2.js'");
	}, function (error) {
		// There was an error fetching the script
		console.log(error);
	}));
promisesxa.push(basket
	.require({ url: 'geotb_gama/js/adm_region3.js' })
	.then(function () {
		console.log("'geotb_gama/js/adm_region3.js'");
		btnXa.addTo(Lmap);
		loaded_adm.set('adm_region3.js', true);
		mydata3 = mydata3_;
	}, function (error) {
		// There was an error fetching the script
		console.log(error);
	}));
// promiseshuyen.push(loadScript('geotb_gama/js/adm_region2.js'));
// Promise.all(promiseshuyen)
// 	.then(function () {
// 		btnHuyen.addTo(Lmap);
// 		loaded_adm.set('adm_region2.js', true);
// 		mydata2 = mydata2_;
// 	}).catch(function (script) {
// 		console.log(script + ' failed to load');
// 	});

// promisesxa.push(loadScript('geotb_gama/js/adm_region3.js'));
// Promise.all(promisesxa)
// 	.then(function () {
// 		btnXa.addTo(Lmap);
// 		loaded_adm.set('adm_region3.js', true);
// 		mydata3 = mydata3_;
// 	}).catch(function (script) {
// 		console.log(script + ' failed to load');
// 	});

var progressEltinh = document.getElementById('pbtinh');//document.querySelector('progress');
var progressElhuyen = document.getElementById('pbhuyen');//document.querySelector('progress');
var progressElxa = document.getElementById('pbxa');//document.querySelector('progress');

function progressPromise(promises, tickCallback) {
	var len = promises.length;
	var progress = 0;

	function tick(promise) {
		promise.then(function () {
			progress++;
			tickCallback(progress, len);
		});
		return promise;
	}

	return Promise.all(promises.map(tick));
}

function update1(completed, total) {
	progressEltinh.value = Math.round(completed / total * 100);
}
function update2(completed, total) {
	progressElhuyen.value = Math.round(completed / total * 100);
}
function update3(completed, total) {
	progressElxa.value = Math.round(completed / total * 100);
}

var allloaded = false;
var stats1loaded = false;

progressPromise(promisesStats.concat(promisestinh, promiseshuyen, promisesxa), update1).then(function (results) {
	console.log('tinh done!');
	allloaded = true;
	document.getElementById("thelist").innerHTML = "";
});
// progressPromise(promiseshuyen, update2).then(function (results) {
// 	console.log('huyen done!');
// });
// progressPromise(promisesxa, update3).then(function (results) {
// 	console.log('xa done!');
// });


Promise.all(promisestinh)
	.then(function () {
		btnTinh.addTo(Lmap);
		mydata1 = mydata1_;
		allloaded = true;
		stats1loaded = true;
		allloaded = true;
		// build_slider();
		// slider.addTo(Lmap);
		console.log('tinh loaded');
	}).catch(function (script) {
		console.log(script + ' failed to load');
	});

Promise.all(promisesStats)
	.then(function () {
		stats1loaded = true;
		allloaded = true;
		// build_slider();
		// slider.addTo(Lmap);
		slider_idx2 = headers.length - 1;
		// legend.addTo(Lmap);
		zoom_based_layerchange();
		// if (document.getElementById('month')) {
		// 	document.getElementById('month').textContent = headers[slider_idx2];//d2.toLocaleDateString('vi-VN'); //months[month];
		// }
		// showallchart();
		console.log('stats1 loaded');
	}).catch(function (script) {
		console.log(script + ' failed to load');
	});


var load_pcm = false;
var loaded_pcm = false;
function getdata_pcm() {
	load_pcm = true;
	for (let i = 1; i < 8; i++) {
		url = 'geotb_gama/js/pcmAdm1' + i + '0.csv';
		promisespcm.push(loadCSV_pcm1(url));
		url = 'geotb_gama/js/pcmAdm2' + i + '0.csv';
		promisespcm.push(loadCSV_pcm2(url));
		url = 'geotb_gama/js/pcmAdm3' + i + '0.csv';
		promisespcm.push(loadCSV_pcm3(url));
	}
	Promise.all(promisespcm)
		.then(function () {
			loaded_pcm=true;
			slider_idx2 = headers_sim.length - 1;  
			add_select2();
			showchart_sim();
			console.log('loaded_pcm loaded');
		}).catch(function (script) {
			console.log(script + ' failed to load');
		});

}

