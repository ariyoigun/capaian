/**
 * SIDAT - SATUPUTARU - Tree View System
 * Hierarchical tree browser with expandable details
 */

const TreeModule = {
  selectedIndicatorId: null,
  groupBy: 'category', // 'category' or 'bidang'
  searchTerm: '',

  init() {
    this.render();
    this.bindEvents();
    
    // Auto-select first indicator if none selected
    const indicators = window.store.getIndicators();
    if (indicators.length > 0 && !this.selectedIndicatorId) {
      this.selectedIndicatorId = indicators[0].id;
      this.renderDetail(this.selectedIndicatorId);
    }
  },

  bindEvents() {
    // Search input
    const searchInput = document.getElementById('tree-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchTerm = e.target.value.toLowerCase().trim();
        this.render();
      });
    }

    // Grouping switcher
    const groupSelect = document.getElementById('tree-group-by');
    if (groupSelect) {
      groupSelect.addEventListener('change', (e) => {
        this.groupBy = e.target.value;
        this.render();
      });
    }

    // Expand all / Collapse all
    const btnExpandAll = document.getElementById('btn-tree-expand-all');
    if (btnExpandAll) {
      btnExpandAll.addEventListener('click', () => {
        document.querySelectorAll('.tree-node-content').forEach(el => {
          el.classList.remove('collapsed');
        });
        document.querySelectorAll('.tree-toggle-icon').forEach(icon => {
          icon.classList.add('rotated');
        });
      });
    }

    const btnCollapseAll = document.getElementById('btn-tree-collapse-all');
    if (btnCollapseAll) {
      btnCollapseAll.addEventListener('click', () => {
        document.querySelectorAll('.tree-node-content').forEach(el => {
          el.classList.add('collapsed');
        });
        document.querySelectorAll('.tree-toggle-icon').forEach(icon => {
          icon.classList.remove('rotated');
        });
      });
    }
  },

  render() {
    const container = document.getElementById('tree-view-container');
    if (!container) return;

    const indicators = window.store.getIndicators();
    const categories = window.store.getCategories();
    const bidangList = window.store.getBidang();
    const years = window.store.getYears();
    const latestYear = years[years.length - 1];

    // Filter by search
    const filtered = indicators.filter(ind => {
      if (!this.searchTerm) return true;
      const cat = categories.find(c => c.id === ind.categoryId)?.name || '';
      const b = bidangList.find(b => b.id === ind.bidangId)?.name || '';
      return (
        ind.name.toLowerCase().includes(this.searchTerm) ||
        ind.code.toLowerCase().includes(this.searchTerm) ||
        ind.definition.toLowerCase().includes(this.searchTerm) ||
        cat.toLowerCase().includes(this.searchTerm) ||
        b.toLowerCase().includes(this.searchTerm)
      );
    });

    let treeHtml = '';

    if (this.groupBy === 'category') {
      // Group by Kategori (IKD, IKU, IKP, IKK)
      categories.forEach(cat => {
        const catIndicators = filtered.filter(ind => ind.categoryId === cat.id);
        if (this.searchTerm && catIndicators.length === 0) return;

        treeHtml += `
          <div class="tree-branch" data-cat-id="${cat.id}">
            <div class="tree-branch-header" onclick="TreeModule.toggleBranch(this)">
              <div class="d-flex align-items-center gap-2">
                <span class="tree-toggle-icon rotated">▶</span>
                <span class="retro-badge" style="background-color: ${cat.badgeColor || '#fbbf24'}; border: 2px solid #1e293b; color: #0f172a; font-weight: 700;">
                  ${cat.code}
                </span>
                <span class="tree-branch-title font-bold">${cat.name}</span>
                <span class="tree-branch-count">(${catIndicators.length} Indikator)</span>
              </div>
              <span class="tree-branch-desc text-muted d-none d-lg-inline">${cat.desc}</span>
            </div>
            
            <div class="tree-node-content">
              ${catIndicators.length === 0 
                ? `<div class="tree-empty-notice">Belum ada indikator pada kategori ini.</div>`
                : `<div class="tree-leaf-list">
                    ${catIndicators.map(ind => this.renderLeafItem(ind, latestYear)).join('')}
                  </div>`
              }
            </div>
          </div>
        `;
      });
    } else {
      // Group by Bidang
      bidangList.forEach(bid => {
        const bidIndicators = filtered.filter(ind => ind.bidangId === bid.id);
        if (this.searchTerm && bidIndicators.length === 0) return;

        treeHtml += `
          <div class="tree-branch" data-bidang-id="${bid.id}">
            <div class="tree-branch-header" onclick="TreeModule.toggleBranch(this)">
              <div class="d-flex align-items-center gap-2">
                <span class="tree-toggle-icon rotated">▶</span>
                <span class="retro-badge bg-primary-subtle border-retro font-bold">
                  ${bid.code}
                </span>
                <span class="tree-branch-title font-bold">${bid.name}</span>
                <span class="tree-branch-count">(${bidIndicators.length} Indikator)</span>
              </div>
              <span class="tree-branch-desc text-muted d-none d-lg-inline">${bid.head}</span>
            </div>
            
            <div class="tree-node-content">
              ${bidIndicators.length === 0 
                ? `<div class="tree-empty-notice">Belum ada indikator pada bidang ini.</div>`
                : `<div class="tree-leaf-list">
                    ${bidIndicators.map(ind => this.renderLeafItem(ind, latestYear)).join('')}
                  </div>`
              }
            </div>
          </div>
        `;
      });
    }

    if (treeHtml === '') {
      container.innerHTML = `
        <div class="retro-empty-state">
          <i data-lucide="search-x" class="empty-icon"></i>
          <h4>Indikator Tidak Ditemukan</h4>
          <p>Tidak ada indikator yang cocok dengan kata kunci: <em>"${this.searchTerm}"</em></p>
          <button class="retro-btn retro-btn-sm" onclick="document.getElementById('tree-search-input').value=''; TreeModule.searchTerm=''; TreeModule.render();">
            Reset Pencarian
          </button>
        </div>
      `;
    } else {
      container.innerHTML = treeHtml;
    }

    if (window.lucide) window.lucide.createIcons();

    // Render detail panel for selected indicator
    if (this.selectedIndicatorId) {
      this.renderDetail(this.selectedIndicatorId);
    }
  },

  renderLeafItem(indicator, latestYear) {
    const isSelected = this.selectedIndicatorId === indicator.id;
    const cat = window.store.getCategories().find(c => c.id === indicator.categoryId);
    const bidang = window.store.getBidang().find(b => b.id === indicator.bidangId);
    const rec = indicator.records?.[latestYear] || { target: 0, realisasi: 0 };
    const pct = window.store.calculateCapaian(rec.target, rec.realisasi, indicator.polarization);
    const status = window.store.getStatus(pct);

    return `
      <div class="tree-leaf-item ${isSelected ? 'active-tree-item' : ''}" 
           onclick="TreeModule.selectIndicator('${indicator.id}')"
           id="tree-leaf-${indicator.id}">
        
        <div class="tree-leaf-left">
          <div class="tree-connector-line"></div>
          <span class="tree-item-code">${indicator.code}</span>
          <div class="tree-item-info">
            <h5 class="tree-item-name">${indicator.name}</h5>
            <div class="tree-item-meta">
              <span class="meta-tag"><i data-lucide="tag" class="icon-xs"></i> ${cat ? cat.name : '-'}</span>
              <span class="meta-tag"><i data-lucide="building-2" class="icon-xs"></i> ${bidang ? bidang.name : '-'}</span>
              <span class="meta-tag text-dark font-bold"><i data-lucide="shield" class="icon-xs text-primary"></i> Wewenang: ${ind.wewenangBidang || (bidang ? bidang.name : '-')}</span>
              <span class="meta-tag"><i data-lucide="ruler" class="icon-xs"></i> Satuan: <strong>${indicator.unit}</strong></span>
            </div>
          </div>
        </div>

        <div class="tree-leaf-right">
          <div class="tree-stat-pill">
            <span class="stat-year-label">Th ${latestYear}</span>
            <div class="stat-values">
              <span class="val-target" title="Target">T: ${rec.target}</span>
              <span class="val-sep">/</span>
              <span class="val-realisasi font-bold" title="Realisasi">R: ${rec.realisasi}</span>
            </div>
            <span class="retro-status-badge ${status.class}">
              ${pct}% • ${status.label}
            </span>
          </div>
          <button class="retro-btn-icon" title="Lihat Keterangan">
            <i data-lucide="chevron-right" class="icon-sm"></i>
          </button>
        </div>

      </div>
    `;
  },

  toggleBranch(headerEl) {
    const branch = headerEl.closest('.tree-branch');
    const content = branch.querySelector('.tree-node-content');
    const icon = headerEl.querySelector('.tree-toggle-icon');
    
    if (content.classList.contains('collapsed')) {
      content.classList.remove('collapsed');
      icon.classList.add('rotated');
    } else {
      content.classList.add('collapsed');
      icon.classList.remove('rotated');
    }
  },

  selectIndicator(id) {
    this.selectedIndicatorId = id;
    
    // Highlight leaf
    document.querySelectorAll('.tree-leaf-item').forEach(el => el.classList.remove('active-tree-item'));
    const activeEl = document.getElementById(`tree-leaf-${id}`);
    if (activeEl) activeEl.classList.add('active-tree-item');

    this.renderDetail(id);

    // Scroll smoothly to detail if on mobile/small screen
    const detailBox = document.getElementById('indicator-detail-panel');
    if (detailBox && window.innerWidth < 992) {
      detailBox.scrollIntoView({ behavior: 'smooth' });
    }
  },

  renderDetail(indicatorId) {
    const panel = document.getElementById('indicator-detail-panel');
    if (!panel) return;

    const ind = window.store.getIndicatorById(indicatorId);
    if (!ind) {
      panel.innerHTML = `
        <div class="retro-card p-4 text-center">
          <p class="text-muted">Pilih salah satu indikator pada tree di atas untuk melihat rincian keterangan lengkap.</p>
        </div>
      `;
      return;
    }

    const cat = window.store.getCategories().find(c => c.id === ind.categoryId);
    const bidang = window.store.getBidang().find(b => b.id === ind.bidangId);
    const years = window.store.getYears();
    const canEdit = window.store.canEditMaster() || window.store.canInputRealisasi();

    // Associated variables
    const variables = (ind.formulaVars || []).map(vId => window.store.getVariableById(vId)).filter(Boolean);

    // Associated documents in bank data
    const docs = window.store.getDocuments().filter(d => d.indicatorCode === ind.code || d.tags?.includes(ind.code));

    let multiYearRows = years.map(yr => {
      const rec = ind.records?.[yr] || { target: 0, realisasi: 0, notes: '-' };
      const pct = window.store.calculateCapaian(rec.target, rec.realisasi, ind.polarization);
      const status = window.store.getStatus(pct);

      return `
        <tr>
          <td class="font-bold text-center">${yr}</td>
          <td class="text-end font-mono">${rec.target} ${ind.unit}</td>
          <td class="text-end font-mono font-bold">${rec.realisasi} ${ind.unit}</td>
          <td class="text-center font-bold">
            <span class="retro-status-badge ${status.class}">
              ${pct}%
            </span>
          </td>
          <td>
            <span class="status-pill-text ${status.class}">
              <i data-lucide="${status.icon}" class="icon-xs"></i> ${status.label}
            </span>
          </td>
          <td class="text-muted small">${rec.notes || '-'}</td>
        </tr>
      `;
    }).join('');

    panel.innerHTML = `
      <div class="retro-card detail-box-card">
        
        <!-- Header -->
        <div class="detail-box-header">
          <div class="d-flex flex-wrap align-items-center justify-content-between gap-2">
            <div class="d-flex align-items-center gap-2">
              <span class="retro-badge retro-badge-black font-mono font-bold fs-6">
                ${ind.code}
              </span>
              <span class="retro-badge" style="background-color: ${cat?.badgeColor || '#fbbf24'}; border: 2px solid #1e293b; color: #0f172a; font-weight: 700;">
                ${cat ? cat.name : '-'}
              </span>
              <span class="retro-badge bg-white border-retro text-dark">
                <i data-lucide="building" class="icon-xs"></i> ${bidang ? bidang.name : '-'}
              </span>
              <span class="retro-badge bg-white border-retro text-dark">
                Satuan: <strong>${ind.unit}</strong>
              </span>
            </div>

            <!-- Action buttons -->
            <div class="d-flex gap-2">
              <button class="retro-btn retro-btn-sm retro-btn-primary" onclick="DashboardModule.viewIndicatorInChart('${ind.id}')">
                <i data-lucide="line-chart" class="icon-xs"></i> Pantau di Grafik
              </button>
              ${canEdit ? `
                <button class="retro-btn retro-btn-sm retro-btn-outline" onclick="App.openEditIndicatorModal('${ind.id}')">
                  <i data-lucide="edit-3" class="icon-xs"></i> Edit Indikator
                </button>
              ` : ''}
              ${window.store.canEditMaster() ? `
                <button class="retro-btn retro-btn-sm retro-btn-danger" onclick="App.deleteIndicator('${ind.id}')">
                  <i data-lucide="trash-2" class="icon-xs"></i> Hapus
                </button>
              ` : ''}
            </div>
          </div>

          <h3 class="detail-indicator-title mt-3">${ind.name}</h3>

          <!-- Wewenang Bidang yang Menangani -->
          <div class="pub-authority-banner mt-3">
            <div class="d-flex align-items-center gap-2">
              <i data-lucide="shield-check" class="icon-sm text-primary"></i>
              <strong class="text-dark">Wewenang Bidang yang Menangani:</strong>
              <span class="badge bg-primary text-white border-retro">${ind.wewenangBidang || (bidang ? bidang.name : '-')}</span>
            </div>
            <div class="small text-muted mt-1 ps-4">
              Pejabat Pembina: <strong>${ind.pejabatPenanggungJawab || (bidang ? bidang.head : '-')}</strong> • 
              Pelaksana Teknis: <em>${ind.seksiPelaksana || (bidang ? bidang.seksi : '-')}</em>
            </div>
          </div>
        </div>

        <!-- 3 Core Attributes Required by User: Definisi Operasional, Formulasi Perhitungan, Sumber -->
        <div class="detail-box-body">
          <div class="retro-grid-3 gap-3 mb-4">
            
            <!-- 1. Definisi Operasional -->
            <div class="retro-panel panel-definition">
              <div class="panel-header">
                <div class="panel-icon-tag bg-amber">
                  <i data-lucide="book-open" class="icon-sm"></i>
                </div>
                <h5 class="panel-title">1. Definisi Operasional</h5>
              </div>
              <div class="panel-content">
                <p class="desc-text">${ind.definition || 'Belum diisi keterangan definisi operasional.'}</p>
                <div class="polarization-info">
                  <span class="small text-muted">Arah Polarisasi:</span>
                  <span class="badge border-retro bg-white text-dark font-mono">
                    ${ind.polarization === 'maximize' ? '▲ Maximize (Makin tinggi makin baik)' : '▼ Minimize (Makin rendah makin baik)'}
                  </span>
                </div>
              </div>
            </div>

            <!-- 2. Formulasi Perhitungan -->
            <div class="retro-panel panel-formula">
              <div class="panel-header">
                <div class="panel-icon-tag bg-cyan">
                  <i data-lucide="calculator" class="icon-sm"></i>
                </div>
                <h5 class="panel-title">2. Formulasi Perhitungan</h5>
              </div>
              <div class="panel-content">
                <div class="formula-box-render">
                  <span class="formula-math-display">${ind.formula || 'Belum dirumuskan'}</span>
                </div>
                ${ind.formulaExpr ? `
                  <div class="mt-2 text-muted small font-mono">
                    <strong>Ekspresi Rumus:</strong> <code>${ind.formulaExpr}</code>
                  </div>
                ` : ''}
                ${variables.length > 0 ? `
                  <div class="mt-2">
                    <span class="small font-bold text-muted d-block mb-1">Variabel Pembentuk (Master Data):</span>
                    <ul class="var-list-mini">
                      ${variables.map(v => `
                        <li>
                          <span class="font-mono text-primary font-bold">[${v.code}]</span> ${v.name} (${v.unit})
                        </li>
                      `).join('')}
                    </ul>
                  </div>
                ` : ''}
              </div>
            </div>

            <!-- 3. Sumber Data -->
            <div class="retro-panel panel-source">
              <div class="panel-header">
                <div class="panel-icon-tag bg-emerald">
                  <i data-lucide="database" class="icon-sm"></i>
                </div>
                <h5 class="panel-title">3. Sumber Data</h5>
              </div>
              <div class="panel-content">
                <p class="source-text">${ind.source || 'Belum dispesifikasi sumber data resminya.'}</p>
                <div class="source-meta mt-3">
                  <span class="d-block small text-muted mb-1">Unit Pengelola Teknis:</span>
                  <span class="retro-badge bg-white border-retro text-dark font-bold">
                    ${bidang ? bidang.name : 'DINPUTARU Kabupaten Demak'}
                  </span>
                </div>
                <div class="mt-3">
                  <span class="d-block small text-muted mb-1">Dokumen Pendukung di Bank Data:</span>
                  ${docs.length > 0 ? `
                    <div class="d-flex flex-wrap gap-1">
                      ${docs.map(d => `
                        <a href="javascript:void(0)" onclick="App.openDocumentPreview('${d.id}')" class="bank-data-link-pill">
                          <i data-lucide="file-text" class="icon-xs"></i> ${d.title.substring(0, 32)}...
                        </a>
                      `).join('')}
                    </div>
                  ` : `
                    <span class="text-muted small">Belum ada dokumen tertaut di Bank Data.</span>
                  `}
                </div>
              </div>
            </div>

          </div>

          <!-- Multi-Year Matrix Table for this Indicator -->
          <div class="multi-year-section mt-4">
            <div class="d-flex flex-wrap align-items-center justify-content-between mb-2">
              <h4 class="font-bold mb-0">
                <i data-lucide="calendar" class="icon-sm"></i> Capaian Multi-Tahun (${years[0]} - ${years[years.length - 1]})
              </h4>
              <div class="d-flex gap-2">
                ${window.store.canEditTarget() || window.store.canInputRealisasi() ? `
                  <button class="retro-btn retro-btn-sm" onclick="App.openRecordEditor('${ind.id}')">
                    <i data-lucide="edit" class="icon-xs"></i> Perbarui Nilai Target & Realisasi
                  </button>
                ` : ''}
              </div>
            </div>

            <div class="retro-table-wrap">
              <table class="retro-table">
                <thead>
                  <tr>
                    <th style="width: 90px;" class="text-center">Tahun</th>
                    <th style="width: 140px;" class="text-end">Target (${ind.unit})</th>
                    <th style="width: 140px;" class="text-end">Realisasi (${ind.unit})</th>
                    <th style="width: 120px;" class="text-center">% Capaian</th>
                    <th style="width: 180px;">Status Kinerja</th>
                    <th>Catatan Lapangan & Tindak Lanjut</th>
                  </tr>
                </thead>
                <tbody>
                  ${multiYearRows}
                </tbody>
              </table>
            </div>
          </div>

          <!-- Sandbox Perhitungan / Kalkulator Otomatis -->
          ${variables.length > 0 ? `
            <div class="sandbox-calculation-box mt-4">
              <div class="d-flex align-items-center justify-content-between mb-2">
                <h5 class="font-bold mb-0">
                  <i data-lucide="cpu" class="icon-sm text-primary"></i> Sandbox Kalkulasi Realisasi Otomatis dari Master Data
                </h5>
                <span class="badge bg-warning-subtle text-dark border-retro font-mono small">
                  Otomatisasi Hitung Capaian
                </span>
              </div>
              <p class="small text-muted mb-3">
                Sistem dapat menghitung nilai capaian realisasi indikator ini secara otomatis berdasarkan data variabel mentah yang diinput pada menu Master Data.
              </p>
              
              <div class="sandbox-table-wrap">
                <table class="retro-table table-sm">
                  <thead>
                    <tr>
                      <th>Kode Variabel</th>
                      <th>Nama Data Dasar / Variabel</th>
                      <th>Satuan</th>
                      ${years.map(yr => `<th class="text-end">${yr}</th>`).join('')}
                    </tr>
                  </thead>
                  <tbody>
                    ${variables.map(v => `
                      <tr>
                        <td class="font-mono font-bold">${v.code}</td>
                        <td>${v.name}</td>
                        <td><span class="badge bg-white border-retro">${v.unit}</span></td>
                        ${years.map(yr => `<td class="text-end font-mono">${(v.values?.[yr] || 0).toLocaleString('id-ID')}</td>`).join('')}
                      </tr>
                    `).join('')}
                    <tr class="table-active">
                      <td colspan="3" class="font-bold text-primary">
                        Hasil Kalkulasi Otomatis (Realisasi Formula):
                      </td>
                      ${years.map(yr => {
                        const computed = window.store.computeIndicatorValue(ind.id, yr);
                        return `<td class="text-end font-mono font-bold text-primary">${computed !== null ? computed + ' ' + ind.unit : '-'}</td>`;
                      }).join('')}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ` : ''}

        </div>

      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  }
};

window.TreeModule = TreeModule;
