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
        states: {}
      };
    }
  }

  static calculateStats(config) {
    const counts = {
      'done': 0,
      'in-progress': 0,
      'ready': 0,
      'to-specify': 0,
      'todo': 0
    };

    for (const status of Object.values(config.states)) {
      if (counts.hasOwnProperty(status)) {
        counts[status]++;
      }
    }

    const total = Object.keys(config.states).length;

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
}
