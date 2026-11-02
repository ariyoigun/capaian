/**
 * SIDAT - SATUPUTARU - Authentication, Session & Math CAPTCHA Controller
 * Halaman & Modal Login Resmi Kedinasan dengan CAPTCHA Perhitungan Sederhana (+, -, ×, ÷)
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
    const users = window.store.getUsers();

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
      const roleObj = window.store.data.roles.find(r => r.id === currentUser.role) || { name: currentUser.role };
      const bidangObj = window.store.getBidang().find(b => b.id === currentUser.bidangId) || { name: 'DINPUTARU' };

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
            <!-- Quick Role Switcher for Demo / Testing convenience -->
            <div class="role-switcher-select-wrap d-none d-md-flex align-items-center gap-1">
              <span class="small font-bold text-muted">Simulasi Akun:</span>
              <select id="quick-demo-user-select" class="adm-select" style="width: auto; padding: 4px 8px; font-size: 0.82rem;">
                ${users.map(u => `
                  <option value="${u.id}" ${u.id === currentUser.id ? 'selected' : ''}>
                    ${u.name} (${u.roleLabel})
                  </option>
                `).join('')}
              </select>
            </div>

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
    // Quick role switch event
    document.addEventListener('change', (e) => {
      if (e.target && e.target.id === 'quick-demo-user-select') {
        const userId = e.target.value;
        window.store.loginAs(userId);
        const user = window.store.getCurrentUser();
        App.showToast(`Beralih login sebagai: <strong>${user.name}</strong> (${user.roleLabel})`, 'info');
        this.updatePermissions();
      }
    });
  },

  /* ----------------- MATH CAPTCHA GENERATOR (+, -, ×, ÷) ----------------- */
  generateCaptcha() {
    const operators = ['+', '-', '×', '÷'];
    const op = operators[Math.floor(Math.random() * operators.length)];
    let num1, num2, answer, questionText;

    switch (op) {
      case '+': {
        num1 = Math.floor(Math.random() * 20) + 1;
        num2 = Math.floor(Math.random() * 20) + 1;
        answer = num1 + num2;
        questionText = `${num1} + ${num2} = ?`;
        break;
      }
      case '-': {
        num1 = Math.floor(Math.random() * 25) + 10;
        num2 = Math.floor(Math.random() * (num1 - 2)) + 1;
        answer = num1 - num2;
        questionText = `${num1} - ${num2} = ?`;
        break;
      }
      case '×': {
        num1 = Math.floor(Math.random() * 8) + 2;
        num2 = Math.floor(Math.random() * 8) + 2;
        answer = num1 * num2;
        questionText = `${num1} × ${num2} = ?`;
        break;
      }
      case '÷': {
        const divisor = Math.floor(Math.random() * 7) + 2;
        const quotient = Math.floor(Math.random() * 8) + 2;
        num1 = divisor * quotient;
        num2 = divisor;
        answer = quotient;
        questionText = `${num1} ÷ ${num2} = ?`;
        break;
      }
      default: {
        num1 = 6;
        num2 = 4;
        answer = 10;
        questionText = `6 + 4 = ?`;
      }
    }

    const captchaId = 'cap_' + Math.random().toString(36).substring(2, 11);
    this.currentCaptcha = {
      id: captchaId,
      question: questionText,
      answer: answer
    };

    // Update DOM if modal is open
    const displayEl = document.getElementById('captcha-equation-text');
    const inputEl = document.getElementById('login-captcha');
    const idInput = document.getElementById('login-captcha-id');

    if (displayEl) displayEl.textContent = questionText;
    if (inputEl) inputEl.value = '';
    if (idInput) idInput.value = captchaId;

    return this.currentCaptcha;
  },

  openLoginModal() {
    const users = window.store.getUsers();
    const captcha = this.generateCaptcha();

    const modalContent = `
      <div class="login-modal-container">
        
        <!-- Header Modal -->
        <div class="login-header-emblem text-center mb-4">
          <div class="brand-emblem mx-auto mb-2" style="width: 58px; height: 58px; font-size: 1.25rem;">
            PUPR
          </div>
          <h4 class="font-bold text-dark mb-1">Masuk Panel Administrator & Aparatur</h4>
          <p class="small text-muted mb-0">Sistem Informasi Capaian Kinerja & Satu Data DINPUTARU Kabupaten Demak</p>
        </div>

        <!-- Alert Container for Errors -->
        <div id="login-error-alert" class="alert alert-danger py-2 px-3 small font-bold mb-3" style="display: none;"></div>

        <!-- FORM LOGIN UTAMA -->
        <div class="login-form-card mb-4">
          <div class="mb-3">
            <label class="form-label font-bold small text-dark d-flex align-items-center gap-1">
              <i data-lucide="user" class="icon-xs text-muted"></i>
              <span>Username atau Email Kedinasan:</span>
            </label>
            <input type="text" id="login-username" class="login-input-field font-mono" placeholder="Masukkan username (contoh: superadmin)" autocomplete="username">
          </div>

          <div class="mb-3">
            <label class="form-label font-bold small text-dark d-flex align-items-center gap-1">
              <i data-lucide="key" class="icon-xs text-muted"></i>
              <span>Password:</span>
            </label>
            <input type="password" id="login-password" class="login-input-field font-mono" placeholder="Masukkan password (default: password123)" autocomplete="current-password">
          </div>

          <!-- CAPTCHA PERHITUNGAN SEDERHANA (+, -, ×, ÷) -->
          <div class="captcha-verification-box mb-3">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <label class="form-label font-bold small text-dark mb-0 d-flex align-items-center gap-1">
                <i data-lucide="calculator" class="icon-xs text-orange"></i>
                <span>Verifikasi Keamanan (Hitung Sederhana):</span>
              </label>
              <button type="button" class="btn-refresh-captcha" onclick="Auth.generateCaptcha()" title="Ganti soal perhitungan">
                <i data-lucide="rotate-ccw" class="icon-xs"></i>
                <span>Ganti Soal</span>
              </button>
            </div>

            <div class="captcha-equation-row d-flex align-items-center gap-3">
              <div class="captcha-equation-badge" id="captcha-display-box">
                <span id="captcha-equation-text" class="font-mono font-bold">${captcha.question}</span>
              </div>
              <div class="flex-grow-1">
                <input type="number" id="login-captcha" class="login-input-field font-mono text-center font-bold" placeholder="Tulis hasil angka..." autocomplete="off">
                <input type="hidden" id="login-captcha-id" value="${captcha.id}">
              </div>
            </div>
            <span class="small text-muted d-block mt-1" style="font-size: 0.76rem;">
              Selesaikan operasi hitung di atas (tambah, kurang, kali, atau bagi) untuk melanjutkan login.
            </span>
          </div>

          <button class="login-submit-btn w-100 mt-2" onclick="Auth.submitLogin()">
            <i data-lucide="log-in" class="icon-xs"></i>
            <span>Masuk ke Panel Admin</span>
          </button>
        </div>

        <!-- QUICK LOGIN DEMO AKUN (7 ROLES) UNTUK PENGUJIAN -->
        <div class="quick-demo-accounts-box">
          <div class="d-flex align-items-center justify-content-between mb-2">
            <span class="small font-bold text-muted font-mono">
              <i data-lucide="users" class="icon-xs text-primary"></i> PILIHAN CEPAT DEMO ROLE (KLIK UNTUK ISI & MASUK):
            </span>
          </div>

          <div class="row g-2">
            ${users.map(u => `
              <div class="col-md-6">
                <button type="button" class="quick-role-card-btn text-start w-100" onclick="Auth.prefillAndLogin('${u.username}', 'password123')">
                  <div class="d-flex align-items-center justify-content-between">
                    <strong class="text-dark small">${u.roleLabel}</strong>
                    <span class="badge-adm-slate small font-mono">${u.username}</span>
                  </div>
                  <div class="small text-muted mt-1" style="font-size: 0.75rem;">${u.name}</div>
                </button>
              </div>
            `).join('')}
          </div>
        </div>

      </div>

      <div class="login-modal-footer d-flex justify-content-end mt-3 pt-3 border-top">
        <button class="adm-btn adm-btn-outline" onclick="App.closeModal()">Tutup</button>
      </div>
    `;

    App.openModal('Autentikasi Pegawai DINPUTARU Demak', modalContent);
    if (window.lucide) window.lucide.createIcons();

    // Auto-focus username input
    setTimeout(() => {
      const uIn = document.getElementById('login-username');
      if (uIn) uIn.focus();
    }, 150);
  },

  prefillAndLogin(username, password) {
    const uIn = document.getElementById('login-username');
    const pIn = document.getElementById('login-password');
    const cIn = document.getElementById('login-captcha');

    if (uIn) uIn.value = username;
    if (pIn) pIn.value = password;
    if (cIn && this.currentCaptcha) {
      cIn.value = this.currentCaptcha.answer;
    }

    // Auto submit login
    setTimeout(() => {
      this.submitLogin();
    }, 100);
  },

  async submitLogin() {
    const errorAlert = document.getElementById('login-error-alert');
    const usernameInput = document.getElementById('login-username');
    const passwordInput = document.getElementById('login-password');
    const captchaInput = document.getElementById('login-captcha');

    if (errorAlert) {
      errorAlert.style.display = 'none';
      errorAlert.textContent = '';
    }

    if (!usernameInput || !passwordInput || !captchaInput) return;

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    const captchaVal = captchaInput.value.trim();

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
    if (isNaN(parsedCaptcha) || !this.currentCaptcha || parsedCaptcha !== this.currentCaptcha.answer) {
      this.showLoginError('Hasil perhitungan Captcha salah! Soal baru telah dibuat, silakan coba lagi.');
      this.generateCaptcha();
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    // 3. Autentikasi Pengguna
    // Coba ke endpoint REST API Backend terlebih dahulu
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
          captchaId: this.currentCaptcha.id,
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
        this.showLoginError(data.message || 'Username atau Password salah!');
        this.generateCaptcha();
        if (window.lucide) window.lucide.createIcons();
        return;
      }
    } catch (apiErr) {
      // Fallback offline / local store
      console.log('API login fallback to local store validation');
      const res = window.store.login(username, password);
      if (res.success) {
        App.closeModal();
        App.showToast(`Selamat datang, <strong>${res.user.name}</strong> (${res.user.roleLabel})!`, 'success');
        App.switchMode('admin');
        this.updatePermissions();
      } else {
        this.showLoginError(res.message);
        this.generateCaptcha();
        if (window.lucide) window.lucide.createIcons();
      }
    }
  },

  showLoginError(msg) {
    const errorAlert = document.getElementById('login-error-alert');
    if (errorAlert) {
      errorAlert.innerHTML = `<i data-lucide="alert-circle" class="icon-xs me-1"></i> ${msg}`;
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
