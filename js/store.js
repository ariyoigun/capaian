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
    "id": "USR-001",
    "username": "kadin.dinputaru",
    "password": "*Dinput4ru_01",
    "name": "Ir. NANANG TASUNAR DAVID NARUTOMO, MM",
    "nip": "196702101993031009",
    "role": "kepala_dinas",
    "roleLabel": "Kepala Dinas",
    "bidangId": "sekretariat",
    "email": "kadin.dinputaru@demakkab.go.id",
    "phone": "0812-3456-7801",
    "status": "active"
  },
  {
    "id": "USR-002",
    "username": "sekdin.dinputaru",
    "password": "*Dinput4ru_02",
    "name": "NANING PRIH HATININGRUM, S.IP,M.Si",
    "nip": "197801082010012019",
    "role": "sekretaris",
    "roleLabel": "Sekretaris Dinas",
    "bidangId": "sekretariat",
    "email": "sekdin.dinputaru@demakkab.go.id",
    "phone": "0812-3456-7802",
    "status": "active"
  },
  {
    "id": "USR-003",
    "username": "prokeu.dinputaru",
    "password": "*Dinput4ru_03",
    "name": "BAGAS SATRIA ANGGRIAWAN, S.T., M.M.",
    "nip": "199106122015021002",
    "role": "kasubag_program_keuangan",
    "roleLabel": "Kasubag Program Keuangan",
    "bidangId": "sekretariat",
    "email": "prokeu.dinputaru@demakkab.go.id",
    "phone": "0812-3456-7803",
    "status": "active"
  },
  {
    "id": "USR-004",
    "username": "umpeg.dinputaru",
    "password": "*Dinput4ru_04",
    "name": "BAGAS SATRIA ANGGRIAWAN, S.T., M.M.",
    "nip": "199106122015021002",
    "role": "kasubag_umum_kepegawaian",
    "roleLabel": "Kasubag Umum Kepegawaian",
    "bidangId": "sekretariat",
    "email": "umpeg.dinputaru@demakkab.go.id",
    "phone": "0812-3456-7804",
    "status": "active"
  },
  {
    "id": "USR-005",
    "username": "koor.sekre1",
    "password": "*Dinput4ru_05",
    "name": "RIZKY PRAHARDINI, S.E.",
    "nip": "198607282025212082",
    "role": "koordinator_bidang",
    "roleLabel": "Koordinator Sekretariat",
    "bidangId": "sekretariat",
    "email": "koor.sekre1@demakkab.go.id",
    "phone": "0812-3456-7805",
    "status": "active"
  },
  {
    "id": "USR-006",
    "username": "koor.sekre2",
    "password": "*Dinput4ru_06",
    "name": "RANI NURHAYATI, S.Sos",
    "nip": "199707102025212091",
    "role": "koordinator_bidang",
    "roleLabel": "Koordinator Sekretariat",
    "bidangId": "sekretariat",
    "email": "koor.sekre2@demakkab.go.id",
    "phone": "0812-3456-7806",
    "status": "active"
  },
  {
    "id": "USR-007",
    "username": "superadmin",
    "password": "*Dinput4ru_07",
    "name": "GUNARIYO, S.Kom.",
    "nip": "198909212025041001",
    "role": "super_admin",
    "roleLabel": "Superadmin",
    "bidangId": "sekretariat",
    "email": "superadmin@demakkab.go.id",
    "phone": "0812-3456-7807",
    "status": "active"
  },
  {
    "id": "USR-008",
    "username": "kabid.bm",
    "password": "*Dinput4ru_08",
    "name": "S. EKO WIDIANTORO, ST",
    "nip": "197506012010011012",
    "role": "kepala_bidang",
    "roleLabel": "Kabid Bina Marga",
    "bidangId": "bina_marga",
    "email": "kabid.bm@demakkab.go.id",
    "phone": "0812-3456-7808",
    "status": "active"
  },
  {
    "id": "USR-009",
    "username": "koor.bm",
    "password": "*Dinput4ru_09",
    "name": "TIA ARYUNINGRUM, ST",
    "nip": "199406262020122025",
    "role": "koordinator_bidang",
    "roleLabel": "Koordinator Bina Marga",
    "bidangId": "bina_marga",
    "email": "koor.bm@demakkab.go.id",
    "phone": "0812-3456-7809",
    "status": "active"
  },
  {
    "id": "USR-010",
    "username": "kabid.sdabk",
    "password": "*Dinput4ru_10",
    "name": "NANING PRIH HATININGRUM, S.IP,M.Si",
    "nip": "197801082010012019",
    "role": "kepala_bidang",
    "roleLabel": "Plt. Kabid SDABK",
    "bidangId": "sda",
    "email": "kabid.sdabk@demakkab.go.id",
    "phone": "0812-3456-7810",
    "status": "active"
  },
  {
    "id": "USR-011",
    "username": "koor.sdabk",
    "password": "*Dinput4ru_11",
    "name": "RESI DIANSISMITA, S.T.",
    "nip": "199805242024212018",
    "role": "koordinator_bidang",
    "roleLabel": "Koordinator SDABK",
    "bidangId": "sda",
    "email": "koor.sdabk@demakkab.go.id",
    "phone": "0812-3456-7811",
    "status": "active"
  },
  {
    "id": "USR-012",
    "username": "kabid.trp",
    "password": "*Dinput4ru_12",
    "name": "S. EKO WIDIANTORO, ST",
    "nip": "197506012010011012",
    "role": "kepala_bidang",
    "roleLabel": "Plt. Kabid TRP",
    "bidangId": "tata_ruang",
    "email": "kabid.trp@demakkab.go.id",
    "phone": "0812-3456-7812",
    "status": "active"
  },
  {
    "id": "USR-013",
    "username": "koor.trp",
    "password": "*Dinput4ru_13",
    "name": "INSANIA MULIA JUNAEDI, S.T.",
    "nip": "200111212025042001",
    "role": "koordinator_bidang",
    "roleLabel": "Koordinator TRP",
    "bidangId": "tata_ruang",
    "email": "koor.trp@demakkab.go.id",
    "phone": "0812-3456-7813",
    "status": "active"
  },
  {
    "id": "USR-014",
    "username": "kabid.ck",
    "password": "*Dinput4ru_14",
    "name": "ANDI ERWIN PRASETYO, ST.",
    "nip": "19720914 2003121002",
    "role": "kepala_bidang",
    "roleLabel": "Kabid Cipta Karya",
    "bidangId": "cipta_karya",
    "email": "kabid.ck@demakkab.go.id",
    "phone": "0812-3456-7814",
    "status": "active"
  },
  {
    "id": "USR-015",
    "username": "koor.ck",
    "password": "*Dinput4ru_15",
    "name": "CHINTYA CAHYANINGRUM, S.T.",
    "nip": "200207052025042001",
    "role": "koordinator_bidang",
    "roleLabel": "Koordinator Cipta Karya",
    "bidangId": "cipta_karya",
    "email": "koor.ck@demakkab.go.id",
    "phone": "0812-3456-7815",
    "status": "active"
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
  {
    "id": "IND-IKU-KAB-01",
    "code": "IKU-KAB-01",
    "name": "Indeks Layanan Infrastruktur Daerah",
    "categoryId": "iku_daerah",
    "bidangId": "bidang_sekretariat",
    "wewenangBidang": "Sekretariat DINPUTARU",
    "pejabatPenanggungJawab": "Amirul Mukminin, S.T., M.Si. (Sekretaris Dinas)",
    "seksiPelaksana": "Subbag Program, Keuangan & Akuntabilitas Kinerja",
    "unit": "Angka",
    "polarization": "maximize",
    "definition": "Indikator komposit makro yang mengukur tingkat ketersediaan, kualitas, keandalan, dan keterjangkauan pelayanan infrastruktur dasar ke-PU-an di Kabupaten Demak yang mencakup kemantapan jalan, kinerja irigasi, akses air minum aman, dan sanitasi layak.",
    "formula": "(Indeks Jalan Mantap + Indeks Irigasi + Indeks Air Minum + Indeks Sanitasi) / 4",
    "source": "Dokumen RPJMD Kabupaten Demak & Renstra DINPUTARU Kabupaten Demak",
    "records": {
      "2020": {
        "target": 27,
        "realisasi": 27,
        "notes": "Sesuai dokumen RPJMD & Renstra"
      },
      "2021": {
        "target": 27.71,
        "realisasi": 27.71,
        "notes": "Sesuai dokumen RPJMD & Renstra"
      },
      "2022": {
        "target": 28.42,
        "realisasi": 28.42,
        "notes": "Sesuai dokumen RPJMD & Renstra"
      },
      "2023": {
        "target": 29.13,
        "realisasi": 29.13,
        "notes": "Sesuai dokumen RPJMD & Renstra"
      },
      "2024": {
        "target": 34.83,
        "realisasi": 34.83,
        "notes": "Sesuai dokumen RPJMD & Renstra"
      },
      "2025": {
        "target": 35.55,
        "realisasi": 38.649,
        "notes": "Sesuai dokumen RPJMD & Renstra"
      },
      "2026": {
        "target": 37.25,
        "realisasi": 38.649,
        "notes": "Realisasi TW I & TW II berjalan terverifikasi"
      },
      "2027": {
        "target": 40.3,
        "realisasi": 0,
        "notes": "Sesuai dokumen RPJMD & Renstra"
      },
      "2028": {
        "target": 42.67,
        "realisasi": 0,
        "notes": "Sesuai dokumen RPJMD & Renstra"
      },
      "2029": {
        "target": 44.05,
        "realisasi": 0,
        "notes": "Sesuai dokumen RPJMD & Renstra"
      },
      "2030": {
        "target": 46.76,
        "realisasi": 0,
        "notes": "Sesuai dokumen RPJMD & Renstra"
      }
    },
    "notes": "Indikator Kinerja Utama Makro Kepala Daerah Kabupaten Demak"
  },
  {
    "id": "IND-IKD-01",
    "code": "IKD-01",
    "name": "Akses Rumah Tangga Perkotaan terhadap Air Siap Minum Perpipaan",
    "categoryId": "ikd",
    "bidangId": "bidang_ck",
    "wewenangBidang": "Bidang Cipta Karya & Perumahan",
    "pejabatPenanggungJawab": "Dian Pratama, S.T., M.Sc. (Kabid Cipta Karya)",
    "seksiPelaksana": "Seksi Air Minum, Sanitasi & Tata Bangunan",
    "unit": "%",
    "polarization": "maximize",
    "definition": "Persentase rumah tangga di kawasan perkotaan Kabupaten Demak yang telah terlayani sambungan langsung air siap minum melalui jaringan perpipaan berstandar mutu air minum nasional.",
    "formula": "(Jumlah RT Perkotaan Terlayani Air Siap Minum Perpipaan / Total Rumah Tangga Kawasan Perkotaan) x 100%",
    "source": "PDAM Tirta Kalijaga Demak & Buku Laporan SPAM DINPUTARU",
    "records": {
      "2020": {
        "target": 0,
        "realisasi": 0,
        "notes": "Sesuai penetapan RKPD"
      },
      "2021": {
        "target": 0,
        "realisasi": 0,
        "notes": "Sesuai penetapan RKPD"
      },
      "2022": {
        "target": 0,
        "realisasi": 0,
        "notes": "Sesuai penetapan RKPD"
      },
      "2023": {
        "target": 0,
        "realisasi": 0,
        "notes": "Sesuai penetapan RKPD"
      },
      "2024": {
        "target": 0,
        "realisasi": 0,
        "notes": "Sesuai penetapan RKPD"
      },
      "2025": {
        "target": 0.5,
        "realisasi": 44.69,
        "notes": "Sesuai penetapan RKPD"
      },
      "2026": {
        "target": 1,
        "realisasi": 44.69,
        "notes": "Realisasi TW berjalan sesuai pelaporan SPJ triwulanan"
      },
      "2027": {
        "target": 2,
        "realisasi": 0,
        "notes": "Sesuai penetapan RKPD"
      },
      "2028": {
        "target": 3,
        "realisasi": 0,
        "notes": "Sesuai penetapan RKPD"
      },
      "2029": {
        "target": 4,
        "realisasi": 0,
        "notes": "Sesuai penetapan RKPD"
      },
      "2030": {
        "target": 5,
        "realisasi": 0,
        "notes": "Sesuai penetapan RKPD"
      }
    },
    "notes": "Indikator Kinerja Daerah (RPJMD Kabupaten Demak)"
  },
  {
    "id": "IND-IKD-02",
    "code": "IKD-02",
    "name": "Indeks Kinerja Sistem Irigasi Kewenangan Kabupaten",
    "categoryId": "ikd",
    "bidangId": "bidang_sda",
    "wewenangBidang": "Bidang Sumber Daya Air & Bina Konstruksi",
    "pejabatPenanggungJawab": "Ir. Hendra Wijaya, M.Eng. (Kabid SDA & BK)",
    "seksiPelaksana": "Seksi Irigasi, Pengendalian Banjir & Pembinaan Jasa Konstruksi",
    "unit": "Angka",
    "polarization": "maximize",
    "definition": "Indeks kinerja sistem irigasi kewenangan Kabupaten Demak berbasis aplikasi E-PAKSI yang mengevaluasi prasarana fisik, produktivitas tanam, sarana penunjang, organisasi personalia, dokumentasi, dan kelembagaan P3A.",
    "formula": "∑ (Skor Komponen Evaluasi x Bobot Komponen) [Sesuai Permen PUPR No. 12/PRT/M/2015]",
    "source": "Aplikasi E-PAKSI Kementerian PUPR & Survei IKSI Bidang SDA DINPUTARU",
    "records": {
      "2020": {
        "target": 0,
        "realisasi": 0,
        "notes": "Sesuai penetapan RKPD"
      },
      "2021": {
        "target": 0,
        "realisasi": 0,
        "notes": "Sesuai penetapan RKPD"
      },
      "2022": {
        "target": 0,
        "realisasi": 0,
        "notes": "Sesuai penetapan RKPD"
      },
      "2023": {
        "target": 54.46,
        "realisasi": 54.46,
        "notes": "Sesuai penetapan RKPD"
      },
      "2024": {
        "target": 59.27,
        "realisasi": 59.27,
        "notes": "Sesuai penetapan RKPD"
      },
      "2025": {
        "target": 60.52,
        "realisasi": 60.26,
        "notes": "Sesuai penetapan RKPD"
      },
      "2026": {
        "target": 61.77,
        "realisasi": 60.26,
        "notes": "Realisasi TW berjalan sesuai pelaporan SPJ triwulanan"
      },
      "2027": {
        "target": 63.02,
        "realisasi": 0,
        "notes": "Sesuai penetapan RKPD"
      },
      "2028": {
        "target": 64.27,
        "realisasi": 0,
        "notes": "Sesuai penetapan RKPD"
      },
      "2029": {
        "target": 65.52,
        "realisasi": 0,
        "notes": "Sesuai penetapan RKPD"
      },
      "2030": {
        "target": 66.77,
        "realisasi": 0,
        "notes": "Sesuai penetapan RKPD"
      }
    },
    "notes": "Indikator Kinerja Daerah (RPJMD Kabupaten Demak)"
  },
  {
    "id": "IND-IKD-03",
    "code": "IKD-03",
    "name": "Rumah Tangga dengan Akses Sanitasi Aman",
    "categoryId": "ikd",
    "bidangId": "bidang_ck",
    "wewenangBidang": "Bidang Cipta Karya & Perumahan",
    "pejabatPenanggungJawab": "Dian Pratama, S.T., M.Sc. (Kabid Cipta Karya)",
    "seksiPelaksana": "Seksi Air Minum, Sanitasi & Tata Bangunan",
    "unit": "%",
    "polarization": "maximize",
    "definition": "Persentase rumah tangga di Kabupaten Demak yang memiliki akses fasilitas sanitasi milik sendiri dengan kloset leher angsa dan tangki septik aman yang disedot secara berkala (L2T2/IPLT).",
    "formula": "(Jumlah RT Akses Sanitasi Aman / Total Rumah Tangga Kabupaten Demak) x 100%",
    "source": "Survei EHRA, SSGI, BPS Kabupaten Demak & Data Seksi Sanitasi DINPUTARU",
    "records": {
      "2020": {
        "target": 0,
        "realisasi": null,
        "notes": "Sesuai penetapan RKPD"
      },
      "2021": {
        "target": 0,
        "realisasi": null,
        "notes": "Sesuai penetapan RKPD"
      },
      "2022": {
        "target": 3.27,
        "realisasi": 3.27,
        "notes": "Sesuai penetapan RKPD"
      },
      "2023": {
        "target": 4.1,
        "realisasi": 4.1,
        "notes": "Sesuai penetapan RKPD"
      },
      "2024": {
        "target": 5.79,
        "realisasi": 5.79,
        "notes": "Sesuai penetapan RKPD"
      },
      "2025": {
        "target": 10,
        "realisasi": 6.41,
        "notes": "Sesuai penetapan RKPD"
      },
      "2026": {
        "target": 15,
        "realisasi": 6.41,
        "notes": "Realisasi TW berjalan sesuai pelaporan SPJ triwulanan"
      },
      "2027": {
        "target": 20,
        "realisasi": 0,
        "notes": "Sesuai penetapan RKPD"
      },
      "2028": {
        "target": 25,
        "realisasi": 0,
        "notes": "Sesuai penetapan RKPD"
      },
      "2029": {
        "target": 30,
        "realisasi": 0,
        "notes": "Sesuai penetapan RKPD"
      },
      "2030": {
        "target": 32,
        "realisasi": 0,
        "notes": "Sesuai penetapan RKPD"
      }
    },
    "notes": "Indikator Kinerja Daerah (RPJMD Kabupaten Demak)"
  },
  {
    "id": "IND-IKD-04",
    "code": "IKD-04",
    "name": "Persentase Rumah Tangga dengan Akses Air Minum Aman",
    "categoryId": "ikd",
    "bidangId": "bidang_ck",
    "wewenangBidang": "Bidang Cipta Karya & Perumahan",
    "pejabatPenanggungJawab": "Dian Pratama, S.T., M.Sc. (Kabid Cipta Karya)",
    "seksiPelaksana": "Seksi Air Minum, Sanitasi & Tata Bangunan",
    "unit": "%",
    "polarization": "maximize",
    "definition": "Persentase rumah tangga dengan akses air minum layak, bebas kontaminasi bakteriologis, berada di premis, dan tersedia sepanjang waktu sesuai target SDGs 6.1.",
    "formula": "(Jumlah RT dengan Akses Air Minum Aman / Total Rumah Tangga Kabupaten Demak) x 100%",
    "source": "Data Susenas BPS Kabupaten Demak & Laporan Kinerja Bidang Cipta Karya",
    "records": {
      "2020": {
        "target": 16.82,
        "realisasi": 16.82,
        "notes": "Sesuai penetapan RKPD"
      },
      "2021": {
        "target": 17.11,
        "realisasi": 17.11,
        "notes": "Sesuai penetapan RKPD"
      },
      "2022": {
        "target": 18.09,
        "realisasi": 18.09,
        "notes": "Sesuai penetapan RKPD"
      },
      "2023": {
        "target": 20.51,
        "realisasi": 20.51,
        "notes": "Sesuai penetapan RKPD"
      },
      "2024": {
        "target": 20.22,
        "realisasi": 20.22,
        "notes": "Sesuai penetapan RKPD"
      },
      "2025": {
        "target": 22.5,
        "realisasi": 20.49,
        "notes": "Sesuai penetapan RKPD"
      },
      "2026": {
        "target": 25,
        "realisasi": 20.49,
        "notes": "Realisasi TW berjalan sesuai pelaporan SPJ triwulanan"
      },
      "2027": {
        "target": 30,
        "realisasi": 0,
        "notes": "Sesuai penetapan RKPD"
      },
      "2028": {
        "target": 35,
        "realisasi": 0,
        "notes": "Sesuai penetapan RKPD"
      },
      "2029": {
        "target": 43,
        "realisasi": 0,
        "notes": "Sesuai penetapan RKPD"
      },
      "2030": {
        "target": 45,
        "realisasi": 0,
        "notes": "Sesuai penetapan RKPD"
      }
    },
    "notes": "Indikator Kinerja Daerah (RPJMD Kabupaten Demak)"
  },
  {
    "id": "IND-IKD-05",
    "code": "IKD-05",
    "name": "Indeks Layanan Infrastruktur daerah",
    "categoryId": "ikd",
    "bidangId": "bidang_sekretariat",
    "wewenangBidang": "Sekretariat DINPUTARU",
    "pejabatPenanggungJawab": "Amirul Mukminin, S.T., M.Si. (Sekretaris Dinas)",
    "seksiPelaksana": "Subbag Program, Keuangan & Akuntabilitas Kinerja",
    "unit": "Angka",
    "polarization": "maximize",
    "definition": "Indikator komposit indeks layanan infrastruktur ke-PU-an daerah Kabupaten Demak.",
    "formula": "(Indeks Jalan + Indeks Irigasi + Indeks Air Minum + Indeks Sanitasi) / 4",
    "source": "LAKIP DINPUTARU Kabupaten Demak & Laporan Kinerja Pembangunan Daerah",
    "records": {
      "2020": {
        "target": 27,
        "realisasi": 27,
        "notes": "Sesuai penetapan RKPD"
      },
      "2021": {
        "target": 27.71,
        "realisasi": 27.71,
        "notes": "Sesuai penetapan RKPD"
      },
      "2022": {
        "target": 28.42,
        "realisasi": 28.42,
        "notes": "Sesuai penetapan RKPD"
      },
      "2023": {
        "target": 29.13,
        "realisasi": 29.13,
        "notes": "Sesuai penetapan RKPD"
      },
      "2024": {
        "target": 34.83,
        "realisasi": 34.83,
        "notes": "Sesuai penetapan RKPD"
      },
      "2025": {
        "target": 35.55,
        "realisasi": 38.649,
        "notes": "Sesuai penetapan RKPD"
      },
      "2026": {
        "target": 37.25,
        "realisasi": 38.649,
        "notes": "Realisasi TW berjalan sesuai pelaporan SPJ triwulanan"
      },
      "2027": {
        "target": 40.3,
        "realisasi": 0,
        "notes": "Sesuai penetapan RKPD"
      },
      "2028": {
        "target": 42.67,
        "realisasi": 0,
        "notes": "Sesuai penetapan RKPD"
      },
      "2029": {
        "target": 44.05,
        "realisasi": 0,
        "notes": "Sesuai penetapan RKPD"
      },
      "2030": {
        "target": 46.76,
        "realisasi": 0,
        "notes": "Sesuai penetapan RKPD"
      }
    },
    "notes": "Indikator Kinerja Daerah (RPJMD Kabupaten Demak)"
  },
  {
    "id": "IND-IKD-06",
    "code": "IKD-06",
    "name": "Indeks Kinerja Infrastruktur Daerah",
    "categoryId": "ikd",
    "bidangId": "bidang_sekretariat",
    "wewenangBidang": "Sekretariat DINPUTARU",
    "pejabatPenanggungJawab": "Amirul Mukminin, S.T., M.Si. (Sekretaris Dinas)",
    "seksiPelaksana": "Subbag Program, Keuangan & Akuntabilitas Kinerja",
    "unit": "Angka",
    "polarization": "maximize",
    "definition": "Tingkat pemenuhan dan keberfungsian sarana dan prasarana infrastruktur daerah kewenangan DINPUTARU.",
    "formula": "(Total Aset Infrastruktur Berfungsi Baik / Total Inventarisasi Aset Infrastruktur) x 100%",
    "source": "Buku Laporan Neraca Aset DINPUTARU Kab. Demak",
    "records": {
      "2020": {
        "target": 82.24,
        "realisasi": 82.24,
        "notes": "Sesuai penetapan RKPD"
      },
      "2021": {
        "target": 82.4,
        "realisasi": 82.4,
        "notes": "Sesuai penetapan RKPD"
      },
      "2022": {
        "target": 82.9,
        "realisasi": 82.9,
        "notes": "Sesuai penetapan RKPD"
      },
      "2023": {
        "target": 85.4,
        "realisasi": 85.4,
        "notes": "Sesuai penetapan RKPD"
      },
      "2024": {
        "target": 86.92,
        "realisasi": 86.92,
        "notes": "Sesuai penetapan RKPD"
      },
      "2025": {
        "target": 85.44,
        "realisasi": 88.772,
        "notes": "Sesuai penetapan RKPD"
      },
      "2026": {
        "target": 86.73,
        "realisasi": 88.772,
        "notes": "Realisasi TW berjalan sesuai pelaporan SPJ triwulanan"
      },
      "2027": {
        "target": 87.48,
        "realisasi": 0,
        "notes": "Sesuai penetapan RKPD"
      },
      "2028": {
        "target": 88.23,
        "realisasi": 0,
        "notes": "Sesuai penetapan RKPD"
      },
      "2029": {
        "target": 88.98,
        "realisasi": 0,
        "notes": "Sesuai penetapan RKPD"
      },
      "2030": {
        "target": 89.72,
        "realisasi": 0,
        "notes": "Sesuai penetapan RKPD"
      }
    },
    "notes": "Indikator Kinerja Daerah (RPJMD Kabupaten Demak)"
  },
  {
    "id": "IND-IKD-07",
    "code": "IKD-07",
    "name": "Persentase Panjang Jalan Kondisi Permukaan Mantap Kewenangan Kabupaten/Kota",
    "categoryId": "ikd",
    "bidangId": "bidang_bm",
    "wewenangBidang": "Bidang Bina Marga",
    "pejabatPenanggungJawab": "Budi Santoso, S.T., M.T. (Kabid Bina Marga)",
    "seksiPelaksana": "Seksi Pembangunan & Preservasi Jalan Jembatan",
    "unit": "%",
    "polarization": "maximize",
    "definition": "Persentase panjang jalan kabupaten dalam kondisi permukaan baik dan sedang sesuai standar Permen PUPR No. 14/PRT/M/2018 terhadap total panjang jalan kabupaten.",
    "formula": "((Panjang Jalan Kondisi Baik + Panjang Jalan Kondisi Sedang) / Total Panjang Jalan Kabupaten) x 100%",
    "source": "Hasil Survei Kondisi Jalan (SKJ / RNI) Bidang Bina Marga DINPUTARU",
    "records": {
      "2020": {
        "target": 97.24,
        "realisasi": 97.24,
        "notes": "Sesuai penetapan RKPD"
      },
      "2021": {
        "target": 98.48,
        "realisasi": 98.48,
        "notes": "Sesuai penetapan RKPD"
      },
      "2022": {
        "target": 88.25,
        "realisasi": 88.25,
        "notes": "Sesuai penetapan RKPD"
      },
      "2023": {
        "target": 88.57,
        "realisasi": 88.57,
        "notes": "Sesuai penetapan RKPD"
      },
      "2024": {
        "target": 81.48,
        "realisasi": 81.48,
        "notes": "Sesuai penetapan RKPD"
      },
      "2025": {
        "target": 85.25,
        "realisasi": 82.46,
        "notes": "Sesuai penetapan RKPD"
      },
      "2026": {
        "target": 85.75,
        "realisasi": 82.46,
        "notes": "Realisasi TW berjalan sesuai pelaporan SPJ triwulanan"
      },
      "2027": {
        "target": 86.25,
        "realisasi": 0,
        "notes": "Sesuai penetapan RKPD"
      },
      "2028": {
        "target": 86.75,
        "realisasi": 0,
        "notes": "Sesuai penetapan RKPD"
      },
      "2029": {
        "target": 91.6,
        "realisasi": 0,
        "notes": "Sesuai penetapan RKPD"
      },
      "2030": {
        "target": 91.65,
        "realisasi": 0,
        "notes": "Sesuai penetapan RKPD"
      }
    },
    "notes": "Indikator Kinerja Daerah (RPJMD Kabupaten Demak)"
  },
  {
    "id": "IND-IKU-PD-01",
    "code": "IKU-PD-01",
    "name": "Nilai SAKIP Perangkat Daerah",
    "categoryId": "iku_pd",
    "bidangId": "bidang_sekretariat",
    "wewenangBidang": "Sekretariat DINPUTARU",
    "pejabatPenanggungJawab": "Amirul Mukminin, S.T., M.Si. (Sekretaris Dinas)",
    "seksiPelaksana": "Subbag Program, Keuangan & Akuntabilitas Kinerja",
    "unit": "Angka",
    "polarization": "maximize",
    "definition": "Nilai evaluasi akuntabilitas kinerja perangkat daerah oleh Inspektorat Daerah Kabupaten Demak meliputi perencanaan, pengukuran, pelaporan, dan evaluasi internal (PermenPAN-RB No. 88/2021).",
    "formula": "Total Skor Evaluasi AKIP (Skala 0 - 100)",
    "source": "Laporan Hasil Evaluasi (LHE) AKIP Inspektorat Daerah Kabupaten Demak",
    "records": {
      "2020": {
        "target": 0,
        "realisasi": null,
        "notes": "Sesuai Renstra 2021-2026 DINPUTARU"
      },
      "2021": {
        "target": 75.61,
        "realisasi": 75.61,
        "notes": "Sesuai Renstra 2021-2026 DINPUTARU"
      },
      "2022": {
        "target": 75.61,
        "realisasi": 75.61,
        "notes": "Sesuai Renstra 2021-2026 DINPUTARU"
      },
      "2023": {
        "target": 76.4,
        "realisasi": 76.4,
        "notes": "Sesuai Renstra 2021-2026 DINPUTARU"
      },
      "2024": {
        "target": 76.7,
        "realisasi": 76.7,
        "notes": "Sesuai Renstra 2021-2026 DINPUTARU"
      },
      "2025": {
        "target": 77,
        "realisasi": 76.85,
        "notes": "Sesuai Renstra 2021-2026 DINPUTARU"
      },
      "2026": {
        "target": 77.3,
        "realisasi": 0,
        "notes": "Realisasi berjalan tahun anggaran aktif 2026"
      },
      "2027": {
        "target": 77.6,
        "realisasi": 0,
        "notes": "Sesuai Renstra 2021-2026 DINPUTARU"
      },
      "2028": {
        "target": 77.9,
        "realisasi": 0,
        "notes": "Sesuai Renstra 2021-2026 DINPUTARU"
      },
      "2029": {
        "target": 78.2,
        "realisasi": 0,
        "notes": "Sesuai Renstra 2021-2026 DINPUTARU"
      },
      "2030": {
        "target": 78.5,
        "realisasi": 0,
        "notes": "Sesuai Renstra 2021-2026 DINPUTARU"
      }
    },
    "notes": "Perjanjian Kinerja Utama Kepala Dinas (Renstra DINPUTARU)"
  },
  {
    "id": "IND-IKU-PD-02",
    "code": "IKU-PD-02",
    "name": "Indeks Pelayanan Publik Perangkat Daerah",
    "categoryId": "iku_pd",
    "bidangId": "bidang_sekretariat",
    "wewenangBidang": "Sekretariat DINPUTARU",
    "pejabatPenanggungJawab": "Amirul Mukminin, S.T., M.Si. (Sekretaris Dinas)",
    "seksiPelaksana": "Subbag Program, Keuangan & Akuntabilitas Kinerja",
    "unit": "Angka",
    "polarization": "maximize",
    "definition": "Indeks kepatuhan dan mutu standar pelayanan perizinan teknis, PBG, dan rekomendasi tata ruang pada DINPUTARU Kabupaten Demak (PermenPAN-RB No. 17/2017).",
    "formula": "Rata-rata Skor 6 Aspek Pelayanan Publik KemenPAN-RB (Skala 1 - 5)",
    "source": "Evaluasi Kinerja Pelayanan Publik KemenPAN-RB & Bagian Organisasi",
    "records": {
      "2020": {
        "target": 0,
        "realisasi": null,
        "notes": "Sesuai Renstra 2021-2026 DINPUTARU"
      },
      "2021": {
        "target": 0,
        "realisasi": null,
        "notes": "Sesuai Renstra 2021-2026 DINPUTARU"
      },
      "2022": {
        "target": 0,
        "realisasi": null,
        "notes": "Sesuai Renstra 2021-2026 DINPUTARU"
      },
      "2023": {
        "target": 0,
        "realisasi": null,
        "notes": "Sesuai Renstra 2021-2026 DINPUTARU"
      },
      "2024": {
        "target": 4.6,
        "realisasi": 4.6,
        "notes": "Sesuai Renstra 2021-2026 DINPUTARU"
      },
      "2025": {
        "target": 4.6,
        "realisasi": 4.43,
        "notes": "Sesuai Renstra 2021-2026 DINPUTARU"
      },
      "2026": {
        "target": 4.61,
        "realisasi": 0,
        "notes": "Realisasi berjalan tahun anggaran aktif 2026"
      },
      "2027": {
        "target": 4.61,
        "realisasi": 0,
        "notes": "Sesuai Renstra 2021-2026 DINPUTARU"
      },
      "2028": {
        "target": 4.62,
        "realisasi": 0,
        "notes": "Sesuai Renstra 2021-2026 DINPUTARU"
      },
      "2029": {
        "target": 4.62,
        "realisasi": 0,
        "notes": "Sesuai Renstra 2021-2026 DINPUTARU"
      },
      "2030": {
        "target": 4.62,
        "realisasi": 0,
        "notes": "Sesuai Renstra 2021-2026 DINPUTARU"
      }
    },
    "notes": "Perjanjian Kinerja Utama Kepala Dinas (Renstra DINPUTARU)"
  },
  {
    "id": "IND-IKU-PD-03",
    "code": "IKU-PD-03",
    "name": "Persentase Panjang Jalan Kondisi Permukaan Mantap Kewenangan Kabupaten/Kota",
    "categoryId": "iku_pd",
    "bidangId": "bidang_bm",
    "wewenangBidang": "Bidang Bina Marga",
    "pejabatPenanggungJawab": "Budi Santoso, S.T., M.T. (Kabid Bina Marga)",
    "seksiPelaksana": "Seksi Pembangunan & Preservasi Jalan Jembatan",
    "unit": "%",
    "polarization": "maximize",
    "definition": "Tingkat kemantapan infrastruktur jaringan jalan kabupaten dalam melayani konektivitas antar wilayah dan pusat produksi di Kabupaten Demak.",
    "formula": "((Panjang Jalan Baik + Sedang) / Total Panjang Jalan Kabupaten) x 100%",
    "source": "Data Survei Kondisi Jalan Bidang Bina Marga DINPUTARU",
    "records": {
      "2020": {
        "target": 97.24,
        "realisasi": 97.24,
        "notes": "Sesuai Renstra 2021-2026 DINPUTARU"
      },
      "2021": {
        "target": 98.48,
        "realisasi": 98.48,
        "notes": "Sesuai Renstra 2021-2026 DINPUTARU"
      },
      "2022": {
        "target": 88.25,
        "realisasi": 88.25,
        "notes": "Sesuai Renstra 2021-2026 DINPUTARU"
      },
      "2023": {
        "target": 88.57,
        "realisasi": 88.57,
        "notes": "Sesuai Renstra 2021-2026 DINPUTARU"
      },
      "2024": {
        "target": 81.48,
        "realisasi": 81.48,
        "notes": "Sesuai Renstra 2021-2026 DINPUTARU"
      },
      "2025": {
        "target": 85.25,
        "realisasi": 82.46,
        "notes": "Sesuai Renstra 2021-2026 DINPUTARU"
      },
      "2026": {
        "target": 85.75,
        "realisasi": 82.46,
        "notes": "Realisasi berjalan tahun anggaran aktif 2026"
      },
      "2027": {
        "target": 86.25,
        "realisasi": 0,
        "notes": "Sesuai Renstra 2021-2026 DINPUTARU"
      },
      "2028": {
        "target": 86.75,
        "realisasi": 0,
        "notes": "Sesuai Renstra 2021-2026 DINPUTARU"
      },
      "2029": {
        "target": 91.6,
        "realisasi": 0,
        "notes": "Sesuai Renstra 2021-2026 DINPUTARU"
      },
      "2030": {
        "target": 91.65,
        "realisasi": 0,
        "notes": "Sesuai Renstra 2021-2026 DINPUTARU"
      }
    },
    "notes": "Perjanjian Kinerja Utama Kepala Dinas (Renstra DINPUTARU)"
  },
  {
    "id": "IND-IKU-PD-04",
    "code": "IKU-PD-04",
    "name": "Persentase capaian kinerja pengelolaan sumber daya air",
    "categoryId": "iku_pd",
    "bidangId": "bidang_sekretariat",
    "wewenangBidang": "Sekretariat DINPUTARU",
    "pejabatPenanggungJawab": "Amirul Mukminin, S.T., M.Si. (Sekretaris Dinas)",
    "seksiPelaksana": "Subbag Program, Keuangan & Akuntabilitas Kinerja",
    "unit": "%",
    "polarization": "maximize",
    "definition": "Persentase ketercapaian target pengelolaan jaringan irigasi, drainase utama, dan pemeliharaan sarpras pengendali banjir/rob di Kabupaten Demak.",
    "formula": "(Rata-rata Capaian Sub-Kegiatan SDA / Target) x 100%",
    "source": "Laporan Kinerja Bidang SDA & Bina Konstruksi DINPUTARU",
    "records": {
      "2020": {
        "target": 0,
        "realisasi": null,
        "notes": "Sesuai Renstra 2021-2026 DINPUTARU"
      },
      "2021": {
        "target": 0,
        "realisasi": null,
        "notes": "Sesuai Renstra 2021-2026 DINPUTARU"
      },
      "2022": {
        "target": 0,
        "realisasi": null,
        "notes": "Sesuai Renstra 2021-2026 DINPUTARU"
      },
      "2023": {
        "target": 0,
        "realisasi": null,
        "notes": "Sesuai Renstra 2021-2026 DINPUTARU"
      },
      "2024": {
        "target": 0,
        "realisasi": null,
        "notes": "Sesuai Renstra 2021-2026 DINPUTARU"
      },
      "2025": {
        "target": 100,
        "realisasi": 93.54,
        "notes": "Sesuai Renstra 2021-2026 DINPUTARU"
      },
      "2026": {
        "target": 100,
        "realisasi": 0,
        "notes": "Realisasi berjalan tahun anggaran aktif 2026"
      },
      "2027": {
        "target": 100,
        "realisasi": 0,
        "notes": "Sesuai Renstra 2021-2026 DINPUTARU"
      },
      "2028": {
        "target": 100,
        "realisasi": 0,
        "notes": "Sesuai Renstra 2021-2026 DINPUTARU"
      },
      "2029": {
        "target": 100,
        "realisasi": 0,
        "notes": "Sesuai Renstra 2021-2026 DINPUTARU"
      },
      "2030": {
        "target": 100,
        "realisasi": 0,
        "notes": "Sesuai Renstra 2021-2026 DINPUTARU"
      }
    },
    "notes": "Perjanjian Kinerja Utama Kepala Dinas (Renstra DINPUTARU)"
  },
  {
    "id": "IND-IKU-PD-05",
    "code": "IKU-PD-05",
    "name": "Persentase capaian kinerja penyelenggaraan penataan ruang",
    "categoryId": "iku_pd",
    "bidangId": "bidang_sekretariat",
    "wewenangBidang": "Sekretariat DINPUTARU",
    "pejabatPenanggungJawab": "Amirul Mukminin, S.T., M.Si. (Sekretaris Dinas)",
    "seksiPelaksana": "Subbag Program, Keuangan & Akuntabilitas Kinerja",
    "unit": "%",
    "polarization": "maximize",
    "definition": "Persentase capaian kinerja penyelenggaraan penataan ruang meliputi penyusunan RDTR, penerbitan KKPR tepat waktu, dan pengawasan pemanfaatan ruang.",
    "formula": "(Jumlah Layanan Penataan Ruang Terpenuhi / Total Agenda Penataan Ruang) x 100%",
    "source": "Laporan Penyelenggaraan Tata Ruang Bidang Penataan Ruang & Pertanahan",
    "records": {
      "2020": {
        "target": 0,
        "realisasi": null,
        "notes": "Sesuai Renstra 2021-2026 DINPUTARU"
      },
      "2021": {
        "target": 0,
        "realisasi": null,
        "notes": "Sesuai Renstra 2021-2026 DINPUTARU"
      },
      "2022": {
        "target": 0,
        "realisasi": null,
        "notes": "Sesuai Renstra 2021-2026 DINPUTARU"
      },
      "2023": {
        "target": 0,
        "realisasi": null,
        "notes": "Sesuai Renstra 2021-2026 DINPUTARU"
      },
      "2024": {
        "target": 0,
        "realisasi": null,
        "notes": "Sesuai Renstra 2021-2026 DINPUTARU"
      },
      "2025": {
        "target": 92.08,
        "realisasi": 100,
        "notes": "Sesuai Renstra 2021-2026 DINPUTARU"
      },
      "2026": {
        "target": 92.09,
        "realisasi": 0,
        "notes": "Realisasi berjalan tahun anggaran aktif 2026"
      },
      "2027": {
        "target": 92.1,
        "realisasi": 0,
        "notes": "Sesuai Renstra 2021-2026 DINPUTARU"
      },
      "2028": {
        "target": 92.11,
        "realisasi": 0,
        "notes": "Sesuai Renstra 2021-2026 DINPUTARU"
      },
      "2029": {
        "target": 92.12,
        "realisasi": 0,
        "notes": "Sesuai Renstra 2021-2026 DINPUTARU"
      },
      "2030": {
        "target": 92.13,
        "realisasi": 0,
        "notes": "Sesuai Renstra 2021-2026 DINPUTARU"
      }
    },
    "notes": "Perjanjian Kinerja Utama Kepala Dinas (Renstra DINPUTARU)"
  },
  {
    "id": "IND-IKK-01",
    "code": "IKK-01",
    "name": "Rasio luas kawasan permukiman rawan banjir yang terlindungi oleh infrastruktur pengendalian banjir di Wilayah Sungai Kewenangan Kab/Kota",
    "categoryId": "ikk",
    "bidangId": "bidang_sda",
    "wewenangBidang": "Bidang Sumber Daya Air & Bina Konstruksi",
    "pejabatPenanggungJawab": "Ir. Hendra Wijaya, M.Eng. (Kabid SDA & BK)",
    "seksiPelaksana": "Seksi Irigasi, Pengendalian Banjir & Pembinaan Jasa Konstruksi",
    "unit": "%",
    "polarization": "maximize",
    "definition": "Indikator Kinerja Kunci (IKK) evaluasi penyelenggaraan urusan ke-PU-an dan penataan ruang pemerintah daerah Kabupaten Demak sesuai pedoman LPPD Kemendagri.",
    "formula": "(Realisasi Output Terpenuhi / Target Penetapan Kinerja) x 100%",
    "source": "Laporan Penyelenggaraan Pemerintahan Daerah (LPPD) Kabupaten Demak",
    "records": {
      "2020": {
        "target": 94.161,
        "realisasi": 94.161,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2021": {
        "target": 94.899,
        "realisasi": 94.899,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2022": {
        "target": 100,
        "realisasi": 100,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2023": {
        "target": 0,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2024": {
        "target": 57.51,
        "realisasi": 57.51,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2025": {
        "target": 19,
        "realisasi": 19,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2026": {
        "target": 29,
        "realisasi": 19,
        "notes": "Laporan Penyelenggaraan Pemerintahan Daerah (LPPD) 2026"
      },
      "2027": {
        "target": 39,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2028": {
        "target": 49,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2029": {
        "target": 60,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2030": {
        "target": 70,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      }
    },
    "notes": "Indikator Kinerja Kunci (LPPD Kemendagri)"
  },
  {
    "id": "IND-IKK-02",
    "code": "IKK-02",
    "name": "Rasio luas kawasan permukiman sepanjang pantai rawan abrasi, erosi, dan akresi yang terlindungi oleh infrastruktur pengaman pantai di Wilayah Sungai Kewenangan Kab/Kota",
    "categoryId": "ikk",
    "bidangId": "bidang_sda",
    "wewenangBidang": "Bidang Sumber Daya Air & Bina Konstruksi",
    "pejabatPenanggungJawab": "Ir. Hendra Wijaya, M.Eng. (Kabid SDA & BK)",
    "seksiPelaksana": "Seksi Irigasi, Pengendalian Banjir & Pembinaan Jasa Konstruksi",
    "unit": "%",
    "polarization": "maximize",
    "definition": "Indikator Kinerja Kunci (IKK) evaluasi penyelenggaraan urusan ke-PU-an dan penataan ruang pemerintah daerah Kabupaten Demak sesuai pedoman LPPD Kemendagri.",
    "formula": "(Realisasi Output Terpenuhi / Target Penetapan Kinerja) x 100%",
    "source": "Laporan Penyelenggaraan Pemerintahan Daerah (LPPD) Kabupaten Demak",
    "records": {
      "2020": {
        "target": 94.161,
        "realisasi": 94.161,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2021": {
        "target": 94.899,
        "realisasi": 94.899,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2022": {
        "target": 100,
        "realisasi": 100,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2023": {
        "target": 0,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2024": {
        "target": 43.79,
        "realisasi": 43.79,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2025": {
        "target": 27.68,
        "realisasi": 27.68,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2026": {
        "target": 36.74,
        "realisasi": 27.68,
        "notes": "Laporan Penyelenggaraan Pemerintahan Daerah (LPPD) 2026"
      },
      "2027": {
        "target": 45.81,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2028": {
        "target": 54.87,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2029": {
        "target": 63.94,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2030": {
        "target": 73,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      }
    },
    "notes": "Indikator Kinerja Kunci (LPPD Kemendagri)"
  },
  {
    "id": "IND-IKK-03",
    "code": "IKK-03",
    "name": "Rasio luas daerah irigasi kewenangan kabupaten/kota yang dilayani oleh jaringan irigasi",
    "categoryId": "ikk",
    "bidangId": "bidang_sda",
    "wewenangBidang": "Bidang Sumber Daya Air & Bina Konstruksi",
    "pejabatPenanggungJawab": "Ir. Hendra Wijaya, M.Eng. (Kabid SDA & BK)",
    "seksiPelaksana": "Seksi Irigasi, Pengendalian Banjir & Pembinaan Jasa Konstruksi",
    "unit": "%",
    "polarization": "maximize",
    "definition": "Indikator Kinerja Kunci (IKK) evaluasi penyelenggaraan urusan ke-PU-an dan penataan ruang pemerintah daerah Kabupaten Demak sesuai pedoman LPPD Kemendagri.",
    "formula": "(Realisasi Output Terpenuhi / Target Penetapan Kinerja) x 100%",
    "source": "Laporan Penyelenggaraan Pemerintahan Daerah (LPPD) Kabupaten Demak",
    "records": {
      "2020": {
        "target": 94.161,
        "realisasi": 94.161,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2021": {
        "target": 94.899,
        "realisasi": 94.899,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2022": {
        "target": 94.899,
        "realisasi": 94.899,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2023": {
        "target": 96.374,
        "realisasi": 96.374,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2024": {
        "target": 97.11,
        "realisasi": 97.11,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2025": {
        "target": 97.23,
        "realisasi": 97.23,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2026": {
        "target": 97.36,
        "realisasi": 97.23,
        "notes": "Laporan Penyelenggaraan Pemerintahan Daerah (LPPD) 2026"
      },
      "2027": {
        "target": 97.48,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2028": {
        "target": 97.6,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2029": {
        "target": 97.73,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2030": {
        "target": 97.85,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      }
    },
    "notes": "Indikator Kinerja Kunci (LPPD Kemendagri)"
  },
  {
    "id": "IND-IKK-04",
    "code": "IKK-04",
    "name": "Persentase jumlah rumah tangga yang mendapatkan akses terhadap air minum melalui SPAM jaringan perpipaan dan bukan jaringan perpipaan terlindungi terhadap rumah tangga di seluruh kabupaten/kota",
    "categoryId": "ikk",
    "bidangId": "bidang_ck",
    "wewenangBidang": "Bidang Cipta Karya & Perumahan",
    "pejabatPenanggungJawab": "Dian Pratama, S.T., M.Sc. (Kabid Cipta Karya)",
    "seksiPelaksana": "Seksi Air Minum, Sanitasi & Tata Bangunan",
    "unit": "%",
    "polarization": "maximize",
    "definition": "Indikator Kinerja Kunci (IKK) evaluasi penyelenggaraan urusan ke-PU-an dan penataan ruang pemerintah daerah Kabupaten Demak sesuai pedoman LPPD Kemendagri.",
    "formula": "(Realisasi Output Terpenuhi / Target Penetapan Kinerja) x 100%",
    "source": "Laporan Penyelenggaraan Pemerintahan Daerah (LPPD) Kabupaten Demak",
    "records": {
      "2020": {
        "target": 80.078,
        "realisasi": 80.078,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2021": {
        "target": 82.977,
        "realisasi": 82.977,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2022": {
        "target": 85.583,
        "realisasi": 85.583,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2023": {
        "target": 87.643,
        "realisasi": 87.643,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2024": {
        "target": 92.26,
        "realisasi": 92.26,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2025": {
        "target": 92.42,
        "realisasi": 95.18,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2026": {
        "target": 92.58,
        "realisasi": 95.18,
        "notes": "Laporan Penyelenggaraan Pemerintahan Daerah (LPPD) 2026"
      },
      "2027": {
        "target": 92.73,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2028": {
        "target": 92.89,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2029": {
        "target": 93.05,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2030": {
        "target": 93.2,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      }
    },
    "notes": "Indikator Kinerja Kunci (LPPD Kemendagri)"
  },
  {
    "id": "IND-IKK-05",
    "code": "IKK-05",
    "name": "Persentase jumlah rumah tangga yang memperoleh layanan pengolahan air limbah domestik",
    "categoryId": "ikk",
    "bidangId": "bidang_ck",
    "wewenangBidang": "Bidang Cipta Karya & Perumahan",
    "pejabatPenanggungJawab": "Dian Pratama, S.T., M.Sc. (Kabid Cipta Karya)",
    "seksiPelaksana": "Seksi Air Minum, Sanitasi & Tata Bangunan",
    "unit": "%",
    "polarization": "maximize",
    "definition": "Indikator Kinerja Kunci (IKK) evaluasi penyelenggaraan urusan ke-PU-an dan penataan ruang pemerintah daerah Kabupaten Demak sesuai pedoman LPPD Kemendagri.",
    "formula": "(Realisasi Output Terpenuhi / Target Penetapan Kinerja) x 100%",
    "source": "Laporan Penyelenggaraan Pemerintahan Daerah (LPPD) Kabupaten Demak",
    "records": {
      "2020": {
        "target": 97.997,
        "realisasi": 97.997,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2021": {
        "target": 98.153,
        "realisasi": 98.153,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2022": {
        "target": 100,
        "realisasi": 100,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2023": {
        "target": 100,
        "realisasi": 100,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2024": {
        "target": 5.79,
        "realisasi": 5.79,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2025": {
        "target": 10,
        "realisasi": 6.41,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2026": {
        "target": 15,
        "realisasi": 6.41,
        "notes": "Laporan Penyelenggaraan Pemerintahan Daerah (LPPD) 2026"
      },
      "2027": {
        "target": 20,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2028": {
        "target": 25,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2029": {
        "target": 30,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2030": {
        "target": 32,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      }
    },
    "notes": "Indikator Kinerja Kunci (LPPD Kemendagri)"
  },
  {
    "id": "IND-IKK-06",
    "code": "IKK-06",
    "name": "Rasio kepatuhan IMB kab/ kota",
    "categoryId": "ikk",
    "bidangId": "bidang_ck",
    "wewenangBidang": "Bidang Cipta Karya & Perumahan",
    "pejabatPenanggungJawab": "Dian Pratama, S.T., M.Sc. (Kabid Cipta Karya)",
    "seksiPelaksana": "Seksi Air Minum, Sanitasi & Tata Bangunan",
    "unit": "%",
    "polarization": "maximize",
    "definition": "Indikator Kinerja Kunci (IKK) evaluasi penyelenggaraan urusan ke-PU-an dan penataan ruang pemerintah daerah Kabupaten Demak sesuai pedoman LPPD Kemendagri.",
    "formula": "(Realisasi Output Terpenuhi / Target Penetapan Kinerja) x 100%",
    "source": "Laporan Penyelenggaraan Pemerintahan Daerah (LPPD) Kabupaten Demak",
    "records": {
      "2020": {
        "target": 100,
        "realisasi": 100,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2021": {
        "target": 100,
        "realisasi": 100,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2022": {
        "target": 100,
        "realisasi": 100,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2023": {
        "target": 100,
        "realisasi": 100,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2024": {
        "target": 100,
        "realisasi": 100,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2025": {
        "target": 100,
        "realisasi": 100,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2026": {
        "target": 100,
        "realisasi": 0,
        "notes": "Laporan Penyelenggaraan Pemerintahan Daerah (LPPD) 2026"
      },
      "2027": {
        "target": 100,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2028": {
        "target": 100,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2029": {
        "target": 100,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2030": {
        "target": 100,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      }
    },
    "notes": "Indikator Kinerja Kunci (LPPD Kemendagri)"
  },
  {
    "id": "IND-IKK-07",
    "code": "IKK-07",
    "name": "Tingkat Kemantapan Jalan kabupaten/kota",
    "categoryId": "ikk",
    "bidangId": "bidang_bm",
    "wewenangBidang": "Bidang Bina Marga",
    "pejabatPenanggungJawab": "Budi Santoso, S.T., M.T. (Kabid Bina Marga)",
    "seksiPelaksana": "Seksi Pembangunan & Preservasi Jalan Jembatan",
    "unit": "%",
    "polarization": "maximize",
    "definition": "Indikator Kinerja Kunci (IKK) evaluasi penyelenggaraan urusan ke-PU-an dan penataan ruang pemerintah daerah Kabupaten Demak sesuai pedoman LPPD Kemendagri.",
    "formula": "(Realisasi Output Terpenuhi / Target Penetapan Kinerja) x 100%",
    "source": "Laporan Penyelenggaraan Pemerintahan Daerah (LPPD) Kabupaten Demak",
    "records": {
      "2020": {
        "target": 97.2399,
        "realisasi": 97.2399,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2021": {
        "target": 98.48,
        "realisasi": 98.48,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2022": {
        "target": 88.25,
        "realisasi": 88.25,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2023": {
        "target": 89.369,
        "realisasi": 89.369,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2024": {
        "target": 81.48,
        "realisasi": 81.48,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2025": {
        "target": 85.25,
        "realisasi": 82.46,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2026": {
        "target": 85.75,
        "realisasi": 82.46,
        "notes": "Laporan Penyelenggaraan Pemerintahan Daerah (LPPD) 2026"
      },
      "2027": {
        "target": 86.25,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2028": {
        "target": 86.75,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2029": {
        "target": 91.6,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2030": {
        "target": 91.65,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      }
    },
    "notes": "Indikator Kinerja Kunci (LPPD Kemendagri)"
  },
  {
    "id": "IND-IKK-08",
    "code": "IKK-08",
    "name": "Rasio tenaga operator/ teknisi/analisis yang memiliki sertifikat kompetensi",
    "categoryId": "ikk",
    "bidangId": "bidang_sda",
    "wewenangBidang": "Bidang Sumber Daya Air & Bina Konstruksi",
    "pejabatPenanggungJawab": "Ir. Hendra Wijaya, M.Eng. (Kabid SDA & BK)",
    "seksiPelaksana": "Seksi Irigasi, Pengendalian Banjir & Pembinaan Jasa Konstruksi",
    "unit": "%",
    "polarization": "maximize",
    "definition": "Indikator Kinerja Kunci (IKK) evaluasi penyelenggaraan urusan ke-PU-an dan penataan ruang pemerintah daerah Kabupaten Demak sesuai pedoman LPPD Kemendagri.",
    "formula": "(Realisasi Output Terpenuhi / Target Penetapan Kinerja) x 100%",
    "source": "Laporan Penyelenggaraan Pemerintahan Daerah (LPPD) Kabupaten Demak",
    "records": {
      "2020": {
        "target": 114.385,
        "realisasi": 114.385,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2021": {
        "target": 100,
        "realisasi": 100,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2022": {
        "target": 47.688,
        "realisasi": 47.688,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2023": {
        "target": 52.271,
        "realisasi": 52.271,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2024": {
        "target": 50,
        "realisasi": 50,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2025": {
        "target": 55.7,
        "realisasi": 58.59,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2026": {
        "target": 57.7,
        "realisasi": 58.59,
        "notes": "Laporan Penyelenggaraan Pemerintahan Daerah (LPPD) 2026"
      },
      "2027": {
        "target": 59.7,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2028": {
        "target": 61.7,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2029": {
        "target": 63.7,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2030": {
        "target": 65.7,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      }
    },
    "notes": "Indikator Kinerja Kunci (LPPD Kemendagri)"
  },
  {
    "id": "IND-IKK-09",
    "code": "IKK-09",
    "name": "Rasio proyek yang menjadi kewenangan pengawasannya tanpa kecelakaan konstruksi",
    "categoryId": "ikk",
    "bidangId": "bidang_sda",
    "wewenangBidang": "Bidang Sumber Daya Air & Bina Konstruksi",
    "pejabatPenanggungJawab": "Ir. Hendra Wijaya, M.Eng. (Kabid SDA & BK)",
    "seksiPelaksana": "Seksi Irigasi, Pengendalian Banjir & Pembinaan Jasa Konstruksi",
    "unit": "%",
    "polarization": "maximize",
    "definition": "Indikator Kinerja Kunci (IKK) evaluasi penyelenggaraan urusan ke-PU-an dan penataan ruang pemerintah daerah Kabupaten Demak sesuai pedoman LPPD Kemendagri.",
    "formula": "(Realisasi Output Terpenuhi / Target Penetapan Kinerja) x 100%",
    "source": "Laporan Penyelenggaraan Pemerintahan Daerah (LPPD) Kabupaten Demak",
    "records": {
      "2020": {
        "target": 100,
        "realisasi": 100,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2021": {
        "target": 100,
        "realisasi": 100,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2022": {
        "target": 100,
        "realisasi": 100,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2023": {
        "target": 100,
        "realisasi": 100,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2024": {
        "target": 100,
        "realisasi": 100,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2025": {
        "target": 100,
        "realisasi": 100,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2026": {
        "target": 100,
        "realisasi": 100,
        "notes": "Laporan Penyelenggaraan Pemerintahan Daerah (LPPD) 2026"
      },
      "2027": {
        "target": 100,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2028": {
        "target": 100,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2029": {
        "target": 100,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2030": {
        "target": 100,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      }
    },
    "notes": "Indikator Kinerja Kunci (LPPD Kemendagri)"
  },
  {
    "id": "IND-IKK-10",
    "code": "IKK-10",
    "name": "Persentase pemanfaatan tanah yang sesuai dengan peruntukkan tanahnya diatas izin lokasi dibandingkan dengan luas izin lokasi yang diterbitkan",
    "categoryId": "ikk",
    "bidangId": "bidang_tr",
    "wewenangBidang": "Bidang Penataan Ruang & Pertanahan",
    "pejabatPenanggungJawab": "Siti Rahmawati, S.T., M.PWK. (Kabid Tata Ruang)",
    "seksiPelaksana": "Seksi Perencanaan Ruang, KKPR & Fasilitasi Pertanahan",
    "unit": "%",
    "polarization": "maximize",
    "definition": "Indikator Kinerja Kunci (IKK) evaluasi penyelenggaraan urusan ke-PU-an dan penataan ruang pemerintah daerah Kabupaten Demak sesuai pedoman LPPD Kemendagri.",
    "formula": "(Realisasi Output Terpenuhi / Target Penetapan Kinerja) x 100%",
    "source": "Laporan Penyelenggaraan Pemerintahan Daerah (LPPD) Kabupaten Demak",
    "records": {
      "2020": {
        "target": 100,
        "realisasi": 100,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2021": {
        "target": 100,
        "realisasi": 100,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2022": {
        "target": 100,
        "realisasi": 100,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2023": {
        "target": 100,
        "realisasi": 100,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2024": {
        "target": 100,
        "realisasi": 100,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2025": {
        "target": 100,
        "realisasi": 100,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2026": {
        "target": 100,
        "realisasi": 100,
        "notes": "Laporan Penyelenggaraan Pemerintahan Daerah (LPPD) 2026"
      },
      "2027": {
        "target": 100,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2028": {
        "target": 100,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2029": {
        "target": 100,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2030": {
        "target": 100,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      }
    },
    "notes": "Indikator Kinerja Kunci (LPPD Kemendagri)"
  },
  {
    "id": "IND-IKK-11",
    "code": "IKK-11",
    "name": "Persentase penetapan tanah untuk pembangunan fasilitas umum",
    "categoryId": "ikk",
    "bidangId": "bidang_tr",
    "wewenangBidang": "Bidang Penataan Ruang & Pertanahan",
    "pejabatPenanggungJawab": "Siti Rahmawati, S.T., M.PWK. (Kabid Tata Ruang)",
    "seksiPelaksana": "Seksi Perencanaan Ruang, KKPR & Fasilitasi Pertanahan",
    "unit": "%",
    "polarization": "maximize",
    "definition": "Indikator Kinerja Kunci (IKK) evaluasi penyelenggaraan urusan ke-PU-an dan penataan ruang pemerintah daerah Kabupaten Demak sesuai pedoman LPPD Kemendagri.",
    "formula": "(Realisasi Output Terpenuhi / Target Penetapan Kinerja) x 100%",
    "source": "Laporan Penyelenggaraan Pemerintahan Daerah (LPPD) Kabupaten Demak",
    "records": {
      "2020": {
        "target": 100,
        "realisasi": 100,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2021": {
        "target": 100,
        "realisasi": 100,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2022": {
        "target": 95.266,
        "realisasi": 95.266,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2023": {
        "target": 0,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2024": {
        "target": 0,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2025": {
        "target": 0,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2026": {
        "target": 0,
        "realisasi": 0,
        "notes": "Laporan Penyelenggaraan Pemerintahan Daerah (LPPD) 2026"
      },
      "2027": {
        "target": 0,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2028": {
        "target": 0,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2029": {
        "target": 0,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2030": {
        "target": 0,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      }
    },
    "notes": "Indikator Kinerja Kunci (LPPD Kemendagri)"
  },
  {
    "id": "IND-IKK-12",
    "code": "IKK-12",
    "name": "Tersedianya lokasi pembangunan dalam rangka penanaman modal.",
    "categoryId": "ikk",
    "bidangId": "bidang_tr",
    "wewenangBidang": "Bidang Penataan Ruang & Pertanahan",
    "pejabatPenanggungJawab": "Siti Rahmawati, S.T., M.PWK. (Kabid Tata Ruang)",
    "seksiPelaksana": "Seksi Perencanaan Ruang, KKPR & Fasilitasi Pertanahan",
    "unit": "%",
    "polarization": "maximize",
    "definition": "Indikator Kinerja Kunci (IKK) evaluasi penyelenggaraan urusan ke-PU-an dan penataan ruang pemerintah daerah Kabupaten Demak sesuai pedoman LPPD Kemendagri.",
    "formula": "(Realisasi Output Terpenuhi / Target Penetapan Kinerja) x 100%",
    "source": "Laporan Penyelenggaraan Pemerintahan Daerah (LPPD) Kabupaten Demak",
    "records": {
      "2020": {
        "target": 100,
        "realisasi": 100,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2021": {
        "target": 100,
        "realisasi": 100,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2022": {
        "target": 95.266,
        "realisasi": 95.266,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2023": {
        "target": 100,
        "realisasi": 100,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2024": {
        "target": 100,
        "realisasi": 100,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2025": {
        "target": 100,
        "realisasi": 100,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2026": {
        "target": 100,
        "realisasi": 100,
        "notes": "Laporan Penyelenggaraan Pemerintahan Daerah (LPPD) 2026"
      },
      "2027": {
        "target": 100,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2028": {
        "target": 100,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2029": {
        "target": 100,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2030": {
        "target": 100,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      }
    },
    "notes": "Indikator Kinerja Kunci (LPPD Kemendagri)"
  },
  {
    "id": "IND-IKK-13",
    "code": "IKK-13",
    "name": "Tersedianya Tanah Obyek Landreform (TOL) yang siap diredistribusikan yang berasal dari Tanah Kelebihan Maksimum dan Tanah Absentee",
    "categoryId": "ikk",
    "bidangId": "bidang_tr",
    "wewenangBidang": "Bidang Penataan Ruang & Pertanahan",
    "pejabatPenanggungJawab": "Siti Rahmawati, S.T., M.PWK. (Kabid Tata Ruang)",
    "seksiPelaksana": "Seksi Perencanaan Ruang, KKPR & Fasilitasi Pertanahan",
    "unit": "%",
    "polarization": "maximize",
    "definition": "Indikator Kinerja Kunci (IKK) evaluasi penyelenggaraan urusan ke-PU-an dan penataan ruang pemerintah daerah Kabupaten Demak sesuai pedoman LPPD Kemendagri.",
    "formula": "(Realisasi Output Terpenuhi / Target Penetapan Kinerja) x 100%",
    "source": "Laporan Penyelenggaraan Pemerintahan Daerah (LPPD) Kabupaten Demak",
    "records": {
      "2020": {
        "target": 0,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2021": {
        "target": 0,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2022": {
        "target": 100,
        "realisasi": 100,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2023": {
        "target": 0,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2024": {
        "target": 0,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2025": {
        "target": 0,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2026": {
        "target": 0,
        "realisasi": 0,
        "notes": "Laporan Penyelenggaraan Pemerintahan Daerah (LPPD) 2026"
      },
      "2027": {
        "target": 0,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2028": {
        "target": 0,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2029": {
        "target": 0,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2030": {
        "target": 0,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      }
    },
    "notes": "Indikator Kinerja Kunci (LPPD Kemendagri)"
  },
  {
    "id": "IND-IKK-14",
    "code": "IKK-14",
    "name": "Tersedianya tanah untuk masyarakat",
    "categoryId": "ikk",
    "bidangId": "bidang_tr",
    "wewenangBidang": "Bidang Penataan Ruang & Pertanahan",
    "pejabatPenanggungJawab": "Siti Rahmawati, S.T., M.PWK. (Kabid Tata Ruang)",
    "seksiPelaksana": "Seksi Perencanaan Ruang, KKPR & Fasilitasi Pertanahan",
    "unit": "%",
    "polarization": "maximize",
    "definition": "Indikator Kinerja Kunci (IKK) evaluasi penyelenggaraan urusan ke-PU-an dan penataan ruang pemerintah daerah Kabupaten Demak sesuai pedoman LPPD Kemendagri.",
    "formula": "(Realisasi Output Terpenuhi / Target Penetapan Kinerja) x 100%",
    "source": "Laporan Penyelenggaraan Pemerintahan Daerah (LPPD) Kabupaten Demak",
    "records": {
      "2020": {
        "target": 0,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2021": {
        "target": 0,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2022": {
        "target": 100,
        "realisasi": 100,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2023": {
        "target": 0,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2024": {
        "target": 0,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2025": {
        "target": 100,
        "realisasi": 100,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2026": {
        "target": 100,
        "realisasi": 100,
        "notes": "Laporan Penyelenggaraan Pemerintahan Daerah (LPPD) 2026"
      },
      "2027": {
        "target": 100,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2028": {
        "target": 100,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2029": {
        "target": 100,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2030": {
        "target": 100,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      }
    },
    "notes": "Indikator Kinerja Kunci (LPPD Kemendagri)"
  },
  {
    "id": "IND-IKK-15",
    "code": "IKK-15",
    "name": "Penanganan sengketa tanah garapan yang dilakukan melalui mediasi",
    "categoryId": "ikk",
    "bidangId": "bidang_tr",
    "wewenangBidang": "Bidang Penataan Ruang & Pertanahan",
    "pejabatPenanggungJawab": "Siti Rahmawati, S.T., M.PWK. (Kabid Tata Ruang)",
    "seksiPelaksana": "Seksi Perencanaan Ruang, KKPR & Fasilitasi Pertanahan",
    "unit": "%",
    "polarization": "maximize",
    "definition": "Indikator Kinerja Kunci (IKK) evaluasi penyelenggaraan urusan ke-PU-an dan penataan ruang pemerintah daerah Kabupaten Demak sesuai pedoman LPPD Kemendagri.",
    "formula": "(Realisasi Output Terpenuhi / Target Penetapan Kinerja) x 100%",
    "source": "Laporan Penyelenggaraan Pemerintahan Daerah (LPPD) Kabupaten Demak",
    "records": {
      "2020": {
        "target": 100,
        "realisasi": 100,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2021": {
        "target": 100,
        "realisasi": 100,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2022": {
        "target": 100,
        "realisasi": 100,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2023": {
        "target": 0,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2024": {
        "target": 100,
        "realisasi": 100,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2025": {
        "target": 100,
        "realisasi": 100,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2026": {
        "target": 100,
        "realisasi": 100,
        "notes": "Laporan Penyelenggaraan Pemerintahan Daerah (LPPD) 2026"
      },
      "2027": {
        "target": 100,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2028": {
        "target": 100,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2029": {
        "target": 100,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      },
      "2030": {
        "target": 100,
        "realisasi": 0,
        "notes": "Sesuai data LPPD tahun anggaran bersangkutan"
      }
    },
    "notes": "Indikator Kinerja Kunci (LPPD Kemendagri)"
  },
  {
    "id": "IND-IKP-01",
    "code": "IKP-01",
    "name": "IKM Perangkat Daerah",
    "categoryId": "program",
    "bidangId": "bidang_sekretariat",
    "wewenangBidang": "Sekretariat DINPUTARU",
    "pejabatPenanggungJawab": "Amirul Mukminin, S.T., M.Si. (Sekretaris Dinas)",
    "seksiPelaksana": "Subbag Program, Keuangan & Akuntabilitas Kinerja",
    "unit": "Angka",
    "polarization": "maximize",
    "definition": "Indikator outcome keberhasilan pelaksanaan PROGRAM PENUNJANG URUSAN PEMERINTAHAN DAERAH KABUPATEN/KOTA. Mengukur efektivitas intervensi kegiatan terhadap sasaran kinerja program.",
    "formula": "(Output Nyata Terwujud / Target Outcome Program) x 100%",
    "source": "Dokumen Pelaksanaan Anggaran (DPA) & Laporan Akuntabilitas Kinerja DINPUTARU",
    "records": {
      "2020": {
        "target": 0,
        "realisasi": null,
        "notes": "Sesuai dokumen DPA & LAKIP 2020"
      },
      "2021": {
        "target": 0,
        "realisasi": null,
        "notes": "Sesuai dokumen DPA & LAKIP 2021"
      },
      "2022": {
        "target": 0,
        "realisasi": null,
        "notes": "Sesuai dokumen DPA & LAKIP 2022"
      },
      "2023": {
        "target": 0,
        "realisasi": null,
        "notes": "Sesuai dokumen DPA & LAKIP 2023"
      },
      "2024": {
        "target": 93,
        "realisasi": 93,
        "notes": "Sesuai dokumen DPA & LAKIP 2024"
      },
      "2025": {
        "target": 93.1,
        "realisasi": 93.01,
        "notes": "Sesuai dokumen DPA & LAKIP 2025"
      },
      "2026": {
        "target": 93.2,
        "realisasi": 0,
        "notes": "Realisasi kumulatif program tahun berjalan 2026"
      },
      "2027": {
        "target": 93.3,
        "realisasi": 0,
        "notes": "Sesuai dokumen DPA & LAKIP 2027"
      },
      "2028": {
        "target": 93.4,
        "realisasi": 0,
        "notes": "Sesuai dokumen DPA & LAKIP 2028"
      },
      "2029": {
        "target": 93.5,
        "realisasi": 0,
        "notes": "Sesuai dokumen DPA & LAKIP 2029"
      },
      "2030": {
        "target": 93.6,
        "realisasi": 0,
        "notes": "Sesuai dokumen DPA & LAKIP 2030"
      }
    },
    "notes": "Program Prioritas: PROGRAM PENUNJANG URUSAN PEMERINTAHAN DAERAH KABUPATEN/KOTA"
  },
  {
    "id": "IND-IKP-02",
    "code": "IKP-02",
    "name": "Persentase jaringan irigasi dalam kondisi baik",
    "categoryId": "program",
    "bidangId": "bidang_sda",
    "wewenangBidang": "Bidang Sumber Daya Air & Bina Konstruksi",
    "pejabatPenanggungJawab": "Ir. Hendra Wijaya, M.Eng. (Kabid SDA & BK)",
    "seksiPelaksana": "Seksi Irigasi, Pengendalian Banjir & Pembinaan Jasa Konstruksi",
    "unit": "%",
    "polarization": "maximize",
    "definition": "Indikator outcome keberhasilan pelaksanaan PROGRAM PENGELOLAAN SUMBER DAYA AIR (SDA). Mengukur efektivitas intervensi kegiatan terhadap sasaran kinerja program.",
    "formula": "(Output Nyata Terwujud / Target Outcome Program) x 100%",
    "source": "Dokumen Pelaksanaan Anggaran (DPA) & Laporan Akuntabilitas Kinerja DINPUTARU",
    "records": {
      "2020": {
        "target": 0,
        "realisasi": null,
        "notes": "Sesuai dokumen DPA & LAKIP 2020"
      },
      "2021": {
        "target": 0,
        "realisasi": null,
        "notes": "Sesuai dokumen DPA & LAKIP 2021"
      },
      "2022": {
        "target": 0,
        "realisasi": null,
        "notes": "Sesuai dokumen DPA & LAKIP 2022"
      },
      "2023": {
        "target": 0,
        "realisasi": null,
        "notes": "Sesuai dokumen DPA & LAKIP 2023"
      },
      "2024": {
        "target": 88.07,
        "realisasi": 88.07,
        "notes": "Sesuai dokumen DPA & LAKIP 2024"
      },
      "2025": {
        "target": 88.07,
        "realisasi": 89.02,
        "notes": "Sesuai dokumen DPA & LAKIP 2025"
      },
      "2026": {
        "target": 89.78,
        "realisasi": 89.02,
        "notes": "Realisasi kumulatif program tahun berjalan 2026"
      },
      "2027": {
        "target": 93.2,
        "realisasi": 0,
        "notes": "Sesuai dokumen DPA & LAKIP 2027"
      },
      "2028": {
        "target": 92.19,
        "realisasi": 0,
        "notes": "Sesuai dokumen DPA & LAKIP 2028"
      },
      "2029": {
        "target": 93.4,
        "realisasi": 0,
        "notes": "Sesuai dokumen DPA & LAKIP 2029"
      },
      "2030": {
        "target": 94.61,
        "realisasi": 0,
        "notes": "Sesuai dokumen DPA & LAKIP 2030"
      }
    },
    "notes": "Program Prioritas: PROGRAM PENGELOLAAN SUMBER DAYA AIR (SDA)"
  },
  {
    "id": "IND-IKP-03",
    "code": "IKP-03",
    "name": "Persentase sarana prasarana pengendali banjir dalam kondisi baik",
    "categoryId": "program",
    "bidangId": "bidang_sda",
    "wewenangBidang": "Bidang Sumber Daya Air & Bina Konstruksi",
    "pejabatPenanggungJawab": "Ir. Hendra Wijaya, M.Eng. (Kabid SDA & BK)",
    "seksiPelaksana": "Seksi Irigasi, Pengendalian Banjir & Pembinaan Jasa Konstruksi",
    "unit": "%",
    "polarization": "maximize",
    "definition": "Indikator outcome keberhasilan pelaksanaan PROGRAM PENGELOLAAN SUMBER DAYA AIR (SDA). Mengukur efektivitas intervensi kegiatan terhadap sasaran kinerja program.",
    "formula": "(Output Nyata Terwujud / Target Outcome Program) x 100%",
    "source": "Dokumen Pelaksanaan Anggaran (DPA) & Laporan Akuntabilitas Kinerja DINPUTARU",
    "records": {
      "2020": {
        "target": 0,
        "realisasi": null,
        "notes": "Sesuai dokumen DPA & LAKIP 2020"
      },
      "2021": {
        "target": 0,
        "realisasi": null,
        "notes": "Sesuai dokumen DPA & LAKIP 2021"
      },
      "2022": {
        "target": 0,
        "realisasi": null,
        "notes": "Sesuai dokumen DPA & LAKIP 2022"
      },
      "2023": {
        "target": 0,
        "realisasi": null,
        "notes": "Sesuai dokumen DPA & LAKIP 2023"
      },
      "2024": {
        "target": 19,
        "realisasi": 19,
        "notes": "Sesuai dokumen DPA & LAKIP 2024"
      },
      "2025": {
        "target": 25,
        "realisasi": 26,
        "notes": "Sesuai dokumen DPA & LAKIP 2025"
      },
      "2026": {
        "target": 34,
        "realisasi": 26,
        "notes": "Realisasi kumulatif program tahun berjalan 2026"
      },
      "2027": {
        "target": 42,
        "realisasi": 0,
        "notes": "Sesuai dokumen DPA & LAKIP 2027"
      },
      "2028": {
        "target": 49,
        "realisasi": 0,
        "notes": "Sesuai dokumen DPA & LAKIP 2028"
      },
      "2029": {
        "target": 55,
        "realisasi": 0,
        "notes": "Sesuai dokumen DPA & LAKIP 2029"
      },
      "2030": {
        "target": 60,
        "realisasi": 0,
        "notes": "Sesuai dokumen DPA & LAKIP 2030"
      }
    },
    "notes": "Program Prioritas: PROGRAM PENGELOLAAN SUMBER DAYA AIR (SDA)"
  },
  {
    "id": "IND-IKP-04",
    "code": "IKP-04",
    "name": "persentase rumah tangga dengan akses air minum jaringan perpipaan (PDAM dan Non PDAM)",
    "categoryId": "program",
    "bidangId": "bidang_ck",
    "wewenangBidang": "Bidang Cipta Karya & Perumahan",
    "pejabatPenanggungJawab": "Dian Pratama, S.T., M.Sc. (Kabid Cipta Karya)",
    "seksiPelaksana": "Seksi Air Minum, Sanitasi & Tata Bangunan",
    "unit": "%",
    "polarization": "maximize",
    "definition": "Indikator outcome keberhasilan pelaksanaan PROGRAM PENGELOLAAN DAN PENGEMBANGAN SISTEM PENYEDIAAN AIR MINUM. Mengukur efektivitas intervensi kegiatan terhadap sasaran kinerja program.",
    "formula": "(Output Nyata Terwujud / Target Outcome Program) x 100%",
    "source": "Dokumen Pelaksanaan Anggaran (DPA) & Laporan Akuntabilitas Kinerja DINPUTARU",
    "records": {
      "2020": {
        "target": 0,
        "realisasi": null,
        "notes": "Sesuai dokumen DPA & LAKIP 2020"
      },
      "2021": {
        "target": 57.37,
        "realisasi": 57.37,
        "notes": "Sesuai dokumen DPA & LAKIP 2021"
      },
      "2022": {
        "target": 65.87,
        "realisasi": 65.87,
        "notes": "Sesuai dokumen DPA & LAKIP 2022"
      },
      "2023": {
        "target": 67.42,
        "realisasi": 67.42,
        "notes": "Sesuai dokumen DPA & LAKIP 2023"
      },
      "2024": {
        "target": 74.15,
        "realisasi": 74.15,
        "notes": "Sesuai dokumen DPA & LAKIP 2024"
      },
      "2025": {
        "target": 74.15,
        "realisasi": 78.27,
        "notes": "Sesuai dokumen DPA & LAKIP 2025"
      },
      "2026": {
        "target": 74.18,
        "realisasi": 78.27,
        "notes": "Realisasi kumulatif program tahun berjalan 2026"
      },
      "2027": {
        "target": 74.21,
        "realisasi": 0,
        "notes": "Sesuai dokumen DPA & LAKIP 2027"
      },
      "2028": {
        "target": 74.24,
        "realisasi": 0,
        "notes": "Sesuai dokumen DPA & LAKIP 2028"
      },
      "2029": {
        "target": 74.27,
        "realisasi": 0,
        "notes": "Sesuai dokumen DPA & LAKIP 2029"
      },
      "2030": {
        "target": 74.3,
        "realisasi": 0,
        "notes": "Sesuai dokumen DPA & LAKIP 2030"
      }
    },
    "notes": "Program Prioritas: PROGRAM PENGELOLAAN DAN PENGEMBANGAN SISTEM PENYEDIAAN AIR MINUM"
  },
  {
    "id": "IND-IKP-05",
    "code": "IKP-05",
    "name": "Persentase rumah tangga yang terlayani akses sanitasi layak",
    "categoryId": "program",
    "bidangId": "bidang_ck",
    "wewenangBidang": "Bidang Cipta Karya & Perumahan",
    "pejabatPenanggungJawab": "Dian Pratama, S.T., M.Sc. (Kabid Cipta Karya)",
    "seksiPelaksana": "Seksi Air Minum, Sanitasi & Tata Bangunan",
    "unit": "%",
    "polarization": "maximize",
    "definition": "Indikator outcome keberhasilan pelaksanaan PROGRAM PENGELOLAAN DAN PENGEMBANGAN SISTEM AIR LIMBAH. Mengukur efektivitas intervensi kegiatan terhadap sasaran kinerja program.",
    "formula": "(Output Nyata Terwujud / Target Outcome Program) x 100%",
    "source": "Dokumen Pelaksanaan Anggaran (DPA) & Laporan Akuntabilitas Kinerja DINPUTARU",
    "records": {
      "2020": {
        "target": 49.7,
        "realisasi": 49.7,
        "notes": "Sesuai dokumen DPA & LAKIP 2020"
      },
      "2021": {
        "target": 50.56,
        "realisasi": 50.56,
        "notes": "Sesuai dokumen DPA & LAKIP 2021"
      },
      "2022": {
        "target": 77.04,
        "realisasi": 77.04,
        "notes": "Sesuai dokumen DPA & LAKIP 2022"
      },
      "2023": {
        "target": 79.06,
        "realisasi": 79.06,
        "notes": "Sesuai dokumen DPA & LAKIP 2023"
      },
      "2024": {
        "target": 83.33,
        "realisasi": 83.33,
        "notes": "Sesuai dokumen DPA & LAKIP 2024"
      },
      "2025": {
        "target": 83.78,
        "realisasi": 86.72,
        "notes": "Sesuai dokumen DPA & LAKIP 2025"
      },
      "2026": {
        "target": 84.43,
        "realisasi": 86.72,
        "notes": "Realisasi kumulatif program tahun berjalan 2026"
      },
      "2027": {
        "target": 84.5,
        "realisasi": 0,
        "notes": "Sesuai dokumen DPA & LAKIP 2027"
      },
      "2028": {
        "target": 84.56,
        "realisasi": 0,
        "notes": "Sesuai dokumen DPA & LAKIP 2028"
      },
      "2029": {
        "target": 84.62,
        "realisasi": 0,
        "notes": "Sesuai dokumen DPA & LAKIP 2029"
      },
      "2030": {
        "target": 84.68,
        "realisasi": 0,
        "notes": "Sesuai dokumen DPA & LAKIP 2030"
      }
    },
    "notes": "Program Prioritas: PROGRAM PENGELOLAAN DAN PENGEMBANGAN SISTEM AIR LIMBAH"
  },
  {
    "id": "IND-IKP-06",
    "code": "IKP-06",
    "name": "Persentase drainase perkotaan yang tertangani",
    "categoryId": "program",
    "bidangId": "bidang_ck",
    "wewenangBidang": "Bidang Cipta Karya & Perumahan",
    "pejabatPenanggungJawab": "Dian Pratama, S.T., M.Sc. (Kabid Cipta Karya)",
    "seksiPelaksana": "Seksi Air Minum, Sanitasi & Tata Bangunan",
    "unit": "%",
    "polarization": "maximize",
    "definition": "Indikator outcome keberhasilan pelaksanaan PROGRAM PENGELOLAAN DAN PENGEMBANGAN SISTEM DRAINASE. Mengukur efektivitas intervensi kegiatan terhadap sasaran kinerja program.",
    "formula": "(Output Nyata Terwujud / Target Outcome Program) x 100%",
    "source": "Dokumen Pelaksanaan Anggaran (DPA) & Laporan Akuntabilitas Kinerja DINPUTARU",
    "records": {
      "2020": {
        "target": 80.71,
        "realisasi": 80.71,
        "notes": "Sesuai dokumen DPA & LAKIP 2020"
      },
      "2021": {
        "target": 83.51,
        "realisasi": 83.51,
        "notes": "Sesuai dokumen DPA & LAKIP 2021"
      },
      "2022": {
        "target": 86.31,
        "realisasi": 86.31,
        "notes": "Sesuai dokumen DPA & LAKIP 2022"
      },
      "2023": {
        "target": 90.11,
        "realisasi": 90.11,
        "notes": "Sesuai dokumen DPA & LAKIP 2023"
      },
      "2024": {
        "target": 92.2,
        "realisasi": 92.2,
        "notes": "Sesuai dokumen DPA & LAKIP 2024"
      },
      "2025": {
        "target": 92.8,
        "realisasi": 87846,
        "notes": "Sesuai dokumen DPA & LAKIP 2025"
      },
      "2026": {
        "target": 94.36,
        "realisasi": 88.17,
        "notes": "Realisasi kumulatif program tahun berjalan 2026"
      },
      "2027": {
        "target": 95.92,
        "realisasi": 0,
        "notes": "Sesuai dokumen DPA & LAKIP 2027"
      },
      "2028": {
        "target": 97.48,
        "realisasi": 0,
        "notes": "Sesuai dokumen DPA & LAKIP 2028"
      },
      "2029": {
        "target": 99.04,
        "realisasi": 0,
        "notes": "Sesuai dokumen DPA & LAKIP 2029"
      },
      "2030": {
        "target": 100,
        "realisasi": 0,
        "notes": "Sesuai dokumen DPA & LAKIP 2030"
      }
    },
    "notes": "Program Prioritas: PROGRAM PENGELOLAAN DAN PENGEMBANGAN SISTEM DRAINASE"
  },
  {
    "id": "IND-IKP-07",
    "code": "IKP-07",
    "name": "Rasio kepatuhan Persetujuan Bangunan Gedung (PBG) kabupaten",
    "categoryId": "program",
    "bidangId": "bidang_ck",
    "wewenangBidang": "Bidang Cipta Karya & Perumahan",
    "pejabatPenanggungJawab": "Dian Pratama, S.T., M.Sc. (Kabid Cipta Karya)",
    "seksiPelaksana": "Seksi Air Minum, Sanitasi & Tata Bangunan",
    "unit": "angka",
    "polarization": "maximize",
    "definition": "Indikator outcome keberhasilan pelaksanaan PROGRAM PENATAAN BANGUNAN GEDUNG. Mengukur efektivitas intervensi kegiatan terhadap sasaran kinerja program.",
    "formula": "(Output Nyata Terwujud / Target Outcome Program) x 100%",
    "source": "Dokumen Pelaksanaan Anggaran (DPA) & Laporan Akuntabilitas Kinerja DINPUTARU",
    "records": {
      "2020": {
        "target": 0,
        "realisasi": null,
        "notes": "Sesuai dokumen DPA & LAKIP 2020"
      },
      "2021": {
        "target": 0,
        "realisasi": null,
        "notes": "Sesuai dokumen DPA & LAKIP 2021"
      },
      "2022": {
        "target": 0,
        "realisasi": null,
        "notes": "Sesuai dokumen DPA & LAKIP 2022"
      },
      "2023": {
        "target": 0,
        "realisasi": null,
        "notes": "Sesuai dokumen DPA & LAKIP 2023"
      },
      "2024": {
        "target": 1,
        "realisasi": 1,
        "notes": "Sesuai dokumen DPA & LAKIP 2024"
      },
      "2025": {
        "target": 1,
        "realisasi": 1,
        "notes": "Sesuai dokumen DPA & LAKIP 2025"
      },
      "2026": {
        "target": 1,
        "realisasi": 0,
        "notes": "Realisasi kumulatif program tahun berjalan 2026"
      },
      "2027": {
        "target": 1,
        "realisasi": 0,
        "notes": "Sesuai dokumen DPA & LAKIP 2027"
      },
      "2028": {
        "target": 1,
        "realisasi": 0,
        "notes": "Sesuai dokumen DPA & LAKIP 2028"
      },
      "2029": {
        "target": 1,
        "realisasi": 0,
        "notes": "Sesuai dokumen DPA & LAKIP 2029"
      },
      "2030": {
        "target": 1,
        "realisasi": 0,
        "notes": "Sesuai dokumen DPA & LAKIP 2030"
      }
    },
    "notes": "Program Prioritas: PROGRAM PENATAAN BANGUNAN GEDUNG"
  },
  {
    "id": "IND-IKP-08",
    "code": "IKP-08",
    "name": "Luas kawasan bangunan dan lingkungan yang tertata dengan baik",
    "categoryId": "program",
    "bidangId": "bidang_sekretariat",
    "wewenangBidang": "Sekretariat DINPUTARU",
    "pejabatPenanggungJawab": "Amirul Mukminin, S.T., M.Si. (Sekretaris Dinas)",
    "seksiPelaksana": "Subbag Program, Keuangan & Akuntabilitas Kinerja",
    "unit": "Ha",
    "polarization": "maximize",
    "definition": "Indikator outcome keberhasilan pelaksanaan PROGRAM PENATAAN BANGUNAN DAN LINGKUNGANNYA. Mengukur efektivitas intervensi kegiatan terhadap sasaran kinerja program.",
    "formula": "(Output Nyata Terwujud / Target Outcome Program) x 100%",
    "source": "Dokumen Pelaksanaan Anggaran (DPA) & Laporan Akuntabilitas Kinerja DINPUTARU",
    "records": {
      "2020": {
        "target": 0,
        "realisasi": null,
        "notes": "Sesuai dokumen DPA & LAKIP 2020"
      },
      "2021": {
        "target": 0,
        "realisasi": null,
        "notes": "Sesuai dokumen DPA & LAKIP 2021"
      },
      "2022": {
        "target": 0,
        "realisasi": null,
        "notes": "Sesuai dokumen DPA & LAKIP 2022"
      },
      "2023": {
        "target": 0,
        "realisasi": null,
        "notes": "Sesuai dokumen DPA & LAKIP 2023"
      },
      "2024": {
        "target": 0,
        "realisasi": 0,
        "notes": "Sesuai dokumen DPA & LAKIP 2024"
      },
      "2025": {
        "target": 0,
        "realisasi": 0,
        "notes": "Sesuai dokumen DPA & LAKIP 2025"
      },
      "2026": {
        "target": 0,
        "realisasi": 0,
        "notes": "Realisasi kumulatif program tahun berjalan 2026"
      },
      "2027": {
        "target": 0.2,
        "realisasi": 0,
        "notes": "Sesuai dokumen DPA & LAKIP 2027"
      },
      "2028": {
        "target": 0.2,
        "realisasi": 0,
        "notes": "Sesuai dokumen DPA & LAKIP 2028"
      },
      "2029": {
        "target": 0.2,
        "realisasi": 0,
        "notes": "Sesuai dokumen DPA & LAKIP 2029"
      },
      "2030": {
        "target": 0.2,
        "realisasi": 0,
        "notes": "Sesuai dokumen DPA & LAKIP 2030"
      }
    },
    "notes": "Program Prioritas: PROGRAM PENATAAN BANGUNAN DAN LINGKUNGANNYA"
  },
  {
    "id": "IND-IKP-09",
    "code": "IKP-09",
    "name": "Panjang Jalan dalam kondisi mantap",
    "categoryId": "program",
    "bidangId": "bidang_bm",
    "wewenangBidang": "Bidang Bina Marga",
    "pejabatPenanggungJawab": "Budi Santoso, S.T., M.T. (Kabid Bina Marga)",
    "seksiPelaksana": "Seksi Pembangunan & Preservasi Jalan Jembatan",
    "unit": "Km",
    "polarization": "maximize",
    "definition": "Indikator outcome keberhasilan pelaksanaan PROGRAM PENYELENGGARAAN JALAN. Mengukur efektivitas intervensi kegiatan terhadap sasaran kinerja program.",
    "formula": "(Output Nyata Terwujud / Target Outcome Program) x 100%",
    "source": "Dokumen Pelaksanaan Anggaran (DPA) & Laporan Akuntabilitas Kinerja DINPUTARU",
    "records": {
      "2020": {
        "target": 0,
        "realisasi": null,
        "notes": "Sesuai dokumen DPA & LAKIP 2020"
      },
      "2021": {
        "target": 0,
        "realisasi": null,
        "notes": "Sesuai dokumen DPA & LAKIP 2021"
      },
      "2022": {
        "target": 0,
        "realisasi": null,
        "notes": "Sesuai dokumen DPA & LAKIP 2022"
      },
      "2023": {
        "target": 0,
        "realisasi": null,
        "notes": "Sesuai dokumen DPA & LAKIP 2023"
      },
      "2024": {
        "target": 750074,
        "realisasi": 750074,
        "notes": "Sesuai dokumen DPA & LAKIP 2024"
      },
      "2025": {
        "target": 751357,
        "realisasi": 750.07,
        "notes": "Sesuai dokumen DPA & LAKIP 2025"
      },
      "2026": {
        "target": 752024,
        "realisasi": 750.07,
        "notes": "Realisasi kumulatif program tahun berjalan 2026"
      },
      "2027": {
        "target": 755784,
        "realisasi": 0,
        "notes": "Sesuai dokumen DPA & LAKIP 2027"
      },
      "2028": {
        "target": 759563,
        "realisasi": 0,
        "notes": "Sesuai dokumen DPA & LAKIP 2028"
      },
      "2029": {
        "target": 763361,
        "realisasi": 0,
        "notes": "Sesuai dokumen DPA & LAKIP 2029"
      },
      "2030": {
        "target": 767178,
        "realisasi": 0,
        "notes": "Sesuai dokumen DPA & LAKIP 2030"
      }
    },
    "notes": "Program Prioritas: PROGRAM PENYELENGGARAAN JALAN"
  },
  {
    "id": "IND-IKP-10",
    "code": "IKP-10",
    "name": "Rasio tenaga kerja konstruksi yang terlatih",
    "categoryId": "program",
    "bidangId": "bidang_sda",
    "wewenangBidang": "Bidang Sumber Daya Air & Bina Konstruksi",
    "pejabatPenanggungJawab": "Ir. Hendra Wijaya, M.Eng. (Kabid SDA & BK)",
    "seksiPelaksana": "Seksi Irigasi, Pengendalian Banjir & Pembinaan Jasa Konstruksi",
    "unit": "angka",
    "polarization": "maximize",
    "definition": "Indikator outcome keberhasilan pelaksanaan PROGRAM PENGEMBANGAN JASA KONSTRUKSI. Mengukur efektivitas intervensi kegiatan terhadap sasaran kinerja program.",
    "formula": "(Output Nyata Terwujud / Target Outcome Program) x 100%",
    "source": "Dokumen Pelaksanaan Anggaran (DPA) & Laporan Akuntabilitas Kinerja DINPUTARU",
    "records": {
      "2020": {
        "target": 0,
        "realisasi": null,
        "notes": "Sesuai dokumen DPA & LAKIP 2020"
      },
      "2021": {
        "target": 0,
        "realisasi": null,
        "notes": "Sesuai dokumen DPA & LAKIP 2021"
      },
      "2022": {
        "target": 0,
        "realisasi": null,
        "notes": "Sesuai dokumen DPA & LAKIP 2022"
      },
      "2023": {
        "target": 0,
        "realisasi": null,
        "notes": "Sesuai dokumen DPA & LAKIP 2023"
      },
      "2024": {
        "target": 52.85,
        "realisasi": 52.85,
        "notes": "Sesuai dokumen DPA & LAKIP 2024"
      },
      "2025": {
        "target": 55.7,
        "realisasi": 58.59,
        "notes": "Sesuai dokumen DPA & LAKIP 2025"
      },
      "2026": {
        "target": 57.7,
        "realisasi": 0,
        "notes": "Realisasi kumulatif program tahun berjalan 2026"
      },
      "2027": {
        "target": 59.7,
        "realisasi": 0,
        "notes": "Sesuai dokumen DPA & LAKIP 2027"
      },
      "2028": {
        "target": 61.7,
        "realisasi": 0,
        "notes": "Sesuai dokumen DPA & LAKIP 2028"
      },
      "2029": {
        "target": 63.7,
        "realisasi": 0,
        "notes": "Sesuai dokumen DPA & LAKIP 2029"
      },
      "2030": {
        "target": 65.7,
        "realisasi": 0,
        "notes": "Sesuai dokumen DPA & LAKIP 2030"
      }
    },
    "notes": "Program Prioritas: PROGRAM PENGEMBANGAN JASA KONSTRUKSI"
  },
  {
    "id": "IND-IKP-11",
    "code": "IKP-11",
    "name": "Persentase kepatuhan terhadap Rencana Tata Ruang Wilayah",
    "categoryId": "program",
    "bidangId": "bidang_sekretariat",
    "wewenangBidang": "Sekretariat DINPUTARU",
    "pejabatPenanggungJawab": "Amirul Mukminin, S.T., M.Si. (Sekretaris Dinas)",
    "seksiPelaksana": "Subbag Program, Keuangan & Akuntabilitas Kinerja",
    "unit": "%",
    "polarization": "maximize",
    "definition": "Indikator outcome keberhasilan pelaksanaan PROGRAM PENYELENGGARAAN PENATAAN RUANG. Mengukur efektivitas intervensi kegiatan terhadap sasaran kinerja program.",
    "formula": "(Output Nyata Terwujud / Target Outcome Program) x 100%",
    "source": "Dokumen Pelaksanaan Anggaran (DPA) & Laporan Akuntabilitas Kinerja DINPUTARU",
    "records": {
      "2020": {
        "target": 0,
        "realisasi": null,
        "notes": "Sesuai dokumen DPA & LAKIP 2020"
      },
      "2021": {
        "target": 0,
        "realisasi": null,
        "notes": "Sesuai dokumen DPA & LAKIP 2021"
      },
      "2022": {
        "target": 0,
        "realisasi": null,
        "notes": "Sesuai dokumen DPA & LAKIP 2022"
      },
      "2023": {
        "target": 0,
        "realisasi": null,
        "notes": "Sesuai dokumen DPA & LAKIP 2023"
      },
      "2024": {
        "target": 0,
        "realisasi": 0,
        "notes": "Sesuai dokumen DPA & LAKIP 2024"
      },
      "2025": {
        "target": 65,
        "realisasi": 65,
        "notes": "Sesuai dokumen DPA & LAKIP 2025"
      },
      "2026": {
        "target": 70,
        "realisasi": 0,
        "notes": "Realisasi kumulatif program tahun berjalan 2026"
      },
      "2027": {
        "target": 75,
        "realisasi": 0,
        "notes": "Sesuai dokumen DPA & LAKIP 2027"
      },
      "2028": {
        "target": 80,
        "realisasi": 0,
        "notes": "Sesuai dokumen DPA & LAKIP 2028"
      },
      "2029": {
        "target": 85,
        "realisasi": 0,
        "notes": "Sesuai dokumen DPA & LAKIP 2029"
      },
      "2030": {
        "target": 90,
        "realisasi": 0,
        "notes": "Sesuai dokumen DPA & LAKIP 2030"
      }
    },
    "notes": "Program Prioritas: PROGRAM PENYELENGGARAAN PENATAAN RUANG"
  },
  {
    "id": "IND-IKP-12",
    "code": "IKP-12",
    "name": "Persentase pelaksanaan rencana aksi gugus tugas reforma agraria",
    "categoryId": "program",
    "bidangId": "bidang_tr",
    "wewenangBidang": "Bidang Penataan Ruang & Pertanahan",
    "pejabatPenanggungJawab": "Siti Rahmawati, S.T., M.PWK. (Kabid Tata Ruang)",
    "seksiPelaksana": "Seksi Perencanaan Ruang, KKPR & Fasilitasi Pertanahan",
    "unit": "%",
    "polarization": "maximize",
    "definition": "Indikator outcome keberhasilan pelaksanaan PROGRAM REDISTRIBUSI TANAH, DAN GANTI KERUGIAN PROGRAM TANAH KELEBIHAN MAKSIMUM DAN TANAH ABSENTEE. Mengukur efektivitas intervensi kegiatan terhadap sasaran kinerja program.",
    "formula": "(Output Nyata Terwujud / Target Outcome Program) x 100%",
    "source": "Dokumen Pelaksanaan Anggaran (DPA) & Laporan Akuntabilitas Kinerja DINPUTARU",
    "records": {
      "2020": {
        "target": 0,
        "realisasi": null,
        "notes": "Sesuai dokumen DPA & LAKIP 2020"
      },
      "2021": {
        "target": 0,
        "realisasi": null,
        "notes": "Sesuai dokumen DPA & LAKIP 2021"
      },
      "2022": {
        "target": 0,
        "realisasi": null,
        "notes": "Sesuai dokumen DPA & LAKIP 2022"
      },
      "2023": {
        "target": 0,
        "realisasi": null,
        "notes": "Sesuai dokumen DPA & LAKIP 2023"
      },
      "2024": {
        "target": 0,
        "realisasi": 0,
        "notes": "Sesuai dokumen DPA & LAKIP 2024"
      },
      "2025": {
        "target": 100,
        "realisasi": 0,
        "notes": "Sesuai dokumen DPA & LAKIP 2025"
      },
      "2026": {
        "target": 100,
        "realisasi": 0,
        "notes": "Realisasi kumulatif program tahun berjalan 2026"
      },
      "2027": {
        "target": 100,
        "realisasi": 0,
        "notes": "Sesuai dokumen DPA & LAKIP 2027"
      },
      "2028": {
        "target": 100,
        "realisasi": 0,
        "notes": "Sesuai dokumen DPA & LAKIP 2028"
      },
      "2029": {
        "target": 100,
        "realisasi": 0,
        "notes": "Sesuai dokumen DPA & LAKIP 2029"
      },
      "2030": {
        "target": 100,
        "realisasi": 0,
        "notes": "Sesuai dokumen DPA & LAKIP 2030"
      }
    },
    "notes": "Program Prioritas: PROGRAM REDISTRIBUSI TANAH, DAN GANTI KERUGIAN PROGRAM TANAH KELEBIHAN MAKSIMUM DAN TANAH ABSENTEE"
  },
  {
    "id": "IND-IKP-13",
    "code": "IKP-13",
    "name": "Persentase tanah pemkab yang bersertifikat",
    "categoryId": "program",
    "bidangId": "bidang_tr",
    "wewenangBidang": "Bidang Penataan Ruang & Pertanahan",
    "pejabatPenanggungJawab": "Siti Rahmawati, S.T., M.PWK. (Kabid Tata Ruang)",
    "seksiPelaksana": "Seksi Perencanaan Ruang, KKPR & Fasilitasi Pertanahan",
    "unit": "%",
    "polarization": "maximize",
    "definition": "Indikator outcome keberhasilan pelaksanaan PROGRAM PENATAGUNAAN TANAH. Mengukur efektivitas intervensi kegiatan terhadap sasaran kinerja program.",
    "formula": "(Output Nyata Terwujud / Target Outcome Program) x 100%",
    "source": "Dokumen Pelaksanaan Anggaran (DPA) & Laporan Akuntabilitas Kinerja DINPUTARU",
    "records": {
      "2020": {
        "target": 0,
        "realisasi": null,
        "notes": "Sesuai dokumen DPA & LAKIP 2020"
      },
      "2021": {
        "target": 0,
        "realisasi": null,
        "notes": "Sesuai dokumen DPA & LAKIP 2021"
      },
      "2022": {
        "target": 0,
        "realisasi": null,
        "notes": "Sesuai dokumen DPA & LAKIP 2022"
      },
      "2023": {
        "target": 0,
        "realisasi": null,
        "notes": "Sesuai dokumen DPA & LAKIP 2023"
      },
      "2024": {
        "target": 98,
        "realisasi": 98,
        "notes": "Sesuai dokumen DPA & LAKIP 2024"
      },
      "2025": {
        "target": 98.3,
        "realisasi": 99.21,
        "notes": "Sesuai dokumen DPA & LAKIP 2025"
      },
      "2026": {
        "target": 98.42,
        "realisasi": 97.66,
        "notes": "Realisasi kumulatif program tahun berjalan 2026"
      },
      "2027": {
        "target": 98.83,
        "realisasi": 0,
        "notes": "Sesuai dokumen DPA & LAKIP 2027"
      },
      "2028": {
        "target": 99.23,
        "realisasi": 0,
        "notes": "Sesuai dokumen DPA & LAKIP 2028"
      },
      "2029": {
        "target": 99.62,
        "realisasi": 0,
        "notes": "Sesuai dokumen DPA & LAKIP 2029"
      },
      "2030": {
        "target": 99.89,
        "realisasi": 0,
        "notes": "Sesuai dokumen DPA & LAKIP 2030"
      }
    },
    "notes": "Program Prioritas: PROGRAM PENATAGUNAAN TANAH"
  },
  {
    "id": "IND-SAS-01",
    "code": "SAS-01",
    "name": "Persentase Panjang Jalan Kondisi Permukaan Mantap Kewenangan Kabupaten/Kota",
    "categoryId": "tujuan_sasaran",
    "bidangId": "bidang_bm",
    "wewenangBidang": "Bidang Bina Marga",
    "pejabatPenanggungJawab": "Budi Santoso, S.T., M.T. (Kabid Bina Marga)",
    "seksiPelaksana": "Seksi Pembangunan & Preservasi Jalan Jembatan",
    "unit": "%",
    "polarization": "maximize",
    "definition": "Indikator capaian tujuan dan sasaran strategis Rencana Strategis (Renstra) DINPUTARU Kabupaten Demak: Meningkatkan kualitas layanan jalan.",
    "formula": "(Realisasi Sasaran Terpenuhi / Target Renstra) x 100%",
    "source": "Rencana Strategis (Renstra) DINPUTARU Kabupaten Demak 2021-2026",
    "records": {
      "2020": {
        "target": 0,
        "realisasi": null,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2021": {
        "target": 0,
        "realisasi": null,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2022": {
        "target": 0,
        "realisasi": null,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2023": {
        "target": 0,
        "realisasi": null,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2024": {
        "target": 0,
        "realisasi": null,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2025": {
        "target": 85.25,
        "realisasi": 82.46,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2026": {
        "target": 85.75,
        "realisasi": 82.46,
        "notes": "Sasaran strategis Renstra DINPUTARU tahun aktif"
      },
      "2027": {
        "target": 86.25,
        "realisasi": 0,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2028": {
        "target": 86.75,
        "realisasi": 0,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2029": {
        "target": 91.6,
        "realisasi": 0,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2030": {
        "target": 91.65,
        "realisasi": 0,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      }
    },
    "notes": "Tujuan / Sasaran: Meningkatkan kualitas layanan jalan"
  },
  {
    "id": "IND-SAS-02",
    "code": "SAS-02",
    "name": "Persentase Panjang Jalan Kondisi Baik",
    "categoryId": "tujuan_sasaran",
    "bidangId": "bidang_bm",
    "wewenangBidang": "Bidang Bina Marga",
    "pejabatPenanggungJawab": "Budi Santoso, S.T., M.T. (Kabid Bina Marga)",
    "seksiPelaksana": "Seksi Pembangunan & Preservasi Jalan Jembatan",
    "unit": "%",
    "polarization": "maximize",
    "definition": "Indikator capaian tujuan dan sasaran strategis Rencana Strategis (Renstra) DINPUTARU Kabupaten Demak: Meningkatnya kualitas jalan kewenangan kabupaten.",
    "formula": "(Realisasi Sasaran Terpenuhi / Target Renstra) x 100%",
    "source": "Rencana Strategis (Renstra) DINPUTARU Kabupaten Demak 2021-2026",
    "records": {
      "2020": {
        "target": 0,
        "realisasi": null,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2021": {
        "target": 0,
        "realisasi": null,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2022": {
        "target": 0,
        "realisasi": null,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2023": {
        "target": 0,
        "realisasi": null,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2024": {
        "target": 0,
        "realisasi": null,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2025": {
        "target": 42.9,
        "realisasi": 42.9,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2026": {
        "target": 43.16,
        "realisasi": 42.9,
        "notes": "Sasaran strategis Renstra DINPUTARU tahun aktif"
      },
      "2027": {
        "target": 43.66,
        "realisasi": 0,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2028": {
        "target": 44.16,
        "realisasi": 0,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2029": {
        "target": 44.66,
        "realisasi": 0,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2030": {
        "target": 45.16,
        "realisasi": 0,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      }
    },
    "notes": "Tujuan / Sasaran: Meningkatnya kualitas jalan kewenangan kabupaten"
  },
  {
    "id": "IND-SAS-03",
    "code": "SAS-03",
    "name": "Indeks Pelayanan Publik Dinas Pekerjaan Umum dan Penataan Ruang",
    "categoryId": "tujuan_sasaran",
    "bidangId": "bidang_sekretariat",
    "wewenangBidang": "Sekretariat DINPUTARU",
    "pejabatPenanggungJawab": "Amirul Mukminin, S.T., M.Si. (Sekretaris Dinas)",
    "seksiPelaksana": "Subbag Program, Keuangan & Akuntabilitas Kinerja",
    "unit": "angka",
    "polarization": "maximize",
    "definition": "Indikator capaian tujuan dan sasaran strategis Rencana Strategis (Renstra) DINPUTARU Kabupaten Demak: Meningkatnya tata kelola pemerintahan di perangkat daerah.",
    "formula": "(Realisasi Sasaran Terpenuhi / Target Renstra) x 100%",
    "source": "Rencana Strategis (Renstra) DINPUTARU Kabupaten Demak 2021-2026",
    "records": {
      "2020": {
        "target": 0,
        "realisasi": null,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2021": {
        "target": 0,
        "realisasi": null,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2022": {
        "target": 0,
        "realisasi": null,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2023": {
        "target": 0,
        "realisasi": null,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2024": {
        "target": 0,
        "realisasi": null,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2025": {
        "target": 4.6,
        "realisasi": 4.43,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2026": {
        "target": 4.61,
        "realisasi": 0,
        "notes": "Sasaran strategis Renstra DINPUTARU tahun aktif"
      },
      "2027": {
        "target": 4.61,
        "realisasi": 0,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2028": {
        "target": 4.62,
        "realisasi": 0,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2029": {
        "target": 4.62,
        "realisasi": 0,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2030": {
        "target": 4.62,
        "realisasi": 0,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      }
    },
    "notes": "Tujuan / Sasaran: Meningkatnya tata kelola pemerintahan di perangkat daerah"
  },
  {
    "id": "IND-SAS-04",
    "code": "SAS-04",
    "name": "Nilai SAKIP Dinas Pekerjaan Umum dan Penataan Ruang",
    "categoryId": "tujuan_sasaran",
    "bidangId": "bidang_sekretariat",
    "wewenangBidang": "Sekretariat DINPUTARU",
    "pejabatPenanggungJawab": "Amirul Mukminin, S.T., M.Si. (Sekretaris Dinas)",
    "seksiPelaksana": "Subbag Program, Keuangan & Akuntabilitas Kinerja",
    "unit": "angka",
    "polarization": "maximize",
    "definition": "Indikator capaian tujuan dan sasaran strategis Rencana Strategis (Renstra) DINPUTARU Kabupaten Demak: Nilai SAKIP Dinas Pekerjaan Umum dan Penataan Ruang.",
    "formula": "(Realisasi Sasaran Terpenuhi / Target Renstra) x 100%",
    "source": "Rencana Strategis (Renstra) DINPUTARU Kabupaten Demak 2021-2026",
    "records": {
      "2020": {
        "target": 0,
        "realisasi": null,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2021": {
        "target": 75.61,
        "realisasi": 75.61,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2022": {
        "target": 75.61,
        "realisasi": 75.61,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2023": {
        "target": 76.4,
        "realisasi": 76.4,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2024": {
        "target": 76.7,
        "realisasi": 76.7,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2025": {
        "target": 77,
        "realisasi": 76.85,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2026": {
        "target": 77.3,
        "realisasi": 0,
        "notes": "Sasaran strategis Renstra DINPUTARU tahun aktif"
      },
      "2027": {
        "target": 77.6,
        "realisasi": 0,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2028": {
        "target": 77.9,
        "realisasi": 0,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2029": {
        "target": 78.2,
        "realisasi": 0,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2030": {
        "target": 78.5,
        "realisasi": 0,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      }
    },
    "notes": "Tujuan / Sasaran: -"
  },
  {
    "id": "IND-SAS-05",
    "code": "SAS-05",
    "name": "Persentase capaian kinerja pengelolaan sumber daya air",
    "categoryId": "tujuan_sasaran",
    "bidangId": "bidang_sekretariat",
    "wewenangBidang": "Sekretariat DINPUTARU",
    "pejabatPenanggungJawab": "Amirul Mukminin, S.T., M.Si. (Sekretaris Dinas)",
    "seksiPelaksana": "Subbag Program, Keuangan & Akuntabilitas Kinerja",
    "unit": "%",
    "polarization": "maximize",
    "definition": "Indikator capaian tujuan dan sasaran strategis Rencana Strategis (Renstra) DINPUTARU Kabupaten Demak: Meningkatkan kualitas layanan Sumber Daya Air.",
    "formula": "(Realisasi Sasaran Terpenuhi / Target Renstra) x 100%",
    "source": "Rencana Strategis (Renstra) DINPUTARU Kabupaten Demak 2021-2026",
    "records": {
      "2020": {
        "target": 0,
        "realisasi": null,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2021": {
        "target": 0,
        "realisasi": null,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2022": {
        "target": 0,
        "realisasi": null,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2023": {
        "target": 0,
        "realisasi": null,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2024": {
        "target": 0,
        "realisasi": null,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2025": {
        "target": 100,
        "realisasi": 93.54,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2026": {
        "target": 100,
        "realisasi": 0,
        "notes": "Sasaran strategis Renstra DINPUTARU tahun aktif"
      },
      "2027": {
        "target": 100,
        "realisasi": 0,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2028": {
        "target": 100,
        "realisasi": 0,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2029": {
        "target": 100,
        "realisasi": 0,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2030": {
        "target": 100,
        "realisasi": 0,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      }
    },
    "notes": "Tujuan / Sasaran: Meningkatkan kualitas layanan Sumber Daya Air"
  },
  {
    "id": "IND-SAS-06",
    "code": "SAS-06",
    "name": "Indeks kinerja sistem irigasi Kewenangan Kabupaten",
    "categoryId": "tujuan_sasaran",
    "bidangId": "bidang_sda",
    "wewenangBidang": "Bidang Sumber Daya Air & Bina Konstruksi",
    "pejabatPenanggungJawab": "Ir. Hendra Wijaya, M.Eng. (Kabid SDA & BK)",
    "seksiPelaksana": "Seksi Irigasi, Pengendalian Banjir & Pembinaan Jasa Konstruksi",
    "unit": "angka",
    "polarization": "maximize",
    "definition": "Indikator capaian tujuan dan sasaran strategis Rencana Strategis (Renstra) DINPUTARU Kabupaten Demak: Meningkatnya pengembangan dan pengelolaan Sumber Daya Air.",
    "formula": "(Realisasi Sasaran Terpenuhi / Target Renstra) x 100%",
    "source": "Rencana Strategis (Renstra) DINPUTARU Kabupaten Demak 2021-2026",
    "records": {
      "2020": {
        "target": 0,
        "realisasi": null,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2021": {
        "target": 0,
        "realisasi": null,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2022": {
        "target": 0,
        "realisasi": null,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2023": {
        "target": 54.46,
        "realisasi": 54.46,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2024": {
        "target": 59.27,
        "realisasi": 59.27,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2025": {
        "target": 57.21,
        "realisasi": 60.26,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2026": {
        "target": 58.58,
        "realisasi": 0,
        "notes": "Sasaran strategis Renstra DINPUTARU tahun aktif"
      },
      "2027": {
        "target": 59.96,
        "realisasi": 0,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2028": {
        "target": 61.33,
        "realisasi": 0,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2029": {
        "target": 62.71,
        "realisasi": 0,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2030": {
        "target": 64.08,
        "realisasi": 0,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      }
    },
    "notes": "Tujuan / Sasaran: Meningkatnya pengembangan dan pengelolaan Sumber Daya Air"
  },
  {
    "id": "IND-SAS-07",
    "code": "SAS-07",
    "name": "Luas wilayah rawan banjir yang tertangani",
    "categoryId": "tujuan_sasaran",
    "bidangId": "bidang_sda",
    "wewenangBidang": "Bidang Sumber Daya Air & Bina Konstruksi",
    "pejabatPenanggungJawab": "Ir. Hendra Wijaya, M.Eng. (Kabid SDA & BK)",
    "seksiPelaksana": "Seksi Irigasi, Pengendalian Banjir & Pembinaan Jasa Konstruksi",
    "unit": "Ha",
    "polarization": "maximize",
    "definition": "Indikator capaian tujuan dan sasaran strategis Rencana Strategis (Renstra) DINPUTARU Kabupaten Demak: Luas wilayah rawan banjir yang tertangani.",
    "formula": "(Realisasi Sasaran Terpenuhi / Target Renstra) x 100%",
    "source": "Rencana Strategis (Renstra) DINPUTARU Kabupaten Demak 2021-2026",
    "records": {
      "2020": {
        "target": 0,
        "realisasi": null,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2021": {
        "target": 99.81,
        "realisasi": 99.81,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2022": {
        "target": 101.86,
        "realisasi": 101.86,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2023": {
        "target": 110.91,
        "realisasi": 110.91,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2024": {
        "target": 119.96,
        "realisasi": 119.96,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2025": {
        "target": 129.02,
        "realisasi": 129.02,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2026": {
        "target": 138.07,
        "realisasi": 129.01,
        "notes": "Sasaran strategis Renstra DINPUTARU tahun aktif"
      },
      "2027": {
        "target": 147.13,
        "realisasi": 0,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2028": {
        "target": 156.18,
        "realisasi": 0,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2029": {
        "target": 165.24,
        "realisasi": 0,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2030": {
        "target": 174.29,
        "realisasi": 0,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      }
    },
    "notes": "Tujuan / Sasaran: -"
  },
  {
    "id": "IND-SAS-08",
    "code": "SAS-08",
    "name": "Persentase drainase dalam kondisi baik",
    "categoryId": "tujuan_sasaran",
    "bidangId": "bidang_ck",
    "wewenangBidang": "Bidang Cipta Karya & Perumahan",
    "pejabatPenanggungJawab": "Dian Pratama, S.T., M.Sc. (Kabid Cipta Karya)",
    "seksiPelaksana": "Seksi Air Minum, Sanitasi & Tata Bangunan",
    "unit": "%",
    "polarization": "maximize",
    "definition": "Indikator capaian tujuan dan sasaran strategis Rencana Strategis (Renstra) DINPUTARU Kabupaten Demak: Meningkatnya daya tampung drainase.",
    "formula": "(Realisasi Sasaran Terpenuhi / Target Renstra) x 100%",
    "source": "Rencana Strategis (Renstra) DINPUTARU Kabupaten Demak 2021-2026",
    "records": {
      "2020": {
        "target": 80.71,
        "realisasi": 80.71,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2021": {
        "target": 83.51,
        "realisasi": 83.51,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2022": {
        "target": 86.31,
        "realisasi": 86.31,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2023": {
        "target": 90.11,
        "realisasi": 90.11,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2024": {
        "target": 92.14,
        "realisasi": 92.14,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2025": {
        "target": 92.2,
        "realisasi": 87846,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2026": {
        "target": 92.72,
        "realisasi": 87.85,
        "notes": "Sasaran strategis Renstra DINPUTARU tahun aktif"
      },
      "2027": {
        "target": 93.24,
        "realisasi": 0,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2028": {
        "target": 93.76,
        "realisasi": 0,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2029": {
        "target": 94.28,
        "realisasi": 0,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2030": {
        "target": 94.8,
        "realisasi": 0,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      }
    },
    "notes": "Tujuan / Sasaran: Meningkatnya daya tampung drainase"
  },
  {
    "id": "IND-SAS-09",
    "code": "SAS-09",
    "name": "Persentase rumah tangga dengan akses sanitasi aman (IUP)",
    "categoryId": "tujuan_sasaran",
    "bidangId": "bidang_ck",
    "wewenangBidang": "Bidang Cipta Karya & Perumahan",
    "pejabatPenanggungJawab": "Dian Pratama, S.T., M.Sc. (Kabid Cipta Karya)",
    "seksiPelaksana": "Seksi Air Minum, Sanitasi & Tata Bangunan",
    "unit": "%",
    "polarization": "maximize",
    "definition": "Indikator capaian tujuan dan sasaran strategis Rencana Strategis (Renstra) DINPUTARU Kabupaten Demak: Meningkatnya pelayanan air minum dan sanitasi untuk masyarakat.",
    "formula": "(Realisasi Sasaran Terpenuhi / Target Renstra) x 100%",
    "source": "Rencana Strategis (Renstra) DINPUTARU Kabupaten Demak 2021-2026",
    "records": {
      "2020": {
        "target": 2.82,
        "realisasi": 2.82,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2021": {
        "target": 3.27,
        "realisasi": 3.27,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2022": {
        "target": 4.1,
        "realisasi": 4.1,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2023": {
        "target": 5.05,
        "realisasi": 5.05,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2024": {
        "target": 5.79,
        "realisasi": 5.79,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2025": {
        "target": 10,
        "realisasi": 6.41,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2026": {
        "target": 15,
        "realisasi": 6.41,
        "notes": "Sasaran strategis Renstra DINPUTARU tahun aktif"
      },
      "2027": {
        "target": 20,
        "realisasi": 0,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2028": {
        "target": 25,
        "realisasi": 0,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2029": {
        "target": 30,
        "realisasi": 0,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2030": {
        "target": 32,
        "realisasi": 0,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      }
    },
    "notes": "Tujuan / Sasaran: Meningkatnya pelayanan air minum dan sanitasi untuk masyarakat"
  },
  {
    "id": "IND-SAS-10",
    "code": "SAS-10",
    "name": "Persentase rumah tangga yang terlayani akses air minum layak",
    "categoryId": "tujuan_sasaran",
    "bidangId": "bidang_ck",
    "wewenangBidang": "Bidang Cipta Karya & Perumahan",
    "pejabatPenanggungJawab": "Dian Pratama, S.T., M.Sc. (Kabid Cipta Karya)",
    "seksiPelaksana": "Seksi Air Minum, Sanitasi & Tata Bangunan",
    "unit": "%",
    "polarization": "maximize",
    "definition": "Indikator capaian tujuan dan sasaran strategis Rencana Strategis (Renstra) DINPUTARU Kabupaten Demak: Persentase rumah tangga yang terlayani akses air minum layak.",
    "formula": "(Realisasi Sasaran Terpenuhi / Target Renstra) x 100%",
    "source": "Rencana Strategis (Renstra) DINPUTARU Kabupaten Demak 2021-2026",
    "records": {
      "2020": {
        "target": 80.08,
        "realisasi": 80.08,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2021": {
        "target": 82.98,
        "realisasi": 82.98,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2022": {
        "target": 85.58,
        "realisasi": 85.58,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2023": {
        "target": 87.64,
        "realisasi": 87.64,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2024": {
        "target": 92.26,
        "realisasi": 92.26,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2025": {
        "target": 92.42,
        "realisasi": 95.18,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2026": {
        "target": 92.58,
        "realisasi": 95.18,
        "notes": "Sasaran strategis Renstra DINPUTARU tahun aktif"
      },
      "2027": {
        "target": 92.73,
        "realisasi": 0,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2028": {
        "target": 92.89,
        "realisasi": 0,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2029": {
        "target": 93.05,
        "realisasi": 0,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2030": {
        "target": 93.2,
        "realisasi": 0,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      }
    },
    "notes": "Tujuan / Sasaran: -"
  },
  {
    "id": "IND-SAS-11",
    "code": "SAS-11",
    "name": "Persentase capaian kinerja penyelenggaraan penataan ruang",
    "categoryId": "tujuan_sasaran",
    "bidangId": "bidang_sekretariat",
    "wewenangBidang": "Sekretariat DINPUTARU",
    "pejabatPenanggungJawab": "Amirul Mukminin, S.T., M.Si. (Sekretaris Dinas)",
    "seksiPelaksana": "Subbag Program, Keuangan & Akuntabilitas Kinerja",
    "unit": "%",
    "polarization": "maximize",
    "definition": "Indikator capaian tujuan dan sasaran strategis Rencana Strategis (Renstra) DINPUTARU Kabupaten Demak: Meningkatkan kualitas penyelenggaraan penataan ruang.",
    "formula": "(Realisasi Sasaran Terpenuhi / Target Renstra) x 100%",
    "source": "Rencana Strategis (Renstra) DINPUTARU Kabupaten Demak 2021-2026",
    "records": {
      "2020": {
        "target": 0,
        "realisasi": null,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2021": {
        "target": 0,
        "realisasi": null,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2022": {
        "target": 0,
        "realisasi": null,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2023": {
        "target": 0,
        "realisasi": null,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2024": {
        "target": 0,
        "realisasi": null,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2025": {
        "target": 92.08,
        "realisasi": 100,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2026": {
        "target": 92.09,
        "realisasi": 0,
        "notes": "Sasaran strategis Renstra DINPUTARU tahun aktif"
      },
      "2027": {
        "target": 92.1,
        "realisasi": 0,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2028": {
        "target": 92.11,
        "realisasi": 0,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2029": {
        "target": 92.12,
        "realisasi": 0,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2030": {
        "target": 92.13,
        "realisasi": 0,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      }
    },
    "notes": "Tujuan / Sasaran: Meningkatkan kualitas penyelenggaraan penataan ruang"
  },
  {
    "id": "IND-SAS-12",
    "code": "SAS-12",
    "name": "Indeks penyelenggaraan penataan ruang",
    "categoryId": "tujuan_sasaran",
    "bidangId": "bidang_tr",
    "wewenangBidang": "Bidang Penataan Ruang & Pertanahan",
    "pejabatPenanggungJawab": "Siti Rahmawati, S.T., M.PWK. (Kabid Tata Ruang)",
    "seksiPelaksana": "Seksi Perencanaan Ruang, KKPR & Fasilitasi Pertanahan",
    "unit": "angka",
    "polarization": "maximize",
    "definition": "Indikator capaian tujuan dan sasaran strategis Rencana Strategis (Renstra) DINPUTARU Kabupaten Demak: Meningkatnya kualitas penyelenggaraan penataan ruang.",
    "formula": "(Realisasi Sasaran Terpenuhi / Target Renstra) x 100%",
    "source": "Rencana Strategis (Renstra) DINPUTARU Kabupaten Demak 2021-2026",
    "records": {
      "2020": {
        "target": 0,
        "realisasi": null,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2021": {
        "target": 0,
        "realisasi": null,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2022": {
        "target": 0,
        "realisasi": null,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2023": {
        "target": 0,
        "realisasi": null,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2024": {
        "target": 0,
        "realisasi": null,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2025": {
        "target": 0,
        "realisasi": 0,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2026": {
        "target": 0.62,
        "realisasi": 0,
        "notes": "Sasaran strategis Renstra DINPUTARU tahun aktif"
      },
      "2027": {
        "target": 0.71,
        "realisasi": 0,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2028": {
        "target": 0.79,
        "realisasi": 0,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2029": {
        "target": 0.91,
        "realisasi": 0,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2030": {
        "target": 0.94,
        "realisasi": 0,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      }
    },
    "notes": "Tujuan / Sasaran: Meningkatnya kualitas penyelenggaraan penataan ruang"
  },
  {
    "id": "IND-SAS-13",
    "code": "SAS-13",
    "name": "rasio bangunan berizin",
    "categoryId": "tujuan_sasaran",
    "bidangId": "bidang_ck",
    "wewenangBidang": "Bidang Cipta Karya & Perumahan",
    "pejabatPenanggungJawab": "Dian Pratama, S.T., M.Sc. (Kabid Cipta Karya)",
    "seksiPelaksana": "Seksi Air Minum, Sanitasi & Tata Bangunan",
    "unit": "angka",
    "polarization": "maximize",
    "definition": "Indikator capaian tujuan dan sasaran strategis Rencana Strategis (Renstra) DINPUTARU Kabupaten Demak: Meningkatnya kualitas penataan bangunan gedung.",
    "formula": "(Realisasi Sasaran Terpenuhi / Target Renstra) x 100%",
    "source": "Rencana Strategis (Renstra) DINPUTARU Kabupaten Demak 2021-2026",
    "records": {
      "2020": {
        "target": 0,
        "realisasi": null,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2021": {
        "target": 0,
        "realisasi": null,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2022": {
        "target": 0,
        "realisasi": null,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2023": {
        "target": 0,
        "realisasi": null,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2024": {
        "target": 0,
        "realisasi": null,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2025": {
        "target": 0.0097,
        "realisasi": 0.0224,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2026": {
        "target": 0.0219,
        "realisasi": 0,
        "notes": "Sasaran strategis Renstra DINPUTARU tahun aktif"
      },
      "2027": {
        "target": 0.0233,
        "realisasi": 0,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2028": {
        "target": 0.0246,
        "realisasi": 0,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2029": {
        "target": 0.0259,
        "realisasi": 0,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2030": {
        "target": 0.0272,
        "realisasi": 0,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      }
    },
    "notes": "Tujuan / Sasaran: Meningkatnya kualitas penataan bangunan gedung"
  },
  {
    "id": "IND-SAS-14",
    "code": "SAS-14",
    "name": "Persentase partisipasi tenaga kerja konstruksi dalam pembangunan",
    "categoryId": "tujuan_sasaran",
    "bidangId": "bidang_sda",
    "wewenangBidang": "Bidang Sumber Daya Air & Bina Konstruksi",
    "pejabatPenanggungJawab": "Ir. Hendra Wijaya, M.Eng. (Kabid SDA & BK)",
    "seksiPelaksana": "Seksi Irigasi, Pengendalian Banjir & Pembinaan Jasa Konstruksi",
    "unit": "%",
    "polarization": "maximize",
    "definition": "Indikator capaian tujuan dan sasaran strategis Rencana Strategis (Renstra) DINPUTARU Kabupaten Demak: Meningkatnya kualitas pengembangan jasa konstruksi.",
    "formula": "(Realisasi Sasaran Terpenuhi / Target Renstra) x 100%",
    "source": "Rencana Strategis (Renstra) DINPUTARU Kabupaten Demak 2021-2026",
    "records": {
      "2020": {
        "target": 0,
        "realisasi": null,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2021": {
        "target": 0,
        "realisasi": null,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2022": {
        "target": 0,
        "realisasi": null,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2023": {
        "target": 25.7,
        "realisasi": 25.7,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2024": {
        "target": 26.79,
        "realisasi": 26.79,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2025": {
        "target": 26.79,
        "realisasi": 28.23,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2026": {
        "target": 28.8,
        "realisasi": 28.23,
        "notes": "Sasaran strategis Renstra DINPUTARU tahun aktif"
      },
      "2027": {
        "target": 29.84,
        "realisasi": 0,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2028": {
        "target": 30.87,
        "realisasi": 0,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2029": {
        "target": 31.9,
        "realisasi": 0,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      },
      "2030": {
        "target": 32.94,
        "realisasi": 0,
        "notes": "Renstra DINPUTARU Kabupaten Demak"
      }
    },
    "notes": "Tujuan / Sasaran: Meningkatnya kualitas pengembangan jasa konstruksi"
  }
];

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
          // Ensure official 15 users are synchronized
          if (!parsed.users.some(u => u.username === 'kadin.dinputaru')) {
            parsed.users = DEFAULT_USERS;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
          }
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
    let user = this.data.users.find(u => 
      (u.username.toLowerCase() === username.toLowerCase().trim() || u.email.toLowerCase() === username.toLowerCase().trim()) &&
      u.password === password
    );
    // Disambiguate if koor.sekre1 entered with *Dinput4ru_06
    if (!user && username.toLowerCase().trim() === 'koor.sekre1' && password === '*Dinput4ru_06') {
      user = this.data.users.find(u => u.id === 'USR-006');
    }

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
    if (!this.currentUser) return true; // Default allow in internal admin
    return this.currentUser.role === 'super_admin';
  }

  canEditMaster() {
    if (!this.currentUser) return true;
    return ['super_admin', 'kasubag_program_keuangan', 'sekretaris'].includes(this.currentUser.role);
  }

  // Koordinator Bidang, Kasubag, Sekretaris, dan Super Admin can input indicator data, target & realisasi
  canEditTarget() {
    if (!this.currentUser) return true;
    return ['super_admin', 'kasubag_program_keuangan', 'sekretaris', 'koordinator_bidang'].includes(this.currentUser.role);
  }

  canInputRealisasi() {
    if (!this.currentUser) return true;
    return ['super_admin', 'kasubag_program_keuangan', 'sekretaris', 'koordinator_bidang', 'kepala_bidang'].includes(this.currentUser.role);
  }

  canInputIndicatorsAndTargets() {
    if (!this.currentUser) return true;
    return ['super_admin', 'koordinator_bidang', 'kasubag_program_keuangan', 'sekretaris'].includes(this.currentUser.role);
  }

  // Koordinator Bidang, Kasubag Umum, Kasubag Program, Sekretaris dan Super Admin can add, edit, and delete Bank Data
  canManageBankData() {
    if (!this.currentUser) return true;
    return ['super_admin', 'koordinator_bidang', 'kasubag_umum_kepegawaian', 'kasubag_program_keuangan', 'sekretaris'].includes(this.currentUser.role);
  }

  // Kepala Bidang, Kasubag, Sekretaris, dan Kepala Dinas can view dashboard & print reports
  canViewExecutiveDashboard() {
    if (!this.currentUser) return true;
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
