/**
 * SIDAT - SATU PUTARU - Target & Realisasi Matrix Module
 * Multi-year matrix with dynamic year management (Add/Edit/Delete Years & Records)
 */

const TargetRealisasiModule = {
  viewMode: 'matrix', // 'matrix' (all years) or specific year
  selectedYear: 'all',
  categoryFilter: 'all',
  bidangFilter: 'all',
  searchTerm: '',

  init() {
    this.populateFilters();
    if (window.App && typeof window.App.initSidebarYearSelect === 'function') window.App.initSidebarYearSelect();
    this.bindEvents();
    this.render();
  },

  populateFilters() {
    const yearSelect = document.getElementById('tr-year-filter');
    const catSelect = document.getElementById('tr-cat-filter');
    const bidangSelect = document.getElementById('tr-bidang-filter');

    const years = window.store.getYears();
    const categories = window.store.getCategories();
    const bidangList = window.store.getBidang();

    if (yearSelect) {
      yearSelect.innerHTML = `
        <option value="all">Semua Tahun (Tampilan Matriks ${years[0]}-${years[years.length - 1]})</option>
        ${years.map(y => `<option value="${y}">Tahun ${y} Spesifik</option>`).join('')}
      `;
    }

    if (catSelect) {
      catSelect.innerHTML = `
        <option value="all">Semua Kategori (IKD, IKU, IKP, IKK)</option>
        ${categories.map(c => `<option value="${c.id}">${c.code} - ${c.name}</option>`).join('')}
      `;
    }

    if (bidangSelect) {
      bidangSelect.innerHTML = `
        <option value="all">Semua Bidang Teknis</option>
        ${bidangList.map(b => `<option value="${b.id}">${b.name}</option>`).join('')}
      `;
    }
  },

  bindEvents() {
    const yearSelect = document.getElementById('tr-year-filter');
    if (yearSelect) {
      yearSelect.addEventListener('change', (e) => {
        this.selectedYear = e.target.value;
        this.render();
      });
    }

    const catSelect = document.getElementById('tr-cat-filter');
    if (catSelect) {
      catSelect.addEventListener('change', (e) => {
        this.categoryFilter = e.target.value;
        this.render();
      });
    }

    const bidangSelect = document.getElementById('tr-bidang-filter');
    if (bidangSelect) {
      bidangSelect.addEventListener('change', (e) => {
        this.bidangFilter = e.target.value;
        this.render();
      });
    }

    const searchInput = document.getElementById('tr-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchTerm = e.target.value.toLowerCase().trim();
        this.render();
      });
    }

    // Add Year button (Super Admin)
    const btnAddYear = document.getElementById('btn-add-year');
    if (btnAddYear) {
      btnAddYear.addEventListener('click', () => {
        this.openAddYearModal();
      });
    }

    // Manage Year Visibility button (Super Admin)
    const btnManageVisibility = document.getElementById('btn-manage-visibility');
    if (btnManageVisibility) {
      btnManageVisibility.addEventListener('click', () => {
        this.openManageYearVisibilityModal();
      });
    }

    // Delete Year button (Super Admin)
    const btnDeleteYear = document.getElementById('btn-delete-year');
    if (btnDeleteYear) {
      btnDeleteYear.addEventListener('click', () => {
        this.openDeleteYearModal();
      });
    }

    // Export CSV button
    const btnExport = document.getElementById('btn-export-csv');
    if (btnExport) {
      btnExport.addEventListener('click', () => {
        this.exportToCSV();
      });
    }
  },

  render() {
    const container = document.getElementById('tr-matrix-container');
    if (!container) return;

    const indicators = window.store.getIndicators();
    const categories = window.store.getCategories();
    const bidangList = window.store.getBidang();
    const allYears = window.store.getYears();
    const isSuperAdmin = window.store.canEditMaster();
    const canEditTarget = window.store.canEditTarget();
    const canInputRealisasi = window.store.canInputRealisasi();

    // Filter indicators
    const filtered = indicators.filter(ind => {
      if (this.categoryFilter !== 'all' && ind.categoryId !== this.categoryFilter) return false;
      if (this.bidangFilter !== 'all' && ind.bidangId !== this.bidangFilter) return false;
      if (this.searchTerm) {
        const cat = categories.find(c => c.id === ind.categoryId)?.name || '';
        const b = bidangList.find(b => b.id === ind.bidangId)?.name || '';
        const match = ind.name.toLowerCase().includes(this.searchTerm) ||
                      ind.code.toLowerCase().includes(this.searchTerm) ||
                      cat.toLowerCase().includes(this.searchTerm) ||
                      b.toLowerCase().includes(this.searchTerm);
        if (!match) return false;
      }
      return true;
    });

    const displayedYears = this.selectedYear === 'all' ? allYears : [parseInt(this.selectedYear, 10)];

    // Table Header
    let theadHtml = `
      <tr>
        <th rowspan="2" class="sticky-col-1 text-center" style="width: 70px;">No</th>
        <th rowspan="2" class="sticky-col-2" style="width: 110px;">Kode</th>
        <th rowspan="2" class="sticky-col-3" style="min-width: 280px;">Indikator Kinerja & Penanggung Jawab</th>
        <th rowspan="2" class="text-center" style="width: 80px;">Satuan</th>
        ${displayedYears.map(yr => `
          <th colspan="3" class="text-center year-header-group">
            Tahun ${yr}
          </th>
        `).join('')}
        <th rowspan="2" class="text-center" style="width: 110px;">Aksi</th>
      </tr>
      <tr>
        ${displayedYears.map(() => `
          <th class="text-end sub-th">Target</th>
          <th class="text-end sub-th">Realisasi</th>
          <th class="text-center sub-th">% Capaian</th>
        `).join('')}
      </tr>
    `;

    // Table Body
    let tbodyHtml = '';
    if (filtered.length === 0) {
      tbodyHtml = `
        <tr>
          <td colspan="${4 + (displayedYears.length * 3) + 1}" class="text-center p-4">
            <div class="retro-empty-state py-3">
              <i data-lucide="inbox" class="empty-icon"></i>
              <p class="mb-0">Tidak ada data indikator yang sesuai kriteria pencarian/filter.</p>
            </div>
          </td>
        </tr>
      `;
    } else {
      tbodyHtml = filtered.map((ind, idx) => {
        const cat = categories.find(c => c.id === ind.categoryId);
        const bidang = bidangList.find(b => b.id === ind.bidangId);

        let yearCells = displayedYears.map(yr => {
          const rec = ind.records?.[yr] || { target: 0, realisasi: 0 };
          const pct = window.store.calculateCapaian(rec.target, rec.realisasi, ind.polarization);
          const status = window.store.getStatus(pct);

          return `
            <td class="text-end font-mono">${rec.target}</td>
            <td class="text-end font-mono font-bold">${rec.realisasi}</td>
            <td class="text-center">
              <span class="retro-status-badge ${status.class}" title="${status.label} (${pct}%)">
                ${pct}%
              </span>
            </td>
          `;
        }).join('');

        return `
          <tr>
            <td class="sticky-col-1 text-center font-bold text-muted">${idx + 1}</td>
            <td class="sticky-col-2">
              <span class="retro-badge bg-white border-retro font-mono font-bold">${ind.code}</span>
            </td>
            <td class="sticky-col-3">
              <div class="d-flex flex-column">
                <a href="javascript:void(0)" onclick="TreeModule.selectIndicator('${ind.id}'); App.switchTab('capaian');" class="indicator-link font-bold">
                  ${ind.name}
                </a>
                <div class="d-flex flex-wrap gap-1 mt-1">
                  <span class="meta-tag"><i data-lucide="tag" class="icon-xs"></i> ${cat ? cat.name : '-'}</span>
                  <span class="meta-tag font-bold text-dark"><i data-lucide="shield" class="icon-xs text-primary"></i> ${ind.wewenangBidang || (bidang ? bidang.name : '-')}</span>
                </div>
              </div>
            </td>
            <td class="text-center"><span class="badge bg-white border-retro">${ind.unit}</span></td>
            ${yearCells}
            <td class="text-center">
              <div class="d-flex justify-content-center gap-1">
                ${canEditTarget || canInputRealisasi ? `
                  <button class="retro-btn-icon" title="Edit Data Target & Realisasi" onclick="App.openRecordEditor('${ind.id}')">
                    <i data-lucide="edit" class="icon-xs"></i>
                  </button>
                ` : ''}
                <button class="retro-btn-icon" title="Lihat di Grafik" onclick="DashboardModule.viewIndicatorInChart('${ind.id}')">
                  <i data-lucide="line-chart" class="icon-xs"></i>
                </button>
              </div>
            </td>
          </tr>
        `;
      }).join('');
    }

    container.innerHTML = `
      <div class="retro-table-wrap matrix-table-wrap">
        <table class="retro-table matrix-table">
          <thead>
            ${theadHtml}
          </thead>
          <tbody>
            ${tbodyHtml}
          </tbody>
        </table>
      </div>
    `;

    // Update Year Management Control Buttons visibility based on permissions
    const adminControls = document.getElementById('tr-admin-year-controls');
    if (adminControls) {
      adminControls.style.display = 'flex';
    }

    if (window.lucide) window.lucide.createIcons();
  },

  openAddYearModal() {
    if (!window.store.canEditMaster() && window.store.getCurrentUser() && window.store.getCurrentUser().role !== 'super_admin') {
      App.showToast('Hanya Super Admin yang berwenang menambah tahun baru!', 'warning');
      return;
    }

    const currentYears = window.store.getYears();
    const nextSuggestedYear = currentYears[currentYears.length - 1] + 1;

    const modalContent = `
      <div class="adm-modal-body">
        <div class="alert alert-info d-flex align-items-center gap-2 mb-3">
          <i data-lucide="info" class="icon-sm text-primary"></i>
          <div>
            <strong>Pemberitahuan Super Admin:</strong>
            <p class="small mb-0">Menambahkan tahun baru akan menginisialisasi kolom Target dan Realisasi di seluruh Indikator Kinerja dan Master Variabel.</p>
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label font-bold small">Masukkan Tahun Anggaran / Penilaian Baru:</label>
          <input type="number" id="input-new-year" class="adm-input font-mono font-bold fs-5" min="2000" max="2100" value="${nextSuggestedYear}">
        </div>

        <div class="form-check p-3 bg-light rounded border mb-3">
          <input class="form-check-input" type="checkbox" id="input-year-visible" checked>
          <label class="form-check-label font-bold small ms-2" for="input-year-visible">
            Langsung tampilkan tahun ini di Portal Publik (Masyarakat)
          </label>
          <div class="small text-muted ms-4">Jika dicentang, masyarakat dapat langsung melihat target & capaian untuk tahun ini di portal publik.</div>
        </div>

        <p class="small text-muted mb-0">Tahun yang saat ini ada: <strong>${currentYears.join(', ')}</strong></p>
      </div>
      <div class="adm-modal-footer d-flex justify-content-end gap-2 pt-3 border-top">
        <button class="adm-btn adm-btn-outline" onclick="App.closeModal()">Batal</button>
        <button class="adm-btn adm-btn-primary" onclick="TargetRealisasiModule.submitAddYear()">
          <i data-lucide="plus-circle" class="icon-xs"></i> Tambahkan Tahun Baru
        </button>
      </div>
    `;

    App.openModal('Tambah Tahun Target & Realisasi Baru', modalContent);
    if (window.lucide) window.lucide.createIcons();
  },

  submitAddYear() {
    const input = document.getElementById('input-new-year');
    const checkVisible = document.getElementById('input-year-visible');
    if (!input) return;
    const yearVal = parseInt(input.value, 10);
    const isVisible = checkVisible ? checkVisible.checked : true;

    if (!yearVal || isNaN(yearVal) || yearVal < 2000 || yearVal > 2100) {
      App.showToast('Format tahun tidak valid!', 'danger');
      return;
    }

    const success = window.store.addYear(yearVal, isVisible);
    if (!success) {
      App.showToast(`Tahun ${yearVal} sudah ada dalam sistem!`, 'warning');
      return;
    }

    App.closeModal();
    this.populateFilters();
    if (window.DashboardModule) window.DashboardModule.populateSelectors();
    this.render();
    if (window.TreeModule) window.TreeModule.render();
    if (window.PublicPortalModule) window.PublicPortalModule.render();
    App.showToast(`Tahun ${yearVal} berhasil ditambahkan (${isVisible ? 'Tampil di Publik' : 'Disimpan di Admin'})!`, 'success');
  },

  /* ----------------- ATUR VISIBILITAS TAMPILAN TAHUN PUBLIK ----------------- */
  openManageYearVisibilityModal() {
    if (!window.store.canEditMaster() && window.store.getCurrentUser() && window.store.getCurrentUser().role !== 'super_admin') {
      App.showToast('Hanya Super Admin yang berwenang mengatur tampilan tahun publik!', 'warning');
      return;
    }

    const allYears = window.store.getYears();
    const visibleYears = window.store.getVisibleYears();
    const activeYear = window.store.getActiveYear();

    const modalContent = `
      <div class="adm-modal-body">
        <div class="alert alert-warning d-flex align-items-center gap-2 mb-3">
          <i data-lucide="eye" class="icon-sm text-warning"></i>
          <div>
            <strong>Pengaturan Visibilitas Portal Publik:</strong>
            <p class="small mb-0">Tentukan tahun mana saja yang dapat dilihat oleh masyarakat di Portal Publik, dan pilih tahun mana yang berstatus sebagai <strong>Tahun Aktif</strong>.</p>
          </div>
        </div>

        <div class="d-flex align-items-center justify-content-between mb-2">
          <span class="small font-bold text-muted font-mono text-uppercase">Daftar Tahun & Status Tampilan:</span>
          <div class="d-flex gap-2">
            <button type="button" class="adm-btn adm-btn-xs adm-btn-outline" onclick="TargetRealisasiModule.toggleAllYears(true)">
              Pilih Semua
            </button>
            <button type="button" class="adm-btn adm-btn-xs adm-btn-outline" onclick="TargetRealisasiModule.toggleAllYears(false)">
              Hapus Semua
            </button>
          </div>
        </div>

        <div class="table-responsive border rounded mb-3">
          <table class="table table-hover align-middle mb-0">
            <thead class="table-light">
              <tr>
                <th style="width: 140px;">Tampilkan di Publik</th>
                <th style="width: 120px;" class="font-mono">Tahun Anggaran</th>
                <th style="width: 160px;" class="text-center">Jadikan Tahun Aktif</th>
                <th>Status Saat Ini</th>
              </tr>
            </thead>
            <tbody>
              ${allYears.map(yr => {
                const isVis = visibleYears.includes(yr);
                const isAct = activeYear === yr;
                return `
                  <tr>
                    <td>
                      <div class="form-check form-switch">
                        <input class="form-check-input year-visibility-cb" type="checkbox" id="cb-vis-${yr}" value="${yr}" ${isVis ? 'checked' : ''}>
                        <label class="form-check-label small font-bold" for="cb-vis-${yr}">
                          ${isVis ? 'Tampil' : 'Sembunyi'}
                        </label>
                      </div>
                    </td>
                    <td class="font-mono font-bold fs-6 text-dark">${yr}</td>
                    <td class="text-center">
                      <div class="form-check form-check-inline">
                        <input class="form-check-input active-year-radio" type="radio" name="activeYearRadio" id="radio-act-${yr}" value="${yr}" ${isAct ? 'checked' : ''}>
                        <label class="form-check-label small font-bold" for="radio-act-${yr}">
                          ${isAct ? 'Tahun Aktif' : 'Pilih'}
                        </label>
                      </div>
                    </td>
                    <td>
                      ${isVis ? '<span class="badge bg-success-subtle text-success border font-mono">Tampil di Publik</span>' : '<span class="badge bg-secondary-subtle text-muted border font-mono">Hanya di Admin</span>'}
                      ${isAct ? '<span class="badge bg-warning-subtle text-warning border font-mono ms-1 font-bold">Aktif 2026</span>' : ''}
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>

        <div class="p-3 bg-light rounded border text-muted small">
          <i data-lucide="info" class="icon-xs text-primary me-1"></i>
          Masyarakat hanya dapat melihat data capaian dan target untuk tahun-tahun yang dicentang di atas.
        </div>
      </div>

      <div class="adm-modal-footer d-flex justify-content-end gap-2 pt-3 border-top">
        <button class="adm-btn adm-btn-outline" onclick="App.closeModal()">Batal</button>
        <button class="adm-btn adm-btn-primary" onclick="TargetRealisasiModule.submitManageYearVisibility()">
          <i data-lucide="save" class="icon-xs"></i> Simpan Pengaturan Tampilan Tahun
        </button>
      </div>
    `;

    App.openModal('Atur Tampilan Tahun di Portal Publik', modalContent);
    if (window.lucide) window.lucide.createIcons();
  },

  toggleAllYears(check) {
    document.querySelectorAll('.year-visibility-cb').forEach(cb => {
      cb.checked = check;
      const label = cb.parentElement.querySelector('label');
      if (label) label.textContent = check ? 'Tampil' : 'Sembunyi';
    });
  },

  submitManageYearVisibility() {
    const checkedYears = [];
    document.querySelectorAll('.year-visibility-cb:checked').forEach(cb => {
      checkedYears.push(parseInt(cb.value, 10));
    });

    if (checkedYears.length === 0) {
      App.showToast('Minimal harus ada 1 tahun yang ditampilkan di publik!', 'danger');
      return;
    }

    const activeRadio = document.querySelector('.active-year-radio:checked');
    const activeYr = activeRadio ? parseInt(activeRadio.value, 10) : checkedYears[checkedYears.length - 1];

    window.store.setVisibleYears(checkedYears, activeYr);

    App.closeModal();
    this.populateFilters();
    if (window.PublicPortalModule) window.PublicPortalModule.render();
    this.render();
    if (window.DashboardModule) window.DashboardModule.populateSelectors();
    App.showToast(`Pengaturan tampilan tahun berhasil disimpan! Portal publik menampilkan: ${checkedYears.join(', ')} (Aktif: ${activeYr})`, 'success');
  },

  openDeleteYearModal() {
    if (!window.store.canEditMaster() && window.store.getCurrentUser() && window.store.getCurrentUser().role !== 'super_admin') {
      App.showToast('Hanya Super Admin yang berwenang menghapus tahun!', 'warning');
      return;
    }

    const currentYears = window.store.getYears();
    if (currentYears.length <= 1) {
      App.showToast('Tidak dapat menghapus tahun. Sistem memerlukan minimal 1 tahun.', 'warning');
      return;
    }

    const modalContent = `
      <div class="retro-modal-body">
        <div class="alert-box-retro bg-rose text-white mb-3">
          <i data-lucide="alert-triangle" class="icon-sm"></i>
          <div>
            <strong>Perhatian Penting:</strong>
            <p class="small mb-0">Menghapus tahun akan menghapus seluruh data target dan realisasi kinerja pada tahun tersebut secara permanen.</p>
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label font-bold">Pilih Tahun yang Akan Dihapus:</label>
          <select id="select-delete-year" class="retro-select font-mono font-bold">
            ${currentYears.map(y => `<option value="${y}">Tahun ${y}</option>`).join('')}
          </select>
        </div>
      </div>
      <div class="retro-modal-footer">
        <button class="retro-btn retro-btn-outline" onclick="App.closeModal()">Batal</button>
        <button class="retro-btn retro-btn-danger" onclick="TargetRealisasiModule.submitDeleteYear()">
          <i data-lucide="trash-2" class="icon-xs"></i> Hapus Tahun Terpilih
        </button>
      </div>
    `;

    App.openModal('Hapus Tahun dari Sistem', modalContent);
  },

  submitDeleteYear() {
    const select = document.getElementById('select-delete-year');
    if (!select) return;
    const yearVal = parseInt(select.value, 10);

    const success = window.store.deleteYear(yearVal);
    if (!success) {
      App.showToast(`Gagal menghapus tahun ${yearVal}.`, 'danger');
      return;
    }

    App.closeModal();
    this.populateFilters();
    if (window.App && typeof window.App.initSidebarYearSelect === 'function') window.App.initSidebarYearSelect();
    if (window.DashboardModule) window.DashboardModule.populateSelectors();
    this.render();
    TreeModule.render();
    App.showToast(`Tahun ${yearVal} berhasil dihapus dari sistem!`, 'success');
  },

  exportToCSV() {
    const indicators = window.store.getIndicators();
    const years = window.store.getYears();
    
    let csv = [];
    // Header
    let header = ['No', 'Kode', 'Indikator', 'Kategori', 'Bidang', 'Satuan'];
    years.forEach(yr => {
      header.push(`Target ${yr}`, `Realisasi ${yr}`, `% Capaian ${yr}`);
    });
    csv.push(header.map(h => `"${h}"`).join(','));

    // Rows
    indicators.forEach((ind, idx) => {
      const cat = window.store.getCategories().find(c => c.id === ind.categoryId)?.name || '';
      const b = window.store.getBidang().find(b => b.id === ind.bidangId)?.name || '';
      let row = [
        idx + 1,
        ind.code,
        `"${ind.name.replace(/"/g, '""')}"`,
        `"${cat}"`,
        `"${b}"`,
        `"${ind.unit}"`
      ];

      years.forEach(yr => {
        const rec = ind.records?.[yr] || { target: 0, realisasi: 0 };
        const pct = window.store.calculateCapaian(rec.target, rec.realisasi, ind.polarization);
        row.push(rec.target, rec.realisasi, `${pct}%`);
      });

      csv.push(row.join(','));
    });

    const blob = new Blob(['\uFEFF' + csv.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `rekapitulasi_capaian_dputr_demak_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    App.showToast('Data berhasil diekspor ke format CSV / Excel!', 'success');
  }
};

window.TargetRealisasiModule = TargetRealisasiModule;
