const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = process.env.PORT || 3003;
const BASE_DIR = __dirname;
const DATA_DIR = path.join(BASE_DIR, 'data');
const DB_FILE = path.join(DATA_DIR, 'database.json');

// MIME Types
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject'
};

// In-Memory Math Captcha Store
// Key: captchaId -> { answer: number, expiresAt: timestamp }
const captchaStore = new Map();

// Helper: Clean up expired captchas
setInterval(() => {
  const now = Date.now();
  for (const [id, item] of captchaStore.entries()) {
    if (now > item.expiresAt) {
      captchaStore.delete(id);
    }
  }
}, 60000);

// Helper: Load database
function loadDatabase() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading database.json:', err);
  }
  return null;
}

// Helper: Save database
function saveDatabase(data) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing database.json:', err);
    return false;
  }
}

// Generate Math Captcha (Addition, Subtraction, Multiplication, Division)
function generateMathCaptcha() {
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
      num1 = 5;
      num2 = 5;
      answer = 10;
      questionText = `5 + 5 = ?`;
    }
  }

  const captchaId = crypto.randomUUID();
  captchaStore.set(captchaId, {
    answer,
    expiresAt: Date.now() + 5 * 60 * 1000 // 5 minutes validity
  });

  return {
    captchaId,
    question: questionText
  };
}

// Parse JSON request body
function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      if (body.length > 5 * 1024 * 1024) { // 5MB limit
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', reject);
  });
}

// Send JSON response
function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
  });
  res.end(JSON.stringify(data));
}

