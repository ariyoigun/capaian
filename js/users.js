/**
 * SIDAT - SATU PUTARU - User Management Module (Super Admin Only)
 * Tambah, edit, hapus, simpan user dengan 7 role kedinasan
 */

const UserManagementModule = {
  searchTerm: '',
  roleFilter: 'all',

  init() {
    this.bindEvents();
    this.render();
  },

  bindEvents() {
    const searchInput = document.getElementById('user-mgmt-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchTerm = e.target.value.toLowerCase().trim();
        this.render();
      });
    }

    const roleSelect = document.getElementById('user-mgmt-role-filter');
    if (roleSelect) {
      roleSelect.addEventListener('change', (e) => {
        this.roleFilter = e.target.value;
        this.render();
      });
    }

    const btnAdd = document.getElementById('btn-add-new-user');
    if (btnAdd) {
      btnAdd.addEventListener('click', () => {
        this.openAddUserModal();
      });
    }
  },

  render() {
    const container = document.getElementById('user-mgmt-table-body');
    if (!container) return;

    const users = window.store.getUsers();
    const roles = window.store.data.roles;
    const bidangList = window.store.getBidang();
    const currentUser = window.store.getCurrentUser();
    const isSuperAdmin = window.store.canManageUsers();

    // Populate role filter dropdown if empty
    const filterDropdown = document.getElementById('user-mgmt-role-filter');
    if (filterDropdown && filterDropdown.options.length <= 1) {
      filterDropdown.innerHTML = `
        <option value="all">Semua Role / Jabatan</option>
        ${roles.map(r => `<option value="${r.id}">${r.name}</option>`).join('')}
      `;
    }

    // Filter users
    const filtered = users.filter(u => {
      if (this.roleFilter !== 'all' && u.role !== this.roleFilter) return false;
      if (this.searchTerm) {
        const match = u.name.toLowerCase().includes(this.searchTerm) ||
                      u.username.toLowerCase().includes(this.searchTerm) ||
                      (u.nip && u.nip.includes(this.searchTerm)) ||
                      (u.email && u.email.toLowerCase().includes(this.searchTerm));
        if (!match) return false;
      }
      return true;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <tr>
          <td colspan="7" class="text-center p-4">
            <div class="retro-empty-state py-3">
              <i data-lucide="user-x" class="empty-icon"></i>
              <p class="mb-0">Tidak ada pengguna yang cocok dengan filter atau kata kunci pencarian.</p>
            </div>
          </td>
        </tr>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    container.innerHTML = filtered.map((u, idx) => {
      const roleObj = roles.find(r => r.id === u.role) || { name: u.role };
      const bidangObj = bidangList.find(b => b.id === u.bidangId) || { name: 'Sekretariat' };
      const isCurrent = currentUser && currentUser.id === u.id;

      return `
        <tr class="${isCurrent ? 'table-warning' : ''}">
          <td class="text-center font-bold font-mono text-muted">${idx + 1}</td>
          <td>
            <div class="d-flex align-items-center gap-2">
              <div class="user-avatar-circle">
                ${u.name.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <strong class="text-dark d-block">${u.name} ${isCurrent ? '<span class="badge bg-primary text-white ms-1">Anda</span>' : ''}</strong>
                <span class="small font-mono text-muted">NIP. ${u.nip || '-'}</span>
              </div>
            </div>
          </td>
          <td>
            <span class="retro-badge bg-white border-retro font-mono font-bold">${u.username}</span>
            <span class="d-block small text-muted font-mono">${u.email || '-'}</span>
          </td>
          <td>
            <span class="badge border-retro bg-primary-subtle text-dark font-bold">${roleObj.name}</span>
          </td>
          <td>
            <span class="small text-muted font-bold">${bidangObj.name}</span>
          </td>
          <td class="text-center">
            <span class="badge ${u.status === 'active' ? 'bg-success text-white' : 'bg-danger text-white'} border-retro small">
              ${u.status === 'active' ? 'Aktif' : 'Non-Aktif'}
            </span>
          </td>
          <td class="text-center">
            ${isSuperAdmin ? `
              <div class="d-flex justify-content-center gap-1">
                <button class="retro-btn-icon" title="Edit Data Pengguna" onclick="UserManagementModule.openEditUserModal('${u.id}')">
                  <i data-lucide="edit-3" class="icon-xs"></i>
                </button>
                ${u.id !== 'USR-001' ? `
                  <button class="retro-btn-icon text-danger" title="Hapus Pengguna" onclick="UserManagementModule.deleteUser('${u.id}')">
                    <i data-lucide="trash-2" class="icon-xs"></i>
                  </button>
                ` : ''}
              </div>
            ` : `
              <span class="text-muted small">-</span>
            `}
          </td>
        </tr>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();
  },

  openAddUserModal() {
    if (!window.store.canManageUsers()) {
      App.showToast('Hanya Super Admin yang berwenang menambah akun pengguna!', 'warning');
      return;
    }

    const roles = window.store.data.roles;
    const bidangList = window.store.getBidang();

    const modalContent = `
      <div class="retro-modal-body">
        <div class="row g-2 mb-3">
          <div class="col-md-7">
            <label class="form-label font-bold">Nama Lengkap & Gelar:</label>
            <input type="text" id="usr-add-name" class="retro-input" placeholder="Contoh: Ir. Sutrisno, M.T.">
          </div>
          <div class="col-md-5">
            <label class="form-label font-bold">NIP Pegawai:</label>
            <input type="text" id="usr-add-nip" class="retro-input font-mono" placeholder="19800101 200501 1 001">
          </div>
        </div>

        <div class="row g-2 mb-3">
          <div class="col-md-6">
            <label class="form-label font-bold">Hak Akses / Role Jabatan:</label>
            <select id="usr-add-role" class="retro-select">
              ${roles.map(r => `<option value="${r.id}">${r.name}</option>`).join('')}
            </select>
          </div>
          <div class="col-md-6">
            <label class="form-label font-bold">Unit Kerja / Bidang:</label>
            <select id="usr-add-bidang" class="retro-select">
              ${bidangList.map(b => `<option value="${b.id}">${b.name}</option>`).join('')}
            </select>
          </div>
        </div>

        <div class="row g-2 mb-3">
          <div class="col-md-6">
            <label class="form-label font-bold">Username Login:</label>
            <input type="text" id="usr-add-username" class="retro-input font-mono font-bold" placeholder="Contoh: sutrisno_bm">
          </div>
          <div class="col-md-6">
            <label class="form-label font-bold">Password Akun:</label>
            <input type="text" id="usr-add-password" class="retro-input font-mono" value="password123">
          </div>
        </div>

        <div class="row g-2 mb-3">
          <div class="col-md-6">
            <label class="form-label font-bold">Email Kedinasan:</label>
            <input type="email" id="usr-add-email" class="retro-input font-mono" placeholder="nama@demakkab.go.id">
          </div>
          <div class="col-md-6">
            <label class="form-label font-bold">Status Akun:</label>
            <select id="usr-add-status" class="retro-select">
              <option value="active">Aktif (Dapat Login)</option>
              <option value="inactive">Non-Aktif (Ditangguhkan)</option>
            </select>
          </div>
        </div>
      </div>

      <div class="retro-modal-footer">
        <button class="retro-btn retro-btn-outline" onclick="App.closeModal()">Batal</button>
        <button class="retro-btn retro-btn-primary" onclick="UserManagementModule.submitAddUser()">
          <i data-lucide="user-plus" class="icon-xs"></i> Simpan User Baru
        </button>
      </div>
    `;

    App.openModal('Tambah Akun Pengguna Baru', modalContent);
  },

  submitAddUser() {
    const name = document.getElementById('usr-add-name')?.value.trim();
    const nip = document.getElementById('usr-add-nip')?.value.trim();
    const role = document.getElementById('usr-add-role')?.value;
    const bidangId = document.getElementById('usr-add-bidang')?.value;
    const username = document.getElementById('usr-add-username')?.value.trim();
    const password = document.getElementById('usr-add-password')?.value.trim();
    const email = document.getElementById('usr-add-email')?.value.trim();
    const status = document.getElementById('usr-add-status')?.value;

    if (!name || !username || !password) {
      App.showToast('Nama, username, dan password wajib diisi!', 'danger');
      return;
    }

    // Check duplicate username
    const existing = window.store.getUsers().find(u => u.username.toLowerCase() === username.toLowerCase());
    if (existing) {
      App.showToast(`Username "${username}" sudah digunakan oleh pegawai lain!`, 'warning');
      return;
    }

    const newUser = {
      id: 'USR-' + Date.now(),
      name,
      nip,
      role,
      roleLabel: window.store.data.roles.find(r => r.id === role)?.name || role,
      bidangId,
      username,
      password,
      email: email || `${username}@demakkab.go.id`,
      status
    };

    window.store.saveUser(newUser);
    App.closeModal();
    this.render();
    App.showToast(`User <strong>${name}</strong> berhasil ditambahkan!`, 'success');
  },

  openEditUserModal(userId) {
    if (!window.store.canManageUsers()) {
      App.showToast('Hanya Super Admin yang berwenang mengubah akun pengguna!', 'warning');
      return;
    }

    const user = window.store.getUserById(userId);
    if (!user) return;

    const roles = window.store.data.roles;
    const bidangList = window.store.getBidang();

    const modalContent = `
      <div class="retro-modal-body">
        <input type="hidden" id="usr-edit-id" value="${user.id}">

        <div class="row g-2 mb-3">
          <div class="col-md-7">
            <label class="form-label font-bold">Nama Lengkap & Gelar:</label>
            <input type="text" id="usr-edit-name" class="retro-input" value="${user.name}">
          </div>
          <div class="col-md-5">
            <label class="form-label font-bold">NIP Pegawai:</label>
            <input type="text" id="usr-edit-nip" class="retro-input font-mono" value="${user.nip || ''}">
          </div>
        </div>

        <div class="row g-2 mb-3">
          <div class="col-md-6">
            <label class="form-label font-bold">Hak Akses / Role Jabatan:</label>
            <select id="usr-edit-role" class="retro-select" ${user.id === 'USR-001' ? 'disabled' : ''}>
              ${roles.map(r => `<option value="${r.id}" ${r.id === user.role ? 'selected' : ''}>${r.name}</option>`).join('')}
            </select>
          </div>
          <div class="col-md-6">
            <label class="form-label font-bold">Unit Kerja / Bidang:</label>
            <select id="usr-edit-bidang" class="retro-select">
              ${bidangList.map(b => `<option value="${b.id}" ${b.id === user.bidangId ? 'selected' : ''}>${b.name}</option>`).join('')}
            </select>
          </div>
        </div>

        <div class="row g-2 mb-3">
          <div class="col-md-6">
            <label class="form-label font-bold">Username Login:</label>
            <input type="text" id="usr-edit-username" class="retro-input font-mono font-bold" value="${user.username}">
          </div>
          <div class="col-md-6">
            <label class="form-label font-bold">Ubah Password:</label>
            <input type="text" id="usr-edit-password" class="retro-input font-mono" value="${user.password}">
          </div>
        </div>

        <div class="row g-2 mb-3">
          <div class="col-md-6">
            <label class="form-label font-bold">Email Kedinasan:</label>
            <input type="email" id="usr-edit-email" class="retro-input font-mono" value="${user.email || ''}">
          </div>
          <div class="col-md-6">
            <label class="form-label font-bold">Status Akun:</label>
            <select id="usr-edit-status" class="retro-select" ${user.id === 'USR-001' ? 'disabled' : ''}>
              <option value="active" ${user.status === 'active' ? 'selected' : ''}>Aktif (Dapat Login)</option>
              <option value="inactive" ${user.status === 'inactive' ? 'selected' : ''}>Non-Aktif (Ditangguhkan)</option>
            </select>
          </div>
        </div>
      </div>

      <div class="retro-modal-footer">
        <button class="retro-btn retro-btn-outline" onclick="App.closeModal()">Batal</button>
        <button class="retro-btn retro-btn-primary" onclick="UserManagementModule.submitEditUser()">
          <i data-lucide="check" class="icon-xs"></i> Simpan Perubahan User
        </button>
      </div>
    `;

    App.openModal(`Edit Akun: ${user.name}`, modalContent);
  },

  submitEditUser() {
    const id = document.getElementById('usr-edit-id')?.value;
    const name = document.getElementById('usr-edit-name')?.value.trim();
    const nip = document.getElementById('usr-edit-nip')?.value.trim();
    const role = document.getElementById('usr-edit-role')?.value;
    const bidangId = document.getElementById('usr-edit-bidang')?.value;
    const username = document.getElementById('usr-edit-username')?.value.trim();
    const password = document.getElementById('usr-edit-password')?.value.trim();
    const email = document.getElementById('usr-edit-email')?.value.trim();
    const status = document.getElementById('usr-edit-status')?.value;

    if (!name || !username || !password) {
      App.showToast('Nama, username, dan password wajib diisi!', 'danger');
      return;
    }

    const updated = {
      id,
      name,
      nip,
      role: role || 'super_admin',
      roleLabel: window.store.data.roles.find(r => r.id === role)?.name || role,
      bidangId,
      username,
      password,
      email,
      status: status || 'active'
    };

    window.store.saveUser(updated);
    App.closeModal();
    this.render();
    App.showToast(`Data akun <strong>${name}</strong> berhasil diperbarui!`, 'success');
  },

  deleteUser(userId) {
    if (!window.store.canManageUsers()) {
      App.showToast('Hanya Super Admin yang berwenang menghapus akun pengguna!', 'warning');
      return;
    }

    const user = window.store.getUserById(userId);
    if (!user) return;

    if (confirm(`Apakah Anda yakin ingin menghapus akun pengguna ${user.name} (${user.username})?`)) {
      const res = window.store.deleteUser(userId);
      if (res.success) {
        this.render();
        App.showToast(`Akun pengguna ${user.name} berhasil dihapus.`, 'info');
      } else {
        App.showToast(res.message, 'danger');
      }
    }
  }
};

window.UserManagementModule = UserManagementModule;
