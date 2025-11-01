import { stateData, STATUS_COLORS, STATUS_LABELS } from './data.js';

export async function createUSMap() {
  try {
    const response = await fetch('assets/usa-map.svg');
    const svgText = await response.text();
    return svgText;
  } catch (error) {
    console.error('Error loading SVG map:', error);
    return '<svg><text x="50" y="50">Error loading map</text></svg>';
  }
}

export function colorizeMap(config = null) {
  const stateIds = config ? Object.keys(config.states) : Object.keys(stateData);

  for (const code of stateIds) {
    const status = config ? config.states[code] : stateData[code].status;
    const state = stateData[code];
    const stateElement = document.getElementById(code);

    if (stateElement && state) {
      stateElement.classList.add('state');
      stateElement.style.fill = STATUS_COLORS[status];
      stateElement.style.stroke = '#2c3e50';
      stateElement.style.strokeWidth = '1';
      stateElement.dataset.state = code;
      stateElement.dataset.status = status;
      stateElement.dataset.name = state.name;
      stateElement.dataset.region = state.region;
      stateElement.setAttribute('aria-label', `${state.name} - ${STATUS_LABELS[status]}`);
      stateElement.setAttribute('tabindex', '0');
      stateElement.setAttribute('role', 'button');
    } else {
      console.warn(`State element not found: ${code}`);
    }
  }
}
