/**
 * SIDAT - SATUPUTARU - Store & State Management v2
 * Dinas Pekerjaan Umum dan Penataan Ruang Kab. Demak
 */

const STORAGE_KEY = 'sidat_satuputaru_v1';

// 7 Official Roles Requested by User
const DEFAULT_ROLES = [
  { id: 'super_admin', name: 'Super Admin', desc: 'Akses Penuh: Manajemen User, Indikator, Target/Realisasi, Bank Data, Master Data' },
  { id: 'koordinator_bidang', name: 'Koordinator Bidang', desc: 'Operator Teknis: Input Indikator, Target & Realisasi, serta Tambah/Edit/Hapus Bank Data' },
  { id: 'kepala_bidang', name: 'Kepala Bidang', desc: 'Pimpinan Teknis: Memantau Hasil Dashboard Capaian Kinerja Bidang & Evaluasi Diagram' },
  { id: 'kasubag_program_keuangan', name: 'Kasubag Program dan Keuangan', desc: 'Perencanaan & Monitoring: Memantau Capaian Dashboard, Target Renstra, dan Cetak Laporan Kinerja' },
  { id: 'kasubag_umum_kepegawaian', name: 'Kasubag Umum dan Kepegawaian', desc: 'Administrasi: Memantau Dashboard Capaian, Bank Data Arsip, dan Sarana Prasarana' },
  { id: 'sekretaris', name: 'Sekretaris', desc: 'Pimpinan Eksekutif: Memantau Seluruh Dashboard Lintas Bidang, Evaluasi Renja, dan Rekap Laporan' },
  { id: 'kepala_dinas', name: 'Kepala Dinas', desc: 'Kepala Dinas: Memantau Dashboard Eksekutif Kinerja Utama, Grafik Capaian, dan Pengesahan Laporan' }
];

// Bidang Organisasi DINPUTARU Demak
const DEFAULT_BIDANG = [
  { id: 'bina_marga', name: 'Bidang Bina Marga', code: 'BM', head: 'Kabid Bina Marga', seksi: 'Seksi Preservasi & Pembangunan Jalan Jembatan' },
  { id: 'sda', name: 'Bidang Sumber Daya Air', code: 'SDA', head: 'Kabid Sumber Daya Air', seksi: 'Seksi Operasi, Pemeliharaan & Drainase Pesisir' },
  { id: 'cipta_karya', name: 'Bidang Cipta Karya', code: 'CK', head: 'Kabid Cipta Karya', seksi: 'Seksi Air Minum, Sanitasi & Gedung Bangunan' },
  { id: 'tata_ruang', name: 'Bidang Tata Ruang', code: 'TR', head: 'Kabid Tata Ruang', seksi: 'Seksi Pengaturan & Pembinaan Tata Ruang (KKPR)' },
  { id: 'bina_konstruksi', name: 'Bidang Bina Konstruksi', code: 'BK', head: 'Kabid Bina Konstruksi', seksi: 'Seksi Standardisasi & Sertifikasi Tenaga Kerja' },
  { id: 'sekretariat', name: 'Sekretariat Dinas', code: 'SEKR', head: 'Sekretaris Dinas', seksi: 'Subbag Program, Keuangan & Kepegawaian' }
];

// Seed Users for all 7 Roles
const DEFAULT_USERS = [
  {
    id: 'USR-001',
    username: 'superadmin',
    password: 'password123',
    name: 'Budi Santoso, S.T., M.T.',
    nip: '19750812 200212 1 004',
    role: 'super_admin',
    roleLabel: 'Super Admin Sistem',
    bidangId: 'sekretariat',
    email: 'admin.dinputaru@demakkab.go.id',
    phone: '0812-3456-7890',
    status: 'active'
  },
  {
    id: 'USR-002',
    username: 'kadin',
    password: 'password123',
    name: 'Drs. H. Ahmad Sugiharto, S.T., M.Si.',
    nip: '19680315 199403 1 007',
    role: 'kepala_dinas',
    roleLabel: 'Kepala Dinas PUPR',
    bidangId: 'sekretariat',
    email: 'kadinas@demakkab.go.id',
    phone: '0811-9876-5432',
    status: 'active'
  },
  {
    id: 'USR-003',
    username: 'sekdin',
    password: 'password123',
    name: 'Nurul Hidayati, S.T., M.M.',
    nip: '19720510 199803 2 003',
    role: 'sekretaris',
    roleLabel: 'Sekretaris Dinas',
    bidangId: 'sekretariat',
    email: 'sekretaris.dinputaru@demakkab.go.id',
    phone: '0813-2233-4455',
    status: 'active'
  },
  {
    id: 'USR-004',
    username: 'kabid_bm',
    password: 'password123',
    name: 'Sutanto, S.T., M.Tech.',
    nip: '19780120 200501 1 008',
    role: 'kepala_bidang',
    roleLabel: 'Kepala Bidang Bina Marga',
    bidangId: 'bina_marga',
    email: 'kabid.binamarga@demakkab.go.id',
    phone: '0812-9988-7766',
    status: 'active'
  },
  {
    id: 'USR-005',
    username: 'koor_bm',
    password: 'password123',
    name: 'Rizky Kurniawan, S.T.',
    nip: '19860412 201001 1 012',
    role: 'koordinator_bidang',
    roleLabel: 'Koordinator Bidang Bina Marga',
    bidangId: 'bina_marga',
    email: 'koor.binamarga@demakkab.go.id',
    phone: '0857-1122-3344',
    status: 'active'
  },
  {
    id: 'USR-006',
    username: 'koor_sda',
    password: 'password123',
    name: 'Tri Wahyudi, S.T.',
    nip: '19880918 201101 1 009',
    role: 'koordinator_bidang',
    roleLabel: 'Koordinator Bidang SDA',
    bidangId: 'sda',
    email: 'koor.sda@demakkab.go.id',
    phone: '0858-6677-8899',
    status: 'active'
  },
  {
    id: 'USR-007',
    username: 'kasubag_program',
    password: 'password123',
    name: 'Eko Prasetyo, S.E., M.Acc.',
    nip: '19810625 200604 1 009',
    role: 'kasubag_program_keuangan',
    roleLabel: 'Kasubag Program dan Keuangan',
    bidangId: 'sekretariat',
    email: 'program.dinputaru@demakkab.go.id',
    phone: '0815-4455-6677',
    status: 'active'
  },
  {
    id: 'USR-008',
    username: 'kasubag_umum',
    password: 'password123',
    name: 'Siti Rahmawati, S.Sos.',
    nip: '19830214 200801 2 015',
    role: 'kasubag_umum_kepegawaian',
    roleLabel: 'Kasubag Umum dan Kepegawaian',
    bidangId: 'sekretariat',
    email: 'umum.dinputaru@demakkab.go.id',
    phone: '0812-7788-9900',
    status: 'active'
  }
];

const DEFAULT_CATEGORIES = [
  { id: 'iku', code: 'IKU', segmentNumber: 1, name: 'Indikator Kinerja Utama', desc: 'Indikator strategis perjanjian kinerja Kepala DINPUTARU Kab. Demak', badgeColor: '#38bdf8' },
  { id: 'ikd', code: 'IKD', segmentNumber: 2, name: 'Indikator Kinerja Daerah', desc: 'Indikator makro daerah Pemkab Demak yang diampu DINPUTARU (RPJMD)', badgeColor: '#fbbf24' },
  { id: 'ikp', code: 'IKP', segmentNumber: 3, name: 'Indikator Kinerja Program', desc: 'Indikator capaian pada level program prioritas bidang-bidang teknis', badgeColor: '#34d399' },
  { id: 'ikk', code: 'IKK', segmentNumber: 4, name: 'Indikator Kinerja Kegiatan', desc: 'Indikator operasional capaian kegiatan fisik dan non-fisik sub-koordinator', badgeColor: '#f472b6' }
];

const DEFAULT_YEARS = [2020, 2021, 2022, 2023, 2024, 2025, 2026];

