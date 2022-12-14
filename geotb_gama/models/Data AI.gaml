/***
* Name: Corona
* Author: hqngh
* Description: 
* Tags: Tag1, Tag2, TagN
***/
model Parameters

import "cleaner.gaml"

global {
//	shape_file provinces_shp_file1 <- shape_file("../includes/adm1.shp");
//	shape_file provinces_shp_file2 <- shape_file("../includes/adm2.shp");
//	shape_file provinces_shp_file3 <- shape_file("../includes/adm3.shp");
	shape_file provinces_shp_file1 <- shape_file("../includes/adm1_.shp");
	shape_file provinces_shp_file2 <- shape_file("../includes/adm2_.shp");
	shape_file provinces_shp_file3 <- shape_file("../includes/adm3_.shp");
	//	shape_file provinces_shp_file1 <- shape_file("../includes/adm1Ha Noi.shp");
	//	shape_file provinces_shp_file2 <- shape_file("../includes/adm2Ha Noi.shp");
	//	shape_file provinces_shp_file3 <- shape_file("../includes/adm3Ha Noi.shp");
	geometry shape <- envelope(provinces_shp_file3);
	map<string, int> allid;
	map<string, adm1> alladm1;
	map<string, adm2> alladm2;
	map<string, adm3> alladm3;
	list<rgb> mcolor <- [rgb('#fee5d9'), rgb('#fcbba1'), rgb('#fc9272'), rgb('#fb6a4a'), rgb('#ef3b2c'), rgb('#cb181d'), rgb('#99000d')];

	//                                [20, '#fee5d9'],
	//                                [50, '#fcbba1'],
	//                                [100, '#fc9272'],
	//                                [150, '#fb6a4a'],
	//                                [200, '#ef3b2c'],
	//                                [250, '#cb181d'],
	//                                [300, '#99000d']
	init {
		create adm1 from: provinces_shp_file1 {
			alladm1[NAME_1] <- self;
		}

		create adm2 from: provinces_shp_file2 {
			alladm2[NAME_1 + NAME_2] <- self;
		}

		create adm3 from: provinces_shp_file3 {
			alladm3[NAME_1 + NAME_2 + NAME_3] <- self;
		}

		//				save adm1 crs: 3857 to: "../includes/adm1_.shp" type: "shp" attributes:
		//				["ID"::int(self), "NAME_1"::NAME_1, "GID_1"::GID_1, "NAME_2"::NAME_2, "GID_2"::GID_2, "NAME_3"::NAME_3, "GID_3"::GID_3, "VARNAME_1"::VARNAME_1, "VARNAME_2"::VARNAME_2, "VARNAME_3"::VARNAME_3];
		//				save adm2 crs: 3857 to: "../includes/adm2_.shp" type: "shp" attributes:
		//				["ID"::int(self), "NAME_1"::NAME_1, "GID_1"::GID_1, "NAME_2"::NAME_2, "GID_2"::GID_2, "NAME_3"::NAME_3, "GID_3"::GID_3, "VARNAME_1"::VARNAME_1, "VARNAME_2"::VARNAME_2, "VARNAME_3"::VARNAME_3];
		//				save adm3 crs: 3857 to: "../includes/adm3_.shp" type: "shp" attributes:
		//				["ID"::int(self), "NAME_1"::NAME_1, "GID_1"::GID_1, "NAME_2"::NAME_2, "GID_2"::GID_2, "NAME_3"::NAME_3, "GID_3"::GID_3, "VARNAME_1"::VARNAME_1, "VARNAME_2"::VARNAME_2, "VARNAME_3"::VARNAME_3];
		int iii <- 0;
		string ds <- "var id_ = new Map([";
		ask adm1 {
			ds <- ds + "[\"" + NAME_1 + "\"," + iii + "],";
			allid[NAME_1] <- iii;
			iii <- iii + 1;
		}

		ask adm2 {
			ds <- ds + "[\"" + NAME_1 + NAME_2 + "\"," + iii + "],";
			allid[NAME_1 + NAME_2] <- iii;
			iii <- iii + 1;
		}

		ask adm3 {
			ds <- ds + "[\"" + NAME_1 + NAME_2 + NAME_3 + "\"," + iii + "],";
			allid[NAME_1 + NAME_2 + NAME_3] <- iii;
			iii <- iii + 1;
		}

		ds <- ds + "]);";
		ds <- ds replace ("],]);", "]]);");
		//		save ds to: "../js/allid.js" type: text;
		//		do initpop;
		do initcsv;
		//		do adm_list;
		//		do adm_region;
	}

	action adm_region {
		file ss;
		string sss;
		/////////
		////////save chunks
		////////
		ask adm1 {
			int id1 <- allid[NAME_1];
			save [self] crs: 4326 to: "../js/region/adm_region1" + id1 + ".js" type: "json" attributes:
			["name"::self.NAME_1, "score"::self.risk_point, "time"::("" + self.time), "mag"::self.risk_point];
			ss <- text_file("../js/region/adm_region1" + id1 + ".js");
			sss <- "var mydata1" + id1 + " =" + ss + ";adm1_layer.addData(mydata1" + id1 + ");";
			save sss to: "../js/region/adm_region1" + id1 + ".js";
			//////
		}

		ask adm2 {
			int id2 <- allid[NAME_1 + NAME_2];
			save [self] crs: 4326 to: "../js/region/adm2/adm_region2" + id2 + ".js" type: "json" attributes:
			["name"::self.NAME_2, "name1"::self.NAME_1, "score"::self.risk_point, "time"::("" + self.time), "mag"::self.risk_point];
			ss <- text_file("../js/region/adm2/adm_region2" + id2 + ".js");
			sss <- "var mydata2" + id2 + " =" + ss + ";adm2_layer.addData(mydata2" + id2 + ");";
			save sss to: "../js/region/adm2/adm_region2" + id2 + ".js";
			///////
		}

		ask adm3 {
			int id3 <- allid[NAME_1 + NAME_2 + NAME_3];
			save [self] crs: 4326 to: "../js/region/adm3/adm_region3" + id3 + ".js" type: "json" attributes:
			["name"::self.NAME_3, "name1"::self.NAME_1, "name2"::self.NAME_2, "score"::self.risk_point, "time"::("" + self.time), "mag"::self.risk_point];
			ss <- text_file("../js/region/adm3/adm_region3" + id3 + ".js");
			sss <- "var mydata3" + id3 + " =" + ss + ";adm3_layer.addData(mydata3" + id3 + ");";
			save sss to: "../js/region/adm3/adm_region3" + id3 + ".js";
		}

	}

	action adm_regionfull {
		file ss;
		string sss;
		save adm1 crs: 4326 to: "../js/adm_region1.js" type: "json" attributes: ["name"::self.NAME_1, "score"::self.risk_point, "time"::("" + self.time), "mag"::self.risk_point];
		ss <- text_file("../js/adm_region1.js");
		sss <- "var mydata1_ =" + ss + ";adm1_layer.addData(mydata1_);";
		save sss to: "../js/adm_region1.js";
		/////
		save adm2 crs: 4326 to: "../js/adm_region2.js" type: "json" attributes:
		["name"::self.NAME_2, "name1"::self.NAME_1, "score"::self.risk_point, "time"::("" + self.time), "mag"::self.risk_point];
		ss <- text_file("../js/adm_region2.js");
		sss <- "var mydata2_ =" + ss + ";adm2_layer.addData(mydata2_);";
		save sss to: "../js/adm_region2.js";
		/////
		save adm3 crs: 4326 to: "../js/adm_region3.js" type: "json" attributes:
		["name"::self.NAME_3, "name1"::self.NAME_1, "name2"::self.NAME_2, "score"::self.risk_point, "time"::("" + self.time), "mag"::self.risk_point];
		ss <- text_file("../js/adm_region3.js");
		sss <- "var mydata3_ =" + ss + ";adm3_layer.addData(mydata3_);";
		save sss to: "../js/adm_region3.js";
	}

	action adm_list {
		string all <- "var mapVN = {";
		string vn <- '"VN": [';
		ask adm1 {
			vn <- vn + '"' + NAME_1 + '"';
			string s2 <- '"' + NAME_1 + '": [';
			string s3 <- '';
			ask adm2 where (each.NAME_1 = NAME_1) {
				s3 <- s3 + '"' + NAME_1 + NAME_2 + '": [';
				s2 <- s2 + '"' + NAME_2 + '"';
				ask adm3 where (each.NAME_1 = NAME_1 and each.NAME_2 = NAME_2) {
					s3 <- s3 + '"' + NAME_3 + '"';
				}

				s3 <- s3 + "],";
			}

			s2 <- s2 + '],' + s3;
			s2 <- s2 + "]\n";
			all <- all + s2;
		}

		vn <- vn + "]";
		all <- all + vn + "};";
		all <- all replace ('""', '","') replace ('],]', '],');
		save all to: "../js/adm_list.js" type: text;
	}

	int idx <- 0;
	list<string> lsttime <- [];

	action ssss {
		l1 <- "" + (data1[2, idx]);
		l2 <- "" + (data1[3, idx]);
		l3 <- "" + (data1[4, idx]);
		date tmp <- date(data1[1, idx]);
		int age <- int(data1[6, idx]);
		int gen <- int(data1[7, idx]);
		int hiv_id <- int(data1[8, idx]);
		int treat_id <- int(data1[13, idx]);
		string ttime <- "" + tmp.year + "-" + tmp.month; // + "-" + tmp.day;
		string ttime1 <- "" + tmp.month + "-28-" + tmp.year;
		string tytime <- "" + tmp.year;
		if (!(ttime1 in lsttime)) {
			lsttime <+ ttime1;
			ask adm1 {
				bytime[ttime] <- 0;
			}

			ask adm2 {
				bytime[ttime] <- 0;
			}

			ask adm3 {
				bytime[ttime] <- 0;
			}

		}

		do cleaning;
		adm3 a3 <- alladm3[l1 + l2 + l3];
		adm2 a2 <- alladm2[l1 + l2];
		adm1 a1 <- alladm1[l1];
		if (a3 != nil) {
			a3.risk_point <- a3.risk_point + 1;
			a3.time <- ttime;
			a3.bytime[a3.time] <- a3.bytime[a3.time] + (1.0);
			int sage <- int((age + 5) / 10);
			sage <- sage > 7 ? 7 : sage;
			if (gen < 0) {
				a3.female[sage] <- a3.female[sage] + 1;
			} else {
				a3.male[sage] <- a3.male[sage] + 1;
			}

			a3.hiv[hiv_id] <- a3.hiv[hiv_id] + 1;
			if (data1[13, idx] != "") {
				a3.treatment[treat_id] <- a3.treatment[treat_id] + 1;
			}

		} else {
		//			if (l2 != "" and l3 != "") {
		//				write l1 + l2 + l3;
		//			}

		}

		if (a2 != nil) {
			a2.risk_point <- a2.risk_point + 1;
			a2.time <- ttime;
			a2.bytime[a2.time] <- a2.bytime[a2.time] + 1; //(100000.0 / a2.pop[int(tytime)]);
			int sage <- int((age + 5) / 10);
			sage <- sage > 7 ? 7 : sage;
			if (gen < 0) {
				a2.female[sage] <- a2.female[sage] + 1;
			} else {
				a2.male[sage] <- a2.male[sage] + 1;
			}

			a2.hiv[hiv_id] <- a2.hiv[hiv_id] + 1;
			if (data1[13, idx] != "") {
				a2.treatment[treat_id] <- a2.treatment[treat_id] + 1;
			}

		} else {
			if (l2 != "") {
			//							write l1 + l2;
			}

		}

		if (a1 != nil) {
			a1.risk_point <- a1.risk_point + 1;
			a1.time <- ttime;
			a1.bytime[a1.time] <- a1.bytime[a1.time] + 1; // (100000.0 / a1.pop[int(tytime)]);
			int sage <- int((age + 5) / 10);
			sage <- sage > 7 ? 7 : sage;
			if (gen < 0) {
				a1.female[sage] <- a1.female[sage] + 1;
			} else {
				a1.male[sage] <- a1.male[sage] + 1;
			}

			a1.hiv[hiv_id] <- a1.hiv[hiv_id] + 1;
			if (data1[13, idx] != "") {
				a1.treatment[treat_id] <- a1.treatment[treat_id] + 1;
			}

		} else {
		//			write l1;
		}

		idx <- idx + 1;
	}

	list<int> thres <- [4, 14, 24, 34, 44, 54, 64];

	reflex ssP when: idx < data1.rows {
		if (idx < data1.rows - 1) {
			do ssss;
		} else {
			do generatetimeadm;
			//			do timeAdm;
			//			do adm_regionfull;
			do die;
		}

	}

	int theindex <- 0;

	action generatetimeadm {
		list llllm <- [8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
		list
		lllly <- [2020, 2020, 2020, 2020, 2020, 2021, 2021, 2021, 2021, 2021, 2021, 2021, 2021, 2021, 2021, 2021, 2021, 2022, 2022, 2022, 2022, 2022, 2022, 2022, 2022, 2022, 2022, 2022, 2022];
		if (theindex = 20) {
			loop i from: 20 to: 28 {
				lsttime <+ "" + llllm[i] + "-28-" + lllly[i];
				ask adm1 {
					bytime["" + lllly[i] + "-" + llllm[i]] <- any(bytime);
				}

				ask adm2 {
					bytime["" + lllly[i] + "-" + llllm[i]] <- any(bytime);
				}

				ask adm3 {
					bytime["" + lllly[i] + "-" + llllm[i]] <- any(bytime);
				}

			}

		} else {
			int i <- theindex;
			lsttime <+ "" + llllm[i] + "-28-" + lllly[i];
			ask adm1 {
				bytime["" + lllly[i] + "-" + llllm[i]] <- any(bytime);
			}

			ask adm2 {
				bytime["" + lllly[i] + "-" + llllm[i]] <- any(bytime);
			}

			ask adm3 {
				bytime["" + lllly[i] + "-" + llllm[i]] <- any(bytime);
			}

		}
		//		loop i from: 1 to: 12 {
		//			lsttime <+ "" + i + "-28-2021";
		//			ask adm1{
		//				bytime["2021-" + i]<-any(bytime);
		//			}
		//			ask adm2{
		//				bytime["2021-" + i]<-any(bytime);
		//			}
		//			ask adm3{
		//				bytime["2021-" + i]<-any(bytime);
		//			}
		//		}
		//
		//		loop i from: 1 to: 12 {
		//			lsttime <+ "" + i + "-28-2022";
		//			ask adm1{
		//				bytime["2022-" + i]<-any(bytime);
		//			}
		//			ask adm2{
		//				bytime["2022-" + i]<-any(bytime);
		//			}
		//			ask adm3{
		//				bytime["2022-" + i]<-any(bytime);
		//			}
		//		}
		//
		string TL;
		TL <- ("," + lsttime + "\n") replace ("'", "");
		ask adm1 {
			TL <- TL + allid[NAME_1] + "," + bytime.values + "\n";
		}

		TL <- TL replace ("[", "") replace ("]", "");
		//		write TL;
		save TL to: "../js/gentime/gentimeAdm1" + outpath + ".csv" type: text;
		//////
		//////
		//////
		TL <- ("," + lsttime + "\n") replace ("'", "");
		ask adm2 {
			TL <- TL + allid[NAME_1 + NAME_2] + "," + bytime.values + "\n";
		}

		TL <- TL replace ("[", "") replace ("]", "");
		save TL to: "../js/gentime/gentimeAdm2" + outpath + ".csv" type: text;
		//////
		//////
		//////
		TL <- ("," + lsttime + "\n") replace ("'", "");
		ask adm3 {
			TL <- TL + allid[NAME_1 + NAME_2 + NAME_3] + "," + bytime.values + "\n";
		}

		TL <- TL replace ("[", "") replace ("]", "");
		save TL to: "../js/gentime/gentimeAdm3" + outpath + ".csv" type: text;
	}

	action timeAdm {
		string TL;
		TL <- ("," + lsttime + "\n") replace ("'", "");
		ask adm1 {
			TL <- TL + allid[NAME_1] + "," + bytime.values + "\n";
		}

		TL <- TL replace ("[", "") replace ("]", "");
		//		write TL;
		save TL to: "../js/time/timeAdm1" + outpath + ".csv" type: text;
		//////
		//////
		//////
		TL <- ("," + lsttime + "\n") replace ("'", "");
		ask adm2 {
			TL <- TL + allid[NAME_1 + NAME_2] + "," + bytime.values + "\n";
		}

		TL <- TL replace ("[", "") replace ("]", "");
		save TL to: "../js/time/timeAdm2" + outpath + ".csv" type: text;
		//////
		//////
		//////
		TL <- ("," + lsttime + "\n") replace ("'", "");
		ask adm3 {
			TL <- TL + allid[NAME_1 + NAME_2 + NAME_3] + "," + bytime.values + "\n";
		}

		TL <- TL replace ("[", "") replace ("]", "");
		save TL to: "../js/time/timeAdm3" + outpath + ".csv" type: text;
	}

	action sexage {
		string TL;
		TL <- "P,f1,f2,f3,f4,f5,f6,f7,f8,m1,m2,m3,m4,m5,m6,m7,m8,h0,h1,h2,h3,h4,h5,h6,t1,t2,t3,t4,t5,t6\n";
		ask adm1 {
			TL <- TL + allid[NAME_1] + (("," + female + "," + male + "," + hiv + "," + treatment + "\n") replace ("'", ""));
		}

		TL <- TL replace ("[", "") replace ("]", "");
		save TL to: "../js/sexageAdm1.csv" type: text;
		////////
		////////
		////////
		TL <- "P,f1,f2,f3,f4,f5,f6,f7,f8,m1,m2,m3,m4,m5,m6,m7,m8,h0,h1,h2,h3,h4,h5,h6,t1,t2,t3,t4,t5,t6\n";
		ask adm2 {
			TL <- TL + allid[NAME_1 + NAME_2] + (("," + female + "," + male + "," + hiv + "," + treatment + "\n") replace ("'", ""));
		}

		TL <- TL replace ("[", "") replace ("]", "");
		save TL to: "../js/sexageAdm2.csv" type: text;
		////////
		////////
		////////
		TL <- "P,f1,f2,f3,f4,f5,f6,f7,f8,m1,m2,m3,m4,m5,m6,m7,m8,h0,h1,h2,h3,h4,h5,h6,t1,t2,t3,t4,t5,t6\n";
		ask adm3 {
			TL <- TL + allid[NAME_1 + NAME_2 + NAME_3] + (("," + female + "," + male + "," + hiv + "," + treatment + "\n") replace ("'", ""));
		}

		TL <- TL replace ("[", "") replace ("]", "");
		save TL to: "../js/sexageAdm3.csv" type: text;
	}

	matrix data1;
	//	string fpath <- "../includes/GeoSp_VTM_KhamBenh_16_20_adm.000";
	string fpath <- "../includes/GeoSp_VTM_KhamBenh_16_20_gender_age.csv";
	string outpath <- "";

	action merge {
		file patient_csv_file <- csv_file("../includes/GeoSp_VTM_KhamBenh_16_20_gender_age.csv", ";", true);
		data1 <- ((patient_csv_file.contents));
		file tcf <- csv_file("../includes/GeoSp_VTM_DieuTri_16_20_simple.csv", ";", true);
		matrix data2 <- ((tcf.contents));
		map<string, string> dieutri;
		loop i from: 0 to: data2.rows - 1 {
			dieutri["" + (data2[0, i])] <- "" + data2[4, i];
		}

		loop i from: 0 to: data1.rows - 1 {
			if (dieutri["" + (data1[0, i])] != nil) {
				data1[13, i] <- dieutri["" + (data1[0, i])];
				//				write ""+data1[0, i]+" "+data1[13,i];
			}

		}

	}

	action initcsv {
	//		string fpath <- "../includes/GeoSp_VTM_KhamBenh_16_20_adm.csv";
	//		string fpath <- "../includes/GeoSp_VTM_KhamBenh_16_20_adm.000";
		if (!file_exists(fpath)) {
			return;
		}

		file patient_csv_file <- csv_file(fpath, ";", true);
		data1 <- ((patient_csv_file.contents));
		loop i from: 0 to: data1.rows - 1 {
		//			do ssss;
		}

	}

	action initpop {
		file patient_csv_file <- csv_file("../includes/pop.csv", ";", true);
		data1 <- ((patient_csv_file.contents));
		loop i from: 0 to: data1.rows - 1 {
			l1 <- "" + (data1[0, idx]);
			l2 <- "" + (data1[1, idx]);
			do cleaning;
			if (data1[2, idx] != "Province" and data1[2, idx] != "Municipality") {
				adm2 a2 <- alladm2[l1 + l2];
				if (a2 != nil) {
					a2.pop[2016] <- int(data1[3, idx]);
					a2.pop[2017] <- int(data1[4, idx]);
					a2.pop[2018] <- int(data1[5, idx]);
					a2.pop[2019] <- int(data1[6, idx]);
					a2.pop[2020] <- int(data1[7, idx]);
				} else {
					write l1 + l2;
				}

			}

			idx <- idx + 1;
		}

		ask adm1 {
			pop[2016] <- sum((adm2 where (each.NAME_1 = NAME_1)) collect each.pop[2016]);
			pop[2017] <- sum((adm2 where (each.NAME_1 = NAME_1)) collect each.pop[2017]);
			pop[2018] <- sum((adm2 where (each.NAME_1 = NAME_1)) collect each.pop[2018]);
			pop[2019] <- sum((adm2 where (each.NAME_1 = NAME_1)) collect each.pop[2019]);
			pop[2020] <- sum((adm2 where (each.NAME_1 = NAME_1)) collect each.pop[2020]);
		}

		idx <- 0;
	}

}

species adm1 schedules: [] {
	string NAME_1;
	string NAME_2;
	string NAME_3;
	string GID_1;
	string GID_2;
	string GID_3;
	string VARNAME_1;
	string VARNAME_2;
	string VARNAME_3;
	float risk_point <- 0.0;
	string time;
	map<string, float> bytime;
	list<int> male <- [0, 0, 0, 0, 0, 0, 0, 0];
	list<int> female <- [0, 0, 0, 0, 0, 0, 0, 0];
	list<int> treatment <- [0, 0, 0, 0, 0, 0, 0, 0];
	list<int> hiv <- [0, 0, 0, 0, 0, 0, 0];
	map<int, int> pop <- ([2016::1, 2017::1, 2018::1, 2019::1, 2020::1]);

	aspect default {
		draw shape;
		draw VARNAME_1 color: #red;
	}

}

species adm2 schedules: [] {
	string NAME_1;
	string NAME_2;
	string NAME_3;
	string GID_1;
	string GID_2;
	string GID_3;
	string VARNAME_1;
	string VARNAME_2;
	string VARNAME_3;
	float risk_point <- 0.0;
	string time;
	map<string, float> bytime;
	list<int> male <- [0, 0, 0, 0, 0, 0, 0, 0];
	list<int> female <- [0, 0, 0, 0, 0, 0, 0, 0];
	list<int> treatment <- [0, 0, 0, 0, 0, 0, 0, 0];
	list<int> hiv <- [0, 0, 0, 0, 0, 0, 0];
	map<int, int> pop <- ([2016::1, 2017::1, 2018::1, 2019::1, 2020::1]);

	aspect default {
		draw shape color: mcolor[int(risk_point / 50) > 6 ? 6 : int(risk_point / 50)];
		draw VARNAME_2 color: #red;
	}

}

species adm3 schedules: [] {
	string NAME_1;
	string NAME_2;
	string NAME_3;
	string GID_1;
	string GID_2;
	string GID_3;
	string VARNAME_1;
	string VARNAME_2;
	string VARNAME_3;
	float risk_point <- 0.0;
	string time;
	map<string, float> bytime;
	list<int> male <- [0, 0, 0, 0, 0, 0, 0, 0];
	list<int> female <- [0, 0, 0, 0, 0, 0, 0, 0];
	list<int> treatment <- [0, 0, 0, 0, 0, 0, 0, 0];
	list<int> hiv <- [0, 0, 0, 0, 0, 0, 0];

	aspect default {
		draw shape color: mcolor[int(risk_point / 50) > 6 ? 6 : int(risk_point / 50)];
		//		draw VARNAME_3 color: mcolor[int(risk_point / 8)];
	}

}

experiment "Merge data" type: gui autorun: true {

	action _init_ {
	//		create simulation with: [fpath::"../includes/GeoSp_VTM_KhamBenh_16_20_adm.csv"];
	//		create simulation with: [fpath::"../includes/GeoSp_VTM_KhamBenh_16_20_adm.000", outpath::"0"];
		loop i from: 0 to: 9 {
			create simulation with: [theindex::i, fpath::"../includes/GeoSp_VTM_KhamBenh_16_20_adm.00" + i, outpath::"" + i];
		}

		loop i from: 10 to: 20 {
			create simulation with: [theindex::i, fpath::"../includes/GeoSp_VTM_KhamBenh_16_20_adm.0" + i, outpath::"" + i];
		}

	}

	output {
	//		layout #split navigator: false;
	//		display "SS" {
	//			species adm3;
	//		}

	}

}
/*
 * H???i Ph??ngC??t B??
Thanh H??aH??c M??n
?????ng Th??pX?? An Long
?????ng Th??pX?? An Long
H?? N???iV??n Y??n
B?? R???a - V??ng T??uC??n ?????o
Thanh H??aH??c M??n
H???i D????ngTT ph??ng ch???ng HIV
?????k L???k????k N??ng
Thanh H??aH??c M??n
TP. H??? Ch?? MinhTr???n V??n Th???i
B?? R???a - V??ng T??uC??n ?????o
H???i Ph??ngKim Th??nh
B?? R???a - V??ng T??uC??n ?????o
B?? R???a - V??ng T??uC??n ?????o
B?? R???a - V??ng T??uC??n ?????o
B?? R???a - V??ng T??uC??n ?????o
H?? N???iV??n Y??n
H?? N???iV??n Y??n
H?? NamNgh??a B??nh
B?? R???a - V??ng T??uC??n ?????o
B?? R???a - V??ng T??uC??n ?????o
B?? R???a - V??ng T??uC??n ?????o
Qu???ng B??nhH???i Ch??u
B?? R???a - V??ng T??uC??n ?????o
Qu???ng B??nhH???i Ch??u
B?? R???a - V??ng T??uC??n ?????o
Qu???ng B??nhH???i Ch??u
Qu???ng B??nhH???i Ch??u
B?? R???a - V??ng T??uC??n ?????o
B?? R???a - V??ng T??uC??n ?????o
 */