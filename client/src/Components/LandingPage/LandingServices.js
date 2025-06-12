import React, { useState } from 'react';
import './LandingServices.css'; 
import img1 from "../../Assets/law11.jpeg";
import img3 from "../../Assets/law12.jpg";
import img2 from "../../Assets/img22.jpeg";

import { Box, Fab, Slide, IconButton, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles'; 
import ChatIcon from '@mui/icons-material/Chat'; 
import CloseIcon from '@mui/icons-material/Close'; 

import ChatBot from '../ChatBot'; 

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


function LandingServices() {
  const [showChatBot, setShowChatBot] = useState(false);

  const handleToggleChatBot = () => {
    setShowChatBot(!showChatBot);
  };

  return (
    <div className='landinservicealign'>
      <h1 className='landinserviceh1'> Our Services</h1>

      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card h-100">
              <img className="card-img-top landinserviceimg" src={img2} alt="Expert Legal Advice" />
              <div className="card-body">
                <h5 className="card-title">Expert Legal Advice</h5>
                <p className="card-text text-justify">Our experienced advocates provide expert legal advice on various legal matters. Whether you need guidance on family law, business law, or criminal law, we've got you covered.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100">
              <img className="card-img-top landinserviceimg" src={img1} alt="Case Representation" />
              <div className="card-body">
                <h5 className="card-title">Case Representation</h5>
                <p className="card-text text-justify">Hire our skilled advocates to represent you in court. We handle cases with professionalism and dedication, ensuring the best possible outcome for our clients.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100">
              <img className="card-img-top landinserviceimg" src={img3} alt="Case Tracking" />
              <div className="card-body">
                <h5 className="card-title">Case Tracking</h5>
                <p className="card-text text-justify">Track the status of your case in real-time through our online portal. Receive updates, court dates, and documentation, ensuring you are informed every step of the way.</p>
              </div>
            </div>
          </div>
        </div>
        <br />
      </div>

      <Fab
         color="secondary" 
        aria-label="chat"
        sx={{
          position: 'fixed',
          bottom: 24, 
          right: 24, 
          zIndex: 1100, 
          backgroundColor: 'gray',
          '&:hover': {
            backgroundColor: 'rgb(24, 22, 22)',
          }
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

export default LandingServices;