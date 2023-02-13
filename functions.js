const fs = require("fs");
const stringSimilarity = require('string-similarity');
const Excel = require('exceljs');
const axios = require('axios');
const moment = require('moment');
require('moment/locale/id');
moment.locale('id');

function isNumber(str) {
  return /^\d+$/.test(str);
}

function isCoordinate(str) {
  return /^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/.test(str);
}

function isSwitching(str) {
  return /ACR|DS|FCO|LBS|MO|PTS/.test(str);
}

function formatString(str) {
  return str.replace(/\d+/g, (n) => n.padStart(4, '0'));
}

function search(obj, data, msg) {
  if (obj.hasOwnProperty(data)) {
    const lat = obj[data]['lat'];
    const long = obj[data]['long'];
    msg.reply(`*${data}*
      
https://maps.google.com/maps?q=${lat}8%2C${long}&z=17&hl=en`);
    return null;
  } else {
    if (isSwitching(data)) {
      const matches = stringSimilarity.findBestMatch(data, Object.keys(obj));
      msg.reply(`Mungkin maksudnya ini : *${matches.bestMatch.target}*`);
      return matches.bestMatch.target
    }
    msg.reply(`${data} tidak ditemukan`);
    return null;
  }
}

async function readExcelData() {
  const workbook = new Excel.Workbook();
  await workbook.xlsx.readFile('./DATA/data.xlsx');
  const worksheet = workbook.getWorksheet(1);
  const data = {};
  worksheet.eachRow(row => {
    const key = row.getCell(1).value;
    const value = {
      lat: row.getCell(2).value,
      long: row.getCell(3).value
    };
    data[key] = value;
  });
  return data;
}

