export async function registerServiceWorker() {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      try {
        const registration = await navigator.serviceWorker.register('/service-worker.js');
        console.log('[✅ SW Registered]', registration);
  
        return registration;
      } catch (error) {
        console.error('[❌ SW Registration Failed]', error);
      }
    } else {
      console.warn('Push messaging is not supported');
    }
  }
  