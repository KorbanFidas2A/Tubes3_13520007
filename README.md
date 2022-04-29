# DNA Pattern Matching Web Application
> Tugas Besar 3 IF2211 Strategi Algoritma Semester II Tahun 2021/2022 by Kelompok 8 Regexerigo.
> Web Application kami deploy ke [_tautan_](https://cocokgen.netlify.app/) berikut.

## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Screenshots](#screenshots)
* [Backend Setup](#backend-setup)
* [Frontend Setup](#frontend-setup)
* [Local Usage](#local-usage)
* [Remote Usage](#remote-usage)
* [Contributors](#contributors)


## General Information
Program ini adalah web application untuk melakukan DNA pattern matching dengan suatu DNA sequence dari penyakit. Algoritma yang digunakan untuk pattern matching adalah algoritma Knutt-Morris-Pratt (KMP) dan menggunakan algoritma Longest Common Subsequence (LCS) untuk memberikan tingkat kemiripan pattern pada teks yang diuji.



## Technologies Used
- MongoDB
- Express.js
- React.js
- Node.js 
- Mongoose


## Features
- Prediksi penyakit
- Melihat, mencari, dan menghapus riwayat prediksi penyakit
- Menambah dan menghapus data penyakit


## Backend Setup
1. Pastikan sudah install Node.js di perangkat anda.
2. Install nodemon package dengan menulis `npm install -g nodemon` di command prompt.
3. Buat file `.env` di directory saat ini dan salin kode berikut ke dalamnya.
```
ATLAS_URI=mongodb+srv://tubes3stima:initubesbersama@tubesstima3.wccx3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
```
4. Buka kembali command prompt sebelumnya dan jalankan `nodemon index`.
5. Biarkan backend berjalan dan jangan tutup command prompt hingga anda selesai menggunakan program.

## Frontend Setup
1. Pastikan sudah install Node.js di perangkat anda.
2. Install vite package dengan menulis `npm install vite` di command prompt.
3. Jalankan `npm run dev` dan salin link Local yang diberikan, anda juga dapat menggunakan link Network pada perangkat lain yang terjaring menggunakan WiFi yang sama.
4. Biarkan frontend berjalan dan jangan tutup command prompt hingga anda selesai menggunakan program.

## Local Usage
1. Download repository ini dalam bentuk zip dan extract.
2. Buka command prompt di directory repository yang sudah di-extract.
3. Change directory ke `..\src\server` dan jalankan [Backend Setup](#backend-setup).
4. Buka command prompt baru di directory repository yang sudah di-extract.
5. Change directory ke `..\src\client` dan jalankan [Frontend Setup](#frontend-setup).
6. Web Application dapat digunakan untuk melakukan pattern matching prediksi penyakit dan mencari riwayat prediksi.

## Remote Usage
1. Buka Web Application yang telah kami deploy ke [_tautan_](https://cocokgen.netlify.app/) berikut.
2. Web Application dapat digunakan untuk melakukan pattern matching prediksi penyakit dan mencari riwayat prediksi.

## Contributors
- [Nadia Mareta Putri Leiden | 13520007 | K01](https://github.com/KorbanFidas2A)
- [Muhammad Helmi Hibatullah | 13520014 | K02](https://github.com/mhelmih)
- [Taufan Fajarama Putrawansyah R | 13520031 | K01](https://github.com/roastland)