async function piket(jenis, msg = null, hour = null, minute = null) {
  let piketSebelum = null;
  let piketSekarang = null;
  let dataFromFile = null;
  const now = new Date();
  const formattedDate = moment().format('dddd, DD MMM YYYY');

  if (hour != null) {
    now.setHours(hour);
    now.setMinutes(minute);
    now.setSeconds(0);
  }

  if (jenis == "piketYantek") {
    const yantek = {};
    yantek.tanggal = formattedDate;
    const hour = now.toLocaleTimeString('en-GB', { timeZone: 'Asia/Jakarta' }).split(":")[0];
    if (hour >= 8 && hour <= 15) { //SHIFT PAGI
      yantek.shift = "PAGI";
      yantek.periode = "08:00 - 16:00 WIB";
    } else if (hour >= 16 && hour <= 23) { //SHIFT SORE
      yantek.shift = "SORE";
      yantek.periode = "16:00 - 00:00 WIB";
    } else { //SHIFT MALAM
      yantek.shift = "MALAM";
      yantek.periode = "00:00 - 08:00 WIB";
    }

    const workbook = new Excel.Workbook();
    await workbook.xlsx.readFile('./DATA/JADWAL PIKET YANTEK.xlsx');
    ['TJP1', 'TJP2', 'TJ BINGA', 'SIJUK', 'BADAU', 'MEMBALONG'].forEach(data => {
      const worksheet = workbook.getWorksheet(data);
      let kantor = data.toLowerCase();
      if (data == "TJ BINGA") {
        kantor = "binga"
      }

      if (!yantek[kantor]) { yantek[kantor] = {} }

      worksheet.eachRow((row, rowNumber) => {
        const date = row.getCell(1).value;
        const waktu = row.getCell(2).value;
        if (date == now.toLocaleDateString(undefined, { timeZone: 'Asia/Jakarta' }) && yantek.shift.substring(0, 1) == waktu) {
          yantek[kantor].piketSebelumnya = worksheet.getRow(rowNumber - 1).getCell(4).value;
          yantek[kantor].piketSekarang = row.getCell(4).value;
          yantek[kantor].piketSelanjutnya = worksheet.getRow(rowNumber + 1).getCell(4).value;
        }
      });
    });

    return yantek;
  }

  if (jenis == "piketCT") {
    let periode = null;
    let piketSelanjutnya = null;
    const waktu = formattedDate;
    // const waktu = `${nowDay}, ${nowDate}`;
    // const now = new Date("2023-01-18T01:23:24.273Z");
    // console.log(now)
    // console.log(now.toLocaleString('en-GB', { timeZone: 'Asia/Jakarta' }))
    // if(waktu=='PAGI'){
    //   now.setUTCHours(1)
    // } else if(waktu=='SIANG'){
    //   now.setUTCHours(9)
    // }
    const workbook = new Excel.Workbook();
    await workbook.xlsx.readFile('./DATA/JADWAL PIKET CT.xlsx');

    const worksheet = workbook.getWorksheet(1);
    worksheet.eachRow((row, rowNumber) => {
      const date = row.getCell(1).value;
      if (date == now.toLocaleDateString(undefined, { timeZone: 'Asia/Jakarta' })) {
        const hour = now.toLocaleTimeString('en-GB', { timeZone: 'Asia/Jakarta' }).split(":")[0];
        if (hour >= 8 && hour <= 15) //SHIFT PAGI
        {
          piketSebelum = worksheet.getRow(rowNumber - 1).getCell(3).value;
          piketSekarang = row.getCell(2).value;
          piketSelanjutnya = row.getCell(3).value;
          periode = "08:00 - 16:00 WIB";
        } else if (hour >= 16 && hour <= 22) { //SHIFT SORE
          piketSebelum = row.getCell(2).value;
          piketSekarang = row.getCell(3).value;
          piketSelanjutnya = worksheet.getRow(rowNumber + 1).getCell(2).value;
          periode = "16:00 - 23:00 WIB";
        } else if (hour == 23) { //JAM 11-12 MALAM
          piketSebelum = row.getCell(3).value;
          piketSekarang = "-";
          piketSelanjutnya = worksheet.getRow(rowNumber + 1).getCell(2).value;
          periode = "-";
        } else if (hour >= 0 && hour <= 7) { //JAM 0-7
          piketSebelum = worksheet.getRow(rowNumber - 1).getCell(3).value;
          piketSekarang = "-";
          piketSelanjutnya = row.getCell(2).value;
          periode = "-";
        }
      }
    });

    return {
      piketSebelum,
      piketSekarang,
      piketSelanjutnya,
      periode,
      waktu
    };
  }

  try {
    const data = fs.readFileSync('./DATA/data.json');
    dataFromFile = JSON.parse(data);
  } catch (err) {
    log(err);
  }

  if (msg == null) {
    piketSebelum = dataFromFile[jenis].piketSebelum;
    piketSekarang = dataFromFile[jenis].piketSekarang;
    return {
      piketSebelum,
      piketSekarang
    };
  }

  const report = msg.toLowerCase();
  const lines = report.split('\n');

  lines.forEach((line) => {
    if (line.includes("menyerahkan piket shift")) {
      piketSebelum = line.split(":")[1].trim().toUpperCase();
    }
    if (line.includes("menerima piket shift")) {
      piketSekarang = line.split(":")[1].trim().toUpperCase();
    }
  });

  try {
    dataFromFile[jenis].piketSebelum = piketSebelum;
    dataFromFile[jenis].piketSekarang = piketSekarang;
    fs.writeFileSync('./DATA/data.json', JSON.stringify(dataFromFile));
  } catch (err) {
    log(err);
  }

  return {
    piketSebelum,
    piketSekarang
  };
}

function log(var1, var2 = '', var3 = '') {
  const now = new Date();
  const date = (`0${now.getDate()}`).slice(-2);
  const month = (`0${now.getMonth() + 1}`).slice(-2);
  const year = (`0${(now.getYear() - 100)}`).slice(-2);
  const hours = (`0${now.getHours()}`).slice(-2);;
  const minutes = (`0${now.getMinutes()}`).slice(-2);
  const seconds = (`0${now.getSeconds()}`).slice(-2);

  console.log(`${year}/${month}/${date} ${hours}:${minutes}:${seconds}`, var1, var2, var3)
}

