/**
 * SIDAT - SATUPUTARU - Database Manager v4.0
 * Mendukung Dual Mode: MySQL Hostinger & JSON File Engine
 * Dinas Pekerjaan Umum dan Penataan Ruang Kab. Demak
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data');
const DB_FILE = path.join(DATA_DIR, 'database.json');
const CONFIG_FILE = path.join(__dirname, '../config/db.json');

class DatabaseManager {
  constructor() {
    this.mode = 'json'; // 'mysql' | 'json'
    this.mysqlPool = null;
    this.config = this.loadConfig();
    this.init();
  }

  loadConfig() {
    let cfg = {
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER || 'u490770675_sidatadmin',
      password: process.env.DB_PASSWORD || '*Demak2026',
      database: process.env.DB_NAME || 'u490770675_sidata',
      enabled: process.env.DB_ENABLED !== 'false'
    };

    if (fs.existsSync(CONFIG_FILE)) {
      try {
        const fileCfg = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
        cfg = { ...cfg, ...fileCfg };
      } catch (err) {
        console.warn('Gagal membaca config/db.json, menggunakan konfigurasi default', err);
      }
    }
    return cfg;
  }

  saveConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
    try {
      const configDir = path.dirname(CONFIG_FILE);
      if (!fs.existsSync(configDir)) fs.mkdirSync(configDir, { recursive: true });
      fs.writeFileSync(CONFIG_FILE, JSON.stringify(this.config, null, 2), 'utf8');
      
      // Re-initialize pool if config changes
      if (this.mysqlPool) {
        try { this.mysqlPool.end(); } catch (e) {}
        this.mysqlPool = null;
      }
      this.init();
      return true;
    } catch (e) {
      console.error('Gagal menyimpan config/db.json:', e);
      return false;
    }
  }

  async init() {
    if (this.config.enabled && this.config.database && this.config.user) {
      try {
        const mysql = require('mysql2/promise');
        this.mysqlPool = mysql.createPool({
          host: this.config.host,
          port: this.config.port,
          user: this.config.user,
          password: this.config.password,
          database: this.config.database,
          waitForConnections: true,
          connectionLimit: 10,
          queueLimit: 0,
          connectTimeout: 5000
        });

        // Test connection
        const conn = await this.mysqlPool.getConnection();
        conn.release();
        this.mode = 'mysql';
        console.log(`[DATABASE] Berhasil terhubung ke MySQL Hostinger (${this.config.host}/${this.config.database})`);
      } catch (err) {
        console.warn(`[DATABASE] MySQL belum dapat dijangkau dari server lokal (${err.message}). Berjalan dalam mode Local File JSON.`);
        this.mode = 'json';
      }
    } else {
      this.mode = 'json';
      console.log(`[DATABASE] Berjalan dalam mode Local File JSON (${DB_FILE})`);
    }
  }

  async testConnection(customConfig) {
    const cfg = customConfig || this.config;
    try {
      let mysql;
      try {
        mysql = require('mysql2/promise');
      } catch (e) {
        return {
          success: false,
          message: 'Modul mysql2 belum terpasang. Jalankan "npm install mysql2" di terminal server Hostinger.'
        };
      }

      const conn = await mysql.createConnection({
        host: cfg.host,
        port: Number(cfg.port) || 3306,
        user: cfg.user,
        password: cfg.password,
        database: cfg.database,
        connectTimeout: 5000
      });

      await conn.ping();
      await conn.end();

      return {
        success: true,
        message: `Koneksi berhasil! Database "${cfg.database}" di ${cfg.host} siap digunakan.`
      };
    } catch (err) {
      return {
        success: false,
        message: `Koneksi gagal: ${err.message}`
      };
    }
  }

  getStatus() {
    return {
      mode: this.mode,
      connected: this.mode === 'mysql' && !!this.mysqlPool,
      host: this.config.host || 'localhost',
      database: this.config.database || 'u490770675_sidata',
      user: this.config.user ? `${this.config.user.substring(0, 5)}***` : '(none)',
      enabled: !!this.config.enabled
    };
  }

  // Load Database Object (Sync)
  loadDatabaseSync() {
    try {
      if (fs.existsSync(DB_FILE)) {
        return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
      }
    } catch (err) {
      console.error('Error membaca database.json:', err);
    }
    return null;
  }

  // Load Database Object (Async with MySQL query)
  async loadDatabaseAsync() {
    if (this.mode === 'mysql' && this.mysqlPool) {
      try {
        const [settingsRows] = await this.mysqlPool.query('SELECT setting_key, setting_value FROM system_settings');
        const [rolesRows] = await this.mysqlPool.query('SELECT id, name, description FROM roles');
        const [bidangRows] = await this.mysqlPool.query('SELECT id, code, name, head, seksi FROM bidang');
        const [usersRows] = await this.mysqlPool.query('SELECT id, username, name, nip, email, phone, role_id as role, bidang_id as bidangId, status FROM users');
        const [categoriesRows] = await this.mysqlPool.query('SELECT id, code, segment_number as segmentNumber, name, description, badge_color as badgeColor FROM categories ORDER BY segment_number ASC');
        const [indicatorsRows] = await this.mysqlPool.query('SELECT * FROM indicators ORDER BY sort_order ASC');
        const [targetRows] = await this.mysqlPool.query('SELECT * FROM target_realisasi');
        const [docsRows] = await this.mysqlPool.query('SELECT id, title, category, bidang_id as bidangId, year, document_number as documentNumber, source, metric_value as metricValue, metric_label as metricLabel, stat_summary as statSummary, file_type as fileType, file_size as fileSize, tags, description as `desc` FROM bank_data');
        const [varsRows] = await this.mysqlPool.query('SELECT * FROM variables');

        if (indicatorsRows && indicatorsRows.length > 0) {
          // Reconstruct indicators with records
          const indicators = indicatorsRows.map(ind => {
            const recs = {};
            targetRows.filter(tr => tr.indicator_id === ind.id).forEach(tr => {
              recs[tr.year] = {
                target: parseFloat(tr.target) || 0,
                realisasi: parseFloat(tr.realisasi) || 0,
                notes: tr.notes || ''
              };
            });

            return {
              id: ind.id,
              code: ind.code,
              name: ind.name,
              categoryId: ind.category_id,
              bidangId: ind.bidang_id,
              wewenangBidang: ind.wewenang_bidang,
              pejabatPenanggungJawab: ind.pejabat_penanggung_jawab,
              seksiPelaksana: ind.seksi_pelaksana,
              unit: ind.unit,
              polarization: ind.polarization,
              definition: ind.definition,
              formula: ind.formula,
              source: ind.source,
              records: recs
            };
          });

          // Reconstruct system settings
          const systemInfo = {};
          let visibleYears = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];
          let activeYear = 2026;

          settingsRows.forEach(s => {
            if (s.setting_key === 'visibleYears') {
              try { visibleYears = JSON.parse(s.setting_value); } catch (e) {}
            } else if (s.setting_key === 'activeYear') {
              activeYear = parseInt(s.setting_value, 10) || 2026;
            } else {
              systemInfo[s.setting_key] = s.setting_value;
            }
          });

          // Parse tags for bank data
          const documents = docsRows.map(d => ({
            ...d,
            tags: typeof d.tags === 'string' ? d.tags.split(',').map(t => t.trim()).filter(Boolean) : (d.tags || [])
          }));

          const fullDb = {
            roles: rolesRows,
            bidang: bidangRows,
            users: usersRows,
            categories: categoriesRows,
            years: [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030],
            visibleYears,
            activeYear,
            variables: varsRows,
            indicators,
            documents,
            systemInfo
          };

          // Cache to local JSON
          this.saveDatabaseSync(fullDb);
          return fullDb;
        }
      } catch (err) {
        console.warn('[DATABASE] Query data MySQL gagal, beralih ke berkas JSON lokal:', err.message);
      }
    }
    return this.loadDatabaseSync();
  }

  // Save Database Sync to Local File
  saveDatabaseSync(data) {
    try {
      if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
      
      // Asynchronously sync to MySQL if connected
      if (this.mode === 'mysql' && this.mysqlPool) {
        this.syncToMySQL(data).catch(err => {
          console.warn('[DATABASE] Background sync ke MySQL gagal:', err.message);
        });
      }
      return true;
    } catch (err) {
      console.error('Error menulis database.json:', err);
      return false;
    }
  }

  // Save Database Async (Writes to JSON & MySQL)
  async saveDatabaseAsync(data) {
    this.saveDatabaseSync(data);
    if (this.mode === 'mysql' && this.mysqlPool) {
      await this.syncToMySQL(data);
    }
    return true;
  }

  // Persist Full Dataset to MySQL Tables
  async syncToMySQL(data) {
    if (!this.mysqlPool) return false;
    const conn = await this.mysqlPool.getConnection();
    try {
      await conn.beginTransaction();

      // 1. Sync system_settings
      if (data.systemInfo) {
        for (const [key, val] of Object.entries(data.systemInfo)) {
          if (val !== undefined && val !== null) {
            await conn.execute(
              `INSERT INTO system_settings (setting_key, setting_value) VALUES (?, ?)
               ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)`,
              [key, String(val)]
            );
          }
        }
      }
      if (data.visibleYears) {
        await conn.execute(
          `INSERT INTO system_settings (setting_key, setting_value) VALUES (?, ?)
           ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)`,
          ['visibleYears', JSON.stringify(data.visibleYears)]
        );
      }
      if (data.activeYear) {
        await conn.execute(
          `INSERT INTO system_settings (setting_key, setting_value) VALUES (?, ?)
           ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)`,
          ['activeYear', String(data.activeYear)]
        );
      }

      // 2. Sync target_realisasi & indicators
      if (data.indicators && Array.isArray(data.indicators)) {
        for (const ind of data.indicators) {
          // Upsert indicator metadata
          await conn.execute(
            `INSERT INTO indicators (id, code, name, category_id, bidang_id, wewenang_bidang, unit, polarization, definition, formula, source)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE 
               name = VALUES(name),
               category_id = VALUES(category_id),
               bidang_id = VALUES(bidang_id),
               wewenang_bidang = VALUES(wewenang_bidang),
               unit = VALUES(unit),
               polarization = VALUES(polarization),
               definition = VALUES(definition),
               formula = VALUES(formula),
               source = VALUES(source)`,
            [
              ind.id,
              ind.code || ind.id,
              ind.name || '',
              ind.categoryId || 'iku_daerah',
              ind.bidangId || 'bina_marga',
              ind.wewenangBidang || '',
              ind.unit || '%',
              ind.polarization || 'maximize',
              ind.definition || '',
              ind.formula || '',
              ind.source || ''
            ]
          );

          // Upsert records (target & realisasi)
          if (ind.records) {
            for (const [yearStr, rec] of Object.entries(ind.records)) {
              const yr = parseInt(yearStr, 10);
              const target = rec && rec.target !== undefined && rec.target !== null ? parseFloat(rec.target) : 0;
              const realisasi = rec && rec.realisasi !== undefined && rec.realisasi !== null ? parseFloat(rec.realisasi) : 0;
              const notes = rec && rec.notes ? String(rec.notes) : '';

              await conn.execute(
                `INSERT INTO target_realisasi (indicator_id, year, target, realisasi, notes)
                 VALUES (?, ?, ?, ?, ?)
                 ON DUPLICATE KEY UPDATE 
                   target = VALUES(target),
                   realisasi = VALUES(realisasi),
                   notes = VALUES(notes)`,
                [ind.id, yr, target, realisasi, notes]
              );
            }
          }
        }
      }

      // 3. Sync bank_data
      if (data.documents && Array.isArray(data.documents)) {
        for (const doc of data.documents) {
          const tagsStr = Array.isArray(doc.tags) ? doc.tags.join(', ') : (doc.tags || '');
          await conn.execute(
            `INSERT INTO bank_data (id, title, category, bidang_id, year, document_number, source, metric_value, metric_label, stat_summary, file_type, file_size, tags, description)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE
               title = VALUES(title),
               category = VALUES(category),
               bidang_id = VALUES(bidang_id),
               year = VALUES(year),
               document_number = VALUES(document_number),
               source = VALUES(source),
               metric_value = VALUES(metric_value),
               metric_label = VALUES(metric_label),
               stat_summary = VALUES(stat_summary),
               file_type = VALUES(file_type),
               file_size = VALUES(file_size),
               tags = VALUES(tags),
               description = VALUES(description)`,
            [
              doc.id,
              doc.title || '',
              doc.category || 'Statistik BPS 2025',
              doc.bidangId || 'bina_marga',
              doc.year || 2025,
              doc.documentNumber || '',
              doc.source || '',
              doc.metricValue || '',
              doc.metricLabel || '',
              doc.statSummary || '',
              doc.fileType || 'PDF',
              doc.fileSize || '2.0 MB',
              tagsStr,
              doc.desc || ''
            ]
          );
        }
      }

      // 4. Sync users
      if (data.users && Array.isArray(data.users)) {
        for (const u of data.users) {
          await conn.execute(
            `INSERT INTO users (id, username, password, name, nip, email, phone, role_id, bidang_id, status)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE
               name = VALUES(name),
               nip = VALUES(nip),
               email = VALUES(email),
               phone = VALUES(phone),
               role_id = VALUES(role_id),
               bidang_id = VALUES(bidang_id),
               status = VALUES(status)`,
            [
              u.id,
              u.username,
              u.password || 'password123',
              u.name || '',
              u.nip || '',
              u.email || (u.username + '@demakkab.go.id'),
              u.phone || '',
              u.role || 'super_admin',
              u.bidangId || 'sekretariat',
              u.status || 'active'
            ]
          );
        }
      }

      await conn.commit();
      console.log('[DATABASE] Berhasil menyinkronkan seluruh perubahan data ke MySQL Hostinger.');
      return true;
    } catch (err) {
      await conn.rollback();
      console.error('[DATABASE] Gagal menyinkronkan ke MySQL Hostinger:', err.message);
      throw err;
    } finally {
      conn.release();
    }
  }
}

module.exports = new DatabaseManager();
