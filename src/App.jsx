import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';  // Import UserProvider
import Navbar from './components/Navbar';
import Home from './Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Logout from './pages/Logout';
// import { requestNotificationPermission, showNotification } from './notifications';
// import axios from 'axios';

const App = () => {
  // const [notificationGranted, setNotificationGranted] = useState(false);

  // useEffect(() => {
    // const requestPermissionsAndRegisterSW = async () => {
    //   await requestNotificationPermission();

    //   if (Notification.permission === 'granted') {
    //     setNotificationGranted(true);

    //     // Register service worker
    //     if ('serviceWorker' in navigator && 'PushManager' in window) {
    //       try {
    //         const reg = await navigator.serviceWorker.register('/sw.js');
    //         console.log('[✔️ Service Worker Registered]', reg);
    //       } catch (err) {
    //         console.error('[❌ Service Worker Registration Failed]', err);
    //       }
    //     }
  //     }
  //   };

  //   requestPermissionsAndRegisterSW();
  // }, []);

  // useEffect(() => {
  //   if (notificationGranted) {
  //     showNotification('Welcome to the Smart Medicine Reminder!', {
  //       body: 'You have reminders set for today.',
  //       icon: '/icons/medicine-icon.jpg',
  //       badge: '/icons/medicine-badge.jpg',
  //     });
  //   }
  // }, [notificationGranted]);

  return (
    <UserProvider>  {/* Wrap your app with UserProvider */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </UserProvider>
  );
};

export default App;