async function getPrepaidData(customer) {

  try {
    const response = await axios.post('https://m.bukalapak.com/westeros_auth_proxies', { application_id: 1, authenticity_token: '' });
    const token = response.data.access_token;

    try {
      const response = await axios.post('https://api.bukalapak.com/electricities/prepaid-inquiries?access_token=' + token, { customer_number: customer, product_id: 0 });
      return Promise.resolve(response.data.data);

    } catch (error) {
      log(`prepaid error get inqueries for ${customer} code ${error.response.data.errors[0].code} : `, error.response.data.errors[0].message);
      reject.reject(false);
    }

  } catch (error) {
    log(`prepaid error get auth for ${customer} code ${error.response.data.errors[0].code} : `, error.response.data.errors[0].message);
    return Promise.reject(false);
  }

}

async function getPostpaidData(customer) {
  try {
    const response = await axios.post('https://m.bukalapak.com/westeros_auth_proxies', { application_id: 1, authenticity_token: '' });
    const token = response.data.access_token;

    try {
      const response = await axios.post('https://api.bukalapak.com/electricities/postpaid-inquiries?access_token=' + token, { customer_number: customer });
      return Promise.resolve(response.data.data);

    } catch (error) {
      log(`postpaid error get inqueries for ${customer} code ${error.response.data.errors[0].code} : `, error.response.data.errors[0].message);
      return Promise.reject(false);
    }

  } catch (error) {
    log(`postpaid error get auth for ${customer} code ${error.response.data.errors[0].code} : `, error.response.data.errors[0].message);
    return Promise.reject(false);
  }

}

async function getACMTData(customer) {
  let keyArray = [
    "hist_foto",
    "merk_meter",
    "kvamax",
    "fak_kwh",
    "tgl_transaksi",
    "nomor_meter",
    "tgl_insert",
    "unitupi",
    "stand_lalu",
    "tgl_kirim_ap2t",
    "stan_kvarh",
    "blth",
    "longitude",
    "gardu",
    "kdgelombang",
    "bulanbaca",
    "status",
    "tglbaca",
    "msg",
    "petugas",
    "stan_lalu_wbp",
    "tarif_index",
    "stan_lwbp2",
    "stan_wbp",
    "kd_jns_plg",
    "stan_baca",
    "latitude",
    "alamat",
    "tarif",
    "langkah",
    "peruntukan",
    "kd_tg",
    "type_meter",
    "MTS_STSP_E",
    "kdentry",
    "kdpt",
    "namafoto",
    "transaksiby",
    "tiang",
    "idpel",
    "nama",
    "stan_baca_kvarh",
    "kode_rbm",
    "kdkelompok",
    "sisipan",
    "daya",
    "unitap",
    "jamnyala",
    "pemkwh",
    "kdbaca",
    "fak_kvarh",
    "stan_baca_wbp",
    "stan_lalu_kvarh",
    "kode_pembeda_tarif",
    "unitup",
    "alamat_peta"
  ]

  try {
    const response = await axios({
      method: "post",
      url: "https://portalapp.iconpln.co.id/acmt/main/c",
      headers: {
        "Content-Type": "text/x-gwt-rpc; charset=UTF-8"
      },
      data: `7|0|15|https://portalapp.iconpln.co.id/acmt/main/|75A889AF7A9517F8CD5B330A92874A24|id.co.iconpln.client.app.service.IpamService|getUtilDao|java.lang.String/2004016611|java.util.Map||com.extjs.gxt.ui.client.core.FastMap/3488076414|code|idpel|${customer}|unitup|16300|func_name|FG_INFOPELANGGAN|1|2|3|4|2|5|6|7|8|4|5|9|5|7|5|10|5|11|5|12|5|13|5|14|5|15|`
    });

    const data = response.data;
    const arrayData = JSON.parse(data.replace("//OK", ""));
    const arr = arrayData[arrayData.length - 3];

    let obj = {};
    for (let i = 0; i < arr.length; i++) {
      if (keyArray.some((arg) => { return arr[i] == arg })) {
        if (keyArray.some((arg) => { return arr[i + 1] == arg })) {
          obj[arr[i]] = "";
        } else {
          obj[arr[i]] = arr[i + 1];
        }
      }
    }

    return Promise.resolve(obj);
  } catch (error) {
    log("Error get ACMT data : ", error);
    return Promise.resolve(false);
  }
}

module.exports = { isNumber, isCoordinate, isSwitching, formatString, search, readExcelData, piket, log, getPrepaidData, getPostpaidData, getACMTData }