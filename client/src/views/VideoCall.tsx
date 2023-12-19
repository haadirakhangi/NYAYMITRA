import { useState, useCallback } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MeetingCodeCard = () => {
  const [meetingCode, setMeetingCode] = useState(''); 

  const navigate = useNavigate()

  const handleJoinRoom = useCallback( () => {
    navigate(`/room/${meetingCode}`)
  }, [navigate,meetingCode])

  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      height="100vh"
      p={2} 
      border={1} 
      borderRadius="borderRadius" 
      boxShadow={1} 
      maxWidth="sm"
    >
      <Typography variant="h4" gutterBottom>
        Enter Meeting Code
      </Typography>
      <TextField
        placeholder="Meeting Code"
        margin="normal"
        value={meetingCode}
        onChange={(e) => setMeetingCode(e.target.value)} 
      />
      <Button variant="contained" color="primary" onClick={handleJoinRoom}>
        Join Meeting
      </Button>
    </Box>
  );
};

export default MeetingCodeCard;
