/**
 * SIDAT - SATUPUTARU - Store & State Management v2
 * Dinas Pekerjaan Umum dan Penataan Ruang Kab. Demak
 */

const STORAGE_KEY = 'sidat_satuputaru_v3';

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
  {
    "id": "iku_daerah",
    "code": "IKU DAERAH",
    "segmentNumber": 1,
    "name": "Indikator Kinerja Utama Daerah",
    "desc": "Indikator makro strategis prioritas pembangunan Pemerintah Kabupaten Demak yang diampu DINPUTARU",
    "badgeColor": "#0284c7"
  },
  {
    "id": "ikd",
    "code": "IKD",
    "segmentNumber": 2,
    "name": "Indikator Kinerja Daerah",
    "desc": "Indikator penyelenggaraan urusan ke-PU-an dan penataan ruang daerah (RPJMD Kabupaten Demak)",
    "badgeColor": "#d97706"
  },
  {
    "id": "iku_pd",
    "code": "IKU PD",
    "segmentNumber": 3,
    "name": "Indikator Kinerja Utama Perangkat Daerah",
    "desc": "Perjanjian kinerja strategis Kepala DINPUTARU Kabupaten Demak dalam Renstra 2021-2026",
    "badgeColor": "#059669"
  },
  {
    "id": "ikk",
    "code": "IKK",
    "segmentNumber": 4,
    "name": "Indikator Kinerja Kunci",
    "desc": "Indikator Evaluasi Penyelenggaraan Pemerintahan Daerah (LPPD) bidang Pekerjaan Umum dan Penataan Ruang",
    "badgeColor": "#db2777"
  },
  {
    "id": "program",
    "code": "PROGRAM",
    "segmentNumber": 5,
    "name": "Indikator Kinerja Program",
    "desc": "Indikator hasil (outcome) program prioritas bidang-bidang teknis DINPUTARU Kabupaten Demak",
    "badgeColor": "#7c3aed"
  },
  {
    "id": "tujuan_sasaran",
    "code": "TUJUAN-SASARAN",
    "segmentNumber": 6,
    "name": "Indikator Tujuan & Sasaran Renstra",
    "desc": "Indikator capaian tujuan dan sasaran strategis Renstra DINPUTARU Kabupaten Demak",
    "badgeColor": "#ea580c"
  }
];

const DEFAULT_YEARS = [2020,2021,2022,2023,2024,2025,2026,2027,2028,2029,2030];

