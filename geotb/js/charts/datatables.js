// Call the dataTables jQuery plugin
// $(document).ready(function () {
//   $('#dataTable').DataTable();
// });
// Simple-DataTables
// https://github.com/fiduswriter/Simple-DataTables/wiki

var myTable = null;
function showtable() {
  var tbl = `
  <table id="datatablesSimple">
      <thead>
          <tr>
              <th>Địa phương</th>
              <th>Số ca</th>  
              <th>Dân số</th>  
              <th>Tỉ lệ</th>  
          </tr>
      </thead>
      <tfoot>
          <tr>
              <th>Địa phương</th>
              <th>Số ca</th>   
              <th>Dân số</th>  
              <th>Tỉ lệ</th>  
          </tr>
      </tfoot>
      <tbody>`;

  var total = 0;
  var map = mapVN["VN"];
  // console.log(headers);
  for (var i = 0; i < map.length; i++) {
    var item = map[i];
    var p = pops["" + id_.get(item)];
    // console.log((adm1_time.get("" + id_.get(item))).slice(slider_idx1,slider_idx2*1+1));
    var tmp_tot = (adm1_time.get("" + id_.get(item))).slice(slider_idx1,slider_idx2 * 1 + 1).reduce((a, b) => a * 1 + b, 0);
    var tmp_rate = (adm1_time.get("" + id_.get(item))).map(function (x, index) {
      return x * 100000 / p[index];
    }).slice(slider_idx1,slider_idx2 * 1 + 1).reduce((a, b) => a * 1 + b, 0);
    total += tmp_tot;
    tbl = tbl + `<tr>
      <td><a href="javascript:void(0)" onclick="fit_zoom_to1('`+ item + `')">` + item + `</a></td> 
      <td>`+ tmp_tot + `</td>  
      <td>`+ p[slider_idx2]  + `</td>  
      <td>`+ tmp_rate.toFixed(2) + `</td>  
  </tr> `;
  }
  tbl = tbl + `
      </tbody>
  </table>`;
  if (myTable != null) {
    myTable.destroy();
  }
  document.getElementById('thetable').innerHTML = tbl;
  const datatablesSimple = document.getElementById('datatablesSimple');
  if (datatablesSimple) {
    myTable = new simpleDatatables.DataTable(datatablesSimple);
    myTable.columns().sort(3, "desc");
    document.getElementById('tblname').textContent = "của Việt Nam: " + total;
    // console.log(slider_idx2);
    // console.log(p[slider_idx2]);
    // console.log(pops["VN"][slider_idx2]);

    document.getElementById('tblpop').textContent = "Dân số: " + pops["VN"][slider_idx2]+". Tỉ lệ: "+(total*100000/pops["VN"][slider_idx2]).toFixed(2);
  }
}

