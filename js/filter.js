export class FilterController {
  constructor(mapController, chartManager) {
    this.mapController = mapController;
    this.chartManager = chartManager;
    this.filterButtons = document.querySelectorAll('.filter-btn');
    this.init();
  }

  init() {
    this.attachEventListeners();
  }

  attachEventListeners() {
    for (const button of this.filterButtons) {
      button.addEventListener('click', (e) => this.handleFilterClick(e));
    }

    window.addEventListener('filterChanged', (e) => {
      this.updateChart(e.detail.activeFilters);
    });
  }

  handleFilterClick(event) {
    const button = event.currentTarget;
    const filterStatus = button.dataset.status;

    if (filterStatus === 'all') {
      for (const btn of this.filterButtons) {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      }
      button.classList.add('active');
      button.setAttribute('aria-pressed', 'true');

      this.mapController.applyFilter('all');
      this.updateChart(['all']);
    } else {
      const allButton = document.querySelector('.filter-btn[data-status="all"]');
      if (allButton) {
        allButton.classList.remove('active');
        allButton.setAttribute('aria-pressed', 'false');
      }

      button.classList.toggle('active');
      const isActive = button.classList.contains('active');
      button.setAttribute('aria-pressed', isActive ? 'true' : 'false');

      this.mapController.applyFilter(filterStatus);

      const activeFilters = this.mapController.getActiveFilters();
      if (activeFilters.length === 0 || activeFilters.includes('all')) {
        if (allButton) {
          allButton.classList.add('active');
          allButton.setAttribute('aria-pressed', 'true');
        }
        this.updateChart(['all']);
      } else {
        this.updateChart(activeFilters);
      }
    }
  }

  updateChart(activeFilters) {
    if (this.chartManager) {
      this.chartManager.update(activeFilters);
    }
  }
}
