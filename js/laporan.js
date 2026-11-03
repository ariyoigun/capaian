/**
 * SIDAT - SATUPUTARU - Laporan & Cetak Dokumen Kedinasan (DINPUTARU Kab. Demak)
 * Mendukung Akses Publik & Panel Internal
 * Format 1: Cetak Evaluasi Per Indikator Dari Tahun ke Tahun (Multi-Tahun)
 * Format 2: Rekapitulasi Kinerja Seluruh Indikator di Tahun Tertentu (Tahunan)
 */

const LaporanModule = {
  reportType: 'per_indicator', // 'per_indicator' or 'all_indicators_by_year'
  selectedIndicatorId: null,
  selectedYear: 2026,
  categoryFilter: 'all',
  bidangFilter: 'all',

  init() {
    const indicators = window.store.getIndicators();
    if (indicators.length > 0 && !this.selectedIndicatorId) {
      this.selectedIndicatorId = indicators[0].id;
    }
    const years = window.store.getVisibleYears ? window.store.getVisibleYears() : window.store.getYears();
    const activeYear = window.store.getActiveYear ? window.store.getActiveYear() : 2026;
    this.selectedYear = activeYear;

    this.populateSelectors();
    this.bindEvents();
    this.render();
  },

  populateSelectors() {
    const indSelect = document.getElementById('lap-indicator-select');
    const yrSelect = document.getElementById('lap-year-select');
    const catSelect = document.getElementById('lap-cat-filter');
    const bidangSelect = document.getElementById('lap-bidang-filter');

    const indicators = window.store.getIndicators();
    const visibleYears = window.store.getVisibleYears ? window.store.getVisibleYears() : window.store.getYears();
    const categories = window.store.getCategories();
    const bidangList = window.store.getBidang();

    if (indSelect) {
      indSelect.innerHTML = indicators.map(i => `
        <option value="${i.id}" ${i.id === this.selectedIndicatorId ? 'selected' : ''}>[${i.code}] ${i.name}</option>
      `).join('');
    }

    if (yrSelect) {
      yrSelect.innerHTML = visibleYears.map(y => `
        <option value="${y}" ${y === this.selectedYear ? 'selected' : ''}>Tahun Anggaran ${y}</option>
      `).join('');
    }

    if (catSelect) {
      catSelect.innerHTML = `
        <option value="all">Semua Kategori (IKU, IKD, IKP, IKK)</option>
        ${categories.map(c => `<option value="${c.id}">${c.code} - ${c.name}</option>`).join('')}
      `;
    }

    if (bidangSelect) {
      bidangSelect.innerHTML = `
        <option value="all">Semua Bidang Pengampu</option>
        ${bidangList.map(b => `<option value="${b.id}">${b.name}</option>`).join('')}
      `;
    }
  },

  bindEvents() {
    // Report type radio toggle in admin
    document.querySelectorAll('input[name="lap-report-type"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.reportType = e.target.value;
        this.updateControlVisibility();
        this.renderPreview();
      });
    });

    const indSelect = document.getElementById('lap-indicator-select');
    if (indSelect) {
      indSelect.addEventListener('change', (e) => {
        this.selectedIndicatorId = e.target.value;
        this.renderPreview();
      });
    }

    const yrSelect = document.getElementById('lap-year-select');
    if (yrSelect) {
      yrSelect.addEventListener('change', (e) => {
        this.selectedYear = parseInt(e.target.value, 10);
        this.renderPreview();
      });
    }

    const catSelect = document.getElementById('lap-cat-filter');
    if (catSelect) {
      catSelect.addEventListener('change', (e) => {
        this.categoryFilter = e.target.value;
        this.renderPreview();
      });
    }

    const bidangSelect = document.getElementById('lap-bidang-filter');
    if (bidangSelect) {
      bidangSelect.addEventListener('change', (e) => {
        this.bidangFilter = e.target.value;
        this.renderPreview();
      });
    }

    const btnPrint = document.getElementById('btn-print-official-report');
    if (btnPrint) {
      btnPrint.addEventListener('click', () => {
        this.printReport();
      });
    }

    const btnOpenWin = document.getElementById('btn-open-print-win');
    if (btnOpenWin) {
      btnOpenWin.addEventListener('click', () => {
        this.openPrintWindow();
      });
    }
  },

  /* ----------------- SEAMLESS DOCUMENT PRINTING HANDLERS ----------------- */
  printReport() {
    // 1. Ensure any open modal is closed so body overflow:hidden is removed
    if (window.App && typeof window.App.closeModal === 'function') {
      window.App.closeModal();
    }
    document.body.classList.remove('modal-open');
    document.documentElement.style.overflow = 'visible';
    document.body.style.overflow = 'visible';

    // 2. Refresh active preview sheet
    this.renderPreview();

    // 3. Trigger print with slight delay for DOM reflow
    setTimeout(() => {
      try {
        window.print();
      } catch (err) {
        console.warn('Inline print blocked, launching dedicated print window:', err);
        this.openPrintWindow();
      }
    }, 150);
  },

  openPrintWindow() {
    const activeHtml = this.reportType === 'per_indicator'
      ? this.generateReportPerIndicatorHtml()
      : this.generateReportAllIndicatorsByYearHtml();

    const info = window.store.getSystemInfo();
    const printWin = window.open('', '_blank', 'width=980,height=850,menubar=no,toolbar=no,location=no,status=no');
    if (!printWin) {
      alert('Pop-up jendela cetak diblokir oleh peramban. Silakan klik tombol "Cetak Dokumen" langsung atau izinkan pop-up.');
      return;
    }

    printWin.document.write(`<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Cetak Dokumen Resmi - ${info.appName || 'SIDAT - SATUPUTARU'}</title>
  <link rel="stylesheet" href="css/style.css">
  <style>
    @page { size: A4 portrait; margin: 10mm 12mm 12mm 12mm; }
    body { background: #f8fafc; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; }
    .official-paper { box-shadow: 0 4px 16px rgba(0,0,0,0.1) !important; border: 1px solid #cbd5e1 !important; max-width: 900px !important; margin: 0 auto !important; background: #ffffff !important; padding: 36px 42px !important; }
    .print-sticky-toolbar {
      position: sticky; top: 0; z-index: 9999;
      background: #ffffff; padding: 12px 20px; border: 1px solid #fed7aa; border-radius: 10px;
      box-shadow: 0 4px 14px rgba(0,0,0,0.12); margin-bottom: 20px;
      display: flex; align-items: center; justify-content: space-between;
    }
    @media print {
      .print-sticky-toolbar { display: none !important; }
      body { background: #ffffff !important; padding: 0 !important; }
      .official-paper { box-shadow: none !important; border: none !important; padding: 0 !important; width: 100% !important; max-width: 100% !important; }
    }
  </style>
</head>
<body>
  <div class="print-sticky-toolbar">
    <div style="font-weight: bold; color: #ea580c; font-size: 0.95rem;">
      📄 Pratinjau Dokumen Cetak Kedinasan DINPUTARU Demak
    </div>
    <div style="display: flex; gap: 8px;">
      <button onclick="window.print()" style="background:#ea580c; color:#ffffff; border:none; padding:8px 18px; font-weight:bold; border-radius:6px; cursor:pointer; font-size:0.9rem;">
        🖨️ Cetak / Simpan PDF
      </button>
      <button onclick="window.close()" style="background:#f1f5f9; color:#334155; border:1px solid #cbd5e1; padding:8px 14px; font-weight:bold; border-radius:6px; cursor:pointer; font-size:0.9rem;">
        Tutup
      </button>
    </div>
  </div>
  ${activeHtml}
  <script>
    setTimeout(() => { window.print(); }, 400);
  </script>
</body>
</html>`);
    printWin.document.close();
  },

  updateControlVisibility() {
    const wrapIndicator = document.getElementById('lap-control-indicator-wrap');
    const wrapYear = document.getElementById('lap-control-year-wrap');
    const wrapFilters = document.getElementById('lap-control-filters-wrap');

    if (this.reportType === 'per_indicator') {
      if (wrapIndicator) wrapIndicator.style.display = 'block';
      if (wrapYear) wrapYear.style.display = 'none';
      if (wrapFilters) wrapFilters.style.display = 'none';
    } else {
      if (wrapIndicator) wrapIndicator.style.display = 'none';
      if (wrapYear) wrapYear.style.display = 'block';
      if (wrapFilters) wrapFilters.style.display = 'flex';
    }
  },

  render() {
    this.populateSelectors();
    this.updateControlVisibility();
    this.renderPreview();
  },

  onIndicatorChange(indId) {
    this.selectedIndicatorId = indId;
    this.renderPreview();
  },

  onYearChange(yr) {
    this.selectedYear = parseInt(yr, 10);
    this.renderPreview();
  },

  onCategoryChange(catId) {
    this.categoryFilter = catId;
    this.renderPreview();
  },

  onBidangChange(bidId) {
    this.bidangFilter = bidId;
    this.renderPreview();
  },

  onReportTypeChange(type) {
    this.reportType = type;
    this.updateControlVisibility();
    this.renderPreview();
  },

  renderPreview() {
    const adminContainer = document.getElementById('laporan-preview-sheet');
    if (adminContainer) {
      if (this.reportType === 'per_indicator') {
        adminContainer.innerHTML = this.generateReportPerIndicatorHtml();
      } else {
        adminContainer.innerHTML = this.generateReportAllIndicatorsByYearHtml();
      }
    }

    const pubContainer = document.getElementById('public-laporan-preview-sheet');
    if (pubContainer) {
      if (this.reportType === 'per_indicator') {
        pubContainer.innerHTML = this.generateReportPerIndicatorHtml();
      } else {
        pubContainer.innerHTML = this.generateReportAllIndicatorsByYearHtml();
      }
    }

    if (window.lucide) window.lucide.createIcons();
  },

  /* ----------------- RENDER LAPORAN UNTUK AKSES PUBLIK ----------------- */
  renderPublicLaporan() {
    const section = document.getElementById('public-laporan-section');
    if (!section) return;

    const indicators = window.store.getIndicators();
    const visibleYears = window.store.getVisibleYears ? window.store.getVisibleYears() : [2020, 2021, 2022, 2023, 2024, 2025, 2026];
    const categories = window.store.getCategories();

    if (!this.selectedIndicatorId && indicators.length > 0) {
      this.selectedIndicatorId = indicators[0].id;
    }

    section.innerHTML = `
      <div class="pub-laporan-wrapper">
        
        <!-- Header & Deskripsi Laporan Publik -->
        <div class="pub-laporan-header-box mb-3 p-3 bg-white rounded border-orange shadow-sm">
          <div class="d-flex flex-wrap align-items-center justify-content-between gap-3">
            <div>
              <div class="d-flex align-items-center gap-2 mb-1">
                <span class="badge-orange-primary font-mono font-bold">DOKUMEN RESMI</span>
                <span class="badge bg-light text-dark border font-mono">STANDAR SAKIP / LKjIP</span>
              </div>
              <h4 class="font-bold text-dark mb-1">
                <i data-lucide="printer" class="icon-sm text-orange"></i> Laporan Capaian Kinerja Kedinasan DINPUTARU Kab. Demak
              </h4>
              <p class="text-muted small mb-0">
                Akses publik transparan dokumen resmi kinerja dengan Kop Surat Pemerintah Kabupaten Demak. Dapat langsung dicetak atau disimpan ke PDF.
              </p>
            </div>

            <!-- Tombol Cetak / PDF -->
            <div class="d-flex flex-wrap gap-2">
              <button class="pub-btn-orange font-bold px-3 py-2" onclick="LaporanModule.printReport()" title="Cetak langsung ke printer atau simpan sebagai PDF">
                <i data-lucide="printer" class="icon-xs"></i> Cetak Dokumen / Simpan PDF
              </button>
              <button class="adm-btn adm-btn-sm adm-btn-outline font-bold px-3 py-2" onclick="LaporanModule.openPrintWindow()" title="Buka lembar dokumen di jendela cetak mandiri">
                <i data-lucide="external-link" class="icon-xs"></i> Jendela Cetak Mandiri
              </button>
            </div>
          </div>
        </div>

        <!-- Filter & Control Toolbar Publik -->
        <div class="pub-laporan-controls-bar mb-4 p-3 bg-white rounded border shadow-sm">
          <div class="row g-3 align-items-center">
            
            <!-- Pilihan Format Laporan -->
            <div class="col-lg-4 col-md-5">
              <label class="form-label font-bold small text-dark mb-1">Format Laporan:</label>
              <div class="d-flex flex-column gap-1">
                <label class="form-check d-flex align-items-center gap-2 cursor-pointer mb-0">
                  <input type="radio" name="pub-lap-type" value="per_indicator" class="form-check-input" ${this.reportType === 'per_indicator' ? 'checked' : ''} onchange="LaporanModule.setPublicReportType('per_indicator')">
                  <span class="small font-bold">1. Evaluasi Per Indikator (2020 - 2026)</span>
                </label>
                <label class="form-check d-flex align-items-center gap-2 cursor-pointer mb-0">
                  <input type="radio" name="pub-lap-type" value="all_indicators_by_year" class="form-check-input" ${this.reportType === 'all_indicators_by_year' ? 'checked' : ''} onchange="LaporanModule.setPublicReportType('all_indicators_by_year')">
                  <span class="small font-bold">2. Rekapitulasi Seluruh Indikator (Tahunan)</span>
                </label>
              </div>
            </div>

            <!-- Selector Dinamis: Indikator atau Tahun -->
            <div class="col-lg-8 col-md-7">
              <div id="pub-lap-ctrl-indicator" style="${this.reportType === 'per_indicator' ? 'display: block;' : 'display: none;'}">
                <label class="form-label font-bold small text-dark mb-1">Pilih Indikator Kinerja yang Dicetak:</label>
                <select id="pub-lap-select-indicator" class="pub-select-orange w-100" onchange="LaporanModule.setPublicIndicator(this.value)">
                  ${indicators.map(i => `
                    <option value="${i.id}" ${i.id === this.selectedIndicatorId ? 'selected' : ''}>
                      [${i.code}] ${i.name} (${i.unit})
                    </option>
                  `).join('')}
                </select>
              </div>

              <div id="pub-lap-ctrl-year" style="${this.reportType === 'all_indicators_by_year' ? 'display: flex;' : 'display: none;'}" class="gap-2 flex-wrap">
                <div class="flex-grow-1">
                  <label class="form-label font-bold small text-dark mb-1">Pilih Tahun Anggaran:</label>
                  <select id="pub-lap-select-year" class="pub-select-orange w-100" onchange="LaporanModule.setPublicYear(this.value)">
                    ${visibleYears.map(y => `
                      <option value="${y}" ${y === this.selectedYear ? 'selected' : ''}>Tahun Anggaran ${y}</option>
                    `).join('')}
                  </select>
                </div>
                <div class="flex-grow-1">
                  <label class="form-label font-bold small text-dark mb-1">Kategori Indikator:</label>
                  <select id="pub-lap-select-category" class="pub-select-orange w-100" onchange="LaporanModule.setPublicCategory(this.value)">
                    <option value="all">Semua Kategori (IKU, IKD, IKP, IKK)</option>
                    ${categories.map(c => `
                      <option value="${c.id}" ${c.id === this.categoryFilter ? 'selected' : ''}>${c.code} - ${c.name}</option>
                    `).join('')}
                  </select>
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- Preview Sheet Kertas Resmi -->
        <div id="public-laporan-preview-sheet" class="pub-preview-wrapper mb-5">
          <!-- Injected dynamically -->
        </div>

      </div>
    `;

    this.renderPreview();
    if (window.lucide) window.lucide.createIcons();
  },

  setPublicReportType(type) {
    this.reportType = type;
    const ctrlInd = document.getElementById('pub-lap-ctrl-indicator');
    const ctrlYr = document.getElementById('pub-lap-ctrl-year');
    if (ctrlInd && ctrlYr) {
      if (type === 'per_indicator') {
        ctrlInd.style.display = 'block';
        ctrlYr.style.display = 'none';
      } else {
        ctrlInd.style.display = 'none';
        ctrlYr.style.display = 'flex';
      }
    }
    this.renderPreview();
  },

  setPublicIndicator(indId) {
    this.selectedIndicatorId = indId;
    this.renderPreview();
  },

  setPublicYear(year) {
    this.selectedYear = parseInt(year, 10);
    this.renderPreview();
  },

  setPublicCategory(catId) {
    this.categoryFilter = catId;
    this.renderPreview();
  },

  /* ----------------- GENERATE HTML 1: LAPORAN PER INDIKATOR MULTI-TAHUN ----------------- */
  generateReportPerIndicatorHtml() {
    if (!this.selectedIndicatorId) {
      const allInds = window.store.getIndicators();
      if (allInds.length > 0) this.selectedIndicatorId = allInds[0].id;
    }
    const ind = window.store.getIndicatorById(this.selectedIndicatorId);
    if (!ind) {
      return `<div class="p-4 bg-white rounded text-center text-muted">Pilih indikator terlebih dahulu untuk menampilkan lembar laporan.</div>`;
    }

    const cat = window.store.getCategories().find(c => c.id === ind.categoryId);
    const bidang = window.store.getBidang().find(b => b.id === ind.bidangId);
    const visibleYears = window.store.getVisibleYears ? window.store.getVisibleYears() : [2020, 2021, 2022, 2023, 2024, 2025, 2026];
    const activeYear = window.store.getActiveYear ? window.store.getActiveYear() : 2026;
    const currentDate = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

    let rowsHtml = visibleYears.map(yr => {
      const rec = ind.records?.[yr] || { target: 0, realisasi: 0, notes: '-' };
      const pct = window.store.calculateCapaian(rec.target, rec.realisasi, ind.polarization);
      const gap = Math.round((rec.realisasi - rec.target) * 100) / 100;
      const st = window.store.getStatus(pct);
      const isAct = yr === activeYear;

      return `
        <tr class="${isAct ? 'row-active-year' : ''}">
          <td class="text-center font-bold font-mono">
            ${yr} ${isAct ? '<span class="badge-year-active">Aktif</span>' : ''}
          </td>
          <td class="text-end font-mono">${rec.target} ${ind.unit}</td>
          <td class="text-end font-mono font-bold text-dark">${rec.realisasi} ${ind.unit}</td>
          <td class="text-end font-mono ${gap >= 0 ? 'text-success' : 'text-danger'}">
            ${gap > 0 ? '+' : ''}${gap} ${ind.unit}
          </td>
          <td class="text-center font-mono font-bold">
            <span class="retro-status-badge ${st.class} py-0 px-2">${pct}%</span>
          </td>
          <td><span class="small font-bold ${st.class}">${st.label}</span></td>
          <td class="small text-muted">${rec.notes || 'Sesuai target penetapan RKPD'}</td>
        </tr>
      `;
    }).join('');

    const info = window.store.getSystemInfo();
    const emblemText = (info.appName || 'DINPUTARU').split('-')[0].trim();
    const kop1 = info.kopBaris1 || 'PEMERINTAH KABUPATEN DEMAK';
    const kop2 = info.kopBaris2 || 'DINAS PEKERJAAN UMUM DAN PENATAAN RUANG (DINPUTARU)';
    const kop3 = info.kopAlamat || (info.officeAddress ? `${info.officeAddress} • Telepon: ${info.contactPhone || '(0291) 685123'} • Email: ${info.contactEmail || 'dinputaru@demakkab.go.id'}` : 'Jalan Kyai Jebat No. 892 Demak, Jawa Tengah 59511 • Telepon: (0291) 685123 • Email: dinputaru@demakkab.go.id');
    const docTitle = info.docTitlePerIndicator || 'LAPORAN EVALUASI PERKEMBANGAN CAPAIAN INDIKATOR KINERJA';
    const docCity = info.docCity || 'Demak';
    const kadinTitle = info.kadinJabatan || 'KEPALA DINAS PEKERJAAN UMUM DAN PENATAAN RUANG<br>KABUPATEN DEMAK';
    const kadinName = info.kadinName || 'Drs. H. AHMAD SUGIHARTO, S.T., M.Si.';
    const kadinPangkat = info.kadinPangkat || 'Pembina Utama Muda (IV/c)';
    const kadinNip = info.kadinNip || '19680315 199403 1 007';

    return `
      <div class="official-paper">
        <!-- KOP SURAT RESMI PEMERINTAH KABUPATEN DEMAK -->
        <div class="official-kop">
          <div class="kop-emblem">
            <div class="brand-emblem-kop">
              <span class="kop-badge-text">${emblemText}</span>
            </div>
          </div>
          <div class="kop-text">
            <h2>${kop1}</h2>
            <h3>${kop2}</h3>
            <p>${kop3}</p>
          </div>
        </div>
        <div class="kop-divider"></div>

        <!-- JUDUL DOKUMEN -->
        <div class="official-doc-title">
          <h4>${docTitle}</h4>
          <span class="doc-meta-sub">Periode Evaluasi Multi-Tahun: Tahun Anggaran ${visibleYears[0]} s/d ${activeYear}</span>
        </div>

        <!-- IDENTITAS INDIKATOR -->
        <div class="official-section-box mb-3">
          <table class="table-info-meta">
            <tr>
              <td style="width: 220px;" class="fw-bold">Kode & Nama Indikator</td>
              <td style="width: 15px;">:</td>
              <td class="fw-bold text-primary font-mono">[${ind.code}] ${ind.name}</td>
            </tr>
            <tr>
              <td class="fw-bold">Klasifikasi / Kategori</td>
              <td>:</td>
              <td>${cat ? cat.name : '-'} (${cat ? cat.code : '-'}) • Segmen ${cat?.segmentNumber || '-'}</td>
            </tr>
            <tr>
              <td class="fw-bold">Wewenang Bidang Pengampu</td>
              <td>:</td>
              <td class="fw-bold text-dark">
                ${ind.wewenangBidang || (bidang ? bidang.name : 'DINPUTARU Kabupaten Demak')}
              </td>
            </tr>
            <tr>
              <td class="fw-bold">Pejabat Pembina / Penanggung Jawab</td>
              <td>:</td>
              <td>${ind.pejabatPenanggungJawab || (bidang ? bidang.head : '-')}</td>
            </tr>
            <tr>
              <td class="fw-bold">Seksi Pelaksana Teknis</td>
              <td>:</td>
              <td>${ind.seksiPelaksana || (bidang ? bidang.seksi : '-')}</td>
            </tr>
            <tr>
              <td class="fw-bold">Satuan / Arah Polarisasi</td>
              <td>:</td>
              <td>${ind.unit} • ${ind.polarization === 'maximize' ? 'Maximize (Makin Tinggi Nilai Realisasi Makin Baik)' : 'Minimize (Makin Rendah Makin Baik)'}</td>
            </tr>
          </table>
        </div>

        <!-- 3 ATRIBUT DASAR PENGUKURAN KINERJA -->
        <div class="official-section-box mb-3">
          <div class="mb-2">
            <strong class="text-dark">1. Definisi Operasional:</strong>
            <p class="small text-muted mb-0 ps-3">${ind.definition || 'Tercantum dalam dokumen Renstra dan Indikator Kinerja Utama DINPUTARU Kabupaten Demak.'}</p>
          </div>
          <div class="mb-2">
            <strong class="text-dark">2. Formulasi Perhitungan Matematis:</strong>
            <p class="small font-mono text-primary mb-0 ps-3">${ind.formula || 'Realisasi Kumulatif / Target Penetapan x 100%'}</p>
          </div>
          <div>
            <strong class="text-dark">3. Sumber Data Resmi:</strong>
            <p class="small text-muted mb-0 ps-3">${ind.source || 'Buku Data Capaian Kinerja DINPUTARU & Laporan SAKIP Kab. Demak'}</p>
          </div>
        </div>

        <!-- TABEL CAPAIAN MULTI-TAHUN -->
        <div class="mb-4">
          <h5 class="official-subheading mb-2">A. Perkembangan Realisasi Terhadap Target Tahunan (${visibleYears[0]} - ${activeYear})</h5>
          <div class="retro-table-wrap">
            <table class="retro-table table-bordered official-table">
              <thead>
                <tr>
                  <th class="text-center" style="width: 85px;">Tahun</th>
                  <th class="text-end" style="width: 130px;">Target (${ind.unit})</th>
                  <th class="text-end" style="width: 130px;">Realisasi (${ind.unit})</th>
                  <th class="text-end" style="width: 120px;">Deviasi (Gap)</th>
                  <th class="text-center" style="width: 100px;">% Capaian</th>
                  <th style="width: 150px;">Predikat Kinerja</th>
                  <th>Catatan Evaluasi / Rekomendasi</th>
                </tr>
              </thead>
              <tbody>
                ${rowsHtml}
              </tbody>
            </table>
          </div>
        </div>

        <!-- LEMBAR TANDA TANGAN PENGESAHAN KEDINASAN -->
        <div class="official-signature-block">
          <div class="sig-left">
            <p class="small text-muted mb-1">Pejabat Pembuat Laporan Kinerja,</p>
            <p class="sig-title">Koordinator / Kepala Bidang Pengampu,</p>
            <div class="sig-space"></div>
            <p class="sig-name"><u>${ind.pejabatPenanggungJawab || (bidang ? bidang.head : 'Pejabat Penilai Kinerja')}</u></p>
            <p class="sig-nip">NIP. 19780120 200501 1 008</p>
          </div>

          <div class="sig-right">
            <p class="small text-muted mb-1">${docCity}, ${currentDate}</p>
            <p class="sig-title">Mengetahui & Mengesahkan,<br><strong>${kadinTitle}</strong></p>
            <div class="sig-space"></div>
            <p class="sig-name"><u>${kadinName}</u></p>
            <p class="sig-nip">${kadinPangkat}<br>NIP. ${kadinNip}</p>
          </div>
        </div>
      </div>
    `;
  },

  /* ----------------- GENERATE HTML 2: REKAPITULASI SELURUH INDIKATOR PER TAHUN ----------------- */
  generateReportAllIndicatorsByYearHtml() {
    const yr = this.selectedYear;
    const categories = window.store.getCategories().sort((a, b) => (a.segmentNumber || 9) - (b.segmentNumber || 9));
    const indicators = window.store.getIndicators();
    const bidangList = window.store.getBidang();
    const currentDate = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

    // Filter indicators
    let filtered = indicators;
    if (this.categoryFilter !== 'all') {
      filtered = filtered.filter(i => i.categoryId === this.categoryFilter);
    }
    if (this.bidangFilter !== 'all') {
      filtered = filtered.filter(i => i.bidangId === this.bidangFilter);
    }

    let totalInd = filtered.length;
    let achievedCount = 0;
    let sumPct = 0;

    filtered.forEach(ind => {
      const rec = ind.records?.[yr] || { target: 0, realisasi: 0 };
      const pct = window.store.calculateCapaian(rec.target, rec.realisasi, ind.polarization);
      sumPct += pct;
      if (pct >= 100) achievedCount++;
    });

    const avgPct = totalInd > 0 ? Math.round((sumPct / totalInd) * 100) / 100 : 0;

    // Build segments
    let segmentsHtml = categories.map(cat => {
      const catIndicators = filtered.filter(i => i.categoryId === cat.id);
      if (catIndicators.length === 0) return '';

      return `
        <div class="report-segment-wrap mb-4">
          <div class="report-segment-header p-2 bg-light border d-flex align-items-center justify-content-between mb-2">
            <div>
              <span class="badge bg-dark text-white font-mono font-bold">${cat.code}</span>
              <span class="font-bold text-dark fs-6 ms-2">SEGMEN ${cat.segmentNumber || '-'}: ${cat.name.toUpperCase()}</span>
            </div>
            <span class="small text-muted">${catIndicators.length} Indikator Kinerja</span>
          </div>

          <table class="retro-table table-bordered official-table table-sm">
            <thead>
              <tr>
                <th class="text-center" style="width: 45px;">No</th>
                <th style="width: 95px;">Kode</th>
                <th style="min-width: 260px;">Nama Indikator Kinerja</th>
                <th style="width: 190px;">Wewenang Bidang yang Menangani</th>
                <th class="text-center" style="width: 70px;">Satuan</th>
                <th class="text-end" style="width: 100px;">Target</th>
                <th class="text-end" style="width: 100px;">Realisasi</th>
                <th class="text-center" style="width: 90px;">% Capaian</th>
                <th style="width: 130px;">Predikat</th>
              </tr>
            </thead>
            <tbody>
              ${catIndicators.map((ind, idx) => {
                const rec = ind.records?.[yr] || { target: 0, realisasi: 0 };
                const pct = window.store.calculateCapaian(rec.target, rec.realisasi, ind.polarization);
                const st = window.store.getStatus(pct);
                const b = bidangList.find(b => b.id === ind.bidangId);

                return `
                  <tr>
                    <td class="text-center font-bold font-mono text-muted">${idx + 1}</td>
                    <td><span class="font-mono font-bold text-dark">[${ind.code}]</span></td>
                    <td>
                      <strong class="text-dark">${ind.name}</strong>
                    </td>
                    <td>
                      <span class="badge bg-light text-dark border small font-bold d-block">
                        ${ind.wewenangBidang || (b ? b.name : 'DINPUTARU Demak')}
                      </span>
                      <span class="small text-muted font-italic">${ind.seksiPelaksana || (b ? b.seksi : '-')}</span>
                    </td>
                    <td class="text-center font-mono">${ind.unit}</td>
                    <td class="text-end font-mono">${rec.target}</td>
                    <td class="text-end font-mono font-bold text-dark">${rec.realisasi}</td>
                    <td class="text-center font-mono font-bold">
                      <span class="retro-status-badge ${st.class} py-0 px-2">${pct}%</span>
                    </td>
                    <td>
                      <span class="small font-bold ${st.class}">${st.label}</span>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      `;
    }).join('');

    const info = window.store.getSystemInfo();
    const emblemText = (info.appName || 'DINPUTARU').split('-')[0].trim();
    const kop1 = info.kopBaris1 || 'PEMERINTAH KABUPATEN DEMAK';
    const kop2 = info.kopBaris2 || 'DINAS PEKERJAAN UMUM DAN PENATAAN RUANG (DINPUTARU)';
    const kop3 = info.kopAlamat || (info.officeAddress ? `${info.officeAddress} • Telepon: ${info.contactPhone || '(0291) 685123'} • Email: ${info.contactEmail || 'dinputaru@demakkab.go.id'}` : 'Jalan Kyai Jebat No. 892 Demak, Jawa Tengah 59511 • Telepon: (0291) 685123 • Email: dinputaru@demakkab.go.id');
    const docTitle = info.docTitleRekapTahunan || 'REKAPITULASI CAPAIAN KINERJA INFRASTRUKTUR DAN PENATAAN RUANG';
    const docCity = info.docCity || 'Demak';
    const kadinTitle = info.kadinJabatan || 'KEPALA DINAS PEKERJAAN UMUM DAN PENATAAN RUANG<br>KABUPATEN DEMAK';
    const kadinName = info.kadinName || 'Drs. H. AHMAD SUGIHARTO, S.T., M.Si.';
    const kadinPangkat = info.kadinPangkat || 'Pembina Utama Muda (IV/c)';
    const kadinNip = info.kadinNip || '19680315 199403 1 007';
    const sekdinTitle = info.sekdinJabatan || 'Sekretaris DINPUTARU Kab. Demak,';
    const sekdinName = info.sekdinName || 'AMIRUL MUKMININ, S.T., M.Si.';
    const sekdinPangkat = info.sekdinPangkat || 'Pembina (IV/a)';
    const sekdinNip = info.sekdinNip || '19750422 200212 1 003';

    return `
      <div class="official-paper">
        <!-- KOP SURAT RESMI -->
        <div class="official-kop">
          <div class="kop-emblem">
            <div class="brand-emblem-kop">
              <span class="kop-badge-text">${emblemText}</span>
            </div>
          </div>
          <div class="kop-text">
            <h2>${kop1}</h2>
            <h3>${kop2}</h3>
            <p>${kop3}</p>
          </div>
        </div>
        <div class="kop-divider"></div>

        <!-- JUDUL DOKUMEN -->
        <div class="official-doc-title">
          <h4>${docTitle}</h4>
          <span class="doc-meta-sub">TAHUN ANGGARAN ${yr}</span>
        </div>

        <!-- STATISTIK RINGKASAN EKSEKUTIF -->
        <div class="official-summary-stats mb-4">
          <div class="row g-2">
            <div class="col-3">
              <div class="stat-mini-box">
                <span class="sm-label">Total Indikator</span>
                <span class="sm-val font-mono">${totalInd} Indikator</span>
              </div>
            </div>
            <div class="col-3">
              <div class="stat-mini-box">
                <span class="sm-label">Tercapai (≥100%)</span>
                <span class="sm-val font-mono text-success">${achievedCount} (${totalInd > 0 ? Math.round((achievedCount / totalInd) * 100) : 0}%)</span>
              </div>
            </div>
            <div class="col-3">
              <div class="stat-mini-box">
                <span class="sm-label">Perlu Akselerasi (<100%)</span>
                <span class="sm-val font-mono text-danger">${totalInd - achievedCount} Indikator</span>
              </div>
            </div>
            <div class="col-3">
              <div class="stat-mini-box">
                <span class="sm-label">Rata-Rata Capaian</span>
                <span class="sm-val font-mono text-primary">${avgPct}%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- TABEL SEGMEN-SEGMEN INDIKATOR -->
        ${segmentsHtml}

        <!-- LEMBAR TANDA TANGAN PENGESAHAN KEPALA DINAS -->
        <div class="official-signature-block mt-4">
          <div class="sig-left">
            <p class="small text-muted mb-1">Diverifikasi & Divalidasi oleh:</p>
            <p class="sig-title">${sekdinTitle}</p>
            <div class="sig-space"></div>
            <p class="sig-name"><u>${sekdinName}</u></p>
            <p class="sig-nip">${sekdinPangkat}<br>NIP. ${sekdinNip}</p>
          </div>

          <div class="sig-right">
            <p class="small text-muted mb-1">${docCity}, ${currentDate}</p>
            <p class="sig-title">Mengesahkan,<br><strong>${kadinTitle}</strong></p>
            <div class="sig-space"></div>
            <p class="sig-name"><u>${kadinName}</u></p>
            <p class="sig-nip">${kadinPangkat}<br>NIP. ${kadinNip}</p>
          </div>
        </div>
      </div>
    `;
  }
};

window.LaporanModule = LaporanModule;