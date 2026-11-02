/**
 * SIDAT - SATUPUTARU - System Settings & Text Customizer
 * Mengelola SEMUA tampilan teks di sistem (Portal Publik Front End & Panel Admin Back End)
 * Khusus Super Admin
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
              <i data-lucide="type" class="icon-sm text-primary"></i> Pengaturan Semua Teks Sistem (Front End & Back End)
            </h4>
            <p class="text-muted small mb-0">
              Super Admin dapat mengubah seluruh teks judul, branding, label tab publik, kop naskah dinas, dan pejabat penandatangan. Perubahan langsung aktif di sistem.
            </p>
          </div>
          <div class="d-flex gap-2">
            <button class="glass-btn glass-btn-outline" id="btn-reset-default-texts" onclick="SystemSettingsModule.resetDefaultTexts()">
              <i data-lucide="rotate-ccw" class="icon-xs"></i> Kembalikan Teks Standar
            </button>
            <button class="glass-btn glass-btn-primary" id="btn-save-system-settings" onclick="SystemSettingsModule.saveSettings()">
              <i data-lucide="save" class="icon-xs"></i> Simpan Semua Teks
            </button>
          </div>
        </div>

        <div class="row g-4">
          
          <!-- 1. IDENTITAS & BRANDING UTAMA APLIKASI -->
          <div class="col-lg-6">
            <div class="settings-group-card h-100 p-3 bg-white border rounded shadow-sm">
              <div class="settings-group-title font-bold text-dark pb-2 mb-3 border-bottom d-flex align-items-center gap-2">
                <i data-lucide="layout" class="icon-xs text-primary"></i> 1. Identitas & Branding Utama Aplikasi
              </div>

              <div class="mb-3">
                <label class="form-label font-bold small">Nama Singkat Aplikasi / Sistem:</label>
                <input type="text" id="set-appName" class="form-control font-bold" value="${info.appName || 'SIDAT - SATUPUTARU'}">
                <span class="small text-muted" style="font-size: 0.75rem;">Ditampilkan pada header, logo, judul peramban, dan kop dokumen.</span>
              </div>

              <div class="mb-3">
                <label class="form-label font-bold small">Nama Instansi / Kedinasan:</label>
                <input type="text" id="set-instansi" class="form-control font-bold" value="${info.instansi || 'Dinas Pekerjaan Umum dan Penataan Ruang (DINPUTARU) Kabupaten Demak'}">
              </div>

              <div class="mb-3">
                <label class="form-label font-bold small">Slogan / Tagline Resmi:</label>
                <input type="text" id="set-tagline" class="form-control" value="${info.tagline || 'Sistem Informasi Capaian Kinerja & Satu Data Kab. Demak'}">
              </div>

              <div class="mb-3">
                <label class="form-label font-bold small">Teks Hak Cipta & Footer Publik:</label>
                <input type="text" id="set-footerText" class="form-control" value="${info.footerText || '© 2026 DINPUTARU Kabupaten Demak. Sistem Informasi Capaian Kinerja & Satu Data Kab. Demak.'}">
              </div>
            </div>
          </div>

          <!-- 2. TEKS PORTAL PUBLIK (FRONT END) -->
          <div class="col-lg-6">
            <div class="settings-group-card h-100 p-3 bg-white border rounded shadow-sm">
              <div class="settings-group-title font-bold text-dark pb-2 mb-3 border-bottom d-flex align-items-center gap-2">
                <i data-lucide="globe" class="icon-xs text-orange"></i> 2. Teks Halaman Depan Publik (Front End)
              </div>

              <div class="mb-3">
                <label class="form-label font-bold small">Teks Badge Atas Hero Banner:</label>
                <input type="text" id="set-heroBadge" class="form-control font-mono" value="${info.heroBadge || 'PORTAL RESMI SATU DATA & CAPAIAN KINERJA PEMKAB DEMAK'}">
              </div>

              <div class="mb-3">
                <label class="form-label font-bold small">Judul Utama Hero Banner Publik:</label>
                <input type="text" id="set-heroTitle" class="form-control font-bold" value="${info.heroTitle || 'Sistem Informasi Capaian Kinerja & Satu Data Kab. Demak'}">
              </div>

              <div class="mb-3">
                <label class="form-label font-bold small">Deskripsi Subtitle Hero Banner Publik:</label>
                <textarea id="set-heroSubtitle" class="form-control" rows="2">${info.heroSubtitle || 'Keterbukaan informasi publik dan akuntabilitas kinerja penyelenggaraan infrastruktur jalan jembatan, sumber daya air, sanitasi air minum, penataan ruang, dan bina konstruksi DINPUTARU Kabupaten Demak.'}</textarea>
              </div>

              <div class="mb-3">
                <label class="form-label font-bold small">Pesan Selamat Datang Panel Admin Internal:</label>
                <input type="text" id="set-welcomeText" class="form-control" value="${info.welcomeText || 'Portal resmi pemantauan capaian kinerja indikator daerah, IKU, program, dan bank data DINPUTARU Kabupaten Demak.'}">
              </div>
            </div>
          </div>

          <!-- 3. LABEL TAB PORTAL PUBLIK (4 TAB UTAMA) -->
          <div class="col-12">
            <div class="settings-group-card p-3 bg-white border rounded shadow-sm">
              <div class="settings-group-title font-bold text-dark pb-2 mb-3 border-bottom d-flex align-items-center gap-2">
                <i data-lucide="columns-3" class="icon-xs text-success"></i> 3. Kustomisasi Label Tab Navigasi Publik
              </div>

              <div class="row g-3">
                <div class="col-md-3">
                  <label class="form-label font-bold small">Label Tab 1 (Dashboard Card):</label>
                  <input type="text" id="set-pubTab1" class="form-control" value="${info.pubTab1Title || '1. Indikator & Grafik Tren'}">
                </div>
                <div class="col-md-3">
                  <label class="form-label font-bold small">Label Tab 2 (Matriks Tabel):</label>
                  <input type="text" id="set-pubTab2" class="form-control" value="${info.pubTab2Title || '2. Matriks Tabel Multi-Tahun (2020-2026)'}">
                </div>
                <div class="col-md-3">
                  <label class="form-label font-bold small">Label Tab 3 (Dokumen Laporan):</label>
                  <input type="text" id="set-pubTab3" class="form-control" value="${info.pubTab3Title || '3. Dokumen Laporan Kinerja Resmi (Cetak / PDF)'}">
                </div>
                <div class="col-md-3">
                  <label class="form-label font-bold small">Label Tab 4 (Bank Data):</label>
                  <input type="text" id="set-pubTab4" class="form-control" value="${info.pubTab4Title || '4. Bank Data Publik'}">
                </div>
              </div>
            </div>
          </div>

          <!-- 4. KOP SURAT & JUDUL DOKUMEN CETAK RESMI -->
          <div class="col-lg-6">
            <div class="settings-group-card h-100 p-3 bg-white border rounded shadow-sm">
              <div class="settings-group-title font-bold text-dark pb-2 mb-3 border-bottom d-flex align-items-center gap-2">
                <i data-lucide="printer" class="icon-xs text-primary"></i> 4. Kop Surat Naskah Dinas (Cetak / PDF)
              </div>

              <div class="mb-3">
                <label class="form-label font-bold small">Kop Baris 1 (Pemerintah Daerah):</label>
                <input type="text" id="set-kopBaris1" class="form-control font-bold" value="${info.kopBaris1 || 'PEMERINTAH KABUPATEN DEMAK'}">
              </div>

              <div class="mb-3">
                <label class="form-label font-bold small">Kop Baris 2 (Nama Dinas / OPD):</label>
                <input type="text" id="set-kopBaris2" class="form-control font-bold" value="${info.kopBaris2 || 'DINAS PEKERJAAN UMUM DAN PENATAAN RUANG (DINPUTARU)'}">
              </div>

              <div class="mb-3">
                <label class="form-label font-bold small">Kop Baris 3 (Alamat Kantor, Telepon, Email):</label>
                <textarea id="set-kopAlamat" class="form-control small" rows="2">${info.kopAlamat || 'Jalan Kyai Jebat No. 892 Demak, Jawa Tengah 59511 • Telepon: (0291) 685123 • Email: dinputaru@demakkab.go.id'}</textarea>
              </div>

              <div class="row g-2 mb-2">
                <div class="col-md-6">
                  <label class="form-label font-bold small">Judul Dokumen Per Indikator:</label>
                  <input type="text" id="set-docTitlePerIndicator" class="form-control small" value="${info.docTitlePerIndicator || 'LAPORAN EVALUASI PERKEMBANGAN CAPAIAN INDIKATOR KINERJA'}">
                </div>
                <div class="col-md-6">
                  <label class="form-label font-bold small">Judul Dokumen Rekap Tahunan:</label>
                  <input type="text" id="set-docTitleRekapTahunan" class="form-control small" value="${info.docTitleRekapTahunan || 'REKAPITULASI CAPAIAN KINERJA INFRASTRUKTUR DAN PENATAAN RUANG'}">
                </div>
              </div>

              <div class="mb-2">
                <label class="form-label font-bold small">Kota Titimangsa Tanda Tangan:</label>
                <input type="text" id="set-docCity" class="form-control" value="${info.docCity || 'Demak'}">
              </div>
            </div>
          </div>

          <!-- 5. PEJABAT PENANDATANGAN DOKUMEN RESMI -->
          <div class="col-lg-6">
            <div class="settings-group-card h-100 p-3 bg-white border rounded shadow-sm">
              <div class="settings-group-title font-bold text-dark pb-2 mb-3 border-bottom d-flex align-items-center gap-2">
                <i data-lucide="award" class="icon-xs text-amber"></i> 5. Pejabat Pengesahan / Penandatangan Dokumen
              </div>

              <!-- Kepala Dinas -->
              <div class="p-2 mb-3 bg-light rounded border">
                <span class="small font-bold text-primary d-block mb-1">Pejabat 1: Kepala Dinas (Pengesahan Utama)</span>
                <div class="row g-2">
                  <div class="col-12">
                    <label class="form-label small mb-0 font-bold">Jabatan:</label>
                    <input type="text" id="set-kadinJabatan" class="form-control form-control-sm" value="${info.kadinJabatan || 'KEPALA DINAS PEKERJAAN UMUM DAN PENATAAN RUANG KABUPATEN DEMAK'}">
                  </div>
                  <div class="col-md-6">
                    <label class="form-label small mb-0 font-bold">Nama Lengkap & Gelar:</label>
                    <input type="text" id="set-kadinName" class="form-control form-control-sm font-bold" value="${info.kadinName || 'Drs. H. AHMAD SUGIHARTO, S.T., M.Si.'}">
                  </div>
                  <div class="col-md-6">
                    <label class="form-label small mb-0 font-bold">Pangkat / Golongan:</label>
                    <input type="text" id="set-kadinPangkat" class="form-control form-control-sm" value="${info.kadinPangkat || 'Pembina Utama Muda (IV/c)'}">
                  </div>
                  <div class="col-12">
                    <label class="form-label small mb-0 font-bold">NIP Pegawai:</label>
                    <input type="text" id="set-kadinNip" class="form-control form-control-sm font-mono" value="${info.kadinNip || '19680315 199403 1 007'}">
                  </div>
                </div>
              </div>

              <!-- Sekretaris Dinas -->
              <div class="p-2 bg-light rounded border">
                <span class="small font-bold text-secondary d-block mb-1">Pejabat 2: Sekretaris Dinas (Verifikator)</span>
                <div class="row g-2">
                  <div class="col-12">
                    <label class="form-label small mb-0 font-bold">Jabatan:</label>
                    <input type="text" id="set-sekdinJabatan" class="form-control form-control-sm" value="${info.sekdinJabatan || 'Sekretaris DINPUTARU Kab. Demak,'}">
                  </div>
                  <div class="col-md-6">
                    <label class="form-label small mb-0 font-bold">Nama Lengkap & Gelar:</label>
                    <input type="text" id="set-sekdinName" class="form-control form-control-sm font-bold" value="${info.sekdinName || 'AMIRUL MUKMININ, S.T., M.Si.'}">
                  </div>
                  <div class="col-md-6">
                    <label class="form-label small mb-0 font-bold">Pangkat / Golongan:</label>
                    <input type="text" id="set-sekdinPangkat" class="form-control form-control-sm" value="${info.sekdinPangkat || 'Pembina (IV/a)'}">
                  </div>
                  <div class="col-12">
                    <label class="form-label small mb-0 font-bold">NIP Pegawai:</label>
                    <input type="text" id="set-sekdinNip" class="form-control form-control-sm font-mono" value="${info.sekdinNip || '19750422 200212 1 003'}">
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 6. KONTAK & ALAMAT PELAYANAN -->
          <div class="col-12">
            <div class="settings-group-card p-3 bg-white border rounded shadow-sm">
              <div class="settings-group-title font-bold text-dark pb-2 mb-3 border-bottom d-flex align-items-center gap-2">
                <i data-lucide="map-pin" class="icon-xs text-amber"></i> 6. Kontak & Informasi Alamat Kedinasan
              </div>

              <div class="row g-3">
                <div class="col-md-5">
                  <label class="form-label font-bold small">Alamat Kantor Lengkap:</label>
                  <input type="text" id="set-officeAddress" class="form-control" value="${info.officeAddress || 'Jalan Kyai Jebat No. 892 Demak, Jawa Tengah 59511'}">
                </div>
                <div class="col-md-3">
                  <label class="form-label font-bold small">Nomor Telepon Kantor:</label>
                  <input type="text" id="set-contactPhone" class="form-control font-mono" value="${info.contactPhone || '(0291) 685123'}">
                </div>
                <div class="col-md-4">
                  <label class="form-label font-bold small">Email Resmi Instansi:</label>
                  <input type="text" id="set-contactEmail" class="form-control font-mono" value="${info.contactEmail || 'dinputaru@demakkab.go.id'}">
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

    // Tab labels
    const pubTab1Title = document.getElementById('set-pubTab1')?.value.trim();
    const pubTab2Title = document.getElementById('set-pubTab2')?.value.trim();
    const pubTab3Title = document.getElementById('set-pubTab3')?.value.trim();
    const pubTab4Title = document.getElementById('set-pubTab4')?.value.trim();

    // Kop Surat & Document
    const kopBaris1 = document.getElementById('set-kopBaris1')?.value.trim();
    const kopBaris2 = document.getElementById('set-kopBaris2')?.value.trim();
    const kopAlamat = document.getElementById('set-kopAlamat')?.value.trim();
    const docTitlePerIndicator = document.getElementById('set-docTitlePerIndicator')?.value.trim();
    const docTitleRekapTahunan = document.getElementById('set-docTitleRekapTahunan')?.value.trim();
    const docCity = document.getElementById('set-docCity')?.value.trim();

    // Signatories
    const kadinJabatan = document.getElementById('set-kadinJabatan')?.value.trim();
    const kadinName = document.getElementById('set-kadinName')?.value.trim();
    const kadinPangkat = document.getElementById('set-kadinPangkat')?.value.trim();
    const kadinNip = document.getElementById('set-kadinNip')?.value.trim();

    const sekdinJabatan = document.getElementById('set-sekdinJabatan')?.value.trim();
    const sekdinName = document.getElementById('set-sekdinName')?.value.trim();
    const sekdinPangkat = document.getElementById('set-sekdinPangkat')?.value.trim();
    const sekdinNip = document.getElementById('set-sekdinNip')?.value.trim();

    // Contacts
    const officeAddress = document.getElementById('set-officeAddress')?.value.trim();
    const contactPhone = document.getElementById('set-contactPhone')?.value.trim();
    const contactEmail = document.getElementById('set-contactEmail')?.value.trim();

    const newSettings = {
      appName: appName || 'SIDAT - SATUPUTARU',
      instansi: instansi || 'Dinas Pekerjaan Umum dan Penataan Ruang (DINPUTARU) Kabupaten Demak',
      tagline: tagline || 'Sistem Informasi Capaian Kinerja & Satu Data Kab. Demak',
      footerText: footerText || '© 2026 DINPUTARU Kabupaten Demak. Sistem Informasi Capaian Kinerja & Satu Data Kab. Demak.',
      heroBadge: heroBadge || 'PORTAL RESMI SATU DATA & CAPAIAN KINERJA PEMKAB DEMAK',
      heroTitle: heroTitle || 'Sistem Informasi Capaian Kinerja & Satu Data Kab. Demak',
      heroSubtitle: heroSubtitle || 'Keterbukaan informasi publik dan akuntabilitas kinerja penyelenggaraan infrastruktur jalan jembatan, sumber daya air, sanitasi air minum, penataan ruang, dan bina konstruksi DINPUTARU Kabupaten Demak.',
      welcomeText: welcomeText || 'Portal resmi pemantauan capaian kinerja indikator daerah, IKU, program, dan bank data DINPUTARU Kabupaten Demak.',
      pubTab1Title: pubTab1Title || '1. Indikator & Grafik Tren',
      pubTab2Title: pubTab2Title || '2. Matriks Tabel Multi-Tahun (2020-2026)',
      pubTab3Title: pubTab3Title || '3. Dokumen Laporan Kinerja Resmi (Cetak / PDF)',
      pubTab4Title: pubTab4Title || '4. Bank Data Publik',
      kopBaris1: kopBaris1 || 'PEMERINTAH KABUPATEN DEMAK',
      kopBaris2: kopBaris2 || 'DINAS PEKERJAAN UMUM DAN PENATAAN RUANG (DINPUTARU)',
      kopAlamat: kopAlamat || 'Jalan Kyai Jebat No. 892 Demak, Jawa Tengah 59511 • Telepon: (0291) 685123 • Email: dinputaru@demakkab.go.id',
      docTitlePerIndicator: docTitlePerIndicator || 'LAPORAN EVALUASI PERKEMBANGAN CAPAIAN INDIKATOR KINERJA',
      docTitleRekapTahunan: docTitleRekapTahunan || 'REKAPITULASI CAPAIAN KINERJA INFRASTRUKTUR DAN PENATAAN RUANG',
      docCity: docCity || 'Demak',
      kadinJabatan: kadinJabatan || 'KEPALA DINAS PEKERJAAN UMUM DAN PENATAAN RUANG KABUPATEN DEMAK',
      kadinName: kadinName || 'Drs. H. AHMAD SUGIHARTO, S.T., M.Si.',
      kadinPangkat: kadinPangkat || 'Pembina Utama Muda (IV/c)',
      kadinNip: kadinNip || '19680315 199403 1 007',
      sekdinJabatan: sekdinJabatan || 'Sekretaris DINPUTARU Kab. Demak,',
      sekdinName: sekdinName || 'AMIRUL MUKMININ, S.T., M.Si.',
      sekdinPangkat: sekdinPangkat || 'Pembina (IV/a)',
      sekdinNip: sekdinNip || '19750422 200212 1 003',
      officeAddress: officeAddress || 'Jalan Kyai Jebat No. 892 Demak, Jawa Tengah 59511',
      contactPhone: contactPhone || '(0291) 685123',
      contactEmail: contactEmail || 'dinputaru@demakkab.go.id'
    };

    window.store.updateSystemInfo(newSettings);
    this.applyTextsToDOM(newSettings);

    if (window.LaporanModule) {
      window.LaporanModule.renderPreview();
    }

    App.showToast('Seluruh teks sistem (Front End & Back End) berhasil disimpan dan diperbarui!', 'success');
  },

  resetDefaultTexts() {
    if (!window.store.canManageUsers()) return;
    if (confirm('Kembalikan semua teks sistem ke format standar bawaan SIDAT - SATUPUTARU?')) {
      const defaultInfo = {
        appName: 'SIDAT - SATUPUTARU',
        instansi: 'Dinas Pekerjaan Umum dan Penataan Ruang (DINPUTARU) Kabupaten Demak',
        tagline: 'Sistem Informasi Capaian Kinerja & Satu Data Kab. Demak',
        heroBadge: 'PORTAL RESMI SATU DATA & CAPAIAN KINERJA PEMKAB DEMAK',
        heroTitle: 'Sistem Informasi Capaian Kinerja & Satu Data Kab. Demak',
        heroSubtitle: 'Keterbukaan informasi publik dan akuntabilitas kinerja penyelenggaraan infrastruktur jalan jembatan, sumber daya air, sanitasi air minum, penataan ruang, dan bina konstruksi DINPUTARU Kabupaten Demak.',
        welcomeText: 'Portal resmi pemantauan capaian kinerja indikator daerah, IKU, program, dan bank data DINPUTARU Kabupaten Demak.',
        pubTab1Title: '1. Indikator & Grafik Tren',
        pubTab2Title: '2. Matriks Tabel Multi-Tahun (2020-2026)',
        pubTab3Title: '3. Dokumen Laporan Kinerja Resmi (Cetak / PDF)',
        pubTab4Title: '4. Bank Data Publik',
        kopBaris1: 'PEMERINTAH KABUPATEN DEMAK',
        kopBaris2: 'DINAS PEKERJAAN UMUM DAN PENATAAN RUANG (DINPUTARU)',
        kopAlamat: 'Jalan Kyai Jebat No. 892 Demak, Jawa Tengah 59511 • Telepon: (0291) 685123 • Email: dinputaru@demakkab.go.id',
        docTitlePerIndicator: 'LAPORAN EVALUASI PERKEMBANGAN CAPAIAN INDIKATOR KINERJA',
        docTitleRekapTahunan: 'REKAPITULASI CAPAIAN KINERJA INFRASTRUKTUR DAN PENATAAN RUANG',
        docCity: 'Demak',
        kadinJabatan: 'KEPALA DINAS PEKERJAAN UMUM DAN PENATAAN RUANG KABUPATEN DEMAK',
        kadinName: 'Drs. H. AHMAD SUGIHARTO, S.T., M.Si.',
        kadinPangkat: 'Pembina Utama Muda (IV/c)',
        kadinNip: '19680315 199403 1 007',
        sekdinJabatan: 'Sekretaris DINPUTARU Kab. Demak,',
        sekdinName: 'AMIRUL MUKMININ, S.T., M.Si.',
        sekdinPangkat: 'Pembina (IV/a)',
        sekdinNip: '19750422 200212 1 003',
        officeAddress: 'Jalan Kyai Jebat No. 892 Demak, Jawa Tengah 59511',
        contactPhone: '(0291) 685123',
        contactEmail: 'dinputaru@demakkab.go.id',
        footerText: '© 2026 DINPUTARU Kabupaten Demak. Sistem Informasi Capaian Kinerja & Satu Data Kab. Demak.'
      };

      window.store.updateSystemInfo(defaultInfo);
      this.render();
      this.applyTextsToDOM(defaultInfo);
      if (window.LaporanModule) window.LaporanModule.renderPreview();
      App.showToast('Teks sistem dikembalikan ke default!', 'info');
    }
  },

  applyTextsToDOM(info) {
    if (!info) return;

    document.title = `${info.appName || 'SIDAT - SATUPUTARU'} - ${info.instansi || 'DINPUTARU Demak'}`;

    // Header brand text
    const brandTitle = document.getElementById('dom-app-title');
    if (brandTitle) {
      brandTitle.innerHTML = `${info.appName || 'SIDAT - SATUPUTARU'} <span class="badge-header-kab font-mono">KAB. DEMAK</span>`;
    }

    const brandSub = document.getElementById('dom-app-tagline');
    if (brandSub) {
      brandSub.textContent = `${info.instansi || 'DINPUTARU Kab. Demak'} • ${info.tagline || 'Sistem Informasi Capaian Kinerja & Satu Data'}`;
    }

    // Public hero texts
    const heroBadge = document.getElementById('dom-hero-badge');
    if (heroBadge) {
      heroBadge.innerHTML = `<i data-lucide="shield-check" class="icon-xs"></i> ${info.heroBadge || 'PORTAL RESMI SATU DATA & CAPAIAN KINERJA PEMKAB DEMAK'}`;
    }

    const heroTitle = document.getElementById('dom-hero-title');
    if (heroTitle) {
      heroTitle.textContent = info.heroTitle || 'Sistem Informasi Capaian Kinerja & Satu Data Kab. Demak';
    }

    const heroDesc = document.getElementById('dom-hero-desc');
    if (heroDesc) {
      heroDesc.textContent = info.heroSubtitle || '';
    }

    // Tab Labels
    const tab1 = document.getElementById('dom-pub-tab-1-text');
    if (tab1 && info.pubTab1Title) tab1.textContent = info.pubTab1Title;

    const tab2 = document.getElementById('dom-pub-tab-2-text');
    if (tab2 && info.pubTab2Title) tab2.textContent = info.pubTab2Title;

    const tab3 = document.getElementById('dom-pub-tab-3-text');
    if (tab3 && info.pubTab3Title) tab3.textContent = info.pubTab3Title;

    const tab4 = document.getElementById('dom-pub-tab-4-text');
    if (tab4 && info.pubTab4Title) tab4.textContent = info.pubTab4Title;

    // Footer text
    const footer = document.getElementById('dom-footer-text');
    if (footer) {
      footer.textContent = info.footerText || '© 2026 DINPUTARU Kabupaten Demak. Hak Cipta Dilindungi.';
    }

    if (window.lucide) window.lucide.createIcons();
  }
};

window.SystemSettingsModule = SystemSettingsModule;
