import { STATUS, STATUS_LABELS, STATUS_COLORS } from './data.js';

export class ChartManager {
  constructor(canvasId, initialCounts = null) {
    this.canvas = document.getElementById(canvasId);
    this.chart = null;
    this.counts = initialCounts;
    this.init();
  }

  init() {
    if (!this.canvas || typeof Chart === 'undefined') {
      console.error('Canvas element or Chart.js not found');
      return;
    }

    const counts = this.counts || {
      [STATUS.DONE]: 0,
      [STATUS.IN_PROGRESS]: 0,
      [STATUS.READY_TO_DEV]: 0,
      [STATUS.TEST]: 0
    };

    const data = {
      labels: [
        STATUS_LABELS[STATUS.DONE],
        STATUS_LABELS[STATUS.IN_PROGRESS],
        STATUS_LABELS[STATUS.READY_TO_DEV],
        STATUS_LABELS[STATUS.TEST]
      ],
      datasets: [{
        label: 'States by Status',
        data: [
          counts[STATUS.DONE],
          counts[STATUS.IN_PROGRESS],
          counts[STATUS.READY_TO_DEV],
          counts[STATUS.TEST]
        ],
        backgroundColor: [
          STATUS_COLORS[STATUS.DONE],
          STATUS_COLORS[STATUS.IN_PROGRESS],
          STATUS_COLORS[STATUS.READY_TO_DEV],
          STATUS_COLORS[STATUS.TEST]
        ],
        borderWidth: 2,
        borderColor: '#ffffff'
      }]
    };

    const config = {
      type: 'doughnut',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              font: {
                family: "'Raleway', sans-serif",
                size: 12
              },
              padding: 15,
              usePointStyle: true,
              pointStyle: 'circle'
            }
          },
          tooltip: {
            enabled: true,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleFont: {
              family: "'Raleway', sans-serif",
              size: 14,
              weight: 'bold'
            },
            bodyFont: {
              family: "'Raleway', sans-serif",
              size: 13
            },
            padding: 12,
            cornerRadius: 8,
            callbacks: {
              label: (context) => {
                const label = context.label || '';
                const value = context.parsed;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = Math.round((value / total) * 100);
                return `${label}: ${value} states (${percentage}%)`;
              }
            }
          }
        },
        cutout: '65%',
        animation: {
          animateRotate: true,
          animateScale: true,
          duration: 1000,
          easing: 'easeInOutQuart'
        }
      }
    };

    this.chart = new Chart(this.canvas, config);
  }

  updateCounts(counts) {
    this.counts = counts;
    if (!this.chart) return;

    this.chart.data.datasets[0].data = [
      counts[STATUS.DONE],
      counts[STATUS.IN_PROGRESS],
      counts[STATUS.READY_TO_DEV],
      counts[STATUS.TEST]
    ];

    this.chart.update();
  }

  update(activeFilters) {
    if (!this.chart || !this.counts) return;

    const counts = this.counts;

    if (activeFilters.includes('all') || activeFilters.length === 0) {
      this.chart.data.datasets[0].data = [
        counts[STATUS.DONE],
        counts[STATUS.IN_PROGRESS],
        counts[STATUS.READY_TO_DEV],
        counts[STATUS.TEST]
      ];
    } else {
      this.chart.data.datasets[0].data = [
        activeFilters.includes(STATUS.DONE) ? counts[STATUS.DONE] : 0,
        activeFilters.includes(STATUS.IN_PROGRESS) ? counts[STATUS.IN_PROGRESS] : 0,
        activeFilters.includes(STATUS.READY_TO_DEV) ? counts[STATUS.READY_TO_DEV] : 0,
        activeFilters.includes(STATUS.TEST) ? counts[STATUS.TEST] : 0
      ];
    }

    this.chart.update();
  }

  destroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
