import { registerServiceWorker } from './registerPush';

export async function initPushNotifications(userId) {
  try {
    const registration = await registerServiceWorker();
    if (!registration) return;

    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.warn('Notification permission denied');
      return;
    }

    const response = await fetch('/api/get-vapid-public-key');
    const { publicKey } = await response.json();

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicKey),
    });

    await fetch('/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...subscription,
        userId,
      }),
    });

    console.log('[✅ Push Subscribed]');
  } catch (err) {
    console.error('[❌ Push Init Error]', err);
  }
}

// Utility: convert VAPID key to Uint8Array
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
}
