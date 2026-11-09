/**
 * SIDAT - SATU PUTARU - Bank Data & Document Archive Module (v3.2)
 * Dinas Pekerjaan Umum dan Penataan Ruang Kab. Demak
 * Tampilan 2 Kolom dengan Detail Metrik BPS Demak 2025 & Edit Lengkap
 */

const BankDataModule = {
  categoryFilter: 'all',
  bidangFilter: 'all',
  yearFilter: 'all',
  searchTerm: '',
  currentPage: 1,
  pageSize: 10,

  init() {
    this.populateFilters();
    this.bindEvents();
    this.render();
  },

  populateFilters() {
    const bidangSelect = document.getElementById('bd-bidang-filter');
    const yearSelect = document.getElementById('bd-year-filter');

    const bidangList = window.store.getBidang();
    const years = window.store.getYears();

    if (bidangSelect) {
      bidangSelect.innerHTML = `
        <option value="all">Semua Bidang Pengelola</option>
        ${bidangList.map(b => `<option value="${b.id}">${b.name}</option>`).join('')}
      `;
    }

    if (yearSelect) {
      yearSelect.innerHTML = `
        <option value="all">Semua Tahun</option>
        ${years.map(y => `<option value="${y}">Tahun ${y}</option>`).join('')}
      `;
    }
  },

  bindEvents() {
    const bidangSelect = document.getElementById('bd-bidang-filter');
    if (bidangSelect) {
      bidangSelect.addEventListener('change', (e) => {
        this.bidangFilter = e.target.value;
        this.currentPage = 1;
        this.render();
      });
    }

    const catSelect = document.getElementById('bd-cat-filter');
    if (catSelect) {
      catSelect.addEventListener('change', (e) => {
        this.categoryFilter = e.target.value;
        this.currentPage = 1;
        this.render();
      });
    }

    const yearSelect = document.getElementById('bd-year-filter');
    if (yearSelect) {
      yearSelect.addEventListener('change', (e) => {
        this.yearFilter = e.target.value;
        this.currentPage = 1;
        this.render();
      });
    }

    const searchInput = document.getElementById('bd-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchTerm = e.target.value.toLowerCase().trim();
        this.currentPage = 1;
        this.render();
      });
    }

    const btnUpload = document.getElementById('btn-upload-doc');
    if (btnUpload) {
      btnUpload.addEventListener('click', () => {
        this.openUploadModal();
      });
    }
  },

  /* ----------------- RENDER BANK DATA (2 KOLOM GRID & 2 KOLOM ISI DATA) ----------------- */
  render() {
    const container = document.getElementById('bank-data-container');
    const paginationContainer = document.getElementById('bd-pagination-container');
    const infoContainer = document.getElementById('bd-info-container');
    if (!container) return;

    const allDocs = window.store.getDocuments();
    const bidangList = window.store.getBidang();

    // Filter documents
    const filtered = allDocs.filter(doc => {
      if (this.categoryFilter !== 'all' && doc.category !== this.categoryFilter) return false;
      if (this.bidangFilter !== 'all' && doc.bidangId !== this.bidangFilter) return false;
      if (this.yearFilter !== 'all' && doc.year !== parseInt(this.yearFilter, 10)) return false;

      if (this.searchTerm) {
        const b = bidangList.find(b => b.id === doc.bidangId)?.name || '';
        const match = (doc.title || '').toLowerCase().includes(this.searchTerm) ||
                      (doc.desc || '').toLowerCase().includes(this.searchTerm) ||
                      (doc.source || '').toLowerCase().includes(this.searchTerm) ||
                      (doc.metricValue || '').toLowerCase().includes(this.searchTerm) ||
                      (doc.statSummary || '').toLowerCase().includes(this.searchTerm) ||
                      (doc.tags || []).some(t => t.toLowerCase().includes(this.searchTerm)) ||
                      b.toLowerCase().includes(this.searchTerm);
        if (!match) return false;
      }
      return true;
    });

    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / this.pageSize);

    if (this.currentPage > totalPages) this.currentPage = totalPages;
    if (this.currentPage < 1) this.currentPage = 1;

    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, totalItems);
    const paginatedItems = filtered.slice(startIndex, endIndex);

    if (infoContainer) {
      infoContainer.textContent = `Menampilkan ${totalItems === 0 ? 0 : startIndex + 1} - ${endIndex} dari total ${totalItems} data Bank Data DINPUTARU (10 data per halaman)`;
    }

    if (paginatedItems.length === 0) {
      container.innerHTML = `
        <div class="col-12">
          <div class="retro-empty-state text-center p-5 bg-white rounded border">
            <i data-lucide="file-x" class="empty-icon text-muted mb-2" style="width:48px;height:48px;"></i>
            <h4 class="font-bold text-dark">Data Tidak Ditemukan</h4>
            <p class="text-muted small">Tidak ada data Bank Data yang sesuai dengan filter atau kata kunci saat ini.</p>
            <button class="retro-btn retro-btn-sm retro-btn-primary" onclick="BankDataModule.openUploadModal()">
              <i data-lucide="plus-circle" class="icon-xs"></i> Tambah Data Baru
            </button>
          </div>
        </div>
      `;
    } else {
      container.innerHTML = paginatedItems.map(doc => {
        const bidang = bidangList.find(b => b.id === doc.bidangId);
        const isBps = doc.category === 'Statistik BPS 2025';

        return `
          <div class="col-lg-6 col-md-6 col-12">
            <div class="retro-card bd-admin-card h-100 d-flex flex-column p-3" style="border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
              
              <!-- Baris 1: Header Badge & Kategori -->
              <div class="d-flex align-items-center justify-content-between gap-2 mb-2 pb-2 border-bottom">
                <div class="d-flex align-items-center gap-1 flex-wrap">
                  <span class="badge bg-primary text-white font-mono" style="font-size: 0.7rem;">${doc.fileType || 'PDF'}</span>
                  <span class="badge ${isBps ? 'bg-amber text-dark font-bold' : 'bg-light text-dark border'}" style="font-size: 0.7rem;">
                    ${doc.category}
                  </span>
                  <span class="badge bg-light text-dark border" style="font-size: 0.7rem;">
                    <i data-lucide="building-2" class="icon-xs"></i> ${bidang ? bidang.name : '-'}
                  </span>
                </div>
                <div>
                  <span class="badge bg-dark text-white font-mono" style="font-size: 0.7rem;">Th ${doc.year}</span>
                </div>
              </div>

              <!-- Baris 2: Judul Dokumen -->
              <h5 class="font-bold text-dark mb-3" style="cursor: pointer; line-height: 1.35; font-size: 0.96rem;" onclick="App.openDocumentPreview('${doc.id}')" title="Klik untuk pratinjau lengkap">
                ${doc.title}
              </h5>

              <!-- Baris 3: Badan Data Terbagi 2 Kolom Berbeda -->
              <div class="row g-2 mb-3 flex-grow-1">
                <!-- Kolom Kiri: Metrik & Ringkasan Statistik -->
                <div class="col-sm-6">
                  <div class="p-2 rounded h-100 d-flex flex-column justify-content-center" style="background: #f8fafc; border: 1px solid #e2e8f0;">
                    <span class="text-muted font-bold d-block text-uppercase" style="font-size: 0.68rem; letter-spacing: 0.04em;">
                      ${doc.metricLabel || 'Metrik Kunci'}
                    </span>
                    <div class="font-bold text-primary font-mono my-1" style="font-size: 1.28rem; line-height: 1.2;">
                      ${doc.metricValue || '-'}
                    </div>
                    ${doc.statSummary ? `
                      <div class="text-dark mt-1 pt-1 border-top" style="font-size: 0.74rem; line-height: 1.3;">
                        ${doc.statSummary}
                      </div>
                    ` : ''}
                  </div>
                </div>

                <!-- Kolom Kanan: Sumber Resmi, Uraian, & Metadata -->
                <div class="col-sm-6">
                  <div class="p-2 rounded h-100 d-flex flex-column justify-content-between" style="background: #ffffff; border: 1px solid #e2e8f0;">
                    <div>
                      <span class="text-muted font-bold d-block text-uppercase" style="font-size: 0.68rem; letter-spacing: 0.04em;">
                        Sumber Resmi:
                      </span>
                      <span class="font-bold text-dark d-block mb-1" style="font-size: 0.75rem;">
                        ${doc.source || 'DINPUTARU Kab. Demak'}
                      </span>
                      <p class="text-muted mb-1" style="font-size: 0.73rem; line-height: 1.28;">
                        ${(doc.desc || '').length > 90 ? doc.desc.substring(0, 90) + '...' : (doc.desc || '-')}
                      </p>
                    </div>
                    <div class="text-muted font-mono pt-1 border-top" style="font-size: 0.68rem;">
                      ${doc.documentNumber ? `No: ${doc.documentNumber} • ` : ''}${doc.fileSize || '1.0 MB'}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Baris 4: Tag Topik -->
              ${doc.tags && doc.tags.length > 0 ? `
                <div class="d-flex flex-wrap gap-1 mb-3">
                  ${doc.tags.map(t => `<span class="badge bg-light text-muted border font-mono" style="font-size: 0.67rem;">#${t}</span>`).join('')}
                </div>
              ` : ''}

              <!-- Baris 5: Tombol Aksi (Pratinjau, Unduh, Edit, Hapus) -->
              <div class="d-flex align-items-center justify-content-between pt-2 border-top mt-auto">
                <div class="d-flex gap-1">
                  <button class="retro-btn retro-btn-sm retro-btn-outline" onclick="App.openDocumentPreview('${doc.id}')" title="Lihat Pratinjau Detail">
                    <i data-lucide="eye" class="icon-xs"></i> Pratinjau
                  </button>
                  <button class="retro-btn retro-btn-sm retro-btn-primary" onclick="BankDataModule.downloadDocument('${doc.id}')" title="Unduh Berkas">
                    <i data-lucide="download" class="icon-xs"></i> Unduh
                  </button>
                </div>
                <div class="d-flex gap-1">
                  <button class="retro-btn-icon" title="Edit Data Ini" onclick="BankDataModule.openEditModal('${doc.id}')">
                    <i data-lucide="edit" class="icon-xs text-primary"></i>
                  </button>
                  <button class="retro-btn-icon text-danger" title="Hapus Data Ini" onclick="BankDataModule.deleteDocument('${doc.id}')">
                    <i data-lucide="trash-2" class="icon-xs text-danger"></i>
                  </button>
                </div>
              </div>

            </div>
          </div>
        `;
      }).join('');
    }

    // Pagination buttons
    if (paginationContainer) {
      if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
      } else {
        let pagesHtml = `
          <button class="retro-btn retro-btn-sm retro-btn-outline" 
                  ${this.currentPage === 1 ? 'disabled' : ''} 
                  onclick="BankDataModule.goToPage(${this.currentPage - 1})">
            ◀ Sebelumnya
          </button>
        `;

        for (let p = 1; p <= totalPages; p++) {
          pagesHtml += `
            <button class="retro-btn retro-btn-sm ${p === this.currentPage ? 'retro-btn-primary font-bold' : 'retro-btn-outline'}" 
                    onclick="BankDataModule.goToPage(${p})">
              ${p}
            </button>
          `;
        }

        pagesHtml += `
          <button class="retro-btn retro-btn-sm retro-btn-outline" 
                  ${this.currentPage === totalPages ? 'disabled' : ''} 
                  onclick="BankDataModule.goToPage(${this.currentPage + 1})">
            Selanjutnya ▶
          </button>
        `;

        paginationContainer.innerHTML = pagesHtml;
      }
    }

    if (window.lucide) window.lucide.createIcons();
  },

  goToPage(page) {
    this.currentPage = page;
    this.render();
    const container = document.getElementById('bank-data-container');
    if (container) container.scrollIntoView({ behavior: 'smooth', block: 'start' });
  },

  downloadDocument(docId) {
    const doc = window.store.getDocumentById(docId);
    if (!doc) return;

    const dummyContent = `=== BANK DATA DINPUTARU KABUPATEN DEMAK ===\nData: ${doc.title}\nKategori: ${doc.category}\nTahun: ${doc.year}\nNilai Metrik: ${doc.metricValue || '-'}\nLabel Metrik: ${doc.metricLabel || '-'}\nRincian Statistik: ${doc.statSummary || '-'}\nSumber: ${doc.source || '-'}\nDeskripsi: ${doc.desc}\n\n[BERKAS RESMI DINAS PEKERJAAN UMUM DAN PENATAAN RUANG KABUPATEN DEMAK]`;
    const blob = new Blob([dummyContent], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `${doc.title.replace(/[^a-zA-Z0-9]/g, '_')}_${doc.year}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    App.showToast(`Mengunduh berkas "${doc.title}"...`, 'success');
  },

  deleteDocument(docId) {
    const doc = window.store.getDocumentById(docId);
    if (!doc) return;

    if (confirm(`Yakin ingin menghapus data "${doc.title}" dari Bank Data?`)) {
      window.store.deleteDocument(docId);
      this.render();
      if (window.PublicPortalModule) window.PublicPortalModule.renderBankDataSegment();
      App.showToast('Data berhasil dihapus dari Bank Data.', 'info');
    }
  },

  /* ----------------- MODAL TAMBAH DATA (UPLOAD / INPUT LENGKAP) ----------------- */
  openUploadModal() {
    const bidangList = window.store.getBidang();
    const indicators = window.store.getIndicators();
    const years = window.store.getYears();
    const currentYear = years[years.length - 1];

    const modalContent = `
      <div class="retro-modal-body">
        <div class="mb-3">
          <label class="form-label font-bold small">Judul Data / Dokumen / Statistik:</label>
          <input type="text" id="upload-doc-title" class="retro-input" placeholder="Contoh: Data Panjang Jalan Kabupaten Menurut Tingkat Kondisi Jalan">
        </div>

        <div class="row g-2 mb-3">
          <div class="col-md-6">
            <label class="form-label font-bold small">Kategori Data:</label>
            <select id="upload-doc-category" class="retro-select font-bold">
              <option value="Statistik BPS 2025" selected>Statistik BPS Demak 2025</option>
              <option value="Laporan Teknis">Laporan Teknis & Survei Lapangan</option>
              <option value="Data Base / Spasial">Database / Geospasial / E-PAKSI</option>
              <option value="Laporan Akuntabilitas">Laporan Akuntabilitas (SAKIP / LKjIP)</option>
              <option value="Regulasi & Kebijakan">Regulasi & Kebijakan (Perda/Perbup/SK)</option>
              <option value="Sertifikasi & Legalitas">Sertifikasi & Legalitas Kompetensi</option>
            </select>
          </div>
          <div class="col-md-6">
            <label class="form-label font-bold small">Bidang Pengelola:</label>
            <select id="upload-doc-bidang" class="retro-select">
              ${bidangList.map(b => `<option value="${b.id}">${b.name}</option>`).join('')}
            </select>
          </div>
        </div>

        <div class="row g-2 mb-3">
          <div class="col-md-6">
            <label class="form-label font-bold small">Nilai Angka Metrik Kunci:</label>
            <input type="text" id="upload-doc-metric-val" class="retro-input font-mono font-bold text-primary" placeholder="Contoh: 641,20 Km atau 28.450 Ha atau 93,42%">
          </div>
          <div class="col-md-6">
            <label class="form-label font-bold small">Label Metrik Kunci:</label>
            <input type="text" id="upload-doc-metric-lbl" class="retro-input" placeholder="Contoh: Total Panjang Jalan Kabupaten">
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label font-bold small">Ringkasan Statistik Detail (Kondisi/Persentase):</label>
          <textarea id="upload-doc-stat-summary" class="retro-input" rows="2" placeholder="Contoh: Kemantapan Jalan: 81,10% (Baik: 441,85 Km | Sedang: 78,15 Km | Rusak: 121,20 Km)"></textarea>
        </div>

        <div class="row g-2 mb-3">
          <div class="col-md-6">
            <label class="form-label font-bold small">Sumber Data Resmi:</label>
            <input type="text" id="upload-doc-source" class="retro-input" value="BPS Kab. Demak (Demak Dalam Angka 2025)">
          </div>
          <div class="col-md-6">
            <label class="form-label font-bold small">Nomor Dokumen / Registrasi:</label>
            <input type="text" id="upload-doc-number" class="retro-input font-mono" placeholder="Contoh: BPS-3321/DDA-2025/BM-01">
          </div>
        </div>

        <div class="row g-2 mb-3">
          <div class="col-md-4">
            <label class="form-label font-bold small">Tahun Data:</label>
            <select id="upload-doc-year" class="retro-select">
              ${years.map(y => `<option value="${y}" ${y === currentYear ? 'selected' : ''}>${y}</option>`).join('')}
            </select>
          </div>
          <div class="col-md-4">
            <label class="form-label font-bold small">Format Berkas:</label>
            <select id="upload-doc-type" class="retro-select">
              <option value="XLSX & PDF">XLSX & PDF</option>
              <option value="PDF">Dokumen PDF (.pdf)</option>
              <option value="XLSX">Spreadsheet Excel (.xlsx)</option>
              <option value="DOCX">Microsoft Word (.docx)</option>
              <option value="ZIP">Arsip Berkas / GIS (.zip)</option>
            </select>
          </div>
          <div class="col-md-4">
            <label class="form-label font-bold small">Ukuran Berkas:</label>
            <input type="text" id="upload-doc-size" class="retro-input font-mono" value="2.4 MB">
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label font-bold small">Tautkan Indikator Terkait (Opsional):</label>
          <select id="upload-doc-indicator" class="retro-select">
            <option value="">-- Umum / Tanpa Tautan Khusus --</option>
            ${indicators.map(i => `<option value="${i.code}">[${i.code}] ${i.name.substring(0, 40)}...</option>`).join('')}
          </select>
        </div>

        <div class="mb-3">
          <label class="form-label font-bold small">Uraian / Deskripsi Lengkap:</label>
          <textarea id="upload-doc-desc" class="retro-input" rows="2" placeholder="Uraikan peruntukan data, metodologi survei, atau rincian cakupan wilayah di Demak..."></textarea>
        </div>

        <div class="mb-2">
          <label class="form-label font-bold small">Tag / Label Topik (Pisahkan koma):</label>
          <input type="text" id="upload-doc-tags" class="retro-input" placeholder="Contoh: BPS 2025, Bina Marga, Jalan Mantap">
        </div>
      </div>

      <div class="retro-modal-footer">
        <button class="retro-btn retro-btn-outline" onclick="App.closeModal()">Batal</button>
        <button class="retro-btn retro-btn-primary" onclick="BankDataModule.submitUpload()">
          <i data-lucide="check" class="icon-xs"></i> Simpan Data Baru
        </button>
      </div>
    `;

    App.openModal('Tambah Data Baru ke Bank Data DINPUTARU', modalContent);
    if (window.lucide) window.lucide.createIcons();
  },

  submitUpload() {
    const titleInput = document.getElementById('upload-doc-title');
    const catInput = document.getElementById('upload-doc-category');
    const bidangInput = document.getElementById('upload-doc-bidang');
    const metricValInput = document.getElementById('upload-doc-metric-val');
    const metricLblInput = document.getElementById('upload-doc-metric-lbl');
    const statSummaryInput = document.getElementById('upload-doc-stat-summary');
    const sourceInput = document.getElementById('upload-doc-source');
    const docNumberInput = document.getElementById('upload-doc-number');
    const yearInput = document.getElementById('upload-doc-year');
    const typeInput = document.getElementById('upload-doc-type');
    const sizeInput = document.getElementById('upload-doc-size');
    const indInput = document.getElementById('upload-doc-indicator');
    const descInput = document.getElementById('upload-doc-desc');
    const tagsInput = document.getElementById('upload-doc-tags');

    if (!titleInput || !titleInput.value.trim()) {
      App.showToast('Judul data wajib diisi!', 'danger');
      return;
    }

    const tags = (tagsInput ? tagsInput.value || '' : '').split(',').map(t => t.trim()).filter(Boolean);
    const currentUser = window.store.getCurrentUser();
    const uploaderName = currentUser ? `${currentUser.name} (${currentUser.roleLabel})` : 'Aparatur DINPUTARU Demak';

    const newDoc = {
      id: 'BD-' + Date.now(),
      title: titleInput.value.trim(),
      category: catInput ? catInput.value : 'Statistik BPS 2025',
      bidangId: bidangInput ? bidangInput.value : 'bina_marga',
      year: yearInput ? parseInt(yearInput.value, 10) : 2024,
      date: new Date().toISOString().slice(0, 10),
      source: sourceInput ? sourceInput.value.trim() : 'BPS Kab. Demak (Demak Dalam Angka 2025)',
      metricValue: metricValInput ? metricValInput.value.trim() : '-',
      metricLabel: metricLblInput ? metricLblInput.value.trim() : 'Indikator Data',
      statSummary: statSummaryInput ? statSummaryInput.value.trim() : '',
      documentNumber: docNumberInput ? docNumberInput.value.trim() : '',
      fileType: typeInput ? typeInput.value : 'XLSX & PDF',
      fileSize: sizeInput ? sizeInput.value.trim() : '2.0 MB',
      uploader: uploaderName,
      indicatorCode: indInput ? indInput.value || null : null,
      tags: tags.length > 0 ? tags : ['DINPUTARU Demak', 'BPS 2025'],
      desc: descInput ? descInput.value.trim() || 'Data statistik resmi DINPUTARU Kabupaten Demak.' : 'Data statistik resmi DINPUTARU Kabupaten Demak.'
    };

    window.store.addDocument(newDoc);
    App.closeModal();
    this.render();
    if (window.PublicPortalModule) window.PublicPortalModule.renderBankDataSegment();
    App.showToast('Data baru berhasil ditambahkan ke Bank Data!', 'success');
  },

  /* ----------------- MODAL EDIT DATA (EDIT LENGKAP SEMUA FIELD) ----------------- */
  openEditModal(docId) {
    const doc = window.store.getDocumentById(docId);
    if (!doc) {
      App.showToast('Data tidak ditemukan!', 'warning');
      return;
    }

    const bidangList = window.store.getBidang();
    const indicators = window.store.getIndicators();
    const years = window.store.getYears();

    const modalContent = `
      <div class="retro-modal-body">
        <input type="hidden" id="edit-doc-id" value="${doc.id}">

        <div class="mb-3">
          <label class="form-label font-bold small">Judul Data / Dokumen / Statistik:</label>
          <input type="text" id="edit-doc-title" class="retro-input" value="${doc.title || ''}">
        </div>

        <div class="row g-2 mb-3">
          <div class="col-md-6">
            <label class="form-label font-bold small">Kategori Data:</label>
            <select id="edit-doc-category" class="retro-select font-bold">
              <option value="Statistik BPS 2025" ${doc.category === 'Statistik BPS 2025' ? 'selected' : ''}>Statistik BPS Demak 2025</option>
              <option value="Laporan Teknis" ${doc.category === 'Laporan Teknis' ? 'selected' : ''}>Laporan Teknis & Survei Lapangan</option>
              <option value="Data Base / Spasial" ${doc.category === 'Data Base / Spasial' ? 'selected' : ''}>Database / Geospasial / E-PAKSI</option>
              <option value="Laporan Akuntabilitas" ${doc.category === 'Laporan Akuntabilitas' ? 'selected' : ''}>Laporan Akuntabilitas (SAKIP / LKjIP)</option>
              <option value="Regulasi & Kebijakan" ${doc.category === 'Regulasi & Kebijakan' ? 'selected' : ''}>Regulasi & Kebijakan (Perda/Perbup/SK)</option>
              <option value="Sertifikasi & Legalitas" ${doc.category === 'Sertifikasi & Legalitas' ? 'selected' : ''}>Sertifikasi & Legalitas Kompetensi</option>
            </select>
          </div>
          <div class="col-md-6">
            <label class="form-label font-bold small">Bidang Pengelola:</label>
            <select id="edit-doc-bidang" class="retro-select">
              ${bidangList.map(b => `<option value="${b.id}" ${b.id === doc.bidangId ? 'selected' : ''}>${b.name}</option>`).join('')}
            </select>
          </div>
        </div>

        <div class="row g-2 mb-3">
          <div class="col-md-6">
            <label class="form-label font-bold small">Nilai Angka Metrik Kunci:</label>
            <input type="text" id="edit-doc-metric-val" class="retro-input font-mono font-bold text-primary" value="${doc.metricValue || ''}">
          </div>
          <div class="col-md-6">
            <label class="form-label font-bold small">Label Metrik Kunci:</label>
            <input type="text" id="edit-doc-metric-lbl" class="retro-input" value="${doc.metricLabel || ''}">
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label font-bold small">Ringkasan Statistik Detail:</label>
          <textarea id="edit-doc-stat-summary" class="retro-input" rows="2">${doc.statSummary || ''}</textarea>
        </div>

        <div class="row g-2 mb-3">
          <div class="col-md-6">
            <label class="form-label font-bold small">Sumber Data Resmi:</label>
            <input type="text" id="edit-doc-source" class="retro-input" value="${doc.source || 'BPS Kab. Demak (Demak Dalam Angka 2025)'}">
          </div>
          <div class="col-md-6">
            <label class="form-label font-bold small">Nomor Dokumen / Registrasi:</label>
            <input type="text" id="edit-doc-number" class="retro-input font-mono" value="${doc.documentNumber || ''}">
          </div>
        </div>

        <div class="row g-2 mb-3">
          <div class="col-md-4">
            <label class="form-label font-bold small">Tahun Data:</label>
            <select id="edit-doc-year" class="retro-select">
              ${years.map(y => `<option value="${y}" ${y === doc.year ? 'selected' : ''}>${y}</option>`).join('')}
            </select>
          </div>
          <div class="col-md-4">
            <label class="form-label font-bold small">Format Berkas:</label>
            <select id="edit-doc-type" class="retro-select">
              <option value="XLSX & PDF" ${doc.fileType === 'XLSX & PDF' ? 'selected' : ''}>XLSX & PDF</option>
              <option value="PDF" ${doc.fileType === 'PDF' ? 'selected' : ''}>PDF (.pdf)</option>
              <option value="XLSX" ${doc.fileType === 'XLSX' ? 'selected' : ''}>Excel (.xlsx)</option>
              <option value="DOCX" ${doc.fileType === 'DOCX' ? 'selected' : ''}>Word (.docx)</option>
              <option value="ZIP" ${doc.fileType === 'ZIP' ? 'selected' : ''}>Arsip / GIS (.zip)</option>
            </select>
          </div>
          <div class="col-md-4">
            <label class="form-label font-bold small">Ukuran Berkas:</label>
            <input type="text" id="edit-doc-size" class="retro-input font-mono" value="${doc.fileSize || '2.0 MB'}">
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label font-bold small">Tautkan Indikator Terkait:</label>
          <select id="edit-doc-indicator" class="retro-select">
            <option value="">-- Umum / Tanpa Tautan Khusus --</option>
            ${indicators.map(i => `<option value="${i.code}" ${i.code === doc.indicatorCode ? 'selected' : ''}>[${i.code}] ${i.name.substring(0, 40)}...</option>`).join('')}
          </select>
        </div>

        <div class="mb-3">
          <label class="form-label font-bold small">Uraian / Deskripsi Lengkap:</label>
          <textarea id="edit-doc-desc" class="retro-input" rows="2">${doc.desc || ''}</textarea>
        </div>

        <div class="mb-2">
          <label class="form-label font-bold small">Tag / Label Topik (Pisahkan koma):</label>
          <input type="text" id="edit-doc-tags" class="retro-input" value="${(doc.tags || []).join(', ')}">
        </div>
      </div>

      <div class="retro-modal-footer">
        <button class="retro-btn retro-btn-outline" onclick="App.closeModal()">Batal</button>
        <button class="retro-btn retro-btn-primary" onclick="BankDataModule.submitEdit()">
          <i data-lucide="save" class="icon-xs"></i> Simpan Perubahan Data
        </button>
      </div>
    `;

    App.openModal(`Edit Data: ${doc.title.substring(0, 36)}...`, modalContent);
    if (window.lucide) window.lucide.createIcons();
  },

  submitEdit() {
    const id = document.getElementById('edit-doc-id')?.value;
    const title = document.getElementById('edit-doc-title')?.value.trim();
    const cat = document.getElementById('edit-doc-category')?.value;
    const bidangId = document.getElementById('edit-doc-bidang')?.value;
    const metricVal = document.getElementById('edit-doc-metric-val')?.value.trim();
    const metricLbl = document.getElementById('edit-doc-metric-lbl')?.value.trim();
    const statSummary = document.getElementById('edit-doc-stat-summary')?.value.trim();
    const source = document.getElementById('edit-doc-source')?.value.trim();
    const docNumber = document.getElementById('edit-doc-number')?.value.trim();
    const year = parseInt(document.getElementById('edit-doc-year')?.value, 10);
    const type = document.getElementById('edit-doc-type')?.value;
    const size = document.getElementById('edit-doc-size')?.value.trim();
    const indicatorCode = document.getElementById('edit-doc-indicator')?.value || null;
    const desc = document.getElementById('edit-doc-desc')?.value.trim();
    const tags = (document.getElementById('edit-doc-tags')?.value || '').split(',').map(t => t.trim()).filter(Boolean);

    if (!title) {
      App.showToast('Judul data wajib diisi!', 'danger');
      return;
    }

    const doc = window.store.getDocumentById(id);
    if (!doc) return;

    doc.title = title;
    doc.category = cat;
    doc.bidangId = bidangId;
    doc.metricValue = metricVal;
    doc.metricLabel = metricLbl;
    doc.statSummary = statSummary;
    doc.source = source;
    doc.documentNumber = docNumber;
    doc.year = year;
    doc.fileType = type;
    doc.fileSize = size || '2.0 MB';
    doc.indicatorCode = indicatorCode;
    doc.desc = desc;
    doc.tags = tags;

    window.store.updateDocument(doc);
    App.closeModal();
    this.render();
    if (window.PublicPortalModule) window.PublicPortalModule.renderBankDataSegment();
    App.showToast('Data Bank Data berhasil diperbarui!', 'success');
  }
};

window.BankDataModule = BankDataModule;
