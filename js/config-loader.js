import { stateData } from './data.js';

export class ConfigLoader {
  static async loadConfig() {
    try {
      const response = await fetch('config.json');
      if (!response.ok) {
        throw new Error(`Failed to load config: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error loading config:', error);
      return {
        'done': 0,
        'in-progress': 0,
        'ready': 0,
        'to-specify': 0,
        'todo': 0
      };
    }
  }

  static calculateStats(config) {
    const counts = {
      'done': config['done'] || 0,
      'in-progress': config['in-progress'] || 0,
      'ready': config['ready'] || 0,
      'to-specify': config['to-specify'] || 0,
      'todo': config['todo'] || 0
    };

    const total = Object.values(counts).reduce((sum, count) => sum + count, 0);

    const percentages = {};
    for (const [status, count] of Object.entries(counts)) {
      percentages[status] = total > 0 ? Math.round((count / total) * 100) : 0;
    }

    return {
      counts,
      percentages,
      total,
      completed: counts['done'],
      remaining: total - counts['done']
    };
  }

  static generateStateMapping(config) {
    const allStates = Object.keys(stateData);
    const stateMapping = {};

    let index = 0;
    const statusOrder = ['done', 'in-progress', 'ready', 'to-specify', 'todo'];

    for (const status of statusOrder) {
      const count = config[status] || 0;
      for (let i = 0; i < count && index < allStates.length; i++) {
        stateMapping[allStates[index]] = status;
        index++;
      }
    }

    while (index < allStates.length) {
      stateMapping[allStates[index]] = 'todo';
      index++;
    }

    return stateMapping;
  }
}
