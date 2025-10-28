export class Tooltip {
  constructor() {
    this.tooltip = document.getElementById('tooltip');
    this.offset = { x: 15, y: 15 };
    this.isVisible = false;
  }

  show(x, y, stateName, status) {
    if (!this.tooltip) return;

    this.tooltip.innerHTML = `
      <div class="tooltip-content">
        <strong class="tooltip-state-name">${stateName}</strong>
        <div class="tooltip-status">Status: <span class="tooltip-status-value">${status}</span></div>
      </div>
    `;

    this.updatePosition(x, y);
    this.tooltip.hidden = false;
    this.tooltip.setAttribute('aria-hidden', 'false');
    this.isVisible = true;
  }

  update(x, y, stateName, status) {
    if (!this.isVisible) {
      this.show(x, y, stateName, status);
      return;
    }

    this.updatePosition(x, y);
  }

  updatePosition(x, y) {
    if (!this.tooltip) return;

    const tooltipRect = this.tooltip.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let left = x + this.offset.x;
    let top = y + this.offset.y;

    if (left + tooltipRect.width > viewportWidth - 10) {
      left = x - tooltipRect.width - this.offset.x;
    }

    if (top + tooltipRect.height > viewportHeight - 10) {
      top = y - tooltipRect.height - this.offset.y;
    }

    this.tooltip.style.cssText = `
      left: ${left}px;
      top: ${top}px;
    `;
  }

  hide() {
    if (!this.tooltip) return;

    this.tooltip.hidden = true;
    this.tooltip.setAttribute('aria-hidden', 'true');
    this.isVisible = false;
  }
}
