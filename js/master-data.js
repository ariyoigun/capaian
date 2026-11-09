/**
 * SIDAT - SATU PUTARU - Master Data Module
 * Manages foundational calculation variables, indicator categories, bidang, years & roles
 */

const MasterDataModule = {
  activeSubTab: 'variables', // 'variables', 'categories', 'bidang', 'years', 'roles'
  selectedYear: 'all',

  init() {
    this.bindEvents();
    this.render();
  },

  bindEvents() {
    // Sub-tab navigation
    document.querySelectorAll('.master-subtab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.master-subtab-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.activeSubTab = e.currentTarget.getAttribute('data-subtab');
        this.renderSubTab();
      });
    });

    // Add Variable button
    const btnAddVar = document.getElementById('btn-add-variable');
    if (btnAddVar) {
      btnAddVar.addEventListener('click', () => {
        this.openAddVariableModal();
      });
    }

    // Sync Calculation button
    const btnSyncCalc = document.getElementById('btn-sync-all-calculations');
    if (btnSyncCalc) {
      btnSyncCalc.addEventListener('click', () => {
        this.syncAllCalculations();
      });
    }
  },

  render() {
    this.renderSubTab();
  },

  renderSubTab() {
    const container = document.getElementById('master-content-container');
    if (!container) return;

    switch(this.activeSubTab) {
      case 'variables':
        this.renderVariables(container);
        break;
      case 'categories':
        this.renderCategories(container);
        break;
      case 'bidang':
        this.renderBidang(container);
        break;
      case 'years':
        this.renderYears(container);
        break;
      case 'roles':
        this.renderRoles(container);
        break;
      default:
        this.renderVariables(container);
    }

    if (window.lucide) window.lucide.createIcons();
  },

  /* ----------------- 1. VARIABLES (DATA DASAR PERHITUNGAN) ----------------- */
  renderVariables(container) {
    const vars = window.store.getVariables();
    const years = window.store.getYears();
    const bidangList = window.store.getBidang();
    const canEdit = window.store.canEditMaster() || window.store.canInputRealisasi();

    container.innerHTML = `
      <div class="master-header-actions mb-3">
        <div>
          <h4 class="font-bold mb-1"><i data-lucide="cpu" class="icon-sm text-primary"></i> Data Dasar & Variabel Perhitungan Kinerja</h4>
          <p class="text-muted small mb-0">Data kuantitatif dasar lapangan yang digunakan rumus matematis untuk menghasilkan nilai realisasi indikator kinerja DINPUTARU Kab. Demak.</p>
        </div>
        <div class="d-flex gap-2">
          <button class="retro-btn retro-btn-sm retro-btn-outline" id="btn-sync-all-calculations" onclick="MasterDataModule.syncAllCalculations()">
            <i data-lucide="refresh-cw" class="icon-xs"></i> Sinkronisasi & Hitung Ulang Realisasi
          </button>
          ${canEdit ? `
            <button class="retro-btn retro-btn-sm retro-btn-primary" onclick="MasterDataModule.openAddVariableModal()">
              <i data-lucide="plus" class="icon-xs"></i> Tambah Data Variabel
            </button>
          ` : ''}
        </div>
      </div>

      <div class="retro-table-wrap">
        <table class="retro-table">
          <thead>
            <tr>
              <th style="width: 60px;" class="text-center">No</th>
              <th style="width: 120px;">Kode Variabel</th>
              <th style="min-width: 250px;">Nama Data Variabel</th>
              <th style="width: 90px;" class="text-center">Satuan</th>
              <th style="width: 160px;">Bidang Pengampu</th>
              ${years.map(y => `<th class="text-end font-mono" style="min-width: 110px;">Th ${y}</th>`).join('')}
              <th style="width: 100px;" class="text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            ${vars.map((v, idx) => {
              const b = bidangList.find(b => b.id === v.bidang);
              return `
                <tr>
                  <td class="text-center font-bold text-muted">${idx + 1}</td>
                  <td><span class="retro-badge bg-white border-retro font-mono font-bold">${v.code}</span></td>
                  <td>
                    <strong>${v.name}</strong>
                    <div class="small text-muted mt-1">Sumber: <em>${v.source || '-'}</em></div>
                  </td>
                  <td class="text-center"><span class="badge bg-white border-retro">${v.unit}</span></td>
                  <td><span class="badge border-retro bg-light text-dark">${b ? b.name : '-'}</span></td>
                  ${years.map(yr => `
                    <td class="text-end font-mono">
                      ${(v.values?.[yr] || 0).toLocaleString('id-ID')}
                    </td>
                  `).join('')}
                  <td class="text-center">
                    <div class="d-flex justify-content-center gap-1">
                      ${canEdit ? `
                        <button class="retro-btn-icon" title="Edit Nilai Variabel" onclick="MasterDataModule.openEditVariableModal('${v.id}')">
                          <i data-lucide="edit" class="icon-xs"></i>
                        </button>
                      ` : ''}
                      ${window.store.canEditMaster() ? `
                        <button class="retro-btn-icon text-danger" title="Hapus Variabel" onclick="MasterDataModule.deleteVariable('${v.id}')">
                          <i data-lucide="trash-2" class="icon-xs"></i>
                        </button>
                      ` : ''}
                    </div>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  openAddVariableModal() {
    const bidangList = window.store.getBidang();
    const years = window.store.getYears();

    const modalContent = `
      <div class="retro-modal-body">
        <div class="mb-3">
          <label class="form-label font-bold">Nama Data Dasar / Variabel:</label>
          <input type="text" id="mv-name" class="retro-input" placeholder="Contoh: Total Panjang Tanggul Pesisir Terpasang">
        </div>

        <div class="row g-2 mb-3">
          <div class="col-md-6">
            <label class="form-label font-bold">Kode Variabel (Unik):</label>
            <input type="text" id="mv-code" class="retro-input font-mono font-bold" placeholder="Contoh: P_TANGGUL">
          </div>
          <div class="col-md-6">
            <label class="form-label font-bold">Satuan Pengukuran:</label>
            <input type="text" id="mv-unit" class="retro-input" placeholder="Contoh: Km, Ha, KK, Berkas, %">
          </div>
        </div>

        <div class="row g-2 mb-3">
          <div class="col-md-6">
            <label class="form-label font-bold">Bidang Pengelola:</label>
            <select id="mv-bidang" class="retro-select">
              ${bidangList.map(b => `<option value="${b.id}">${b.name}</option>`).join('')}
            </select>
          </div>
          <div class="col-md-6">
            <label class="form-label font-bold">Sumber Resmi Data:</label>
            <input type="text" id="mv-source" class="retro-input" placeholder="Contoh: Survei Lapangan DINPUTARU, BPS">
          </div>
        </div>

        <h5 class="font-bold mt-4 mb-2">Nilai Historis per Tahun:</h5>
        <div class="row g-2">
          ${years.map(yr => `
            <div class="col-md-4 col-6 mb-2">
              <label class="form-label small text-muted font-mono font-bold">Tahun ${yr}:</label>
              <input type="number" step="any" class="retro-input font-mono mv-year-val" data-year="${yr}" value="0">
            </div>
          `).join('')}
        </div>
      </div>

      <div class="retro-modal-footer">
        <button class="retro-btn retro-btn-outline" onclick="App.closeModal()">Batal</button>
        <button class="retro-btn retro-btn-primary" onclick="MasterDataModule.submitSaveVariable()">
          <i data-lucide="save" class="icon-xs"></i> Simpan Variabel
        </button>
      </div>
    `;

    App.openModal('Tambah Data Variabel Perhitungan Baru', modalContent);
  },

  openEditVariableModal(varId) {
    const v = window.store.getVariableById(varId);
    if (!v) return;

    const bidangList = window.store.getBidang();
    const years = window.store.getYears();

    const modalContent = `
      <div class="retro-modal-body">
        <input type="hidden" id="mv-edit-id" value="${v.id}">
        
        <div class="mb-3">
          <label class="form-label font-bold">Nama Data Dasar / Variabel:</label>
          <input type="text" id="mv-name" class="retro-input" value="${v.name}">
        </div>

        <div class="row g-2 mb-3">
          <div class="col-md-6">
            <label class="form-label font-bold">Kode Variabel:</label>
            <input type="text" id="mv-code" class="retro-input font-mono font-bold" value="${v.code}">
          </div>
          <div class="col-md-6">
            <label class="form-label font-bold">Satuan:</label>
            <input type="text" id="mv-unit" class="retro-input" value="${v.unit}">
          </div>
        </div>

        <div class="row g-2 mb-3">
          <div class="col-md-6">
            <label class="form-label font-bold">Bidang Pengelola:</label>
            <select id="mv-bidang" class="retro-select">
              ${bidangList.map(b => `<option value="${b.id}" ${b.id === v.bidang ? 'selected' : ''}>${b.name}</option>`).join('')}
            </select>
          </div>
          <div class="col-md-6">
            <label class="form-label font-bold">Sumber Data:</label>
            <input type="text" id="mv-source" class="retro-input" value="${v.source || ''}">
          </div>
        </div>

        <h5 class="font-bold mt-4 mb-2">Nilai per Tahun:</h5>
        <div class="row g-2">
          ${years.map(yr => `
            <div class="col-md-4 col-6 mb-2">
              <label class="form-label small text-muted font-mono font-bold">Tahun ${yr}:</label>
              <input type="number" step="any" class="retro-input font-mono mv-year-val" data-year="${yr}" value="${v.values?.[yr] || 0}">
            </div>
          `).join('')}
        </div>
      </div>

      <div class="retro-modal-footer">
        <button class="retro-btn retro-btn-outline" onclick="App.closeModal()">Batal</button>
        <button class="retro-btn retro-btn-primary" onclick="MasterDataModule.submitSaveVariable()">
          <i data-lucide="check" class="icon-xs"></i> Perbarui Variabel
        </button>
      </div>
    `;

    App.openModal(`Edit Data Variabel: ${v.code}`, modalContent);
  },

  submitSaveVariable() {
    const editId = document.getElementById('mv-edit-id')?.value;
    const name = document.getElementById('mv-name')?.value.trim();
    const code = document.getElementById('mv-code')?.value.trim();
    const unit = document.getElementById('mv-unit')?.value.trim();
    const bidang = document.getElementById('mv-bidang')?.value;
    const source = document.getElementById('mv-source')?.value.trim();

    if (!name || !code) {
      App.showToast('Nama dan kode variabel wajib diisi!', 'danger');
      return;
    }

    const values = {};
    document.querySelectorAll('.mv-year-val').forEach(input => {
      const yr = input.getAttribute('data-year');
      values[yr] = parseFloat(input.value) || 0;
    });

    const variableObj = {
      id: editId || 'VAR-' + Date.now(),
      name,
      code,
      unit: unit || '',
      bidang,
      source,
      values
    };

    window.store.saveVariable(variableObj);
    App.closeModal();
    this.renderSubTab();
    App.showToast(`Variabel [${code}] berhasil disimpan!`, 'success');
  },

  deleteVariable(varId) {
    if (!window.store.canEditMaster()) {
      App.showToast('Hanya Super Admin yang berwenang menghapus variabel master!', 'warning');
      return;
    }

    if (confirm('Apakah Anda yakin ingin menghapus variabel perhitungan ini?')) {
      window.store.deleteVariable(varId);
      this.renderSubTab();
      App.showToast('Variabel berhasil dihapus.', 'info');
    }
  },

  syncAllCalculations() {
    const indicators = window.store.getIndicators();
    const years = window.store.getYears();
    let updatedCount = 0;

    indicators.forEach(ind => {
      years.forEach(yr => {
        const computed = window.store.computeIndicatorValue(ind.id, yr);
        if (computed !== null) {
          if (!ind.records) ind.records = {};
          if (!ind.records[yr]) ind.records[yr] = { target: 0, realisasi: 0 };
          ind.records[yr].realisasi = computed;
          updatedCount++;
        }
      });
    });

    window.store.saveData();
    DashboardModule.render();
    TreeModule.render();
    TargetRealisasiModule.render();
    App.showToast(`Sukses sinkronisasi! ${updatedCount} poin realisasi indikator berhasil dihitung ulang dari data dasar.`, 'success');
  },

  /* ----------------- 2. MASTER KATEGORI INDIKATOR ----------------- */
  renderCategories(container) {
    const categories = window.store.getCategories();
    const indicators = window.store.getIndicators();
    const canEdit = window.store.canEditMaster();

    container.innerHTML = `
      <div class="master-header-actions mb-3">
        <div>
          <h4 class="font-bold mb-1"><i data-lucide="layers" class="icon-sm text-primary"></i> Master Kategori Indikator</h4>
          <p class="text-muted small mb-0">Klasifikasi hierarki tingkatan indikator (Daerah, Utama, Program, Kegiatan) sesuai amanat perencanaan daerah.</p>
        </div>
        ${canEdit ? `
          <button class="retro-btn retro-btn-sm retro-btn-primary" onclick="MasterDataModule.openAddCategoryModal()">
            <i data-lucide="plus" class="icon-xs"></i> Tambah Kategori
          </button>
        ` : ''}
      </div>

      <div class="row g-3">
        ${categories.map(c => {
          const count = indicators.filter(i => i.categoryId === c.id).length;
          return `
            <div class="col-md-6 col-lg-3">
              <div class="retro-card h-100 p-3">
                <div class="d-flex align-items-center justify-content-between mb-2">
                  <span class="retro-badge" style="background-color: ${c.badgeColor || '#fbbf24'}; border: 2px solid #1e293b; color: #0f172a; font-weight: 700;">
                    ${c.code}
                  </span>
                  <span class="badge bg-white border-retro text-dark font-mono font-bold">${count} Indikator</span>
                </div>
                <h5 class="font-bold mt-2">${c.name}</h5>
                <p class="text-muted small mb-3">${c.desc}</p>
                
                ${canEdit ? `
                  <div class="d-flex justify-content-end gap-1 mt-auto">
                    <button class="retro-btn retro-btn-sm retro-btn-outline" onclick="MasterDataModule.openEditCategoryModal('${c.id}')">
                      <i data-lucide="edit" class="icon-xs"></i> Edit
                    </button>
                    <button class="retro-btn retro-btn-sm retro-btn-danger" onclick="MasterDataModule.deleteCategory('${c.id}')">
                      <i data-lucide="trash-2" class="icon-xs"></i>
                    </button>
                  </div>
                ` : ''}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  },

  openAddCategoryModal() {
    const nextSegment = window.store.getCategories().length + 1;
    const modalContent = `
      <div class="retro-modal-body">
        <div class="row g-2 mb-3">
          <div class="col-md-6">
            <label class="form-label font-bold small">Kode Kategori Singkat:</label>
            <input type="text" id="cat-code" class="retro-input font-bold" placeholder="Contoh: IKU, IKD, IKP, IKK, IKS">
            <span class="small text-muted" style="font-size: 0.75rem;">Singkatan tingkatan indikator (kapital)</span>
          </div>
          <div class="col-md-6">
            <label class="form-label font-bold small">Urutan Hierarki / Segmen (1, 2, 3..):</label>
            <input type="number" id="cat-segment" class="retro-input font-mono font-bold" min="1" max="20" value="${nextSegment}">
            <span class="small text-muted" style="font-size: 0.75rem;">Tingkatan hierarki perencanaan daerah</span>
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label font-bold small">Nama Lengkap Kategori:</label>
          <input type="text" id="cat-name" class="retro-input" placeholder="Contoh: Indikator Kinerja Sasaran Strategis Daerah">
        </div>

        <div class="mb-3">
          <label class="form-label font-bold small">Deskripsi / Ruang Lingkup Mandat:</label>
          <textarea id="cat-desc" class="retro-input" rows="2" placeholder="Jelaskan mandat atau peruntukan tingkatan indikator ini dalam RPJMD / Renstra..."></textarea>
        </div>

        <div class="mb-3">
          <label class="form-label font-bold small">Warna Aksen Badge Kategori:</label>
          <div class="d-flex align-items-center gap-3">
            <input type="color" id="cat-color" class="form-control form-control-color border-retro" value="#f97316" style="width: 50px; height: 38px;">
            <span class="small text-muted">Pilih warna penanda visual untuk kartu & badge dokumen</span>
          </div>
        </div>
      </div>
      <div class="retro-modal-footer">
        <button class="retro-btn retro-btn-outline" onclick="App.closeModal()">Batal</button>
        <button class="retro-btn retro-btn-primary" onclick="MasterDataModule.submitSaveCategory()">
          <i data-lucide="check" class="icon-xs"></i> Simpan Kategori Baru
        </button>
      </div>
    `;

    App.openModal('Tambah Master Kategori Indikator Baru', modalContent);
  },

  openEditCategoryModal(catId) {
    const cat = window.store.getCategories().find(c => c.id === catId);
    if (!cat) return;

    const modalContent = `
      <div class="retro-modal-body">
        <input type="hidden" id="cat-edit-id" value="${cat.id}">
        
        <div class="row g-2 mb-3">
          <div class="col-md-6">
            <label class="form-label font-bold small">Kode Kategori:</label>
            <input type="text" id="cat-code" class="retro-input font-bold" value="${cat.code}">
          </div>
          <div class="col-md-6">
            <label class="form-label font-bold small">Urutan Hierarki / Segmen:</label>
            <input type="number" id="cat-segment" class="retro-input font-mono font-bold" min="1" max="20" value="${cat.segmentNumber || 1}">
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label font-bold small">Nama Lengkap Kategori:</label>
          <input type="text" id="cat-name" class="retro-input" value="${cat.name}">
        </div>

        <div class="mb-3">
          <label class="form-label font-bold small">Deskripsi / Ruang Lingkup Mandat:</label>
          <textarea id="cat-desc" class="retro-input" rows="2">${cat.desc || ''}</textarea>
        </div>

        <div class="mb-3">
          <label class="form-label font-bold small">Warna Aksen Badge:</label>
          <div class="d-flex align-items-center gap-3">
            <input type="color" id="cat-color" class="form-control form-control-color border-retro" value="${cat.badgeColor || '#fbbf24'}" style="width: 50px; height: 38px;">
            <span class="small text-muted">Pilih warna aksen identitas kategori</span>
          </div>
        </div>
      </div>
      <div class="retro-modal-footer">
        <button class="retro-btn retro-btn-outline" onclick="App.closeModal()">Batal</button>
        <button class="retro-btn retro-btn-primary" onclick="MasterDataModule.submitSaveCategory()">
          <i data-lucide="check" class="icon-xs"></i> Perbarui Kategori
        </button>
      </div>
    `;

    App.openModal(`Edit Kategori Indikator: [${cat.code}]`, modalContent);
  },

  openCategoryManagerModal() {
    const categories = window.store.getCategories();
    const indicators = window.store.getIndicators();
    const canEdit = window.store.canEditMaster();

    const bodyHtml = `
      <div class="retro-modal-body">
        <div class="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom">
          <span class="small text-muted">Daftar kategori hierarki indikator kinerja yang terdaftar:</span>
          ${canEdit ? `
            <button class="adm-btn adm-btn-sm adm-btn-primary" onclick="MasterDataModule.openAddCategoryModal()">
              <i data-lucide="plus" class="icon-xs"></i> Tambah Kategori Baru
            </button>
          ` : ''}
        </div>

        <div class="retro-table-wrap">
          <table class="retro-table">
            <thead>
              <tr>
                <th style="width: 50px;" class="text-center">Segmen</th>
                <th style="width: 90px;">Kode</th>
                <th>Nama Kategori & Deskripsi</th>
                <th style="width: 100px;" class="text-center">Indikator</th>
                ${canEdit ? '<th style="width: 110px;" class="text-center">Aksi</th>' : ''}
              </tr>
            </thead>
            <tbody>
              ${categories.map(c => {
                const count = indicators.filter(i => i.categoryId === c.id).length;
                return `
                  <tr>
                    <td class="text-center font-mono font-bold">${c.segmentNumber || '-'}</td>
                    <td>
                      <span class="badge font-mono font-bold" style="background-color: ${c.badgeColor || '#fbbf24'}; color: #0f172a; border: 1px solid #1e293b;">
                        ${c.code}
                      </span>
                    </td>
                    <td>
                      <strong class="d-block text-dark">${c.name}</strong>
                      <span class="small text-muted">${c.desc || '-'}</span>
                    </td>
                    <td class="text-center font-mono font-bold">${count}</td>
                    ${canEdit ? `
                      <td class="text-center">
                        <div class="d-flex justify-content-center gap-1">
                          <button class="adm-btn adm-btn-xs adm-btn-outline" onclick="MasterDataModule.openEditCategoryModal('${c.id}')" title="Edit Kategori">
                            <i data-lucide="edit" class="icon-xs"></i>
                          </button>
                          <button class="adm-btn adm-btn-xs adm-btn-danger" onclick="MasterDataModule.deleteCategory('${c.id}')" title="Hapus Kategori">
                            <i data-lucide="trash-2" class="icon-xs"></i>
                          </button>
                        </div>
                      </td>
                    ` : ''}
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
      <div class="retro-modal-footer">
        <button class="retro-btn retro-btn-outline" onclick="App.closeModal()">Tutup</button>
      </div>
    `;

    App.openModal('Kelola Master Kategori Indikator', bodyHtml);
  },

  submitSaveCategory() {
    const id = document.getElementById('cat-edit-id')?.value;
    const code = document.getElementById('cat-code')?.value.trim();
    const segmentNumber = parseInt(document.getElementById('cat-segment')?.value, 10) || (window.store.getCategories().length + 1);
    const name = document.getElementById('cat-name')?.value.trim();
    const desc = document.getElementById('cat-desc')?.value.trim();
    const badgeColor = document.getElementById('cat-color')?.value;

    if (!code || !name) {
      App.showToast('Kode dan nama kategori wajib diisi!', 'danger');
      return;
    }

    const catObj = {
      id: id || code.toLowerCase().replace(/[^a-z0-9]/g, '_'),
      code: code.toUpperCase(),
      segmentNumber,
      name,
      desc,
      badgeColor
    };

    window.store.saveCategory(catObj);
    App.closeModal();

    // Re-render and synchronize all UI modules across the entire app
    this.renderSubTab();
    if (window.MasterIndikatorModule) {
      window.MasterIndikatorModule.populateFilters();
      window.MasterIndikatorModule.render();
    }
    if (window.TargetRealisasiModule) {
      window.TargetRealisasiModule.populateFilters();
      window.TargetRealisasiModule.render();
    }
    if (window.DashboardModule) {
      window.DashboardModule.populateSelectors();
    }
    if (window.LaporanModule) {
      window.LaporanModule.populateSelectors();
      window.LaporanModule.renderPreview();
    }
    if (window.TreeModule) {
      window.TreeModule.render();
    }
    if (window.PublicPortalModule) {
      window.PublicPortalModule.renderCards();
      window.PublicPortalModule.renderMatrix();
    }

    App.showToast(`Kategori [${catObj.code}] berhasil disimpan & disinkronkan!`, 'success');
  },

  deleteCategory(catId) {
    if (!window.store.canEditMaster()) {
      App.showToast('Hanya Super Admin atau Aparatur Berwenang yang dapat menghapus kategori master!', 'warning');
      return;
    }

    const count = window.store.getIndicators().filter(i => i.categoryId === catId).length;
    if (count > 0) {
      App.showToast(`Kategori tidak dapat dihapus karena masih digunakan oleh ${count} indikator!`, 'warning');
      return;
    }

    if (confirm('Apakah Anda yakin ingin menghapus kategori ini dari sistem?')) {
      window.store.deleteCategory(catId);
      this.renderSubTab();
      if (window.MasterIndikatorModule) {
        window.MasterIndikatorModule.populateFilters();
        window.MasterIndikatorModule.render();
      }
      if (window.TreeModule) window.TreeModule.render();
      if (window.LaporanModule) window.LaporanModule.populateSelectors();
      App.closeModal();
      App.showToast('Kategori berhasil dihapus.', 'info');
    }
  },

  /* ----------------- 3. MASTER BIDANG ----------------- */
  renderBidang(container) {
    const bidangList = window.store.getBidang();
    const indicators = window.store.getIndicators();

    container.innerHTML = `
      <div class="master-header-actions mb-3">
        <div>
          <h4 class="font-bold mb-1"><i data-lucide="building-2" class="icon-sm text-primary"></i> Master Unit Kerja & Bidang Teknis</h4>
          <p class="text-muted small mb-0">Struktur unit organisasi pada Dinas Pekerjaan Umum dan Penataan Ruang Kabupaten Demak.</p>
        </div>
      </div>

      <div class="row g-3">
        ${bidangList.map(b => {
          const count = indicators.filter(i => i.bidangId === b.id).length;
          return `
            <div class="col-md-4">
              <div class="retro-card p-3">
                <div class="d-flex align-items-center justify-content-between mb-2">
                  <span class="retro-badge bg-white border-retro font-mono font-bold">${b.code}</span>
                  <span class="badge border-retro bg-primary-subtle text-dark">${count} Indikator</span>
                </div>
                <h5 class="font-bold mt-2">${b.name}</h5>
                <p class="text-muted small mb-0">Penanggung Jawab: <strong>${b.head}</strong></p>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  },

  /* ----------------- 4. MASTER TAHUN ----------------- */
  renderYears(container) {
    const years = window.store.getYears();
    const visibleYears = window.store.getVisibleYears();
    const activeYear = window.store.getActiveYear();
    const isSuperAdmin = window.store.canEditMaster();

    container.innerHTML = `
      <div class="master-header-actions mb-3">
        <div>
          <h4 class="font-bold mb-1"><i data-lucide="calendar" class="icon-sm text-primary"></i> Master Tahun Anggaran & Tampilan Publik</h4>
          <p class="text-muted small mb-0">Kelola daftar tahun anggaran, tambah tahun baru, dan tentukan tahun apa saja yang ditampilkan di Portal Publik.</p>
        </div>
        ${isSuperAdmin ? `
          <div class="d-flex flex-wrap gap-2">
            <button class="adm-btn adm-btn-sm adm-btn-primary" onclick="TargetRealisasiModule.openAddYearModal()">
              <i data-lucide="plus" class="icon-xs"></i> Tambah Tahun Baru
            </button>
            <button class="adm-btn adm-btn-sm adm-btn-outline" onclick="TargetRealisasiModule.openManageYearVisibilityModal()">
              <i data-lucide="eye" class="icon-xs"></i> Atur Tampilan Tahun Publik
            </button>
            <button class="adm-btn adm-btn-sm adm-btn-danger" onclick="TargetRealisasiModule.openDeleteYearModal()">
              <i data-lucide="trash-2" class="icon-xs"></i> Hapus Tahun
            </button>
          </div>
        ` : ''}
      </div>

      <div class="d-flex flex-wrap gap-3">
        ${years.map(yr => {
          const isVis = visibleYears.includes(yr);
          const isAct = yr === activeYear;
          return `
            <div class="adm-card p-3 text-center" style="min-width: 160px;">
              <span class="font-mono text-muted small d-block mb-1">Tahun Anggaran</span>
              <h3 class="font-mono font-bold mb-1 text-dark">${yr}</h3>
              <div class="d-flex flex-column gap-1 mt-2">
                ${isVis ? '<span class="badge bg-success-subtle text-success border small font-mono">Tampil di Publik</span>' : '<span class="badge bg-secondary-subtle text-muted border small font-mono">Hanya Admin</span>'}
                ${isAct ? '<span class="badge bg-warning-subtle text-warning border small font-mono font-bold">Tahun Aktif</span>' : ''}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  },

  /* ----------------- 5. ROLES & HAK AKSES PENGGUNA ----------------- */
  renderRoles(container) {
    const roles = window.store.data.roles;
    const activeRole = window.store.getActiveRole();

    container.innerHTML = `
      <div class="master-header-actions mb-3">
        <div>
          <h4 class="font-bold mb-1"><i data-lucide="shield" class="icon-sm text-primary"></i> Matriks Role & Kewenangan Pengguna (RBAC)</h4>
          <p class="text-muted small mb-0">7 Level pengguna yang dikonfigurasikan pada Sistem Monitoring Capaian DINPUTARU Kabupaten Demak.</p>
        </div>
      </div>

      <div class="retro-table-wrap">
        <table class="retro-table">
          <thead>
            <tr>
              <th style="width: 220px;">Jabatan / Role Pengguna</th>
              <th>Deskripsi & Mandat Kewenangan</th>
              <th class="text-center" style="width: 120px;">Kelola Master</th>
              <th class="text-center" style="width: 120px;">Set Target</th>
              <th class="text-center" style="width: 120px;">Input Realisasi</th>
              <th class="text-center" style="width: 120px;">Bank Data</th>
              <th class="text-center" style="width: 120px;">Pengesahan</th>
              <th class="text-center" style="width: 120px;">Status Simulasi</th>
            </tr>
          </thead>
          <tbody>
            ${roles.map(r => {
              const isCurrent = r.id === activeRole.id;
              const isSuper = r.id === 'super_admin';
              const isKadin = r.id === 'kepala_dinas';
              const isSekdin = r.id === 'sekretaris';
              const isKabid = r.id === 'kepala_bidang';
              const isKoor = r.id === 'koordinator_bidang';
              const isProgram = r.id === 'kasubag_program_keuangan';
              const isUmum = r.id === 'kasubag_umum_kepegawaian';

              return `
                <tr class="${isCurrent ? 'table-warning' : ''}">
                  <td class="font-bold">
                    <div class="d-flex align-items-center gap-2">
                      <i data-lucide="user-check" class="icon-sm text-primary"></i>
                      <span>${r.name}</span>
                    </div>
                  </td>
                  <td class="small text-muted">${r.desc}</td>
                  <td class="text-center">${isSuper ? '✅ Full' : '❌'}</td>
                  <td class="text-center">${isSuper || isProgram ? '✅ Ya' : '❌'}</td>
                  <td class="text-center">${isSuper || isKabid || isKoor || isProgram ? '✅ Ya' : '❌'}</td>
                  <td class="text-center">${isSuper || isKabid || isKoor || isProgram || isUmum ? '✅ Ya' : '❌'}</td>
                  <td class="text-center">${isSuper || isKadin || isSekdin ? '✅ Pengesahan' : '❌'}</td>
                  <td class="text-center">
                    ${isCurrent ? `
                      <span class="badge bg-primary text-white border-retro">Aktif Saat Ini</span>
                    ` : `
                      <button class="retro-btn retro-btn-xs retro-btn-outline" onclick="window.store.setActiveRole('${r.id}'); MasterDataModule.renderSubTab();">
                        Pilih Role
                      </button>
                    `}
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  }
};

window.MasterDataModule = MasterDataModule;