// Create HTTP Server
const server = http.createServer(async (req, res) => {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  /* =======================================================================
   * BACKEND REST API ENDPOINTS
   * ======================================================================= */

  // 1. Math CAPTCHA Generation
  if (req.method === 'GET' && pathname === '/api/captcha') {
    const captcha = generateMathCaptcha();
    sendJson(res, 200, { success: true, ...captcha });
    return;
  }

  // 2. Auth: Login with Username, Password & Math Captcha
  if (req.method === 'POST' && pathname === '/api/auth/login') {
    try {
      const body = await parseJsonBody(req);
      const { username, password, captchaId, captchaAnswer } = body;

      // Validate Captcha
      if (!captchaId || captchaAnswer === undefined || captchaAnswer === null || captchaAnswer === '') {
        sendJson(res, 400, {
          success: false,
          error: 'captcha_required',
          message: 'Jawaban perhitungan Captcha wajib diisi!'
        });
        return;
      }

      const storedCaptcha = captchaStore.get(captchaId);
      if (!storedCaptcha) {
        sendJson(res, 400, {
          success: false,
          error: 'captcha_expired',
          message: 'Captcha telah kedaluwarsa atau tidak valid. Silakan coba lagi.'
        });
        return;
      }

      // Check Captcha correctness
      const parsedUserAnswer = parseInt(captchaAnswer, 10);
      if (isNaN(parsedUserAnswer) || parsedUserAnswer !== storedCaptcha.answer) {
        captchaStore.delete(captchaId); // Invalidate once failed
        sendJson(res, 400, {
          success: false,
          error: 'captcha_invalid',
          message: 'Hasil perhitungan Captcha salah! Soal baru telah dibuat, silakan hitung kembali.'
        });
        return;
      }

      // Invalidate valid captcha once used
      captchaStore.delete(captchaId);

      // Validate Credentials
      const db = loadDatabase();
      if (!db || !db.users) {
        sendJson(res, 500, { success: false, message: 'Database sistem tidak tersedia.' });
        return;
      }

      const user = db.users.find(u =>
        (u.username.toLowerCase() === (username || '').toLowerCase().trim() ||
         u.email.toLowerCase() === (username || '').toLowerCase().trim()) &&
        u.password === password
      );

      if (!user) {
        sendJson(res, 401, {
          success: false,
          message: 'Username atau Password salah! Periksa kembali data login Anda.'
        });
        return;
      }

      if (user.status !== 'active') {
        sendJson(res, 403, {
          success: false,
          message: 'Akun Anda berstatus non-aktif. Silakan hubungi Super Admin.'
        });
        return;
      }

      // Success
      const token = crypto.randomBytes(32).toString('hex');
      sendJson(res, 200, {
        success: true,
        message: `Selamat datang, ${user.name}!`,
        token,
        user: {
          id: user.id,
          username: user.username,
          name: user.name,
          nip: user.nip,
          role: user.role,
          roleLabel: user.roleLabel,
          bidangId: user.bidangId,
          email: user.email
        }
      });
      return;
    } catch (err) {
      sendJson(res, 500, { success: false, message: 'Terjadi kesalahan pada server saat login.' });
      return;
    }
  }

  // 3. Public Front End Data Endpoint
  // Returns Target & Indicators in each category from 2020 to active year (2026),
  // respecting admin's visibleYears configuration!
  if (req.method === 'GET' && pathname === '/api/public/data') {
    const db = loadDatabase();
    if (!db) {
      sendJson(res, 500, { success: false, message: 'Gagal memuat database.' });
      return;
    }

    const allYears = db.years || [2020, 2021, 2022, 2023, 2024, 2025, 2026];
    const visibleYears = db.visibleYears || allYears;
    const activeYear = db.activeYear || allYears[allYears.length - 1];

    // Filter indicator records to only include visible years for public
    const publicIndicators = (db.indicators || []).map(ind => {
      const filteredRecords = {};
      visibleYears.forEach(yr => {
        if (ind.records && ind.records[yr]) {
          filteredRecords[yr] = ind.records[yr];
        } else {
          filteredRecords[yr] = { target: 0, realisasi: 0, notes: '' };
        }
      });

      return {
        id: ind.id,
        code: ind.code,
        name: ind.name,
        categoryId: ind.categoryId,
        bidangId: ind.bidangId,
        wewenangBidang: ind.wewenangBidang,
        pejabatPenanggungJawab: ind.pejabatPenanggungJawab,
        seksiPelaksana: ind.seksiPelaksana,
        unit: ind.unit,
        polarization: ind.polarization,
        definition: ind.definition,
        formula: ind.formula,
        source: ind.source,
        records: filteredRecords
      };
    });

    sendJson(res, 200, {
      success: true,
      systemInfo: db.systemInfo || {},
      categories: db.categories || [],
      bidang: db.bidang || [],
      visibleYears,
      activeYear,
      indicators: publicIndicators,
      documents: db.documents || []
    });
    return;
  }

  // 4. Admin Back End Data Endpoint (Full Data)
  if (req.method === 'GET' && pathname === '/api/admin/data') {
    const db = loadDatabase();
    if (!db) {
      sendJson(res, 500, { success: false, message: 'Gagal memuat database.' });
      return;
    }
    sendJson(res, 200, { success: true, data: db });
    return;
  }

  // 5. Admin: Save Full State / Sync
  if (req.method === 'POST' && pathname === '/api/admin/sync') {
    try {
      const body = await parseJsonBody(req);
      if (body && body.data) {
        saveDatabase(body.data);
        sendJson(res, 200, { success: true, message: 'Data berhasil disinkronkan ke server.' });
        return;
      }
      sendJson(res, 400, { success: false, message: 'Payload tidak valid.' });
      return;
    } catch (e) {
      sendJson(res, 500, { success: false, message: 'Gagal menyimpan sinkronisasi data.' });
      return;
    }
  }

  // 5b. GET /api/admin/years -> Get all years and visibility configuration
  if (req.method === 'GET' && pathname === '/api/admin/years') {
    const db = loadDatabase();
    if (!db) {
      sendJson(res, 500, { success: false, message: 'Gagal memuat database.' });
      return;
    }
    const allYears = db.years || [2020, 2021, 2022, 2023, 2024, 2025, 2026];
    const visibleYears = db.visibleYears || allYears;
    const activeYear = db.activeYear || allYears[allYears.length - 1];
    sendJson(res, 200, {
      success: true,
      years: allYears,
      visibleYears,
      activeYear
    });
    return;
  }

  // 6. Admin: Add New Year
  if (req.method === 'POST' && pathname === '/api/admin/years') {
    try {
      const body = await parseJsonBody(req);
      const year = parseInt(body.year, 10);
      const isVisible = body.isVisible !== false;

      if (!year || isNaN(year)) {
        sendJson(res, 400, { success: false, message: 'Format tahun tidak valid.' });
        return;
      }

      const db = loadDatabase();
      if (!db.years.includes(year)) {
        db.years.push(year);
        db.years.sort((a, b) => a - b);
      }

      if (!db.visibleYears) db.visibleYears = [...db.years];
      if (isVisible && !db.visibleYears.includes(year)) {
        db.visibleYears.push(year);
        db.visibleYears.sort((a, b) => a - b);
      }

      // Initialize records in indicators
      (db.indicators || []).forEach(ind => {
        if (!ind.records) ind.records = {};
        if (!ind.records[year]) {
          ind.records[year] = { target: 0, realisasi: 0, notes: `Tahun ${year} ditambahkan oleh admin` };
        }
      });

      // Initialize variables
      (db.variables || []).forEach(v => {
        if (!v.values) v.values = {};
        if (v.values[year] === undefined) v.values[year] = 0;
      });

      saveDatabase(db);
      sendJson(res, 200, {
        success: true,
        message: `Tahun ${year} berhasil ditambahkan!`,
        years: db.years,
        visibleYears: db.visibleYears
      });
      return;
    } catch (err) {
      sendJson(res, 500, { success: false, message: 'Gagal menambahkan tahun.' });
      return;
    }
  }

  // 7. Admin: Update Public Year Visibility & Active Year
  if (req.method === 'PUT' && pathname === '/api/admin/years/visibility') {
    try {
      const body = await parseJsonBody(req);
      const { visibleYears, activeYear } = body;

      const db = loadDatabase();
      if (Array.isArray(visibleYears)) {
        // Ensure only integers that exist in db.years
        db.visibleYears = visibleYears
          .map(y => parseInt(y, 10))
          .filter(y => db.years.includes(y))
          .sort((a, b) => a - b);
      }

      if (activeYear && db.years.includes(parseInt(activeYear, 10))) {
        db.activeYear = parseInt(activeYear, 10);
      }

      saveDatabase(db);
      sendJson(res, 200, {
        success: true,
        message: 'Pengaturan visibilitas tahun publik berhasil diperbarui!',
        visibleYears: db.visibleYears,
        activeYear: db.activeYear
      });
      return;
    } catch (err) {
      sendJson(res, 500, { success: false, message: 'Gagal memperbarui visibilitas tahun.' });
      return;
    }
  }

  // 8. Admin: Delete Year
  if (req.method === 'DELETE' && pathname.startsWith('/api/admin/years/')) {
    const yearToDelete = parseInt(pathname.split('/').pop(), 10);
    const db = loadDatabase();

    if (!db.years.includes(yearToDelete)) {
      sendJson(res, 404, { success: false, message: 'Tahun tidak ditemukan.' });
      return;
    }

    if (db.years.length <= 1) {
      sendJson(res, 400, { success: false, message: 'Tidak dapat menghapus tahun terakhir.' });
      return;
    }

    db.years = db.years.filter(y => y !== yearToDelete);
    db.visibleYears = (db.visibleYears || []).filter(y => y !== yearToDelete);
    if (db.activeYear === yearToDelete) {
      db.activeYear = db.years[db.years.length - 1];
    }

    (db.indicators || []).forEach(ind => {
      if (ind.records && ind.records[yearToDelete]) {
        delete ind.records[yearToDelete];
      }
    });

    (db.variables || []).forEach(v => {
      if (v.values && v.values[yearToDelete] !== undefined) {
        delete v.values[yearToDelete];
      }
    });

    saveDatabase(db);
    sendJson(res, 200, {
      success: true,
      message: `Tahun ${yearToDelete} berhasil dihapus dari sistem!`,
      years: db.years,
      visibleYears: db.visibleYears,
      activeYear: db.activeYear
    });
    return;
  }

  // 9. Admin: Update Target & Realisasi
  if (req.method === 'POST' && pathname === '/api/admin/target-realisasi') {
    try {
      const body = await parseJsonBody(req);
      const { indicatorId, year, target, realisasi, notes } = body;

      const db = loadDatabase();
      const indicator = (db.indicators || []).find(i => i.id === indicatorId || i.code === indicatorId);

      if (!indicator) {
        sendJson(res, 404, { success: false, message: 'Indikator tidak ditemukan.' });
        return;
      }

      if (!indicator.records) indicator.records = {};
      if (!indicator.records[year]) {
        indicator.records[year] = { target: 0, realisasi: 0, notes: '' };
      }

      if (target !== undefined) indicator.records[year].target = parseFloat(target) || 0;
      if (realisasi !== undefined) indicator.records[year].realisasi = parseFloat(realisasi) || 0;
      if (notes !== undefined) indicator.records[year].notes = notes;

      saveDatabase(db);
      sendJson(res, 200, { success: true, message: 'Target & Realisasi berhasil diperbarui!' });
      return;
    } catch (err) {
      sendJson(res, 500, { success: false, message: 'Gagal memperbarui target dan realisasi.' });
      return;
    }
  }

  /* =======================================================================
   * STATIC FILE SERVING
   * ======================================================================= */

  let reqUrl = pathname;
  if (reqUrl === '/') reqUrl = '/index.html';

  const safePath = path.normalize(reqUrl).replace(/^(\.\.[\/\\])+/, '');
  const filePath = path.join(BASE_DIR, safePath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`<h1>404 Not Found</h1><p>File not found: ${reqUrl}</p>`);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(` SIDAT - SATUPUTARU - DINPUTARU KABUPATEN DEMAK (v3.0)`);
  console.log(` Front End Publik & Back End Panel Admin`);
  console.log(` Server running at: http://localhost:${PORT}`);
  console.log(`=======================================================`);
});
