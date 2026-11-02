/**
 * SIDAT - SATUPUTARU - System Settings & Text Customizer
 * Mengelola semua tampilan teks di sistem (Khusus Super Admin)
 */

const SystemSettingsModule = {
  init() {
    this.bindEvents();
    this.render();
  },

  bindEvents() {
    const btnSave = document.getElementById('btn-save-system-settings');
    if (btnSave) {
      btnSave.addEventListener('click', () => {
        this.saveSettings();
      });
    }

    const btnResetTexts = document.getElementById('btn-reset-default-texts');
    if (btnResetTexts) {
      btnResetTexts.addEventListener('click', () => {
        this.resetDefaultTexts();
      });
    }
  },

  render() {
    const container = document.getElementById('settings-content-container');
    if (!container) return;

    const info = window.store.getSystemInfo();
    const canEdit = window.store.canManageUsers();

    if (!canEdit) {
      container.innerHTML = `
        <div class="glass-card p-5 text-center">
          <div class="icon-wrap-pill text-danger mx-auto mb-3" style="width: 50px; height: 50px;">
            <i data-lucide="shield-alert" class="icon-md"></i>
          </div>
          <h4>Akses Terbatas</h4>
          <p class="text-muted">Hanya Super Admin yang berwenang mengatur teks dan konfigurasi sistem SIDAT - SATUPUTARU.</p>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    container.innerHTML = `
      <div class="glass-card p-4">
        <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4 pb-3 border-bottom">
          <div>
            <h4 class="font-bold text-dark mb-1">
              <i data-lucide="type" class="icon-sm text-primary"></i> Pengaturan Teks & Konten Sistem
            </h4>
            <p class="text-muted small mb-0">Super Admin dapat menyesuaikan seluruh teks judul, sambutan, identitas instansi, dan kontak pada Portal Publik maupun Panel Internal.</p>
          </div>
          <div class="d-flex gap-2">
            <button class="glass-btn glass-btn-outline" id="btn-reset-default-texts" onclick="SystemSettingsModule.resetDefaultTexts()">
              <i data-lucide="rotate-ccw" class="icon-xs"></i> Kembalikan Teks Awal
            </button>
            <button class="glass-btn glass-btn-primary" id="btn-save-system-settings" onclick="SystemSettingsModule.saveSettings()">
              <i data-lucide="save" class="icon-xs"></i> Simpan Perubahan Teks
            </button>
          </div>
        </div>

        <div class="row g-4">
          <!-- 1. IDENTITAS UTAMA SISTEM -->
          <div class="col-lg-6">
            <div class="settings-group-card">
              <div class="settings-group-title">
                <i data-lucide="layout" class="icon-xs text-primary"></i> Identitas & Branding Utama
              </div>

              <div class="mb-3">
                <label class="form-label font-bold small">Nama Aplikasi / Sistem:</label>
                <input type="text" id="set-appName" class="glass-input font-bold" value="${info.appName || 'SIDAT - SATUPUTARU'}">
                <span class="small text-muted">Ditampilkan di header, logo, judul tab peramban, dan kop naskah dinas.</span>
              </div>

              <div class="mb-3">
                <label class="form-label font-bold small">Nama Instansi Resmi:</label>
                <input type="text" id="set-instansi" class="glass-input" value="${info.instansi || 'Dinas Pekerjaan Umum dan Penataan Ruang (DINPUTARU) Kabupaten Demak'}">
              </div>

              <div class="mb-3">
                <label class="form-label font-bold small">Tagline / Slogan Resmi:</label>
                <input type="text" id="set-tagline" class="glass-input" value="${info.tagline || 'Sistem Informasi Capaian Kinerja & Satu Data Kab. Demak'}">
              </div>

              <div class="mb-3">
                <label class="form-label font-bold small">Teks Hak Cipta / Footer:</label>
                <input type="text" id="set-footerText" class="glass-input" value="${info.footerText || '© 2026 DINPUTARU Kabupaten Demak. Hak Cipta Dilindungi.'}">
              </div>
            </div>
          </div>

          <!-- 2. TEKS PORTAL PUBLIK & HERO BANNER -->
          <div class="col-lg-6">
            <div class="settings-group-card">
              <div class="settings-group-title">
                <i data-lucide="globe" class="icon-xs text-emerald"></i> Teks Halaman Publik & Hero Banner
              </div>

              <div class="mb-3">
                <label class="form-label font-bold small">Badge Teks Atas Hero Banner:</label>
                <input type="text" id="set-heroBadge" class="glass-input font-mono" value="${info.heroBadge || 'PORTAL SATU DATA & CAPAIAN KINERJA PEMKAB DEMAK'}">
              </div>

              <div class="mb-3">
                <label class="form-label font-bold small">Judul Utama Hero Banner Publik:</label>
                <input type="text" id="set-heroTitle" class="glass-input font-bold" value="${info.heroTitle || 'Sistem Informasi Capaian Kinerja & Satu Data Kab. Demak'}">
              </div>

              <div class="mb-3">
                <label class="form-label font-bold small">Deskripsi Subtitle Hero Banner Publik:</label>
                <textarea id="set-heroSubtitle" class="glass-input" rows="3">${info.heroSubtitle || ''}</textarea>
              </div>

              <div class="mb-3">
                <label class="form-label font-bold small">Pesan Selamat Datang Internal:</label>
                <textarea id="set-welcomeText" class="glass-input" rows="2">${info.welcomeText || ''}</textarea>
              </div>
            </div>
          </div>

          <!-- 3. KONTAK & ALAMAT KEDINASAN -->
          <div class="col-12">
            <div class="settings-group-card">
              <div class="settings-group-title">
                <i data-lucide="map-pin" class="icon-xs text-amber"></i> Kontak & Informasi Pelayanan Kedinasan
              </div>

              <div class="row g-3">
                <div class="col-md-5">
                  <label class="form-label font-bold small">Alamat Lengkap Kantor:</label>
                  <input type="text" id="set-officeAddress" class="glass-input" value="${info.officeAddress || 'Jalan Kyai Jebat No. 892 Demak, Jawa Tengah 59511'}">
                </div>
                <div class="col-md-3">
                  <label class="form-label font-bold small">Nomor Telepon Kantor:</label>
                  <input type="text" id="set-contactPhone" class="glass-input font-mono" value="${info.contactPhone || '(0291) 685123'}">
                </div>
                <div class="col-md-4">
                  <label class="form-label font-bold small">Email Resmi Instansi:</label>
                  <input type="text" id="set-contactEmail" class="glass-input font-mono" value="${info.contactEmail || 'dinputaru@demakkab.go.id'}">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  },

  saveSettings() {
    if (!window.store.canManageUsers()) {
      App.showToast('Hanya Super Admin yang berwenang mengubah teks sistem!', 'warning');
      return;
    }

    const appName = document.getElementById('set-appName')?.value.trim();
    const instansi = document.getElementById('set-instansi')?.value.trim();
    const tagline = document.getElementById('set-tagline')?.value.trim();
    const footerText = document.getElementById('set-footerText')?.value.trim();
    const heroBadge = document.getElementById('set-heroBadge')?.value.trim();
    const heroTitle = document.getElementById('set-heroTitle')?.value.trim();
    const heroSubtitle = document.getElementById('set-heroSubtitle')?.value.trim();
    const welcomeText = document.getElementById('set-welcomeText')?.value.trim();
    const officeAddress = document.getElementById('set-officeAddress')?.value.trim();
    const contactPhone = document.getElementById('set-contactPhone')?.value.trim();
    const contactEmail = document.getElementById('set-contactEmail')?.value.trim();

    const newSettings = {
      appName: appName || 'SIDAT - SATUPUTARU',
      instansi: instansi || 'Dinas Pekerjaan Umum dan Penataan Ruang Kabupaten Demak',
      tagline: tagline || 'Sistem Informasi Capaian Kinerja & Satu Data DINPUTARU Kabupaten Demak',
      footerText: footerText || '© 2026 Dinas Pekerjaan Umum dan Penataan Ruang Kabupaten Demak',
      heroBadge: heroBadge || 'PORTAL SATU DATA & CAPAIAN KINERJA PEMKAB DEMAK',
      heroTitle: heroTitle || 'Sistem Informasi Capaian Kinerja & Bank Data DINPUTARU',
      heroSubtitle: heroSubtitle || '',
      welcomeText: welcomeText || '',
      officeAddress: officeAddress || 'Demak, Jawa Tengah',
      contactPhone: contactPhone || '(0291) 685123',
      contactEmail: contactEmail || 'dinputaru@demakkab.go.id'
    };

    window.store.updateSystemInfo(newSettings);
    this.applyTextsToDOM(newSettings);
    App.showToast('Seluruh pengaturan teks sistem berhasil disimpan & diperbarui!', 'success');
  },

  resetDefaultTexts() {
    if (!window.store.canManageUsers()) return;
    if (confirm('Kembalikan semua teks sistem ke format standar SIDAT - SATUPUTARU?')) {
      const defaultInfo = {
        appName: 'SIDAT - SATUPUTARU',
        instansi: 'Dinas Pekerjaan Umum dan Penataan Ruang Kabupaten Demak',
        tagline: 'Sistem Informasi Capaian Kinerja & Satu Data DINPUTARU Kabupaten Demak',
        heroBadge: 'PORTAL SATU DATA & CAPAIAN KINERJA PEMKAB DEMAK',
        heroTitle: 'Sistem Informasi Capaian Kinerja & Bank Data DINPUTARU',
        heroSubtitle: 'Akses informasi capaian kinerja indikator pembangunan dan bank data infrastruktur ke-PU-an Kabupaten Demak secara transparan, akuntabel, dan terintegrasi.',
        welcomeTitle: 'Selamat Datang di SIDAT - SATUPUTARU',
        welcomeText: 'Portal resmi pemantauan capaian kinerja indikator daerah, IKU, program, dan bank data Dinas Pekerjaan Umum dan Penataan Ruang Kabupaten Demak.',
        officeAddress: 'Jalan Kyai Jebat No. 892 Demak, Jawa Tengah 59511',
        contactPhone: '(0291) 685123',
        contactEmail: 'dinputaru@demakkab.go.id',
        footerText: '© 2026 Dinas Pekerjaan Umum dan Penataan Ruang Kabupaten Demak. Hak Cipta Dilindungi.'
      };
      window.store.updateSystemInfo(defaultInfo);
      this.render();
      this.applyTextsToDOM(defaultInfo);
      App.showToast('Teks sistem dikembalikan ke default!', 'info');
    }
  },

  applyTextsToDOM(info) {
    document.title = `${info.appName || 'SIDAT - SATUPUTARU'} - ${info.instansi || 'DINPUTARU Demak'}`;

    // Header brand text
    const brandTitle = document.getElementById('dom-app-title');
    if (brandTitle) brandTitle.innerHTML = `${info.appName} <span class="badge-glass badge-glass-amber">KAB. DEMAK</span>`;

    const brandSub = document.getElementById('dom-app-tagline');
    if (brandSub) brandSub.textContent = `${info.instansi} • ${info.tagline}`;

    // Public hero texts
    const heroBadge = document.getElementById('dom-hero-badge');
    if (heroBadge) heroBadge.textContent = info.heroBadge;

    const heroTitle = document.getElementById('dom-hero-title');
    if (heroTitle) heroTitle.textContent = info.heroTitle;

    const heroDesc = document.getElementById('dom-hero-desc');
    if (heroDesc) heroDesc.textContent = info.heroSubtitle;

    // Footer text
    const footer = document.getElementById('dom-footer-text');
    if (footer) footer.textContent = info.footerText;
  }
};

window.SystemSettingsModule = SystemSettingsModule;
