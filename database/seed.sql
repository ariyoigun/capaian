-- ==============================================================================
-- SIDAT - SATUPUTARU (Sistem Informasi Capaian Kinerja & Satu Data Kab. Demak)
-- DINAS PEKERJAAN UMUM DAN PENATAAN RUANG (DINPUTARU) KABUPATEN DEMAK
-- SQL Seed Data (Data Awal Resmi Kabupaten Demak)
-- ==============================================================================

-- 1. SEED ROLES
INSERT INTO roles (id, name, description) VALUES
('super_admin', 'Super Admin', 'Akses Penuh: Manajemen User, Indikator, Target/Realisasi, Bank Data, Master Data'),
('koordinator_bidang', 'Koordinator Bidang', 'Operator Teknis: Input Indikator, Target & Realisasi, serta Tambah/Edit/Hapus Bank Data'),
('kepala_bidang', 'Kepala Bidang', 'Pimpinan Teknis: Memantau Hasil Dashboard Capaian Kinerja Bidang & Evaluasi Diagram'),
('kasubag_program_keuangan', 'Kasubag Program dan Keuangan', 'Perencanaan & Monitoring: Memantau Capaian Dashboard, Target Renstra, dan Cetak Laporan Kinerja'),
('kasubag_umum_kepegawaian', 'Kasubag Umum dan Kepegawaian', 'Administrasi: Memantau Dashboard Capaian, Bank Data Arsip, dan Sarana Prasarana'),
('sekretaris', 'Sekretaris', 'Pimpinan Eksekutif: Memantau Seluruh Dashboard Lintas Bidang, Evaluasi Renja, dan Rekap Laporan'),
('kepala_dinas', 'Kepala Dinas', 'Kepala Dinas: Memantau Dashboard Eksekutif Kinerja Utama, Grafik Capaian, dan Pengesahan Laporan')
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- 2. SEED BIDANG PENGAMPU
INSERT INTO bidang (id, code, name, head, seksi) VALUES
('bina_marga', 'BM', 'Bidang Bina Marga', 'Kabid Bina Marga', 'Seksi Preservasi & Pembangunan Jalan Jembatan'),
('sda', 'SDA', 'Bidang Sumber Daya Air', 'Kabid Sumber Daya Air', 'Seksi Operasi, Pemeliharaan & Drainase Pesisir'),
('cipta_karya', 'CK', 'Bidang Cipta Karya', 'Kabid Cipta Karya', 'Seksi Air Minum, Sanitasi & Gedung Bangunan'),
('tata_ruang', 'TR', 'Bidang Tata Ruang', 'Kabid Tata Ruang', 'Seksi Pengaturan, Pembinaan & Pengawasan Tata Ruang'),
('bina_konstruksi', 'BK', 'Bidang Bina Konstruksi', 'Kabid Bina Konstruksi', 'Seksi Pemberdayaan, Pengawasan & Pengujian Material'),
('sekretariat', 'SEKR', 'Sekretariat Dinas', 'Sekretaris DINPUTARU', 'Subbagian Program, Keuangan, Umum & Kepegawaian')
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- 3. SEED USERS (Password default: password123)
INSERT INTO users (id, username, password, name, nip, email, phone, role_id, bidang_id, status) VALUES
('USR-001', 'superadmin', 'password123', 'Budi Santoso, S.T., M.T.', '19750812 200212 1 004', 'admin.dinputaru@demakkab.go.id', '081234567801', 'super_admin', 'sekretariat', 'active'),
('USR-002', 'kadin', 'password123', 'Drs. H. Ahmad Sugiharto, S.T., M.Si.', '19680315 199403 1 007', 'kadinas@demakkab.go.id', '081234567802', 'kepala_dinas', 'sekretariat', 'active'),
('USR-003', 'sekdin', 'password123', 'Nurul Hidayati, S.T., M.M.', '19720510 199803 2 003', 'sekretaris.dinputaru@demakkab.go.id', '081234567803', 'sekretaris', 'sekretariat', 'active'),
('USR-004', 'kabid_bm', 'password123', 'Sutanto, S.T., M.Tech.', '19760921 200312 1 005', 'kabid.binamarga@demakkab.go.id', '081234567804', 'kepala_bidang', 'bina_marga', 'active'),
('USR-005', 'koor_bm', 'password123', 'Rizky Kurniawan, S.T.', '19840214 200903 1 006', 'koor.binamarga@demakkab.go.id', '081234567805', 'koordinator_bidang', 'bina_marga', 'active'),
('USR-006', 'koor_sda', 'password123', 'Tri Wahyudi, S.T.', '19821105 200801 1 011', 'koor.sda@demakkab.go.id', '081234567806', 'koordinator_bidang', 'sda', 'active'),
('USR-007', 'kasubag_program', 'password123', 'Eko Prasetyo, S.E., M.Acc.', '19800619 200604 1 008', 'program.dinputaru@demakkab.go.id', '081234567807', 'kasubag_program_keuangan', 'sekretariat', 'active'),
('USR-008', 'kasubag_umum', 'password123', 'Siti Rahmawati, S.Sos.', '19830412 200701 2 015', 'umum.dinputaru@demakkab.go.id', '081234567808', 'kasubag_umum_kepegawaian', 'sekretariat', 'active')
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- 4. SEED CATEGORIES (4 Klasifikasi Indikator)
INSERT INTO categories (id, code, segment_number, name, description, badge_color) VALUES
('iku', 'IKU', 1, 'Indikator Kinerja Utama', 'Indikator strategis perjanjian kinerja Kepala DINPUTARU Kab. Demak', '#ea580c'),
('ikd', 'IKD', 2, 'Indikator Kinerja Daerah', 'Indikator makro daerah Pemkab Demak yang diampu DINPUTARU (RPJMD)', '#f59e0b'),
('ikp', 'IKP', 3, 'Indikator Kinerja Program', 'Indikator capaian pada level program prioritas bidang-bidang teknis', '#10b981'),
('ikk', 'IKK', 4, 'Indikator Kinerja Kegiatan', 'Indikator operasional pelaksanaan kegiatan teknis dan sub-kegiatan dinas', '#3b82f6')
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- 5. SEED INDICATORS
INSERT INTO indicators (id, code, name, category_id, bidang_id, wewenang_bidang, pejabat_penanggung_jawab, seksi_pelaksana, unit, polarization, definition, formula, source, sort_order) VALUES
('IND-001', 'IKU-01', 'Persentase Infrastruktur Pekerjaan Umum dalam Kondisi Mantap/Baik', 'iku', 'bina_marga', 'Bidang Bina Marga & Bidang SDA', 'Kepala Bidang Bina Marga', 'Seksi Preservasi Jalan & Jembatan', '%', 'maximize', 'Rata-rata persentase kemantapan jalan kabupaten, kondisi jaringan irigasi baik/sedang, dan akses sanitasi layak di Kabupaten Demak.', '(Persentase Jalan Mantap + Persentase Irigasi Baik + Persentase Sanitasi Layak) / 3', 'Buku Data Capaian Kinerja DINPUTARU Kab. Demak', 1),
('IND-002', 'IKU-02', 'Rasio Kesesuaian Pemanfaatan Ruang terhadap RTRW Kabupaten Demak', 'iku', 'tata_ruang', 'Bidang Tata Ruang', 'Kepala Bidang Tata Ruang', 'Seksi Pemanfaatan dan Pengendalian Ruang', '%', 'maximize', 'Tingkat kepatuhan implementasi perizinan pemanfaatan ruang dan pembangunan fisik terhadap pola dan struktur ruang Perda RTRW Kab. Demak.', '(Luas Lahan Terbangun Sesuai RTRW / Luas Total Lahan Pemanfaatan yang Diverifikasi) x 100%', 'Bidang Tata Ruang & Tim Koordinasi Penataan Ruang Daerah (TKPRD)', 2),
('IND-003', 'IKD-01', 'Persentase Tingkat Kemantapan Jalan Kabupaten Demak', 'ikd', 'bina_marga', 'Bidang Bina Marga', 'Kepala Bidang Bina Marga', 'Seksi Preservasi Jalan dan Jembatan', '%', 'maximize', 'Perbandingan total panjang ruas jalan kabupaten dalam kondisi baik dan sedang terhadap total seluruh panjang jaringan jalan kabupaten.', '(Panjang Jalan Baik + Sedang dalam Km / Total Panjang Jalan Kabupaten dalam Km) x 100%', 'Survei Kondisi Jalan Semester II Bidang Bina Marga DINPUTARU', 3),
('IND-004', 'IKD-02', 'Persentase Luas Irigasi Kabupaten dalam Kondisi Baik', 'ikd', 'sda', 'Bidang Sumber Daya Air', 'Kepala Bidang Sumber Daya Air', 'Seksi Operasi dan Pemeliharaan Irigasi', '%', 'maximize', 'Rasio luas areal daerah irigasi kewenangan kabupaten yang terairi dengan jaringan irigasi primer dan sekunder berfungsi optimal.', '(Luas Daerah Irigasi Kondisi Baik dlm Ha / Total Luas Potensi Baku DI Kewenangan Kabupaten dlm Ha) x 100%', 'E-PAKSI (Elektronik Penilaian Aset & Kinerja Sistem Irigasi) DINPUTARU', 4),
('IND-005', 'IKD-03', 'Persentase Rumah Tangga Memperoleh Akses Air Minum Layak', 'ikd', 'cipta_karya', 'Bidang Cipta Karya', 'Kepala Bidang Cipta Karya', 'Seksi Air Minum dan Penyehatan Lingkungan', '%', 'maximize', 'Proporsi rumah tangga di Kabupaten Demak yang memiliki akses terlindungi terhadap sumber air minum perpipaan (SPAM/PUDAM) dan non-perpipaan terlindungi.', '(Jumlah Rumah Tangga Berakses Air Minum Layak / Total Jumlah Rumah Tangga Kabupaten) x 100%', 'Survei Rumah Tangga Bidang Cipta Karya & Kolaborasi PUDAM Tirtawijaya', 5),
('IND-006', 'IKP-BM-01', 'Persentase Jembatan Kabupaten dalam Kondisi Baik dan Sedang', 'ikp', 'bina_marga', 'Bidang Bina Marga', 'Kepala Bidang Bina Marga', 'Seksi Pembangunan dan Rehabilitasi Jembatan', '%', 'maximize', 'Jumlah unit jembatan pada ruas jalan kabupaten yang berada pada kondisi kelayakan struktural aman (Nilai Kondisi 0 - 2).', '(Jumlah Unit Jembatan Kondisi Baik & Sedang / Total Unit Jembatan Kabupaten) x 100%', 'Database BMS (Bridge Management System) DINPUTARU Kab. Demak', 6),
('IND-007', 'IKP-SDA-01', 'Rasio Luas Kawasan Rawan Banjir/Rob yang Tertangani Pengendaliannya', 'ikp', 'sda', 'Bidang Sumber Daya Air', 'Kepala Bidang Sumber Daya Air', 'Seksi Sungai, Pantai dan Drainase Perkotaan', '%', 'maximize', 'Penurunan luas genangan banjir dan pasang air laut (rob) di pesisir Sayung, Karangtengah, dan Bonang melalui polder, tanggul, dan pompa.', '(Luas Kawasan Bebas Genangan Pascakonstruksi dlm Ha / Total Luas Kawasan Rawan Teridentifikasi dlm Ha) x 100%', 'Pemetaan Spasial Genangan GIS & Evaluasi Pascabanjir Bidang SDA', 7),
('IND-008', 'IKP-CK-01', 'Persentase Rumah Tangga dengan Akses Sanitasi dan Air Limbah Layak', 'ikp', 'cipta_karya', 'Bidang Cipta Karya', 'Kepala Bidang Cipta Karya', 'Seksi Sanitasi, Air Limbah dan Drainase Lingkungan', '%', 'maximize', 'Cakupan rumah tangga yang memiliki sarana jamban sehat dengan tangki septik aman atau tersambung IPAL komunal.', '(Jumlah KK dengan Jamban & Tangki Septik Standar SNI / Total Jumlah KK) x 100%', 'Laporan Monitoring Sanitasi Lingkungan & Data DAK Bidang Cipta Karya', 8),
('IND-009', 'IKK-BK-01', 'Jumlah Tenaga Kerja Konstruksi yang Memiliki Sertifikat Standar Kerja (SKK)', 'ikk', 'bina_konstruksi', 'Bidang Bina Konstruksi', 'Kepala Bidang Bina Konstruksi', 'Seksi Pemberdayaan & Pelatihan Jasa Konstruksi', 'Orang', 'maximize', 'Akumulasi tukang, mandor, dan pelaksana jasa konstruksi daerah Kabupaten Demak yang telah lulus uji kompetensi sertifikasi resmi.', 'Jumlah Kumulatif Tenaga Kerja Bersertifikat SKK yang Divalidasi LPJK', 'Buku Register Pelatihan & Sertifikasi Bidang Bina Konstruksi DINPUTARU', 9)
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- 6. SEED TARGET & REALISASI MULTI-TAHUN (2020 s.d. 2026)
INSERT INTO target_realisasi (indicator_id, year, target, realisasi, status_kinerja, notes) VALUES
-- IND-001 (IKU-01)
('IND-001', 2020, 80.00, 80.50, 'Sangat Baik', 'Terealisasi melampaui target awal RKPD'),
('IND-001', 2021, 82.00, 82.40, 'Sangat Baik', 'Penanganan jalan penghubung antar kecamatan tuntas'),
('IND-001', 2022, 84.00, 84.80, 'Sangat Baik', 'Dukungan pemulihan ekonomi melalui infrastruktur mantap'),
('IND-001', 2023, 85.50, 86.10, 'Sangat Baik', 'Optimalisasi jaringan jalan lingkar dan saluran pembuang'),
('IND-001', 2024, 86.50, 87.20, 'Sangat Baik', 'Peningkatan jalan beton dan rehabilitasi saluran primer'),
('IND-001', 2025, 87.50, 88.40, 'Sangat Baik', 'Akselerasi konektivitas wilayah pesisir dan sentra pertanian'),
('IND-001', 2026, 88.50, 89.56, 'Sangat Baik', 'Capaian tahun berjalan 2026 terverifikasi rapat pimpinan'),

