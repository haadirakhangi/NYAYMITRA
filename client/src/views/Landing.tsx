// Landing.tsx
import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import Navbar from '../components/Navbar';
import videoSrc from '../main/assets/images/landing_vid.mp4';

const Landing: React.FC = () => {
  return (
    <>
      <div style={{ position: 'relative' }}>
        <video
          autoPlay
          muted
          loop
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: -1,
          }}
        >

        <Navbar />

        <Container
          style={{
            marginTop: '50px',
            flexGrow: 1,
            width: '100vw',
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white', // Set the text color to be visible on the video background
          }}
        >
          <Typography variant="h1" gutterBottom>
            NyayMitra
          </Typography>
          <Typography variant="subtitle1" paragraph>
            This is a simple landing page created using Material-UI v5 and TypeScript.
          </Typography>
          <Button variant="contained" color="primary">
            Get Started
          </Button>
        </Container>
      </div>
    </>
  );
};

export default Landing;
