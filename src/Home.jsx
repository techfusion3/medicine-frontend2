import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography } from '@mui/material';
import AddReminder from './AddReminder';
import ReminderList from './ReminderList';

export default function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

//   console.log('🔑 Token:', token);
//   console.log('👤 User:', user);

  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    if (!token || !user) {
      console.error('User not found or invalid token:', { token, user });
      navigate('/login');
    } else {
      console.log('✅ Token and user valid:', { token, user });

      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/reminders`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data && Array.isArray(data)) {
            setReminders(data);
          } else {
            console.error('Invalid reminder data received:', data);
          }
        })
        .catch((error) => {
          console.error('Error fetching reminders:', error);
        });
    }
  }, [token, navigate]); // Removed full `user` object

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setReminders([]);
    navigate('/login');
  };

  const addReminder = (newReminder) => {
    setReminders((prevReminders) => [...prevReminders, newReminder]);
  };
  

  const handleDeleteReminder = async (id) => {
    if (!token) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/reminders/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      let data = null;
      if (res.headers.get("content-type")?.includes("application/json")) {
        data = await res.json();
      }

      if (res.ok) {
        setReminders((prev) => prev.filter((reminder) => reminder._id !== id));
        console.log(data?.message || 'Reminder deleted successfully');
      } else {
        console.error(data?.message || 'Delete failed');
      }
    } catch (err) {
      console.error('Error deleting reminder:', err);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
      <Typography variant="h4" gutterBottom>Welcome to Medical Reminder App</Typography>

      <Button variant="contained" color="secondary" onClick={handleLogout}>
        Logout
      </Button>

      {token && user && (
        <Box mt={4}>
          <Typography variant="h6" align="center">Medical Reminder</Typography>

          <AddReminder addReminder={addReminder} />

          <ReminderList
            reminders={reminders}
            handleDeleteReminder={handleDeleteReminder}
          />
        </Box>
      )}
    </Box>
  );
}