-- IND-002 (IKU-02)
('IND-002', 2020, 95.00, 94.20, 'Baik', 'Penyesuaian perda zonasi pemanfaatan ruang Sayung'),
('IND-002', 2021, 95.50, 95.80, 'Sangat Baik', 'Integrasi izin berusaha OSS dengan peta tata ruang'),
('IND-002', 2022, 96.00, 96.40, 'Sangat Baik', 'Kesesuaian kawasan industri terverifikasi TKPRD'),
('IND-002', 2023, 96.50, 96.90, 'Sangat Baik', 'Pengawasan rutin bangunan di sempadan sungai & pantai'),
('IND-002', 2024, 97.00, 97.20, 'Sangat Baik', 'Penerbitan KKPR digital berjalan terpadu'),
('IND-002', 2025, 97.50, 97.80, 'Sangat Baik', 'Konsistensi pemanfaatan ruang lindung dipertahankan'),
('IND-002', 2026, 98.00, 97.56, 'Baik', 'Evaluasi semester berjalan menunjukkan kepatuhan tinggi'),

-- IND-003 (IKD-01)
('IND-003', 2020, 84.00, 84.60, 'Sangat Baik', 'Realisasi DAK Jalan dan APBD murni'),
('IND-003', 2021, 85.50, 86.10, 'Sangat Baik', 'Penanganan jalan lingkar Buyaran - Guntur'),
('IND-003', 2022, 87.00, 87.90, 'Sangat Baik', 'Rekonstruksi jalan perkerasan kaku beton tuntas'),
('IND-003', 2023, 88.00, 89.20, 'Sangat Baik', 'Pemeliharaan berkala jalan penghubung Demak - Wedung'),
('IND-003', 2024, 88.50, 90.10, 'Sangat Baik', 'Peninggian badan jalan anti rob di jalur pesisir Sayung'),
('IND-003', 2025, 89.00, 91.20, 'Sangat Baik', 'Preservasi jalan strategis kabupaten tuntas'),
('IND-003', 2026, 90.00, 92.00, 'Sangat Baik', 'Survei kondisi jalan semester berjalan menunjukkan kemantapan tinggi'),

