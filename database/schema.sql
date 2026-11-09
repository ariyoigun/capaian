-- ==============================================================================
-- SIDAT - SATU PUTARU (Sistem Informasi Capaian Kinerja & Satu Data Kab. Demak)
-- DINAS PEKERJAAN UMUM DAN PENATAAN RUANG (DINPUTARU) KABUPATEN DEMAK
-- SQL Schema Definition (Kompatibel dengan MySQL 8.0+, MariaDB 10.5+, & PostgreSQL)
-- ==============================================================================

-- 1. TABEL ROLES (Hak Akses Pengguna)
CREATE TABLE IF NOT EXISTS roles (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. TABEL BIDANG PENGAMPU (Struktur Organisasi DINPUTARU)
CREATE TABLE IF NOT EXISTS bidang (
    id VARCHAR(50) PRIMARY KEY,
    code VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(150) NOT NULL,
    head VARCHAR(150),
    seksi VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. TABEL USERS (Aparatur / Pegawai DINPUTARU)
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(50) PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(150) NOT NULL,
    nip VARCHAR(50),
    email VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(30),
    role_id VARCHAR(50) NOT NULL,
    bidang_id VARCHAR(50) NOT NULL,
    status VARCHAR(20) DEFAULT 'active', -- active, inactive
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_users_role FOREIGN KEY (role_id) REFERENCES roles(id) ON UPDATE CASCADE,
    CONSTRAINT fk_users_bidang FOREIGN KEY (bidang_id) REFERENCES bidang(id) ON UPDATE CASCADE
);

-- 4. TABEL CATEGORIES (Klasifikasi Indikator: IKU, IKD, IKP, IKK)
CREATE TABLE IF NOT EXISTS categories (
    id VARCHAR(50) PRIMARY KEY,
    code VARCHAR(20) NOT NULL UNIQUE,
    segment_number INT NOT NULL,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    badge_color VARCHAR(30) DEFAULT '#ea580c',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. TABEL INDICATORS (Master Indikator Kinerja DINPUTARU)
CREATE TABLE IF NOT EXISTS indicators (
    id VARCHAR(50) PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    category_id VARCHAR(50) NOT NULL,
    bidang_id VARCHAR(50) NOT NULL,
    wewenang_bidang VARCHAR(150),
    pejabat_penanggung_jawab VARCHAR(150),
    seksi_pelaksana VARCHAR(200),
    unit VARCHAR(50) NOT NULL DEFAULT '%',
    polarization VARCHAR(20) NOT NULL DEFAULT 'maximize', -- maximize, minimize
    definition TEXT,
    formula TEXT,
    source VARCHAR(255),
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_indicators_category FOREIGN KEY (category_id) REFERENCES categories(id) ON UPDATE CASCADE,
    CONSTRAINT fk_indicators_bidang FOREIGN KEY (bidang_id) REFERENCES bidang(id) ON UPDATE CASCADE
);

-- 6. TABEL TARGET_REALISASI (Data Multi-Tahun 2020 s.d. 2026+)
CREATE TABLE IF NOT EXISTS target_realisasi (
    id INT AUTO_INCREMENT PRIMARY KEY,
    indicator_id VARCHAR(50) NOT NULL,
    year INT NOT NULL,
    target DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    realisasi DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    capaian_persen DECIMAL(6, 2) GENERATED ALWAYS AS (
        CASE 
            WHEN target > 0 THEN ROUND((realisasi / target) * 100, 2)
            ELSE 0.00 
        END
    ) STORED,
    status_kinerja VARCHAR(50), -- Sangat Baik, Baik, Cukup, Kurang
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT uq_ind_year UNIQUE (indicator_id, year),
    CONSTRAINT fk_target_indicator FOREIGN KEY (indicator_id) REFERENCES indicators(id) ON DELETE CASCADE
);

-- 7. TABEL DOCUMENTS (Bank Data Publik & Arsip Dokumen Kedinasan)
CREATE TABLE IF NOT EXISTS documents (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    document_number VARCHAR(100),
    category VARCHAR(100) NOT NULL,
    bidang_id VARCHAR(50) NOT NULL,
    year INT NOT NULL,
    file_path VARCHAR(255),
    file_size VARCHAR(50),
    tags TEXT, -- format JSON atau CSV string
    uploaded_by VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_documents_bidang FOREIGN KEY (bidang_id) REFERENCES bidang(id) ON UPDATE CASCADE
);

-- 8. TABEL SYSTEM_SETTINGS (Konfigurasi Aplikasi & Visibilitas Tahun)
CREATE TABLE IF NOT EXISTS system_settings (
    setting_key VARCHAR(100) PRIMARY KEY,
    setting_value LONGTEXT NOT NULL,
    description VARCHAR(255),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- INDEXES UNTUK PERFORMA QUERY CEPAT
CREATE INDEX idx_tr_indicator_year ON target_realisasi(indicator_id, year);
CREATE INDEX idx_ind_cat ON indicators(category_id);
CREATE INDEX idx_ind_bidang ON indicators(bidang_id);
CREATE INDEX idx_doc_bidang_year ON documents(bidang_id, year);

