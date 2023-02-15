const schedule = require('node-schedule');
const { isCoordinate, formatString, search, readExcelData, piket, log, getPrepaidData, getPostpaidData, getACMTData, isNumber, getInquiryData } = require('./functions.js');

function scheduler(client, client2) {
    // JADWAL OTOMATIS CT DIKIRIM KE GRUP ULP
    [[8, 0], [16, 0]].forEach(([hour, minute]) => {
        const rule = new schedule.RecurrenceRule();
        rule.tz = 'Asia/Jakarta';
        rule.hour = hour;
        rule.minute = minute;

        schedule.scheduleJob(rule, () => {
            piket('piketCT').then(piketCT => {
                client2.sendMessage("6281212747976-1458610958@g.us", `*PETUGAS PIKET CT*
        
*Petugas : ${piketCT.piketSekarang}*
*Waktu   : ${piketCT.periode}*

Petugas Selanjutnya : ${piketCT.piketSelanjutnya}
Petugas Sebelum : ${piketCT.piketSebelum}`);
            });
        });
    });

    // WAKTU KIRIM JADWAL OTOMATIS YANTEK 
    const yantekSchedule = [[0, 0], [8, 0], [16, 0]];

    // JADWAL OTOMATIS YANTEK DIKIRIM KE GRUP TJP
    yantekSchedule.forEach(([hour, minute]) => {
        const rule = new schedule.RecurrenceRule();
        rule.tz = 'Asia/Jakarta';
        rule.hour = hour;
        rule.minute = minute;

        schedule.scheduleJob(rule, () => {
            piket('piketYantek').then(piketYantek => {
                client.sendMessage("6282281162322-1572353572@g.us", `*PETUGAS PIKET YANTEK*
        
Hari/Tanggal : ${piketYantek.tanggal}
Waktu : ${piketYantek.periode}
TJP1 : *${piketYantek.tjp1.piketSekarang}*
TJP2 : *${piketYantek.tjp2.piketSekarang}*

​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​
*Petugas Selanjutnya*
TJP1 : ${piketYantek.tjp1.piketSelanjutnya}
TJP2 : ${piketYantek.tjp2.piketSelanjutnya}

*Petugas Sebelumnya*
TJP1 : ${piketYantek.tjp1.piketSebelumnya}
TJP2 : ${piketYantek.tjp2.piketSebelumnya}`);
            });
        });
    });

    // JADWAL OTOMATIS YANTEK DIKIRIM KE GRUP TJ BINGA & SIJUK
    yantekSchedule.forEach(([hour, minute]) => {
        const rule = new schedule.RecurrenceRule();
        rule.tz = 'Asia/Jakarta';
        rule.hour = hour;
        rule.minute = minute;

        schedule.scheduleJob(rule, () => {
            piket('piketYantek').then(piketYantek => {
                client.sendMessage("6282281162322-1572353572@g.us", `*PETUGAS PIKET YANTEK*
        
Hari/Tanggal : ${piketYantek.tanggal}
Waktu : ${piketYantek.periode}
Tj Binga : *${piketYantek.binga.piketSekarang}*
Sijuk : *${piketYantek.sijuk.piketSekarang}*

    ​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​
*Petugas Selanjutnya*
Tj Binga : ${piketYantek.binga.piketSelanjutnya}
Sijuk : ${piketYantek.sijuk.piketSelanjutnya}

*Petugas Sebelumnya*
Tj Binga : ${piketYantek.binga.piketSebelumnya}
Sijuk : ${piketYantek.sijuk.piketSebelumnya}`);
            });
        });
    });

    // JADWAL OTOMATIS YANTEK DIKIRIM KE GRUP BADAU
    yantekSchedule.forEach(([hour, minute]) => {
        const rule = new schedule.RecurrenceRule();
        rule.tz = 'Asia/Jakarta';
        rule.hour = hour;
        rule.minute = minute;

        schedule.scheduleJob(rule, () => {
            piket('piketYantek').then(piketYantek => {
                client.sendMessage("6282281162322-1572353572@g.us", `*PETUGAS PIKET YANTEK*
        
Hari/Tanggal : ${piketYantek.tanggal}
Waktu : ${piketYantek.periode}
Petugas : *${piketYantek.badau.piketSekarang}*


Petugas Selanjutnya : ${piketYantek.badau.piketSelanjutnya}
Petugas Sebelumnya : ${piketYantek.badau.piketSebelumnya}`);
            });
        });
    });

    // JADWAL OTOMATIS YANTEK DIKIRIM KE GRUP MEMBALONG
    yantekSchedule.forEach(([hour, minute]) => {
        const rule = new schedule.RecurrenceRule();
        rule.tz = 'Asia/Jakarta';
        rule.hour = hour;
        rule.minute = minute;

        schedule.scheduleJob(rule, () => {
            piket('piketYantek').then(piketYantek => {
                client.sendMessage("6282281162322-1572353572@g.us", `*PETUGAS PIKET YANTEK*
        
Hari/Tanggal : ${piketYantek.tanggal}
Waktu : ${piketYantek.periode}
Petugas : *${piketYantek.membalong.piketSekarang}*


Petugas Selanjutnya : ${piketYantek.membalong.piketSelanjutnya}
Petugas Sebelumnya : ${piketYantek.membalong.piketSebelumnya}`);
            });
        });
    });
}