// Master Variabel Perhitungan
const DEFAULT_VARIABLES = [
  {
    id: 'VAR_BM_01',
    name: 'Panjang Jalan Kabupaten Kondisi Baik & Sedang (Mantap)',
    code: 'P_MANTAP',
    unit: 'Km',
    bidang: 'bina_marga',
    source: 'Survei Kondisi Jalan (SKJ) DINPUTARU Demak',
    values: { '2020': 418.5, '2021': 432.1, '2022': 451.8, '2023': 472.4, '2024': 489.6, '2025': 505.0, '2026': 520.0 }
  },
  {
    id: 'VAR_BM_02',
    name: 'Total Panjang Jalan Kewenangan Kabupaten Demak',
    code: 'P_TOTAL_JALAN',
    unit: 'Km',
    bidang: 'bina_marga',
    source: 'Keputusan Bupati Demak tentang Status Ruas Jalan',
    values: { '2020': 565.2, '2021': 565.2, '2022': 565.2, '2023': 565.2, '2024': 565.2, '2025': 565.2, '2026': 565.2 }
  },
  {
    id: 'VAR_SDA_01',
    name: 'Luas Lahan Irigasi Kewenangan Kab dalam Kondisi Baik & Berfungsi',
    code: 'L_IRIGASI_BAIK',
    unit: 'Ha',
    bidang: 'sda',
    source: 'Inventarisasi E-PAKSI DINPUTARU Kab. Demak',
    values: { '2020': 22400, '2021': 23150, '2022': 24020, '2023': 24850, '2024': 25600, '2025': 26200, '2026': 26800 }
  },
  {
    id: 'VAR_SDA_02',
    name: 'Total Luas Daerah Irigasi Kewenangan Kabupaten Demak',
    code: 'L_IRIGASI_TOTAL',
    unit: 'Ha',
    bidang: 'sda',
    source: 'Buku Data Daerah Irigasi Kab. Demak',
    values: { '2020': 31200, '2021': 31200, '2022': 31200, '2023': 31200, '2024': 31200, '2025': 31200, '2026': 31200 }
  },
  {
    id: 'VAR_SDA_03',
    name: 'Luas Kawasan Rawan Banjir & Rob yang Tertangani Tanggul/Pompa',
    code: 'L_ROB_TERTANGANI',
    unit: 'Ha',
    bidang: 'sda',
    source: 'Laporan Penanganan Genangan Sayung, Bonang, Karangtengah',
    values: { '2020': 1850, '2021': 2100, '2022': 2450, '2023': 2780, '2024': 3120, '2025': 3450, '2026': 3800 }
  },
  {
    id: 'VAR_SDA_04',
    name: 'Total Luas Kawasan Rawan Banjir & Rob Pasang di Wilayah Pesisir',
    code: 'L_ROB_TOTAL',
    unit: 'Ha',
    bidang: 'sda',
    source: 'Peta Rawan Bencana Banjir & Pasang Air Laut BPBD & DINPUTARU',
    values: { '2020': 4800, '2021': 4800, '2022': 4800, '2023': 4800, '2024': 4800, '2025': 4800, '2026': 4800 }
  },
  {
    id: 'VAR_CK_01',
    name: 'Jumlah KK Terlayani Akses Air Minum Layak dan Aman',
    code: 'KK_AIR_MINUM',
    unit: 'KK',
    bidang: 'cipta_karya',
    source: 'Sistem Informasi Air Minum SPAM DINPUTARU Demak',
    values: { '2020': 282400, '2021': 291100, '2022': 301400, '2023': 312800, '2024': 323500, '2025': 334000, '2026': 344500 }
  },
  {
    id: 'VAR_CK_02',
    name: 'Jumlah Total KK di Seluruh Kabupaten Demak',
    code: 'KK_TOTAL_DEMAK',
    unit: 'KK',
    bidang: 'cipta_karya',
    source: 'Data Agregat Kependudukan Dinas Dukcapil Demak',
    values: { '2020': 358200, '2021': 361500, '2022': 365100, '2023': 368900, '2024': 372400, '2025': 376000, '2026': 379500 }
  },
  {
    id: 'VAR_CK_03',
    name: 'Jumlah KK Memiliki Akses Jamban Sehat & Sanitasi Layak',
    code: 'KK_SANITASI',
    unit: 'KK',
    bidang: 'cipta_karya',
    source: 'Data DAK Sanitasi & Pokja PKP Kab. Demak',
    values: { '2020': 275800, '2021': 286200, '2022': 298500, '2023': 311200, '2024': 322800, '2025': 334500, '2026': 345000 }
  },
  {
    id: 'VAR_TR_01',
    name: 'Jumlah Permohonan KKPR/Kesesuaian Ruang Terlayani Tepat Waktu',
    code: 'KKPR_TEPAT',
    unit: 'Berkas',
    bidang: 'tata_ruang',
    source: 'Layanan SIMBG & OSS Tata Ruang DINPUTARU Demak',
    values: { '2020': 412, '2021': 520, '2022': 685, '2023': 794, '2024': 880, '2025': 940, '2026': 1000 }
  },
  {
    id: 'VAR_TR_02',
    name: 'Total Permohonan KKPR / Rekomendasi Tata Ruang yang Masuk',
    code: 'KKPR_TOTAL',
    unit: 'Berkas',
    bidang: 'tata_ruang',
    source: 'Buku Registrasi Pelayanan Penataan Ruang',
    values: { '2020': 450, '2021': 560, '2022': 720, '2023': 825, '2024': 905, '2025': 965, '2026': 1025 }
  },
  {
    id: 'VAR_BK_01',
    name: 'Jumlah Tenaga Kerja Konstruksi Terampil yang Tersertifikasi (SKK)',
    code: 'TKK_SERTIFIKAT',
    unit: 'Orang',
    bidang: 'bina_konstruksi',
    source: 'Sipjaki & Pelatihan Sertifikasi DINPUTARU Demak',
    values: { '2020': 185, '2021': 240, '2022': 365, '2023': 490, '2024': 610, '2025': 750, '2026': 900 }
  }
];

