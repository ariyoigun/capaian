/**
 * SIDAT - SATUPUTARU - Database Manager
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
      user: process.env.DB_USER || '',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || '',
      enabled: process.env.DB_ENABLED === 'true'
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
          queueLimit: 0
        });

        // Test connection
        const conn = await this.mysqlPool.getConnection();
        conn.release();
        this.mode = 'mysql';
        console.log(`[DATABASE] Berhasil terhubung ke MySQL Hostinger (${this.config.host}/${this.config.database})`);
      } catch (err) {
        console.warn(`[DATABASE] MySQL tidak aktif atau modul mysql2 belum terpasang. Berpindah ke Local JSON mode.`, err.message);
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
      database: this.config.database || 'database.json',
      user: this.config.user ? `${this.config.user.substring(0, 3)}***` : '(none)',
      enabled: !!this.config.enabled
    };
  }

  // Load Database Object
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

  saveDatabaseSync(data) {
    try {
      if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
      return true;
    } catch (err) {
      console.error('Error menulis database.json:', err);
      return false;
    }
  }
}

module.exports = new DatabaseManager();