function messageInfoControl(msg, client) {
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

function getCCDCCData(msg) {
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

async function sendFromDCC(msg, client) {
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

async function sendFromYandal(msg, client) {
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

function handleLocMessage(msg) {
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

async function handleKWHMessage(msg, client, MessageMedia) {
    // HANDLE PESAN KWH
    if (msg.body.toLowerCase().startsWith('kwh ')) {

        const customer = msg.body.toLowerCase().replace(/^(kwh) /, '').trim();
        if (!isNumber(customer)) return;
        let timeout = setTimeout(() => {
            client.sendMessage(msg.from, "Mohon menunggu...");
        }, 3000);

        await getInquiryData(customer)
            .then(async (inquiryData) => {
                const ACMTData = await getACMTData((inquiryData.meter_number === '') ? customer : inquiryData.customer_number);
                if (inquiryData.customer_number === '' && ACMTData.idpel === undefined) {
                    const error = new Error('Maaf, data tidak ditemukan');
                    error.statusCode = 404;
                    throw error;
                }
                return {
                    inquiryData,
                    ACMTData
                }
            })
            .then(async ({ inquiryData, ACMTData }) => {
                await MessageMedia.fromUrl(
                    `https://portalapp.iconpln.co.id/acmt/DisplayBlobServlet7?idpel=${ACMTData.idpel}`,
                    { unsafeMime: true })
                    .then(async (result) => {
                        if (result.data !== '') return result;

                        let res = {};
                        for (let i = 1; i < 4; i++) {
                            res = await MessageMedia.fromUrl(
                                `https://portalapp.iconpln.co.id/acmt/DisplayBlobServlet${i}?idpel=${ACMTData.idpel}&blth=${ACMTData.blth}`,
                                { unsafeMime: true });
                            if (res.data !== '') break;
                        }
                        return res;
                    })
                    .then((media) => {
                        const theMessage = `*DATA PELANGGAN*
                        
ID Pelanggan : ${(inquiryData.customer_number) != '' ? inquiryData.customer_number : ACMTData.idpel}
Nomor Meter : ${(inquiryData.meter_number) != '' ? inquiryData.meter_number : ACMTData.nomor_meter}
Nama : ${(inquiryData.customer_name) != '' ? inquiryData.customer_name : ACMTData.nama}
Tarif : ${(inquiryData.segmentation) != '' ? inquiryData.segmentation : ACMTData.tarif}
Daya : ${!isNaN(inquiryData.power) ? inquiryData.power : ACMTData.daya}${(ACMTData.gardu === '' || ACMTData.gardu === undefined) ? '' : `\nGardu : ${ACMTData.gardu}`}${(ACMTData.tiang === '' || ACMTData.tiang === undefined) ? '' : `\nTiang : ${ACMTData.tiang}`}${(ACMTData.merk_meter === '' || ACMTData.merk_meter === undefined) ? '' : `\nMerk : ${ACMTData.merk_meter}`}${(ACMTData.latitude === '' || ACMTData.longitude === '' || ACMTData.latitude === undefined || ACMTData.longitude === undefined) ? '' : `\n\nLokasi : \nhttps://maps.google.com/maps?q=${ACMTData.latitude}8%2C${ACMTData.longitude}`}`;

                        media.mimetype = "image/jpg";
                        media.filename = `KWH ${ACMTData.idpel} - ${ACMTData.blth}`;
                        clearTimeout(timeout);
                        if (media.data !== '') {
                            client.sendMessage(msg.from, media, { caption: theMessage });
                        } else {
                            client.sendMessage(msg.from, theMessage);
                        }
                    })
                    .catch((err) => {
                        log(err);
                    });
            }).catch((error) => {
                clearTimeout(timeout);
                client.sendMessage(msg.from, error.message);
            });


    }
}

function handlePiketDCC(msg, client) {
    // CEK PETUGAS PIKET
    if (msg.body.toLowerCase() === 'cek piket dcc') {
        piket('piketDCC').then(piketDCC => {
            client.sendMessage(msg.from, `*PETUGAS PIKET DCC*
                  
Petugas Sekarang : ${piketDCC.piketSekarang}
Petugas Sebelum : ${piketDCC.piketSebelum}`);
        })
    }
}

function handlePiketCS(msg, client) {
    // CEK PETUGAS PIKET CS
    if (msg.body.toLowerCase() === 'cek piket cs') {
        piket('piketCS').then(piketCS => {
            client.sendMessage(msg.from, `*PETUGAS PIKET CS*
      
Petugas Sekarang : ${piketCS.piketSekarang}
Petugas Sebelum : ${piketCS.piketSebelum}`);
        })
    }
}

function handlePiketCT(msg, client) {
    // CEK PETUGAS PIKET CT
    if (msg.body.toLowerCase() === 'cek piket ct') {
        piket('piketCT').then(piketCT => {
            client.sendMessage(msg.from, `*PETUGAS PIKET CT*

*Hari/Tanggal   : ${piketCT.waktu}*
*Petugas        : ${piketCT.piketSekarang}*
*Periode        : ${piketCT.periode}*

Petugas Selanjutnya : ${piketCT.piketSelanjutnya}
Petugas Sebelum : ${piketCT.piketSebelum}`);
        })
    }
}

function handlePiketYantekAll(msg, client) {
    // CEK PETUGAS PIKET YANTEK
    if (msg.body.toLowerCase() === 'cek piket yantek') {
        piket('piketYantek').then(piketYantek => {
            client.sendMessage(msg.from, `*PETUGAS PIKET YANTEK*
          
Hari/Tanggal : ${piketYantek.tanggal}
Waktu : ${piketYantek.periode}
  
Yantek 1 : *${piketYantek.tjp1.piketSekarang}*
Yantek 2 : *${piketYantek.tjp2.piketSekarang}*
Yantek Tj. Binga : *${piketYantek.binga.piketSekarang}*
Yantek Sijuk : *${piketYantek.sijuk.piketSekarang}*
Yantek Badau : *${piketYantek.badau.piketSekarang}*
Yantek Membalong : *${piketYantek.membalong.piketSekarang}*`);
        });
    }
}

function handlePiketYantek(posko, msg, client) {
    // CEK PETUGAS PIKET YANTEK
    if (msg.body.toLowerCase() === 'cek piket yantek') {
        piket('piketYantek').then(piketYantek => {
            client.sendMessage(msg.from, `*PETUGAS PIKET YANTEK*
          
Hari/Tanggal : ${piketYantek.tanggal}
Waktu : ${piketYantek.periode}
  
Yantek 1 : *${piketYantek.tjp1.piketSekarang}*
Yantek 2 : *${piketYantek.tjp2.piketSekarang}*
Yantek Tj. Binga : *${piketYantek.binga.piketSekarang}*
Yantek Sijuk : *${piketYantek.sijuk.piketSekarang}*
Yantek Badau : *${piketYantek.badau.piketSekarang}*
Yantek Membalong : *${piketYantek.membalong.piketSekarang}*`);
        });
    }
}

function ping(msg, client) {
    // PING CHAT
    if (msg.body.toLowerCase() === 'ping') {
        client.sendMessage(msg.from, 'pong');
    }
}

async function sendMessageToNumber(msg, client) {
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

function testButtons(msg, client, Buttons) {
    if (msg.body.toLowerCase().startsWith('button')) {
        const button = new Buttons('Button body', [{ body: 'Some text' }, { body: '.', id: 'test' },], 'title', 'footer');
        client.sendMessage(msg.from, button);
    }
}

module.exports = {
    scheduler,              // MENGIRIM PESAN SESUAI JADWAL
    messageInfoControl,     // MENGIRIM MESSAGE INFO KE NOMOR 6282269599529 DAN CONSOLE LOG
    getCCDCCData,           // MENGAMBIL DATA PETUGAS PIKET CS DAN DCC
    sendFromDCC,            // KIRIM DARI DARI GRUP DCC
    sendFromYandal,         // KIRIM DARI DARI GRUP YANDAL
    handleLocMessage,       // HANDLE PESAN LOC
    handleKWHMessage,       // HANDLE PESAN KWH
    handlePiketCS,          // HANDLE PIKET CS
    handlePiketDCC,         // HANDLE PIKET DCC
    handlePiketCT,          // HANDLE PIKET CT
    handlePiketYantekAll,   // HANDLE PIKET YANTEK SEMUA
    handlePiketYantek,      // HANDLE PIKET YANTEK PER POSKO
    ping,                   // PING
    sendMessageToNumber,    // KIRIM PESAN KE NOMOR TERTENTU
    testButtons
}