// Indicators Master Data with explicit Wewenang Bidang
const DEFAULT_INDICATORS = [
  // SEGMEN 1: INDIKATOR KINERJA UTAMA (IKU)
  {
    id: 'IND-IKU-01',
    code: 'IKU-01',
    name: 'Persentase Infrastruktur Pekerjaan Umum dalam Kondisi Baik',
    categoryId: 'iku',
    bidangId: 'sekretariat',
    wewenangBidang: 'Sekretariat Dinas (Pengampu Komposit Lintas Bidang)',
    pejabatPenanggungJawab: 'Sekretaris Dinas & Tim Penyusun LAKIP/Renstra',
    seksiPelaksana: 'Subbagian Program dan Keuangan',
    unit: '%',
    polarization: 'maximize',
    definition: 'Indikator komposit rata-rata capaian infrastruktur ke-PU-an (kemantapan jalan, jaringan irigasi, drainase perkotaan, dan sarana sanitasi) dalam kondisi fisik handal dan beroperasi dengan baik.',
    formula: 'Rata-rata tertimbang (% Jalan Mantap + % Irigasi Baik + % Sanitasi Layak) / 3',
    formulaExpr: '(IKD_01 + IKD_02 + IKP_CK_01) / 3',
    formulaVars: ['VAR_BM_01', 'VAR_SDA_01', 'VAR_CK_03'],
    source: 'Laporan Kinerja Instansi Pemerintah (LKjIP) DINPUTARU Kab. Demak',
    records: {
      '2020': { target: 74.0, realisasi: 75.28, notes: 'Target IKU Perjanjian Kinerja Kepala DINPUTARU tercapai' },
      '2021': { target: 76.0, realisasi: 77.28, notes: 'Meningkat seiring pemulihan anggaran infrastruktur' },
      '2022': { target: 78.5, realisasi: 80.05, notes: 'Sinergi antar-bidang teknis DINPUTARU meningkat' },
      '2023': { target: 81.0, realisasi: 82.88, notes: 'Kategori kinerja SAKIP: SANGAT BAIK (A)' },
      '2024': { target: 83.5, realisasi: 85.10, notes: 'Pencapaian fisik infrastruktur strategis' },
      '2025': { target: 86.0, realisasi: 87.38, notes: 'Target pemeliharaan terintegrasi' },
      '2026': { target: 88.5, realisasi: 89.56, notes: 'Target akhir Renstra DINPUTARU' }
    }
  },
  {
    id: 'IND-IKU-02',
    code: 'IKU-02',
    name: 'Rasio Kesesuaian Pemanfaatan Ruang terhadap RTRW Kab. Demak',
    categoryId: 'iku',
    bidangId: 'tata_ruang',
    wewenangBidang: 'Bidang Tata Ruang',
    pejabatPenanggungJawab: 'Kepala Bidang Tata Ruang',
    seksiPelaksana: 'Seksi Pengaturan & Pembinaan Tata Ruang (KKPR/OSS)',
    unit: '%',
    polarization: 'maximize',
    definition: 'Persentase kegiatan pemanfaatan ruang dan izin KKPR (Kesesuaian Kegiatan Pemanfaatan Ruang) yang sesuai dengan Peraturan Daerah Rencana Tata Ruang Wilayah (RTRW) dan RDTR Kabupaten Demak.',
    formula: '(Jumlah Permohonan KKPR Sesuai Ketentuan / Total Permohonan Masuk) × 100%',
    formulaExpr: '(KKPR_TEPAT / KKPR_TOTAL) * 100',
    formulaVars: ['VAR_TR_01', 'VAR_TR_02'],
    source: 'Sistem Informasi Penataan Ruang & Pengawasan Pemanfaatan Ruang DINPUTARU Kab. Demak',
    records: {
      '2020': { target: 88.0, realisasi: 91.56, notes: 'Integrasi sistem OSS dengan RTRW Kabupaten' },
      '2021': { target: 90.0, realisasi: 92.86, notes: 'Sosialisasi penetapan Perda RTRW revisi' },
      '2022': { target: 92.0, realisasi: 95.14, notes: 'Penyusunan RDTR Kawasan Industri & Perkotaan Sayung' },
      '2023': { target: 94.0, realisasi: 96.24, notes: 'Pencegahan alih fungsi lahan sawah dilindungi (LSD)' },
      '2024': { target: 95.5, realisasi: 97.24, notes: 'Layanan konsultasi klinik tata ruang DINPUTARU aktif' },
      '2025': { target: 96.5, realisasi: 97.41, notes: 'Digitalisasi peta zonasi interaktif GIS' },
      '2026': { target: 98.0, realisasi: 97.56, notes: 'Pengawasan terpadu pelanggaran tata ruang' }
    }
  },

  // SEGMEN 2: INDIKATOR KINERJA DAERAH (IKD)
  {
    id: 'IND-IKD-01',
    code: 'IKD-01',
    name: 'Persentase Tingkat Kemantapan Jalan Kabupaten',
    categoryId: 'ikd',
    bidangId: 'bina_marga',
    wewenangBidang: 'Bidang Bina Marga',
    pejabatPenanggungJawab: 'Kepala Bidang Bina Marga',
    seksiPelaksana: 'Seksi Preservasi & Pembangunan Jalan Jembatan',
    unit: '%',
    polarization: 'maximize',
    definition: 'Perbandingan antara panjang ruas jalan kabupaten dalam kondisi baik dan sedang terhadap total seluruh panjang jaringan jalan kabupaten di wilayah Kabupaten Demak.',
    formula: '(Panjang Jalan Kondisi Baik + Sedang) / Total Panjang Jalan Kabupaten × 100%',
    formulaExpr: '(P_MANTAP / P_TOTAL_JALAN) * 100',
    formulaVars: ['VAR_BM_01', 'VAR_BM_02'],
    source: 'Hasil Survei Kondisi Jalan (SKJ) Bidang Bina Marga DINPUTARU Kab. Demak & IRMS Kementerian PUPR',
    records: {
      '2020': { target: 73.5, realisasi: 74.05, notes: 'Fokus pemeliharaan rutin koridor Mranggen-Onggorawe' },
      '2021': { target: 75.0, realisasi: 76.45, notes: 'Peningkatan jalan beton dan rigid pavement di Sayung' },
      '2022': { target: 78.0, realisasi: 79.94, notes: 'Optimalisasi DAK Fisik & Bantuan Keuangan Provinsi' },
      '2023': { target: 81.5, realisasi: 83.58, notes: 'Penanganan jalur logistik pertanian Karanganyar & Wedung' },
      '2024': { target: 84.5, realisasi: 86.62, notes: 'Realisasi semester II melampaui target Renstra' },
      '2025': { target: 87.0, realisasi: 89.35, notes: 'Prognosa penuntasan ruas lingkar luar Demak' },
      '2026': { target: 90.0, realisasi: 92.00, notes: 'Target akhir periode RPJMD' }
    }
  },
  {
    id: 'IND-IKD-02',
    code: 'IKD-02',
    name: 'Persentase Luas Irigasi Kabupaten dalam Kondisi Baik dan Berfungsi',
    categoryId: 'ikd',
    bidangId: 'sda',
    wewenangBidang: 'Bidang Sumber Daya Air',
    pejabatPenanggungJawab: 'Kepala Bidang Sumber Daya Air',
    seksiPelaksana: 'Seksi Operasi dan Pemeliharaan Jaringan Irigasi',
    unit: '%',
    polarization: 'maximize',
    definition: 'Rasio luas areal persawahan yang dilayani oleh jaringan irigasi kewenangan Kabupaten Demak dalam kondisi fisik baik/sedang dan mengalirkan air dengan optimal terhadap total luas areal irigasi kabupaten.',
    formula: '(Luas Daerah Irigasi Kondisi Baik / Total Luas Daerah Irigasi Kabupaten) × 100%',
    formulaExpr: '(L_IRIGASI_BAIK / L_IRIGASI_TOTAL) * 100',
    formulaVars: ['VAR_SDA_01', 'VAR_SDA_02'],
    source: 'Inventarisasi E-PAKSI & Survei Indeks Kinerja Sistem Irigasi (IKSI) Bidang SDA DINPUTARU',
    records: {
      '2020': { target: 70.0, realisasi: 71.79, notes: 'Normalisasi saluran sekunder Karangawen & Guntur' },
      '2021': { target: 72.5, realisasi: 74.20, notes: 'Rehabilitasi pintu air dan talud irigasi DI Cabean' },
      '2022': { target: 75.0, realisasi: 76.99, notes: 'Pemberdayaan P3A dalam pemeliharaan berkala' },
      '2023': { target: 78.0, realisasi: 79.65, notes: 'Peningkatan efisiensi saluran tersier lumbung pangan Demak' },
      '2024': { target: 80.5, realisasi: 82.05, notes: 'Program modernisasi irigasi presisi' },
      '2025': { target: 83.0, realisasi: 83.97, notes: 'Pencegahan sedimentasi saluran primer' },
      '2026': { target: 85.5, realisasi: 85.90, notes: 'Target kesiapan ketahanan pangan daerah' }
    }
  },
  {
    id: 'IND-IKD-03',
    code: 'IKD-03',
    name: 'Persentase Rumah Tangga Memperoleh Akses Air Minum Layak',
    categoryId: 'ikd',
    bidangId: 'cipta_karya',
    wewenangBidang: 'Bidang Cipta Karya',
    pejabatPenanggungJawab: 'Kepala Bidang Cipta Karya',
    seksiPelaksana: 'Seksi Air Minum dan Penyehatan Lingkungan Permukiman',
    unit: '%',
    polarization: 'maximize',
    definition: 'Proporsi rumah tangga di Kabupaten Demak yang memiliki akses terhadap fasilitas penyediaan air minum yang memenuhi syarat fisik, kimia, dan bakteriologis (perpipaan SPAM & non-perpipaan terlindungi).',
    formula: '(Jumlah KK Berakses Air Minum Layak / Jumlah Seluruh KK Kab. Demak) × 100%',
    formulaExpr: '(KK_AIR_MINUM / KK_TOTAL_DEMAK) * 100',
    formulaVars: ['VAR_CK_01', 'VAR_CK_02'],
    source: 'Bidang Cipta Karya DINPUTARU Demak, SPAM IKK, PPSP & Data Susenas BPS',
    records: {
      '2020': { target: 76.0, realisasi: 78.84, notes: 'Perluasan jaringan pipa SPAM Bregas & Pamsimas' },
      '2021': { target: 79.0, realisasi: 80.53, notes: 'Intervensi wilayah pesisir krisis air payau' },
      '2022': { target: 81.5, realisasi: 82.55, notes: 'Optimalisasi pemanfaatan Waduk Jatibarang / Kedung Ombo' },
      '2023': { target: 83.5, realisasi: 84.79, notes: 'Pemasangan sambungan rumah (SR) MBR bersubsidi' },
      '2024': { target: 85.5, realisasi: 86.87, notes: 'Penyaluran air bersih perdesaan pesisir Demak' },
      '2025': { target: 87.5, realisasi: 88.83, notes: 'Peningkatan kapasitas reservoir distribusi' },
      '2026': { target: 90.0, realisasi: 90.78, notes: 'Target universal access air minum 100%' }
    }
  },

  // SEGMEN 3: INDIKATOR KINERJA PROGRAM (IKP)
  {
    id: 'IND-IKP-BM-01',
    code: 'IKP-BM-01',
    name: 'Persentase Jembatan Kabupaten dalam Kondisi Baik dan Layak',
    categoryId: 'ikp',
    bidangId: 'bina_marga',
    wewenangBidang: 'Bidang Bina Marga',
    pejabatPenanggungJawab: 'Kepala Bidang Bina Marga',
    seksiPelaksana: 'Seksi Jembatan & Bangunan Pelengkap Jalan',
    unit: '%',
    polarization: 'maximize',
    definition: 'Proporsi jembatan pada ruas jalan kabupaten yang memiliki kondisi struktural aman, lantai dan gelagar tidak retak/ambles, serta berfungsi normal memperlancar arus transportasi.',
    formula: '(Jumlah Jembatan Kondisi Baik & Sedang / Total Jembatan Kabupaten) × 100%',
    formulaExpr: '(JEMBATAN_BAIK / JEMBATAN_TOTAL) * 100',
    formulaVars: ['VAR_BM_01'],
    source: 'Database Sistem Manajemen Jembatan (BMS) Bidang Bina Marga DINPUTARU Demak',
    records: {
      '2020': { target: 82.0, realisasi: 83.4, notes: 'Penggantian jembatan gelagar kayu ke komposit' },
      '2021': { target: 84.0, realisasi: 85.1, notes: 'Perbaikan oprit jembatan terdampak rob pesisir' },
      '2022': { target: 86.5, realisasi: 87.8, notes: 'Pelebaran jembatan jalur alternatif Gajah-Dempet' },
      '2023': { target: 88.0, realisasi: 89.5, notes: 'Pemeliharaan berkala expansion joint jembatan utama' },
      '2024': { target: 90.0, realisasi: 91.2, notes: 'Inspeksi berkala 142 jembatan kabupaten' },
      '2025': { target: 91.5, realisasi: 92.4, notes: 'Pemasangan rambu tonase pembatas muatan' },
      '2026': { target: 93.0, realisasi: 93.8, notes: 'Standardisasi keselamatan jembatan' }
    }
  },
  {
    id: 'IND-IKP-SDA-01',
    code: 'IKP-SDA-01',
    name: 'Rasio Luas Kawasan Rawan Banjir/Rob yang Tertangani Pengendalian Genangan',
    categoryId: 'ikp',
    bidangId: 'sda',
    wewenangBidang: 'Bidang Sumber Daya Air',
    pejabatPenanggungJawab: 'Kepala Bidang Sumber Daya Air',
    seksiPelaksana: 'Seksi Pengendalian Banjir & Drainase Pesisir',
    unit: '%',
    polarization: 'maximize',
    definition: 'Persentase luas kawasan permukiman dan tambak/pertanian pesisir (Sayung, Karangtengah, Bonang, Wedung) yang terlindungi dari limpasan banjir rob melalui tanggul laut, polder, dan rumah pompa.',
    formula: '(Luas Kawasan Rawan Banjir/Rob Tertangani / Total Luas Kawasan Rawan) × 100%',
    formulaExpr: '(L_ROB_TERTANGANI / L_ROB_TOTAL) * 100',
    formulaVars: ['VAR_SDA_03', 'VAR_SDA_04'],
    source: 'Bidang Sumber Daya Air DINPUTARU Demak & Balai Besar Wilayah Sungai (BBWS) Pemali-Juana',
    records: {
      '2020': { target: 35.0, realisasi: 38.54, notes: 'Operasional pompa darurat banjir Sayung' },
      '2021': { target: 40.0, realisasi: 43.75, notes: 'Pembangunan polder percontohan Sriwulan' },
      '2022': { target: 47.0, realisasi: 51.04, notes: 'Sinergi tanggul laut Tol Semarang-Demak Seksi 1 & 2' },
      '2023': { target: 54.0, realisasi: 57.92, notes: 'Penguatan tanggul sungai Buyaran dan Sungai Dolog' },
      '2024': { target: 60.0, realisasi: 65.00, notes: 'Penambahan 6 unit pompa mobile kapasitas tinggi' },
      '2025': { target: 68.0, realisasi: 71.88, notes: 'Integrasi sistem drainase perkotaan Demak' },
      '2026': { target: 75.0, realisasi: 79.17, notes: 'Target masterplan pengendalian rob pesisir Demak' }
    }
  },
  {
    id: 'IND-IKP-CK-01',
    code: 'IKP-CK-01',
    name: 'Persentase Rumah Tangga dengan Akses Sanitasi dan Air Limbah Layak',
    categoryId: 'ikp',
    bidangId: 'cipta_karya',
    wewenangBidang: 'Bidang Cipta Karya',
    pejabatPenanggungJawab: 'Kepala Bidang Cipta Karya',
    seksiPelaksana: 'Seksi Sanitasi & Penyehatan Lingkungan Permukiman',
    unit: '%',
    polarization: 'maximize',
    definition: 'Persentase kepala keluarga yang menggunakan jamban leher angsa bersumber tangki septik aman atau SPALD-T/SPALD-S yang memenuhi baku mutu kesehatan lingkungan.',
    formula: '(Jumlah KK Berakses Sanitasi Layak / Jumlah KK Total Demak) × 100%',
    formulaExpr: '(KK_SANITASI / KK_TOTAL_DEMAK) * 100',
    formulaVars: ['VAR_CK_03', 'VAR_CK_02'],
    source: 'Bidang Cipta Karya DINPUTARU, Dinas Kesehatan Kab. Demak & Verifikasi ODF Desa',
    records: {
      '2020': { target: 75.0, realisasi: 77.00, notes: 'Pembangunan tangki septik individual pedesaan' },
      '2021': { target: 77.5, realisasi: 79.17, notes: 'Pemberantasan buang air besar sembarangan (BABS)' },
      '2022': { target: 80.0, realisasi: 81.76, notes: 'Deklarasi 180 desa ODF (Open Defecation Free)' },
      '2023': { target: 82.5, realisasi: 84.36, notes: 'Pembangunan IPAL Komunal permukiman padat' },
      '2024': { target: 85.0, realisasi: 86.68, notes: 'Optimalisasi Instalasi Pengolahan Lumpur Tinja (IPLT)' },
      '2025': { target: 87.5, realisasi: 88.96, notes: 'Layanan sedot tinja berkala terpadu' },
      '2026': { target: 90.0, realisasi: 90.91, notes: 'Menuju Demak Bebas BABS 100% dan Sanitasi Aman' }
    }
  },

  // SEGMEN 4: INDIKATOR KINERJA KEGIATAN (IKK)
  {
    id: 'IND-IKK-BK-01',
    code: 'IKK-BK-01',
    name: 'Jumlah Tenaga Kerja Konstruksi yang Memiliki Sertifikat Standar Kompetensi Kerja (SKK)',
    categoryId: 'ikk',
    bidangId: 'bina_konstruksi',
    wewenangBidang: 'Bidang Bina Konstruksi',
    pejabatPenanggungJawab: 'Kepala Bidang Bina Konstruksi',
    seksiPelaksana: 'Seksi Pembinaan, Kelembagaan & Sertifikasi Jasa Konstruksi',
    unit: 'Orang',
    polarization: 'maximize',
    definition: 'Jumlah tukang, mandor, dan pelaksana teknis konstruksi di Kabupaten Demak yang telah lulus uji kompetensi dan memiliki sertifikat resmi sesuai UU No. 2 Tahun 2017 tentang Jasa Konstruksi.',
    formula: 'Akumulasi jumlah tenaga kerja konstruksi terlatih dan tersertifikasi (orang)',
    formulaExpr: 'TKK_SERTIFIKAT',
    formulaVars: ['VAR_BK_01'],
    source: 'Bidang Bina Konstruksi DINPUTARU Kab. Demak & Lembaga Sertifikasi Profesi (LSP)',
    records: {
      '2020': { target: 150, realisasi: 185, notes: 'Pelatihan tukang pasang batu & pembesian' },
      '2021': { target: 200, realisasi: 240, notes: 'Fasilitasi sertifikasi gratis bagi pekerja lokal Demak' },
      '2022': { target: 300, realisasi: 365, notes: 'Kerjasama dengan Balai Jasa Konstruksi Wilayah IV' },
      '2023': { target: 450, realisasi: 490, notes: 'Pelatihan Keselamatan dan Kesehatan Kerja Konstruksi (K3)' },
      '2024': { target: 550, realisasi: 610, notes: 'Uji kompetensi mobile training unit (MTU)' },
      '2025': { target: 700, realisasi: 750, notes: 'Target sertifikasi pengawas lapangan' },
      '2026': { target: 850, realisasi: 900, notes: 'Standardisasi seluruh mitra penyedia jasa DINPUTARU' }
    }
  }
];