-- IND-004 (IKD-02)
('IND-004', 2020, 80.00, 80.70, 'Sangat Baik', 'Rehabilitasi saluran sekunder DI Cabean dan Jragung'),
('IND-004', 2021, 81.50, 82.00, 'Sangat Baik', 'Normalisasi saluran induk irigasi Guntur'),
('IND-004', 2022, 82.50, 83.20, 'Sangat Baik', 'Penggantian pintu air dan penguatan tebing saluran'),
('IND-004', 2023, 83.50, 84.10, 'Sangat Baik', 'Penerapan aplikasi E-PAKSI dalam pemeliharaan aset irigasi'),
('IND-004', 2024, 84.50, 85.00, 'Sangat Baik', 'Rehabilitasi jaringan tersier sentra lumbung padi'),
('IND-004', 2025, 85.00, 85.60, 'Sangat Baik', 'Peningkatan kapasitas tampung saluran irigasi kabupaten'),
('IND-004', 2026, 85.50, 85.90, 'Sangat Baik', 'Keandalan debit air untuk musim tanam I & II terjamin'),

-- IND-005 (IKD-03)
('IND-005', 2020, 83.00, 83.50, 'Sangat Baik', 'Ekspansi jaringan perpipaan SPAM perkotaan'),
('IND-005', 2021, 85.00, 85.80, 'Sangat Baik', 'Optimalisasi SPAM IKK Bonang dan Wedung'),
('IND-005', 2022, 87.00, 87.60, 'Sangat Baik', 'Pemberian sambungan rumah (SR) murah bagi MBR'),
('IND-005', 2023, 88.00, 88.90, 'Sangat Baik', 'Kerjasama intake air baku Sungai Tuntang & Jragung'),
('IND-005', 2024, 89.00, 89.70, 'Sangat Baik', 'Pembangunan reservoar pembagi wilayah rawan kekeringan'),
('IND-005', 2025, 89.50, 90.20, 'Sangat Baik', 'Cakupan layanan air minum bersih meluas di 14 kecamatan'),
('IND-005', 2026, 90.00, 90.78, 'Sangat Baik', 'Realisasi sambungan air bersih memenuhi standar SPM'),

