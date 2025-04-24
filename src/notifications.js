export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      console.log('Notification permission granted');
    } else {
      console.log('Notification permission denied');
    }
  } catch (error) {
    console.error('Error requesting notification permission', error);
  }
};

export const showNotification = (title, options) => {
  if (Notification.permission === 'granted') {
    new Notification(title, options);
  }
};

export const subscribeUserToPush = async () => {
  try {
    const registration = await navigator.serviceWorker.ready;

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: process.env.REACT_APP_VAPID_PUBLIC_KEY
        ? urlBase64ToUint8Array(process.env.REACT_APP_VAPID_PUBLIC_KEY)
        : undefined,
    });

    console.log('[🔔 Subscribed to Push]', subscription);
    return subscription;
  } catch (error) {
    console.error('[❌ Push Subscription Failed]', error);
    return null;
  }
};

// helper to convert VAPID key to proper format
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i)
    outputArray[i] = rawData.charCodeAt(i);

  return outputArray;
}

