# SIDAT - SATUPUTARU - Sistem Informasi Capaian Kinerja DINPUTARU
### Dinas Pekerjaan Umum dan Penataan Ruang (DINPUTARU) Kabupaten Demak

**SIDAT - SATUPUTARU** adalah aplikasi web monitoring target & capaian kinerja indikator infrastruktur ke-PU-an di lingkungan Dinas Pekerjaan Umum dan Penataan Ruang Kabupaten Demak. Sistem ini telah dirombak dengan arsitektur **Front End (Portal Publik Akses Terbuka)** dan **Back End (Panel Administrator & Aparatur Kedinasan)**.

---

## 🎨 Desain Tema & Tampilan

* **Front End Publik (Tema Warna Oranye)**:
  Dirancang dengan palet oranye hangat, energik, dan transparan (`#ea580c`, `#f97316`, `#fff7ed`), memudahkan masyarakat dan pemangku kepentingan memantau perkembangan pembangunan daerah.
* **Back End Panel Admin (Tema Warna Putih)**:
  Dirancang dengan tampilan putih bersih resmi kedinasan (`#ffffff`, `#f8fafc`, aksen slate & navy), minimalis, kontras tinggi, dan nyaman untuk input data serta evaluasi akuntabilitas kinerja.

---

## 🏛️ Fitur Utama Sistem

### 1. Front End (Akses Publik Masyarakat & Stakeholder)
* **Target & Indikator di Setiap Kategori (2020 s.d. Tahun Aktif 2026)**:
  * **Segmen 1**: Indikator Kinerja Utama (IKU) - Mandat Perjanjian Kinerja Kepala Dinas
  * **Segmen 2**: Indikator Kinerja Daerah (IKD) - Mandat Sasaran RPJMD Kabupaten Demak
  * **Segmen 3**: Indikator Kinerja Program (IKP) - Level Program Prioritas Bidang Teknis
  * **Segmen 4**: Indikator Kinerja Kegiatan (IKK) - Level Operasional Teknis & Pelatihan
* **Pilihan Mode Tampilan Publik**:
  1. **Mode Kartu & Grafik Tren**:
     * Kartu sorotan interaktif per indikator dengan status capaian tahun aktif.
     * Diagram garis tren perkembangan multi-tahun (Chart.js) beraksen oranye.
     * Rincian wewenang bidang penanggung jawab, pejabat pembina, pelaksana teknis, definisi operasional, formulasi matematis, dan sumber data resmi.
  2. **Mode Matriks Multi-Tahun Seluruh Indikator**:
     * Tabel komparasi lengkap menyajikan Target, Realisasi, dan % Capaian untuk setiap tahun yang diatur tampil oleh admin (2020 s.d. 2026).
* **Filter Cepat Kategori & Pencarian Real-Time**:
  * Tombol tab kategori (Semua Kategori, IKU, IKD, IKP, IKK).
  * Kotak pencarian nama indikator, kode, atau bidang penanggung jawab.
* **Segmen Bank Data Publik**:
  * Pencarian arsip dokumen resmi DINPUTARU Demak.
  * Paginasi dinamis dengan **default 10 dokumen per halaman**.

---

### 2. Halaman Login Back End & Math CAPTCHA
* **Autentikasi Username & Password**:
  * Mendukung akun aparatur dan 7 role kedinasan.
* **Verifikasi Keamanan CAPTCHA Perhitungan Sederhana**:
  * Soal matematika acak menggunakan 4 operasi hitung dasar:
    * **Penjumlahan (+)** (contoh: `14 + 8 = ?`)
    * **Pengurangan (-)** (contoh: `23 - 7 = ?`)
    * **Perkalian (×)** (contoh: `6 × 7 = ?`)
    * **Pembagian (÷)** (contoh: `36 ÷ 6 = ?`)
  * Hasil perhitungan selalu berupa bilangan bulat positif yang mudah dihitung.
  * Tombol **Ganti Soal** (`rotate-ccw`) untuk mengacak soal baru jika diinginkan.
  * Validasi ketat di sisi server (`server.js`) dan browser sebelum autentikasi.
  * Opsi **Pilihan Cepat Demo Role** untuk mempermudah pengujian.