-- IND-006 (IKP-BM-01)
('IND-006', 2020, 88.00, 88.40, 'Sangat Baik', 'Rehabilitasi jembatan gelagar baja dan beton Sayung'),
('IND-006', 2021, 89.00, 89.50, 'Sangat Baik', 'Pelebaran jembatan sempit jalur penghubung kecamatan'),
('IND-006', 2022, 90.00, 90.80, 'Sangat Baik', 'Pembangunan jembatan gantung antar desa'),
('IND-006', 2023, 91.00, 91.90, 'Sangat Baik', 'Pemeliharaan berkala expansion joint dan railing jembatan'),
('IND-006', 2024, 92.00, 92.60, 'Sangat Baik', 'Penguatan abutment jembatan rawan gerusan banjir'),
('IND-006', 2025, 92.50, 93.10, 'Sangat Baik', 'Seluruh jembatan utama kabupaten berada pada kondisi prima'),
('IND-006', 2026, 93.00, 93.80, 'Sangat Baik', 'Inspeksi berkala BMS menunjukkan keamanan struktur tinggi'),

-- IND-007 (IKP-SDA-01)
('IND-007', 2020, 60.00, 62.50, 'Sangat Baik', 'Pengoperasian rumah pompa dan pintu klep otomatis Sayung'),
('IND-007', 2021, 65.00, 67.00, 'Sangat Baik', 'Normalisasi alur muara sungai Sayung dan Sungai Tuntang'),
('IND-007', 2022, 68.00, 71.20, 'Sangat Baik', 'Pembangunan tanggul pembendung pasang air rob'),
('IND-007', 2023, 70.00, 73.50, 'Sangat Baik', 'Optimalisasi polder pesisir dan kolam retensi'),
('IND-007', 2024, 72.00, 75.80, 'Sangat Baik', 'Peningkatan kapasitas mesin pompa sedot stasioner'),
('IND-007', 2025, 73.50, 77.40, 'Sangat Baik', 'Waktu surut genangan air pasang berkurang drastis'),
('IND-007', 2026, 75.00, 79.17, 'Sangat Baik', 'Efektivitas sistem polder dan tanggul rob berfungsi maksimal'),

