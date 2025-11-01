export const STATUS = {
  DONE: 'done',
  IN_PROGRESS: 'in-progress',
  READY_TO_DEV: 'ready-to-dev',
  TEST: 'test'
};

export const STATUS_LABELS = {
  [STATUS.DONE]: 'Done',
  [STATUS.IN_PROGRESS]: 'In Progress',
  [STATUS.READY_TO_DEV]: 'Ready to Dev',
  [STATUS.TEST]: 'Test'
};

export const STATUS_COLORS = {
  [STATUS.DONE]: '#4CAF50',
  [STATUS.IN_PROGRESS]: '#2196F3',
  [STATUS.READY_TO_DEV]: '#FFC107',
  [STATUS.TEST]: '#FF9800'
};

export const stateData = {
  AL: { name: 'Alabama', region: 'South' },
  AK: { name: 'Alaska', region: 'West' },
  AZ: { name: 'Arizona', region: 'West' },
  AR: { name: 'Arkansas', region: 'South' },
  CA: { name: 'California', region: 'West' },
  CO: { name: 'Colorado', region: 'West' },
  CT: { name: 'Connecticut', region: 'Northeast' },
  DE: { name: 'Delaware', region: 'Northeast' },
  FL: { name: 'Florida', region: 'South' },
  GA: { name: 'Georgia', region: 'South' },
  HI: { name: 'Hawaii', region: 'West' },
  ID: { name: 'Idaho', region: 'West' },
  IL: { name: 'Illinois', region: 'Midwest' },
  IN: { name: 'Indiana', region: 'Midwest' },
  IA: { name: 'Iowa', region: 'Midwest' },
  KS: { name: 'Kansas', region: 'Midwest' },
  KY: { name: 'Kentucky', region: 'South' },
  LA: { name: 'Louisiana', region: 'South' },
  ME: { name: 'Maine', region: 'Northeast' },
  MD: { name: 'Maryland', region: 'Northeast' },
  MA: { name: 'Massachusetts', region: 'Northeast' },
  MI: { name: 'Michigan', region: 'Midwest' },
  MN: { name: 'Minnesota', region: 'Midwest' },
  MS: { name: 'Mississippi', region: 'South' },
  MO: { name: 'Missouri', region: 'Midwest' },
  MT: { name: 'Montana', region: 'West' },
  NE: { name: 'Nebraska', region: 'Midwest' },
  NV: { name: 'Nevada', region: 'West' },
  NH: { name: 'New Hampshire', region: 'Northeast' },
  NJ: { name: 'New Jersey', region: 'Northeast' },
  NM: { name: 'New Mexico', region: 'West' },
  NY: { name: 'New York', region: 'Northeast' },
  NC: { name: 'North Carolina', region: 'South' },
  ND: { name: 'North Dakota', region: 'Midwest' },
  OH: { name: 'Ohio', region: 'Midwest' },
  OK: { name: 'Oklahoma', region: 'Midwest' },
  OR: { name: 'Oregon', region: 'West' },
  PA: { name: 'Pennsylvania', region: 'Northeast' },
  RI: { name: 'Rhode Island', region: 'Northeast' },
  SC: { name: 'South Carolina', region: 'South' },
  SD: { name: 'South Dakota', region: 'Midwest' },
  TN: { name: 'Tennessee', region: 'South' },
  TX: { name: 'Texas', region: 'South' },
  UT: { name: 'Utah', region: 'West' },
  VT: { name: 'Vermont', region: 'Northeast' },
  VA: { name: 'Virginia', region: 'Northeast' },
  WA: { name: 'Washington', region: 'West' },
  WV: { name: 'West Virginia', region: 'Midwest' },
  WI: { name: 'Wisconsin', region: 'Midwest' },
  WY: { name: 'Wyoming', region: 'West' }
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

// Status counts are now managed by config-loader.js
// stateData no longer has hardcoded status values
// All status assignment is done via config.json
