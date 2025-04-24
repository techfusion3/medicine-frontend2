// service-worker.js

self.addEventListener('install', (event) => {
    console.log('[SW] Service Worker Installed');
  });
  
  self.addEventListener('activate', (event) => {
    console.log('[SW] Service Worker Activated');
  });
  
  self.addEventListener('push', (event) => {
    const data = event.data ? event.data.json() : {};
    const title = data.title || 'Medicine Reminder';
    const options = {
      body: data.body || 'Time to take your medicine.',
      icon: './icons/medicine-icon.jpg', 
      badge: './icons/medicine-badge.jpg',
    };
  
    event.waitUntil(
      self.registration.showNotification(title, options)
    );
  });
  