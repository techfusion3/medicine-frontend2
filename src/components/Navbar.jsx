import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';  // You may want to use React Router's Link for navigation

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')); // Get user info from localStorage

  // Handle logout
  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Redirect to login page
    navigate('/login');
  };

  return (
    <Box sx={{ position: 'relative', padding: 2, backgroundColor: '#1976d2', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="h5" color="white">
        Medical Reminder App
      </Typography>

      <Box>
        {user ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1" color="white" sx={{ marginRight: 2 }}>
              Welcome, {user.name}
            </Typography>
            <Button onClick={handleLogout} variant="contained" color="secondary">
              Logout
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 1.5,
              position: 'absolute',
              top: 12,
              right: 9,
            }}
          >
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="secondary" fullWidth>
                Login
              </Button>
            </Link>
          </Box>

        )}
      </Box>
    </Box>
  );
};

export default Navbar;

