import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

function AddReminder({ addReminder }) {
  const [medicineName, setMedicineName] = useState('');
  const [dosages, setDosages] = useState([]);
  const [timesPerDay, setTimesPerDay] = useState('');
  const [times, setTimes] = useState([]);
  const [isTouched, setIsTouched] = useState(false);

  const handleTimesPerDayChange = (e) => {
    const value = parseInt(e.target.value);
    setTimesPerDay(value);
    setIsTouched(true);

    if (value >= 1) {
      setTimes(Array(value).fill('').map((_, i) => times[i] || ''));
      setDosages(Array(value).fill('').map((_, i) => dosages[i] || ''));
    }
  };

  const handleSubmit = async (event) => {
  event.preventDefault();

  if (timesPerDay < 1 || times.some(time => time === '')) {
    alert("Please enter valid time and dosage for each reminder");
    return;
  }

  const newReminder = { medicineName, dosages, times, timesPerDay };
  const token = localStorage.getItem('token');

  if (!token) {
    alert("User not logged in");
    return;
  }

  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/reminders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(newReminder),
    });

    const data = await response.json();

    if (response.status === 200 || response.status === 201) {
      // Use data if available, otherwise fallback to form values
      addReminder(data?._id ? data : newReminder);

      // Reset form
      setMedicineName('');
      setDosages([]);
      setTimes([]);
      setTimesPerDay('');
      setIsTouched(false);
    } else {
      console.error('Error response:', data);
      alert('Failed to add reminder. Try again.');
    }
  } catch (error) {
    console.error('Error adding reminder:', error);
    alert('Something went wrong. Please try again later.');
  }
};


  return (
    <Box mb={4}
      sx={{
        p: 3,
        border: '1px solid #ccc',
        borderRadius: 2,
        backgroundColor: '#f9f9f9',
        boxShadow: 2,
        maxWidth: 500,
        mx: 'auto',
        px: 2,
        mt: { xs: 2, sm: 4 },
      }}
    >
      <Typography variant="h5" align="center" gutterBottom mb={2}>Add New Medicine Reminder</Typography>

      <TextField
        label="Medicine Name"
        value={medicineName}
        onChange={(e) => setMedicineName(e.target.value)}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Times per day"
        type="number"
        value={timesPerDay}
        onChange={handleTimesPerDayChange}
        fullWidth
        inputProps={{ min: 1 }}
        error={isTouched && timesPerDay < 1}
        helperText={isTouched && timesPerDay < 1 ? "Please enter at least 1 time per day" : ""}
        sx={{ mb: 2 }}
      />

      {times.map((time, index) => (
        <Box key={index}
          mb={2}
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          gap={2}
          sx={{
            mb: 3,
            p: 2,
            border: '1px solid #ddd',
            borderRadius: 1,
            backgroundColor: '#ffffff'
          }}
        >
          <TextField
            label={`Time ${index + 1}`}
            type="time"
            value={time}
            onChange={(e) => {
              const updatedTimes = [...times];
              updatedTimes[index] = e.target.value;
              setTimes(updatedTimes);
            }}
            fullWidth
            InputLabelProps={{ shrink: true }}
            required
            sx={{ flex: 1 }}
          />

          <TextField
            label={`Dosage for Time ${index + 1}`}
            type="number"
            value={dosages[index]}
            onChange={(e) => {
              const updatedDosages = [...dosages];
              updatedDosages[index] = e.target.value;
              setDosages(updatedDosages);
            }}
            fullWidth
            inputProps={{ min: 1 }}
            sx={{
              flex: 1,
              mt: { xs: 2, sm: 0 },
            }}
            required
          />
        </Box>
      ))}

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        fullWidth
        sx={{ mt: 2, py: 1.5, fontWeight: 'bold' }}
      >
        Add Reminder
      </Button>
    </Box>
  );
}

export default AddReminder;
