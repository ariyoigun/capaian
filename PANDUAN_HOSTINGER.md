# PANDUAN LENGKAP KONEKSI & DEPLOYMENT HOSTINGER
## SISTEM INFORMASI CAPAIAN KINERJA & SATU DATA (SIDAT - SATUPUTARU)
**Dinas Pekerjaan Umum dan Penataan Ruang (DINPUTARU) Kabupaten Demak**

---

Panduan ini disusun secara rinci dan bertahap (*step-by-step*) agar Anda dapat menghubungkan web aplikasi **SIDAT - SATUPUTARU** dengan database **MySQL di Hostinger** sehingga aplikasi dapat langsung digunakan secara online di domain Anda.

---

## DAFTAR ISI
1. [Struktur File Database Siap Pakai](#1-struktur-file-database-siap-pakai)
2. [Langkah 1: Membuat Database MySQL di hPanel Hostinger](#langkah-1-membuat-database-mysql-di-hpanel-hostinger)
3. [Langkah 2: Mengimpor File SQL ke phpMyAdmin Hostinger](#langkah-2-mengimpor-file-sql-ke-phpmyadmin-hostinger)
4. [Langkah 3: Konfigurasi Koneksi Database Aplikasi](#langkah-3-konfigurasi-koneksi-database-aplikasi)
5. [Langkah 4: Menjalankan Aplikasi di Hostinger](#langkah-4-menjalankan-aplikasi-di-hostinger)
   - [Opsi A: Menggunakan Menu Node.js Application di hPanel (Shared/Cloud Hosting)](#opsi-a-menggunakan-menu-nodejs-application-di-hpanel)
   - [Opsi B: Menggunakan VPS Hostinger (PM2 + Nginx)](#opsi-b-menggunakan-vps-hostinger-pm2--nginx)
6. [Fitur Dual-Engine & Auto-Fallback Aman](#6-fitur-dual-engine--auto-fallback-aman)
7. [Daftar Akun Login Bawaan (7 Peran Aparatur)](#7-daftar-akun-login-bawaan-7-peran-aparatur)
8. [Uji Koneksi & Verifikasi Sistem](#8-uji-koneksi--verifikasi-sistem)

---

## 1. STRUKTUR FILE DATABASE SIAP PAKAI

File database MySQL telah disiapkan 100% lengkap dan siap diimpor di lokasi:
```
database/sidat_demak_hostinger.sql
```

File SQL ini berukuran ~100 KB dan sudah mencakup seluruh data:
- **`system_settings`**: Identitas instansi DINPUTARU, teks antarmuka, dan logo resmi PUPR.
- **`roles`**: 7 Peran resmi aparatur (Super Admin s.d. Kepala Dinas).
- **`bidang`**: Struktur 5 Bidang Teknis + 1 Sekretariat DINPUTARU Demak.
- **`users`**: 7 Akun resmi siap login langsung.
- **`categories`**: 6 Kategori Indikator resmi sesuai lembar kerja Renstra.
- **`indicators`**: 55 Indikator Kinerja lengkap dengan formulasi, definisi, dan polaritas.
- **`target_realisasi`**: 605 Baris data target & realisasi multi-tahun (2020 s.d. 2030) dengan kalkulasi persentase otomatis.
- **`bank_data`**: 20 Dataset resmi bersumber dari **BPS Kabupaten Demak (Kabupaten Demak Dalam Angka 2025)** mencakup jalan, irigasi, air minum, sanitasi, rob, dan penataan ruang.
- **`variables`**: Master variabel perhitungan indikator kinerja.

---

## LANGKAH 1: MEMBUAT DATABASE MYSQL DI hPANEL HOSTINGER

1. Masuk (*Log In*) ke **hPanel Hostinger** Anda (`https://hpanel.hostinger.com`).
2. Pada menu bilah sisi kiri, klik **Databases** -> **Management** (atau cari **MySQL Databases**).
3. Di bagian **Create a New MySQL Database and Database User**, masukkan data:
   - **MySQL Database Name**: misal `u123456789_sidat` (Hostinger akan otomatis menambahkan prefix akun Anda).
   - **MySQL Username**: misal `u123456789_admin`.
   - **Password**: Buat password yang kuat (contoh: `DemakJaya2026!*`).
4. Klik tombol **Create** / **Buat**.
5. **CATAT BAIK-BAIK**:
   - **MySQL Host**: biasanya `localhost` (atau IP yang tertera di hPanel Hostinger).
   - **Database Name**: nama lengkap database (contoh: `u123456789_sidat`).
   - **Username**: nama lengkap user (contoh: `u123456789_admin`).
   - **Password**: password yang baru saja Anda buat.
   - **Port**: `3306`.

---

## LANGKAH 2: MENGIMPOR FILE SQL KE phpMyAdmin HOSTINGER

1. Masih di halaman **Databases** hPanel Hostinger, cari tabel database yang baru Anda buat pada daftar **List of Current MySQL Databases**.
2. Klik tombol **Enter phpMyAdmin** di sebelah kanan nama database Anda.
3. Jendela phpMyAdmin akan terbuka.
4. Di bilah menu bagian atas phpMyAdmin, klik tab **Import**.
5. Klik tombol **Choose File** / **Pilih Berkas**, lalu arahkan ke file:
   ```
   database/sidat_demak_hostinger.sql
   ```
6. Pastikan pengaturan *Format* adalah **SQL**.
7. Gulir ke bagian paling bawah dan klik tombol **Import** (atau **Go**).
8. Tunggu beberapa detik hingga muncul pesan sukses berwarna hijau:
   > *"Import has been successfully finished, 9 queries executed."*
9. Anda sekarang dapat melihat 9 tabel (`bank_data`, `bidang`, `categories`, `indicators`, `roles`, `system_settings`, `target_realisasi`, `users`, `variables`) sudah terisi penuh data.

---

## LANGKAH 3: KONFIGURASI KONEKSI DATABASE APLIKASI

Aplikasi SIDAT - SATUPUTARU menyediakan **3 cara mudah** untuk mengatur kredensial koneksi:

### Cara 1: Mengatur Melalui Panel Admin (Paling Mudah, Tanpa Edit File)
1. Buka aplikasi di browser Anda.
2. Klik tombol **Login** di pojok kanan atas.
3. Masuk menggunakan akun Super Admin:
   - **Username**: `superadmin`
   - **Password**: `password123`
   - Selesaikan Captcha matematika sederhana.
4. Di panel aparatur, klik tab **Pengaturan Teks & Logo**.
5. Gulir ke bagian **Konfigurasi Database MySQL Hostinger**.
6. Masukkan data yang Anda catat pada Langkah 1:
   - **Host Database**: `localhost`
   - **Port**: `3306`
   - **Nama Database**: nama database Hostinger Anda (contoh: `u123456789_sidat`)
   - **Username MySQL**: user database Hostinger Anda (contoh: `u123456789_admin`)
   - **Password**: password database Hostinger Anda
   - Centang kotak: **Aktifkan Koneksi MySQL Hostinger**
7. Klik tombol **Tes Koneksi Database**. Sistem akan langsung memvalidasi koneksi ke server MySQL Hostinger dan menampilkan notifikasi sukses hijau.
8. Klik tombol **Simpan Konfigurasi Database**.

---

### Cara 2: Melalui File `config/db.json`
Buka berkas `config/db.json` di file manager Hostinger / kode lokal, lalu sesuaikan:
```json
{
  "host": "localhost",
  "port": 3306,
  "user": "u123456789_admin",
  "password": "PasswordDatabaseAnda",
  "database": "u123456789_sidat",
  "enabled": true
}
```

---

### Cara 3: Melalui File Lingkungan `.env`
Jika server Anda mendukung variabel lingkungan `.env`, cukup ubah berkas `.env`:
```env
PORT=3003
NODE_ENV=production

DB_ENABLED=true
DB_HOST=localhost
DB_PORT=3306
DB_USER=u123456789_admin
DB_PASSWORD=PasswordDatabaseAnda
DB_NAME=u123456789_sidat
```

---

## LANGKAH 4: MENJALANKAN APLIKASI DI HOSTINGER

### Opsi A: Menggunakan Menu Node.js Application di hPanel
Jika paket hosting Anda adalah **Cloud Hosting / Business Hosting** yang memiliki fitur **Node.js**:

1. Unggah seluruh file proyek ke folder domain Anda di Hostinger (misal melalui File Manager atau Git Deployment di hPanel).
2. Di hPanel Hostinger, cari dan buka menu **Node.js**.
3. Klik **Create Application**:
   - **Node.js version**: Pilih versi **20.x LTS** atau **18.x LTS**.
   - **Application root**: pilih folder tempat file proyek berada (contoh: `public_html` atau `sidat`).
   - **Application startup file**: isi dengan `server.js`.
4. Klik **Create**.
5. Setelah dibuat, klik tombol **npm install** pada menu Node.js tersebut untuk menginstal modul pendukung (`mysql2`).
6. Klik tombol **Restart** / **Start Application**.
7. Akses domain Anda (contoh: `https://namadomainanda.com`). Aplikasi SIDAT - SATUPUTARU langsung aktif!

---

### Opsi B: Menggunakan VPS Hostinger (PM2 + Nginx)
Jika Anda menggunakan paket **VPS Hostinger (Ubuntu/Debian)**:

1. Masuk ke VPS Anda via SSH:
   ```bash
   ssh root@ip_vps_anda
   ```
2. Pastikan Node.js dan Git sudah terpasang:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs git
   sudo npm install -g pm2
   ```
3. Unduh repositori aplikasi:
   ```bash
   cd /var/www
   git clone https://github.com/ariyoigun/capaian.git sidat
   cd sidat
   npm install
   ```
4. Salin dan sesuaikan konfigurasi database:
   ```bash
   cp .env.example .env
   nano .env
   ```
   *(Isi kredensial MySQL sesuai database Hostinger Anda)*
5. Jalankan aplikasi menggunakan PM2:
   ```bash
   pm2 start server.js --name "sidat-demak"
   pm2 save
   pm2 startup
   ```
6. Konfigurasikan Nginx sebagai reverse proxy ke port `3003`:
   ```nginx
   server {
       listen 80;
       server_name domainanda.com www.domainanda.com;

       location / {
           proxy_pass http://127.0.0.1:3003;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       }
   }
   ```
7. Uji dan restart Nginx:
   ```bash
   sudo nginx -t
   sudo systemctl restart nginx
   ```
8. Pasang SSL gratis (HTTPS):
   ```bash
   sudo apt install -y certbot python3-certbot-nginx
   sudo certbot --nginx -d domainanda.com -d www.domainanda.com
   ```

---

## 6. FITUR DUAL-ENGINE & AUTO-FALLBACK AMAN

Sistem SIDAT - SATUPUTARU dirancang dengan prinsip **Zero Downtime**:
- **Saat MySQL Hostinger Aktif**: Seluruh data dibaca dan disimpan langsung ke database relasional MySQL Hostinger.
- **Saat MySQL Tidak Tersedia / Maintenance**: Sistem **tidak akan error atau mati**. Mesin otomatis beralih ke mesin penyimpanan data lokal JSON (`data/database.json`), sehingga layanan publik warga Demak tetap berjalan 24 jam nonstop tanpa gangguan.
- Status koneksi mesin database dapat selalu dipantau secara langsung di header modul Pengaturan Super Admin.

---

## 7. DAFTAR AKUN LOGIN BAWAAN (7 PERAN APARATUR)

Semua akun telah terdaftar di database MySQL dengan password standar: `password123`

| No | Peran / Jabatan | Username | Password | Wewenang Akses Utama |
|---|---|---|---|---|
| 1 | **Super Admin** | `superadmin` | `password123` | Akses penuh seluruh modul, ganti logo, edit teks FE/BE, manajemen user, config database |
| 2 | **Kepala Dinas** | `kadin` | `password123` | Dashboard eksekutif IKU & strategis, grafik tren daerah, persetujuan laporan |
| 3 | **Sekretaris Dinas** | `sekretaris` | `password123` | Monitoring capaian lintas 5 bidang, evaluasi kinerja tahunan, unduh rekap |
| 4 | **Kasubag Program & Keuangan** | `kasubag_program` | `password123` | Monitoring target Renstra, cetak laporan resmi per indikator & tahunan |
| 5 | **Kasubag Umum & Kepegawaian** | `kasubag_umum` | `password123` | Bank data arsip kedinasan, sarana prasarana, inventarisasi data |
| 6 | **Kepala Bidang Bina Marga** | `kabid_bm` | `password123` | Monitoring teknis capaian jalan jembatan, evaluasi diagram kemantapan |
| 7 | **Koordinator Bidang Bina Marga** | `koor_bm` | `password123` | Input & update target/realisasi indikator bidang, kelola data teknis |

*(Catatan: Anda dapat mengubah password dan data akun kapan saja melalui menu Manajemen User setelah login sebagai Super Admin).*

---

## 8. UJI KONEKSI & VERIFIKASI SISTEM

Setelah melakukan instalasi dan koneksi, verifikasi beberapa hal berikut di browser:
1. **Tampilan Publik**:
   - Header berwarna Biru Resmi Kementerian PUPR (`#0B3C84`) dengan logo PUPR.
   - Tombol **Mode Malam** berfungsi mengubah tema terang / gelap secara instan.
   - Tiga tab utama publik aktif:
     1. *Indikator & Grafik Tren*
     2. *Matriks Multi-Tahun (2020–2030)*
     3. *Bank Data DINPUTARU (Data BPS Demak 2025)*
   - Fitur pencarian Bank Data dan filter bidang berfungsi responsif.
2. **Login & Dashboard Internal**:
   - Klik tombol **Login** di header kanan atas.
   - Masukkan username `superadmin` dan password `password123` + selesaikan Captcha.
   - Pastikan masuk ke Dashboard Internal Aparatur.
   - Menu **Laporan Kinerja Resmi (Cetak / PDF)** dapat dibuka dan dicetak.
   - Masuk ke tab **Pengaturan Teks & Logo**: logo dapat diganti via berkas gambar lokal atau link gambar, dan status MySQL Hostinger tertera **Terhubung**.

Selamat! Aplikasi **SIDAT - SATUPUTARU** telah berhasil terkoneksi dengan database MySQL Hostinger dan siap digunakan melayani masyarakat serta jajaran DINPUTARU Kabupaten Demak.

