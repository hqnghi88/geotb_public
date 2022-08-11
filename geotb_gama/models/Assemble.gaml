/***
* Name: Corona
* Author: hqngh
* Description: 
* Tags: Tag1, Tag2, TagN
***/
model assembles

global {
	string fpath1 <- "../includes/data/GeoSp_VTM_DieuTri_16_20_simple.csv";
	string fpath2 <- "../includes/data/GeoSp_VTM_KhamBenh_16_20_gender_age.csv";
	matrix data1;
	matrix data2;
	map<string, list> data2_;

	init {
		file khambenh_csv <- csv_file(fpath2, ";", true);
		data2 <- ((khambenh_csv.contents));
		loop i from: 0 to: data2.rows - 1 {
			if (i = 0) {
				write data2[5, i]::data2 row_at i;
			}

			data2_ <+ data2[5, i]::data2 row_at i;
		}

		file dieutri_csv <- csv_file(fpath1, ",", true);
		data1 <- ((dieutri_csv.contents));
		loop i from: 0 to: data1.rows - 1 {
			string pid <- "" + data1[1, i];
//					write pid;
			if (data2_[pid] != nil) {
//				if (i = 0) {
//				}

				data1[5, i] <- data2_[pid][6];
				data1[6, i] <- data2_[pid][7];
				data1[7, i] <- data2_[pid][8];
				data1[8, i] <- data2_[pid][9];
				data1[9, i] <- data2_[pid][10];
				data1[10, i] <- data2_[pid][1];
				data1[11, i] <- data2_[pid][2];
				data1[12, i] <- data2_[pid][3];
				data1[13, i] <- data2_[pid][4];
			}

		}

		save data1 to: "../includes/data/assemble.csv" type: text;
	}

}

experiment "Merge data" type: gui autorun: false {
	output {
	}

} 