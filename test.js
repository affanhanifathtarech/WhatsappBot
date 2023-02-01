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


const axios = require('axios');

async function getElectricityData(customer) {
  
  try {
    const response = await axios.post('https://m.bukalapak.com/westeros_auth_proxies', {application_id: 1,authenticity_token: ''});
    const token = response.data.access_token;

    try {
      const response = await axios.post('https://api.bukalapak.com/electricities/prepaid-inquiries?access_token=' + token,{customer_number : customer, product_id : 0});
      return response.data.data;

    } catch (error) {
      console.error(error);
    }

  } catch (error) {
    console.error(error);
  }

}

getElectricityData('86039385942')
  .then(response => {
    console.log(response);
  });
