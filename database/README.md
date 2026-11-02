# 🗄️ Panduan Database SIDAT - SATUPUTARU
**Sistem Informasi Capaian Kinerja & Satu Data Kab. Demak**  
**Dinas Pekerjaan Umum dan Penataan Ruang (DINPUTARU) Kabupaten Demak**

---

## 📋 Daftar Isi Berkas Database
Direktori ini berisi skrip SQL dan modul koneksi database relasional:
1. [`schema.sql`](file:///c:/Users/DINPUTARU/Documents/AntiG/Capaian/database/schema.sql) : Struktur tabel, relasi foreign key, tipe data, indeks, dan kolom kalkulasi capaian.
2. [`seed.sql`](file:///c:/Users/DINPUTARU/Documents/AntiG/Capaian/database/seed.sql) : Data awal resmi DINPUTARU Kabupaten Demak (Peran, Bidang, Pengguna, Indikator Kinerja 2020–2026, dan Pengaturan Sistem).
3. [`db.js`](file:///c:/Users/DINPUTARU/Documents/AntiG/Capaian/database/db.js) : Modul konektor Node.js yang mendukung MySQL/MariaDB, PostgreSQL, serta fallback otomatis ke JSON.
4. [`.env.example`](file:///c:/Users/DINPUTARU/Documents/AntiG/Capaian/.env.example) : Template konfigurasi koneksi database.

---

## 🏛️ Struktur Tabel Database

| Nama Tabel | Fungsi & Deskripsi |
| :--- | :--- |
| **`roles`** | Daftar hak akses sistem (Super Admin, Kepala Dinas, Sekretaris, Koordinator Bidang, dll.). |
| **`bidang`** | Struktur organisasi DINPUTARU (Bina Marga, SDA, Cipta Karya, Tata Ruang, Bina Konstruksi, Sekretariat). |
| **`users`** | Data akun pegawai, username, password, NIP, email kedinasan, dan status keaktifan. |
| **`categories`** | Klasifikasi indikator: **IKU** (Segmen 1), **IKD** (Segmen 2), **IKP** (Segmen 3), dan **IKK** (Segmen 4). |
| **`indicators`** | Master data indikator, definisi operasional, formulasi matematis, sumber data, dan wewenang bidang pengampu. |
| **`target_realisasi`** | Data numerik Target & Realisasi tahun 2020 s.d. 2026, persentase capaian, status predikat, dan catatan evaluasi. |
| **`documents`** | Bank Data dokumen kedinasan (SK, DED, Dokumen SAKIP/LKjIP, dan data geospasial). |
| **`system_settings`** | Parameter aplikasi, alamat dinas, nomor kontak, serta array tahun yang tampil di portal publik (`visibleYears`). |

---

## 🚀 Panduan Menghubungkan ke MySQL / MariaDB (XAMPP / Laragon / Server)

### Langkah 1: Buat Database Baru
Buka terminal MySQL atau **phpMyAdmin**, kemudian jalankan perintah:
```sql
CREATE DATABASE sidat_satuputaru CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### Langkah 2: Import Skema & Data Awal
- **Melalui Terminal / Command Prompt:**
```bash
mysql -u root -p sidat_satuputaru < database/schema.sql
mysql -u root -p sidat_satuputaru < database/seed.sql
```
- **Melalui phpMyAdmin / DBeaver:**
  1. Pilih database `sidat_satuputaru`.
  2. Buka tab **Import**.
  3. Upload `database/schema.sql` lalu klik **Go**.
  4. Ulangi untuk meng-upload `database/seed.sql`.

### Langkah 3: Install Driver Database di Node.js
Jika menggunakan MySQL, pasang package `mysql2`:
```bash
npm install mysql2
```

### Langkah 4: Buat File `.env`
Salin file `.env.example` menjadi `.env`, lalu sesuaikan kredensial database Anda:
```env
PORT=3003
DB_CLIENT=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=sidat_satuputaru
```

---

## 🐘 Panduan Menghubungkan ke PostgreSQL

### Langkah 1: Buat Database PostgreSQL
Buka **pgAdmin** atau terminal `psql`:
```sql
CREATE DATABASE sidat_satuputaru;
```

### Langkah 2: Import Skema & Data Awal
```bash
psql -U postgres -d sidat_satuputaru -f database/schema.sql
psql -U postgres -d sidat_satuputaru -f database/seed.sql
```

### Langkah 3: Pasang Driver PostgreSQL
```bash
npm install pg
```

### Langkah 4: Sesuaikan File `.env`
```env
PORT=3003
DB_CLIENT=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password_anda
DB_NAME=sidat_satuputaru
```

---

## 🔄 Mekanisme Fallback Otomatis
Jika server database SQL belum diaktifkan atau konfigurasi `.env` belum diisi, aplikasi akan secara otomatis menggunakan penyimpanan lokal [`data/database.json`](file:///c:/Users/DINPUTARU/Documents/AntiG/Capaian/data/database.json) tanpa menimbulkan gangguan atau error pada sistem.
