/**
 * SIDAT - SATUPUTARU - Public Portal Module (Tema Warna Oranye & Putih Bersih)
 * Akses Publik: Target dan Indikator di Setiap Kategori dari 2020 sampai Tahun Aktif (2026)
 * Fitur:
 * 1. 4 Tab Navigasi Publik: Kartu & Grafik Tren, Matriks Multi-Tahun, Laporan Kinerja Resmi, Bank Data
 * 2. Grafik Tren Multi-Tahun Anti-Layar-Hitam (Chart.js + Native Canvas Fallback)
 * 3. Tampilan Kompak, Rapih, dan Terstruktur
 */

const PublicPortalModule = {
  selectedPublicIndicatorId: null,
  publicChartInstance: null,
  currentPubTab: 'cards', // 'cards', 'matrix', 'laporan', 'bankdata'
  selectedCategoryTab: 'all', // 'all', 'iku', 'ikd', 'ikp', 'ikk'
  publicSearchTerm: '',
  
  // Bank Data Pagination State
  bankDataCurrentPage: 1,
  bankDataPageSize: 10,
  bankDataSearchTerm: '',
  bankDataBidangFilter: 'all',

  init() {
    const indicators = window.store.getIndicators();
    if (indicators.length > 0 && !this.selectedPublicIndicatorId) {
      this.selectedPublicIndicatorId = indicators[0].id;
    }

    this.render();
    this.bindEvents();

    // Re-render when store updates
    window.store.subscribe(() => {
      this.render();
    });
  },

  bindEvents() {
    // Bank data search input
    const searchInput = document.getElementById('public-bd-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.bankDataSearchTerm = e.target.value.toLowerCase().trim();
        this.bankDataCurrentPage = 1;
        this.renderBankDataSegment();
      });
    }

    // Bank data bidang filter
    const bidangSelect = document.getElementById('public-bd-bidang-filter');
    if (bidangSelect) {
      const bidangList = window.store.getBidang();
      bidangSelect.innerHTML = `
        <option value="all">Semua Bidang Pengelola</option>
        ${bidangList.map(b => `<option value="${b.id}">${b.name}</option>`).join('')}
      `;
      bidangSelect.addEventListener('change', (e) => {
        this.bankDataBidangFilter = e.target.value;
        this.bankDataCurrentPage = 1;
        this.renderBankDataSegment();
      });
    }

    // Search indicator input in public view
    const pubSearchInput = document.getElementById('public-indicator-search');
    if (pubSearchInput) {
      pubSearchInput.addEventListener('input', (e) => {
        this.publicSearchTerm = e.target.value.toLowerCase().trim();
        if (this.currentPubTab === 'matrix') {
          this.renderPublicMatrixTable();
        } else {
          this.renderIndicatorSegments();
        }
      });
    }
  },

  /* ----------------- TAB SWITCHER PORTAL PUBLIK (4 TAB) ----------------- */
  switchPubTab(tab) {
    this.currentPubTab = tab;

    // Update active tab buttons
    document.querySelectorAll('.pub-nav-tab').forEach(btn => {
      if (btn.getAttribute('data-pub-tab') === tab) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Toggle pane visibility
    const panes = ['cards', 'matrix', 'laporan', 'bankdata'];
    panes.forEach(t => {
      const pane = document.getElementById(`pub-tab-pane-${t}`);
      if (pane) {
        pane.style.display = (t === tab) ? 'block' : 'none';
      }
    });

    // Render corresponding section
    if (tab === 'cards') {
      this.renderSelectedIndicatorHighlight();
      this.renderIndicatorSegments();
    } else if (tab === 'matrix') {
      this.renderPublicMatrixTable();
    } else if (tab === 'laporan') {
      if (window.LaporanModule) {
        window.LaporanModule.renderPublicLaporan();
      }
    } else if (tab === 'bankdata') {
      this.renderBankDataSegment();
    }

    if (window.lucide) window.lucide.createIcons();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  setCategoryTab(catId) {
    this.selectedCategoryTab = catId;
    this.renderToolbar();
    if (this.currentPubTab === 'matrix') {
      this.renderPublicMatrixTable();
    } else {
      this.renderIndicatorSegments();
    }
  },

  render() {
    this.updateHeroStats();
    this.renderToolbar();

    if (this.currentPubTab === 'cards') {
      this.renderSelectedIndicatorHighlight();
      this.renderIndicatorSegments();
    } else if (this.currentPubTab === 'matrix') {
      this.renderPublicMatrixTable();
    } else if (this.currentPubTab === 'laporan') {
      if (window.LaporanModule) window.LaporanModule.renderPublicLaporan();
    } else if (this.currentPubTab === 'bankdata') {
      this.renderBankDataSegment();
    }

    if (window.lucide) window.lucide.createIcons();
  },

  /* ----------------- UPDATE HERO STATS PILLS ----------------- */
  updateHeroStats() {
    const indicators = window.store.getIndicators();
    const visibleYears = window.store.getVisibleYears ? window.store.getVisibleYears() : [2020, 2021, 2022, 2023, 2024, 2025, 2026];
    const activeYear = window.store.getActiveYear ? window.store.getActiveYear() : 2026;

    let achievedCount = 0;
    indicators.forEach(ind => {
      const rec = ind.records?.[activeYear] || { target: 0, realisasi: 0 };
      const pct = window.store.calculateCapaian(rec.target, rec.realisasi, ind.polarization);
      if (pct >= 100) achievedCount++;
    });

    const elTotal = document.getElementById('pub-stat-total');
    const elAchieved = document.getElementById('pub-stat-achieved');
    const elYear = document.getElementById('pub-stat-year');
    const elPeriod = document.getElementById('pub-stat-period');

    if (elTotal) elTotal.textContent = `${indicators.length}`;
    if (elAchieved) elAchieved.textContent = `${achievedCount} / ${indicators.length}`;
    if (elYear) elYear.textContent = `${activeYear}`;
    if (elPeriod) elPeriod.textContent = `${visibleYears[0]}-${activeYear}`;
  },

  /* ----------------- RENDER TOOLBAR KATEGORI & PENCARIAN ----------------- */
  renderToolbar() {
    const container = document.getElementById('public-control-toolbar');
    if (!container) return;

    const categories = window.store.getCategories().sort((a, b) => (a.segmentNumber || 9) - (b.segmentNumber || 9));
    const visibleYears = window.store.getVisibleYears ? window.store.getVisibleYears() : [2020, 2021, 2022, 2023, 2024, 2025, 2026];
    const activeYear = window.store.getActiveYear ? window.store.getActiveYear() : 2026;

    container.innerHTML = `
      <div class="pub-toolbar-card mb-3">
        <div class="d-flex flex-wrap align-items-center justify-content-between gap-2">
          
          <!-- Category Filter Buttons -->
          <div class="pub-cat-filters-wrap d-flex flex-wrap gap-1">
            <button class="pub-cat-filter-btn ${this.selectedCategoryTab === 'all' ? 'active' : ''}" onclick="PublicPortalModule.setCategoryTab('all')">
              Semua Kategori
            </button>
            ${categories.map(c => `
              <button class="pub-cat-filter-btn ${this.selectedCategoryTab === c.id ? 'active' : ''}" onclick="PublicPortalModule.setCategoryTab('${c.id}')">
                ${c.code} (${c.name})
              </button>
            `).join('')}
          </div>

          <!-- Periode Info Pill -->
          <div class="d-flex align-items-center gap-2">
            <span class="pub-year-badge-pill">
              <i data-lucide="calendar" class="icon-xs text-orange"></i>
              <span>Periode Aktif: <strong>${visibleYears[0]} s.d. ${activeYear}</strong></span>
            </span>
          </div>

        </div>

        <!-- Search Bar -->
        <div class="row g-2 mt-2 align-items-center">
          <div class="col-md-8">
            <div class="pub-search-box">
              <i data-lucide="search" class="icon-xs text-orange"></i>
              <input type="text" id="public-indicator-search" class="pub-search-input" value="${this.publicSearchTerm}" placeholder="Cari nama indikator, kode, atau wewenang bidang penanggung jawab...">
            </div>
          </div>
          <div class="col-md-4 text-md-end text-muted small">
            Menampilkan data <strong>Target & Realisasi</strong> tahun <strong>${visibleYears[0]} - ${activeYear}</strong>
          </div>
        </div>
      </div>
    `;

    // Re-bind search input
    const pubSearchInput = document.getElementById('public-indicator-search');
    if (pubSearchInput) {
      pubSearchInput.addEventListener('input', (e) => {
        this.publicSearchTerm = e.target.value.toLowerCase().trim();
        if (this.currentPubTab === 'matrix') {
          this.renderPublicMatrixTable();
        } else {
          this.renderIndicatorSegments();
        }
      });
    }
  },

  /* ----------------- RENDER SEGMEN KARTU INDIKATOR (6 KATEGORI DARI EXCEL) ----------------- */
  renderIndicatorSegments() {
    const parentContainer = document.getElementById('public-cards-view-section');
    if (!parentContainer) return;

    const categories = window.store.getCategories().sort((a, b) => (a.segmentNumber || 9) - (b.segmentNumber || 9));
    const indicators = window.store.getIndicators();
    const visibleYears = window.store.getVisibleYears ? window.store.getVisibleYears() : [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];
    const activeYear = window.store.getActiveYear ? window.store.getActiveYear() : 2026;

    let html = '';

    categories.forEach(cat => {
      // Filter category tab
      if (this.selectedCategoryTab !== 'all' && this.selectedCategoryTab !== cat.id) {
        return;
      }

      // Filter by search term
      let catIndicators = indicators.filter(i => (i.categoryId === cat.id || i.category === cat.code || i.category === cat.id));
      if (this.publicSearchTerm) {
        catIndicators = catIndicators.filter(i => 
          i.name.toLowerCase().includes(this.publicSearchTerm) ||
          i.code.toLowerCase().includes(this.publicSearchTerm) ||
          (i.wewenangBidang && i.wewenangBidang.toLowerCase().includes(this.publicSearchTerm))
        );
      }

      const cardsHtml = catIndicators.length === 0 ? `
        <div class="p-3 bg-white rounded border-orange text-center small text-muted w-100">
          Tidak ada indikator yang sesuai dengan kriteria pencarian pada kategori ${cat.name}.
        </div>
      ` : catIndicators.map(ind => {
        const isSelected = ind.id === this.selectedPublicIndicatorId;
        const rec = ind.records?.[activeYear] || { target: 0, realisasi: 0 };
        const pct = window.store.calculateCapaian(rec.target, rec.realisasi, ind.polarization);
        const status = window.store.getStatus(pct);
        const bidang = window.store.getBidang().find(b => b.id === ind.bidangId);

        // Multi-year mini progress bar / summary
        const yearsSummaryHtml = visibleYears.map(yr => {
          const r = ind.records?.[yr] || { target: 0, realisasi: 0 };
          const p = window.store.calculateCapaian(r.target, r.realisasi, ind.polarization);
          const isAct = yr === activeYear;
          const rDisplay = (r.realisasi !== null && r.realisasi !== undefined) ? r.realisasi : '-';
          return `
            <div class="pub-year-mini-stat ${isAct ? 'active-year' : ''}" title="Tahun ${yr}: Target ${r.target} ${ind.unit}, Realisasi ${rDisplay} ${ind.unit} (${p}%)">
              <span class="ym-yr font-mono">${yr}</span>
              <span class="ym-val font-mono ${p >= 100 ? 'text-success' : 'text-orange'}">${rDisplay}</span>
            </div>
          `;
        }).join('');

        return `
          <div class="pub-indicator-card-orange ${isSelected ? 'active-pub-card' : ''}" 
               onclick="PublicPortalModule.selectIndicator('${ind.id}')">
            
            <div class="pub-card-top d-flex align-items-center justify-content-between mb-2">
              <span class="badge-orange-primary font-mono font-bold" style="background: ${cat.badgeColor || '#ea580c'}; color: #fff;">
                ${ind.code}
              </span>
              <span class="pub-status-badge ${status.class}">
                <i data-lucide="${status.icon}" class="icon-xs"></i>
                <span>${pct}% • ${status.label}</span>
              </span>
            </div>

            <h5 class="pub-indicator-title font-bold text-dark mt-1 mb-2">${ind.name}</h5>

            <!-- Wewenang Bidang yang Menangani -->
            <div class="pub-wewenang-box-orange mb-2">
              <i data-lucide="shield-check" class="icon-xs text-orange"></i>
              <span class="small font-bold text-dark">Wewenang:</span>
              <span class="small text-dark fw-semibold ms-1">${ind.wewenangBidang || (bidang ? bidang.name : 'DINPUTARU Demak')}</span>
            </div>

            <!-- Metric Box (Tahun Aktif 2026) -->
            <div class="pub-metric-box-orange">
              <div class="d-flex justify-content-between align-items-center mb-1">
                <span class="small font-bold text-muted">TARGET & REALISASI (${activeYear}):</span>
                <span class="badge bg-white text-orange border-orange small font-mono">${ind.unit}</span>
              </div>
              <div class="row g-2 text-center mt-1">
                <div class="col-6">
                  <div class="p-2 bg-white rounded border">
                    <span class="small text-muted d-block font-mono">Target ${activeYear}</span>
                    <strong class="font-mono fs-6 text-dark">${rec.target} ${ind.unit}</strong>
                  </div>
                </div>
                <div class="col-6">
                  <div class="p-2 bg-orange-subtle rounded border-orange">
                    <span class="small text-orange-dark d-block font-mono font-bold">Realisasi ${activeYear}</span>
                    <strong class="font-mono fs-6 text-orange font-bold">${rec.realisasi !== null && rec.realisasi !== undefined ? rec.realisasi : '-'} ${ind.unit}</strong>
                  </div>
                </div>
              </div>
            </div>

            <!-- Multi-Year Mini Strip (${visibleYears[0]} s/d ${activeYear}) -->
            <div class="pub-card-multiyear-strip mt-2">
              <div class="d-flex justify-content-between align-items-center mb-1">
                <span class="small text-muted font-bold font-mono" style="font-size: 0.72rem;">RIWAYAT PER TAHUN (${visibleYears[0]}-${activeYear}):</span>
              </div>
              <div class="pub-years-mini-grid">
                ${yearsSummaryHtml}
              </div>
            </div>

            <div class="pub-card-cta mt-2 pt-2 border-top">
              <span class="cta-link-orange small font-bold d-flex align-items-center justify-content-between">
                <span>${isSelected ? 'Sedang Ditampilkan di Sorotan Utama' : 'Klik untuk Lihat Grafik Tren & Rincian'}</span>
                <i data-lucide="${isSelected ? 'check-circle' : 'arrow-right'}" class="icon-xs"></i>
              </span>
            </div>
          </div>
        `;
      }).join('');

      html += `
        <section class="pub-segment-section" id="public-segment-section-${cat.id}">
          <div class="pub-segment-header">
            <div class="pub-segment-title-wrap">
              <span class="pub-segment-badge-orange" style="background: ${cat.badgeColor || '#ea580c'};">SEGMEN ${cat.segmentNumber || 1}</span>
              <h3 class="pub-segment-title">${cat.name} (${cat.code})</h3>
            </div>
            <span class="badge badge-orange-subtle font-bold font-mono">${cat.desc || ''}</span>
          </div>
          <div class="pub-indicators-grid" id="public-segment-${cat.id}-container">
            ${cardsHtml}
          </div>
        </section>
      `;
    });

    parentContainer.innerHTML = html;
    if (window.lucide) window.lucide.createIcons();
  },

  selectIndicator(indId) {
    this.selectedPublicIndicatorId = indId;
    this.renderIndicatorSegments();
    this.renderSelectedIndicatorHighlight();

    // Smooth scroll to highlight box
    const highlightBox = document.getElementById('public-indicator-highlight-box');
    if (highlightBox) {
      highlightBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  },

  /* ----------------- RENDER SOROTAN INDIKATOR DENGAN DIAGRAM GARIS ORANYE ----------------- */
  renderSelectedIndicatorHighlight() {
    const box = document.getElementById('public-indicator-highlight-box');
    if (!box) return;

    let ind = window.store.getIndicatorById(this.selectedPublicIndicatorId);
    if (!ind) {
      const allInds = window.store.getIndicators();
      if (allInds.length > 0) {
        ind = allInds[0];
        this.selectedPublicIndicatorId = ind.id;
      }
    }
    if (!ind) {
      box.innerHTML = `<div class="pub-highlight-card-orange p-4 text-center text-muted">Pilih salah satu indikator untuk melihat analisis target dan grafik tren capaian.</div>`;
      return;
    }

    const cat = window.store.getCategories().find(c => c.id === ind.categoryId);
    const bidang = window.store.getBidang().find(b => b.id === ind.bidangId);
    const visibleYears = window.store.getVisibleYears ? window.store.getVisibleYears() : [2020, 2021, 2022, 2023, 2024, 2025, 2026];
    const activeYear = window.store.getActiveYear ? window.store.getActiveYear() : 2026;
    const rec = ind.records?.[activeYear] || { target: 0, realisasi: 0 };
    const pct = window.store.calculateCapaian(rec.target, rec.realisasi, ind.polarization);
    const status = window.store.getStatus(pct);

    box.innerHTML = `
      <div class="pub-highlight-card-orange mb-3">
        
        <!-- Header Sorotan -->
        <div class="pub-hl-header pb-2 mb-2 border-bottom">
          <div class="d-flex flex-wrap align-items-center justify-content-between gap-2">
            <div class="d-flex flex-wrap align-items-center gap-2">
              <span class="badge-orange-primary font-mono font-bold">${ind.code}</span>
              <span class="badge-orange-subtle font-bold">
                Segmen ${cat?.segmentNumber || '-'}: ${cat?.name || '-'}
              </span>
              <span class="badge-adm-slate font-mono">Satuan: ${ind.unit}</span>
            </div>

            <span class="pub-status-badge ${status.class} fs-6 px-3 py-1">
              <i data-lucide="${status.icon}" class="icon-sm"></i>
              <span>Capaian ${activeYear}: ${pct}% (${status.label})</span>
            </span>
          </div>

          <h3 class="pub-hl-title font-bold text-dark mt-2 mb-2">${ind.name}</h3>

          <!-- Kotak Keterangan Wewenang Bidang yang Menangani -->
          <div class="pub-authority-banner-orange p-2 rounded">
            <div class="d-flex flex-wrap align-items-center gap-2">
              <i data-lucide="shield-check" class="icon-sm text-orange"></i>
              <span class="font-bold text-dark">Wewenang Bidang yang Menangani:</span>
              <span class="badge-orange-primary font-bold">${ind.wewenangBidang || (bidang ? bidang.name : 'DINPUTARU Demak')}</span>
              <span class="text-muted small">| Pembina: <strong class="text-dark">${ind.pejabatPenanggungJawab || (bidang ? bidang.head : '-')}</strong></span>
              <span class="text-muted small">| Pelaksana: <em class="text-dark">${ind.seksiPelaksana || (bidang ? bidang.seksi : '-')}</em></span>
            </div>
          </div>
        </div>

        <div class="pub-hl-body">
          <div class="row g-3">
            <!-- Left: Definitions, Formula & Source -->
            <div class="col-lg-6">
              
              <div class="pub-info-box-orange mb-2">
                <h6 class="pub-info-title-orange mb-1">
                  <i data-lucide="book-open" class="icon-xs text-orange"></i> Definisi Operasional Indikator
                </h6>
                <p class="pub-info-desc mb-0 small">${ind.definition || 'Penjelasan teknis indikator tercantum dalam dokumen Renstra DINPUTARU Kab. Demak.'}</p>
              </div>

              <div class="pub-info-box-orange mb-2">
                <h6 class="pub-info-title-orange mb-1">
                  <i data-lucide="calculator" class="icon-xs text-orange"></i> Formulasi Perhitungan Matematis
                </h6>
                <div class="formula-box-render-orange text-start font-mono small py-1 px-2 rounded">
                  ${ind.formula || 'Realisasi Kumulatif / Target Penetapan x 100%'}
                </div>
              </div>

              <div class="pub-info-box-orange">
                <h6 class="pub-info-title-orange mb-1">
                  <i data-lucide="database" class="icon-xs text-orange"></i> Sumber Data Resmi & Verifikasi
                </h6>
                <p class="pub-info-desc mb-1 small">${ind.source || 'Dinas Pekerjaan Umum dan Penataan Ruang Kab. Demak'}</p>
                <span class="small text-muted" style="font-size: 0.75rem;">Diverifikasi melalui survei lapangan dan dokumen SAKIP/LKjIP DINPUTARU Kabupaten Demak.</span>
              </div>

            </div>

            <!-- Right: Interactive Line Chart with Orange Theme (Guaranteed White BG) -->
            <div class="col-lg-6">
              <div class="pub-chart-container-orange">
                <div class="d-flex align-items-center justify-content-between mb-2">
                  <span class="small font-bold text-dark font-mono">
                    <i data-lucide="line-chart" class="icon-xs text-orange"></i> GRAFIK TREN TARGET VS REALISASI
                  </span>
                  <span class="badge bg-white text-orange border-orange font-mono small font-bold">
                    ${visibleYears[0]} - ${activeYear}
                  </span>
                </div>
                
                <div class="chart-canvas-box" style="height: 220px; position: relative; background: #ffffff; border-radius: 8px;">
                  <canvas id="publicIndicatorLineChart" style="background-color: #ffffff !important; display: block; width: 100%; height: 100%;"></canvas>
                </div>
              </div>

              <!-- Multi-year strip table for visible years -->
              <div class="pub-table-wrap-orange mt-2">
                <table class="pub-table-orange table-sm">
                  <thead>
                    <tr>
                      <th class="text-center">Tahun</th>
                      <th class="text-end">Target</th>
                      <th class="text-end">Realisasi</th>
                      <th class="text-center">% Capaian</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${visibleYears.map(yr => {
                      const r = ind.records?.[yr] || { target: 0, realisasi: 0 };
                      const p = window.store.calculateCapaian(r.target, r.realisasi, ind.polarization);
                      const st = window.store.getStatus(p);
                      const isAct = yr === activeYear;
                      return `
                        <tr class="${isAct ? 'row-active-year' : ''}">
                          <td class="text-center font-bold font-mono">
                            ${yr} ${isAct ? '<span class="badge-year-active">Aktif</span>' : ''}
                          </td>
                          <td class="text-end font-mono">${r.target} ${ind.unit}</td>
                          <td class="text-end font-mono font-bold text-orange-dark">${r.realisasi} ${ind.unit}</td>
                          <td class="text-center">
                            <span class="font-mono font-bold ${p >= 100 ? 'text-success' : 'text-orange'}">${p}%</span>
                          </td>
                          <td>
                            <span class="pub-status-pill ${st.class}">${st.label}</span>
                          </td>
                        </tr>
                      `;
                    }).join('')}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>

      </div>
    `;

    if (window.lucide) window.lucide.createIcons();

    // Render Line Chart with Guarantee of No Black Screen
    this.renderPublicChart(ind, visibleYears);
  },

  /* ----------------- RENDER GRAFIK TREN ANTI LAYAR HITAM ----------------- */
  renderPublicChart(ind, visibleYears) {
    const canvas = document.getElementById('publicIndicatorLineChart');
    if (!canvas) return;

    if (this.publicChartInstance) {
      try {
        this.publicChartInstance.destroy();
      } catch (e) {}
      this.publicChartInstance = null;
    }

    const targets = [];
    const realisasi = [];

    visibleYears.forEach(yr => {
      const rec = ind.records?.[yr] || { target: 0, realisasi: 0 };
      targets.push(Number(rec.target) || 0);
      realisasi.push(Number(rec.realisasi) || 0);
    });

    let chartRendered = false;

    // 1. Try rendering with Chart.js
    if (typeof Chart !== 'undefined') {
      try {
        const ctx = canvas.getContext('2d');
        // Explicit white fill
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        this.publicChartInstance = new Chart(ctx, {
          type: 'line',
          data: {
            labels: visibleYears.map(y => `${y}`),
            datasets: [
              {
                label: `Target (${ind.unit})`,
                data: targets,
                borderColor: '#9a3412', // Warm amber-brown
                backgroundColor: 'transparent',
                borderWidth: 2,
                borderDash: [5, 4],
                pointRadius: 4,
                pointBackgroundColor: '#ffffff',
                pointBorderColor: '#9a3412',
                pointBorderWidth: 2,
                fill: false,
                tension: 0.15
              },
              {
                label: `Realisasi (${ind.unit})`,
                data: realisasi,
                borderColor: '#ea580c', // Vibrant Orange
                backgroundColor: 'rgba(234, 88, 12, 0.15)',
                borderWidth: 3,
                pointRadius: 5,
                pointBackgroundColor: '#ea580c',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointHoverRadius: 7,
                fill: true,
                tension: 0.25
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: false,
            plugins: {
              legend: {
                position: 'top',
                labels: {
                  boxWidth: 12,
                  color: '#1e293b',
                  font: { family: "'Plus Jakarta Sans', sans-serif", size: 11, weight: 'bold' }
                }
              },
              tooltip: {
                backgroundColor: '#0f172a',
                titleColor: '#ffffff',
                bodyColor: '#fed7aa',
                titleFont: { family: "'Plus Jakarta Sans', sans-serif", weight: 'bold' },
                bodyFont: { family: "'JetBrains Mono', monospace" }
              }
            },
            scales: {
              x: {
                grid: { color: 'rgba(0,0,0,0.04)' },
                ticks: { color: '#334155', font: { family: "'JetBrains Mono', monospace", weight: 'bold', size: 10 } }
              },
              y: {
                grid: { color: 'rgba(234, 88, 12, 0.08)' },
                ticks: {
                  color: '#334155',
                  font: { family: "'JetBrains Mono', monospace", size: 10 },
                  callback: (val) => `${val}`
                }
              }
            }
          },
          plugins: [{
            id: 'whiteBackground',
            beforeDraw: (chart) => {
              const { ctx, width, height } = chart;
              ctx.save();
              ctx.fillStyle = '#ffffff';
              ctx.fillRect(0, 0, width, height);
              ctx.restore();
            }
          }]
        });

        chartRendered = true;
      } catch (err) {
        console.warn('Chart.js render exception, switching to native canvas fallback:', err);
      }
    }

    // 2. Fallback to Native Canvas Renderer (Zero Dependencies, Always Works)
    if (!chartRendered) {
      this.drawNativeCanvasChart(canvas, ind, visibleYears, targets, realisasi);
    }
  },

  /* ----------------- NATIVE CANVAS CHART FALLBACK ----------------- */
  drawNativeCanvasChart(canvas, ind, visibleYears, targets, realisasi) {
    const parent = canvas.parentElement;
    const width = parent ? parent.clientWidth : 500;
    const height = parent ? parent.clientHeight : 220;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    // 1. Fill Solid White Background (No Black Screen!)
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // 2. Metrics & Plot Geometry
    const paddingLeft = 50;
    const paddingRight = 25;
    const paddingTop = 32;
    const paddingBottom = 35;
    const plotWidth = width - paddingLeft - paddingRight;
    const plotHeight = height - paddingTop - paddingBottom;

    if (plotWidth <= 0 || plotHeight <= 0) return;

    const allVals = [...targets, ...realisasi];
    let minVal = Math.min(...allVals, 0);
    let maxVal = Math.max(...allVals, 10);
    if (minVal === maxVal) { minVal = 0; maxVal = maxVal + 10; }
    const range = maxVal - minVal;

    const getX = (i) => paddingLeft + (i / (visibleYears.length - 1 || 1)) * plotWidth;
    const getY = (val) => paddingTop + plotHeight - ((val - minVal) / range) * plotHeight;

    // 3. Draw Legend at Top
    ctx.font = 'bold 10px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';

    // Target legend item
    ctx.setLineDash([4, 3]);
    ctx.strokeStyle = '#9a3412';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(paddingLeft, 14);
    ctx.lineTo(paddingLeft + 22, 14);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#1e293b';
    ctx.fillText(`Target (${ind.unit})`, paddingLeft + 28, 14);

    // Realisasi legend item
    ctx.strokeStyle = '#ea580c';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(paddingLeft + 140, 14);
    ctx.lineTo(paddingLeft + 162, 14);
    ctx.stroke();
    ctx.fillStyle = '#ea580c';
    ctx.beginPath();
    ctx.arc(paddingLeft + 151, 14, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#1e293b';
    ctx.fillText(`Realisasi (${ind.unit})`, paddingLeft + 168, 14);

    // 4. Horizontal Grid Lines & Y Axis Labels
    const ySteps = 4;
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillStyle = '#64748b';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.strokeStyle = '#f1f5f9';
    ctx.lineWidth = 1;

    for (let i = 0; i <= ySteps; i++) {
      const stepVal = minVal + (range / ySteps) * i;
      const yPos = getY(stepVal);
      ctx.beginPath();
      ctx.moveTo(paddingLeft, yPos);
      ctx.lineTo(paddingLeft + plotWidth, yPos);
      ctx.stroke();
      ctx.fillText(Math.round(stepVal * 10) / 10, paddingLeft - 8, yPos);
    }

    // 5. Area Fill Under Realisasi
    ctx.beginPath();
    visibleYears.forEach((yr, idx) => {
      const x = getX(idx);
      const y = getY(realisasi[idx]);
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.lineTo(getX(visibleYears.length - 1), paddingTop + plotHeight);
    ctx.lineTo(getX(0), paddingTop + plotHeight);
    ctx.closePath();
    ctx.fillStyle = 'rgba(234, 88, 12, 0.12)';
    ctx.fill();

    // 6. Draw Target Line (Dashed)
    ctx.setLineDash([5, 4]);
    ctx.strokeStyle = '#9a3412';
    ctx.lineWidth = 2;
    ctx.beginPath();
    visibleYears.forEach((yr, idx) => {
      const x = getX(idx);
      const y = getY(targets[idx]);
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw Target Points
    visibleYears.forEach((yr, idx) => {
      const x = getX(idx);
      const y = getY(targets[idx]);
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#9a3412';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x, y, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    });

    // 7. Draw Realisasi Line (Solid Bright Orange)
    ctx.strokeStyle = '#ea580c';
    ctx.lineWidth = 3;
    ctx.beginPath();
    visibleYears.forEach((yr, idx) => {
      const x = getX(idx);
      const y = getY(realisasi[idx]);
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Draw Realisasi Points & Value Labels
    visibleYears.forEach((yr, idx) => {
      const x = getX(idx);
      const y = getY(realisasi[idx]);
      ctx.fillStyle = '#ea580c';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Number text
      ctx.font = 'bold 9px "JetBrains Mono", monospace';
      ctx.fillStyle = '#c2410c';
      ctx.textAlign = 'center';
      ctx.fillText(realisasi[idx], x, y - 8);
    });

    // 8. X Axis Labels (Years)
    ctx.font = 'bold 10px "JetBrains Mono", monospace';
    ctx.fillStyle = '#1e293b';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    visibleYears.forEach((yr, idx) => {
      const x = getX(idx);
      ctx.fillText(`${yr}`, x, paddingTop + plotHeight + 8);
    });
  },

  /* ----------------- RENDER MATRIKS MULTI-TAHUN SELURUH INDIKATOR ----------------- */
  renderPublicMatrixTable() {
    const container = document.getElementById('public-matrix-view-section');
    if (!container) return;

    const categories = window.store.getCategories().sort((a, b) => (a.segmentNumber || 9) - (b.segmentNumber || 9));
    const indicators = window.store.getIndicators();
    const visibleYears = window.store.getVisibleYears ? window.store.getVisibleYears() : [2020, 2021, 2022, 2023, 2024, 2025, 2026];
    const activeYear = window.store.getActiveYear ? window.store.getActiveYear() : 2026;

    const displayedCategories = this.selectedCategoryTab === 'all' 
      ? categories 
      : categories.filter(c => c.id === this.selectedCategoryTab);

    container.innerHTML = `
      <div class="pub-matrix-card-orange mb-4">
        
        <div class="pub-matrix-header d-flex flex-wrap align-items-center justify-content-between gap-3 p-3 border-bottom">
          <div>
            <h4 class="font-bold text-dark mb-1">
              <i data-lucide="table-2" class="icon-sm text-orange"></i> Matriks Target & Capaian Kinerja Multi-Tahun
            </h4>
            <p class="text-muted small mb-0">
              Menampilkan Target dan Realisasi di setiap kategori indikator dari tahun <strong>${visibleYears[0]}</strong> sampai tahun aktif <strong>${activeYear}</strong>.
            </p>
          </div>
          <div class="d-flex align-items-center gap-2">
            <span class="badge-orange-primary font-mono font-bold">
              ${visibleYears.length} Tahun Ditampilkan
            </span>
            <span class="badge-adm-slate font-mono">
              Tahun Aktif: ${activeYear}
            </span>
          </div>
        </div>

        ${displayedCategories.map(cat => {
          let catIndicators = indicators.filter(i => i.categoryId === cat.id);
          if (this.publicSearchTerm) {
            catIndicators = catIndicators.filter(i =>
              i.name.toLowerCase().includes(this.publicSearchTerm) ||
              i.code.toLowerCase().includes(this.publicSearchTerm) ||
              (i.wewenangBidang && i.wewenangBidang.toLowerCase().includes(this.publicSearchTerm))
            );
          }

          if (catIndicators.length === 0) return '';

          return `
            <div class="pub-matrix-category-block p-3">
              <div class="d-flex align-items-center justify-content-between mb-2">
                <div class="d-flex align-items-center gap-2">
                  <span class="pub-segment-badge-orange font-mono">SEGMEN ${cat.segmentNumber || '-'}</span>
                  <h5 class="font-bold text-dark mb-0">${cat.name} (${cat.code})</h5>
                </div>
                <span class="small text-muted font-bold">${catIndicators.length} Indikator</span>
              </div>

              <div class="pub-table-wrap-orange">
                <table class="pub-table-orange">
                  <thead>
                    <tr>
                      <th rowspan="2" class="text-center" style="width: 45px;">No</th>
                      <th rowspan="2" style="width: 90px;">Kode</th>
                      <th rowspan="2" style="min-width: 250px;">Nama Indikator & Wewenang Bidang</th>
                      <th rowspan="2" class="text-center" style="width: 75px;">Satuan</th>
                      ${visibleYears.map(yr => `
                        <th colspan="3" class="text-center ${yr === activeYear ? 'th-active-year' : ''}">
                          Tahun ${yr} ${yr === activeYear ? '<span class="badge-pill-active">Aktif</span>' : ''}
                        </th>
                      `).join('')}
                    </tr>
                    <tr>
                      ${visibleYears.map(yr => `
                        <th class="text-end sub-th ${yr === activeYear ? 'th-active-year' : ''}" style="width: 75px;">Target</th>
                        <th class="text-end sub-th ${yr === activeYear ? 'th-active-year' : ''}" style="width: 75px;">Realisasi</th>
                        <th class="text-center sub-th ${yr === activeYear ? 'th-active-year' : ''}" style="width: 75px;">% Capaian</th>
                      `).join('')}
                    </tr>
                  </thead>
                  <tbody>
                    ${catIndicators.map((ind, idx) => {
                      const bidang = window.store.getBidang().find(b => b.id === ind.bidangId);
                      return `
                        <tr>
                          <td class="text-center font-bold font-mono text-muted">${idx + 1}</td>
                          <td class="font-mono font-bold text-orange-dark">${ind.code}</td>
                          <td>
                            <div class="fw-bold text-dark cursor-pointer link-indicator" onclick="PublicPortalModule.selectIndicatorAndSwitch('${ind.id}')">
                              ${ind.name}
                            </div>
                            <div class="small text-muted mt-1 d-flex align-items-center gap-1">
                              <i data-lucide="shield" class="icon-xxs text-orange"></i>
                              <span>${ind.wewenangBidang || (bidang ? bidang.name : 'DINPUTARU Demak')}</span>
                            </div>
                          </td>
                          <td class="text-center font-mono">${ind.unit}</td>
                          ${visibleYears.map(yr => {
                            const rec = ind.records?.[yr] || { target: 0, realisasi: 0 };
                            const pct = window.store.calculateCapaian(rec.target, rec.realisasi, ind.polarization);
                            const isAct = yr === activeYear;
                            return `
                              <td class="text-end font-mono ${isAct ? 'col-active-year' : ''}">${rec.target}</td>
                              <td class="text-end font-mono font-bold text-orange-dark ${isAct ? 'col-active-year' : ''}">${rec.realisasi}</td>
                              <td class="text-center font-mono ${isAct ? 'col-active-year' : ''}">
                                <span class="pub-matrix-status-pill ${pct >= 100 ? 'status-pill-success' : (pct >= 85 ? 'status-pill-info' : 'status-pill-warning')}">
                                  ${pct}%
                                </span>
                              </td>
                            `;
                          }).join('')}
                        </tr>
                      `;
                    }).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          `;
        }).join('')}

      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  },

  selectIndicatorAndSwitch(indId) {
    this.selectedPublicIndicatorId = indId;
    this.switchPubTab('cards');
    this.selectIndicator(indId);
  },

  /* ----------------- RENDER SEGMEN BANK DATA PUBLIK ----------------- */
  renderBankDataSegment() {
    const container = document.getElementById('public-bank-data-list');
    const paginationContainer = document.getElementById('public-bank-data-pagination');
    const infoContainer = document.getElementById('public-bank-data-info');
    if (!container) return;

    const allDocs = window.store.getDocuments ? window.store.getDocuments() : [];

    // Filter by search & bidang
    let filtered = allDocs.filter(doc => {
      if (this.bankDataBidangFilter !== 'all' && doc.bidangId !== this.bankDataBidangFilter) {
        return false;
      }
      if (this.bankDataSearchTerm) {
        const titleMatch = (doc.title || '').toLowerCase().includes(this.bankDataSearchTerm);
        const tagMatch = (doc.tags || []).some(t => t.toLowerCase().includes(this.bankDataSearchTerm));
        const numMatch = (doc.documentNumber || '').toLowerCase().includes(this.bankDataSearchTerm);
        return titleMatch || tagMatch || numMatch;
      }
      return true;
    });

    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / this.bankDataPageSize) || 1;
    if (this.bankDataCurrentPage > totalPages) this.bankDataCurrentPage = totalPages;

    const startIdx = (this.bankDataCurrentPage - 1) * this.bankDataPageSize;
    const endIdx = startIdx + this.bankDataPageSize;
    const pageItems = filtered.slice(startIdx, endIdx);

    if (infoContainer) {
      infoContainer.textContent = `Menampilkan ${totalItems === 0 ? 0 : startIdx + 1} - ${Math.min(endIdx, totalItems)} dari ${totalItems} dokumen publik DINPUTARU Kab. Demak`;
    }

    if (pageItems.length === 0) {
      container.innerHTML = `
        <div class="p-4 bg-white rounded border-orange text-center text-muted">
          <i data-lucide="file-question" class="icon-md text-orange mb-2"></i>
          <p class="mb-0">Tidak ada dokumen bank data yang cocok dengan kriteria pencarian.</p>
        </div>
      `;
      if (paginationContainer) paginationContainer.innerHTML = '';
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    container.innerHTML = `
      <div class="row g-3">
        ${pageItems.map(doc => {
          const bidang = window.store.getBidang().find(b => b.id === doc.bidangId);
          return `
            <div class="col-md-6">
              <div class="pub-doc-card-orange">
                <div class="d-flex align-items-center justify-content-between mb-2">
                  <span class="badge-orange-primary font-mono font-bold">${doc.year || '-'}</span>
                  <span class="badge-adm-slate font-mono">${doc.category || 'Dokumen Resmi'}</span>
                </div>
                <h5 class="pub-doc-title font-bold text-dark mb-1">${doc.title}</h5>
                <p class="small text-muted mb-2 font-mono">No: ${doc.documentNumber || '-'}</p>
                
                <div class="d-flex flex-wrap gap-1 mb-3">
                  ${(doc.tags || []).map(t => `<span class="badge bg-light text-dark border small">${t}</span>`).join('')}
                </div>

                <div class="d-flex align-items-center justify-content-between pt-2 border-top">
                  <span class="small text-muted">${bidang ? bidang.name : 'DINPUTARU Demak'}</span>
                  <button class="pub-btn-orange-outline btn-sm" onclick="App.showToast('Mengunduh berkas: ${doc.title}', 'info')">
                    <i data-lucide="download" class="icon-xs"></i> Unduh Berkas
                  </button>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    // Render Pagination Controls (10 items per page)
    if (paginationContainer) {
      let pagesHtml = '';
      for (let p = 1; p <= totalPages; p++) {
        pagesHtml += `
          <button class="pub-pagination-btn ${p === this.bankDataCurrentPage ? 'active' : ''}" 
                  onclick="PublicPortalModule.goToPage(${p})">
            ${p}
          </button>
        `;
      }

      paginationContainer.innerHTML = `
        <button class="pub-pagination-btn" ${this.bankDataCurrentPage <= 1 ? 'disabled' : ''} 
                onclick="PublicPortalModule.goToPage(${this.bankDataCurrentPage - 1})">
          <i data-lucide="chevron-left" class="icon-xs"></i> Sebelumnya
        </button>
        ${pagesHtml}
        <button class="pub-pagination-btn" ${this.bankDataCurrentPage >= totalPages ? 'disabled' : ''} 
                onclick="PublicPortalModule.goToPage(${this.bankDataCurrentPage + 1})">
          Selanjutnya <i data-lucide="chevron-right" class="icon-xs"></i>
        </button>
      `;
    }

    if (window.lucide) window.lucide.createIcons();
  },

  goToPage(page) {
    this.bankDataCurrentPage = page;
    this.renderBankDataSegment();
    const seg = document.getElementById('segment-bank-data');
    if (seg) seg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
};

window.PublicPortalModule = PublicPortalModule;