function showtable1(selected_adm1) {
  var tbl = `
  <table id="datatablesSimple">
      <thead>
          <tr>
              <th>Địa phương</th>
              <th>Số ca</th> 
              <th>Dân số</th>  
              <th>Tỉ lệ</th>  
          </tr>
      </thead>
      <tfoot>
          <tr>
              <th>Địa phương</th>
              <th>Số ca</th>  
              <th>Dân số</th>  
              <th>Tỉ lệ</th>  
          </tr>
      </tfoot>
      <tbody>`;


  var total = 0;

  
  var map = mapVN[selected_adm1];
  for (var i = 0; i < map.length; i++) {
    var item = map[i];
    var p = pops["" + id_.get(selected_adm1+item)];
    // console.log(selected_adm1 + item);
    // console.log(adm2_time );
    var tmp_tot = (adm2_time.get("" + id_.get(selected_adm1 + item))).slice(slider_idx1,slider_idx2 * 1 + 1).reduce((a, b) => a + b, 0);
    var tmp_rate = (adm2_time.get("" + id_.get(selected_adm1 + item))).map(function (x, index) {
      return x * 100000 / p[index];
    }).slice(slider_idx1,slider_idx2 * 1 + 1).reduce((a, b) => a * 1 + b, 0);
    total += tmp_tot;
    tbl = tbl + `<tr>
      <td><a href="javascript:void(0)" onclick="fit_zoom_to2('`+ selected_adm1 + `','` + item + `')">` + item + `</a></td> 
      <td>`+ tmp_tot + `</td> 
      <td>`+ p[slider_idx2]  + `</td>  
      <td>`+ tmp_rate.toFixed(2) + `</td>  
  </tr> `;
  }
  tbl = tbl + `
      </tbody>
  </table>`;
  if (myTable != null) {
    myTable.destroy();
  }
  document.getElementById('thetable').innerHTML = tbl;
  const datatablesSimple = document.getElementById('datatablesSimple');
  if (datatablesSimple) {
    myTable = new simpleDatatables.DataTable(datatablesSimple);
    myTable.columns().sort(3, "desc");
    document.getElementById('tblname').innerHTML = "của " + selected_adm1 + `, <a href="javascript:void(0)" onclick="fit_zoom_to_VN()">Việt Nam</a>: ` + total;
    // console.log(p[slider_idx2]);
    document.getElementById('tblpop').textContent = "Dân số: " + pops["" + id_.get(selected_adm1)][slider_idx2];
  }
}


function showtable2(selected_adm1, selected_adm2) {
  var tbl = `
  <table id="datatablesSimple">
      <thead>
          <tr>
              <th>Địa phương</th>
              <th>Số ca</th>  
          </tr>
      </thead>
      <tfoot>
          <tr>
              <th>Địa phương</th>
              <th>Số ca</th>   
          </tr>
      </tfoot>
      <tbody>`;

  var total = 0;
  var p = pops["" + id_.get(selected_adm1 + selected_adm2)];
  // var yy = current_idx_Date.getFullYear() - 2016;
  var map = mapVN[selected_adm1 + selected_adm2];
  // var str="";
  for (var i = 0; i < map.length; i++) {
    var item = map[i];
    var tmp_tot = (adm3_time.get("" + id_.get(selected_adm1 + selected_adm2 + item))).slice(slider_idx1,slider_idx2 * 1 + 1).reduce((a, b) => a + b, 0);
    // var tmp_rate = (adm3_time.get("" + id_.get(selected_adm1 + selected_adm2 + item))).slice(slider_idx1,slider_idx2 * 1 + 1).map(function (x, index) {
    //   return x * 100000 / p[index];
    // }).reduce((a, b) => a * 1 + b, 0);
    // str+=(item+","+ adm3_time.get(""+id_.get(selected_adm1 + selected_adm2 + item)))+"\n";
    total += tmp_tot;
    tbl = tbl + `<tr>
      <td><a href="javascript:void(0)" onclick="fit_zoom_to3('`+ selected_adm1 + `','` + selected_adm2 + `','` + item + `')">` + item + `</a></td> 
      <td>`+ tmp_tot + `</td>  
  </tr> `;
  }
  // console.log(str);
  tbl = tbl + `
      </tbody>
  </table>`;
  if (myTable != null) {
    myTable.destroy();
  }
  document.getElementById('thetable').innerHTML = tbl;
  const datatablesSimple = document.getElementById('datatablesSimple');
  if (datatablesSimple) {
    myTable = new simpleDatatables.DataTable(datatablesSimple
      // , {      perPage: 4    }
    );
    myTable.columns().sort(1, "desc");
    document.getElementById('tblname').innerHTML = `của <a href="javascript:void(0)" onclick="fit_zoom_to2('` + selected_adm1 + `','` + selected_adm2 + `')">` + selected_adm2 + `</a>, <a href="javascript:void(0)" onclick="fit_zoom_to1('` + selected_adm1 + `')">` + selected_adm1 + `</a>: ` + total;
    // console.log(p[slider_idx2]);

    document.getElementById('tblpop').textContent = "Dân số: " + p[slider_idx2];
  }
}