// Rich Seed Documents for Bank Data (16 authentic documents so pagination default 10 is showcased)
const DEFAULT_DOCUMENTS = [
  {
    id: 'DOC-2024-001',
    title: 'Laporan Akhir Survei Kondisi Jalan (SKJ) Triwulan IV Tahun 2024',
    category: 'Laporan Teknis',
    bidangId: 'bina_marga',
    year: 2024,
    date: '2024-12-15',
    fileType: 'PDF',
    fileSize: '4.8 MB',
    uploader: 'Rizky Kurniawan, S.T. (Koordinator Bina Marga)',
    indicatorCode: 'IKD-01',
    tags: ['Bina Marga', 'Jalan Mantap', 'Survei SKJ', 'IRMS', 'Mranggen', 'Sayung'],
    desc: 'Memuat data kondisi jalan baik, sedang, rusak ringan, dan rusak berat di 14 kecamatan se-Kabupaten Demak beserta foto dokumentasi lapangan dan koordinat GPS.'
  },
  {
    id: 'DOC-2024-002',
    title: 'Buku Neraca Air & Laporan Inventarisasi E-PAKSI Irigasi Kabupaten Demak 2024',
    category: 'Data Base / Spasial',
    bidangId: 'sda',
    year: 2024,
    date: '2024-11-20',
    fileType: 'XLSX',
    fileSize: '12.4 MB',
    uploader: 'Tri Wahyudi, S.T. (Koordinator Bidang SDA)',
    indicatorCode: 'IKD-02',
    tags: ['SDA', 'Irigasi', 'E-PAKSI', 'Debit Air', 'DI Cabean'],
    desc: 'Database digital pemetaan 138 Daerah Irigasi (DI) kewenangan kabupaten, saluran primer, sekunder, dan tersier serta kondisi fisik bangunan bagi/sadap.'
  },
  {
    id: 'DOC-2024-003',
    title: 'Laporan Kinerja Instansi Pemerintah (LKjIP) DINPUTARU Kab. Demak Tahun 2023',
    category: 'Laporan Akuntabilitas',
    bidangId: 'sekretariat',
    year: 2023,
    date: '2024-02-28',
    fileType: 'PDF',
    fileSize: '7.2 MB',
    uploader: 'Eko Prasetyo, S.E., M.Acc. (Kasubag Program)',
    indicatorCode: 'IKU-01',
    tags: ['SAKIP', 'LKjIP', 'Renstra', 'Evaluasi Kinerja', 'Akuntabilitas'],
    desc: 'Laporan akuntabilitas resmi atas pencapaian Indikator Kinerja Utama (IKU) dan sasaran strategis Renstra DINPUTARU Kab. Demak periode 2021-2026.'
  },
  {
    id: 'DOC-2024-004',
    title: 'Dokumen Rencana Tata Ruang Wilayah (RTRW) Kabupaten Demak 2020-2040 (Perda No. 1/2020)',
    category: 'Regulasi & Kebijakan',
    bidangId: 'tata_ruang',
    year: 2024,
    date: '2024-06-10',
    fileType: 'PDF',
    fileSize: '18.5 MB',
    uploader: 'Kabid Tata Ruang',
    indicatorCode: 'IKU-02',
    tags: ['RTRW', 'Zonasi', 'KKPR', 'Perda', 'Tata Ruang', 'Kawasan Industri'],
    desc: 'Naskah lengkap Peraturan Daerah tentang RTRW Kabupaten Demak beserta lampiran peta struktur ruang, pola ruang, dan kawasan strategis kabupaten.'
  },
  {
    id: 'DOC-2024-005',
    title: 'Rekapitulasi Capaian DAK Fisik Air Minum & Sanitasi Berbasis Masyarakat 2024',
    category: 'Data Base / Spasial',
    bidangId: 'cipta_karya',
    year: 2024,
    date: '2024-10-18',
    fileType: 'XLSX',
    fileSize: '3.1 MB',
    uploader: 'Koordinator Cipta Karya',
    indicatorCode: 'IKD-03',
    tags: ['Air Minum', 'Sanitasi', 'DAK', 'PPSP', 'ODF', 'SPAM'],
    desc: 'Rincian penerima manfaat pembangunan sarana air minum SPAM perdesaan dan pembangunan tangki septik skala komunal/individual per desa.'
  },
  {
    id: 'DOC-2024-006',
    title: 'Data Sertifikasi Standar Kompetensi Tenaga Kerja Konstruksi (SKK) DINPUTARU Demak 2024',
    category: 'Sertifikasi & Legalitas',
    bidangId: 'bina_konstruksi',
    year: 2024,
    date: '2024-12-05',
    fileType: 'PDF',
    fileSize: '2.3 MB',
    uploader: 'Koordinator Bina Konstruksi',
    indicatorCode: 'IKK-BK-01',
    tags: ['Bina Konstruksi', 'Sertifikasi', 'SKK', 'Tukang', 'LPJK'],
    desc: 'Daftar nama tenaga kerja konstruksi ber-SKK dari BNSP/LPJK hasil fasilitasi pelatihan dan uji kompetensi DINPUTARU Kabupaten Demak tahun 2024.'
  },
  {
    id: 'DOC-2024-007',
    title: 'Peta Spasial Geospasial Wilayah Rawan Bencana Banjir Rob Kawasan Pesisir Sayung-Bonang',
    category: 'Data Base / Spasial',
    bidangId: 'sda',
    year: 2024,
    date: '2024-09-12',
    fileType: 'ZIP',
    fileSize: '24.6 MB',
    uploader: 'Tri Wahyudi, S.T. (Koordinator Bidang SDA)',
    indicatorCode: 'IKP-SDA-01',
    tags: ['Geospasial', 'Shapefile', 'GIS', 'Banjir Rob', 'Sayung', 'Tanggul'],
    desc: 'Paket Shapefile (SHP) batas kawasan genangan pasang air laut, kontur pasang surut, dan lokasi stasiun pompa air polder di pesisir Sayung dan Bonang.'
  },
  {
    id: 'DOC-2024-008',
    title: 'Laporan Evaluasi Rencana Strategis (Renstra) DINPUTARU Demak Tahun Ketiga Periode 2021-2026',
    category: 'Laporan Akuntabilitas',
    bidangId: 'sekretariat',
    year: 2024,
    date: '2024-08-30',
    fileType: 'PDF',
    fileSize: '6.4 MB',
    uploader: 'Eko Prasetyo, S.E., M.Acc. (Kasubag Program)',
    indicatorCode: 'IKU-01',
    tags: ['Renstra', 'RPJMD', 'Evaluasi Renja', 'SAKIP'],
    desc: 'Evaluasi berkala terhadap target dan realisasi Renstra DINPUTARU Kab. Demak tahun ke-3 dengan rekomendasi percepatan program infrastruktur prioritas.'
  },
  {
    id: 'DOC-2024-009',
    title: 'Database Jembatan Kabupaten Demak (Bridge Management System / BMS) 2024',
    category: 'Data Base / Spasial',
    bidangId: 'bina_marga',
    year: 2024,
    date: '2024-07-22',
    fileType: 'XLSX',
    fileSize: '5.2 MB',
    uploader: 'Rizky Kurniawan, S.T. (Koordinator Bina Marga)',
    indicatorCode: 'IKP-BM-01',
    tags: ['Jembatan', 'BMS', 'Bina Marga', 'Bentang Jembatan'],
    desc: 'Inventarisasi 142 jembatan kabupaten Demak mencakup kondisi tiang pancang, gelagar, abutment, lantai jembatan, dan rekomendasi penanganan rehabilitasi.'
  },
  {
    id: 'DOC-2024-010',
    title: 'Surat Keputusan Bupati Demak tentang Penetapan Status Ruas Jalan Kabupaten Demak',
    category: 'Regulasi & Kebijakan',
    bidangId: 'bina_marga',
    year: 2023,
    date: '2023-04-15',
    fileType: 'PDF',
    fileSize: '3.8 MB',
    uploader: 'Budi Santoso, S.T., M.T. (Super Admin)',
    indicatorCode: 'IKD-01',
    tags: ['SK Bupati', 'Status Jalan', 'Regulasi', 'Panjang Ruas'],
    desc: 'Surat Keputusan resmi mengenai nama, nomor ruas, dan total panjang jalan kewenangan Kabupaten Demak sepanjang 565,2 Kilometer.'
  },
  {
    id: 'DOC-2024-011',
    title: 'Dokumen Masterplan Pengendalian Banjir dan Rob Pesisir Kabupaten Demak 2022-2042',
    category: 'Laporan Teknis',
    bidangId: 'sda',
    year: 2024,
    date: '2024-05-18',
    fileType: 'PDF',
    fileSize: '15.1 MB',
    uploader: 'Tri Wahyudi, S.T. (Koordinator Bidang SDA)',
    indicatorCode: 'IKP-SDA-01',
    tags: ['Masterplan', 'Rob', 'Polder', 'BBWS', 'Sayung'],
    desc: 'Kajian komprehensif masterplan sistem drainase pesisir, perkuatan tanggul laut terpadu Tol Semarang-Demak, dan penataan kolam retensi.'
  },
  {
    id: 'DOC-2024-012',
    title: 'Laporan Pengawasan dan Penertiban Pemanfaatan Ruang Triwulan III Tahun 2024',
    category: 'Laporan Teknis',
    bidangId: 'tata_ruang',
    year: 2024,
    date: '2024-10-05',
    fileType: 'DOCX',
    fileSize: '2.7 MB',
    uploader: 'Kabid Tata Ruang',
    indicatorCode: 'IKU-02',
    tags: ['Tata Ruang', 'KKPR', 'Pengawasan', 'Zonasi Industri'],
    desc: 'Hasil inspeksi lapangan kepatuhan perizinan berusaha terhadap izin KKPR serta penanganan indikasi pelanggaran fungsi ruang di koridor jalan pantura.'
  },
  {
    id: 'DOC-2024-013',
    title: 'Buku Profil Sanitasi Kabupaten Demak (Strategi Sanitasi Kabupaten / SSK Pemutakhiran)',
    category: 'Laporan Teknis',
    bidangId: 'cipta_karya',
    year: 2024,
    date: '2024-06-25',
    fileType: 'PDF',
    fileSize: '8.9 MB',
    uploader: 'Koordinator Cipta Karya',
    indicatorCode: 'IKP-CK-01',
    tags: ['Sanitasi', 'SSK', 'Lumpur Tinja', 'IPLT', 'BABS Free'],
    desc: 'Profil sanitasi permukiman, peta cakupan tangki septik aman, operasional truk sedot tinja IPLT Kalikondang, dan baseline data ODF desa.'
  },
  {
    id: 'DOC-2024-014',
    title: 'Perjanjian Kinerja (PK) Kepala Dinas PUPR Kabupaten Demak Tahun Anggaran 2024',
    category: 'Laporan Akuntabilitas',
    bidangId: 'sekretariat',
    year: 2024,
    date: '2024-01-10',
    fileType: 'PDF',
    fileSize: '1.9 MB',
    uploader: 'Drs. H. Ahmad Sugiharto, S.T., M.Si. (Kepala Dinas)',
    indicatorCode: 'IKU-01',
    tags: ['Perjanjian Kinerja', 'PK', 'Bupati Demak', 'Target IKU'],
    desc: 'Dokumen resmi Perjanjian Kinerja antara Kepala DINPUTARU dengan Bupati Demak yang memuat target indikator kinerja utama tahun 2024.'
  },
  {
    id: 'DOC-2024-015',
    title: 'Petunjuk Teknis Penerbitan Konfirmasi Kesesuaian Kegiatan Pemanfaatan Ruang (KKPR)',
    category: 'Regulasi & Kebijakan',
    bidangId: 'tata_ruang',
    year: 2023,
    date: '2023-09-14',
    fileType: 'PDF',
    fileSize: '3.4 MB',
    uploader: 'Kabid Tata Ruang',
    indicatorCode: 'IKU-02',
    tags: ['KKPR', 'Juknis', 'OSS', 'Tata Ruang', 'Pelayanan'],
    desc: 'Pedoman standar operasional prosedur (SOP) verifikasi izin ruang non-berusaha dan berusaha melalui sistem digital terintegrasi.'
  },
  {
    id: 'DOC-2024-016',
    title: 'Rekapitulasi Pelatihan K3 Konstruksi dan Sertifikasi Tukang Terampil Demak',
    category: 'Sertifikasi & Legalitas',
    bidangId: 'bina_konstruksi',
    year: 2023,
    date: '2023-11-28',
    fileType: 'XLSX',
    fileSize: '1.8 MB',
    uploader: 'Koordinator Bina Konstruksi',
    indicatorCode: 'IKK-BK-01',
    tags: ['K3', 'Konstruksi', 'Tukang', 'Pelatihan'],
    desc: 'Data rincian nama peserta, NIK, jenis sub-klasifikasi keterampilan (batu, besi, kayu, perpipaan), dan nomor registrasi SKK yang diterbitkan.'
  }
];

