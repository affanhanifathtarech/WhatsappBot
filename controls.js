const schedule = require('node-schedule');
const { searchPiket, searchGardu, isCoordinate, formatString, search, readExcelData, piket, log, getPrepaidData, getPostpaidData, getACMTData, isNumber, getInquiryData } = require('./functions.js');
const sharp = require('sharp');

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

                        let res = { 'data': '' };
                        for (let i = 1; i < 4; i++) {
                            for (let j = 0; j < ACMTData.blthFromUrls.length; j++) {
                                res = await MessageMedia.fromUrl(
                                    `https://portalapp.iconpln.co.id/acmt/DisplayBlobServlet${i}?idpel=${ACMTData.idpel}&blth=${ACMTData.blthFromUrls[j]}`,
                                    { unsafeMime: true });
                                if (res.data !== '') break;
                            }
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

async function handleGarduMessage(msg, client) {
    // HANDLE PESAN GARDU
    if (msg.body.toLowerCase().startsWith('cek gardu ')) {

        const searchingGardu = msg.body.toLowerCase().replace(/^(cek gardu) /, '').trim();
        let timeout = setTimeout(() => {
            client.sendMessage(msg.from, "Mohon menunggu...");
        }, 3000);

        await searchGardu(formatString(searchingGardu).toUpperCase())
            .then((gardu) => {
                const theMessage = `*DATA GARDU ${gardu.namaGardu}*

Alamat : ${gardu.alamat}
Penyulang : ${gardu.penyulang}
Section : ${gardu.section}
Tipe : ${gardu.tipe}
Merk : ${gardu.merk}
Kapasitas Daya : ${gardu.daya} kVA
Tahun : ${gardu.tahun}
Jurusan TR : ${gardu.jurTerpakai}/${gardu.jurTerpasang}
Tap Trafo : ${gardu.tap}

​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​
*----- PENGUKURAN WBP -----*
Tanggal/Waktu : ${gardu.wbp.tglUkur} ${gardu.wbp.jamUkur}
Arus utama (A): ${gardu.wbp.arusUtama[0]} | ${gardu.wbp.arusUtama[1]} | ${gardu.wbp.arusUtama[2]} | ${gardu.wbp.arusUtama[3]}
Arus jur 1 (A) : ${gardu.wbp.arus1[0]} | ${gardu.wbp.arus1[1]} | ${gardu.wbp.arus1[2]} | ${gardu.wbp.arus1[3]}${(gardu.wbp.arus2[0] === '') ? '' : `\nArus jur 2 (A) : ${gardu.wbp.arus2[0]} | ${gardu.wbp.arus2[1]} | ${gardu.wbp.arus2[2]} | ${gardu.wbp.arus2[3]}`}${(gardu.wbp.arus3[0] === '') ? '' : `\nArus jur 3 (A) : ${gardu.wbp.arus3[0]} | ${gardu.wbp.arus3[1]} | ${gardu.wbp.arus3[2]} | ${gardu.wbp.arus3[3]}`}${(gardu.wbp.arus4[0] === '') ? '' : `\nArus jur 4 (A) : ${gardu.wbp.arus4[0]} | ${gardu.wbp.arus4[1]} | ${gardu.wbp.arus4[2]} | ${gardu.wbp.arus4[3]}`} 
Teg. RS/ST/TR (V) : ${gardu.wbp.tegangan[0]} | ${gardu.wbp.tegangan[1]} | ${gardu.wbp.tegangan[2]}
Teg. RN/SN/TN (V) : ${gardu.wbp.tegangan[3]} | ${gardu.wbp.tegangan[4]} | ${gardu.wbp.tegangan[5]}
Pembebanan : ${gardu.wbp.beban[0]} kVA | ${gardu.wbp.beban[1]} kW | ${gardu.wbp.beban[2].replace('%', '')} %
Keterangan : ${gardu.wbp.status[0]}${(gardu.wbp.status[1] === '' || gardu.wbp.status[1] === undefined) ? '' : ` ,${gardu.wbp.status[1]}`}

*----- PENGUKURAN LWBP -----*
Tanggal/Waktu : ${gardu.lwbp.tglUkur} ${gardu.lwbp.jamUkur}
Arus utama (A): ${gardu.lwbp.arusUtama[0]} | ${gardu.lwbp.arusUtama[1]} | ${gardu.lwbp.arusUtama[2]} | ${gardu.lwbp.arusUtama[3]}
Arus jur 1 (A) : ${gardu.lwbp.arus1[0]} | ${gardu.lwbp.arus1[1]} | ${gardu.lwbp.arus1[2]} | ${gardu.lwbp.arus1[3]}${(gardu.lwbp.arus2[0] === '') ? '' : `\nArus jur 2 (A) : ${gardu.lwbp.arus2[0]} | ${gardu.lwbp.arus2[1]} | ${gardu.lwbp.arus2[2]} | ${gardu.lwbp.arus2[3]}`}${(gardu.lwbp.arus3[0] === '') ? '' : `\nArus jur 3 (A) : ${gardu.lwbp.arus3[0]} | ${gardu.lwbp.arus3[1]} | ${gardu.lwbp.arus3[2]} | ${gardu.lwbp.arus3[3]}`}${(gardu.lwbp.arus4[0] === '') ? '' : `\nArus jur 4 (A) : ${gardu.lwbp.arus4[0]} | ${gardu.lwbp.arus4[1]} | ${gardu.lwbp.arus4[2]} | ${gardu.lwbp.arus4[3]}`} 
Teg. RS/ST/TR (V) : ${gardu.lwbp.tegangan[0]} | ${gardu.lwbp.tegangan[1]} | ${gardu.lwbp.tegangan[2]}
Teg. RN/SN/TN (V) : ${gardu.lwbp.tegangan[3]} | ${gardu.lwbp.tegangan[4]} | ${gardu.lwbp.tegangan[5]}
Pembebanan : ${gardu.lwbp.beban[0]} kVA | ${gardu.lwbp.beban[1]} kW | ${gardu.lwbp.beban[2].replace('%', '')} %
Keterangan : ${gardu.lwbp.status[0]}${(gardu.lwbp.status[1] === '' || gardu.lwbp.status[1] === undefined) ? '' : ` ,${gardu.lwbp.status[1]}`}`

                clearTimeout(timeout);
                client.sendMessage(msg.from, theMessage);

            })
            .catch((err) => {
                log(err)
                clearTimeout(timeout);
                client.sendMessage(msg.from, 'Maaf, data tidak ditemukan');
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
Petugas Sebelumnya : ${piketCT.piketSebelum}`);
        })
    }
}

function handlePiketKeandalan(msg, client) {
    // CEK PETUGAS PIKET KEANDALAN
    if (msg.body.toLowerCase() === 'cek piket keandalan') {
        searchPiket().then(piketKeandalan => {
            client.sendMessage(msg.from, `*PETUGAS PIKET KEANDALAN*

*Hari/Tanggal   : ${piketKeandalan.waktu}*
*Petugas        : ${piketKeandalan.petugasSekarang}*
*Periode        : ${piketKeandalan.periode}*

Petugas Selanjutnya : ${piketKeandalan.petugasSelanjutnya}
Petugas Sebelumnya: ${piketKeandalan.petugasSebelumnya}`);
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
    handleGarduMessage,     // HANDLE PESAN GARDU
    handlePiketCS,          // HANDLE PIKET CS
    handlePiketDCC,         // HANDLE PIKET DCC
    handlePiketCT,          // HANDLE PIKET CT
    handlePiketKeandalan,   // HANDLE PIKET KEANDALAN
    handlePiketYantekAll,   // HANDLE PIKET YANTEK SEMUA
    handlePiketYantek,      // HANDLE PIKET YANTEK PER POSKO
    ping,                   // PING
    sendMessageToNumber,    // KIRIM PESAN KE NOMOR TERTENTU
    testButtons
}