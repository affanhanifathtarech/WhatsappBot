// const express = require('express');
// const http = require('http');
// const socketIO = require('socket.io');

// const app = express();
// const server = http.createServer(app);
// const io = socketIO(server);

// app.use(express.static(__dirname + '/node_modules/'));

// app.get('/node_modules', (req, res) => {
//     res.sendFile(__dirname + '/node_modules/');
// });

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

// io.on('connection', (socket) => {
//   console.log('a user connected');
// });

// server.listen(8000, '139.180.188.231', () => {
//   console.log('Server started on http://139.180.188.231:8000');
// });

// const axios = require('axios');

// async function getToken() {
//   try {
//     const response = await axios.post('https://m.bukalapak.com/westeros_auth_proxies', {
//       application_id: 1,
//       authenticity_token: ''
//     });
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// }

// getToken().then(response => {
//     console.log(response);
//   });

//   https://api.bukalapak.com/electricities/prepaid-inquiries?access_token=yOfrwc5QZjx9u8PERGx5S1RGkNuiirZVx3jecEh_W5F7Pw


// const axios = require('axios');

// async function getElectricityData(customer) {

//   try {
//     const response = await axios.post('https://m.bukalapak.com/westeros_auth_proxies', {application_id: 1,authenticity_token: ''});
//     const token = response.data.access_token;

//     try {
//       const response = await axios.post('https://api.bukalapak.com/electricities/prepaid-inquiries?access_token=' + token,{customer_number : customer, product_id : 0});
//       return response.data.data;

//     } catch (error) {
//       console.error(error);
//     }

//   } catch (error) {
//     console.error(error);
//   }

// }

// getElectricityData('86039385942')
//   .then(response => {
//     console.log(response);
//   });

// const axios = require("axios");

// const idPel = "163000401386"

// axios({
//   method: "post",
//   url: "https://portalapp.iconpln.co.id/acmt/main/c",
//   headers: {
//     "Content-Type": "text/x-gwt-rpc; charset=UTF-8"
//   },
//   data: `7|0|15|https://portalapp.iconpln.co.id/acmt/main/|75A889AF7A9517F8CD5B330A92874A24|id.co.iconpln.client.app.service.IpamService|getUtilDao|java.lang.String/2004016611|java.util.Map||com.extjs.gxt.ui.client.core.FastMap/3488076414|code|idpel|${idPel}|unitup|16300|func_name|FG_INFOPELANGGAN|1|2|3|4|2|5|6|7|8|4|5|9|5|7|5|10|5|11|5|12|5|13|5|14|5|15|`
// })
//   .then(response => {

//     const data = response.data;

//     let arrayData = data.replace("//OK", "");
//     arrayData = JSON.parse(arrayData);
//     const mainData = arrayData[arrayData.length - 3];
//     console.log(mainData);

//   })
//   .catch(error => {
//     console.log(error);
//   });

//AIzaSyDR1UN8UGGVHAH_9Kr4Gy6zFsXSp6szefk

const { google } = require('googleapis');
const auth = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);

const credentials = {
  access_token: ACCESS_TOKEN,
  refresh_token: REFRESH_TOKEN,
  scope: 'https://www.googleapis.com/auth/spreadsheets',
  token_type: 'Bearer',
  expiry_date: EXPIRY_DATE,
};

auth.setCredentials(credentials);
const sheets = google.sheets({ version: 'v4', auth });

const spreadsheetId = 'AIzaSyDR1UN8UGGVHAH_9Kr4Gy6zFsXSp6szefk';
const range = 'PENGUKURAN BEBAN WBP!B:C';
const keyword = 'TP0327';

sheets.spreadsheets.values.get({
  spreadsheetId,
  range,
}, (err, res) => {
  if (err) return console.log(`The API returned an error: ${err}`);

  const rows = res.data.values;
  const data = rows.find(row => row[1] === keyword);

  if (data) {
    console.log(`Data found: ${data[0]}, ${data[1]}, ${data[2]}`);
    // Lakukan apa yang perlu dilakukan dengan data
  } else {
    console.log('No data found.');
  }
});
