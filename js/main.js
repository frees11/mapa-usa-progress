import { createUSMap, colorizeMap } from './map-svg.js';
import { MapController } from './map.js';
import { Tooltip } from './tooltip.js';
import { ChartManager } from './chart.js';
import { FilterController } from './filter.js';
import { ConfigLoader } from './config-loader.js';

class App {
  constructor() {
    this.mapContainer = document.getElementById('us-map');
    this.tooltip = null;
    this.mapController = null;
    this.chartManager = null;
    this.filterController = null;
    this.config = null;
    this.stats = null;
    this.init();
  }

  async init() {
    try {
      this.config = await ConfigLoader.loadConfig();
      this.stats = ConfigLoader.calculateStats(this.config);
      this.stateMapping = ConfigLoader.generateStateMapping(this.config);

      await this.renderMap();
      this.initializeComponents();
      this.updateUI();
      this.setupEventListeners();

      console.log('Interactive US Map initialized successfully', this.stats);
    } catch (error) {
      console.error('Error initializing application:', error);
      this.showError('Failed to load the interactive map. Please refresh the page.');
    }
  }

  async renderMap() {
    if (!this.mapContainer) {
      throw new Error('Map container not found');
    }

    const svgMap = await createUSMap();
    this.mapContainer.innerHTML = svgMap;
    colorizeMap(this.stateMapping);
  }

  initializeComponents() {
    this.tooltip = new Tooltip();

    this.mapController = new MapController(this.mapContainer, this.tooltip);

    this.chartManager = new ChartManager('progress-chart');

    this.filterController = new FilterController(
      this.mapController,
      this.chartManager
    );
  }

  updateUI() {
    const { counts, percentages, total, completed, remaining } = this.stats;

    document.querySelectorAll('.filter-btn').forEach(btn => {
      const status = btn.getAttribute('data-status');
      if (status && status !== 'all') {
        const countText = btn.textContent;
        const label = countText.substring(0, countText.lastIndexOf('('));
        btn.textContent = `${label}(${counts[status]})`;
      }
    });

    const legendItems = document.querySelectorAll('.legend-item span:last-child');
    legendItems[0].textContent = `Done (${percentages['done']}%)`;
    legendItems[1].textContent = `In Progress (${percentages['in-progress']}%)`;
    legendItems[2].textContent = `Ready to Sprint (${percentages['ready']}%)`;
    legendItems[3].textContent = `To be Specified (${percentages['to-specify']}%)`;
    legendItems[4].textContent = `To Do (${percentages['todo']}%)`;

    const statValues = document.querySelectorAll('.stat-value');
    if (statValues.length >= 3) {
      statValues[0].textContent = total;
      statValues[1].textContent = `${completed} (${percentages['done']}%)`;
      statValues[2].textContent = `${remaining} (${100 - percentages['done']}%)`;
    }
  }

  setupEventListeners() {
    window.addEventListener('resize', () => {
      if (this.chartManager && this.chartManager.chart) {
        this.chartManager.chart.resize();
      }
    });

    window.addEventListener('stateSelected', (e) => {
      console.log('State selected:', e.detail);
    });
  }

  showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #f44336;
      color: white;
      padding: 16px 24px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
      z-index: 10000;
      font-family: 'Raleway', sans-serif;
    `;
    document.body.appendChild(errorDiv);

    setTimeout(() => {
      errorDiv.remove();
    }, 5000);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new App();
});