// Master Variabel Perhitungan
const DEFAULT_VARIABLES = [
  {
    "id": "VAR_JALAN_01",
    "code": "PJ_MANTAP",
    "name": "Panjang Jalan Kondisi Mantap (Baik + Sedang)",
    "category": "Bina Marga",
    "unit": "Km",
    "values": {
      "2020": 365.4,
      "2021": 370.2,
      "2022": 375.8,
      "2023": 380.1,
      "2024": 384.5,
      "2025": 390,
      "2026": 395.2,
      "2027": 402,
      "2028": 410.5,
      "2029": 418,
      "2030": 425
    }
  },
  {
    "id": "VAR_JALAN_02",
    "code": "PJ_TOTAL",
    "name": "Total Panjang Jalan Kewenangan Kabupaten Demak",
    "category": "Bina Marga",
    "unit": "Km",
    "values": {
      "2020": 462.5,
      "2021": 462.5,
      "2022": 462.5,
      "2023": 462.5,
      "2024": 462.5,
      "2025": 462.5,
      "2026": 462.5,
      "2027": 462.5,
      "2028": 462.5,
      "2029": 462.5,
      "2030": 462.5
    }
  },
  {
    "id": "VAR_IRIGASI_01",
    "code": "LUAS_IRIGASI_BAIK",
    "name": "Luas Baku Sawah Terlayani Irigasi Berfungsi Baik",
    "category": "Sumber Daya Air",
    "unit": "Ha",
    "values": {
      "2020": 28450,
      "2021": 29100,
      "2022": 29800,
      "2023": 30500,
      "2024": 31200,
      "2025": 31800,
      "2026": 32400,
      "2027": 33000,
      "2028": 33600,
      "2029": 34200,
      "2030": 34800
    }
  },
  {
    "id": "VAR_IRIGASI_02",
    "code": "LUAS_IRIGASI_TOTAL",
    "name": "Total Luas Baku Sawah Daerah Irigasi Kewenangan Kabupaten",
    "category": "Sumber Daya Air",
    "unit": "Ha",
    "values": {
      "2020": 38200,
      "2021": 38200,
      "2022": 38200,
      "2023": 38200,
      "2024": 38200,
      "2025": 38200,
      "2026": 38200,
      "2027": 38200,
      "2028": 38200,
      "2029": 38200,
      "2030": 38200
    }
  },
  {
    "id": "VAR_AIR_01",
    "code": "RT_AIR_MINUM",
    "name": "Jumlah Rumah Tangga Akses Air Minum Layak & Aman",
    "category": "Cipta Karya",
    "unit": "KK",
    "values": {
      "2020": 285400,
      "2021": 292100,
      "2022": 299500,
      "2023": 308200,
      "2024": 318000,
      "2025": 325000,
      "2026": 332000,
      "2027": 339000,
      "2028": 346000,
      "2029": 353000,
      "2030": 360000
    }
  },
  {
    "id": "VAR_AIR_02",
    "code": "RT_TOTAL",
    "name": "Total Rumah Tangga Kabupaten Demak",
    "category": "Cipta Karya",
    "unit": "KK",
    "values": {
      "2020": 355000,
      "2021": 358000,
      "2022": 362000,
      "2023": 365000,
      "2024": 368000,
      "2025": 371000,
      "2026": 374000,
      "2027": 377000,
      "2028": 380000,
      "2029": 383000,
      "2030": 386000
    }
  },
  {
    "id": "VAR_DRAINASE_01",
    "code": "PJ_DRAINASE_BAIK",
    "name": "Panjang Saluran Drainase Perkotaan Kondisi Baik",
    "category": "Cipta Karya",
    "unit": "Km",
    "values": {
      "2020": 120.5,
      "2021": 125.8,
      "2022": 132,
      "2023": 139.5,
      "2024": 146,
      "2025": 152,
      "2026": 158,
      "2027": 164.5,
      "2028": 171,
      "2029": 178,
      "2030": 185
    }
  },
  {
    "id": "VAR_RUANG_01",
    "code": "IZIN_SESUAI_RTRW",
    "name": "Jumlah Izin KKPR Terbit Sesuai Pola Ruang RTRW",
    "category": "Penataan Ruang",
    "unit": "Dokumen",
    "values": {
      "2020": 420,
      "2021": 465,
      "2022": 510,
      "2023": 560,
      "2024": 615,
      "2025": 680,
      "2026": 740,
      "2027": 800,
      "2028": 860,
      "2029": 920,
      "2030": 980
    }
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
    "id": "BD-BM-01",
    "title": "Data Panjang Jalan Kabupaten Menurut Tingkat Kondisi Jalan di Kabupaten Demak",
    "category": "Statistik BPS 2025",
    "bidangId": "bina_marga",
    "bidangName": "Bidang Bina Marga",
    "year": 2024,
    "date": "2025-02-28",
    "source": "BPS Kab. Demak (Demak Dalam Angka 2025) & Survei SKJ DINPUTARU",
    "metricValue": "641,20 Km",
    "metricLabel": "Total Panjang Jalan Kabupaten",
    "statSummary": "Kemantapan Jalan: 81,10% (Kondisi Baik: 441,85 Km | Sedang: 78,15 Km | Rusak Ringan: 63,20 Km | Rusak Berat: 58,00 Km)",
    "fileType": "XLSX & PDF",
    "fileSize": "2.4 MB",
    "documentNumber": "BPS-3321/DDA-2025/BM-01",
    "tags": [
      "BPS 2025",
      "Bina Marga",
      "Kondisi Jalan",
      "Jalan Mantap",
      "SKJ"
    ],
    "desc": "Data rincian kondisi kemantapan jalan kabupaten di 14 kecamatan se-Kabupaten Demak yang dipublikasikan dalam buku Kabupaten Demak Dalam Angka 2025 oleh BPS Kabupaten Demak."
  },
  {
    "id": "BD-BM-02",
    "title": "Data Panjang Jalan Kabupaten Menurut Jenis Permukaan di 14 Kecamatan Kab. Demak",
    "category": "Statistik BPS 2025",
    "bidangId": "bina_marga",
    "bidangName": "Bidang Bina Marga",
    "year": 2024,
    "date": "2025-02-28",
    "source": "BPS Kab. Demak (Demak Dalam Angka 2025)",
    "metricValue": "392,10 Km",
    "metricLabel": "Panjang Permukaan Aspal Hotmix",
    "statSummary": "Aspal: 392,10 Km (61,15%) | Beton (Rigid): 218,40 Km (34,06%) | Kerikil: 23,50 Km | Tanah: 7,20 Km",
    "fileType": "XLSX",
    "fileSize": "1.8 MB",
    "documentNumber": "BPS-3321/DDA-2025/BM-02",
    "tags": [
      "BPS 2025",
      "Jenis Permukaan",
      "Beton Rigid",
      "Hotmix",
      "Infrastruktur"
    ],
    "desc": "Klasifikasi konstruksi permukaan perkerasan jalan kabupaten di Kabupaten Demak guna perencanaan preservasi dan peningkatan jalan berkala."
  },
  {
    "id": "BD-BM-03",
    "title": "Data Inventarisasi dan Kondisi Kelayakan Struktural Jembatan Kabupaten Demak",
    "category": "Laporan Teknis",
    "bidangId": "bina_marga",
    "bidangName": "Bidang Bina Marga",
    "year": 2024,
    "date": "2024-12-20",
    "source": "Database Bridge Management System (BMS) DINPUTARU Demak",
    "metricValue": "284 Unit",
    "metricLabel": "Total Unit Jembatan Kabupaten",
    "statSummary": "Kondisi Baik: 226 Unit | Kondisi Sedang: 41 Unit | Kritis/Perlu Penggantian: 17 Unit (Total Bentang: 3.420 meter)",
    "fileType": "PDF & SHP",
    "fileSize": "5.1 MB",
    "documentNumber": "DINPUTARU-BM/BMS-2024/03",
    "tags": [
      "Jembatan",
      "BMS",
      "Bina Marga",
      "Kelayakan Struktur",
      "Keselamatan"
    ],
    "desc": "Buku induk inventaris jembatan kabupaten yang memuat koordinat lokasi, bentang jembatan, tipe gelagar (beton/baja), dan nilai kondisi keamanan struktural."
  },
  {
    "id": "BD-BM-04",
    "title": "Data Koridor Jalan Strategis Penghubung Kawasan Pesisir, Industri & Pusat Pertanian",
    "category": "Data Spasial / GIS",
    "bidangId": "bina_marga",
    "bidangName": "Bidang Bina Marga",
    "year": 2024,
    "date": "2024-11-15",
    "source": "Bidang Bina Marga DINPUTARU Demak",
    "metricValue": "18 Ruas",
    "metricLabel": "Ruas Koridor Utama Prioritas",
    "statSummary": "Menghubungkan Sentra Padi Dempet-Godong, Kawasan Industri Sayung, Sentra Garam Wedung, dan Jalur Alternatif Semarang-Kudus",
    "fileType": "SHP & GeoJSON",
    "fileSize": "8.4 MB",
    "documentNumber": "GIS-DINPUTARU/BM-KORIDOR/2024",
    "tags": [
      "Koridor Strategis",
      "GIS",
      "Jalan Industri",
      "Pesisir",
      "Demak"
    ],
    "desc": "Peta spasial koridor jalan prioritas penunjang mobilitas logistik dan pengentasan kemiskinan ekstrem di wilayah pesisir dan pedesaan Kabupaten Demak."
  },
  {
    "id": "BD-SDA-01",
    "title": "Data Luas Daerah Irigasi (DI) Kewenangan Kabupaten Demak & Kondisi Keberfungsian",
    "category": "Statistik BPS 2025",
    "bidangId": "sda",
    "bidangName": "Bidang Sumber Daya Air",
    "year": 2024,
    "date": "2025-02-28",
    "source": "BPS Kab. Demak (Demak Dalam Angka 2025) & E-PAKSI DINPUTARU",
    "metricValue": "28.450 Ha",
    "metricLabel": "Luas Baku Sawah Teraliri DI Kabupaten",
    "statSummary": "112 Daerah Irigasi Kewenangan Kabupaten | 85,0% Jaringan Primer/Sekunder Berfungsi Optimal (24.180 Ha)",
    "fileType": "XLSX & PDF",
    "fileSize": "3.2 MB",
    "documentNumber": "BPS-3321/DDA-2025/SDA-01",
    "tags": [
      "BPS 2025",
      "Irigasi",
      "E-PAKSI",
      "Pertanian",
      "Sumber Daya Air"
    ],
    "desc": "Data spasial dan tabular 112 Daerah Irigasi (DI) kewenangan Pemerintah Kabupaten Demak di bawah 1.000 Ha sesuai Kepmen PUPR."
  },
  {
    "id": "BD-SDA-02",
    "title": "Data Sarana Rumah Pompa dan Pompa Pengendali Rob Kawasan Pesisir Kabupaten Demak",
    "category": "Laporan Teknis",
    "bidangId": "sda",
    "bidangName": "Bidang Sumber Daya Air",
    "year": 2024,
    "date": "2024-12-10",
    "source": "Bidang Sumber Daya Air DINPUTARU Kabupaten Demak",
    "metricValue": "48 Unit",
    "metricLabel": "Pompa Air Pengendali Rob & Banjir",
    "statSummary": "Kapasitas Pompa: 250 s.d. 1.500 liter/detik | Melindungi Polder Sriwulan, Morosari Sayung, Morodemak, Karangtengah, dan Bonang",
    "fileType": "PDF",
    "fileSize": "4.6 MB",
    "documentNumber": "DINPUTARU-SDA/POMPA-ROB/2024",
    "tags": [
      "Pompa Rob",
      "Polder",
      "Sayung",
      "Pengendalian Banjir",
      "SDA"
    ],
    "desc": "Daftar spesifikasi teknis pompa air, jam operasional, debit sedot, dan kondisi genset cadangan untuk penanganan pasang air laut (rob) di pesisir Demak."
  },
  {
    "id": "BD-SDA-03",
    "title": "Data Panjang Tanggul Sungai dan Tanggul Laut Pengendali Banjir Kabupaten Demak",
    "category": "Data Spasial / GIS",
    "bidangId": "sda",
    "bidangName": "Bidang Sumber Daya Air",
    "year": 2024,
    "date": "2024-10-30",
    "source": "DINPUTARU Demak & BBWS Pemali Juana",
    "metricValue": "312,50 Km",
    "metricLabel": "Panjang Tanggul Pengendali Sungai & Laut",
    "statSummary": "Sungai Wulan (86 Km), Sungai Tuntang (94 Km), Sungai Jragung (48 Km), Tanggul Penahan Rob Pesisir Sayung (84,5 Km)",
    "fileType": "SHP & PDF",
    "fileSize": "6.9 MB",
    "documentNumber": "DINPUTARU-SDA/TANGGUL-2024",
    "tags": [
      "Tanggul Banjir",
      "Sungai Wulan",
      "Sungai Tuntang",
      "Mitigasi Bencana"
    ],
    "desc": "Pemetaan kondisi elevasi tanggul kritis, titik rawan rembesan (seepage), dan tanggul sabuk pantai pesisir Sayung."
  },
  {
    "id": "BD-SDA-04",
    "title": "Data Luas Kawasan Rawan Genangan Banjir & Penurunan Rob yang Tertangani",
    "category": "Statistik BPS 2025",
    "bidangId": "sda",
    "bidangName": "Bidang Sumber Daya Air",
    "year": 2024,
    "date": "2025-01-20",
    "source": "BPS Kab. Demak & BPBD / DINPUTARU Demak",
    "metricValue": "68,50%",
    "metricLabel": "Tingkat Penanganan Genangan Rob/Banjir",
    "statSummary": "Dari 4.820 Ha kawasan rawan genangan teridentifikasi di 23 desa pesisir, 3.301 Ha telah terproteksi polder dan tanggul kolam retensi.",
    "fileType": "XLSX",
    "fileSize": "2.1 MB",
    "documentNumber": "DDA-2025/BPS-SDA/ROB-04",
    "tags": [
      "Rob",
      "Banjir",
      "Pesisir Sayung",
      "Penanganan Bencana",
      "Capaian Kinerja"
    ],
    "desc": "Hasil pengukuran luas genangan pasca pembangunan kolam retensi, tanggul sabuk laut, dan normalisasi saluran pembuang di pesisir utara Demak."
  },
  {
    "id": "BD-CK-01",
    "title": "Data Persentase Rumah Tangga dengan Akses Air Minum Layak Menurut Kecamatan",
    "category": "Statistik BPS 2025",
    "bidangId": "cipta_karya",
    "bidangName": "Bidang Cipta Karya",
    "year": 2024,
    "date": "2025-02-28",
    "source": "BPS Kab. Demak (Demak Dalam Angka 2025, Tabel Sosial Budaya)",
    "metricValue": "93,42%",
    "metricLabel": "Akses Air Minum Layak Kabupaten Demak",
    "statSummary": "Total Rumah Tangga: 372.450 KK | Air Minum Aman: 42,15% | PUDAM Tirtawijaya: 58.740 Sambungan Rumah | SPAM Perdesaan Aktif: 182 Desa",
    "fileType": "XLSX & PDF",
    "fileSize": "2.9 MB",
    "documentNumber": "BPS-3321/DDA-2025/CK-01",
    "tags": [
      "BPS 2025",
      "Air Minum Layak",
      "PUDAM",
      "SPAM",
      "Cipta Karya"
    ],
    "desc": "Cakupan akses air minum aman dan layak di seluruh kecamatan di Kabupaten Demak bersumber dari hasil Susenas BPS Kabupaten Demak."
  },
  {
    "id": "BD-CK-02",
    "title": "Data Akses Sanitasi Layak dan Verifikasi Desa Bebas Buang Air Besar Sembarangan (ODF)",
    "category": "Statistik BPS 2025",
    "bidangId": "cipta_karya",
    "bidangName": "Bidang Cipta Karya",
    "year": 2024,
    "date": "2025-02-28",
    "source": "BPS Kab. Demak (Demak Dalam Angka 2025) & Seksi Sanitasi DINPUTARU",
    "metricValue": "88,64%",
    "metricLabel": "Rumah Tangga Bersanitasi Layak",
    "statSummary": "100% Desa/Kelurahan se-Kabupaten Demak telah lolos verifikasi ODF (Open Defecation Free) dengan kepemilikan jamban dan tangki septik standar SNI.",
    "fileType": "PDF & XLSX",
    "fileSize": "3.7 MB",
    "documentNumber": "BPS-3321/DDA-2025/CK-02",
    "tags": [
      "BPS 2025",
      "Sanitasi",
      "Jamban Sehat",
      "ODF",
      "Tangki Septik"
    ],
    "desc": "Data perkembangan penyediaan sarana pengolahan air limbah domestik skala individual (SPALD-S) dan komunal (SPALD-T) di permukiman padat."
  },
  {
    "id": "BD-CK-03",
    "title": "Data Panjang Saluran Drainase Perkotaan dan Kinerja Pematusan Genangan Hujan",
    "category": "Laporan Teknis",
    "bidangId": "cipta_karya",
    "bidangName": "Bidang Cipta Karya",
    "year": 2024,
    "date": "2024-11-25",
    "source": "Bidang Cipta Karya DINPUTARU Kabupaten Demak",
    "metricValue": "185,40 Km",
    "metricLabel": "Panjang Jaringan Drainase Perkotaan",
    "statSummary": "Kondisi Berfungsi Baik: 145,50 Km (78,5%) | Normalisasi & Pemeliharaan Berkala: 39,90 Km di Kawasan Perkotaan Demak & Mranggen",
    "fileType": "PDF & SHP",
    "fileSize": "4.8 MB",
    "documentNumber": "DINPUTARU-CK/DRAINASE-2024",
    "tags": [
      "Drainase Perkotaan",
      "Genangan Hujan",
      "Cipta Karya",
      "Perkotaan Demak"
    ],
    "desc": "Peta jaringan primer, sekunder, dan tersier drainase perkotaan Demak guna mengatasi limpasan air hujan pada kawasan pemukiman dan perdagangan."
  },
  {
    "id": "BD-CK-04",
    "title": "Data Penerbitan Persetujuan Bangunan Gedung (PBG) & Sertifikat Laik Fungsi (SLF)",
    "category": "Regulasi & Legalitas",
    "bidangId": "cipta_karya",
    "bidangName": "Bidang Cipta Karya",
    "year": 2024,
    "date": "2024-12-31",
    "source": "Sistem Informasi SIMBG DINPUTARU Kabupaten Demak",
    "metricValue": "1.150 Dokumen",
    "metricLabel": "PBG & SLF Diterbitkan Tahun 2024",
    "statSummary": "PBG Bangunan Hunian: 890 Berkas | Bangunan Usaha & Pabrik: 185 Berkas | Gedung Pelayanan Sosial/Fasum: 75 Berkas",
    "fileType": "XLSX",
    "fileSize": "1.5 MB",
    "documentNumber": "DINPUTARU-CK/SIMBG-PBG/2024",
    "tags": [
      "PBG",
      "SLF",
      "SIMBG",
      "Bangunan Gedung",
      "Perizinan"
    ],
    "desc": "Laporan akuntabilitas pelayanan teknis perizinan gedung bangunan sesuai standar keandalan keselamatan dan ketahanan gempa di Demak."
  },
  {
    "id": "BD-TR-01",
    "title": "Data Luas Wilayah dan Penggunaan Lahan Menurut Kecamatan di Kabupaten Demak",
    "category": "Statistik BPS 2025",
    "bidangId": "tata_ruang",
    "bidangName": "Bidang Tata Ruang",
    "year": 2024,
    "date": "2025-02-28",
    "source": "BPS Kab. Demak (Demak Dalam Angka 2025, Bab Geografi)",
    "metricValue": "897,43 Km²",
    "metricLabel": "Total Luas Wilayah Kabupaten Demak",
    "statSummary": "89.743 Hektar | Sawah: 48.950 Ha (54,5%) | Permukiman: 22.180 Ha | Tambak/Perikanan: 8.420 Ha | Industri & Jasa: 4.150 Ha | Hutan & Mangrove: 2.110 Ha",
    "fileType": "XLSX & SHP",
    "fileSize": "7.5 MB",
    "documentNumber": "BPS-3321/DDA-2025/TR-01",
    "tags": [
      "BPS 2025",
      "Tata Ruang",
      "Penggunaan Lahan",
      "Geografi Demak",
      "RTRW"
    ],
    "desc": "Data luas wilayah administratif 14 kecamatan di Kabupaten Demak beserta matriks perubahan tutupan lahan hasil penginderaan jauh citra satelit."
  },
  {
    "id": "BD-TR-02",
    "title": "Data Penetapan Kawasan Pertanian Pangan Berkelanjutan (KP2B / LP2B) Perda RTRW",
    "category": "Regulasi & Kebijakan",
    "bidangId": "tata_ruang",
    "bidangName": "Bidang Tata Ruang",
    "year": 2024,
    "date": "2024-10-15",
    "source": "Perda Kab. Demak No. 1/2020 tentang Perubahan RTRW & Bidang Tata Ruang",
    "metricValue": "46.280 Ha",
    "metricLabel": "Luas Baku Lahan Sawah Abadi (LP2B)",
    "statSummary": "Dilindungi dari alih fungsi lahan komersial guna menjamin ketahanan pangan nasional di sentra lumbung beras Gajah, Dempet, Karanganyar, dan Wonosalam.",
    "fileType": "PDF & SHP",
    "fileSize": "5.8 MB",
    "documentNumber": "PERDA-DEMAK/RTRW-LP2B/2020",
    "tags": [
      "LP2B",
      "KP2B",
      "Lahan Padi Abadi",
      "Ketahanan Pangan",
      "RTRW"
    ],
    "desc": "Peta deliniasi poligon spasial lahan sawah yang dilindungi secara hukum dari konversi industri dan permukiman di Kabupaten Demak."
  },
  {
    "id": "BD-TR-03",
    "title": "Data Rekapitulasi Persetujuan Kesesuaian Kegiatan Pemanfaatan Ruang (PKKPR)",
    "category": "Laporan Teknis",
    "bidangId": "tata_ruang",
    "bidangName": "Bidang Tata Ruang",
    "year": 2024,
    "date": "2024-12-28",
    "source": "Forum Penataan Ruang (FPR) DINPUTARU Kabupaten Demak",
    "metricValue": "842 Berkas",
    "metricLabel": "Rekomendasi PKKPR Terbit",
    "statSummary": "Tingkat Kesesuaian terhadap Pola Ruang RTRW: 84,50% | Sektor Usaha/Investasi: 615 Berkas | Non-Berusaha/Perorangan: 227 Berkas",
    "fileType": "XLSX",
    "fileSize": "2.3 MB",
    "documentNumber": "DINPUTARU-TR/PKKPR-FPR/2024",
    "tags": [
      "PKKPR",
      "Kesesuaian Ruang",
      "Investasi",
      "Tata Ruang Demak"
    ],
    "desc": "Hasil verifikasi dan kajian kesesuaian lokasi rencana usaha dan pemanfaatan ruang terhadap peraturan zonasi RDTR dan pola ruang RTRW Demak."
  },
  {
    "id": "BD-BK-01",
    "title": "Data Tenaga Kerja Konstruksi (TKK) Bersertifikat Standar Kompetensi Kerja (SKK)",
    "category": "Statistik BPS 2025",
    "bidangId": "bina_konstruksi",
    "bidangName": "Bidang Bina Konstruksi",
    "year": 2024,
    "date": "2025-01-15",
    "source": "Bidang Bina Konstruksi DINPUTARU Demak & LPJK",
    "metricValue": "1.025 Orang",
    "metricLabel": "Total TKK Bersertifikat SKK Aktif",
    "statSummary": "Tukang Pasang Bata/Batu: 340 Orang | Pembesian Beton: 260 Orang | Perpipaan Plumbing: 185 Orang | Mandor/Pelaksana Proyek: 240 Orang",
    "fileType": "XLSX & PDF",
    "fileSize": "2.0 MB",
    "documentNumber": "DINPUTARU-BK/SKK-TKK/2025",
    "tags": [
      "TKK",
      "SKK",
      "Sertifikasi Tukang",
      "LPJK",
      "Bina Konstruksi"
    ],
    "desc": "Register resmi tenaga kerja konstruksi terampil di Kabupaten Demak yang telah lulus uji sertifikasi kompetensi kerja berstandar BNSP."
  },
  {
    "id": "BD-BK-02",
    "title": "Data Badan Usaha Jasa Konstruksi (BUJK) Terdaftar di Kabupaten Demak",
    "category": "Laporan Teknis",
    "bidangId": "bina_konstruksi",
    "bidangName": "Bidang Bina Konstruksi",
    "year": 2024,
    "date": "2024-11-30",
    "source": "Database Sistem Informasi Jasa Konstruksi (SIPJAKI) DINPUTARU",
    "metricValue": "215 Perusahaan",
    "metricLabel": "Total BUJK Terdaftar",
    "statSummary": "Kualifikasi Usaha Kecil: 172 Perusahaan | Usaha Menengah: 39 Perusahaan | Usaha Besar/Spesialis: 4 Perusahaan",
    "fileType": "PDF",
    "fileSize": "1.9 MB",
    "documentNumber": "DINPUTARU-BK/SIPJAKI-BUJK/2024",
    "tags": [
      "BUJK",
      "Kontraktor",
      "Konsultan",
      "SIPJAKI",
      "Jasa Konstruksi"
    ],
    "desc": "Profil perusahaan kontraktor dan konsultan pengawas jasa konstruksi lokal Demak dalam rangka pembinaan dan pengawasan tertib usaha konstruksi."
  },
  {
    "id": "BD-SEKR-01",
    "title": "Data Jumlah Penduduk dan Rumah Tangga Hasil Proyeksi BPS Kabupaten Demak",
    "category": "Statistik BPS 2025",
    "bidangId": "sekretariat",
    "bidangName": "Sekretariat DINPUTARU",
    "year": 2024,
    "date": "2025-02-28",
    "source": "BPS Kab. Demak (Demak Dalam Angka 2025, Bab 3 Kependudukan)",
    "metricValue": "1.238.900 Jiwa",
    "metricLabel": "Jumlah Penduduk Kabupaten Demak",
    "statSummary": "372.450 Kepala Keluarga (KK) | Laki-laki: 624.120 Jiwa | Perempuan: 614.780 Jiwa | Kepadatan: 1.380 Jiwa/Km²",
    "fileType": "XLSX & PDF",
    "fileSize": "3.5 MB",
    "documentNumber": "BPS-3321/DDA-2025/SEKR-01",
    "tags": [
      "BPS 2025",
      "Kependudukan",
      "Rumah Tangga",
      "Demak",
      "Demografi"
    ],
    "desc": "Data populasi dan jumlah kepala keluarga per kecamatan sebagai basis perhitungan rasio pelayanan infrastruktur dasar (air minum, sanitasi, dan jalan)."
  },
  {
    "id": "BD-SEKR-02",
    "title": "Data Realisasi Anggaran Belanja Infrastruktur DINPUTARU Kabupaten Demak",
    "category": "Laporan Akuntabilitas",
    "bidangId": "sekretariat",
    "bidangName": "Sekretariat DINPUTARU",
    "year": 2024,
    "date": "2025-01-10",
    "source": "Subbag Program & Keuangan DINPUTARU (LAKIP/LKjIP 2024)",
    "metricValue": "Rp 245,82 M",
    "metricLabel": "Total Pagu Anggaran Infrastruktur",
    "statSummary": "Realisasi Keuangan: 96,82% (Rp 238,01 Miliar) | Realisasi Fisik: 98,15% (APBD Murni, DAK Fisik, DBHCHT, dan Banprov Jateng)",
    "fileType": "PDF",
    "fileSize": "4.2 MB",
    "documentNumber": "LKjIP-DINPUTARU/ANGGARAN/2024",
    "tags": [
      "Realisasi Anggaran",
      "APBD Demak",
      "DAK",
      "LKjIP",
      "Sekretariat"
    ],
    "desc": "Laporan realisasi penyerapan anggaran program penyelenggaraan jalan jembatan, irigasi, drainase, penataan ruang, dan air minum sanitasi."
  },
  {
    "id": "BD-SEKR-03",
    "title": "Data Inventarisasi Aset Sarana Alat Berat dan Alat Uji Laboratorium Konstruksi",
    "category": "Data Spasial / GIS",
    "bidangId": "sekretariat",
    "bidangName": "Sekretariat DINPUTARU",
    "year": 2024,
    "date": "2024-12-15",
    "source": "Subbag Umum & Kepegawaian DINPUTARU Demak",
    "metricValue": "24 Unit",
    "metricLabel": "Total Alat Berat Kedinasan",
    "statSummary": "Excavator Long Arm (4 Unit), Backhoe Loader (3 Unit), Tandem Roller (4 Unit), Dump Truck (9 Unit), Lab Uji Kuat Tekan Beton & Aspal",
    "fileType": "PDF",
    "fileSize": "2.8 MB",
    "documentNumber": "DINPUTARU-UMPEG/ASET-ALAT/2024",
    "tags": [
      "Alat Berat",
      "Aset Daerah",
      "Excavator",
      "Laboratorium",
      "Umpeg"
    ],
    "desc": "Daftar aset armada alat berat operasional darurat banjir/tanggul longsor dan peralatan uji kualitas bahan konstruksi DINPUTARU Demak."
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
        if (parsed.users && parsed.indicators && parsed.indicators.length >= 50 && parsed.categories && parsed.categories.some(c => c.id === 'iku_daerah')) {
          if (!parsed.visibleYears) parsed.visibleYears = parsed.years || DEFAULT_YEARS;
          if (!parsed.activeYear) parsed.activeYear = 2026;
          return parsed;
        } else {
          console.log('LocalStorage has legacy dataset, resetting to v2 full database from Excel...');
          localStorage.removeItem(STORAGE_KEY);
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
        logoUrl: '/img/logo-pupr.svg',
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
    if (!this.currentUser) return false;
    return ['super_admin', 'kasubag_program_keuangan', 'sekretaris'].includes(this.currentUser.role);
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
    if (!this.data.categories) this.data.categories = [];
    const idx = this.data.categories.findIndex(c => c.id === cat.id);
    if (idx >= 0) {
      this.data.categories[idx] = { ...this.data.categories[idx], ...cat };
    } else {
      if (!cat.id) cat.id = (cat.code || 'CAT').toLowerCase().replace(/[^a-z0-9]/g, '_');
      this.data.categories.push(cat);
    }
    this.data.categories.sort((a, b) => (a.segmentNumber || 99) - (b.segmentNumber || 99));
    this.saveData();

    if (typeof fetch !== 'undefined') {
      fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cat)
      }).catch(err => console.debug('Offline sync fallback', err));
    }
  }

  deleteCategory(id) {
    this.data.categories = this.data.categories.filter(c => c.id !== id);
    this.saveData();

    if (typeof fetch !== 'undefined') {
      fetch(`/api/admin/categories/${id}`, {
        method: 'DELETE'
      }).catch(err => console.debug('Offline sync fallback', err));
    }
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

    if (typeof fetch !== 'undefined') {
      fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.data.systemInfo)
      }).catch(err => console.debug('Offline sync fallback', err));
    }
    return this.data.systemInfo;
  }
}

// Global Store Instance
window.store = new SimondemakStore();
