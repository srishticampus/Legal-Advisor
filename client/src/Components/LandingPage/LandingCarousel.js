import React, { useState } from 'react';
import LandingNavbar from './LandingNavbar'; 
import LandingServices from './LandingServices';
import AboutUs from './AboutUs';
import UserFooter from '../Common/UserFooter'; 
import { Box, Fab, Slide, IconButton, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';

import ChatBot from '../ChatBot'; 

import './LandingCarousel.css';

const chatTheme = createTheme({
  palette: {
    primary: {
      main: '#212121',
      light: '#484848',
      dark: '#000000',
      contrastText: '#fff',
    },
    secondary: {
      main: '#d32f2f',
      light: '#ff6659',
      dark: '#9a0007',
      contrastText: '#fff',
    },
    background: {
      default: '#f5f5f5', 
      paper: '#fff',      
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif', 
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12, 
          },
        },
      },
    },
  },
});

function Landingcarousel() {
  const [showChatBot, setShowChatBot] = useState(false);

  const handleToggleChatBot = () => {
    setShowChatBot(!showChatBot);
  };

  return (
    <div>
      <LandingNavbar />

      <div className='landingcarimage' />
      <div className='landingcarText'>
        <p>The law is a weapon <br /> if you know how to use it.</p>
      </div>

      <div className='container'>
      </div>

      <LandingServices />
      <AboutUs />
      <UserFooter /> 

      <Fab
        color="secondary" 
        aria-label="chat"
        sx={{
          position: 'fixed',
          bottom: 24, 
          right: 24,  
          zIndex: 1100, 
        }}
        onClick={handleToggleChatBot}
      >
        <ChatIcon />
      </Fab>

      <Slide direction="up" in={showChatBot} mountOnEnter unmountOnExit>
        <Box
          sx={{
            position: 'fixed',
            bottom: 90, 
            right: 24,
            width: { xs: '90%', sm: 380 }, 
            height: '75vh', 
            maxHeight: 600, 
            zIndex: 1000, 
            backgroundColor: 'background.paper', 
            borderRadius: 3, 
            boxShadow: 6,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
            bgcolor: '#21252994',
            color: 'white',
            borderTopLeftRadius: 12, 
            borderTopRightRadius: 12,
          }}>
            <Typography variant="h6">Legal Bot Assistant</Typography>
            <IconButton
              aria-label="close chat"
              onClick={() => setShowChatBot(false)}
              sx={{ color: 'white' }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
            <ThemeProvider theme={chatTheme}>
              <ChatBot />
            </ThemeProvider>
          </Box>
        </Box>
      </Slide>
    </div>
  );
}

export default Landingcarousel;