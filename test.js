const { google } = require('googleapis');
const keys = require('./credentials.json'); // Ganti dengan nama file kredensial Anda
const moment = require('moment');
require('moment/locale/id');
moment.locale('id');

async function searchPiket(jenisPiket = 'keandalan') {
  try {
    const spreadsheetId = '1a6snBRjGbSejrGlWvFuDvAtcA68tye9eTOx9RFJzDPY';
    const client = new google.auth.JWT(keys.client_email, null, keys.private_key, ['https://www.googleapis.com/auth/spreadsheets']);
    await client.authorize();
    const sheets = google.sheets({ version: 'v4', auth: client });

    const now = new Date('2023-03-01T00:00:00.000Z');
    const bulan = now.toLocaleString('id-ID', { month: 'long', timeZone: 'Asia/Jakarta' });
    const dateBefore = new Date(now.getTime() - 24 * 60 * 60 * 1000).toLocaleDateString('en-US'); // tanggal sebelumnya
    const dateAfter = new Date(now.getTime() + 24 * 60 * 60 * 1000).toLocaleDateString('en-US'); // tanggal berikutnya
    const beforeIsSameMonth = bulan === new Date(dateBefore).toLocaleString('id-ID', { month: 'long', timeZone: 'Asia/Jakarta' }); // mengecek apakah bulan sebelumnya sama dengan bulan saat ini
    const afterIsSameMonth = bulan === new Date(dateAfter).toLocaleString('id-ID', { month: 'long', timeZone: 'Asia/Jakarta' }); // mengecek apakah bulan sesudah sama dengan bulan saat ini

    const res = await sheets.spreadsheets.values.get({ spreadsheetId, range: `${bulan}!B5:AG16` });
    const res2 = await sheets.spreadsheets.values.get({ spreadsheetId, range: `${bulan}!A6:A16` });
    const rows = res.data.values;
    const data = {};
    data.daftarPetugas = res2.data.values;
    rows.forEach((row, rowIndex) => {
      if (rowIndex === 0) {
        row.forEach((row1) => {
          data[row1] = [];
        });
      } else {
        row.forEach((row1, i) => {
          if (i == 31) return;
          data[i + 1].push(row1);
        });
      }
    });

    const formattedDate = moment().format('dddd, DD MMM YYYY');
    // const hour = now.toLocaleTimeString('en-GB', { timeZone: 'Asia/Jakarta' }).split(":")[0];
    const hour = 19;
    const piket = {};
    piket.waktu = formattedDate;
    piket.shift = (hour >= 8 && hour < 20) ? 'P' : 'S';
    piket.periode = (piket.shift == 'P') ? '08:00 - 16:00 WIB' : '16:00 - 08:00 WIB';
    const date = now.toLocaleDateString(undefined, { timeZone: 'Asia/Jakarta' }).split('/')[1];
    const petugasSekarang = (data[date] !== undefined) ? data[date].reduce((acc, sideData, i) => {
      if (sideData == piket.shift) {
        acc.push(data.daftarPetugas[i][0]);
      }
      return acc;
    }, []) : ['-'];
    let petugasSebelumnya;
    let petugasSetelahnya;

    if (piket.shift == 'P') {
      if (!beforeIsSameMonth) {
        const res3 = await sheets.spreadsheets.values.get({ spreadsheetId, range: `${new Date(dateBefore).toLocaleString('id-ID', { month: 'long', timeZone: 'Asia/Jakarta' })}!B5:AG16` });
        const rows3 = res3.data.values;
        const data3 = {};
        rows3.forEach((row, rowIndex) => {
          if (rowIndex === 0) {
            row.forEach((row1) => {
              data3[row1] = [];
            });
          } else {
            row.forEach((row1, i) => {
              if (i == 31) return;
              data3[i + 1].push(row1);
            });
          }
        });
        const sideDateBefore = dateBefore.toLocaleDateString(undefined, { timeZone: 'Asia/Jakarta' }).split('/')[1];
        petugasSebelumnya = (data[sideDateBefore] !== undefined) ? data[sideDateBefore].reduce((acc, sideData, i) => {
          if (sideData == 'S') {
            acc.push(data.daftarPetugas[i][0]);
          }
          return acc;
        }, []) : ['-'];
      } else {
        petugasSebelumnya = (data[date - 1] !== undefined) ? data[date - 1].reduce((acc, sideData, i) => {
          if (sideData == 'S') {
            acc.push(data.daftarPetugas[i][0]);
          }
          return acc;
        }, []) : ['-'];
      }
    }

    piket.petugasSekarang = convertString(petugasSekarang);
    piket.petugasSebelumnya = petugasSebelumnya;
    piket.petugasSelanjutnya = '-';
    // return piket;
    console.log(piket)
  } catch (error) {
    console.log("Error: ", error);
  }
}

function convertString(arr) {
  if (arr.length === 1) {
    return arr[0];
  } else if (arr.length === 2) {
    return arr.join(' & ');
  } else {
    const lastElement = arr.pop();
    return `${arr.join(', ')}, & ${lastElement}`;
  }
}

searchPiket();