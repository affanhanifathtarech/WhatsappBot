const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const {log, error} = require('./functions.js');
const {jadwal, messageInfoControl, getCCDCCData, sendFromDCC, sendFromYandal, handleLocMessage, cekPiketCS, cekPiketDCC, cekPiketCT, cekPiketYantek, ping, sendMessageToNumber } = require('./controls.js');
const client = new Client({ authStrategy: new LocalAuth({ clientId: "bot1" }),puppeteer: { headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'}});
const client2 = new Client({ authStrategy: new LocalAuth({ clientId: "bot2" }),puppeteer: { headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'}});
let messageInfo = false;

// BOT HP UTAMA
client.initialize();
client.on('loading_screen', (percent, message) => { log('BOT 1 LOADING SCREEN', percent, message);});
client.on('qr', (qr) => { qrcode.generate(qr, { small: true }); log('BOT 1 QR RECEIVED', qr);});
client.on('authenticated', () => { log('BOT 1 AUTHENTICATED');});
client.on('auth_failure', msg => { error('BOT 1 AUTHENTICATION FAILURE', msg);});
client.on('ready', () => { log('BOT 1 READY');});
client.on('change_state', state => { log('BOT 1 CHANGE STATE', state);});
client.on('disconnected', (reason) => { log('BOT 1 Client was logged out', reason);});
client.on('message', async msg => {
    messageInfoControl(msg,client,messageInfo); // MENGIRIM MESSAGE INFO KE NOMOR 6282269599529 DAN CONSOLE LOG
    getCCDCCData(msg);                          // MENGAMBIL DATA PETUGAS PIKET CS DAN DCC
    sendFromDCC(msg,client);                    // KIRIM DARI DARI GRUP DCC
    sendFromYandal(msg,client);                 // KIRIM DARI DARI GRUP YANDAL
    handleLocMessage(msg);                      // HANDLE PESAN LOC
    cekPiketCS(msg,client);                     // CEK PIKET CS
    cekPiketDCC(msg,client);                    // CEK PIKET DCC
    cekPiketCT(msg,client);                     // CEK PIKET CT
    cekPiketYantek(msg,client);                 // CEK PIKET YANTEK
    ping(msg,client);                           // PING
    sendMessageToNumber(msg,client);            // KIRIM PESAN KE NOMOR TERTENTU
});

// BOT HP TEKNIK
client2.initialize();
client2.on('loading_screen', (percent, message) => { log('BOT 2 LOADING SCREEN', percent, message);});
client2.on('qr', (qr) => { qrcode.generate(qr, { small: true }); log('BOT 2 QR RECEIVED', qr);});
client2.on('authenticated', () => { log('BOT 2 AUTHENTICATED');});
client2.on('auth_failure', msg => { error('BOT 2 AUTHENTICATION FAILURE', msg);});
client2.on('ready', () => { log('BOT 2 READY');});
client2.on('change_state', state => { log('BOT 2 CHANGE STATE', state);});
client2.on('disconnected', (reason) => { log('BOT 2 Client was logged out', reason);});
client2.on('message', async msg => {
    messageInfoControl(msg,client2,messageInfo); // MENGIRIM MESSAGE INFO KE NOMOR 6282269599529 DAN CONSOLE LOG
    handleLocMessage(msg);                      // HANDLE PESAN LOC
    cekPiketCS(msg,client2);                     // CEK PIKET CS
    cekPiketDCC(msg,client2);                    // CEK PIKET DCC
    cekPiketCT(msg,client2);                     // CEK PIKET CT
    cekPiketYantek(msg,client2);                 // CEK PIKET YANTEK
    ping(msg,client2);                           // PING
    sendMessageToNumber(msg,client2);            // KIRIM PESAN KE NOMOR TERTENTU
});

jadwal(client2,8,0);    //JADWAL OTOMATIS KIRIM PESAN PAGI
jadwal(client2,16,0);   //JADWAL OTOMATIS KIRIM PESAN SORE