-- IND-008 (IKP-CK-01)
('IND-008', 2020, 84.00, 84.50, 'Sangat Baik', 'Pembangunan tangki septik individu desa prioritas stunting'),
('IND-008', 2021, 86.00, 86.80, 'Sangat Baik', 'Penyediaan IPAL komunal sanitasi berbasis masyarakat'),
('IND-008', 2022, 87.50, 88.20, 'Sangat Baik', 'Pemberian bantuan tangki septik biofilter kedap air'),
('IND-008', 2023, 88.50, 89.10, 'Sangat Baik', 'Peningkatan kesadaran stop buang air besar sembarangan (ODF)'),
('IND-008', 2024, 89.00, 89.80, 'Sangat Baik', 'Pengelolaan lumpur tinja terpadu IPLT Kalikondang'),
('IND-008', 2025, 89.50, 90.30, 'Sangat Baik', 'Mayoritas desa telah berstatus ODF (Open Defecation Free)'),
('IND-008', 2026, 90.00, 90.91, 'Sangat Baik', 'Capaian sanitasi layak memenuhi target Renstra'),

-- IND-009 (IKK-BK-01)
('IND-009', 2020, 400.00, 420.00, 'Sangat Baik', 'Pelatihan tukang pasang bata dan beton bersertifikat'),
('IND-009', 2021, 500.00, 530.00, 'Sangat Baik', 'Uji kompetensi tenaga kerja konstruksi bekerjasama LPJK'),
('IND-009', 2022, 600.00, 645.00, 'Sangat Baik', 'Bimtek pelaksana lapangan pekerjaan jalan dan jembatan'),
('IND-009', 2023, 700.00, 750.00, 'Sangat Baik', 'Fasilitasi sertifikasi gratis bagi pekerja konstruksi lokal'),
('IND-009', 2024, 780.00, 810.00, 'Sangat Baik', 'Sosialisasi standar keselamatan dan kesehatan kerja (K3)'),
('IND-009', 2025, 820.00, 865.00, 'Sangat Baik', 'Peningkatan daya saing tenaga kerja konstruksi Kabupaten Demak'),
('IND-009', 2026, 850.00, 900.00, 'Sangat Baik', 'Realisasi kumulatif tenaga bersertifikat melampaui target')
ON DUPLICATE KEY UPDATE target=VALUES(target), realisasi=VALUES(realisasi), status_kinerja=VALUES(status_kinerja), notes=VALUES(notes);

-- 7. SEED SYSTEM SETTINGS
INSERT INTO system_settings (setting_key, setting_value, description) VALUES
('appName', 'SIDAT - SATUPUTARU', 'Nama resmi aplikasi sistem informasi'),
('tagline', 'Sistem Informasi Capaian Kinerja & Satu Data Kab. Demak', 'Slogan resmi aplikasi'),
('instansi', 'Dinas Pekerjaan Umum dan Penataan Ruang (DINPUTARU) Kabupaten Demak', 'Nama instansi pemerintah pengelola'),
('officeAddress', 'Jalan Kyai Jebat No. 892 Demak, Jawa Tengah 59511', 'Alamat kantor kedinasan'),
('contactPhone', '(0291) 685123', 'Nomor telepon kantor'),
('contactEmail', 'dinputaru@demakkab.go.id', 'Alamat email dinas'),
('visibleYears', '[2020, 2021, 2022, 2023, 2024, 2025, 2026]', 'Daftar tahun yang diizinkan tampil di portal publik'),
('activeYear', '2026', 'Tahun anggaran aktif untuk evaluasi kinerja berjalan')
ON DUPLICATE KEY UPDATE setting_value=VALUES(setting_value);
