/**
 * SIDAT - SATUPUTARU - Bank Data Module
 * Digital vault for supporting documents, surveys, spatial data & reports
 * Koordinator Bidang dan Super Admin dapat Menambah, Mengurangi, dan Mengedit Bank Data
 */

const BankDataModule = {
  bidangFilter: 'all',
  categoryFilter: 'all',
  yearFilter: 'all',
  searchTerm: '',
  currentPage: 1,
  pageSize: 10, // Default 10 data as requested!

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
        <option value="all">Semua Tahun Dokumen</option>
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

    // Upload button
    const btnUpload = document.getElementById('btn-upload-doc');
    if (btnUpload) {
      btnUpload.addEventListener('click', () => {
        this.openUploadModal();
      });
    }
  },

  render() {
    const container = document.getElementById('bank-data-container');
    const paginationContainer = document.getElementById('bd-pagination-container');
    const infoContainer = document.getElementById('bd-info-container');
    if (!container) return;

    const docs = window.store.getDocuments();
    const bidangList = window.store.getBidang();
    const canManage = window.store.canManageBankData();

    // Filter documents
    const filtered = docs.filter(doc => {
      if (this.bidangFilter !== 'all' && doc.bidangId !== this.bidangFilter) return false;
      if (this.categoryFilter !== 'all' && doc.category !== this.categoryFilter) return false;
      if (this.yearFilter !== 'all' && doc.year.toString() !== this.yearFilter) return false;

      if (this.searchTerm) {
        const b = bidangList.find(b => b.id === doc.bidangId)?.name || '';
        const match = doc.title.toLowerCase().includes(this.searchTerm) ||
                      doc.category.toLowerCase().includes(this.searchTerm) ||
                      doc.desc.toLowerCase().includes(this.searchTerm) ||
                      (doc.tags && doc.tags.some(t => t.toLowerCase().includes(this.searchTerm))) ||
                      b.toLowerCase().includes(this.searchTerm);
        if (!match) return false;
      }
      return true;
    });

    // Pagination (Default 10 data)
    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / this.pageSize) || 1;

    if (this.currentPage > totalPages) this.currentPage = totalPages;
    if (this.currentPage < 1) this.currentPage = 1;

    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, totalItems);
    const paginatedItems = filtered.slice(startIndex, endIndex);

    if (infoContainer) {
      infoContainer.textContent = `Menampilkan ${totalItems === 0 ? 0 : startIndex + 1} - ${endIndex} dari total ${totalItems} arsip Bank Data (10 data per halaman)`;
    }

    if (paginatedItems.length === 0) {
      container.innerHTML = `
        <div class="col-12">
          <div class="retro-empty-state">
            <i data-lucide="file-x" class="empty-icon"></i>
            <h4>Dokumen Tidak Ditemukan</h4>
            <p>Tidak ada arsip dokumen yang sesuai dengan kriteria filter saat ini.</p>
            ${canManage ? `
              <button class="retro-btn retro-btn-sm retro-btn-primary" onclick="BankDataModule.openUploadModal()">
                <i data-lucide="upload" class="icon-xs"></i> Unggah Dokumen Baru
              </button>
            ` : ''}
          </div>
        </div>
      `;
    } else {
      container.innerHTML = paginatedItems.map(doc => {
        const bidang = bidangList.find(b => b.id === doc.bidangId);
        const fileIcon = this.getFileIcon(doc.fileType);

        return `
          <div class="bank-data-card retro-card">
            <div class="bd-card-header">
              <div class="bd-file-type-badge ${doc.fileType.toLowerCase()}">
                <i data-lucide="${fileIcon}" class="icon-sm"></i>
                <span>${doc.fileType}</span>
              </div>
              <span class="bd-year-badge font-mono">${doc.year}</span>
            </div>

            <div class="bd-card-body">
              <h5 class="bd-doc-title" onclick="App.openDocumentPreview('${doc.id}')">${doc.title}</h5>
              <p class="bd-doc-desc">${doc.desc}</p>
              
              <div class="bd-meta-grid">
                <div class="bd-meta-item">
                  <span class="bd-meta-label">Bidang Pengelola:</span>
                  <span class="bd-meta-value font-bold">${bidang ? bidang.name : '-'}</span>
                </div>
                <div class="bd-meta-item">
                  <span class="bd-meta-label">Kategori Arsip:</span>
                  <span class="bd-meta-value">${doc.category}</span>
                </div>
                <div class="bd-meta-item">
                  <span class="bd-meta-label">Ukuran / Tgl:</span>
                  <span class="bd-meta-value font-mono">${doc.fileSize} • ${doc.date}</span>
                </div>
                ${doc.indicatorCode ? `
                  <div class="bd-meta-item">
                    <span class="bd-meta-label">Indikator Terkait:</span>
                    <span class="retro-badge bg-white border-retro font-mono font-bold">${doc.indicatorCode}</span>
                  </div>
                ` : ''}
              </div>

              ${doc.tags && doc.tags.length > 0 ? `
                <div class="bd-tags-wrap mt-2">
                  ${doc.tags.map(t => `<span class="bd-tag-pill">#${t}</span>`).join('')}
                </div>
              ` : ''}
            </div>

            <div class="bd-card-footer">
              <div class="d-flex gap-1">
                <button class="retro-btn retro-btn-sm retro-btn-outline" onclick="App.openDocumentPreview('${doc.id}')">
                  <i data-lucide="eye" class="icon-xs"></i> Pratinjau
                </button>
                <button class="retro-btn retro-btn-sm retro-btn-primary" onclick="BankDataModule.downloadDocument('${doc.id}')">
                  <i data-lucide="download" class="icon-xs"></i> Unduh
                </button>
              </div>

              <!-- Koordinator Bidang dan Super Admin dapat Edit & Hapus -->
              ${canManage ? `
                <div class="d-flex gap-1">
                  <button class="retro-btn-icon" title="Edit Dokumen" onclick="BankDataModule.openEditModal('${doc.id}')">
                    <i data-lucide="edit" class="icon-xs"></i>
                  </button>
                  <button class="retro-btn-icon text-danger" title="Hapus Dokumen" onclick="BankDataModule.deleteDocument('${doc.id}')">
                    <i data-lucide="trash-2" class="icon-xs"></i>
                  </button>
                </div>
              ` : ''}
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
        let pagesHtml = '';
        pagesHtml += `
          <button class="retro-btn retro-btn-sm retro-btn-outline" 
                  ${this.currentPage === 1 ? 'disabled' : ''} 
                  onclick="BankDataModule.goToPage(${this.currentPage - 1})">
            ◀ Sebelumnya
          </button>
        `;

        for (let p = 1; p <= totalPages; p++) {
          pagesHtml += `
            <button class="retro-btn retro-btn-sm ${p === this.currentPage ? 'retro-btn-primary' : 'retro-btn-outline'}" 
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

    // Hide or show upload button based on permission
    const btnUpload = document.getElementById('btn-upload-doc');
    if (btnUpload) {
      btnUpload.style.display = canManage ? 'inline-flex' : 'none';
    }

    if (window.lucide) window.lucide.createIcons();
  },

  goToPage(pageNum) {
    this.currentPage = pageNum;
    this.render();
  },

  getFileIcon(fileType) {
    switch((fileType || '').toUpperCase()) {
      case 'PDF': return 'file-text';
      case 'XLSX':
      case 'XLS': return 'table';
      case 'DOCX':
      case 'DOC': return 'file-text';
      case 'ZIP':
      case 'RAR': return 'archive';
      default: return 'file';
    }
  },

  downloadDocument(docId) {
    const doc = window.store.getDocuments().find(d => d.id === docId);
    if (!doc) return;

    const dummyContent = `=== BANK DATA DINPUTARU KABUPATEN DEMAK ===\nDokumen: ${doc.title}\nKategori: ${doc.category}\nTahun: ${doc.year}\nPengunggah: ${doc.uploader}\nDeskripsi: ${doc.desc}\n\n[BERKAS RESMI DINAS PEKERJAAN UMUM DAN PENATAAN RUANG KABUPATEN DEMAK]`;
    const blob = new Blob([dummyContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${doc.title.replace(/[^a-zA-Z0-9_-]/g, '_')}.${doc.fileType.toLowerCase() === 'xlsx' ? 'xlsx' : 'pdf'}`;
    link.click();

    App.showToast(`Mengunduh dokumen: <strong>${doc.title}</strong>`, 'success');
  },

  deleteDocument(docId) {
    if (!window.store.canManageBankData()) {
      App.showToast('Hanya Koordinator Bidang dan Super Admin yang berwenang menghapus dokumen!', 'warning');
      return;
    }

    const doc = window.store.getDocumentById(docId);
    if (!doc) return;

    if (confirm(`Apakah Anda yakin ingin menghapus arsip dokumen "${doc.title}"?`)) {
      window.store.deleteDocument(docId);
      this.render();
      if (window.PublicPortalModule) window.PublicPortalModule.renderBankDataSegment();
      App.showToast('Dokumen berhasil dihapus dari Bank Data.', 'info');
    }
  },

  openUploadModal() {
    if (!window.store.canManageBankData()) {
      App.showToast('Hanya Koordinator Bidang dan Super Admin yang berwenang menambah arsip dokumen!', 'warning');
      return;
    }

    const bidangList = window.store.getBidang();
    const indicators = window.store.getIndicators();
    const years = window.store.getYears();
    const currentYear = years[years.length - 1];

    const modalContent = `
      <div class="retro-modal-body">
        <div class="mb-3">
          <label class="form-label font-bold">Judul Dokumen / Laporan / Peta:</label>
          <input type="text" id="upload-doc-title" class="retro-input" placeholder="Contoh: Laporan Akhir Survei Jalan Semester I 2024">
        </div>

        <div class="row g-2 mb-3">
          <div class="col-md-6">
            <label class="form-label font-bold">Kategori Dokumen:</label>
            <select id="upload-doc-category" class="retro-select">
              <option value="Laporan Teknis">Laporan Teknis & Survei Lapangan</option>
              <option value="Data Base / Spasial">Database / Geospasial / Shapefile</option>
              <option value="Laporan Akuntabilitas">Laporan Akuntabilitas & Kinerja (SAKIP)</option>
              <option value="Regulasi & Kebijakan">Regulasi & Kebijakan (Perda/Perbup/SK)</option>
              <option value="Sertifikasi & Legalitas">Sertifikasi & Legalitas Kompetensi</option>
            </select>
          </div>
          <div class="col-md-6">
            <label class="form-label font-bold">Bidang Pengelola:</label>
            <select id="upload-doc-bidang" class="retro-select">
              ${bidangList.map(b => `<option value="${b.id}">${b.name}</option>`).join('')}
            </select>
          </div>
        </div>

        <div class="row g-2 mb-3">
          <div class="col-md-4">
            <label class="form-label font-bold">Tahun Dokumen:</label>
            <select id="upload-doc-year" class="retro-select">
              ${years.map(y => `<option value="${y}" ${y === currentYear ? 'selected' : ''}>${y}</option>`).join('')}
            </select>
          </div>
          <div class="col-md-4">
            <label class="form-label font-bold">Format Berkas:</label>
            <select id="upload-doc-type" class="retro-select">
              <option value="PDF">Dokumen PDF (.pdf)</option>
              <option value="XLSX">Spreadsheet Excel (.xlsx)</option>
              <option value="DOCX">Microsoft Word (.docx)</option>
              <option value="ZIP">Arsip Berkas / GIS (.zip)</option>
            </select>
          </div>
          <div class="col-md-4">
            <label class="form-label font-bold">Tautkan Indikator:</label>
            <select id="upload-doc-indicator" class="retro-select">
              <option value="">-- Umum / Tanpa Tautan --</option>
              ${indicators.map(i => `<option value="${i.code}">[${i.code}] ${i.name.substring(0, 24)}...</option>`).join('')}
            </select>
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label font-bold">Pilih Berkas yang Diunggah:</label>
          <input type="file" id="upload-file-input" class="retro-input file-input-retro">
          <span class="small text-muted">Format didukung: PDF, XLSX, DOCX, ZIP, GeoJSON. Maksimal 50 MB.</span>
        </div>

        <div class="mb-3">
          <label class="form-label font-bold">Deskripsi & Catatan Verifikasi:</label>
          <textarea id="upload-doc-desc" class="retro-input" rows="3" placeholder="Jelaskan ringkasan isi dokumen, metodologi survei, atau instansi pembuat..."></textarea>
        </div>

        <div class="mb-2">
          <label class="form-label font-bold">Label / Tag (Pisahkan koma):</label>
          <input type="text" id="upload-doc-tags" class="retro-input" placeholder="Contoh: Sayung, Rob, DAK, PPSP">
        </div>
      </div>

      <div class="retro-modal-footer">
        <button class="retro-btn retro-btn-outline" onclick="App.closeModal()">Batal</button>
        <button class="retro-btn retro-btn-primary" onclick="BankDataModule.submitUpload()">
          <i data-lucide="upload" class="icon-xs"></i> Simpan ke Bank Data
        </button>
      </div>
    `;

    App.openModal('Unggah Berkas ke Bank Data', modalContent);
  },

  submitUpload() {
    const titleInput = document.getElementById('upload-doc-title');
    const catInput = document.getElementById('upload-doc-category');
    const bidangInput = document.getElementById('upload-doc-bidang');
    const yearInput = document.getElementById('upload-doc-year');
    const typeInput = document.getElementById('upload-doc-type');
    const indInput = document.getElementById('upload-doc-indicator');
    const descInput = document.getElementById('upload-doc-desc');
    const tagsInput = document.getElementById('upload-doc-tags');

    if (!titleInput || !titleInput.value.trim()) {
      App.showToast('Judul dokumen wajib diisi!', 'danger');
      return;
    }

    const tags = (tagsInput.value || '').split(',').map(t => t.trim()).filter(Boolean);
    const currentUser = window.store.getCurrentUser();
    const uploaderName = currentUser ? `${currentUser.name} (${currentUser.roleLabel})` : 'Aparatur DINPUTARU';

    const newDoc = {
      id: 'DOC-' + Date.now(),
      title: titleInput.value.trim(),
      category: catInput.value,
      bidangId: bidangInput.value,
      year: parseInt(yearInput.value, 10),
      date: new Date().toISOString().slice(0, 10),
      fileType: typeInput.value,
      fileSize: '3.4 MB',
      uploader: uploaderName,
      indicatorCode: indInput.value || null,
      tags: tags.length > 0 ? tags : ['DINPUTARU Demak'],
      desc: descInput.value.trim() || 'Dokumen pendukung capaian kinerja resmi DINPUTARU Demak.'
    };

    window.store.addDocument(newDoc);
    App.closeModal();
    this.render();
    if (window.PublicPortalModule) window.PublicPortalModule.renderBankDataSegment();
    App.showToast('Dokumen berhasil disimpan ke Bank Data!', 'success');
  },

  openEditModal(docId) {
    if (!window.store.canManageBankData()) {
      App.showToast('Hanya Koordinator Bidang dan Super Admin yang berwenang mengubah dokumen!', 'warning');
      return;
    }

    const doc = window.store.getDocumentById(docId);
    if (!doc) return;

    const bidangList = window.store.getBidang();
    const indicators = window.store.getIndicators();
    const years = window.store.getYears();

    const modalContent = `
      <div class="retro-modal-body">
        <input type="hidden" id="edit-doc-id" value="${doc.id}">

        <div class="mb-3">
          <label class="form-label font-bold">Judul Dokumen / Laporan / Peta:</label>
          <input type="text" id="edit-doc-title" class="retro-input" value="${doc.title}">
        </div>

        <div class="row g-2 mb-3">
          <div class="col-md-6">
            <label class="form-label font-bold">Kategori Dokumen:</label>
            <select id="edit-doc-category" class="retro-select">
              <option value="Laporan Teknis" ${doc.category === 'Laporan Teknis' ? 'selected' : ''}>Laporan Teknis & Survei Lapangan</option>
              <option value="Data Base / Spasial" ${doc.category === 'Data Base / Spasial' ? 'selected' : ''}>Database / Geospasial / Shapefile</option>
              <option value="Laporan Akuntabilitas" ${doc.category === 'Laporan Akuntabilitas' ? 'selected' : ''}>Laporan Akuntabilitas & Kinerja (SAKIP)</option>
              <option value="Regulasi & Kebijakan" ${doc.category === 'Regulasi & Kebijakan' ? 'selected' : ''}>Regulasi & Kebijakan (Perda/Perbup/SK)</option>
              <option value="Sertifikasi & Legalitas" ${doc.category === 'Sertifikasi & Legalitas' ? 'selected' : ''}>Sertifikasi & Legalitas Kompetensi</option>
            </select>
          </div>
          <div class="col-md-6">
            <label class="form-label font-bold">Bidang Pengelola:</label>
            <select id="edit-doc-bidang" class="retro-select">
              ${bidangList.map(b => `<option value="${b.id}" ${b.id === doc.bidangId ? 'selected' : ''}>${b.name}</option>`).join('')}
            </select>
          </div>
        </div>

        <div class="row g-2 mb-3">
          <div class="col-md-4">
            <label class="form-label font-bold">Tahun Dokumen:</label>
            <select id="edit-doc-year" class="retro-select">
              ${years.map(y => `<option value="${y}" ${y === doc.year ? 'selected' : ''}>${y}</option>`).join('')}
            </select>
          </div>
          <div class="col-md-4">
            <label class="form-label font-bold">Format Berkas:</label>
            <select id="edit-doc-type" class="retro-select">
              <option value="PDF" ${doc.fileType === 'PDF' ? 'selected' : ''}>PDF (.pdf)</option>
              <option value="XLSX" ${doc.fileType === 'XLSX' ? 'selected' : ''}>Excel (.xlsx)</option>
              <option value="DOCX" ${doc.fileType === 'DOCX' ? 'selected' : ''}>Word (.docx)</option>
              <option value="ZIP" ${doc.fileType === 'ZIP' ? 'selected' : ''}>Arsip / GIS (.zip)</option>
            </select>
          </div>
          <div class="col-md-4">
            <label class="form-label font-bold">Tautkan Indikator:</label>
            <select id="edit-doc-indicator" class="retro-select">
              <option value="">-- Umum / Tanpa Tautan --</option>
              ${indicators.map(i => `<option value="${i.code}" ${i.code === doc.indicatorCode ? 'selected' : ''}>[${i.code}] ${i.name.substring(0, 24)}...</option>`).join('')}
            </select>
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label font-bold">Deskripsi & Catatan Verifikasi:</label>
          <textarea id="edit-doc-desc" class="retro-input" rows="3">${doc.desc || ''}</textarea>
        </div>

        <div class="mb-2">
          <label class="form-label font-bold">Label / Tag (Pisahkan koma):</label>
          <input type="text" id="edit-doc-tags" class="retro-input" value="${(doc.tags || []).join(', ')}">
        </div>
      </div>

      <div class="retro-modal-footer">
        <button class="retro-btn retro-btn-outline" onclick="App.closeModal()">Batal</button>
        <button class="retro-btn retro-btn-primary" onclick="BankDataModule.submitEdit()">
          <i data-lucide="check" class="icon-xs"></i> Simpan Perubahan Dokumen
        </button>
      </div>
    `;

    App.openModal(`Edit Dokumen: ${doc.title.substring(0, 32)}...`, modalContent);
  },

  submitEdit() {
    const id = document.getElementById('edit-doc-id')?.value;
    const title = document.getElementById('edit-doc-title')?.value.trim();
    const cat = document.getElementById('edit-doc-category')?.value;
    const bidangId = document.getElementById('edit-doc-bidang')?.value;
    const year = parseInt(document.getElementById('edit-doc-year')?.value, 10);
    const type = document.getElementById('edit-doc-type')?.value;
    const indicatorCode = document.getElementById('edit-doc-indicator')?.value || null;
    const desc = document.getElementById('edit-doc-desc')?.value.trim();
    const tags = (document.getElementById('edit-doc-tags')?.value || '').split(',').map(t => t.trim()).filter(Boolean);

    if (!title) {
      App.showToast('Judul dokumen wajib diisi!', 'danger');
      return;
    }

    const doc = window.store.getDocumentById(id);
    if (!doc) return;

    doc.title = title;
    doc.category = cat;
    doc.bidangId = bidangId;
    doc.year = year;
    doc.fileType = type;
    doc.indicatorCode = indicatorCode;
    doc.desc = desc;
    doc.tags = tags;

    window.store.updateDocument(doc);
    App.closeModal();
    this.render();
    if (window.PublicPortalModule) window.PublicPortalModule.renderBankDataSegment();
    App.showToast('Data dokumen berhasil diperbarui!', 'success');
  }
};

window.BankDataModule = BankDataModule;
