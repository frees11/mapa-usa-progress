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

export function colorizeMap() {
  const stateIds = Object.keys(stateData);

  for (const code of stateIds) {
    const state = stateData[code];
    const stateElement = document.getElementById(code);

    if (stateElement) {
      stateElement.classList.add('state');
      stateElement.style.fill = STATUS_COLORS[state.status];
      stateElement.style.stroke = '#2c3e50';
      stateElement.style.strokeWidth = '1';
      stateElement.dataset.state = code;
      stateElement.dataset.status = state.status;
      stateElement.dataset.name = state.name;
      stateElement.dataset.region = state.region;
      stateElement.setAttribute('aria-label', `${state.name} - ${STATUS_LABELS[state.status]}`);
      stateElement.setAttribute('tabindex', '0');
      stateElement.setAttribute('role', 'button');
    } else {
      console.warn(`State element not found: ${code}`);
    }
  }
}
