export const STATUS = {
  DONE: 'done',
  IN_PROGRESS: 'in-progress',
  READY: 'ready',
  TO_SPECIFY: 'to-specify',
  TODO: 'todo'
};

export const STATUS_LABELS = {
  [STATUS.DONE]: 'Done',
  [STATUS.IN_PROGRESS]: 'In Progress',
  [STATUS.READY]: 'Ready to Sprint',
  [STATUS.TO_SPECIFY]: 'To be Specified',
  [STATUS.TODO]: 'To Do'
};

export const STATUS_COLORS = {
  [STATUS.DONE]: '#4CAF50',
  [STATUS.IN_PROGRESS]: '#2196F3',
  [STATUS.READY]: '#FFC107',
  [STATUS.TO_SPECIFY]: '#FF9800',
  [STATUS.TODO]: '#9E9E9E'
};

export const stateData = {
  AL: { name: 'Alabama', region: 'South', status: STATUS.TO_SPECIFY },
  AK: { name: 'Alaska', region: 'West', status: STATUS.DONE },
  AZ: { name: 'Arizona', region: 'West', status: STATUS.DONE },
  AR: { name: 'Arkansas', region: 'South', status: STATUS.TO_SPECIFY },
  CA: { name: 'California', region: 'West', status: STATUS.DONE },
  CO: { name: 'Colorado', region: 'West', status: STATUS.DONE },
  CT: { name: 'Connecticut', region: 'Northeast', status: STATUS.DONE },
  DE: { name: 'Delaware', region: 'Northeast', status: STATUS.DONE },
  FL: { name: 'Florida', region: 'South', status: STATUS.TODO },
  GA: { name: 'Georgia', region: 'South', status: STATUS.TO_SPECIFY },
  HI: { name: 'Hawaii', region: 'West', status: STATUS.DONE },
  ID: { name: 'Idaho', region: 'West', status: STATUS.DONE },
  IL: { name: 'Illinois', region: 'Midwest', status: STATUS.DONE },
  IN: { name: 'Indiana', region: 'Midwest', status: STATUS.DONE },
  IA: { name: 'Iowa', region: 'Midwest', status: STATUS.READY },
  KS: { name: 'Kansas', region: 'Midwest', status: STATUS.READY },
  KY: { name: 'Kentucky', region: 'South', status: STATUS.TO_SPECIFY },
  LA: { name: 'Louisiana', region: 'South', status: STATUS.TO_SPECIFY },
  ME: { name: 'Maine', region: 'Northeast', status: STATUS.DONE },
  MD: { name: 'Maryland', region: 'Northeast', status: STATUS.DONE },
  MA: { name: 'Massachusetts', region: 'Northeast', status: STATUS.DONE },
  MI: { name: 'Michigan', region: 'Midwest', status: STATUS.DONE },
  MN: { name: 'Minnesota', region: 'Midwest', status: STATUS.READY },
  MS: { name: 'Mississippi', region: 'South', status: STATUS.TO_SPECIFY },
  MO: { name: 'Missouri', region: 'Midwest', status: STATUS.READY },
  MT: { name: 'Montana', region: 'West', status: STATUS.DONE },
  NE: { name: 'Nebraska', region: 'Midwest', status: STATUS.READY },
  NV: { name: 'Nevada', region: 'West', status: STATUS.DONE },
  NH: { name: 'New Hampshire', region: 'Northeast', status: STATUS.DONE },
  NJ: { name: 'New Jersey', region: 'Northeast', status: STATUS.DONE },
  NM: { name: 'New Mexico', region: 'West', status: STATUS.DONE },
  NY: { name: 'New York', region: 'Northeast', status: STATUS.DONE },
  NC: { name: 'North Carolina', region: 'South', status: STATUS.TO_SPECIFY },
  ND: { name: 'North Dakota', region: 'Midwest', status: STATUS.READY },
  OH: { name: 'Ohio', region: 'Midwest', status: STATUS.DONE },
  OK: { name: 'Oklahoma', region: 'Midwest', status: STATUS.READY },
  OR: { name: 'Oregon', region: 'West', status: STATUS.DONE },
  PA: { name: 'Pennsylvania', region: 'Northeast', status: STATUS.DONE },
  RI: { name: 'Rhode Island', region: 'Northeast', status: STATUS.DONE },
  SC: { name: 'South Carolina', region: 'South', status: STATUS.TO_SPECIFY },
  SD: { name: 'South Dakota', region: 'Midwest', status: STATUS.READY },
  TN: { name: 'Tennessee', region: 'South', status: STATUS.IN_PROGRESS },
  TX: { name: 'Texas', region: 'South', status: STATUS.TO_SPECIFY },
  UT: { name: 'Utah', region: 'West', status: STATUS.DONE },
  VT: { name: 'Vermont', region: 'Northeast', status: STATUS.DONE },
  VA: { name: 'Virginia', region: 'Northeast', status: STATUS.DONE },
  WA: { name: 'Washington', region: 'West', status: STATUS.DONE },
  WV: { name: 'West Virginia', region: 'Midwest', status: STATUS.DONE },
  WI: { name: 'Wisconsin', region: 'Midwest', status: STATUS.DONE },
  WY: { name: 'Wyoming', region: 'West', status: STATUS.DONE }
};

export const US_REGIONS = {
  northeast: {
    name: 'Northeast',
    states: ['CT', 'ME', 'MA', 'NH', 'RI', 'VT', 'NJ', 'NY', 'PA', 'DE', 'MD', 'VA']
  },
  midwest: {
    name: 'Midwest',
    states: ['IL', 'IN', 'MI', 'OH', 'WI', 'IA', 'KS', 'MN', 'MO', 'NE', 'ND', 'SD', 'OK', 'WV']
  },
  south: {
    name: 'South',
    states: ['FL', 'GA', 'NC', 'SC', 'AL', 'KY', 'MS', 'TN', 'AR', 'LA', 'TX']
  },
  west: {
    name: 'West',
    states: ['AZ', 'CO', 'ID', 'MT', 'NV', 'NM', 'UT', 'WY', 'AK', 'CA', 'HI', 'OR', 'WA']
  }
};

export function getStatusCounts() {
  const counts = {
    [STATUS.DONE]: 0,
    [STATUS.IN_PROGRESS]: 0,
    [STATUS.READY]: 0,
    [STATUS.TO_SPECIFY]: 0,
    [STATUS.TODO]: 0,
    total: 0
  };

  for (const state of Object.values(stateData)) {
    counts[state.status]++;
    counts.total++;
  }

  return counts;
}

export function getStatusPercentages() {
  const counts = getStatusCounts();
  const percentages = {};

  for (const status of Object.values(STATUS)) {
    percentages[status] = Math.round((counts[status] / counts.total) * 100);
  }

  return percentages;
}

export function getStatesByStatus(status) {
  return Object.entries(stateData)
    .filter(([_, state]) => state.status === status)
    .map(([code, state]) => ({ code, ...state }));
}

export function getRegionalStats() {
  const stats = {};

  for (const [regionKey, region] of Object.entries(US_REGIONS)) {
    stats[regionKey] = {
      name: region.name,
      total: region.states.length,
      [STATUS.DONE]: 0,
      [STATUS.IN_PROGRESS]: 0,
      [STATUS.READY]: 0,
      [STATUS.TO_SPECIFY]: 0,
      [STATUS.TODO]: 0
    };

    for (const stateCode of region.states) {
      const state = stateData[stateCode];
      if (state) {
        stats[regionKey][state.status]++;
      }
    }
  }

  return stats;
}
