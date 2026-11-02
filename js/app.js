/**
 * SIDAT - SATUPUTARU - Main Application Controller v2
 * Mengelola Routing Portal Publik vs Panel Admin, Navigasi Tab, Modals, Toasts, dan Lifecycle
 */

const App = {
  currentMode: 'public', // 'public' or 'admin'
  currentTab: 'target-realisasi', // Menu Utama sesuai permintaan: Input Realisasi & Target

  init() {
    // Check url hash or query param if any
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('mode') === 'admin' && window.store.isLoggedIn()) {
      this.currentMode = 'admin';
    }

    this.bindNavigation();
    this.bindGlobalModals();
    this.bindModeSwitcher();

    // Initialize all submodules
    if (window.Auth) window.Auth.init();
    if (window.SystemSettingsModule) {
      window.SystemSettingsModule.init();
      window.SystemSettingsModule.applyTextsToDOM(window.store.getSystemInfo());
    }
    if (window.PublicPortalModule) window.PublicPortalModule.init();
    if (window.DashboardModule) window.DashboardModule.init();
    if (window.TreeModule) window.TreeModule.init();
    if (window.TargetRealisasiModule) window.TargetRealisasiModule.init();
    if (window.BankDataModule) window.BankDataModule.init();
    if (window.MasterIndikatorModule) window.MasterIndikatorModule.init();
    if (window.LaporanModule) window.LaporanModule.init();
    if (window.UserManagementModule) window.UserManagementModule.init();
    if (window.MasterDataModule) window.MasterDataModule.init();

    // Render Lucide icons
    if (window.lucide) window.lucide.createIcons();

    // Subscribe to store updates
    window.store.subscribe((data) => {
      this.updateGlobalHeaderStats();
      if (window.SystemSettingsModule && data.systemInfo) {
        window.SystemSettingsModule.applyTextsToDOM(data.systemInfo);
      }
    });

    this.updateGlobalHeaderStats();
    this.applyModeUI();
  },

  /* ----------------- MODE SWITCHER (PORTAL PUBLIK VS PANEL ADMIN) ----------------- */
  bindModeSwitcher() {
    const btnToAdmin = document.getElementById('btn-switch-to-admin');
    const btnToPublic = document.getElementById('btn-switch-to-public');
    const btnHeaderLaporan = document.getElementById('btn-header-laporan');
    const btnHeaderAddInd = document.getElementById('btn-header-add-ind');

    if (btnToAdmin) {
      btnToAdmin.addEventListener('click', () => {
        if (!window.store.isLoggedIn()) {
          window.Auth.openLoginModal();
        } else {
          this.switchMode('admin');
        }
      });
    }

    if (btnToPublic) {
      btnToPublic.addEventListener('click', () => {
        this.switchMode('public');
      });
    }

    if (btnHeaderLaporan) {
      btnHeaderLaporan.addEventListener('click', () => {
        if (this.currentMode === 'public') {
          if (window.PublicPortalModule) {
            window.PublicPortalModule.switchPubTab('laporan');
          }
        } else {
          this.switchTab('laporan');
        }
      });
    }

    if (btnHeaderAddInd) {
      btnHeaderAddInd.addEventListener('click', () => {
        if (window.TargetRealisasiModule) {
          window.TargetRealisasiModule.openAddIndicatorModal();
        }
      });
    }
  },

  switchMode(mode) {
    this.currentMode = mode;
    this.applyModeUI();

    if (mode === 'public') {
      if (window.PublicPortalModule) window.PublicPortalModule.render();
    } else {
      this.switchTab(this.currentTab || 'dashboard');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  applyModeUI() {
    const publicContainer = document.getElementById('public-portal-container');
    const adminContainer = document.getElementById('admin-panel-container');
    const adminNavBar = document.getElementById('admin-nav-bar');
    const btnToAdmin = document.getElementById('btn-switch-to-admin');
    const btnToPublic = document.getElementById('btn-switch-to-public');

    if (this.currentMode === 'public') {
      document.body.classList.add('theme-public-orange');
      document.body.classList.remove('theme-admin-white');

      if (publicContainer) publicContainer.style.display = 'block';
      if (adminContainer) adminContainer.style.display = 'none';
      if (adminNavBar) adminNavBar.style.display = 'none';

      if (btnToPublic) btnToPublic.classList.add('active-mode-btn');
      if (btnToAdmin) btnToAdmin.classList.remove('active-mode-btn');
    } else {
      document.body.classList.remove('theme-public-orange');
      document.body.classList.add('theme-admin-white');

      if (publicContainer) publicContainer.style.display = 'none';
      if (adminContainer) adminContainer.style.display = 'block';
      if (adminNavBar) adminNavBar.style.display = 'block';

      if (btnToPublic) btnToPublic.classList.remove('active-mode-btn');
      if (btnToAdmin) btnToAdmin.classList.add('active-mode-btn');
    }

    if (window.lucide) window.lucide.createIcons();
  },

  /* ----------------- ADMIN NAVIGATION TABS ----------------- */
  bindNavigation() {
    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = e.currentTarget.getAttribute('data-tab');
        if (tab) this.switchTab(tab);
      });
    });
  },

  switchTab(tabId) {
    this.currentTab = tabId;

    // Check permission for User Management & System Settings
    if ((tabId === 'manajemen-user' || tabId === 'pengaturan-teks') && !window.store.canManageUsers()) {
      this.showToast('Halaman ini khusus dapat diakses oleh Super Admin!', 'warning');
      return;
    }

    // Update nav tab buttons
    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      if (btn.getAttribute('data-tab') === tabId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update tab content panes
    document.querySelectorAll('.tab-pane-content').forEach(pane => {
      pane.classList.remove('active');
    });

    const activePane = document.getElementById(`tab-pane-${tabId}`);
    if (activePane) {
      activePane.classList.add('active');
    }

    // Refresh submodules
    if (tabId === 'target-realisasi' && window.TargetRealisasiModule) {
      window.TargetRealisasiModule.render();
    } else if (tabId === 'dashboard' && window.DashboardModule) {
      window.DashboardModule.render();
    } else if (tabId === 'capaian' && window.TreeModule) {
      window.TreeModule.render();
    } else if (tabId === 'laporan' && window.LaporanModule) {
      window.LaporanModule.render();
    } else if (tabId === 'bank-data' && window.BankDataModule) {
      window.BankDataModule.render();
    } else if (tabId === 'master-indikator' && window.MasterIndikatorModule) {
      window.MasterIndikatorModule.render();
    } else if (tabId === 'master-data' && window.MasterDataModule) {
      window.MasterDataModule.render();
    } else if (tabId === 'manajemen-user' && window.UserManagementModule) {
      window.UserManagementModule.render();
    } else if (tabId === 'pengaturan-teks' && window.SystemSettingsModule) {
      window.SystemSettingsModule.render();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.lucide) window.lucide.createIcons();
  },

  updateGlobalHeaderStats() {
    const indicators = window.store.getIndicators();
    const years = window.store.getYears();
    const latestYear = years[years.length - 1];
    const docs = window.store.getDocuments();

    let achieved = 0;
    indicators.forEach(ind => {
      const rec = ind.records?.[latestYear];
      if (rec && rec.target > 0) {
        const pct = window.store.calculateCapaian(rec.target, rec.realisasi, ind.polarization);
        if (pct >= 100) achieved++;
      }
    });

    const elTotalInd = document.getElementById('header-stat-total-ind');
    const elAchieved = document.getElementById('header-stat-achieved');
    const elTotalDocs = document.getElementById('header-stat-docs');

    if (elTotalInd) elTotalInd.textContent = indicators.length;
    if (elAchieved) elAchieved.textContent = `${achieved} / ${indicators.length}`;
    if (elTotalDocs) elTotalDocs.textContent = docs.length;
  },

  /* ----------------- MODAL SYSTEM ----------------- */
  openModal(title, bodyHtml) {
    const modalOverlay = document.getElementById('global-modal-overlay');
    const modalTitle = document.getElementById('global-modal-title');
    const modalContent = document.getElementById('global-modal-content');
    const dialog = document.querySelector('.retro-modal-dialog');

    if (!modalOverlay || !modalTitle || !modalContent) return;

    if (dialog) dialog.classList.remove('login-dialog-compact');
    modalTitle.innerHTML = title;
    modalContent.innerHTML = bodyHtml;
    modalOverlay.classList.add('show');
    document.body.classList.add('modal-open');

    if (window.lucide) window.lucide.createIcons();
  },

  closeModal() {
    const modalOverlay = document.getElementById('global-modal-overlay');
    const dialog = document.querySelector('.retro-modal-dialog');
    if (dialog) dialog.classList.remove('login-dialog-compact');
    if (modalOverlay) {
      modalOverlay.classList.remove('show');
      document.body.classList.remove('modal-open');
    }
  },

  bindGlobalModals() {
    const overlay = document.getElementById('global-modal-overlay');
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          this.closeModal();
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeModal();
      }
    });

    const btnNewInd = document.getElementById('btn-global-add-indicator');
    if (btnNewInd) {
      btnNewInd.addEventListener('click', () => {
        this.openAddIndicatorModal();
      });
    }
  },

  /* ----------------- INDICATOR CRUD MODALS ----------------- */
  openAddIndicatorModal() {
    if (!window.store.canInputIndicatorsAndTargets()) {
      this.showToast('Hanya Koordinator Bidang dan Super Admin yang berwenang menambah indikator!', 'warning');
      return;
    }

    const categories = window.store.getCategories();
    const bidangList = window.store.getBidang();
    const years = window.store.getYears();

    const bodyHtml = `
      <div class="retro-modal-body">
        <div class="row g-2 mb-3">
          <div class="col-md-4">
            <label class="form-label font-bold">Kode Indikator:</label>
            <input type="text" id="modal-ind-code" class="retro-input font-mono font-bold" placeholder="Contoh: IKU-03">
          </div>
          <div class="col-md-4">
            <label class="form-label font-bold">Kategori Indikator:</label>
            <select id="modal-ind-cat" class="retro-select">
              ${categories.map(c => `<option value="${c.id}">${c.code} - ${c.name}</option>`).join('')}
            </select>
          </div>
          <div class="col-md-4">
            <label class="form-label font-bold">Bidang Pengampu:</label>
            <select id="modal-ind-bidang" class="retro-select">
              ${bidangList.map(b => `<option value="${b.id}">${b.name}</option>`).join('')}
            </select>
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label font-bold">Nama Indikator Kinerja:</label>
          <input type="text" id="modal-ind-name" class="retro-input" placeholder="Contoh: Persentase Jaringan Irigasi Primer Kondisi Mantap">
        </div>

        <div class="row g-2 mb-3">
          <div class="col-md-6">
            <label class="form-label font-bold">Wewenang Bidang yang Menangani:</label>
            <input type="text" id="modal-ind-wewenang" class="retro-input font-bold" placeholder="Contoh: Bidang Sumber Daya Air">
          </div>
          <div class="col-md-6">
            <label class="form-label font-bold">Pejabat Pembina / Penanggung Jawab:</label>
            <input type="text" id="modal-ind-pejabat" class="retro-input" placeholder="Contoh: Kepala Bidang Sumber Daya Air">
          </div>
        </div>

        <div class="row g-2 mb-3">
          <div class="col-md-6">
            <label class="form-label font-bold">Satuan:</label>
            <input type="text" id="modal-ind-unit" class="retro-input font-mono" placeholder="Contoh: %, Km, Ha, Dokumen">
          </div>
          <div class="col-md-6">
            <label class="form-label font-bold">Arah Polarisasi:</label>
            <select id="modal-ind-polarization" class="retro-select">
              <option value="maximize">Maximize (Makin Tinggi Nilai Makin Baik)</option>
              <option value="minimize">Minimize (Makin Rendah Nilai Makin Baik)</option>
            </select>
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label font-bold">1. Definisi Operasional:</label>
          <textarea id="modal-ind-def" class="retro-input" rows="2" placeholder="Uraikan batasan konsep, metodologi teknis, dan ruang lingkup indikator..."></textarea>
        </div>

        <div class="mb-3">
          <label class="form-label font-bold">2. Formulasi Perhitungan:</label>
          <input type="text" id="modal-ind-formula" class="retro-input font-mono" placeholder="Contoh: (Panjang Irigasi Baik / Total Irigasi) × 100%">
        </div>

        <div class="mb-3">
          <label class="form-label font-bold">3. Sumber Data Resmi:</label>
          <input type="text" id="modal-ind-source" class="retro-input" placeholder="Contoh: Inventarisasi E-PAKSI Bidang SDA DINPUTARU Demak">
        </div>

        <h5 class="font-bold mt-4 mb-2">Target Awal Multi-Tahun:</h5>
        <div class="row g-2">
          ${years.map(yr => `
            <div class="col-md-3 col-6 mb-2">
              <label class="form-label small text-muted font-mono font-bold">Target Th ${yr}:</label>
              <input type="number" step="any" class="retro-input font-mono ind-init-target" data-year="${yr}" value="0">
            </div>
          `).join('')}
        </div>
      </div>

      <div class="retro-modal-footer">
        <button class="retro-btn retro-btn-outline" onclick="App.closeModal()">Batal</button>
        <button class="retro-btn retro-btn-primary" onclick="App.submitAddIndicator()">
          <i data-lucide="check" class="icon-xs"></i> Simpan Indikator Baru
        </button>
      </div>
    `;

    this.openModal('Tambah Indikator Kinerja Baru', bodyHtml);
  },

  submitAddIndicator() {
    const code = document.getElementById('modal-ind-code')?.value.trim();
    const name = document.getElementById('modal-ind-name')?.value.trim();
    const cat = document.getElementById('modal-ind-cat')?.value;
    const bidang = document.getElementById('modal-ind-bidang')?.value;
    const wewenang = document.getElementById('modal-ind-wewenang')?.value.trim();
    const pejabat = document.getElementById('modal-ind-pejabat')?.value.trim();
    const unit = document.getElementById('modal-ind-unit')?.value.trim() || '%';
    const polarization = document.getElementById('modal-ind-polarization')?.value;
    const def = document.getElementById('modal-ind-def')?.value.trim();
    const formula = document.getElementById('modal-ind-formula')?.value.trim();
    const source = document.getElementById('modal-ind-source')?.value.trim();

    if (!code || !name) {
      this.showToast('Kode dan nama indikator wajib diisi!', 'danger');
      return;
    }

    const records = {};
    document.querySelectorAll('.ind-init-target').forEach(input => {
      const yr = input.getAttribute('data-year');
      records[yr] = {
        target: parseFloat(input.value) || 0,
        realisasi: 0,
        notes: 'Target awal penetapan'
      };
    });

    const newInd = {
      id: 'IND-' + Date.now(),
      code,
      name,
      categoryId: cat,
      bidangId: bidang,
      wewenangBidang: wewenang || 'Bidang Terkait DINPUTARU',
      pejabatPenanggungJawab: pejabat || 'Kepala Bidang',
      seksiPelaksana: 'Seksi Teknis Pelaksana',
      unit,
      polarization,
      definition: def,
      formula,
      source,
      records
    };

    window.store.saveIndicator(newInd);
    this.closeModal();
    if (window.TreeModule) TreeModule.render();
    if (window.DashboardModule) DashboardModule.populateSelectors();
    if (window.TargetRealisasiModule) TargetRealisasiModule.render();
    if (window.PublicPortalModule) PublicPortalModule.render();
    this.showToast(`Indikator [${code}] berhasil ditambahkan!`, 'success');
  },

  openEditIndicatorModal(indId) {
    if (!window.store.canInputIndicatorsAndTargets()) {
      this.showToast('Anda tidak memiliki wewenang untuk mengedit indikator!', 'warning');
      return;
    }

    const ind = window.store.getIndicatorById(indId);
    if (!ind) return;

    const categories = window.store.getCategories();
    const bidangList = window.store.getBidang();

    const bodyHtml = `
      <div class="retro-modal-body">
        <input type="hidden" id="modal-ind-id" value="${ind.id}">
        
        <div class="row g-2 mb-3">
          <div class="col-md-4">
            <label class="form-label font-bold">Kode Indikator:</label>
            <input type="text" id="modal-ind-code" class="retro-input font-mono font-bold" value="${ind.code}">
          </div>
          <div class="col-md-4">
            <label class="form-label font-bold">Kategori Indikator:</label>
            <select id="modal-ind-cat" class="retro-select">
              ${categories.map(c => `<option value="${c.id}" ${c.id === ind.categoryId ? 'selected' : ''}>${c.code} - ${c.name}</option>`).join('')}
            </select>
          </div>
          <div class="col-md-4">
            <label class="form-label font-bold">Bidang Pengampu:</label>
            <select id="modal-ind-bidang" class="retro-select">
              ${bidangList.map(b => `<option value="${b.id}" ${b.id === ind.bidangId ? 'selected' : ''}>${b.name}</option>`).join('')}
            </select>
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label font-bold">Nama Indikator Kinerja:</label>
          <input type="text" id="modal-ind-name" class="retro-input" value="${ind.name}">
        </div>

        <div class="row g-2 mb-3">
          <div class="col-md-6">
            <label class="form-label font-bold">Wewenang Bidang yang Menangani:</label>
            <input type="text" id="modal-ind-wewenang" class="retro-input font-bold" value="${ind.wewenangBidang || ''}">
          </div>
          <div class="col-md-6">
            <label class="form-label font-bold">Pejabat Pembina:</label>
            <input type="text" id="modal-ind-pejabat" class="retro-input" value="${ind.pejabatPenanggungJawab || ''}">
          </div>
        </div>

        <div class="row g-2 mb-3">
          <div class="col-md-6">
            <label class="form-label font-bold">Satuan:</label>
            <input type="text" id="modal-ind-unit" class="retro-input font-mono" value="${ind.unit}">
          </div>
          <div class="col-md-6">
            <label class="form-label font-bold">Arah Polarisasi:</label>
            <select id="modal-ind-polarization" class="retro-select">
              <option value="maximize" ${ind.polarization === 'maximize' ? 'selected' : ''}>Maximize (Makin Tinggi Makin Baik)</option>
              <option value="minimize" ${ind.polarization === 'minimize' ? 'selected' : ''}>Minimize (Makin Rendah Makin Baik)</option>
            </select>
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label font-bold">1. Definisi Operasional:</label>
          <textarea id="modal-ind-def" class="retro-input" rows="3">${ind.definition || ''}</textarea>
        </div>

        <div class="mb-3">
          <label class="form-label font-bold">2. Formulasi Perhitungan:</label>
          <input type="text" id="modal-ind-formula" class="retro-input font-mono" value="${ind.formula || ''}">
        </div>

        <div class="mb-3">
          <label class="form-label font-bold">3. Sumber Data:</label>
          <input type="text" id="modal-ind-source" class="retro-input" value="${ind.source || ''}">
        </div>
      </div>

      <div class="retro-modal-footer">
        <button class="retro-btn retro-btn-outline" onclick="App.closeModal()">Batal</button>
        <button class="retro-btn retro-btn-primary" onclick="App.submitEditIndicator()">
          <i data-lucide="check" class="icon-xs"></i> Simpan Perubahan
        </button>
      </div>
    `;

    this.openModal(`Edit Indikator: ${ind.code}`, bodyHtml);
  },

  submitEditIndicator() {
    const id = document.getElementById('modal-ind-id')?.value;
    const code = document.getElementById('modal-ind-code')?.value.trim();
    const name = document.getElementById('modal-ind-name')?.value.trim();
    const cat = document.getElementById('modal-ind-cat')?.value;
    const bidang = document.getElementById('modal-ind-bidang')?.value;
    const wewenang = document.getElementById('modal-ind-wewenang')?.value.trim();
    const pejabat = document.getElementById('modal-ind-pejabat')?.value.trim();
    const unit = document.getElementById('modal-ind-unit')?.value.trim() || '%';
    const polarization = document.getElementById('modal-ind-polarization')?.value;
    const def = document.getElementById('modal-ind-def')?.value.trim();
    const formula = document.getElementById('modal-ind-formula')?.value.trim();
    const source = document.getElementById('modal-ind-source')?.value.trim();

    if (!code || !name) {
      this.showToast('Kode dan nama indikator wajib diisi!', 'danger');
      return;
    }

    const updated = {
      id,
      code,
      name,
      categoryId: cat,
      bidangId: bidang,
      wewenangBidang: wewenang,
      pejabatPenanggungJawab: pejabat,
      unit,
      polarization,
      definition: def,
      formula,
      source
    };

    window.store.saveIndicator(updated);
    this.closeModal();
    if (window.TreeModule) {
      TreeModule.render();
      TreeModule.renderDetail(id);
    }
    if (window.DashboardModule) {
      DashboardModule.populateSelectors();
      DashboardModule.render();
    }
    if (window.TargetRealisasiModule) TargetRealisasiModule.render();
    if (window.PublicPortalModule) PublicPortalModule.render();
    this.showToast(`Indikator [${code}] berhasil diperbarui!`, 'success');
  },

  deleteIndicator(indId) {
    if (!window.store.canManageUsers()) {
      this.showToast('Hanya Super Admin yang berwenang menghapus indikator!', 'warning');
      return;
    }

    const ind = window.store.getIndicatorById(indId);
    if (!ind) return;

    if (confirm(`Apakah Anda yakin ingin menghapus indikator [${ind.code}] ${ind.name}? Semua data target dan realisasinya akan dihapus permanen.`)) {
      window.store.deleteIndicator(indId);
      if (window.TreeModule) {
        TreeModule.selectedIndicatorId = null;
        TreeModule.render();
      }
      if (window.DashboardModule) {
        DashboardModule.populateSelectors();
        DashboardModule.render();
      }
      if (window.TargetRealisasiModule) TargetRealisasiModule.render();
      if (window.PublicPortalModule) PublicPortalModule.render();
      this.showToast(`Indikator [${ind.code}] berhasil dihapus.`, 'info');
    }
  },

  /* ----------------- RECORD (TARGET & REALISASI) EDITOR ----------------- */
  openRecordEditor(indId) {
    const ind = window.store.getIndicatorById(indId);
    if (!ind) return;

    const years = window.store.getYears();
    const canInput = window.store.canInputIndicatorsAndTargets();

    const bodyHtml = `
      <div class="glass-modal-body">
        <input type="hidden" id="rec-edit-ind-id" value="${ind.id}">
        
        <div class="glass-card p-3 mb-3 bg-light">
          <div class="d-flex align-items-center gap-2 mb-1">
            <span class="badge-glass badge-glass-blue font-mono font-bold">${ind.code}</span>
            <strong class="text-dark">${ind.name}</strong>
          </div>
          <div class="small text-muted">
            Wewenang Bidang: <strong class="text-dark">${ind.wewenangBidang || '-'}</strong> | Satuan: <strong class="font-mono text-dark">${ind.unit}</strong>
          </div>
        </div>

        <div class="table-modern-wrap">
          <table class="modern-table">
            <thead>
              <tr>
                <th style="width: 80px;" class="text-center">Tahun</th>
                <th style="width: 140px;">Target (${ind.unit})</th>
                <th style="width: 140px;">Realisasi (${ind.unit})</th>
                <th>Catatan & Kendala Lapangan</th>
              </tr>
            </thead>
            <tbody>
              ${years.map(yr => {
                const rec = ind.records?.[yr] || { target: 0, realisasi: 0, notes: '' };
                return `
                  <tr>
                    <td class="text-center font-mono font-bold">${yr}</td>
                    <td>
                      <input type="number" step="any" class="glass-input font-mono rec-input-target" data-year="${yr}" value="${rec.target}" ${!canInput ? 'disabled' : ''}>
                    </td>
                    <td>
                      <input type="number" step="any" class="glass-input font-mono font-bold rec-input-realisasi" data-year="${yr}" value="${rec.realisasi}" ${!canInput ? 'disabled' : ''}>
                    </td>
                    <td>
                      <input type="text" class="glass-input rec-input-notes" data-year="${yr}" value="${rec.notes || ''}" placeholder="Catatan...">
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <div class="glass-modal-footer">
        <button class="glass-btn glass-btn-outline" onclick="App.closeModal()">Batal</button>
        ${canInput ? `
          <button class="glass-btn glass-btn-primary" onclick="App.submitSaveRecords()">
            <i data-lucide="save" class="icon-xs"></i> Simpan Target & Realisasi
          </button>
        ` : ''}
      </div>
    `;

    this.openModal(`Input Data Target & Realisasi: ${ind.code}`, bodyHtml);
  },

  submitSaveRecords() {
    const indId = document.getElementById('rec-edit-ind-id')?.value;
    const ind = window.store.getIndicatorById(indId);
    if (!ind) return;

    if (!ind.records) ind.records = {};

    document.querySelectorAll('.rec-input-target').forEach(input => {
      const yr = input.getAttribute('data-year');
      const val = parseFloat(input.value) || 0;
      if (!ind.records[yr]) ind.records[yr] = { target: 0, realisasi: 0, notes: '' };
      ind.records[yr].target = val;
    });

    document.querySelectorAll('.rec-input-realisasi').forEach(input => {
      const yr = input.getAttribute('data-year');
      const val = parseFloat(input.value) || 0;
      if (!ind.records[yr]) ind.records[yr] = { target: 0, realisasi: 0, notes: '' };
      ind.records[yr].realisasi = val;
    });

    document.querySelectorAll('.rec-input-notes').forEach(input => {
      const yr = input.getAttribute('data-year');
      if (ind.records[yr]) {
        ind.records[yr].notes = input.value.trim();
      }
    });

    window.store.saveData();
    this.closeModal();
    if (window.TreeModule) {
      TreeModule.render();
      TreeModule.renderDetail(ind.id);
    }
    if (window.DashboardModule) DashboardModule.render();
    if (window.TargetRealisasiModule) TargetRealisasiModule.render();
    if (window.MasterIndikatorModule) MasterIndikatorModule.render();
    if (window.PublicPortalModule) PublicPortalModule.render();
    this.showToast(`Target & Realisasi indikator [${ind.code}] berhasil disimpan!`, 'success');
  },

  /* ----------------- DOCUMENT PREVIEW MODAL ----------------- */
  openDocumentPreview(docId) {
    const doc = window.store.getDocumentById(docId);
    if (!doc) return;

    const bidang = window.store.getBidang().find(b => b.id === doc.bidangId);

    const bodyHtml = `
      <div class="retro-modal-body">
        <div class="d-flex align-items-center gap-3 mb-3 p-3 bg-light border-retro">
          <div class="bd-file-type-badge ${doc.fileType.toLowerCase()}">
            <span>${doc.fileType}</span>
          </div>
          <div>
            <h5 class="font-bold mb-1">${doc.title}</h5>
            <span class="text-muted small font-mono">ID: ${doc.id} • Tanggal: ${doc.date}</span>
          </div>
        </div>

        <div class="retro-grid-2 gap-3 mb-3">
          <div class="p-3 bg-white border-retro">
            <span class="small text-muted d-block mb-1">Bidang Penanggung Jawab:</span>
            <span class="font-bold">${bidang ? bidang.name : '-'}</span>
          </div>
          <div class="p-3 bg-white border-retro">
            <span class="small text-muted d-block mb-1">Kategori Dokumen:</span>
            <span class="font-bold">${doc.category}</span>
          </div>
          <div class="p-3 bg-white border-retro">
            <span class="small text-muted d-block mb-1">Tahun Anggaran / Periode:</span>
            <span class="font-bold font-mono">Tahun ${doc.year}</span>
          </div>
          <div class="p-3 bg-white border-retro">
            <span class="small text-muted d-block mb-1">Petugas Pengunggah:</span>
            <span class="font-bold">${doc.uploader}</span>
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label font-bold">Ringkasan & Abstrak Dokumen:</label>
          <div class="p-3 bg-white border-retro text-muted">
            ${doc.desc}
          </div>
        </div>

        ${doc.indicatorCode ? `
          <div class="mb-3">
            <label class="form-label font-bold">Indikator Terkait:</label>
            <div class="d-flex align-items-center gap-2">
              <span class="retro-badge bg-primary text-white border-retro font-mono font-bold">${doc.indicatorCode}</span>
            </div>
          </div>
        ` : ''}

        ${doc.tags && doc.tags.length > 0 ? `
          <div class="mb-2">
            <label class="form-label font-bold">Label Metadata:</label>
            <div class="d-flex flex-wrap gap-1">
              ${doc.tags.map(t => `<span class="bd-tag-pill">#${t}</span>`).join('')}
            </div>
          </div>
        ` : ''}
      </div>

      <div class="retro-modal-footer">
        <button class="retro-btn retro-btn-outline" onclick="App.closeModal()">Tutup</button>
        <button class="retro-btn retro-btn-primary" onclick="BankDataModule.downloadDocument('${doc.id}')">
          <i data-lucide="download" class="icon-xs"></i> Unduh Berkas Sekarang
        </button>
      </div>
    `;

    this.openModal(`Pratinjau Berkas Bank Data`, bodyHtml);
  },

  /* ----------------- TOAST SYSTEM ----------------- */
  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `retro-toast toast-${type}`;
    
    let iconName = 'info';
    if (type === 'success') iconName = 'check-circle-2';
    if (type === 'warning') iconName = 'alert-triangle';
    if (type === 'danger') iconName = 'alert-octagon';

    toast.innerHTML = `
      <div class="d-flex align-items-center gap-2">
        <i data-lucide="${iconName}" class="icon-sm"></i>
        <div class="toast-text">${message}</div>
      </div>
      <button class="toast-close-btn" onclick="this.parentElement.remove()">✕</button>
    `;

    container.appendChild(toast);
    if (window.lucide) window.lucide.createIcons();

    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }
};

window.App = App;

// Bootstrap on DOM Loaded
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
