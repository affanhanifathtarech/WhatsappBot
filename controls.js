const schedule = require('node-schedule');
const { isCoordinate, formatString, search, readExcelData, piket, log } = require('./functions.js');

function jadwal(client, hour, minute){
  const rule = new schedule.RecurrenceRule();
  rule.tz = 'Asia/Jakarta';
  rule.hour = hour;
  rule.minute = minute;

  schedule.scheduleJob(rule, function(){
    piket('piketCT').then(piketCT => {
      client.sendMessage("6281212747976-1458610958@g.us", `*PETUGAS PIKET CT*
  
*Petugas : ${piketCT.piketSekarang}*
*Waktu   : ${piketCT.periode}*

Petugas Selanjutnya : ${piketCT.piketSelanjutnya}
Petugas Sebelum : ${piketCT.piketSebelum}`);
      })
  });
}

function messageInfoControl(msg,client,messageInfo){
  // MENGIRIM MESSAGE INFO KE NOMOR 6282269599529 DAN CONSOLE LOG
  if (messageInfo) {
      client.sendMessage('6282269599529@c.us', `${JSON.stringify(msg)}`);
      log('MESSAGE RECEIVED', msg);
  }

  // KONTROL MESSAGE INFO
  if (msg.body.toLowerCase() === 'messageinfo') {
      if (messageInfo) {
          messageInfo = false;
          client.sendMessage('6282269599529@c.us', "MessageInfo dinonaktifkan");
      } else {
          messageInfo = true;
          client.sendMessage('6282269599529@c.us', "MessageInfo diaktifkan");
      }
  }
}

function getCCDCCData(msg){
  // MENGAMBIL DATA PETUGAS PIKET CS DAN DCC
  if (msg.from === '6282281162322-1572353572@g.us' || msg.from === "6281373370820-1517467635@g.us") {
      if (msg.body.includes('LAPORAN SERAH TERIMA PENUGASAN KHSUS APKT') || msg.body.includes('LAPORAN SERAH TERIMA GANGGUAN APKT')) {
          piketCS = piket('piketCS', msg.body);
      }
      if (msg.body.includes('𝐋𝐚𝐩𝐨𝐫𝐚𝐧 𝐒𝐞𝐫𝐚𝐡 𝐓𝐞𝐫𝐢𝐦𝐚 𝐏𝐢𝐤𝐞𝐭 𝐃𝐢𝐬𝐩𝐚𝐭𝐜𝐡𝐞𝐫 𝐁𝐞𝐥𝐢𝐭𝐮𝐧𝐠') || msg.body.includes('LAPORAN SERAH TERIMA KONDISI SET UFR PENYULANG DISPATCHER BELITUNG')) {
          piketDCC = piket('piketDCC', msg.body);
      }
  }
}

async function sendFromDCC(msg,client){
  // KIRIM DATA DARI GRUP DCC
  if (msg.from === "6281373370820-1517467635@g.us") {
      if (msg.hasMedia === true) {
          const media = await msg.downloadMedia();
          if (msg.body === '') {
              client.sendMessage('120363029059869965@g.us', media, { caption: `*_~${msg._data.notifyName}_*` });
          } else {
              client.sendMessage('120363029059869965@g.us', media, {
                  caption: `*_~${msg._data.notifyName}_*
                      
${(msg.body)}`
              });
          }
      } else {
          client.sendMessage('120363029059869965@g.us', `*_~${msg._data.notifyName}_*
      
${(msg.body)}`);
      }
  }
}

async function sendFromYandal(msg,client){
  // KIRIM DATA DARI GRUP YANDAL
  if (msg.from === '6282173048548-1593577821@g.us') {
      if (msg.hasMedia === true) {
          const media = await msg.downloadMedia();
          if (msg.body === '') {
              client.sendMessage('120363027629485612@g.us', media, { caption: `*_~${msg._data.notifyName}_*` });
          } else {
              client.sendMessage('120363027629485612@g.us', media, {
                  caption: `*_~${msg._data.notifyName}_*
                      
${(msg.body)}`
              });
          }
      } else {
          client.sendMessage('120363027629485612@g.us', `*_~${msg._data.notifyName}_*
      
${(msg.body)}`);
      }
  }
}

