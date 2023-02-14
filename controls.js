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

        // try {
        //     let [result1, result2] = await Promise.allSettled([
        //         Promise.any([getPostpaidData(customer), getPrepaidData(customer)]),
        //         getACMTData(customer)
        //     ]);

        //     console.log(result1, result2);
        // } catch (error) {
        //     console.error(error);
        // }
        // Promise.any([getPostpaidData(customer), getPrepaidData(customer)])
        // Jenis : ${data.meter_number ? 'Prabayar' : 'Pascabayar'}${data.stand_meter ? `\n\nStan : ${data.stand_meter}` : ''}${data.amount ? `\nTagihan : Rp${(data.amount - 2500)}` : ''}${data.unpaid_bill ? `\nPeriode : ${data.unpaid_bill}` : ''}

        await getInquiryData(customer)
            .then(async (inquiryData) => {
                const ACMTData = await getACMTData((inquiryData.meter_number == "") ? customer : inquiryData.customer_number);
                return {
                    inquiryData,
                    ACMTData
                }
            })
            .then(async ({ inquiryData, ACMTData }) => {
                clearTimeout(timeout);
                client.sendMessage(msg.from, `*DATA PELANGGAN*

ID Pelanggan : ${(inquiryData.customer_number) != '' ? inquiryData.customer_number : ACMTData.idpel}
Nomor Meter : ${(inquiryData.meter_number) != '' ? inquiryData.meter_number : ACMTData.nomor_meter}
Nama : ${(inquiryData.customer_name) != '' ? inquiryData.customer_name : ACMTData.nama}
Tarif : ${(inquiryData.segmentation) != '' ? inquiryData.segmentation : ACMTData.tarif}
Daya : ${!isNaN(inquiryData.power) ? inquiryData.power : ACMTData.daya}
Gardu : ${ACMTData.gardu}
Tiang : ${ACMTData.tiang}
Merk Meter : ${ACMTData.merk_meter}

Lokasi : 
https://maps.google.com/maps?q=${ACMTData.latitude}8%2C${ACMTData.longitude}&z=17&hl=en`);

                // const url1 = `https://portalapp.iconpln.co.id/acmt/DisplayBlobServlet7?idpel=${ACMTData.idpel}`;
                // const statusFoto1 = await isAccessableImage(url1);
                // log(statusFoto1.message);
                // try {
                //     const foto1 = await MessageMedia.fromUrl(``, { unsafeMime: true });
                //     const foto2 = await MessageMedia.fromUrl(`https://portalapp.iconpln.co.id/acmt/DisplayBlobServlet1?idpel=${ACMTData.idpel}&blth=${ACMTData.blth}`, { unsafeMime: true });
                //     foto1.mimetype = "image/png";
                //     foto2.mimetype = "image/png";
                //     client.sendMessage(msg.from, foto1);
                //     client.sendMessage(msg.from, foto2);
                // } catch (err) {
                //     log(err);
                // }
            }).catch(() => {
                clearTimeout(timeout);
                client.sendMessage(msg.from, "Maaf, sistem gangguan. Silakan gunakan PLN Mobile.");
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
        const button = new Buttons('Button body', [{ body: 'Some text' }, { body: 'Try clicking me (id:test)', id: 'test' },], 'title', 'footer');
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