// Cache buster - forces reload when config version changes
(async function() {
  const STORAGE_KEY = 'app_version';
  const CHECK_INTERVAL = 10000; // Check every 10 seconds

  async function checkVersion() {
    try {
      const response = await fetch('config.json?t=' + Date.now());
      const config = await response.json();
      const newVersion = config.version || '1.0.0';
      const storedVersion = localStorage.getItem(STORAGE_KEY);

      if (storedVersion && storedVersion !== newVersion) {
        console.log(`New version detected: ${newVersion} (was ${storedVersion})`);

        // Clear all caches
        if ('caches' in window) {
          const keys = await caches.keys();
          await Promise.all(keys.map(key => caches.delete(key)));
        }

        // Clear localStorage version (will be set after reload)
        localStorage.removeItem(STORAGE_KEY);

        // Force hard reload
        window.location.reload(true);
      } else if (!storedVersion) {
        // First visit, store version
        localStorage.setItem(STORAGE_KEY, newVersion);
      }
    } catch (error) {
      console.error('Version check failed:', error);
    }
  }

  // Check immediately on load
  await checkVersion();

  // Then check periodically
  setInterval(checkVersion, CHECK_INTERVAL);
})();
