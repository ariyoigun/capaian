# PANDUAN LENGKAP KONEKSI DATABASE & DEPLOYMENT HOSTINGER
## SISTEM INFORMASI CAPAIAN KINERJA & SATU DATA (SIDAT - SATU PUTARU)
**Dinas Pekerjaan Umum dan Penataan Ruang (DINPUTARU) Kabupaten Demak**
**Domain Terpasang:** `https://sidat.satuputarudemak.id`

---

Panduan ini disusun secara rinci langkah demi langkah (*step-by-step*) khusus untuk menghubungkan web aplikasi **SIDAT - SATU PUTARU** yang sudah tersinkronisasi dari GitHub ke domain **`sidat.satuputarudemak.id`** dengan database **MySQL di Hostinger**.

---

## DAFTAR ISI
1. [Berkas Database Siap Pakai](#1-berkas-database-siap-pakai)
2. [Langkah 1: Membuat Database MySQL di hPanel Hostinger](#langkah-1-membuat-database-mysql-di-hpanel-hostinger)
3. [Langkah 2: Mengimpor Database SQL ke phpMyAdmin](#langkah-2-mengimpor-database-sql-ke-phpmyadmin)
4. [Langkah 3: Menghubungkan SIDAT dengan Database MySQL](#langkah-3-menghubungkan-sidat-dengan-database-mysql)
   - [Opsi A: Mengatur dari Panel Admin Web (Tanpa Edit File)](#opsi-a-mengatur-dari-panel-admin-web-paling-mudah)
   - [Opsi B: Mengedit File config/db.json di File Manager Hostinger](#opsi-b-mengedit-file-configdbjson-di-file-manager)
   - [Opsi C: Mengatur File .env](#opsi-c-mengatur-file-env)
5. [Langkah 4: Menjalankan Aplikasi di Hostinger](#langkah-4-menjalankan-aplikasi-di-hostinger)
   - [Model 1: Hostinger Web Hosting Standar (Otomatis via Apache/LiteSpeed & PHP Bridge)](#model-1-hostinger-web-hosting-standar-otomatis-aktif)
   - [Model 2: Hostinger Cloud / Business Hosting (Menu Node.js Application)](#model-2-hostinger-cloud--business-hosting-fitur-nodejs)
   - [Model 3: Hostinger Cloud VPS (PM2 & Nginx)](#model-3-hostinger-cloud-vps-pm2--nginx)
6. [Daftar Akun Pengguna & Password (7 Peran Aparatur DINPUTARU)](#6-daftar-akun-pengguna--password)
7. [Pengecekan & Verifikasi Hasil](#7-pengecekan--verifikasi-hasil)

---

## 1. BERKAS DATABASE SIAP PAKAI

Aplikasi telah dilengkapi berkas database SQL lengkap yang siap diimpor ke MySQL Hostinger:
* **Lokasi Berkas Utama:** `database/sidat_demak_hostinger.sql`
* **Salinan Berkas di Root:** `database.sql`

### Isi & Struktur Tabel Database (9 Tabel Utama):
1. **`system_settings`**: Menyimpan identitas aplikasi, nama instansi DINPUTARU, teks antarmuka, pengaturan tahun aktif, dan URL logo resmi PUPR.
2. **`roles`**: 7 Peran resmi aparatur (Super Admin, Kepala Dinas, Sekretaris, Kepala Bidang, Koordinator Bidang, Kasubag Program, Kasubag Umum).
3. **`bidang`**: Struktur organisasi 5 Bidang Teknis (Bina Marga, SDA, Cipta Karya, Tata Ruang, Bina Konstruksi) + 1 Sekretariat Dinas.
4. **`users`**: 8 Akun aparatur internal lengkap dengan NIP, nomor kontak, wewenang peran, dan password siap login.
5. **`categories`**: 6 Kategori Indikator resmi sesuai lembar kerja Renstra (IKU Daerah, IKD, IKU PD, IKK, PROGRAM, TUJUAN-SASARAN).
6. **`indicators`**: 55 Indikator Kinerja lengkap dengan kode, nama, definisi operasional, rumus formulasi, polaritas (*maximize/minimize*), wewenang bidang, dan seksi penanggung jawab.
7. **`target_realisasi`**: 605 Baris data target dan realisasi dari tahun **2020 s.d. 2030** dengan kolom kalkulasi otomatis persentase capaian.
8. **`bank_data`**: 20 Dataset resmi bersumber dari **BPS Kabupaten Demak (Kabupaten Demak Dalam Angka 2025)** serta laporan teknis kedinasan, dilengkapi angka metrik kunci, nomor registrasi, sumber data, dan ringkasan statistik.
9. **`variables`**: Master variabel perhitungan matematis indikator kinerja.

---

## LANGKAH 1: MEMBUAT DATABASE MYSQL DI hPANEL HOSTINGER

1. Buka dan masuk ke **hPanel Hostinger**: [https://hpanel.hostinger.com](https://hpanel.hostinger.com).
2. Pilih akun hosting Anda yang memuat domain **`sidat.satuputarudemak.id`**.
3. Pada bilah menu sebelah kiri, buka menu **Databases** ➔ **Management** (atau cari **MySQL Databases**).
4. Pada bagian **Create a New MySQL Database and Database User**, masukkan informasi:
   * **MySQL Database Name**: misal ketik `sidat` (Hostinger akan menambahkan prefiks username akun Anda, contoh: `u123456789_sidat`).
   * **MySQL Username**: misal ketik `admin` (contoh hasil: `u123456789_admin`).
   * **Password**: Buat kata sandi yang kuat (contoh: `DemakPUPR2026!#`).
5. Klik tombol **Create** / **Buat**.
6. **CATAT 4 DATA PENTING INI**:
   * **MySQL Host**: `localhost` (Hostinger selalu menggunakan `localhost` untuk web hosting internal).
   * **Database Name**: nama lengkap database Anda (contoh: `u123456789_sidat`).
   * **Username**: nama lengkap pengguna MySQL (contoh: `u123456789_admin`).
   * **Password**: kata sandi yang baru saja Anda buat.
   * **Port**: `3306`.

---

## LANGKAH 2: MENGIMPOR DATABASE SQL KE phpMyAdmin

1. Masih di halaman **Databases** hPanel Hostinger, lihat daftar **List of Current MySQL Databases**.
2. Di sebelah kanan baris database yang baru Anda buat, klik tombol **Enter phpMyAdmin**.
3. Jendela **phpMyAdmin** akan terbuka secara otomatis di tab baru browser.
4. Di bilah menu atas phpMyAdmin, klik tab **Import** (Impor).
5. Pada bagian *File to import*, klik tombol **Choose File** / **Pilih Berkas**, lalu pilih berkas:
   ```
   database/sidat_demak_hostinger.sql
   ```
   *(atau berkas `database.sql` yang berada di folder utama proyek).*
6. Pastikan pilihan Format adalah **SQL**.
7. Gulir ke bawah dan klik tombol **Import** (atau **Go**).
8. Tunggu beberapa detik hingga muncul notifikasi sukses berwarna hijau:
   > *"Import has been successfully finished, queries executed."*
9. Di bilah kiri phpMyAdmin, klik nama database Anda. Pastikan **9 tabel** telah terbentuk dan terisi data dengan benar.

---

## LANGKAH 3: MENGHUBUNGKAN SIDAT DENGAN DATABASE MYSQL

Aplikasi SIDAT - SATU PUTARU telah dilengkapi fitur **Dual-Engine Auto-Detect**. Anda dapat memasukkan kredensial database dengan salah satu dari 3 cara berikut:

### OPSI A: Mengatur dari Panel Admin Web (Paling Mudah)
1. Buka browser dan akses: **`https://sidat.satuputarudemak.id`**
2. Klik tombol **Login** di pojok kanan atas.
3. Masuk dengan akun Super Admin:
   * **Username**: `superadmin`
   * **Password**: `password123`
   * Masukkan hasil perhitungan Captcha matematika.
4. Setelah masuk ke Dashboard Internal, pada bilah menu sisi kiri klik menu **Koneksi Database MySQL** (di bawah kelompok *Menu Khusus Admin*).
5. Pada formulir konfigurasi database:
   * **Database Host**: ketik `localhost`
   * **Port MySQL**: `3306`
   * **Nama Database (DB Name)**: masukkan nama database Hostinger Anda (contoh: `u123456789_sidat`)
   * **Username Database (DB User)**: masukkan username Hostinger Anda (contoh: `u123456789_admin`)
   * **Password Database**: masukkan kata sandi MySQL Anda
   * Beri tanda centang pada: **Aktifkan MySQL**
6. Klik tombol biru **Uji Tes Koneksi MySQL**.
   * Jika benar, akan langsung muncul notifikasi hijau: *"Koneksi berhasil! Database siap digunakan."*
7. Klik tombol **Simpan Konfigurasi DB**. Sistem akan menyimpan konfigurasi ke server dan status database berubah menjadi **MySQL Hostinger Terhubung**.

---

### OPSI B: Mengedit File `config/db.json` di File Manager
Jika Anda lebih suka mengatur langsung berkas di Hostinger:
1. Di hPanel Hostinger, buka **Files** ➔ **File Manager**.
2. Masuk ke folder instalasi domain `sidat.satuputarudemak.id` (biasanya `public_html`).
3. Buka folder `config/`, lalu buat atau sunting berkas `db.json`:
   ```json
   {
     "host": "localhost",
     "port": 3306,
     "user": "u123456789_admin",
     "password": "PasswordMySQLAnda",
     "database": "u123456789_sidat",
     "enabled": true
   }
   ```
4. Simpan berkas (*Save & Close*).

---

### OPSI C: Mengatur File `.env`
Buka atau buat berkas `.env` di folder utama aplikasi:
```env
PORT=3003
NODE_ENV=production

DB_ENABLED=true
DB_HOST=localhost
DB_PORT=3306
DB_USER=u123456789_admin
DB_PASSWORD=PasswordMySQLAnda
DB_NAME=u123456789_sidat
```

---

## LANGKAH 4: MENJALANKAN APLIKASI DI HOSTINGER

Sesuaikan dengan jenis paket hosting yang Anda miliki di Hostinger:

### MODEL 1: Hostinger Web Hosting Standar (Otomatis Aktif)
*(Paket Single, Premium, atau Business Web Hosting berbasis LiteSpeed/Apache)*

* Proyek ini sudah dilengkapi file **`.htaccess`** dan backend bridge **`api.php`**.
* Begitu Anda melakukan sinkronisasi Git dari repositori GitHub ke `public_html`, aplikasi **langsung aktif bekerja secara otomatis**:
  * Tampilan publik (`index.html`) langsung terbuka di peramban.
  * Permintaan API (`/api/db/*`, `/api/admin/*`, `/api/auth/*`) otomatis diarahkan oleh `.htaccess` ke `api.php`.
  * Seluruh data disimpan dan disinkronkan secara aman.

---

### MODEL 2: Hostinger Cloud / Business Hosting (Fitur Node.js)
Jika paket hosting Anda menyediakan menu **Node.js** di hPanel:

1. Di hPanel, buka menu **Node.js**.
2. Klik tombol **Create Application**:
   * **Node.js version**: Pilih versi **20.x LTS** (atau 18.x LTS).
   * **Application root**: pilih folder tempat file berada (contoh: `public_html`).
   * **Application startup file**: isi dengan `server.js`.
3. Klik **Create**.
4. Klik tombol **Run npm install** pada panel Node.js tersebut agar dependensi `mysql2` terpasang.
5. Klik **Restart Application**.
6. Buka `https://sidat.satuputarudemak.id`.

---

### MODEL 3: Hostinger Cloud VPS (PM2 & Nginx)
Jika Anda menggunakan paket VPS Hostinger:

1. Masuk ke VPS via SSH:
   ```bash
   ssh root@IP_VPS_ANDA
   ```
2. Pasang dependensi dan clone repositori:
   ```bash
   cd /var/www/sidat
   git pull origin main
   npm install
   ```
3. Jalankan aplikasi menggunakan PM2:
   ```bash
   pm2 start server.js --name "sidat-demak"
   pm2 save
   pm2 startup
   ```
4. Konfigurasikan Nginx Reverse Proxy ke port `3003` dan aktifkan SSL Certbot:
   ```bash
   sudo certbot --nginx -d sidat.satuputarudemak.id
   ```

---

## 6. DAFTAR AKUN PENGGUNA & PASSWORD

Seluruh akun telah disematkan di dalam database SQL (`users`) dan siap login langsung dengan password bawaan:

| No | Username | Password | Nama Lengkap & Gelar | Jabatan & Peran di DINPUTARU |
|:---:|:---|:---|:---|:---|
| 1 | **`superadmin`** | `password123` | Budi Santoso, S.T., M.T. | **Super Admin** (Akses Penuh Seluruh Sistem) |
| 2 | **`kadin`** | `password123` | Drs. H. Ahmad Sugiharto, S.T., M.Si. | **Kepala Dinas** (Dashboard Eksekutif Kinerja & Pengesahan) |
| 3 | **`sekdin`** | `password123` | Nurul Hidayati, S.T., M.M. | **Sekretaris Dinas** (Monitoring Kinerja Lintas Bidang & Laporan) |
| 4 | **`kabid_bm`** | `password123` | Sutanto, S.T., M.Tech. | **Kepala Bidang Bina Marga** (Monitoring Infrastruktur Jalan) |
| 5 | **`koor_bm`** | `password123` | Rizky Kurniawan, S.T. | **Koordinator Bidang Bina Marga** (Input Target & Realisasi) |
| 6 | **`koor_sda`** | `password123` | Tri Wahyudi, S.T. | **Koordinator Bidang Sumber Daya Air** (Input Irigasi & Drainase) |
| 7 | **`kasubag_program`** | `password123` | Eko Prasetyo, S.E., M.Acc. | **Kasubag Program & Keuangan** (Renstra, Target, & Cetak Laporan) |
| 8 | **`kasubag_umum`** | `password123` | Siti Rahmawati, S.Sos. | **Kasubag Umum & Kepegawaian** (Bank Data & Administrasi) |

> [!TIP]
> Demi keamanan, setelah Anda berhasil login pertama kali sebagai `superadmin`, Anda dapat mengubah password dan data aparatur melalui menu **Manajemen Pengguna (7 Peran)**.

---

## 7. PENGECEKAN & VERIFIKASI HASIL

Untuk memastikan sistem Anda berjalan sempurna 100%:

1. **Akses Publik:**
   Buka `https://sidat.satuputarudemak.id`. Pastikan ketiga menu publik bekerja lancar:
   * **Indikator & Grafik Tren**: 55 Indikator terfilter per kategori, grafik Chart.js tampil rapi.
   * **Matriks Multi-Tahun**: Tabel matriks 2020 s.d. 2030 lengkap dengan tombol unduh CSV/Excel.
   * **Bank Data BPS 2025**: Menampilkan 20 data infrastruktur dalam format **2 kolom** dan fitur pencarian reaktif.
2. **Dashboard Internal Aparatur:**
   * Klik tombol **Login** di header, masukkan akun `superadmin` dan `password123`.
   * Buka menu **Diagram Pohon Cascading (Tree View)**: diagram pohon hierarki kinerja muncul utuh dan bisa diklik (*expand/collapse*).
   * Buka menu **Input Target & Realisasi**: tombol *+ Tambah Tahun Baru*, *Atur Tampilan Tahun*, dan *Ekspor CSV* aktif penuh.
   * Buka menu **Laporan Resmi (Cetak)**: dropdown 55 indikator terisi penuh, lembar berkas kedinasan siap dicetak/PDF.
   * Buka menu **Koneksi Database MySQL**: badge menunjukkan status **MySQL Hostinger Terhubung**.

---
*Dokumen ini diterbitkan oleh DINPUTARU Kabupaten Demak untuk kelancaran operasional SIDAT - SATU PUTARU.*