function handleLocMessage(msg){
  // HANDLE PESAN LOC
  if (msg.body.toLowerCase().startsWith('loc ') || msg.body.toLowerCase().startsWith('location ')) {
      const data = msg.body.toLowerCase().replace(/^(loc|location) /, '');
      // const data = formatString(toFind).toUpperCase();
      if (isCoordinate(data)) {
          const lat = data.split(',')[0];
          const long = data.split(',')[1];
          msg.reply(`https://maps.google.com/maps?q=${lat}8%2C${long}&z=17&hl=en`);
          // msg.reply(new Location(37.422, -122.084, 'Googleplex\nGoogle Headquarters'));
      } else {
          readExcelData().then(obj => {
              const cari = search(obj, formatString(data).toUpperCase(), msg);
              if (cari != null) {
                  search(obj, cari, msg);
              }
          });
      }
  }
}

function cekPiketDCC(msg,client){
  // CEK PETUGAS PIKET
  if (msg.body.toLowerCase() === 'cek piket dcc') {
          piket('piketDCC').then(piketDCC => {
              client.sendMessage(msg.from, `*PETUGAS PIKET DCC*
                  
Petugas Sekarang : ${piketDCC.piketSekarang}
Petugas Sebelum : ${piketDCC.piketSebelum}`);
          })
  }
}

function cekPiketCS(msg,client){
  // CEK PETUGAS PIKET CS
  if (msg.body.toLowerCase() === 'cek piket cs') {
      piket('piketCS').then(piketCS => {
          client.sendMessage(msg.from, `*PETUGAS PIKET CS*
      
Petugas Sekarang : ${piketCS.piketSekarang}
Petugas Sebelum : ${piketCS.piketSebelum}`);
      })
  }
}

function cekPiketCT(msg,client){
  // CEK PETUGAS PIKET CT
  if (msg.body.toLowerCase() === 'cek piket ct') {
      piket('piketCT').then(piketCT => {
          client.sendMessage(msg.from, `*PETUGAS PIKET CT*

*Petugas : ${piketCT.piketSekarang}*
*Waktu   : ${piketCT.periode}*

Petugas Selanjutnya : ${piketCT.piketSelanjutnya}
Petugas Sebelum : ${piketCT.piketSebelum}`);
      })
  }
}

function cekPiketYantek(msg,client){
  // CEK PETUGAS PIKET YANTEK
  if (msg.body.toLowerCase() === 'cek piket yantek') {
      piket('piketYantek').then(piketYantek => {
          client.sendMessage(msg.from, `𝗣𝗘𝗧𝗨𝗚𝗔𝗦 𝗣𝗜𝗞𝗘𝗧 𝗬𝗔𝗡𝗧𝗘𝗞
*Hari/Tanggal : ${piketYantek.tanggal}*
*Waktu : ${piketYantek.periode}*
  
Yantek 1 : *${piketYantek.tjp1.piketSekarang}*
Yantek 2 : *${piketYantek.tjp2.piketSekarang}*
Yantek Tj. Binga : *${piketYantek.binga.piketSekarang}*
Yantek Sijuk : *${piketYantek.sijuk.piketSekarang}*
Yantek Badau : *${piketYantek.badau.piketSekarang}*
Yantek Membalong : *${piketYantek.membalong.piketSekarang}*`);
      });
  }
}

function ping(msg,client){
  // PING CHAT
  if (msg.body.toLowerCase() === 'ping') {
      client.sendMessage(msg.from, 'pong');
  }
}

async function sendMessageToNumber(msg,client){
  // KIRIM PESAN KE NOMOR TERTENTU
  if (msg.body.toLowerCase().startsWith('kirim ')) {
      let number = msg.body.split(' ')[1];
      let messageIndex = msg.body.indexOf(number) + number.length;
      let message = msg.body.slice(messageIndex, msg.body.length);
      number = number.includes('@c.us') ? number : `${number}@c.us`;
      let chat = await msg.getChat();
      chat.sendSeen();
      client.sendMessage(number, message);
  } 
}

module.exports = { 
    jadwal,             // MENGIRIM PESAN SESUAI JADWAL
    messageInfoControl, // MENGIRIM MESSAGE INFO KE NOMOR 6282269599529 DAN CONSOLE LOG
    getCCDCCData,       // MENGAMBIL DATA PETUGAS PIKET CS DAN DCC
    sendFromDCC,        // KIRIM DARI DARI GRUP DCC
    sendFromYandal,     // KIRIM DARI DARI GRUP YANDAL
    handleLocMessage,   // HANDLE PESAN LOC
    cekPiketCS,         // CEK PIKET CS
    cekPiketDCC,        // CEK PIKET DCC
    cekPiketCT,         // CEK PIKET CT
    cekPiketYantek,     // CEK PIKET YANTEK
    ping,               // PING
    sendMessageToNumber // KIRIM PESAN KE NOMOR TERTENTU
}