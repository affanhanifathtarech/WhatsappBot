// const qrcode = require('qrcode-terminal');
// const { Client, Location, List, Buttons, LocalAuth} = require('whatsapp-web.js');
// const {log, error} = require('./functions.js');
// const {testButtons, jadwal, messageInfoControl, getCCDCCData, sendFromDCC, sendFromYandal, handleLocMessage, cekPiketCS, cekPiketDCC, cekPiketCT, cekPiketYantek, ping, sendMessageToNumber } = require('./controls.js');
// const client = new Client({ authStrategy: new LocalAuth({ clientId: "bot3" }),puppeteer: { headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'}});
// let messageInfo = false;

// // BOT HP UTAMA
// client.initialize();
// client.on('loading_screen', (percent, message) => { log('BOT 1 LOADING SCREEN', percent, message);});
// client.on('qr', (qr) => { qrcode.generate(qr, { small: true }); log('BOT 1 QR RECEIVED', qr);});
// client.on('authenticated', () => { log('BOT 1 AUTHENTICATED');});
// client.on('auth_failure', msg => { error('BOT 1 AUTHENTICATION FAILURE', msg);});
// client.on('ready', () => { log('BOT 1 READY');});
// client.on('change_state', state => { log('BOT 1 CHANGE STATE', state);});
// client.on('disconnected', (reason) => { log('BOT 1 Client was logged out', reason);});
// client.on('message', async msg => {
//     testButtons(msg,client,Buttons);
//     messageInfoControl(msg,client,messageInfo); // MENGIRIM MESSAGE INFO KE NOMOR 6282269599529 DAN CONSOLE LOG
// });

[[8,0],[16,0]].forEach(([hour,minute]) => {
    console.log(hour);
    console.log(minute);
});