---

### 3. Back End Panel Admin (Tema Warna Putih)
* **Manajemen Tahun & Pengaturan Tampilan Publik**:
  * **Tambah Tahun Baru**: Admin dapat menambahkan periode tahun baru (misal: 2027) dan menentukan apakah langsung tampil di publik atau disimpan di admin.
  * **Atur Tampilan Tahun Publik**:
    * Mengatur tahun apa saja yang diizinkan untuk ditampilkan di Portal Publik (checkbox toggle per tahun).
    * Menentukan **Tahun Aktif Penilaian** (saat ini default Tahun 2026).
    * Segera tersinkronisasi ke portal publik secara langsung!
  * **Hapus Tahun**: Menghapus tahun anggaran beserta record target & realisasinya.
* **Input & Evaluasi Target & Realisasi Multi-Tahun**:
  * Matriks input data target dan realisasi tahunan.
  * Ekspor data ke format file CSV / Excel.
* **Dashboard Monitoring Kinerja Kedinasan**:
  * Diagram garis interaktif (Chart.js) Target vs Realisasi.
  * KPI cards ringkasan capaian dan tabel riwayat evaluasi.
  * Fitur unduh gambar grafik (PNG).
* **Menu Laporan & Cetak Naskah Dinas**:
  * Cetak riwayat multi-tahun per indikator.
  * Cetak rekapitulasi seluruh indikator di tahun tertentu.
  * Lengkap dengan Kop Surat Pemkab Demak dan Lembar Pengesahan Kadinas.
* **Master Data Indikator, Variabel & Rumus**:
  * Pengelolaan variabel dasar perhitungan (survei jalan mantap, irigasi, sanitasi, dll.).
  * Sinkronisasi & hitung otomatis realisasi indikator dari variabel dasar.
* **Manajemen Pengguna (Super Admin)**:
  * Kelola akun untuk 7 role pengguna kedinasan.

---

## 👥 Akun Demo untuk Pengujian Cepat

| Role Pengguna | Nama & Jabatan | Username | Password |
|---|---|---|---|
| **Super Admin** | Budi Santoso, S.T., M.T. *(Super Admin)* | `superadmin` | `password123` |
| **Kepala Dinas** | Drs. H. Ahmad Sugiharto, S.T., M.Si. *(Kepala Dinas)* | `kadin` | `password123` |
| **Sekretaris** | Nurul Hidayati, S.T., M.M. *(Sekretaris Dinas)* | `sekdin` | `password123` |
| **Kepala Bidang** | Sutanto, S.T., M.Tech. *(Kabid Bina Marga)* | `kabid_bm` | `password123` |
| **Koordinator Bidang** | Rizky Kurniawan, S.T. *(Koor Bina Marga)* | `koor_bm` | `password123` |
| **Koordinator Bidang** | Tri Wahyudi, S.T. *(Koor SDA)* | `koor_sda` | `password123` |
| **Kasubag Program & Keuangan** | Eko Prasetyo, S.E., M.Acc. *(Kasubag Program)* | `kasubag_program` | `password123` |
| **Kasubag Umum & Kepegawaian** | Siti Rahmawati, S.Sos. *(Kasubag Umum)* | `kasubag_umum` | `password123` |

---

## 🚀 Cara Menjalankan Aplikasi

Aplikasi berjalan pada server lokal Node.js:

```bash
# Menjalankan server lokal
node server.js
```

Akses langsung melalui peramban:
👉 **`http://localhost:3003`**

* **Akses Publik**: Buka langsung alamat web di atas untuk melihat Portal Publik bertema **Oranye**, Target & Capaian Indikator 2020–2026 di setiap kategori, serta Bank Data.
* **Akses Admin**: Klik tombol **"🔒 Masuk Panel Admin / Aparatur"** di pojok kanan atas, selesaikan CAPTCHA perhitungan matematika sederhana, dan masukkan username serta password.
