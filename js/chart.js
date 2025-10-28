import { STATUS, STATUS_LABELS, STATUS_COLORS, getStatusCounts } from './data.js';

export class ChartManager {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.chart = null;
    this.init();
  }

  init() {
    if (!this.canvas || typeof Chart === 'undefined') {
      console.error('Canvas element or Chart.js not found');
      return;
    }

    const counts = getStatusCounts();

    const data = {
      labels: [
        STATUS_LABELS[STATUS.DONE],
        STATUS_LABELS[STATUS.IN_PROGRESS],
        STATUS_LABELS[STATUS.READY],
        STATUS_LABELS[STATUS.TO_SPECIFY],
        STATUS_LABELS[STATUS.TODO]
      ],
      datasets: [{
        label: 'States by Status',
        data: [
          counts[STATUS.DONE],
          counts[STATUS.IN_PROGRESS],
          counts[STATUS.READY],
          counts[STATUS.TO_SPECIFY],
          counts[STATUS.TODO]
        ],
        backgroundColor: [
          STATUS_COLORS[STATUS.DONE],
          STATUS_COLORS[STATUS.IN_PROGRESS],
          STATUS_COLORS[STATUS.READY],
          STATUS_COLORS[STATUS.TO_SPECIFY],
          STATUS_COLORS[STATUS.TODO]
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

  update(activeFilters) {
    if (!this.chart) return;

    const counts = getStatusCounts();

    if (activeFilters.includes('all') || activeFilters.length === 0) {
      this.chart.data.datasets[0].data = [
        counts[STATUS.DONE],
        counts[STATUS.IN_PROGRESS],
        counts[STATUS.READY],
        counts[STATUS.TO_SPECIFY],
        counts[STATUS.TODO]
      ];
    } else {
      this.chart.data.datasets[0].data = [
        activeFilters.includes(STATUS.DONE) ? counts[STATUS.DONE] : 0,
        activeFilters.includes(STATUS.IN_PROGRESS) ? counts[STATUS.IN_PROGRESS] : 0,
        activeFilters.includes(STATUS.READY) ? counts[STATUS.READY] : 0,
        activeFilters.includes(STATUS.TO_SPECIFY) ? counts[STATUS.TO_SPECIFY] : 0,
        activeFilters.includes(STATUS.TODO) ? counts[STATUS.TODO] : 0
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
