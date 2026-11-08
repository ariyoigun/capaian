/**
 * SIDAT - SATUPUTARU - Public Portal Module (v4.0)
 * Dinas Pekerjaan Umum dan Penataan Ruang (DINPUTARU) Kabupaten Demak
 * 
 * Struktur Halaman Publik:
 * 1. Segmen 1: 6 Kotak Kategori Indikator ke Samping (IKU D, IKD, IKU PD, Tujuan Sasaran, Program, IKK)
 * 2. Segmen 2: Capaian Realisasi Tahun N-1 (2025) untuk 55 Indikator (Grid 3 Kotak Tiap Baris)
 * 3. Halaman Kategori Indikator: Daftar Indikator + Dropdown/Expand Grafik Tren & Tabel Multi-Tahun
 * 4. Halaman Bank Data: 6 Kotak Per Bidang + Kartu Data BPS 2025 (2 Kolom)
 */

const PUBLIC_CATEGORIES = [
  {
    id: 'iku_daerah',
    code: 'IKU D',
    name: 'Indikator Kinerja Utama Daerah',
    color: '#1e40af', // Deep Royal Blue PUPR Solid
    colorLight: '#eff6ff',
    border: '#1e3a8a',
    icon: 'award',
    desc: 'Indikator makro strategis prioritas pembangunan Pemerintah Kabupaten Demak yang diampu DINPUTARU'
  },
  {
    id: 'ikd',
    code: 'IKD',
    name: 'Indikator Kinerja Daerah',
    color: '#b45309', // Rich Amber Bronze Solid
    colorLight: '#fffbeb',
    border: '#92400e',
    icon: 'activity',
    desc: 'Indikator penyelenggaraan urusan ke-PU-an dan penataan ruang daerah (RPJMD Kabupaten Demak)'
  },
  {
    id: 'iku_pd',
    code: 'IKU PD',
    name: 'Indikator Kinerja Utama PD',
    color: '#047857', // Deep Emerald Green Solid
    colorLight: '#ecfdf5',
    border: '#065f46',
    icon: 'building-2',
    desc: 'Perjanjian kinerja strategis Kepala DINPUTARU Kabupaten Demak dalam Renstra 2021-2026'
  },
  {
    id: 'tujuan_sasaran',
    code: 'Tujuan Sasaran',
    name: 'Indikator Tujuan Sasaran',
    color: '#c2410c', // Rich Terracotta Coral Solid
    colorLight: '#fff7ed',
    border: '#9a3412',
    icon: 'target',
    desc: 'Indikator capaian tujuan dan sasaran strategis Renstra DINPUTARU Kabupaten Demak'
  },
  {
    id: 'program',
    code: 'Program',
    name: 'Indikator Program',
    color: '#6d28d9', // Deep Violet Purple Solid
    colorLight: '#f5f3ff',
    border: '#5b21b6',
    icon: 'layers',
    desc: 'Indikator hasil (outcome) program prioritas bidang-bidang teknis DINPUTARU Kabupaten Demak'
  },
  {
    id: 'ikk',
    code: 'IKK',
    name: 'Indikator Kinerja Kunci',
    color: '#0369a1', // Deep Ocean Blue Cyan Solid (IKK Terakhir)
    colorLight: '#f0f9ff',
    border: '#075985',
    icon: 'key',
    desc: 'Indikator Evaluasi Penyelenggaraan Pemerintahan Daerah (LPPD) bidang Pekerjaan Umum dan Penataan Ruang'
  }
];

const PUBLIC_BIDANG = [
  { id: 'bina_marga', name: 'Bidang Bina Marga', code: 'BM', icon: 'route', color: '#1d4ed8', desc: 'Penyelenggaraan jalan & jembatan kabupaten' },
  { id: 'sda', name: 'Bidang Sumber Daya Air', code: 'SDA', icon: 'waves', color: '#0284c7', desc: 'Irigasi, saluran drainase & rob pesisir' },
  { id: 'cipta_karya', name: 'Bidang Cipta Karya', code: 'CK', icon: 'droplet', color: '#059669', desc: 'Air minum, sanitasi & gedung bangunan' },
  { id: 'tata_ruang', name: 'Bidang Tata Ruang', code: 'TR', icon: 'map-pin', color: '#d97706', desc: 'RTRW, perizinan KKPR & tata ruang' },
  { id: 'bina_konstruksi', name: 'Bidang Bina Konstruksi', code: 'BK', icon: 'hard-hat', color: '#7c3aed', desc: 'Sertifikasi tenaga kerja & tertib jasa konstruksi' },
  { id: 'sekretariat', name: 'Sekretariat Dinas', code: 'SEKR', icon: 'files', color: '#475569', desc: 'Statistik kependudukan, LKjIP & laboratorium' }
];