// System State Manager
class SimondemakStore {
  constructor() {
    this.data = this.loadData();
    // Default current user session (stored in localStorage or null for guest)
    const savedUserId = localStorage.getItem('simondemak_session_user_id');
    this.currentUser = savedUserId ? (this.data.users.find(u => u.id === savedUserId) || null) : null;
    this.listeners = [];
    this.initBackendSync();
  }

  initBackendSync() {
    if (typeof fetch !== 'undefined') {
      fetch('/api/admin/data')
        .then(res => res.json())
        .then(res => {
          if (res && res.success && res.data) {
            this.data = res.data;
            if (!this.data.visibleYears) {
              this.data.visibleYears = [...this.data.years];
            }
            if (!this.data.activeYear) {
              this.data.activeYear = 2026;
            }
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
            this.notify();
          }
        })
        .catch(err => {
          // Fallback to local storage if running in standalone without backend
          console.log('App running with local storage cache');
        });
    }
  }

  loadData() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.users && parsed.indicators) {
          if (!parsed.visibleYears) parsed.visibleYears = parsed.years || DEFAULT_YEARS;
          if (!parsed.activeYear) parsed.activeYear = 2026;
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse localStorage data, restoring default v2', e);
    }
    return this.getDefaultData();
  }

  getDefaultData() {
    return {
      roles: DEFAULT_ROLES,
      bidang: DEFAULT_BIDANG,
      users: DEFAULT_USERS,
      categories: DEFAULT_CATEGORIES,
      years: DEFAULT_YEARS,
      visibleYears: [2020, 2021, 2022, 2023, 2024, 2025, 2026],
      activeYear: 2026,
      variables: DEFAULT_VARIABLES,
      indicators: DEFAULT_INDICATORS,
      documents: DEFAULT_DOCUMENTS,
      systemInfo: {
        appName: 'SIDAT - SATUPUTARU',
        instansi: 'Dinas Pekerjaan Umum dan Penataan Ruang (DINPUTARU) Kabupaten Demak',
        tagline: 'Sistem Informasi Capaian Kinerja & Satu Data Kab. Demak',
        heroBadge: 'PORTAL SATU DATA & CAPAIAN KINERJA PEMKAB DEMAK',
        heroTitle: 'Sistem Informasi Capaian Kinerja & Satu Data Kab. Demak',
        heroSubtitle: 'Akses informasi capaian kinerja indikator pembangunan dan bank data infrastruktur DINPUTARU Kabupaten Demak secara transparan, akuntabel, dan terintegrasi.',
        welcomeTitle: 'Selamat Datang di SIDAT - SATUPUTARU',
        welcomeText: 'Portal resmi pemantauan capaian kinerja indikator daerah, IKU, program, dan bank data DINPUTARU Kabupaten Demak.',
        officeAddress: 'Jalan Kyai Jebat No. 892 Demak, Jawa Tengah 59511',
        contactPhone: '(0291) 685123',
        contactEmail: 'dinputaru@demakkab.go.id',
        footerText: '© 2026 DINPUTARU Kabupaten Demak. Hak Cipta Dilindungi.',
        version: '3.0.0',
        lastUpdated: new Date().toISOString()
      }
    };
  }

  saveData() {
    try {
      this.data.systemInfo.lastUpdated = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
      this.notify();
      if (typeof fetch !== 'undefined') {
        fetch('/api/admin/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: this.data })
        }).catch(err => {
          // offline mode
        });
      }
    } catch (e) {
      console.error('Failed to save data to localStorage', e);
    }
  }

  resetToDefault() {
    this.data = this.getDefaultData();
    this.saveData();
    return true;
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(fn => fn(this.data));
  }

  /* ----------------- AUTHENTICATION & SESSION ----------------- */
  getCurrentUser() {
    return this.currentUser;
  }

  isLoggedIn() {
    return this.currentUser !== null;
  }

  login(username, password) {
    const user = this.data.users.find(u => 
      (u.username.toLowerCase() === username.toLowerCase().trim() || u.email.toLowerCase() === username.toLowerCase().trim()) &&
      u.password === password
    );

    if (user) {
      if (user.status !== 'active') {
        return { success: false, message: 'Akun Anda berstatus non-aktif. Silakan hubungi Super Admin.' };
      }
      this.currentUser = user;
      localStorage.setItem('simondemak_session_user_id', user.id);
      this.notify();
      return { success: true, user };
    }
    return { success: false, message: 'Username atau Password salah!' };
  }

  loginAs(userId) {
    const user = this.data.users.find(u => u.id === userId);
    if (user) {
      this.currentUser = user;
      localStorage.setItem('simondemak_session_user_id', user.id);
      this.notify();
      return { success: true, user };
    }
    return { success: false, message: 'User tidak ditemukan' };
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('simondemak_session_user_id');
    this.notify();
  }

  // Permissions according to user prompt
  canManageUsers() {
    return this.currentUser && this.currentUser.role === 'super_admin';
  }

  canEditMaster() {
    return this.currentUser && this.currentUser.role === 'super_admin';
  }

  // Koordinator Bidang and Super Admin can input indicator data, target & realisasi
  canInputIndicatorsAndTargets() {
    if (!this.currentUser) return false;
    return ['super_admin', 'koordinator_bidang', 'kasubag_program_keuangan'].includes(this.currentUser.role);
  }

  // Koordinator Bidang and Super Admin can add, edit, and delete Bank Data
  canManageBankData() {
    if (!this.currentUser) return false;
    return ['super_admin', 'koordinator_bidang'].includes(this.currentUser.role);
  }

  // Kepala Bidang, Kasubag, Sekretaris, dan Kepala Dinas can view dashboard & print reports
  canViewExecutiveDashboard() {
    if (!this.currentUser) return false;
    return ['super_admin', 'kepala_dinas', 'sekretaris', 'kepala_bidang', 'kasubag_program_keuangan', 'kasubag_umum_kepegawaian', 'koordinator_bidang'].includes(this.currentUser.role);
  }

  /* ----------------- USER CRUD (SUPER ADMIN) ----------------- */
  getUsers() {
    return this.data.users;
  }

  getUserById(id) {
    return this.data.users.find(u => u.id === id);
  }

  saveUser(user) {
    const idx = this.data.users.findIndex(u => u.id === user.id);
    if (idx >= 0) {
      this.data.users[idx] = { ...this.data.users[idx], ...user };
    } else {
      if (!user.id) user.id = 'USR-' + Date.now();
      this.data.users.push(user);
    }
    this.saveData();
    return user;
  }

  deleteUser(id) {
    // Prevent deleting the primary superadmin
    if (id === 'USR-001') {
      return { success: false, message: 'Akun Super Admin Utama tidak dapat dihapus!' };
    }
    this.data.users = this.data.users.filter(u => u.id !== id);
    if (this.currentUser && this.currentUser.id === id) {
      this.logout();
    }
    this.saveData();
    return { success: true };
  }

  /* ----------------- INDICATORS CRUD ----------------- */
  getIndicators() {
    return this.data.indicators;
  }

  getIndicatorById(id) {
    return this.data.indicators.find(ind => ind.id === id || ind.code === id);
  }

  saveIndicator(indicator) {
    // Auto-fill wewenangBidang label if not present
    if (indicator.bidangId && !indicator.wewenangBidang) {
      const b = this.data.bidang.find(b => b.id === indicator.bidangId);
      indicator.wewenangBidang = b ? b.name : 'DINPUTARU Kabupaten Demak';
      indicator.pejabatPenanggungJawab = b ? b.head : 'Kepala Bidang Terkait';
      indicator.seksiPelaksana = b ? b.seksi : 'Seksi Teknis Pelaksana';
    }

    const idx = this.data.indicators.findIndex(i => i.id === indicator.id);
    if (idx >= 0) {
      this.data.indicators[idx] = { ...this.data.indicators[idx], ...indicator };
    } else {
      if (!indicator.id) {
        indicator.id = 'IND-' + Date.now();
      }
      if (!indicator.records) {
        indicator.records = {};
        this.data.years.forEach(yr => {
          indicator.records[yr] = { target: 0, realisasi: 0, notes: '' };
        });
      }
      this.data.indicators.push(indicator);
    }
    this.saveData();
    return indicator;
  }

  deleteIndicator(id) {
    this.data.indicators = this.data.indicators.filter(i => i.id !== id);
    this.saveData();
  }

  updateRecord(indicatorId, year, field, value, notes) {
    const indicator = this.getIndicatorById(indicatorId);
    if (!indicator) return false;
    if (!indicator.records) indicator.records = {};
    if (!indicator.records[year]) {
      indicator.records[year] = { target: 0, realisasi: 0, notes: '' };
    }
    
    if (field === 'target') {
      indicator.records[year].target = parseFloat(value) || 0;
    } else if (field === 'realisasi') {
      indicator.records[year].realisasi = parseFloat(value) || 0;
    }
    if (notes !== undefined) {
      indicator.records[year].notes = notes;
    }
    this.saveData();
    return true;
  }

  calculateCapaian(target, realisasi, polarization = 'maximize') {
    if (!target || target === 0) return 0;
    let pct = 0;
    if (polarization === 'minimize') {
      pct = (target / realisasi) * 100;
    } else {
      pct = (realisasi / target) * 100;
    }
    return Math.round(pct * 100) / 100;
  }

  getStatus(percentage) {
    if (percentage >= 100) {
      return { label: 'Melampaui Target', class: 'status-success', icon: 'check-circle-2', color: '#10b981', bg: '#ecfdf5' };
    } else if (percentage >= 85) {
      return { label: 'Tercapai Baik', class: 'status-good', icon: 'check', color: '#0284c7', bg: '#f0f9ff' };
    } else if (percentage >= 70) {
      return { label: 'Cukup', class: 'status-warning', icon: 'alert-triangle', color: '#d97706', bg: '#fffbeb' };
    } else if (percentage > 0) {
      return { label: 'Kurang', class: 'status-danger', icon: 'alert-octagon', color: '#dc2626', bg: '#fef2f2' };
    } else {
      return { label: 'Belum Ada Data', class: 'status-empty', icon: 'clock', color: '#64748b', bg: '#f8fafc' };
    }
  }

  /* ----------------- DYNAMIC YEAR & PUBLIC VISIBILITY MANAGEMENT ----------------- */
  getVisibleYears() {
    if (!this.data.visibleYears || !Array.isArray(this.data.visibleYears)) {
      this.data.visibleYears = [...this.data.years];
    }
    return this.data.visibleYears.slice().sort((a, b) => a - b);
  }

  getActiveYear() {
    return this.data.activeYear || 2026;
  }

  setActiveYear(year) {
    const yr = parseInt(year, 10);
    if (this.data.years.includes(yr)) {
      this.data.activeYear = yr;
      this.saveData();
      return true;
    }
    return false;
  }

  setVisibleYears(yearsArray, activeYear) {
    if (Array.isArray(yearsArray)) {
      this.data.visibleYears = yearsArray
        .map(y => parseInt(y, 10))
        .filter(y => this.data.years.includes(y))
        .sort((a, b) => a - b);
    }
    if (activeYear && this.data.years.includes(parseInt(activeYear, 10))) {
      this.data.activeYear = parseInt(activeYear, 10);
    }
    this.saveData();

    if (typeof fetch !== 'undefined') {
      fetch('/api/admin/years/visibility', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          visibleYears: this.data.visibleYears,
          activeYear: this.data.activeYear
        })
      }).catch(e => console.debug('Offline mode'));
    }
    return true;
  }

  isYearVisible(year) {
    const yr = parseInt(year, 10);
    return this.getVisibleYears().includes(yr);
  }

  addYear(newYear, isVisible = true) {
    const yr = parseInt(newYear, 10);
    if (!yr || isNaN(yr) || this.data.years.includes(yr)) return false;
    
    this.data.years.push(yr);
    this.data.years.sort((a, b) => a - b);

    if (!this.data.visibleYears) this.data.visibleYears = [...this.data.years];
    if (isVisible && !this.data.visibleYears.includes(yr)) {
      this.data.visibleYears.push(yr);
      this.data.visibleYears.sort((a, b) => a - b);
    }

    this.data.indicators.forEach(ind => {
      if (!ind.records) ind.records = {};
      if (!ind.records[yr]) {
        ind.records[yr] = { target: 0, realisasi: 0, notes: `Tahun ${yr} ditambahkan oleh admin` };
      }
    });

    this.data.variables.forEach(v => {
      if (!v.values) v.values = {};
      if (v.values[yr] === undefined) {
        v.values[yr] = 0;
      }
    });

    this.saveData();

    if (typeof fetch !== 'undefined') {
      fetch('/api/admin/years', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ year: yr, isVisible })
      }).catch(e => console.debug('Offline mode'));
    }

    return true;
  }

  deleteYear(yearToDelete) {
    const yr = parseInt(yearToDelete, 10);
    if (!this.data.years.includes(yr) || this.data.years.length <= 1) return false;

    this.data.years = this.data.years.filter(y => y !== yr);
    if (this.data.visibleYears) {
      this.data.visibleYears = this.data.visibleYears.filter(y => y !== yr);
    }
    if (this.data.activeYear === yr) {
      this.data.activeYear = this.data.years[this.data.years.length - 1];
    }

    this.data.indicators.forEach(ind => {
      if (ind.records && ind.records[yr]) {
        delete ind.records[yr];
      }
    });
    this.data.variables.forEach(v => {
      if (v.values && v.values[yr] !== undefined) {
        delete v.values[yr];
      }
    });

    this.saveData();

    if (typeof fetch !== 'undefined') {
      fetch(`/api/admin/years/${yr}`, { method: 'DELETE' })
        .catch(e => console.debug('Offline mode'));
    }

    return true;
  }

  /* ----------------- MASTER VARIABLES ----------------- */
  getVariables() {
    return this.data.variables;
  }

  getVariableById(id) {
    return this.data.variables.find(v => v.id === id || v.code === id);
  }

  saveVariable(variable) {
    const idx = this.data.variables.findIndex(v => v.id === variable.id);
    if (idx >= 0) {
      this.data.variables[idx] = { ...this.data.variables[idx], ...variable };
    } else {
      if (!variable.id) variable.id = 'VAR-' + Date.now();
      if (!variable.values) {
        variable.values = {};
        this.data.years.forEach(yr => { variable.values[yr] = 0; });
      }
      this.data.variables.push(variable);
    }
    this.saveData();
    return variable;
  }

  deleteVariable(id) {
    this.data.variables = this.data.variables.filter(v => v.id !== id);
    this.saveData();
  }

  computeIndicatorValue(indicatorId, year) {
    const ind = this.getIndicatorById(indicatorId);
    if (!ind || !ind.formulaVars || ind.formulaVars.length === 0) return null;

    if (ind.code === 'IKD-01') {
      const v1 = this.getVariableById('VAR_BM_01')?.values?.[year] || 0;
      const v2 = this.getVariableById('VAR_BM_02')?.values?.[year] || 1;
      return Math.round((v1 / v2) * 10000) / 100;
    }
    if (ind.code === 'IKD-02') {
      const v1 = this.getVariableById('VAR_SDA_01')?.values?.[year] || 0;
      const v2 = this.getVariableById('VAR_SDA_02')?.values?.[year] || 1;
      return Math.round((v1 / v2) * 10000) / 100;
    }
    if (ind.code === 'IKD-03') {
      const v1 = this.getVariableById('VAR_CK_01')?.values?.[year] || 0;
      const v2 = this.getVariableById('VAR_CK_02')?.values?.[year] || 1;
      return Math.round((v1 / v2) * 10000) / 100;
    }
    if (ind.code === 'IKU-02') {
      const v1 = this.getVariableById('VAR_TR_01')?.values?.[year] || 0;
      const v2 = this.getVariableById('VAR_TR_02')?.values?.[year] || 1;
      return Math.round((v1 / v2) * 10000) / 100;
    }
    if (ind.code === 'IKP-SDA-01') {
      const v1 = this.getVariableById('VAR_SDA_03')?.values?.[year] || 0;
      const v2 = this.getVariableById('VAR_SDA_04')?.values?.[year] || 1;
      return Math.round((v1 / v2) * 10000) / 100;
    }
    if (ind.code === 'IKP-CK-01') {
      const v1 = this.getVariableById('VAR_CK_03')?.values?.[year] || 0;
      const v2 = this.getVariableById('VAR_CK_02')?.values?.[year] || 1;
      return Math.round((v1 / v2) * 10000) / 100;
    }
    if (ind.code === 'IKK-BK-01') {
      return this.getVariableById('VAR_BK_01')?.values?.[year] || 0;
    }
    return null;
  }

  /* ----------------- DOCUMENTS / BANK DATA CRUD ----------------- */
  getDocuments() {
    return this.data.documents;
  }

  getDocumentById(id) {
    return this.data.documents.find(d => d.id === id);
  }

  addDocument(doc) {
    if (!doc.id) doc.id = 'DOC-' + Date.now();
    this.data.documents.unshift(doc);
    this.saveData();
    return doc;
  }

  updateDocument(doc) {
    const idx = this.data.documents.findIndex(d => d.id === doc.id);
    if (idx >= 0) {
      this.data.documents[idx] = { ...this.data.documents[idx], ...doc };
      this.saveData();
      return doc;
    }
    return null;
  }

  deleteDocument(id) {
    this.data.documents = this.data.documents.filter(d => d.id !== id);
    this.saveData();
  }

  /* ----------------- CATEGORIES & BIDANG ----------------- */
  getCategories() {
    return this.data.categories;
  }

  saveCategory(cat) {
    const idx = this.data.categories.findIndex(c => c.id === cat.id);
    if (idx >= 0) {
      this.data.categories[idx] = { ...this.data.categories[idx], ...cat };
    } else {
      if (!cat.id) cat.id = 'CAT-' + Date.now();
      this.data.categories.push(cat);
    }
    this.saveData();
  }

  deleteCategory(id) {
    this.data.categories = this.data.categories.filter(c => c.id !== id);
    this.saveData();
  }

  getBidang() {
    return this.data.bidang;
  }

  getYears() {
    return this.data.years;
  }

  // System Text & Content Settings (Super Admin can configure all system texts)
  getSystemInfo() {
    return this.data.systemInfo || {};
  }

  updateSystemInfo(newInfo) {
    this.data.systemInfo = { ...this.data.systemInfo, ...newInfo, lastUpdated: new Date().toISOString() };
    this.saveData();
    return this.data.systemInfo;
  }
}

// Global Store Instance
window.store = new SimondemakStore();
