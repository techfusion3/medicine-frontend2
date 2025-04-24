import React from 'react';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';

function ReminderList({ reminders, handleDeleteReminder }) {
  if (!reminders || reminders.length === 0) {
    return <Typography mt={3} align="center">No reminders yet.</Typography>;
  }

  return (
    <Box mt={4} display="flex" flexDirection="column" alignItems="center" gap={2}>
    {Array.isArray(reminders) ? (
      reminders.map((reminder) => (
      <Card 
        key={reminder._id} 
        sx={{ width: '100%', maxWidth: 500, backgroundColor: '#f5f5f5' }}
      >
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Medicine: {reminder.medicineName || 'N/A'}
          </Typography>
          <Typography variant="body1">
            Dosages: {Array.isArray(reminder.dosages) ? reminder.dosages.join(', ') : 'N/A'}
          </Typography>
          <Typography variant="body1">
            Times: {Array.isArray(reminder.times) ? reminder.times.join(', ') : 'N/A'}
          </Typography>
          <Typography variant="body1">
            Times per Day: {reminder.timesPerDay || 'N/A'}
          </Typography>

          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button 
              variant="contained" 
              color="error" 
              onClick={() => handleDeleteReminder(reminder._id)}
            >
              Delete
            </Button>
          </Box>
        </CardContent>
      </Card>
    ))
  ) : (
    <Typography variant="body2" color="text.secondary">No reminders found.</Typography>
  )}
</Box>

  );
}

export default ReminderList;
