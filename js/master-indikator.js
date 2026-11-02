/**
 * SIDAT - SATUPUTARU - Master Data Indikator Module
 * Mengelola Master Indikator Kinerja (IKU, IKD, IKP, IKK),
 * Wewenang Bidang, Formulasi, Definisi Operasional, dan Target/Realisasi Awal.
 */

const MasterIndikatorModule = {
  categoryFilter: 'all',
  bidangFilter: 'all',
  searchTerm: '',

  init() {
    this.populateFilters();
    this.bindEvents();
    this.render();
  },

  populateFilters() {
    const catSelect = document.getElementById('mi-cat-filter');
    const bidangSelect = document.getElementById('mi-bidang-filter');

    const categories = window.store.getCategories();
    const bidangList = window.store.getBidang();

    if (catSelect) {
      catSelect.innerHTML = `
        <option value="all">Semua Kategori (IKU, IKD, IKP, IKK)</option>
        ${categories.map(c => `<option value="${c.id}">${c.code} - ${c.name}</option>`).join('')}
      `;
    }

    if (bidangSelect) {
      bidangSelect.innerHTML = `
        <option value="all">Semua Bidang Pengelola</option>
        ${bidangList.map(b => `<option value="${b.id}">${b.name}</option>`).join('')}
      `;
    }
  },

  bindEvents() {
    const catSelect = document.getElementById('mi-cat-filter');
    if (catSelect) {
      catSelect.addEventListener('change', (e) => {
        this.categoryFilter = e.target.value;
        this.render();
      });
    }

    const bidangSelect = document.getElementById('mi-bidang-filter');
    if (bidangSelect) {
      bidangSelect.addEventListener('change', (e) => {
        this.bidangFilter = e.target.value;
        this.render();
      });
    }

    const searchInput = document.getElementById('mi-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchTerm = e.target.value.toLowerCase().trim();
        this.render();
      });
    }

    const btnAdd = document.getElementById('btn-mi-add-indicator');
    if (btnAdd) {
      btnAdd.addEventListener('click', () => {
        this.openAddModal();
      });
    }
  },

  render() {
    const container = document.getElementById('master-indikator-table-body');
    const summaryContainer = document.getElementById('master-indikator-summary-cards');
    if (!container) return;

    const indicators = window.store.getIndicators();
    const categories = window.store.getCategories();
    const bidangList = window.store.getBidang();
    const years = window.store.getYears();
    const latestYear = years[years.length - 1];
    const canEdit = window.store.canInputIndicatorsAndTargets();

    // Summary counters (Dinamis membaca semua kategori terdaftar)
    if (summaryContainer) {
      summaryContainer.innerHTML = `
        <div class="row g-2 mb-3">
          ${categories.map(c => {
            const count = indicators.filter(i => i.categoryId === c.id).length;
            return `
              <div class="col-md-3 col-sm-6">
                <div class="glass-card p-3 d-flex align-items-center justify-content-between" style="border-left: 4px solid ${c.badgeColor || '#ea580c'};">
                  <div>
                    <span class="small font-bold text-muted text-uppercase" style="font-size: 0.72rem;">${c.name}</span>
                    <h4 class="font-bold text-dark mt-1 mb-0">${count} <span class="small text-muted font-normal" style="font-size: 0.75rem;">Indikator</span></h4>
                  </div>
                  <span class="badge font-mono font-bold" style="background-color: ${c.badgeColor || '#fbbf24'}; color: #0f172a; border: 1px solid rgba(0,0,0,0.15);">
                    ${c.code}
                  </span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;
    }

    // Filter indicators
    const filtered = indicators.filter(ind => {
      if (this.categoryFilter !== 'all' && ind.categoryId !== this.categoryFilter) return false;
      if (this.bidangFilter !== 'all' && ind.bidangId !== this.bidangFilter) return false;
      if (this.searchTerm) {
        const text = `${ind.code} ${ind.name} ${ind.wewenangBidang || ''} ${ind.formula || ''} ${ind.pejabatPenanggungJawab || ''}`.toLowerCase();
        if (!text.includes(this.searchTerm)) return false;
      }
      return true;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <tr>
          <td colspan="7" class="text-center py-5 text-muted">
            <i data-lucide="inbox" class="icon-md d-block mx-auto mb-2 text-muted"></i>
            Tidak ada indikator yang sesuai dengan filter pencarian.
          </td>
        </tr>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    container.innerHTML = filtered.map((ind, idx) => {
      const cat = categories.find(c => c.id === ind.categoryId) || { code: ind.categoryId, name: ind.categoryId, badgeColor: '#fed7aa' };
      const bidang = bidangList.find(b => b.id === ind.bidangId) || { name: 'DINPUTARU' };
      const rec = ind.records?.[latestYear] || { target: 0, realisasi: 0 };
      const pct = window.store.calculateCapaian(rec.target, rec.realisasi, ind.polarization);
      const status = window.store.getStatus(pct);

      return `
        <tr>
          <td class="text-center font-mono small text-muted">${idx + 1}</td>
          <td>
            <div class="d-flex align-items-center gap-2 mb-1">
              <span class="badge font-mono font-bold" style="background-color: ${cat.badgeColor || '#fed7aa'}; color: #0f172a; border: 1px solid rgba(0,0,0,0.15);">${ind.code}</span>
              <strong class="text-dark">${ind.name}</strong>
            </div>
            <div class="small text-muted text-truncate" style="max-width: 380px;">
              ${ind.definition || 'Definisi operasional belum diisi.'}
            </div>
          </td>
          <td>
            <span class="badge font-bold" style="background-color: ${cat.badgeColor || '#fed7aa'}; color: #0f172a; border: 1px solid rgba(0,0,0,0.15);">${cat.code}</span>
            <div class="small text-muted mt-1" style="font-size: 0.78rem;">${cat.name}</div>
          </td>
          <td>
            <div class="font-bold text-dark small">
              <i data-lucide="shield" class="icon-xs text-primary"></i> ${ind.wewenangBidang || bidang.name}
            </div>
            <div class="small text-muted mt-1">
              Pembina: <em>${ind.pejabatPenanggungJawab || bidang.head || '-'}</em>
            </div>
            <div class="small text-muted">
              Pelaksana: <em>${ind.seksiPelaksana || bidang.seksi || '-'}</em>
            </div>
          </td>
          <td>
            <span class="badge-glass badge-glass-purple font-mono">${ind.unit}</span>
            <div class="small text-muted mt-1">
              Polarisasi: <strong class="text-dark">${ind.polarization === 'maximize' ? 'Maksimal (↑)' : 'Minimal (↓)'}</strong>
            </div>
            <div class="small text-muted">Sumber: ${ind.source || 'DINPUTARU'}</div>
          </td>
          <td>
            <div class="d-flex align-items-baseline justify-content-between gap-2">
              <span class="small text-muted">Target:</span>
              <span class="font-mono font-bold text-dark">${rec.target} ${ind.unit}</span>
            </div>
            <div class="d-flex align-items-baseline justify-content-between gap-2">
              <span class="small text-muted">Realisasi:</span>
              <span class="font-mono font-bold text-primary">${rec.realisasi} ${ind.unit}</span>
            </div>
            <div class="mt-1">
              <span class="status-badge-modern ${status.class} py-0 font-mono">${pct}%</span>
            </div>
          </td>
          <td class="text-center">
            <div class="d-flex align-items-center justify-content-center gap-1">
              <button class="glass-btn-icon" onclick="MasterIndikatorModule.viewDetail('${ind.id}')" title="Lihat Detail & Formulasi">
                <i data-lucide="eye" class="icon-xs"></i>
              </button>
              ${canEdit ? `
                <button class="glass-btn-icon" onclick="MasterIndikatorModule.openEditModal('${ind.id}')" title="Edit Master Indikator">
                  <i data-lucide="edit-3" class="icon-xs text-primary"></i>
                </button>
                <button class="glass-btn-icon" onclick="MasterIndikatorModule.confirmDelete('${ind.id}')" title="Hapus Indikator">
                  <i data-lucide="trash-2" class="icon-xs text-danger"></i>
                </button>
              ` : ''}
            </div>
          </td>
        </tr>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();
  },

  viewDetail(indId) {
    const ind = window.store.getIndicatorById(indId);
    if (!ind) return;

    const cat = window.store.getCategories().find(c => c.id === ind.categoryId);
    const bidang = window.store.getBidang().find(b => b.id === ind.bidangId);
    const years = window.store.getYears();

    const bodyHtml = `
      <div class="glass-modal-body">
        <div class="d-flex align-items-center gap-2 mb-3">
          <span class="badge-glass badge-glass-blue font-mono font-bold fs-6">${ind.code}</span>
          <span class="badge-glass badge-glass-amber font-bold">${cat?.code} - ${cat?.name}</span>
          <span class="badge-glass badge-glass-purple font-mono">Satuan: ${ind.unit}</span>
        </div>

        <h4 class="font-bold text-dark mb-3">${ind.name}</h4>

        <div class="settings-group-card mb-3">
          <div class="settings-group-title">
            <i data-lucide="shield-check" class="icon-xs text-primary"></i> Kewenangan & Tanggung Jawab Bidang
          </div>
          <div class="row g-2">
            <div class="col-md-6">
              <span class="small text-muted">Wewenang Bidang:</span>
              <div class="font-bold text-dark">${ind.wewenangBidang || (bidang?.name || 'DINPUTARU Demak')}</div>
            </div>
            <div class="col-md-6">
              <span class="small text-muted">Pejabat Pembina:</span>
              <div class="font-bold text-dark">${ind.pejabatPenanggungJawab || (bidang?.head || '-')}</div>
            </div>
            <div class="col-12 mt-2">
              <span class="small text-muted">Seksi Pelaksana Lapangan:</span>
              <div class="font-bold text-dark">${ind.seksiPelaksana || (bidang?.seksi || '-')}</div>
            </div>
          </div>
        </div>

        <div class="settings-group-card mb-3">
          <div class="settings-group-title">
            <i data-lucide="book-open" class="icon-xs text-amber"></i> Definisi & Formulasi Perhitungan
          </div>
          <div class="mb-3">
            <span class="small text-muted font-bold">Definisi Operasional:</span>
            <p class="text-dark small mb-0 mt-1">${ind.definition || '-'}</p>
          </div>
          <div class="mb-3">
            <span class="small text-muted font-bold">Formulasi Rumus Matematis:</span>
            <div class="p-3 bg-light rounded mt-1 font-mono small text-dark border">
              ${ind.formula || '-'}
            </div>
          </div>
          <div>
            <span class="small text-muted font-bold">Sumber Data Resmi:</span>
            <div class="text-dark small">${ind.source || '-'}</div>
          </div>
        </div>

        <div class="settings-group-card">
          <div class="settings-group-title">
            <i data-lucide="table" class="icon-xs text-emerald"></i> Matriks Target & Realisasi Tahunan
          </div>
          <div class="table-modern-wrap">
            <table class="modern-table">
              <thead>
                <tr>
                  <th class="text-center">Tahun</th>
                  <th class="text-end">Target</th>
                  <th class="text-end">Realisasi</th>
                  <th class="text-center">% Capaian</th>
                  <th>Keterangan</th>
                </tr>
              </thead>
              <tbody>
                ${years.map(yr => {
                  const r = ind.records?.[yr] || { target: 0, realisasi: 0, notes: '' };
                  const pct = window.store.calculateCapaian(r.target, r.realisasi, ind.polarization);
                  const st = window.store.getStatus(pct);
                  return `
                    <tr>
                      <td class="text-center font-bold font-mono">${yr}</td>
                      <td class="text-end font-mono">${r.target} ${ind.unit}</td>
                      <td class="text-end font-mono font-bold text-primary">${r.realisasi} ${ind.unit}</td>
                      <td class="text-center">
                        <span class="status-badge-modern ${st.class} py-0">${pct}%</span>
                      </td>
                      <td class="small text-muted">${r.notes || '-'}</td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="glass-modal-footer">
        <button class="glass-btn glass-btn-outline" onclick="App.closeModal()">Tutup</button>
      </div>
    `;

    App.openModal(`Detail Master Indikator: ${ind.code}`, bodyHtml);
  },

  openAddModal() {
    if (!window.store.canInputIndicatorsAndTargets()) {
      App.showToast('Hanya Koordinator Bidang dan Super Admin yang berwenang menambah indikator!', 'warning');
      return;
    }

    const categories = window.store.getCategories();
    const bidangList = window.store.getBidang();
    const years = window.store.getYears();

    const bodyHtml = `
      <div class="glass-modal-body">
        <div class="row g-3 mb-3">
          <div class="col-md-4">
            <label class="form-label font-bold small">Kode Indikator:</label>
            <input type="text" id="add-ind-code" class="glass-input font-mono font-bold" placeholder="Contoh: IKU-03 atau IKD-02" required>
          </div>
          <div class="col-md-8">
            <label class="form-label font-bold small">Nama Indikator Lengkap:</label>
            <input type="text" id="add-ind-name" class="glass-input font-bold" placeholder="Contoh: Persentase Jalan Kabupaten dalam Kondisi Mantap" required>
          </div>
        </div>

        <div class="row g-3 mb-3">
          <div class="col-md-6">
            <label class="form-label font-bold small">Kategori Indikator:</label>
            <select id="add-ind-cat" class="glass-select">
              ${categories.map(c => `<option value="${c.id}">${c.code} - ${c.name}</option>`).join('')}
            </select>
          </div>
          <div class="col-md-6">
            <label class="form-label font-bold small">Bidang Penanggung Jawab:</label>
            <select id="add-ind-bidang" class="glass-select" onchange="MasterIndikatorModule.onBidangChange(this.value)">
              ${bidangList.map(b => `<option value="${b.id}">${b.name}</option>`).join('')}
            </select>
          </div>
        </div>

        <div class="row g-3 mb-3">
          <div class="col-md-12">
            <label class="form-label font-bold small">Wewenang Bidang yang Menangani:</label>
            <input type="text" id="add-ind-wewenang" class="glass-input" value="Bidang Bina Marga - Urusan Penyelenggaraan Jalan & Jembatan Kab. Demak">
          </div>
          <div class="col-md-6">
            <label class="form-label font-bold small">Pejabat Penanggung Jawab:</label>
            <input type="text" id="add-ind-pejabat" class="glass-input" value="Kepala Bidang Bina Marga">
          </div>
          <div class="col-md-6">
            <label class="form-label font-bold small">Seksi Pelaksana Teknis:</label>
            <input type="text" id="add-ind-seksi" class="glass-input" value="Seksi Preservasi & Pembangunan Jalan">
          </div>
        </div>

        <div class="row g-3 mb-3">
          <div class="col-md-6">
            <label class="form-label font-bold small">Satuan Pengukuran:</label>
            <input type="text" id="add-ind-unit" class="glass-input font-mono" placeholder="%, Km, Ha, Paket, Jiwa, Dokumen" value="%" required>
          </div>
          <div class="col-md-6">
            <label class="form-label font-bold small">Polaritas Kinerja:</label>
            <select id="add-ind-polar" class="glass-select">
              <option value="maximize">Maximize (Semakin Tinggi Nilai Semakin Baik)</option>
              <option value="minimize">Minimize (Semakin Rendah Nilai Semakin Baik)</option>
            </select>
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label font-bold small">Definisi Operasional:</label>
          <textarea id="add-ind-def" class="glass-input" rows="2" placeholder="Jelaskan batasan operasional dan konteks teknis indikator ini..."></textarea>
        </div>

        <div class="mb-3">
          <label class="form-label font-bold small">Formulasi Perhitungan Matematis:</label>
          <textarea id="add-ind-formula" class="glass-input font-mono small" rows="2" placeholder="Contoh: (Panjang Jalan Mantap (Km) / Total Panjang Jalan Kabupaten (Km)) * 100%"></textarea>
        </div>

        <div class="mb-3">
          <label class="form-label font-bold small">Sumber Data Resmi:</label>
          <input type="text" id="add-ind-source" class="glass-input" placeholder="Contoh: Survei Kondisi Jalan Semester II DINPUTARU Kab. Demak" value="DINPUTARU Kabupaten Demak">
        </div>

        <div class="settings-group-card">
          <div class="settings-group-title">
            <i data-lucide="calendar" class="icon-xs text-primary"></i> Nilai Target & Realisasi Awal (${years.join(', ')})
          </div>
          <div class="row g-2">
            ${years.map(yr => `
              <div class="col-md-6 mb-2">
                <span class="small font-bold text-dark">Tahun ${yr}:</span>
                <div class="d-flex gap-2 mt-1">
                  <input type="number" step="any" id="add-target-${yr}" class="glass-input font-mono" placeholder="Target ${yr}" value="0">
                  <input type="number" step="any" id="add-realisasi-${yr}" class="glass-input font-mono font-bold text-primary" placeholder="Realisasi ${yr}" value="0">
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <div class="glass-modal-footer">
        <button class="glass-btn glass-btn-outline" onclick="App.closeModal()">Batal</button>
        <button class="glass-btn glass-btn-primary" onclick="MasterIndikatorModule.saveNewIndicator()">
          <i data-lucide="save" class="icon-xs"></i> Simpan Master Indikator
        </button>
      </div>
    `;

    App.openModal('Tambah Master Data Indikator Kinerja Baru', bodyHtml);
  },

  onBidangChange(bidangId) {
    const bidang = window.store.getBidang().find(b => b.id === bidangId);
    if (!bidang) return;

    const elWewenang = document.getElementById('add-ind-wewenang') || document.getElementById('edit-ind-wewenang');
    const elPejabat = document.getElementById('add-ind-pejabat') || document.getElementById('edit-ind-pejabat');
    const elSeksi = document.getElementById('add-ind-seksi') || document.getElementById('edit-ind-seksi');

    if (elWewenang) elWewenang.value = `${bidang.name} - Urusan Teknis Kab. Demak`;
    if (elPejabat) elPejabat.value = bidang.head || '';
    if (elSeksi) elSeksi.value = bidang.seksi || '';
  },

  saveNewIndicator() {
    const code = document.getElementById('add-ind-code')?.value.trim();
    const name = document.getElementById('add-ind-name')?.value.trim();
    const categoryId = document.getElementById('add-ind-cat')?.value;
    const bidangId = document.getElementById('add-ind-bidang')?.value;
    const wewenangBidang = document.getElementById('add-ind-wewenang')?.value.trim();
    const pejabatPenanggungJawab = document.getElementById('add-ind-pejabat')?.value.trim();
    const seksiPelaksana = document.getElementById('add-ind-seksi')?.value.trim();
    const unit = document.getElementById('add-ind-unit')?.value.trim() || '%';
    const polarization = document.getElementById('add-ind-polar')?.value || 'maximize';
    const definition = document.getElementById('add-ind-def')?.value.trim();
    const formula = document.getElementById('add-ind-formula')?.value.trim();
    const source = document.getElementById('add-ind-source')?.value.trim();

    if (!code || !name) {
      App.showToast('Kode Indikator dan Nama Indikator wajib diisi!', 'danger');
      return;
    }

    const years = window.store.getYears();
    const records = {};
    years.forEach(yr => {
      const tgt = parseFloat(document.getElementById(`add-target-${yr}`)?.value) || 0;
      const real = parseFloat(document.getElementById(`add-realisasi-${yr}`)?.value) || 0;
      records[yr] = {
        target: tgt,
        realisasi: real,
        notes: `Input awal tahun ${yr}`
      };
    });

    const newInd = {
      code,
      name,
      categoryId,
      bidangId,
      wewenangBidang,
      pejabatPenanggungJawab,
      seksiPelaksana,
      unit,
      polarization,
      definition,
      formula,
      source,
      records
    };

    window.store.addIndicator(newInd);
    App.closeModal();
    App.showToast(`Master Indikator <strong>${code} - ${name}</strong> berhasil ditambahkan!`, 'success');
    this.render();
  },

  openEditModal(indId) {
    const ind = window.store.getIndicatorById(indId);
    if (!ind) return;

    const categories = window.store.getCategories();
    const bidangList = window.store.getBidang();
    const years = window.store.getYears();

    const bodyHtml = `
      <div class="glass-modal-body">
        <div class="row g-3 mb-3">
          <div class="col-md-4">
            <label class="form-label font-bold small">Kode Indikator:</label>
            <input type="text" id="edit-ind-code" class="glass-input font-mono font-bold" value="${ind.code}" required>
          </div>
          <div class="col-md-8">
            <label class="form-label font-bold small">Nama Indikator Lengkap:</label>
            <input type="text" id="edit-ind-name" class="glass-input font-bold" value="${ind.name}" required>
          </div>
        </div>

        <div class="row g-3 mb-3">
          <div class="col-md-6">
            <label class="form-label font-bold small">Kategori Indikator:</label>
            <select id="edit-ind-cat" class="glass-select">
              ${categories.map(c => `<option value="${c.id}" ${c.id === ind.categoryId ? 'selected' : ''}>${c.code} - ${c.name}</option>`).join('')}
            </select>
          </div>
          <div class="col-md-6">
            <label class="form-label font-bold small">Bidang Penanggung Jawab:</label>
            <select id="edit-ind-bidang" class="glass-select" onchange="MasterIndikatorModule.onBidangChange(this.value)">
              ${bidangList.map(b => `<option value="${b.id}" ${b.id === ind.bidangId ? 'selected' : ''}>${b.name}</option>`).join('')}
            </select>
          </div>
        </div>

        <div class="row g-3 mb-3">
          <div class="col-md-12">
            <label class="form-label font-bold small">Wewenang Bidang yang Menangani:</label>
            <input type="text" id="edit-ind-wewenang" class="glass-input" value="${ind.wewenangBidang || ''}">
          </div>
          <div class="col-md-6">
            <label class="form-label font-bold small">Pejabat Penanggung Jawab:</label>
            <input type="text" id="edit-ind-pejabat" class="glass-input" value="${ind.pejabatPenanggungJawab || ''}">
          </div>
          <div class="col-md-6">
            <label class="form-label font-bold small">Seksi Pelaksana Teknis:</label>
            <input type="text" id="edit-ind-seksi" class="glass-input" value="${ind.seksiPelaksana || ''}">
          </div>
        </div>

        <div class="row g-3 mb-3">
          <div class="col-md-6">
            <label class="form-label font-bold small">Satuan Pengukuran:</label>
            <input type="text" id="edit-ind-unit" class="glass-input font-mono" value="${ind.unit}" required>
          </div>
          <div class="col-md-6">
            <label class="form-label font-bold small">Polaritas Kinerja:</label>
            <select id="edit-ind-polar" class="glass-select">
              <option value="maximize" ${ind.polarization === 'maximize' ? 'selected' : ''}>Maximize (Semakin Tinggi Nilai Semakin Baik)</option>
              <option value="minimize" ${ind.polarization === 'minimize' ? 'selected' : ''}>Minimize (Semakin Rendah Nilai Semakin Baik)</option>
            </select>
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label font-bold small">Definisi Operasional:</label>
          <textarea id="edit-ind-def" class="glass-input" rows="2">${ind.definition || ''}</textarea>
        </div>

        <div class="mb-3">
          <label class="form-label font-bold small">Formulasi Perhitungan Matematis:</label>
          <textarea id="edit-ind-formula" class="glass-input font-mono small" rows="2">${ind.formula || ''}</textarea>
        </div>

        <div class="mb-3">
          <label class="form-label font-bold small">Sumber Data Resmi:</label>
          <input type="text" id="edit-ind-source" class="glass-input" value="${ind.source || ''}">
        </div>

        <div class="settings-group-card">
          <div class="settings-group-title">
            <i data-lucide="calendar" class="icon-xs text-primary"></i> Target & Realisasi Tahunan
          </div>
          <div class="row g-2">
            ${years.map(yr => {
              const r = ind.records?.[yr] || { target: 0, realisasi: 0 };
              return `
                <div class="col-md-6 mb-2">
                  <span class="small font-bold text-dark">Tahun ${yr}:</span>
                  <div class="d-flex gap-2 mt-1">
                    <input type="number" step="any" id="edit-target-${yr}" class="glass-input font-mono" placeholder="Target ${yr}" value="${r.target}">
                    <input type="number" step="any" id="edit-realisasi-${yr}" class="glass-input font-mono font-bold text-primary" placeholder="Realisasi ${yr}" value="${r.realisasi}">
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>

      <div class="glass-modal-footer">
        <button class="glass-btn glass-btn-outline" onclick="App.closeModal()">Batal</button>
        <button class="glass-btn glass-btn-primary" onclick="MasterIndikatorModule.saveEditIndicator('${ind.id}')">
          <i data-lucide="save" class="icon-xs"></i> Simpan Perubahan
        </button>
      </div>
    `;

    App.openModal(`Edit Master Indikator: ${ind.code}`, bodyHtml);
  },

  saveEditIndicator(indId) {
    const code = document.getElementById('edit-ind-code')?.value.trim();
    const name = document.getElementById('edit-ind-name')?.value.trim();
    const categoryId = document.getElementById('edit-ind-cat')?.value;
    const bidangId = document.getElementById('edit-ind-bidang')?.value;
    const wewenangBidang = document.getElementById('edit-ind-wewenang')?.value.trim();
    const pejabatPenanggungJawab = document.getElementById('edit-ind-pejabat')?.value.trim();
    const seksiPelaksana = document.getElementById('edit-ind-seksi')?.value.trim();
    const unit = document.getElementById('edit-ind-unit')?.value.trim() || '%';
    const polarization = document.getElementById('edit-ind-polar')?.value || 'maximize';
    const definition = document.getElementById('edit-ind-def')?.value.trim();
    const formula = document.getElementById('edit-ind-formula')?.value.trim();
    const source = document.getElementById('edit-ind-source')?.value.trim();

    if (!code || !name) {
      App.showToast('Kode Indikator dan Nama Indikator wajib diisi!', 'danger');
      return;
    }

    const existing = window.store.getIndicatorById(indId);
    const years = window.store.getYears();
    const records = { ...(existing?.records || {}) };

    years.forEach(yr => {
      const tgt = parseFloat(document.getElementById(`edit-target-${yr}`)?.value) || 0;
      const real = parseFloat(document.getElementById(`edit-realisasi-${yr}`)?.value) || 0;
      records[yr] = {
        ...(records[yr] || {}),
        target: tgt,
        realisasi: real
      };
    });

    const updated = {
      code,
      name,
      categoryId,
      bidangId,
      wewenangBidang,
      pejabatPenanggungJawab,
      seksiPelaksana,
      unit,
      polarization,
      definition,
      formula,
      source,
      records
    };

    window.store.updateIndicator(indId, updated);
    App.closeModal();
    App.showToast(`Master Indikator <strong>${code}</strong> berhasil diperbarui!`, 'success');
    this.render();
  },

  confirmDelete(indId) {
    const ind = window.store.getIndicatorById(indId);
    if (!ind) return;

    if (confirm(`Apakah Anda yakin ingin menghapus indikator "${ind.code} - ${ind.name}"?\nData target dan realisasi indikator ini juga akan terhapus.`)) {
      window.store.deleteIndicator(indId);
      App.showToast(`Indikator ${ind.code} telah dihapus dari sistem!`, 'info');
      this.render();
    }
  }
};

window.MasterIndikatorModule = MasterIndikatorModule;
