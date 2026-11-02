/**
 * SIDAT - SATUPUTARU - Authentication, Session & Math CAPTCHA Controller
 * Halaman & Modal Login Resmi Kedinasan DINPUTARU Kab. Demak
 * Dengan CAPTCHA Perhitungan Sederhana (+, -, ×, ÷), Akun Teks Bersih, dan Tampilan Center
 */

const Auth = {
  currentCaptcha: null,

  init() {
    this.renderSessionBar();
    this.bindEvents();

    // Subscribe to store updates
    window.store.subscribe(() => {
      this.renderSessionBar();
      this.updatePermissions();
    });

    this.updatePermissions();
  },

  renderSessionBar() {
    const container = document.getElementById('role-switcher-container');
    if (!container) return;

    const currentUser = window.store.getCurrentUser();

    if (!currentUser) {
      // Guest / Public Mode
      container.innerHTML = `
        <div class="role-bar-inner">
          <div class="role-bar-info">
            <span class="role-pill-label bg-orange text-white">PORTAL PUBLIK:</span>
            <div class="role-badge-current">
              <i data-lucide="globe" class="icon-sm text-orange"></i>
              <span class="font-bold">Akses Publik Masyarakat & Stakeholder</span>
            </div>
            <span class="role-desc-text d-none d-lg-inline">
              Memantau target dan capaian indikator kinerja infrastruktur DINPUTARU dari tahun 2020 sampai tahun aktif.
            </span>
          </div>

          <div class="d-flex align-items-center gap-2">
            <button class="pub-login-trigger-btn" onclick="Auth.openLoginModal()">
              <i data-lucide="lock" class="icon-xs"></i> Masuk Panel Admin / Aparatur
            </button>
          </div>
        </div>
      `;
    } else {
      // Logged in user mode
      const roleObj = window.store.data.roles?.find(r => r.id === currentUser.role) || { name: currentUser.roleLabel || currentUser.role };
      const bidangObj = window.store.getBidang().find(b => b.id === currentUser.bidangId) || { name: 'DINPUTARU Kab. Demak' };

      container.innerHTML = `
        <div class="role-bar-inner">
          <div class="role-bar-info">
            <span class="role-pill-label bg-slate text-white">PANEL ADMIN DINPUTARU:</span>
            <div class="role-badge-current">
              <i data-lucide="user-check" class="icon-sm text-emerald"></i>
              <span class="font-bold">${currentUser.name}</span>
              <span class="badge-adm-slate ms-1 font-bold">${roleObj.name}</span>
            </div>
            <span class="role-desc-text d-none d-lg-inline font-mono small text-muted">
              ${bidangObj.name} • NIP. ${currentUser.nip || '-'}
            </span>
          </div>

          <div class="d-flex align-items-center gap-2">
            <button class="adm-btn adm-btn-sm adm-btn-outline" onclick="Auth.logout()" title="Keluar dari sesi login">
              <i data-lucide="log-out" class="icon-xs"></i> Logout
            </button>
          </div>
        </div>
      `;
    }

    if (window.lucide) window.lucide.createIcons();
  },

  bindEvents() {
    // Escape key closes modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const overlay = document.getElementById('global-modal-overlay');
        if (overlay && overlay.classList.contains('show')) {
          App.closeModal();
        }
      }
    });
  },

  /* ----------------- MATH CAPTCHA GENERATOR (+, -, ×, ÷) ----------------- */
  async generateCaptcha() {
    // 1. Try to fetch fresh captcha from backend API
    try {
      const res = await fetch('/api/captcha');
      if (res.ok) {
        const data = await res.json();
        if (data && data.captchaId && data.question) {
          this.currentCaptcha = {
            id: data.captchaId,
            question: data.question
          };
          this.updateCaptchaDOM(data.question, data.captchaId);
          return this.currentCaptcha;
        }
      }
    } catch (e) {
      console.warn('API captcha fetch failed, falling back to local generator:', e);
    }

    // 2. Local Fallback Generator
    const operators = ['+', '-', '×', '÷'];
    const op = operators[Math.floor(Math.random() * operators.length)];
    let num1, num2, answer, questionText;

    switch (op) {
      case '+': {
        num1 = Math.floor(Math.random() * 15) + 1;
        num2 = Math.floor(Math.random() * 15) + 1;
        answer = num1 + num2;
        questionText = `${num1} + ${num2} = ?`;
        break;
      }
      case '-': {
        num1 = Math.floor(Math.random() * 20) + 10;
        num2 = Math.floor(Math.random() * (num1 - 2)) + 1;
        answer = num1 - num2;
        questionText = `${num1} - ${num2} = ?`;
        break;
      }
      case '×': {
        num1 = Math.floor(Math.random() * 7) + 2;
        num2 = Math.floor(Math.random() * 7) + 2;
        answer = num1 * num2;
        questionText = `${num1} × ${num2} = ?`;
        break;
      }
      case '÷': {
        const divisor = Math.floor(Math.random() * 5) + 2;
        const quotient = Math.floor(Math.random() * 6) + 2;
        num1 = divisor * quotient;
        num2 = divisor;
        answer = quotient;
        questionText = `${num1} ÷ ${num2} = ?`;
        break;
      }
      default: {
        num1 = 5;
        num2 = 5;
        answer = 10;
        questionText = `5 + 5 = ?`;
      }
    }

    const captchaId = 'cap_' + Math.random().toString(36).substring(2, 11);
    this.currentCaptcha = {
      id: captchaId,
      question: questionText,
      answer: answer
    };

    this.updateCaptchaDOM(questionText, captchaId);
    return this.currentCaptcha;
  },

  updateCaptchaDOM(question, id) {
    const displayEl = document.getElementById('captcha-equation-text');
    const inputEl = document.getElementById('login-captcha');
    const idInput = document.getElementById('login-captcha-id');

    if (displayEl) displayEl.textContent = question;
    if (inputEl) inputEl.value = '';
    if (idInput) idInput.value = id;
  },

  /* ----------------- BUKA MODAL LOGIN CENTERED ----------------- */
  openLoginModal() {
    const modalContent = `
      <div class="login-modal-container text-center">
        
        <!-- Header Emblem & Judul -->
        <div class="login-header-emblem mb-3">
          <div class="brand-emblem mx-auto mb-2" style="width: 56px; height: 56px; font-size: 1.2rem; background: #ea580c; color: #ffffff; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 800; box-shadow: 0 4px 12px rgba(234, 88, 12, 0.25);">
            PUTR
          </div>
          <h4 class="font-bold text-dark mb-1">Masuk Panel Administrator & Aparatur</h4>
          <p class="small text-muted mb-0">Sistem Informasi Capaian Kinerja & Satu Data DINPUTARU Kab. Demak</p>
        </div>

        <!-- Alert Container for Errors -->
        <div id="login-error-alert" class="alert alert-danger py-2 px-3 small font-bold mb-3 text-start" style="display: none;"></div>

        <!-- FORM LOGIN UTAMA -->
        <div class="login-form-card mb-3 text-start">
          <div class="mb-3">
            <label class="form-label font-bold small text-dark d-flex align-items-center gap-1">
              <i data-lucide="user" class="icon-xs text-orange"></i>
              <span>Username / Email Kedinasan:</span>
            </label>
            <input type="text" id="login-username" class="login-input-field font-mono" placeholder="Masukkan username (contoh: superadmin)" autocomplete="username">
          </div>

          <div class="mb-3">
            <label class="form-label font-bold small text-dark d-flex align-items-center gap-1">
              <i data-lucide="key" class="icon-xs text-orange"></i>
              <span>Password:</span>
            </label>
            <input type="password" id="login-password" class="login-input-field font-mono" placeholder="Masukkan password (contoh: password123)" autocomplete="current-password">
          </div>

          <!-- CAPTCHA PERHITUNGAN SEDERHANA (+, -, ×, ÷) -->
          <div class="captcha-verification-box mb-3">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <label class="form-label font-bold small text-dark mb-0 d-flex align-items-center gap-1">
                <i data-lucide="calculator" class="icon-xs text-orange"></i>
                <span>Verifikasi Perhitungan:</span>
              </label>
              <button type="button" class="btn-refresh-captcha" onclick="Auth.generateCaptcha()" title="Ganti soal perhitungan">
                <i data-lucide="rotate-ccw" class="icon-xs"></i>
                <span>Ganti Soal</span>
              </button>
            </div>

            <div class="captcha-equation-row d-flex align-items-center gap-2">
              <div class="captcha-equation-badge" id="captcha-display-box" style="background: #ffffff; border: 2px solid #ea580c; border-radius: 8px; padding: 8px 16px;">
                <span id="captcha-equation-text" class="font-mono font-bold text-orange-dark fs-6">Memuat soal...</span>
              </div>
              <div class="flex-grow-1">
                <input type="number" id="login-captcha" class="login-input-field font-mono text-center font-bold" placeholder="Hasil angka..." autocomplete="off">
                <input type="hidden" id="login-captcha-id" value="">
              </div>
            </div>
            <span class="small text-muted d-block mt-1" style="font-size: 0.75rem;">
              Hitung operasi di atas untuk verifikasi keamanan.
            </span>
          </div>

          <button id="btn-submit-login" class="login-submit-btn w-100" onclick="Auth.submitLogin()">
            <i data-lucide="log-in" class="icon-xs"></i>
            <span>Masuk ke Panel Admin</span>
          </button>
        </div>

        <div class="d-flex justify-content-center">
          <button class="adm-btn adm-btn-sm adm-btn-outline" onclick="App.closeModal()">
            <i data-lucide="arrow-left" class="icon-xs"></i> Kembali ke Portal Publik
          </button>
        </div>

      </div>
    `;

    App.openModal('Autentikasi Pegawai DINPUTARU Demak', modalContent);

    // Apply compact centered modal class
    const dialog = document.querySelector('.retro-modal-dialog');
    if (dialog) dialog.classList.add('login-dialog-compact');

    // Generate Captcha
    this.generateCaptcha();

    if (window.lucide) window.lucide.createIcons();

    // Bind Enter key submissions
    setTimeout(() => {
      const uIn = document.getElementById('login-username');
      const pIn = document.getElementById('login-password');
      const cIn = document.getElementById('login-captcha');

      if (uIn) {
        uIn.focus();
        uIn.addEventListener('keydown', (e) => { if (e.key === 'Enter') pIn && pIn.focus(); });
      }
      if (pIn) {
        pIn.addEventListener('keydown', (e) => { if (e.key === 'Enter') cIn && cIn.focus(); });
      }
      if (cIn) {
        cIn.addEventListener('keydown', (e) => { if (e.key === 'Enter') this.submitLogin(); });
      }
    }, 150);
  },

  async submitLogin() {
    const errorAlert = document.getElementById('login-error-alert');
    const usernameInput = document.getElementById('login-username');
    const passwordInput = document.getElementById('login-password');
    const captchaInput = document.getElementById('login-captcha');
    const captchaIdInput = document.getElementById('login-captcha-id');
    const submitBtn = document.getElementById('btn-submit-login');

    if (errorAlert) {
      errorAlert.style.display = 'none';
      errorAlert.textContent = '';
    }

    if (!usernameInput || !passwordInput || !captchaInput) return;

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    const captchaVal = captchaInput.value.trim();
    const captchaId = captchaIdInput ? captchaIdInput.value : (this.currentCaptcha?.id || '');

    // 1. Validasi Input Kosong
    if (!username || !password) {
      this.showLoginError('Username dan Password wajib diisi!');
      return;
    }

    // 2. Validasi CAPTCHA Perhitungan Sederhana
    if (!captchaVal) {
      this.showLoginError('Hasil perhitungan Captcha wajib diisi!');
      return;
    }

    const parsedCaptcha = parseInt(captchaVal, 10);
    if (isNaN(parsedCaptcha)) {
      this.showLoginError('Hasil perhitungan Captcha harus berupa angka!');
      return;
    }

    // If local captcha is used, verify answer locally first
    if (this.currentCaptcha && this.currentCaptcha.answer !== undefined && parsedCaptcha !== this.currentCaptcha.answer) {
      this.showLoginError('Hasil perhitungan Captcha salah! Silakan hitung kembali soal yang diberikan.');
      this.generateCaptcha();
      return;
    }

    // Disable button during submit
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-1"></span> Memverifikasi...`;
    }

    // 3. Autentikasi Pengguna ke REST API Backend
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
          captchaId,
          captchaAnswer: parsedCaptcha
        })
      });

      const data = await res.json();
      if (data && data.success) {
        window.store.currentUser = data.user;
        localStorage.setItem('simondemak_session_user_id', data.user.id);
        window.store.notify();

        App.closeModal();
        App.showToast(`Selamat datang, <strong>${data.user.name}</strong> (${data.user.roleLabel})!`, 'success');
        App.switchMode('admin');
        this.updatePermissions();
        return;
      } else {
        this.showLoginError(data.message || 'Username atau Password salah! Periksa kembali.');
        this.generateCaptcha();
      }
    } catch (apiErr) {
      console.warn('Backend API login error, falling back to local store validation:', apiErr);
      const res = window.store.login(username, password);
      if (res && res.success) {
        App.closeModal();
        App.showToast(`Selamat datang, <strong>${res.user.name}</strong> (${res.user.roleLabel})!`, 'success');
        App.switchMode('admin');
        this.updatePermissions();
        return;
      } else {
        this.showLoginError(res.message || 'Username atau Password salah!');
        this.generateCaptcha();
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<i data-lucide="log-in" class="icon-xs"></i> <span>Masuk ke Panel Admin</span>`;
        if (window.lucide) window.lucide.createIcons();
      }
    }
  },

  showLoginError(msg) {
    const errorAlert = document.getElementById('login-error-alert');
    if (errorAlert) {
      errorAlert.innerHTML = `<i data-lucide="alert-circle" class="icon-xs me-1 text-danger"></i> ${msg}`;
      errorAlert.style.display = 'block';
      if (window.lucide) window.lucide.createIcons();
    } else {
      App.showToast(msg, 'danger');
    }
  },

  logout() {
    window.store.logout();
    App.showToast('Anda telah keluar dari sesi login. Beralih ke Portal Publik.', 'info');
    App.switchMode('public');
    this.updatePermissions();
  },

  updatePermissions() {
    const isSuperAdmin = window.store.canManageUsers();
    const canInput = window.store.canInputIndicatorsAndTargets();
    const canBankData = window.store.canManageBankData();

    // Elements requiring specific permissions
    document.querySelectorAll('[data-permission]').forEach(el => {
      const perm = el.getAttribute('data-permission');
      let allowed = false;

      switch(perm) {
        case 'super_admin_only':
          allowed = isSuperAdmin;
          break;
        case 'input_indikator':
        case 'input_target_realisasi':
          allowed = canInput;
          break;
        case 'manage_bank_data':
          allowed = canBankData;
          break;
        case 'executive_dashboard':
          allowed = window.store.canViewExecutiveDashboard();
          break;
        default:
          allowed = true;
      }

      if (allowed) {
        el.removeAttribute('disabled');
        el.classList.remove('action-disabled');
        el.style.display = '';
      } else {
        el.setAttribute('disabled', 'true');
        el.classList.add('action-disabled');
        if (perm === 'super_admin_only') {
          el.style.display = 'none';
        }
      }
    });

    // Update active tab buttons if non-superadmin tries to access admin tabs
    const userMgmtTabBtn = document.querySelector('.nav-tab-btn[data-tab="manajemen-user"]');
    if (userMgmtTabBtn) {
      userMgmtTabBtn.style.display = isSuperAdmin ? 'inline-flex' : 'none';
    }

    const settingsTabBtn = document.querySelector('.nav-tab-btn[data-tab="pengaturan-teks"]');
    if (settingsTabBtn) {
      settingsTabBtn.style.display = isSuperAdmin ? 'inline-flex' : 'none';
    }
  }
};

window.Auth = Auth;