import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext'; // Import the useUser hook

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useUser(); // Access the login function from the context
  const navigate = useNavigate();

const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Save user info in context and navigate to the homepage
        login(data.user); 
        localStorage.setItem('token', data.token); // Store the token in localStorage
        localStorage.setItem('user', JSON.stringify(data.user)); // Save user in localStorage
        navigate('/');
      } else {
        setError(data.message); // Show error message if any
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred. Please try again.');
    }
  };
  

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>

      {error && <Typography color="error">{error}</Typography>}

      <form onSubmit={handleLogin}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" fullWidth>
          Login
        </Button>
      </form>
    </Box>
  );
};

export default Login;