const PublicPortalModule = {
  currentView: 'home', // 'home' | 'category' | 'bankdata'
  selectedCategoryId: 'iku_daerah',
  expandedIndicatorIds: new Set(),
  homeSearchTerm: '',
  homeCategoryFilter: 'all',
  bankDataBidangFilter: 'all',
  bankDataCategoryFilter: 'all',
  bankDataSearchTerm: '',
  chartInstances: {},

  init() {
    this.render();
    this.bindEvents();

    // Re-render when store updates
    if (window.store && typeof window.store.subscribe === 'function') {
      window.store.subscribe(() => {
        this.render();
      });
    }
  },

  bindEvents() {
    // URL Hash listener if any
    window.addEventListener('hashchange', () => {
      this.handleHashChange();
    });
    this.handleHashChange();
  },

  handleHashChange() {
    const hash = window.location.hash;
    if (hash === '#bank-data') {
      this.showBankDataView();
    } else if (hash.startsWith('#kategori-')) {
      const catId = hash.replace('#kategori-', '');
      this.showCategoryView(catId);
    }
  },

  /* ========================================================================= */
  /* 1. ROUTING & VIEW SWITCHING                                               */
  /* ========================================================================= */

  showHomeView() {
    this.currentView = 'home';
    window.location.hash = 'beranda';

    const vHome = document.getElementById('pub-view-home');
    const vCat = document.getElementById('pub-view-category');
    const vBd = document.getElementById('pub-view-bankdata');

    if (vHome) vHome.style.display = 'block';
    if (vCat) vCat.style.display = 'none';
    if (vBd) vBd.style.display = 'none';

    // Update Topbar Nav Buttons
    const btnHome = document.getElementById('btn-pub-nav-home');
    const btnBd = document.getElementById('btn-pub-nav-bankdata');
    if (btnHome) btnHome.classList.add('active');
    if (btnBd) btnBd.classList.remove('active');

    this.renderHome();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.lucide) window.lucide.createIcons();
  },

  showCategoryView(categoryId, indicatorIdToExpand) {
    this.currentView = 'category';
    this.selectedCategoryId = categoryId || 'iku_daerah';
    window.location.hash = 'kategori-' + this.selectedCategoryId;

    if (indicatorIdToExpand) {
      this.expandedIndicatorIds.add(indicatorIdToExpand);
    }

    const vHome = document.getElementById('pub-view-home');
    const vCat = document.getElementById('pub-view-category');
    const vBd = document.getElementById('pub-view-bankdata');

    if (vHome) vHome.style.display = 'none';
    if (vCat) vCat.style.display = 'block';
    if (vBd) vBd.style.display = 'none';

    // Topbar Nav Buttons
    const btnHome = document.getElementById('btn-pub-nav-home');
    const btnBd = document.getElementById('btn-pub-nav-bankdata');
    if (btnHome) btnHome.classList.remove('active');
    if (btnBd) btnBd.classList.remove('active');

    this.renderCategoryView(indicatorIdToExpand);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (indicatorIdToExpand) {
      setTimeout(() => {
        const targetEl = document.getElementById('accordion-ind-' + indicatorIdToExpand);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 250);
    }

    if (window.lucide) window.lucide.createIcons();
  },

  showBankDataView(bidangId) {
    this.currentView = 'bankdata';
    if (bidangId) {
      this.bankDataBidangFilter = bidangId;
    }
    window.location.hash = 'bank-data';

    const vHome = document.getElementById('pub-view-home');
    const vCat = document.getElementById('pub-view-category');
    const vBd = document.getElementById('pub-view-bankdata');

    if (vHome) vHome.style.display = 'none';
    if (vCat) vCat.style.display = 'none';
    if (vBd) vBd.style.display = 'block';

    // Update Topbar Nav Buttons
    const btnHome = document.getElementById('btn-pub-nav-home');
    const btnBd = document.getElementById('btn-pub-nav-bankdata');
    if (btnHome) btnHome.classList.remove('active');
    if (btnBd) btnBd.classList.add('active');

    this.renderBankData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.lucide) window.lucide.createIcons();
  },

  // Backward compatibility method
  switchPubTab(tab) {
    if (tab === 'bankdata') {
      this.showBankDataView();
    } else {
      this.showHomeView();
    }
  },

  render() {
    if (this.currentView === 'home') {
      this.renderHome();
    } else if (this.currentView === 'category') {
      this.renderCategoryView();
    } else if (this.currentView === 'bankdata') {
      this.renderBankData();
    }
  },

  /* ========================================================================= */
  /* 2. RENDER BERANDA PUBLIK (HOME VIEW)                                      */
  /* ========================================================================= */

  renderHome() {
    this.renderCategoryBoxes();
    this.renderHomeQuickFilters();
    this.renderIndicatorCardsGrid();
  },

  /* SEGMEN 1: 6 KOTAK KATEGORI KE SAMPING */
  renderCategoryBoxes() {
    const container = document.getElementById('pub-category-cards-grid');
    if (!container) return;

    const indicators = window.store.getIndicators();

    const html = PUBLIC_CATEGORIES.map(cat => {
      const catIndicators = indicators.filter(i => i.categoryId === cat.id);
      const count = catIndicators.length;

      return `
        <div class="col">
          <div class="pub-category-box" 
               style="--cat-color: ${cat.color}; --cat-bg: ${cat.colorLight}; --cat-border: ${cat.border};"
               onclick="PublicPortalModule.showCategoryView('${cat.id}')"
               title="Buka daftar indikator kategori ${cat.name}">
            
            <div class="pub-cat-box-header">
              <span class="pub-cat-icon-wrap" style="background: ${cat.color};">
                <i data-lucide="${cat.icon}" class="icon-sm text-white"></i>
              </span>
              <span class="pub-cat-count-badge font-mono font-bold" style="color: ${cat.color}; background: ${cat.colorLight};">
                ${count} Indikator
              </span>
            </div>

            <div class="pub-cat-box-body">
              <h3 class="pub-cat-title-big" style="color: ${cat.color};">
                ${cat.code}
              </h3>
              <p class="pub-cat-fullname">
                ${cat.name}
              </p>
            </div>

            <div class="pub-cat-box-footer">
              <span class="pub-cat-cta-link" style="color: ${cat.color};">
                <span>Lihat Indikator</span>
                <i data-lucide="arrow-right" class="icon-xs"></i>
              </span>
            </div>

          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = html;
  },

  /* Toolbar Filter Cepat Kategori di Segmen 2 */
  renderHomeQuickFilters() {
    const filterContainer = document.getElementById('pub-home-category-filters');
    if (!filterContainer) return;

    const indicators = window.store.getIndicators();
    const totalAll = indicators.length;

    let html = `
      <button class="pub-quick-filter-btn ${this.homeCategoryFilter === 'all' ? 'active' : ''}" 
              onclick="PublicPortalModule.setHomeCategoryFilter('all')">
        <span>Semua Kategori</span>
        <span class="pqf-count font-mono">${totalAll}</span>
      </button>
    `;

    PUBLIC_CATEGORIES.forEach(cat => {
      const count = indicators.filter(i => i.categoryId === cat.id).length;
      const isActive = this.homeCategoryFilter === cat.id;

      html += `
        <button class="pub-quick-filter-btn ${isActive ? 'active' : ''}" 
                style="${isActive ? `background: ${cat.color}; border-color: ${cat.color}; color: #ffffff;` : ''}"
                onclick="PublicPortalModule.setHomeCategoryFilter('${cat.id}')">
          <span style="${!isActive ? `color: ${cat.color}; font-weight: 700;` : ''}">${cat.code}</span>
          <span class="pqf-count font-mono">${count}</span>
        </button>
      `;
    });

    filterContainer.innerHTML = html;
  },

  setHomeCategoryFilter(catId) {
    this.homeCategoryFilter = catId;
    this.renderHomeQuickFilters();
    this.renderIndicatorCardsGrid();
  },

  onHomeSearchInput(val) {
    this.homeSearchTerm = (val || '').toLowerCase().trim();
    const clearBtn = document.getElementById('btn-clear-home-search');
    if (clearBtn) {
      clearBtn.style.display = this.homeSearchTerm ? 'inline-block' : 'none';
    }
    this.renderIndicatorCardsGrid();
  },

  clearHomeSearch() {
    const input = document.getElementById('pub-home-search-input');
    if (input) input.value = '';
    this.onHomeSearchInput('');
  },

  /* SEGMEN 2: 55 KOTAK REALISASI TAHUN 2025 (GRID 3 KOTAK TIAP BARIS: col-lg-4 col-md-6 col-12) */
  renderIndicatorCardsGrid() {
    const container = document.getElementById('pub-indicator-grid-container');
    if (!container) return;

    const indicators = window.store.getIndicators();
    const bidangList = window.store.getBidang();

    // Filter by search & category
    let filtered = indicators.filter(ind => {
      if (this.homeCategoryFilter !== 'all' && ind.categoryId !== this.homeCategoryFilter) {
        return false;
      }
      if (this.homeSearchTerm) {
        const matchName = (ind.name || '').toLowerCase().includes(this.homeSearchTerm);
        const matchCode = (ind.code || '').toLowerCase().includes(this.homeSearchTerm);
        const matchDef = (ind.definition || '').toLowerCase().includes(this.homeSearchTerm);
        const matchBid = (ind.wewenangBidang || '').toLowerCase().includes(this.homeSearchTerm);
        if (!matchName && !matchCode && !matchDef && !matchBid) return false;
      }
      return true;
    });

    // URUTAN INDIKATOR PERSIS SAMA DENGAN SEGMEN 1 (IKU D -> IKD -> IKU PD -> Tujuan Sasaran -> Program -> IKK terakhir)
    const categorySortOrder = {
      'iku_daerah': 1,
      'ikd': 2,
      'iku_pd': 3,
      'tujuan_sasaran': 4,
      'program': 5,
      'ikk': 6
    };

    filtered.sort((a, b) => {
      const orderA = categorySortOrder[a.categoryId] || 99;
      const orderB = categorySortOrder[b.categoryId] || 99;
      if (orderA !== orderB) {
        return orderA - orderB;
      }
      // Urutkan nomor urut di dalam kategori yang sama
      const numA = parseInt((a.code || '').replace(/\D/g, '') || '0', 10);
      const numB = parseInt((b.code || '').replace(/\D/g, '') || '0', 10);
      if (numA !== numB) {
        return numA - numB;
      }
      return (a.code || '').localeCompare(b.code || '');
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="col-12">
          <div class="pub-empty-card text-center p-5 bg-white rounded-3 border">
            <i data-lucide="search-x" class="text-muted mb-2" style="width:48px;height:48px;"></i>
            <h4 class="font-bold text-dark">Indikator Tidak Ditemukan</h4>
            <p class="text-muted small">Tidak ada indikator yang sesuai dengan kata kunci "${this.homeSearchTerm}".</p>
            <button class="btn btn-sm btn-outline-primary" onclick="PublicPortalModule.clearHomeSearch()">Reset Pencarian</button>
          </div>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    const html = filtered.map(ind => {
      const cat = PUBLIC_CATEGORIES.find(c => c.id === ind.categoryId) || {
        code: ind.categoryId?.toUpperCase() || 'INDIKATOR',
        name: 'Indikator',
        color: '#1d4ed8',
        colorLight: '#eff6ff',
        border: '#3b82f6'
      };

      const bidang = bidangList.find(b => b.id === ind.bidangId);
      const wewenang = ind.wewenangBidang || (bidang ? bidang.name : 'DINPUTARU Demak');

      // Realisasi Tahun N-1 (2025)
      const rec2025 = ind.records?.['2025'] || { target: 0, realisasi: 0 };
      const targetVal = rec2025.target !== undefined && rec2025.target !== null ? rec2025.target : 0;
      const realisasiVal = rec2025.realisasi !== undefined && rec2025.realisasi !== null ? rec2025.realisasi : '-';
      
      const pct = window.store.calculateCapaian(targetVal, realisasiVal, ind.polarization);
      const status = window.store.getStatus(pct, ind.polarization);

      // Format Angka Realisasi Besar
      let displayRealVal = realisasiVal;
      if (typeof realisasiVal === 'number') {
        displayRealVal = realisasiVal.toLocaleString('id-ID', { maximumFractionDigits: 3 });
      }

      return `
        <div class="col-lg-4 col-md-6 col-12">
          <div class="pub-realisasi-card" 
               style="--card-cat-color: ${cat.color}; --card-cat-light: ${cat.colorLight};"
               onclick="PublicPortalModule.showCategoryView('${ind.categoryId}', '${ind.id}')">
            
            <!-- Header Kartu: Singkatan Kategori & Kode Indikator -->
            <div class="pub-rc-header d-flex align-items-center justify-content-between mb-2">
              <span class="pub-rc-cat-badge" style="background: ${cat.color}; color: #ffffff;">
                ${cat.code}
              </span>
              <span class="pub-rc-code-badge font-mono">
                ${ind.code}
              </span>
            </div>

            <!-- Nama Indikator (Teks Jelas & Rapi) -->
            <h4 class="pub-rc-title" title="${ind.name}">
              ${ind.name}
            </h4>

            <!-- Wewenang Bidang Pengampu -->
            <div class="pub-rc-bidang mb-2">
              <i data-lucide="building-2" class="icon-xs" style="color: ${cat.color};"></i>
              <span class="text-truncate">${wewenang}</span>
            </div>

            <!-- KOTAK REALISASI TAHUN 2025 (N-1) DENGAN ANGKA BESAR -->
            <div class="pub-rc-metric-box">
              <div class="pub-rc-metric-label">
                <i data-lucide="calendar" class="icon-xs"></i> REALISASI TAHUN 2025 (N-1)
              </div>
              <div class="pub-rc-metric-value-wrap">
                <span class="pub-rc-metric-number font-mono" style="color: ${cat.color};">
                  ${displayRealVal}
                </span>
                <span class="pub-rc-metric-unit font-mono" style="color: ${cat.color};">
                  ${ind.unit}
                </span>
              </div>
              
              <!-- Ringkasan Target & Capaian 2025 -->
              <div class="pub-rc-metric-summary d-flex align-items-center justify-content-between flex-wrap gap-1 mt-1">
                <span class="small text-muted font-mono">
                  Target: <strong>${targetVal} ${ind.unit}</strong>
                </span>
                <span class="pub-rc-status-pill ${status.class}">
                  <i data-lucide="${status.icon}" class="icon-xs"></i>
                  <span>${pct}% • ${status.label}</span>
                </span>
              </div>
            </div>

            <!-- Footer Kartu: Link Langsung ke Halaman Kategori Indikator -->
            <div class="pub-rc-footer mt-3 pt-2 border-top d-flex align-items-center justify-content-between">
              <span class="pub-rc-link-text" style="color: ${cat.color};">
                Lihat Grafik Tren & Rincian
              </span>
              <span class="pub-rc-link-arrow" style="background: ${cat.colorLight}; color: ${cat.color};">
                <i data-lucide="arrow-right" class="icon-xs"></i>
              </span>
            </div>

          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = html;
    if (window.lucide) window.lucide.createIcons();
  },

  /* ========================================================================= */
  /* 3. RENDER HALAMAN KATEGORI INDIKATOR (CATEGORY VIEW)                      */
  /* ========================================================================= */

  renderCategoryView(indicatorIdToExpand) {
    this.renderCategoryNavTabs();
    this.renderCategoryDetailHeader();
    this.renderCategoryIndicatorsAccordion(indicatorIdToExpand);
  },

  renderCategoryNavTabs() {
    const container = document.getElementById('pub-cat-view-nav-tabs');
    if (!container) return;

    const indicators = window.store.getIndicators();

    const html = PUBLIC_CATEGORIES.map(cat => {
      const count = indicators.filter(i => i.categoryId === cat.id).length;
      const isActive = this.selectedCategoryId === cat.id;

      return `
        <button class="pub-cat-tab-btn ${isActive ? 'active' : ''}" 
                style="${isActive ? `background: ${cat.color}; border-color: ${cat.color}; color: #ffffff;` : ''}"
                onclick="PublicPortalModule.showCategoryView('${cat.id}')">
          <span style="${!isActive ? `color: ${cat.color}; font-weight: 700;` : ''}">${cat.code}</span>
          <span class="pub-tab-badge font-mono">${count}</span>
        </button>
      `;
    }).join('');

    container.innerHTML = html;
  },

  renderCategoryDetailHeader() {
    const container = document.getElementById('pub-category-detail-header-card');
    if (!container) return;

    const cat = PUBLIC_CATEGORIES.find(c => c.id === this.selectedCategoryId) || PUBLIC_CATEGORIES[0];
    const indicators = window.store.getIndicators().filter(i => i.categoryId === cat.id);

    container.style.borderLeft = `6px solid ${cat.color}`;
    container.style.background = `linear-gradient(135deg, ${cat.colorLight} 0%, #ffffff 100%)`;

    container.innerHTML = `
      <div class="d-flex align-items-center justify-content-between flex-wrap gap-3">
        <div>
          <div class="d-flex align-items-center gap-2 mb-2">
            <span class="badge" style="background: ${cat.color}; color: #ffffff; font-size: 0.85rem; padding: 6px 14px;">
              ${cat.code}
            </span>
            <span class="badge bg-white text-dark border font-mono font-bold" style="font-size: 0.82rem;">
              ${indicators.length} Indikator Kinerja
            </span>
          </div>
          <h2 class="font-bold text-dark mb-1" style="font-size: 1.45rem;">
            ${cat.name}
          </h2>
          <p class="text-muted mb-0 small" style="max-width: 850px; line-height: 1.5;">
            ${cat.desc}
          </p>
        </div>
        <div>
          <span class="pub-header-icon-circle" style="background: ${cat.color}; color: #ffffff;">
            <i data-lucide="${cat.icon}" class="icon-lg"></i>
          </span>
        </div>
      </div>
    `;
  },

  renderCategoryIndicatorsAccordion(indicatorIdToExpand) {
    const container = document.getElementById('pub-category-indicators-accordion');
    if (!container) return;

    const indicators = window.store.getIndicators().filter(i => i.categoryId === this.selectedCategoryId);
    const cat = PUBLIC_CATEGORIES.find(c => c.id === this.selectedCategoryId) || PUBLIC_CATEGORIES[0];
    const visibleYears = window.store.getVisibleYears ? window.store.getVisibleYears() : [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];

    if (indicators.length === 0) {
      container.innerHTML = `
        <div class="text-center p-5 bg-white rounded-3 border">
          <i data-lucide="file-x" class="text-muted mb-2" style="width:40px;height:40px;"></i>
          <h5 class="text-dark">Tidak Ada Indikator</h5>
          <p class="text-muted small">Belum ada indikator yang terdaftar dalam kategori ini.</p>
        </div>
      `;
      return;
    }

    const html = indicators.map((ind, idx) => {
      const isExpanded = this.expandedIndicatorIds.has(ind.id);
      const rec2025 = ind.records?.['2025'] || { target: 0, realisasi: 0 };
      const pct2025 = window.store.calculateCapaian(rec2025.target, rec2025.realisasi, ind.polarization);
      const status2025 = window.store.getStatus(pct2025, ind.polarization);

      // Build Multi-Year Table Rows
      const tableRows = visibleYears.map(yr => {
        const rec = ind.records?.[yr] || { target: 0, realisasi: 0, notes: '' };
        const pct = window.store.calculateCapaian(rec.target, rec.realisasi, ind.polarization);
        const st = window.store.getStatus(pct, ind.polarization);
        const isCurrent = yr === 2025;

        return `
          <tr class="${isCurrent ? 'table-warning-subtle font-bold' : ''}">
            <td class="text-center ${isCurrent ? 'text-primary' : ''}">
              ${yr} ${isCurrent ? '<span class="badge bg-primary text-white" style="font-size:0.65rem;">N-1</span>' : ''}
            </td>
            <td class="text-end">${rec.target !== null && rec.target !== undefined ? rec.target : '-'} ${ind.unit}</td>
            <td class="text-end font-bold ${isCurrent ? 'text-primary' : ''}">
              ${rec.realisasi !== null && rec.realisasi !== undefined ? rec.realisasi : '-'} ${ind.unit}
            </td>
            <td class="text-center">
              <span class="pub-pct-badge ${st.class}">${pct}%</span>
            </td>
            <td>
              <span class="badge ${st.class} small" style="font-size: 0.72rem;">
                <i data-lucide="${st.icon}" class="icon-xs"></i> ${st.label}
              </span>
            </td>
            <td class="small text-muted">${rec.notes || '-'}</td>
          </tr>
        `;
      }).join('');

      return `
        <div class="pub-accordion-item mb-3 ${isExpanded ? 'is-expanded' : ''}" id="accordion-ind-${ind.id}">
          
          <!-- Accordion Header (Baris Indikator yang bisa diklik) -->
          <div class="pub-accordion-header" onclick="PublicPortalModule.toggleIndicatorAccordion('${ind.id}')">
            <div class="d-flex align-items-center gap-3 flex-grow-1">
              <span class="pub-acc-number font-mono">${idx + 1}</span>
              <div class="flex-grow-1">
                <div class="d-flex align-items-center gap-2 mb-1 flex-wrap">
                  <span class="badge font-mono" style="background: ${cat.color}; color: #fff;">${ind.code}</span>
                  <span class="badge bg-light text-dark border small font-mono">Satuan: ${ind.unit}</span>
                  <span class="small text-muted"><i data-lucide="shield-check" class="icon-xs text-primary"></i> ${ind.wewenangBidang || 'DINPUTARU Demak'}</span>
                </div>
                <h4 class="pub-acc-title font-bold text-dark mb-0">
                  ${ind.name}
                </h4>
              </div>
            </div>

            <!-- Kanan: Preview Realisasi 2025 & Chevron -->
            <div class="d-flex align-items-center gap-3 ms-2">
              <div class="pub-acc-metric-preview text-end d-none d-sm-block">
                <span class="text-muted small d-block font-mono" style="font-size:0.7rem;">Realisasi 2025:</span>
                <strong class="font-mono fs-6" style="color: ${cat.color};">${rec2025.realisasi} ${ind.unit}</strong>
              </div>
              <span class="pub-acc-chevron ${isExpanded ? 'rotated' : ''}">
                <i data-lucide="chevron-down" class="icon-sm"></i>
              </span>
            </div>
          </div>

          <!-- Accordion Body (Dropdown Expand: Grafik & Tabel Multi-Tahun) -->
          <div class="pub-accordion-body" style="display: ${isExpanded ? 'block' : 'none'};">
            
            <!-- 1. GRAFIK TREN MULTI-TAHUN (TARGET VS REALISASI) -->
            <div class="pub-chart-section mb-4 p-3 bg-white rounded-3 border">
              <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3 pb-2 border-bottom">
                <div>
                  <h5 class="font-bold text-dark mb-0 d-flex align-items-center gap-2">
                    <i data-lucide="line-chart" class="icon-sm" style="color: ${cat.color};"></i>
                    Grafik Tren Perkembangan Capaian (2020 – 2030)
                  </h5>
                  <span class="small text-muted">Perbandingan Target Penetapan Renstra vs Realisasi Capaian Lapangan</span>
                </div>
                <div class="d-flex align-items-center gap-2">
                  <span class="badge bg-light text-dark border font-mono">Satuan: ${ind.unit}</span>
                  <span class="badge bg-light text-dark border font-mono">Polaritas: ${ind.polarization === 'minimize' ? 'Minimalkan (Makin kecil makin baik)' : 'Maksimalkan (Makin besar makin baik)'}</span>
                </div>
              </div>

              <!-- Canvas Grafik Chart.js -->
              <div class="pub-chart-canvas-wrap" style="position: relative; height: 260px; width: 100%;">
                <canvas id="chart-ind-${ind.id}"></canvas>
              </div>
            </div>

            <!-- 2. TABEL MULTI-TAHUN: TARGET, REALISASI, % CAPAIAN, STATUS -->
            <div class="pub-table-section mb-4">
              <h5 class="font-bold text-dark mb-2 d-flex align-items-center gap-2">
                <i data-lucide="table" class="icon-sm text-primary"></i>
                Tabel Evaluasi Target dan Realisasi Multi-Tahun
              </h5>
              <div class="table-responsive bg-white rounded-3 border">
                <table class="table table-sm table-hover align-middle mb-0 pub-eval-table">
                  <thead class="table-light">
                    <tr>
                      <th class="text-center font-bold" style="width: 100px;">Tahun</th>
                      <th class="text-end font-bold" style="width: 140px;">Target</th>
                      <th class="text-end font-bold" style="width: 140px;">Realisasi</th>
                      <th class="text-center font-bold" style="width: 120px;">% Capaian</th>
                      <th class="font-bold" style="width: 160px;">Status Capaian</th>
                      <th class="font-bold">Keterangan / Dasar Dokumen</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${tableRows}
                  </tbody>
                </table>
              </div>
            </div>

            <!-- 3. DETAIL DEFINISI OPERASIONAL & FORMULASI TEKNIS (STANDAR UKURAN & 1 FONT SAMA) -->
            <div class="pub-meta-section p-3 rounded-3" style="background: #f8fafc; border: 1px solid #e2e8f0;">
              <h6 class="font-bold text-dark mb-3 d-flex align-items-center gap-2" style="font-size: 0.95rem;">
                <i data-lucide="info" class="icon-xs text-primary"></i> Parameter Teknis & Metodologi Perhitungan
              </h6>
              <div class="row g-3">
                <div class="col-md-6">
                  <div class="pub-meta-label">Definisi Operasional:</div>
                  <div class="pub-meta-desc">${ind.definition || 'Tercantum dalam dokumen Renstra DINPUTARU Kabupaten Demak.'}</div>
                </div>
                <div class="col-md-6">
                  <div class="pub-meta-label">Formulasi / Rumus Matematis:</div>
                  <div class="pub-meta-desc">${ind.formula || 'Realisasi / Target x 100%'}</div>
                </div>
                <div class="col-md-6">
                  <div class="pub-meta-label">Sumber Data Resmi:</div>
                  <div class="pub-meta-desc">${ind.source || 'Bidang Teknis DINPUTARU Kab. Demak'}</div>
                </div>
                <div class="col-md-6">
                  <div class="pub-meta-label">Seksi Penanggung Jawab:</div>
                  <div class="pub-meta-desc">${ind.seksiPelaksana || ind.wewenangBidang || 'DINPUTARU Demak'}</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = html;

    // Render charts for all expanded items
    indicators.forEach(ind => {
      if (this.expandedIndicatorIds.has(ind.id)) {
        setTimeout(() => {
          this.renderIndicatorChart(ind);
        }, 50);
      }
    });

    if (window.lucide) window.lucide.createIcons();
  },

  toggleIndicatorAccordion(indId) {
    if (this.expandedIndicatorIds.has(indId)) {
      this.expandedIndicatorIds.delete(indId);
      if (this.chartInstances[indId]) {
        this.chartInstances[indId].destroy();
        delete this.chartInstances[indId];
      }
    } else {
      this.expandedIndicatorIds.add(indId);
    }
    this.renderCategoryIndicatorsAccordion();
  },

  renderIndicatorChart(indicator) {
    const canvasId = 'chart-ind-' + indicator.id;
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    if (this.chartInstances[indicator.id]) {
      this.chartInstances[indicator.id].destroy();
      delete this.chartInstances[indicator.id];
    }

    const cat = PUBLIC_CATEGORIES.find(c => c.id === indicator.categoryId) || { color: '#1d4ed8' };
    const visibleYears = window.store.getVisibleYears ? window.store.getVisibleYears() : [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];

    const labels = visibleYears.map(String);
    const targetData = visibleYears.map(yr => {
      const rec = indicator.records?.[yr];
      return rec ? rec.target : null;
    });
    const realisasiData = visibleYears.map(yr => {
      const rec = indicator.records?.[yr];
      if (!rec || rec.realisasi === undefined || rec.realisasi === null) return null;
      // If future years have 0, can keep or show
      return rec.realisasi;
    });

    if (typeof Chart === 'undefined') {
      console.warn('Chart.js is not loaded.');
      return;
    }

    const ctx = canvas.getContext('2d');
    this.chartInstances[indicator.id] = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Target (' + indicator.unit + ')',
            data: targetData,
            borderColor: '#64748b',
            backgroundColor: 'transparent',
            borderDash: [5, 5],
            borderWidth: 2,
            pointBackgroundColor: '#64748b',
            pointRadius: 4,
            tension: 0.2
          },
          {
            label: 'Realisasi (' + indicator.unit + ')',
            data: realisasiData,
            borderColor: cat.color,
            backgroundColor: cat.color + '15',
            borderWidth: 3,
            pointBackgroundColor: cat.color,
            pointRadius: 6,
            pointHoverRadius: 8,
            fill: true,
            tension: 0.3
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              boxWidth: 14,
              font: { weight: 'bold', size: 12 }
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': ' + context.parsed.y + ' ' + indicator.unit;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            grid: { color: 'rgba(0,0,0,0.06)' },
            ticks: {
              font: { family: 'monospace' },
              callback: function(value) {
                return value + ' ' + indicator.unit;
              }
            }
          },
          x: {
            grid: { display: false },
            ticks: { font: { family: 'monospace', weight: 'bold' } }
          }
        }
      }
    });
  },

  /* ========================================================================= */
  /* 4. RENDER HALAMAN BANK DATA (BANK DATA PER BIDANG)                        */
  /* ========================================================================= */

  renderBankData() {
    this.renderBankDataBidangBoxes();
    this.renderBankDataCards();
  },

  /* 6 KOTAK PER BIDANG DI DINPUTARU DEMAK */
  renderBankDataBidangBoxes() {
    const container = document.getElementById('pub-bankdata-bidang-grid');
    if (!container) return;

    const allDocs = window.store.getDocuments ? window.store.getDocuments() : [];

    const html = PUBLIC_BIDANG.map(b => {
      const docsInBidang = allDocs.filter(d => d.bidangId === b.id);
      const count = docsInBidang.length;
      const isActive = this.bankDataBidangFilter === b.id;

      return `
        <div class="col">
          <div class="pub-bidang-box ${isActive ? 'active' : ''}" 
               style="--bidang-color: ${b.color};"
               onclick="PublicPortalModule.setBankDataBidang('${b.id}')">
            
            <div class="pub-bb-top d-flex align-items-center justify-content-between mb-2">
              <span class="pub-bb-icon" style="background: ${b.color}; color: #ffffff;">
                <i data-lucide="${b.icon}" class="icon-sm"></i>
              </span>
              <span class="pub-bb-count font-mono font-bold">
                ${count} Data
              </span>
            </div>

            <h4 class="pub-bb-title font-bold text-dark mb-1">
              ${b.name}
            </h4>
            <p class="pub-bb-desc text-muted mb-0 small" style="font-size: 0.72rem; line-height: 1.35;">
              ${b.desc}
            </p>

            <div class="pub-bb-footer mt-2 pt-2 border-top">
              <span class="pub-bb-status-label small font-bold" style="color: ${b.color}; font-size: 0.75rem;">
                ${isActive ? '✓ Sedang Dipilih' : 'Klik untuk Membuka'}
              </span>
            </div>

          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = html;
  },

  setBankDataBidang(bidangId) {
    if (this.bankDataBidangFilter === bidangId) {
      // Toggle off to all
      this.bankDataBidangFilter = 'all';
    } else {
      this.bankDataBidangFilter = bidangId;
    }
    this.renderBankDataBidangBoxes();
    this.renderBankDataCards();
  },

  onBankDataSearchInput(val) {
    this.bankDataSearchTerm = (val || '').toLowerCase().trim();
    this.renderBankDataCards();
  },

  onBankDataCategorySelect(val) {
    this.bankDataCategoryFilter = val || 'all';
    this.renderBankDataCards();
  },

  /* KONTEN KARTU BANK DATA (2 KOLOM LAYOUT) */
  renderBankDataCards() {
    const container = document.getElementById('pub-bankdata-cards-container');
    if (!container) return;

    const allDocs = window.store.getDocuments ? window.store.getDocuments() : [];
    const bidangList = window.store.getBidang ? window.store.getBidang() : [];

    const filtered = allDocs.filter(doc => {
      if (this.bankDataBidangFilter !== 'all' && doc.bidangId !== this.bankDataBidangFilter) {
        return false;
      }
      if (this.bankDataCategoryFilter !== 'all' && doc.category !== this.bankDataCategoryFilter) {
        return false;
      }
      if (this.bankDataSearchTerm) {
        const matchTitle = (doc.title || '').toLowerCase().includes(this.bankDataSearchTerm);
        const matchDesc = (doc.desc || '').toLowerCase().includes(this.bankDataSearchTerm);
        const matchSource = (doc.source || '').toLowerCase().includes(this.bankDataSearchTerm);
        const matchMetric = (doc.metricValue || '').toLowerCase().includes(this.bankDataSearchTerm);
        const matchTag = (doc.tags || []).some(t => t.toLowerCase().includes(this.bankDataSearchTerm));
        if (!matchTitle && !matchDesc && !matchSource && !matchMetric && !matchTag) return false;
      }
      return true;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="col-12">
          <div class="text-center p-5 bg-white rounded-3 border">
            <i data-lucide="folder-x" class="text-muted mb-2" style="width:48px;height:48px;"></i>
            <h4 class="font-bold text-dark">Data Tidak Ditemukan</h4>
            <p class="text-muted small">Tidak ada data Bank Data yang sesuai dengan filter bidang atau pencarian saat ini.</p>
            <button class="btn btn-sm btn-outline-primary" onclick="PublicPortalModule.setBankDataBidang('all')">
              Tampilkan Semua Bidang
            </button>
          </div>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    const html = filtered.map(doc => {
      const bidang = bidangList.find(b => b.id === doc.bidangId) || { name: 'DINPUTARU Demak' };
      const isBps = doc.category === 'Statistik BPS 2025';

      return `
        <div class="pub-bankdata-table-item">
          <div class="pub-bankdata-table-card">
            
            <!-- Header Kartu: Judul Dokumen / Dataset & Kategori -->
            <div class="pub-bdt-card-header">
              <div class="d-flex align-items-center justify-content-between gap-2 mb-2 flex-wrap">
                <span class="badge ${isBps ? 'bg-amber text-dark font-bold' : 'bg-primary text-white'}">
                  <i data-lucide="database" class="icon-xs"></i> ${doc.category}
                </span>
                <span class="badge bg-secondary text-white">
                  <i data-lucide="calendar" class="icon-xs"></i> Tahun ${doc.year}
                </span>
              </div>
              <h5 class="pub-bdt-card-title" onclick="App.openDocumentPreview('${doc.id}')" title="Klik untuk pratinjau dokumen">
                ${doc.title}
              </h5>
            </div>

            <!-- Tabel Data 2-Kolom Terstruktur & Rapi (2 Tabel per Baris Layout) -->
            <table class="table table-sm pub-bdt-table mb-0">
              <tbody>
                <tr class="bdt-row-highlight">
                  <th scope="row" style="width: 38%;">Indikator / Data Kunci</th>
                  <td>
                    <div class="bdt-metric-value">${doc.metricValue || '-'}</div>
                    <div class="bdt-metric-label">${doc.metricLabel || 'Nilai Capaian / Data Statistik'}</div>
                  </td>
                </tr>
                ${doc.statSummary ? `
                <tr>
                  <th scope="row">Rincian Data</th>
                  <td class="bdt-cell-text">${doc.statSummary}</td>
                </tr>` : ''}
                <tr>
                  <th scope="row">Bidang Pengampu</th>
                  <td class="bdt-cell-text font-bold text-dark">${bidang.name}</td>
                </tr>
                <tr>
                  <th scope="row">Sumber Resmi</th>
                  <td class="bdt-cell-text">${doc.source || 'BPS Kab. Demak'}</td>
                </tr>
                ${doc.documentNumber ? `
                <tr>
                  <th scope="row">Nomor Dokumen</th>
                  <td class="bdt-cell-text">${doc.documentNumber}</td>
                </tr>` : ''}
                <tr>
                  <th scope="row">Deskripsi / Uraian</th>
                  <td class="bdt-cell-text text-muted">${doc.desc || '-'}</td>
                </tr>
              </tbody>
            </table>

            <!-- Footer Tombol Pratinjau Dokumen -->
            <div class="pub-bdt-card-footer">
              <button class="btn btn-sm btn-outline-primary w-100 d-flex align-items-center justify-content-center gap-1 font-bold" onclick="App.openDocumentPreview('${doc.id}')">
                <i data-lucide="file-text" class="icon-xs"></i>
                <span>Pratinjau Dokumen & Data Lengkap</span>
              </button>
            </div>

          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = html;
    if (window.lucide) window.lucide.createIcons();
  },

  /* ========================================================================= */
  /* 5. BACKWARD COMPATIBILITY METHODS                                         */
  /* ========================================================================= */
  renderBankDataSegment() {
    this.renderBankData();
  },
  renderCards() {
    this.renderHome();
  },
  renderMatrix() {
    this.renderHome();
  },
  renderSelectedIndicatorHighlight() {
    // No-op for compatibility
  }
};

window.PublicPortalModule = PublicPortalModule;
