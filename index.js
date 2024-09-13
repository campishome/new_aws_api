const express = require('express');
const mysql = require('mysql');
const app = express();
const PORT = 4000;

const db = mysql.createConnection({
  host: '47.129.222.47',
  user: 'camp',
  password: 'camp',
  database: 'mobile_project',
  port: 3306
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database.');

  // เริ่มฟังที่พอร์ตหลังจากการเชื่อมต่อฐานข้อมูลสำเร็จ
  app.listen(PORT, () => {
    console.log(`API Listening on PORT ${PORT}`);
  });
});

app.get('/', (req, res) => {
  res.send('API UWU');
});

app.get('/test', (req, res) => {
  res.send('This is test route');
});

app.get('/connect', (req, res) => {
  const query = 'SELECT * FROM LottoResult';  // ใช้ตารางที่คุณต้องการ
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).send('Error fetching data.');
    } else {
      res.status(200).json(results);  // ส่งข้อมูลในรูปแบบ JSON
    }
  });
});

module.exports = app;
