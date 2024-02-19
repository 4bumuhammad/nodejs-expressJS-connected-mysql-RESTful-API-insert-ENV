# nodejs sederhana dengan framework expressjs #

---


instalasi expressjs:

    > npm install express



pastikan sebelumnya telah menginstall paket diperlukan yaitu :

- mysql

    - cara install

        $ npm install mysql

        $ npm install dotenv

    - tampilkan list paket
    
        $ npm list

            ├── dotenv@16.0.3
  
            ├── express@4.18.0
        
            └── mysql@2.18.1



periksa file json dan buat file js secara manual serta isinya.

- package.json

- app.js

- .env

---

      ❯ cat .env

        DB_HOST=127.0.0.1
        DB_USER=root
        DB_PASSWORD=password
        DB_DATABASE=ujimysqlkudb
        DB_PORT=3309
        DB_INSECUREAUTH=true
        
    ---


jalankan (command) :

    ❯ node app.js
        op:
        Server running on port 3000


---


desclimer:

saat menjalankan pertama kali pada container mysql maka akan terdapat error sebagai berikut:

    ❯ node app.js


Server berjalan pada port 3000
Koneksi ke database gagal:  Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client

untuk mengatasi hal tersebut lakukan langkah berikut:


    ❯ mysql -h 127.0.0.1 -P 3309 -u root -p --ssl-mode=DISABLED
    
        mysql> ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'password';
        Query OK, 0 rows affected (0.03 sec)


        mysql> use ujimysqlkudb;
        
        mysql> select * from angka;
        
        +----------+------------+-------------+
        | autoincr | intbiasa   | intpositive |
        +----------+------------+-------------+
        |        1 |       1000 |           3 |
        |        2 |  777888999 |     1000000 |
        |        3 | 2100000000 |  4200000000 |
        |        4 | 2140000000 |  4290000000 |
        |        5 | 2147000000 |  4294000000 |
        |        6 | 2147100000 |  4294900000 |
        +----------+------------+-------------+
        6 rows in set (0.01 sec)


---

### lanjut coba jalankan kembali aplikasi

    ❯ node app.js

        Server berjalan pada port 3000
        Terhubung ke database MySQL

eksekusi dengan CURL:
- contoh 1

    curl -X POST -H "Content-Type: application/json" -d '{"intbiasa": 2147100000, "intpositive": 4294900000}' http://localhost:3000/data

        output :
        {"message":"Data berhasil ditambahkan"}%

- contoh 2 ( catatan : maximum int adalah 2,147,483,647)
  
    curl -X POST -H "Content-Type: application/json" -d '{"intbiasa": 2147490000, "intpositive": 4294900000}' http://localhost:3000/data

        output :
        {"error":"Terjadi kesalahan saat menambahkan data.","detail":"ER_WARN_DATA_OUT_OF_RANGE: Out of range value for column 'intbiasa' at row 1"}


---


### check data

    ❯ mysql -h 127.0.0.1 -P 3309 -u root -p --ssl-mode=DISABLED
        Enter password: password

        mysql> use ujimysqlkudb;
        mysql> select * from angka;

        +----------+------------+-------------+
        | autoincr | intbiasa   | intpositive |
        +----------+------------+-------------+
        |        1 |       1000 |           3 |
        |        2 |  777888999 |     1000000 |
        |        3 | 2100000000 |  4200000000 |
        |        4 | 2140000000 |  4290000000 |
        |        5 | 2147000000 |  4294000000 |
        |        6 | 2147100000 |  4294900000 |
        +----------+------------+-------------+
        6 rows in set (0.01 sec)
