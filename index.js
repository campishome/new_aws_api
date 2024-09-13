const express = require('express');
const mysql = require('mysql');
const cors = require('cors');  // นำเข้า cors
const app = express();
const PORT = 4000;

// ใช้งาน cors middleware
app.use(cors());

// ฟังก์ชันสำหรับสร้างการเชื่อมต่อฐานข้อมูลใหม่
const createDbConnection = () => {
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
  });

  // ตรวจสอบการเชื่อมต่อ
  db.on('error', (err) => {
    console.error('Database error:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      // การเชื่อมต่อถูกตัดการเชื่อมต่อให้ลองเชื่อมต่อใหม่
      createDbConnection();
    }
  });

  return db;
};

const db = createDbConnection();

app.listen(PORT, () => {
  console.log(`API Listening on PORT ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('API UWU');
});

app.get('/test', (req, res) => {
  res.send('This is test route');
});

app.get('/connect', (req, res) => {
  const query = 'SELECT * FROM LottoResult';  
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).send('Error fetching data.');
    } else {
      res.status(200).json(results);
    }
  });
});

module.exports = app;
