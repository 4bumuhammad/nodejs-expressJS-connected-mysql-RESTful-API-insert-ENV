require('dotenv').config();

const express = require('express');
const mysql = require('mysql');

const app = express();

// Konfigurasi koneksi database MySQL
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  insecureAuth: process.env.DB_INSECUREAUTH
});

// Membuat koneksi ke database
connection.connect((err) => {
  if (err) {
    console.error('Koneksi ke database gagal: ', err);
  } else {
    console.log('Koneksi ke database berhasil');
  }
});

// Middleware untuk mengizinkan parsing body dari request
app.use(express.json());

// Route untuk menambahkan data baru ke database
app.post('/data', (req, res) => {
  const { intbiasa, intpositive } = req.body;

  // Query INSERT ke database
  const query = `INSERT INTO angka (intbiasa, intpositive) VALUES (?, ?)`;
  connection.query(query, [intbiasa, intpositive], (error, results) => {
    if (error) {
      console.error('Error saat menambahkan data: ', error);
      res.status(500).json({ error: 'Terjadi kesalahan saat menambahkan data.', detail : error.message});
    } else {
      res.status(201).json({ message: 'Data berhasil ditambahkan' });
    }
  });
});

// Menjalankan server
app.listen(3000, () => {
  console.log('Server berjalan pada port 3000');
});