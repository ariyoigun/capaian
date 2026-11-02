/**
 * SIDAT - SATUPUTARU - Database Connector Module
 * Mendukung PostgreSQL, MySQL / MariaDB, dan Fallback JSON File
 * 
 * Pengaturan melalui Environment Variable (.env):
 * DB_CLIENT=mysql | postgres | json (default: json)
 * DB_HOST=localhost
 * DB_PORT=3306 (atau 5432)
 * DB_USER=root
 * DB_PASSWORD=password
 * DB_NAME=sidat_satuputaru
 */

const fs = require('fs');
const path = require('path');

const DB_CLIENT = process.env.DB_CLIENT || 'json';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || (DB_CLIENT === 'postgres' ? 5432 : 3306);
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_NAME = process.env.DB_NAME || 'sidat_satuputaru';

const FALLBACK_JSON = path.join(__dirname, '..', 'data', 'database.json');

let pool = null;

// Inisialisasi Pool Koneksi
function initDatabasePool() {
  if (DB_CLIENT === 'mysql' || DB_CLIENT === 'mariadb') {
    try {
      const mysql = require('mysql2/promise');
      pool = mysql.createPool({
        host: DB_HOST,
        port: parseInt(DB_PORT, 10),
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
      });
      console.log(`[Database] Terhubung ke MySQL/MariaDB pada ${DB_HOST}:${DB_PORT}/${DB_NAME}`);
      return true;
    } catch (e) {
      console.warn(`[Database] Library 'mysql2' tidak terpasang atau gagal inisialisasi. Menggunakan fallback JSON storage.`);
      return false;
    }
  } else if (DB_CLIENT === 'postgres' || DB_CLIENT === 'pg') {
    try {
      const { Pool } = require('pg');
      pool = new Pool({
        host: DB_HOST,
        port: parseInt(DB_PORT, 10),
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
        max: 10
      });
      console.log(`[Database] Terhubung ke PostgreSQL pada ${DB_HOST}:${DB_PORT}/${DB_NAME}`);
      return true;
    } catch (e) {
      console.warn(`[Database] Library 'pg' tidak terpasang atau gagal inisialisasi. Menggunakan fallback JSON storage.`);
      return false;
    }
  }
  return false;
}

// Baca Data Lengkap
async function getFullData() {
  if (pool) {
    try {
      if (DB_CLIENT === 'mysql') {
        const [roles] = await pool.query('SELECT * FROM roles');
        const [bidang] = await pool.query('SELECT * FROM bidang');
        const [users] = await pool.query('SELECT id, username, name, nip, email, phone, role_id as role, bidang_id as bidangId, status FROM users');
        const [categories] = await pool.query('SELECT id, code, segment_number as segmentNumber, name, description as `desc`, badge_color as badgeColor FROM categories ORDER BY segment_number ASC');
        const [indicators] = await pool.query('SELECT * FROM indicators ORDER BY sort_order ASC');
        const [targetRealisasi] = await pool.query('SELECT * FROM target_realisasi');
        const [documents] = await pool.query('SELECT * FROM documents');
        const [settings] = await pool.query('SELECT setting_key, setting_value FROM system_settings');

        // Map records into indicators
        const indicatorsMap = indicators.map(ind => {
          const recs = {};
          targetRealisasi.filter(tr => tr.indicator_id === ind.id).forEach(tr => {
            recs[tr.year] = {
              target: parseFloat(tr.target),
              realisasi: parseFloat(tr.realisasi),
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

        const sysInfo = {};
        let visibleYears = [2020, 2021, 2022, 2023, 2024, 2025, 2026];
        let activeYear = 2026;

        settings.forEach(s => {
          if (s.setting_key === 'visibleYears') {
            try { visibleYears = JSON.parse(s.setting_value); } catch(e){}
          } else if (s.setting_key === 'activeYear') {
            activeYear = parseInt(s.setting_value, 10);
          } else {
            sysInfo[s.setting_key] = s.setting_value;
          }
        });

        return {
          roles,
          bidang,
          users,
          categories,
          indicators: indicatorsMap,
          documents,
          systemInfo: sysInfo,
          visibleYears,
          activeYear,
          years: [2020, 2021, 2022, 2023, 2024, 2025, 2026]
        };
      }
    } catch (err) {
      console.error('[Database] Query ke database gagal, beralih membaca dari database.json:', err.message);
    }
  }

  // Fallback: Local JSON File
  try {
    if (fs.existsSync(FALLBACK_JSON)) {
      const data = fs.readFileSync(FALLBACK_JSON, 'utf8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading fallback database.json:', err);
  }
  return null;
}

// Simpan / Perbarui Record Target & Realisasi
async function updateTargetRealisasi(indicatorId, year, target, realisasi, notes) {
  if (pool) {
    try {
      if (DB_CLIENT === 'mysql') {
        const query = `
          INSERT INTO target_realisasi (indicator_id, year, target, realisasi, notes)
          VALUES (?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE target = VALUES(target), realisasi = VALUES(realisasi), notes = VALUES(notes)
        `;
        await pool.execute(query, [indicatorId, year, target, realisasi, notes || '']);
        return true;
      }
    } catch (e) {
      console.error('[Database] Gagal update target realisasi di SQL:', e.message);
    }
  }

  // Fallback to JSON
  try {
    const db = JSON.parse(fs.readFileSync(FALLBACK_JSON, 'utf8'));
    const ind = (db.indicators || []).find(i => i.id === indicatorId || i.code === indicatorId);
    if (ind) {
      if (!ind.records) ind.records = {};
      if (!ind.records[year]) ind.records[year] = { target: 0, realisasi: 0, notes: '' };
      if (target !== undefined) ind.records[year].target = parseFloat(target) || 0;
      if (realisasi !== undefined) ind.records[year].realisasi = parseFloat(realisasi) || 0;
      if (notes !== undefined) ind.records[year].notes = notes;
      fs.writeFileSync(FALLBACK_JSON, JSON.stringify(db, null, 2), 'utf8');
      return true;
    }
  } catch (e) {
    console.error('Error saving to fallback json:', e);
  }
  return false;
}

// Inisialisasi awal saat modul dimuat
initDatabasePool();

module.exports = {
  getFullData,
  updateTargetRealisasi,
  initDatabasePool
};
