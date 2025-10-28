import { createUSMap, colorizeMap } from './map-svg.js';
import { MapController } from './map.js';
import { Tooltip } from './tooltip.js';
import { ChartManager } from './chart.js';
import { FilterController } from './filter.js';

class App {
  constructor() {
    this.mapContainer = document.getElementById('us-map');
    this.tooltip = null;
    this.mapController = null;
    this.chartManager = null;
    this.filterController = null;
    this.init();
  }

  async init() {
    try {
      await this.renderMap();
      this.initializeComponents();
      this.setupEventListeners();

      console.log('Interactive US Map initialized successfully');
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
    colorizeMap();
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
