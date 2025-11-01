import { stateData, STATUS_LABELS } from './data.js';

export class MapController {
  constructor(mapContainer, tooltip) {
    this.mapContainer = mapContainer;
    this.tooltip = tooltip;
    this.selectedState = null;
    this.activeFilters = new Set(['all']);
    this.init();
  }

  init() {
    this.attachEventListeners();
  }

  attachEventListeners() {
    const states = this.mapContainer.querySelectorAll('.state');

    for (const state of states) {
      state.addEventListener('mouseenter', (e) => this.handleMouseEnter(e));
      state.addEventListener('mousemove', (e) => this.handleMouseMove(e));
      state.addEventListener('mouseleave', () => this.handleMouseLeave());
      state.addEventListener('click', (e) => this.handleStateClick(e));

      state.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.handleStateClick(e);
        }
      });

      state.addEventListener('focus', (e) => this.handleMouseEnter(e));
      state.addEventListener('blur', () => this.handleMouseLeave());
    }
  }

  handleMouseEnter(event) {
    const state = event.target;
    const stateCode = state.dataset.state;
    const status = state.dataset.status;
    const stateInfo = stateData[stateCode];

    if (!stateInfo) return;

    state.classList.add('state-hover');

    this.tooltip.show(
      event.clientX,
      event.clientY,
      stateInfo.name,
      STATUS_LABELS[status]
    );
  }

  handleMouseMove(event) {
    const state = event.target;
    const stateCode = state.dataset.state;
    const status = state.dataset.status;
    const stateInfo = stateData[stateCode];

    if (!stateInfo) return;

    this.tooltip.update(
      event.clientX,
      event.clientY,
      stateInfo.name,
      STATUS_LABELS[status]
    );
  }

  handleMouseLeave() {
    const hoveredState = this.mapContainer.querySelector('.state-hover');
    if (hoveredState) {
      hoveredState.classList.remove('state-hover');
    }
    this.tooltip.hide();
  }

  handleStateClick(event) {
    const state = event.target;
    const stateCode = state.dataset.state;
    const status = state.dataset.status;
    const stateInfo = stateData[stateCode];

    if (!stateInfo) return;

    if (this.selectedState) {
      this.selectedState.classList.remove('state-selected');
    }

    if (this.selectedState === state) {
      this.selectedState = null;
      this.hideDetailPanel();
    } else {
      this.selectedState = state;
      state.classList.add('state-selected');
      this.showDetailPanel(stateInfo, status);
    }

    window.dispatchEvent(new CustomEvent('stateSelected', {
      detail: {
        code: stateCode,
        status: status,
        ...stateInfo
      }
    }));
  }

  showDetailPanel(stateInfo, status) {
    const panel = document.getElementById('detail-panel');
    if (!panel) return;

    const nameEl = panel.querySelector('.detail-name');
    const statusEl = panel.querySelector('.detail-status');
    const regionEl = panel.querySelector('.detail-region');

    if (nameEl) nameEl.textContent = stateInfo.name;
    if (statusEl) {
      statusEl.textContent = `Status: ${STATUS_LABELS[status]}`;
      statusEl.className = `detail-status status-${status}`;
    }
    if (regionEl) regionEl.textContent = `Region: ${stateInfo.region}`;

    panel.hidden = false;
    panel.setAttribute('aria-hidden', 'false');

    const closeBtn = panel.querySelector('.close-detail');
    if (closeBtn) {
      closeBtn.onclick = () => {
        this.hideDetailPanel();
        if (this.selectedState) {
          this.selectedState.classList.remove('state-selected');
          this.selectedState = null;
        }
      };
    }
  }

  hideDetailPanel() {
    const panel = document.getElementById('detail-panel');
    if (panel) {
      panel.hidden = true;
      panel.setAttribute('aria-hidden', 'true');
    }
  }

  applyFilter(filterStatus) {
    const states = this.mapContainer.querySelectorAll('.state');

    if (filterStatus === 'all') {
      for (const state of states) {
        state.style.display = 'block';
        state.style.opacity = '1';
        state.setAttribute('aria-hidden', 'false');
      }
      this.activeFilters = new Set(['all']);
      return;
    }

    if (this.activeFilters.has('all')) {
      this.activeFilters.delete('all');
    }

    if (this.activeFilters.has(filterStatus)) {
      this.activeFilters.delete(filterStatus);
    } else {
      this.activeFilters.add(filterStatus);
    }

    if (this.activeFilters.size === 0) {
      this.activeFilters.add('all');
      this.applyFilter('all');
      return;
    }

    for (const state of states) {
      const stateStatus = state.dataset.status;
      const shouldShow = this.activeFilters.has(stateStatus);

      if (shouldShow) {
        state.style.display = 'block';
        state.style.opacity = '1';
        state.setAttribute('aria-hidden', 'false');
      } else {
        state.style.display = 'block';
        state.style.opacity = '0.1';
        state.setAttribute('aria-hidden', 'true');
      }
    }

    window.dispatchEvent(new CustomEvent('filterChanged', {
      detail: { activeFilters: Array.from(this.activeFilters) }
    }));
  }

  getActiveFilters() {
    return Array.from(this.activeFilters);
  }
}
