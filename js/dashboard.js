/**
 * SIDAT - SATU PUTARU - Dashboard & Line Chart Module
 * Interactive line chart to monitor Target vs Realisasi & % Capaian
 */

const DashboardModule = {
  chartInstance: null,
  selectedIndicatorId: null,
  chartMode: 'target_vs_realisasi', // 'target_vs_realisasi' or 'percentage'

  init() {
    this.populateSelectors();
    this.bindEvents();
    
    // Default to first indicator
    const indicators = window.store.getIndicators();
    if (indicators.length > 0 && !this.selectedIndicatorId) {
      this.selectedIndicatorId = indicators[0].id;
    }

    this.render();
  },

  populateSelectors() {
    const selector = document.getElementById('dash-indicator-select');
    const catFilter = document.getElementById('dash-category-filter');
    if (!selector) return;

    const indicators = window.store.getIndicators();
    const categories = window.store.getCategories();

    // Populate category filter
    if (catFilter) {
      catFilter.innerHTML = `
        <option value="all">Semua Kategori (IKD, IKU, IKP, IKK)</option>
        ${categories.map(c => `<option value="${c.id}">${c.code} - ${c.name}</option>`).join('')}
      `;
    }

    this.updateIndicatorOptions();
  },

  updateIndicatorOptions() {
    const selector = document.getElementById('dash-indicator-select');
    const catFilter = document.getElementById('dash-category-filter');
    if (!selector) return;

    const selectedCat = catFilter ? catFilter.value : 'all';
    let indicators = window.store.getIndicators();

    if (selectedCat !== 'all') {
      indicators = indicators.filter(i => i.categoryId === selectedCat);
    }

    if (indicators.length === 0) {
      selector.innerHTML = `<option value="">-- Tidak ada indikator pada kategori ini --</option>`;
      return;
    }

    selector.innerHTML = indicators.map(ind => `
      <option value="${ind.id}" ${ind.id === this.selectedIndicatorId ? 'selected' : ''}>
        [${ind.code}] ${ind.name}
      </option>
    `).join('');

    // If current selected not in filtered list, select first available
    if (!indicators.some(i => i.id === this.selectedIndicatorId)) {
      this.selectedIndicatorId = indicators[0].id;
      selector.value = indicators[0].id;
    }
  },

  bindEvents() {
    // Indicator select change
    const selector = document.getElementById('dash-indicator-select');
    if (selector) {
      selector.addEventListener('change', (e) => {
        this.selectedIndicatorId = e.target.value;
        this.render();
      });
    }

    // Category filter change
    const catFilter = document.getElementById('dash-category-filter');
    if (catFilter) {
      catFilter.addEventListener('change', () => {
        this.updateIndicatorOptions();
        this.render();
      });
    }

    // Chart mode toggle
    const modeSelect = document.getElementById('dash-chart-mode');
    if (modeSelect) {
      modeSelect.addEventListener('change', (e) => {
        this.chartMode = e.target.value;
        this.renderChart();
      });
    }

    // Download chart button
    const btnDownload = document.getElementById('btn-download-chart');
    if (btnDownload) {
      btnDownload.addEventListener('click', () => {
        if (!this.chartInstance) return;
        const link = document.createElement('a');
        link.download = `grafik-capaian-${this.selectedIndicatorId}.png`;
        link.href = this.chartInstance.toBase64Image();
        link.click();
        App.showToast('Grafik berhasil diunduh sebagai gambar PNG!', 'success');
      });
    }
  },

  viewIndicatorInChart(indicatorId) {
    this.selectedIndicatorId = indicatorId;
    App.switchTab('dashboard');
    
    // Update dropdown selection
    const selector = document.getElementById('dash-indicator-select');
    if (selector) selector.value = indicatorId;

    this.render();
  },

  render() {
    this.renderKPIStats();
    this.renderChart();
    this.renderTableSummary();
    if (window.lucide) window.lucide.createIcons();
  },

  renderKPIStats() {
    const container = document.getElementById('dash-kpi-container');
    if (!container) return;

    const ind = window.store.getIndicatorById(this.selectedIndicatorId);
    if (!ind) {
      container.innerHTML = '';
      return;
    }

    const years = window.store.getYears();
    const latestYear = years[years.length - 1];
    const prevYear = years.length > 1 ? years[years.length - 2] : null;

    const recLatest = ind.records?.[latestYear] || { target: 0, realisasi: 0 };
    const recPrev = prevYear ? (ind.records?.[prevYear] || { target: 0, realisasi: 0 }) : null;

    const pctLatest = window.store.calculateCapaian(recLatest.target, recLatest.realisasi, ind.polarization);
    const pctPrev = recPrev ? window.store.calculateCapaian(recPrev.target, recPrev.realisasi, ind.polarization) : null;

    const status = window.store.getStatus(pctLatest);
    const trendDiff = pctPrev !== null ? Math.round((pctLatest - pctPrev) * 100) / 100 : 0;
    const isTrendUp = trendDiff >= 0;

    const cat = window.store.getCategories().find(c => c.id === ind.categoryId);
    const bidang = window.store.getBidang().find(b => b.id === ind.bidangId);

    // Compute average achievement across all recorded years
    let sumPct = 0;
    let countYr = 0;
    years.forEach(yr => {
      const r = ind.records?.[yr];
      if (r && r.target > 0) {
        sumPct += window.store.calculateCapaian(r.target, r.realisasi, ind.polarization);
        countYr++;
      }
    });
    const avgPct = countYr > 0 ? Math.round((sumPct / countYr) * 100) / 100 : 0;

    container.innerHTML = `
      <!-- Card 1: Target vs Realisasi Tahun Terkini -->
      <div class="retro-stat-card">
        <div class="stat-card-badge bg-amber">Th ${latestYear}</div>
        <div class="stat-card-body">
          <span class="stat-title">Target vs Realisasi (${latestYear})</span>
          <div class="d-flex align-items-baseline gap-2 mt-2">
            <span class="stat-number font-mono text-dark">${recLatest.realisasi}</span>
            <span class="stat-unit font-mono text-muted">/ ${recLatest.target} ${ind.unit}</span>
          </div>
          <div class="mt-2 text-muted small">
            Gap Selisih: <strong class="${recLatest.realisasi >= recLatest.target ? 'text-success' : 'text-danger'} font-mono">
              ${(recLatest.realisasi - recLatest.target > 0 ? '+' : '') + Math.round((recLatest.realisasi - recLatest.target) * 100) / 100} ${ind.unit}
            </strong>
          </div>
        </div>
      </div>

      <!-- Card 2: % Capaian Terkini -->
      <div class="retro-stat-card">
        <div class="stat-card-badge bg-cyan">% CAPAIAN</div>
        <div class="stat-card-body">
          <span class="stat-title">Persentase Capaian (${latestYear})</span>
          <div class="d-flex align-items-baseline gap-2 mt-2">
            <span class="stat-number font-mono ${pctLatest >= 100 ? 'text-emerald' : 'text-primary'}">${pctLatest}%</span>
          </div>
          <div class="mt-2">
            <span class="retro-status-badge ${status.class}">
              <i data-lucide="${status.icon}" class="icon-xs"></i> ${status.label}
            </span>
          </div>
        </div>
      </div>

      <!-- Card 3: Tren Perkembangan -->
      <div class="retro-stat-card">
        <div class="stat-card-badge ${isTrendUp ? 'bg-emerald' : 'bg-rose'}">TREN</div>
        <div class="stat-card-body">
          <span class="stat-title">Dinamika Kinerja (vs Th ${prevYear || '-'})</span>
          <div class="d-flex align-items-center gap-2 mt-2">
            <span class="stat-number font-mono ${isTrendUp ? 'text-success' : 'text-danger'}">
              ${isTrendUp ? '▲ +' : '▼ '}${trendDiff}%
            </span>
          </div>
          <div class="mt-2 text-muted small">
            ${isTrendUp ? 'Tren capaian mengalami peningkatan positif.' : 'Perlu atensi akselerasi pencapaian target.'}
          </div>
        </div>
      </div>

      <!-- Card 4: Rata-Rata Historis Multi-Tahun -->
      <div class="retro-stat-card">
        <div class="stat-card-badge bg-purple">HISTORIS</div>
        <div class="stat-card-body">
          <span class="stat-title">Rata-Rata Capaian Multi-Tahun</span>
          <div class="d-flex align-items-baseline gap-2 mt-2">
            <span class="stat-number font-mono text-dark">${avgPct}%</span>
          </div>
          <div class="mt-2 text-muted small">
            Rentang evaluasi ${years[0]} s/d ${latestYear} (${years.length} tahun)
          </div>
        </div>
      </div>
    `;

    // Update Banner Info for Indicator
    const bannerTitle = document.getElementById('dash-indicator-banner-title');
    const bannerMeta = document.getElementById('dash-indicator-banner-meta');
    if (bannerTitle) {
      bannerTitle.textContent = `[${ind.code}] ${ind.name}`;
    }
    if (bannerMeta) {
      bannerMeta.innerHTML = `
        <span class="badge border-retro bg-white text-dark"><i data-lucide="tag" class="icon-xs"></i> ${cat ? cat.name : '-'}</span>
        <span class="badge border-retro bg-white text-dark"><i data-lucide="building" class="icon-xs"></i> ${bidang ? bidang.name : '-'}</span>
        <span class="badge border-retro bg-primary text-white"><i data-lucide="shield" class="icon-xs"></i> Wewenang: ${ind.wewenangBidang || (bidang ? bidang.name : '-')}</span>
        <span class="badge border-retro bg-white text-dark"><i data-lucide="ruler" class="icon-xs"></i> Satuan: ${ind.unit}</span>
      `;
    }
  },

  renderChart() {
    const canvas = document.getElementById('monitoringLineChart');
    if (!canvas) return;

    const ind = window.store.getIndicatorById(this.selectedIndicatorId);
    if (!ind) return;

    const years = window.store.getYears();
    const targets = [];
    const realisasi = [];
    const percentages = [];

    years.forEach(yr => {
      const rec = ind.records?.[yr] || { target: 0, realisasi: 0 };
      targets.push(rec.target);
      realisasi.push(rec.realisasi);
      percentages.push(window.store.calculateCapaian(rec.target, rec.realisasi, ind.polarization));
    });

    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    const ctx = canvas.getContext('2d');

    let datasets = [];

    if (this.chartMode === 'target_vs_realisasi') {
      datasets = [
        {
          label: `Target (${ind.unit})`,
          data: targets,
          borderColor: '#1e3a8a', // Retro Deep Blue
          backgroundColor: 'rgba(30, 58, 138, 0.08)',
          borderWidth: 3,
          borderDash: [6, 4],
          pointRadius: 6,
          pointBackgroundColor: '#ffffff',
          pointBorderColor: '#1e3a8a',
          pointBorderWidth: 3,
          pointHoverRadius: 8,
          fill: false,
          tension: 0.2
        },
        {
          label: `Realisasi (${ind.unit})`,
          data: realisasi,
          borderColor: '#059669', // Retro Emerald Green
          backgroundColor: 'rgba(5, 150, 105, 0.15)',
          borderWidth: 4,
          pointRadius: 7,
          pointBackgroundColor: '#059669',
          pointBorderColor: '#1e293b',
          pointBorderWidth: 2,
          pointHoverRadius: 9,
          fill: true,
          tension: 0.25
        }
      ];
    } else {
      // Percentage Mode
      datasets = [
        {
          label: '% Capaian Kinerja',
          data: percentages,
          borderColor: '#d97706', // Retro Amber / Gold
          backgroundColor: 'rgba(217, 119, 6, 0.18)',
          borderWidth: 4,
          pointRadius: 7,
          pointBackgroundColor: '#fbbf24',
          pointBorderColor: '#1e293b',
          pointBorderWidth: 2,
          pointHoverRadius: 9,
          fill: true,
          tension: 0.25
        },
        {
          label: 'Standar 100% Target',
          data: years.map(() => 100),
          borderColor: '#dc2626',
          borderWidth: 2,
          borderDash: [4, 4],
          pointRadius: 0,
          fill: false
        }
      ];
    }

    this.chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: years.map(y => `Tahun ${y}`),
        datasets: datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: {
            position: 'top',
            labels: {
              font: {
                family: "'Plus Jakarta Sans', sans-serif",
                size: 13,
                weight: '700'
              },
              color: '#1e293b',
              usePointStyle: true,
              pointStyle: 'circle',
              padding: 20
            }
          },
          tooltip: {
            backgroundColor: '#1e293b',
            titleFont: { family: "'Plus Jakarta Sans', sans-serif", size: 14, weight: 'bold' },
            bodyFont: { family: "'JetBrains Mono', monospace", size: 13 },
            padding: 12,
            cornerRadius: 6,
            borderColor: '#fbbf24',
            borderWidth: 2,
            callbacks: {
              afterBody: (context) => {
                const dataIdx = context[0].dataIndex;
                const yr = years[dataIdx];
                const pct = percentages[dataIdx];
                const status = window.store.getStatus(pct);
                const notes = ind.records?.[yr]?.notes;
                let text = `\nCapaian: ${pct}% (${status.label})`;
                if (notes && notes !== '-') {
                  text += `\nKeterangan: ${notes}`;
                }
                return text;
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              color: '#f1f5f9',
              tickColor: '#94a3b8'
            },
            ticks: {
              font: {
                family: "'Plus Jakarta Sans', sans-serif",
                weight: 'bold',
                size: 12
              },
              color: '#1e293b'
            }
          },
          y: {
            grid: {
              color: '#e2e8f0',
              drawBorder: true,
              borderColor: '#1e293b',
              borderWidth: 2
            },
            ticks: {
              font: {
                family: "'JetBrains Mono', monospace",
                size: 12
              },
              color: '#1e293b',
              callback: (val) => `${val} ${this.chartMode === 'percentage' ? '%' : ind.unit}`
            }
          }
        }
      }
    });
  },

  renderTableSummary() {
    const tbody = document.getElementById('dash-table-summary-body');
    if (!tbody) return;

    const ind = window.store.getIndicatorById(this.selectedIndicatorId);
    if (!ind) return;

    const years = window.store.getYears();
    tbody.innerHTML = years.map(yr => {
      const rec = ind.records?.[yr] || { target: 0, realisasi: 0, notes: '-' };
      const pct = window.store.calculateCapaian(rec.target, rec.realisasi, ind.polarization);
      const status = window.store.getStatus(pct);

      return `
        <tr>
          <td class="font-bold text-center font-mono">${yr}</td>
          <td class="text-end font-mono">${rec.target} ${ind.unit}</td>
          <td class="text-end font-mono font-bold">${rec.realisasi} ${ind.unit}</td>
          <td class="text-center font-mono font-bold">
            <span class="retro-status-badge ${status.class}">${pct}%</span>
          </td>
          <td>
            <span class="status-pill-text ${status.class}">
              <i data-lucide="${status.icon}" class="icon-xs"></i> ${status.label}
            </span>
          </td>
          <td class="small text-muted">${rec.notes || '-'}</td>
        </tr>
      `;
    }).join('');
  }
};

window.DashboardModule = DashboardModule;
