import React, { useState } from "react"; 
import img1 from "../../Assets/img21.jpg";
import img2 from "../../Assets/img20.jpg";
import img11 from "../../Assets/adv1.avif";
import img12 from "../../Assets/adv2.avif";
import img13 from "../../Assets/adv4.avif";

import "./AboutUs.css"; 

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


function AboutUs() {
  const [showChatBot, setShowChatBot] = useState(false);

  const handleToggleChatBot = () => {
    setShowChatBot(!showChatBot);
  };

  return (
    <div className="container"> 
      <h1 className="aboutush1">About Us</h1>
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12">
          <img className="aboutusimg1" src={img1} alt="Card image cap" />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <div>
            <p className="text-justify" >
              Welcome to Legal Advisor, your trusted
              partner in legal services. We are a team of dedicated and
              experienced legal professionals committed to providing
              high-quality legal solutions tailored to your needs.
            </p>

            <h3>Our Mission</h3>
            <p className="text-justify" >
              At Legal Advisor, our mission is to empower individuals
              and businesses by offering comprehensive legal services. We strive
              to deliver excellence in legal representation, advice, and case
              management, ensuring our clients achieve the best possible
              outcomes.
            </p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12">
          <div>
            <h3>Why Choose Us?</h3>
            <p className="text-justify" >
              Choosing Legal Advisor means choosing a team of skilled
              advocates and legal experts dedicated to your success. Here's why
              you should partner with us:
            </p>

            <ul className="" >
              <li className="text-justify" >
                <strong>Expertise:</strong> Our team comprises seasoned legal
                professionals with expertise in various fields of law.
              </li>
              <li className="text-justify">
                <strong>Client-Centric Approach:</strong> We prioritize your
                needs and concerns, offering personalized solutions to meet your
                unique legal requirements.
              </li>
              <li className="text-justify">
                <strong>Transparency:</strong> We believe in open communication
                and transparency. You'll be informed at every step of your legal
                journey.
              </li>
              <li className="text-justify">
                <strong>Technology-driven Solutions:</strong> Utilizing
                cutting-edge legal technology, we streamline processes to
                enhance efficiency and provide a seamless experience.
              </li>
            </ul>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <div className="">
            <img className="aboutusimg2" src={img2} alt="Card image cap" />
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h3>Our Team</h3>
        <p>
          Meet the faces behind Legal Advisor. Our team is comprised of
          passionate advocates, legal experts, and support staff dedicated to
          delivering exceptional service. Together, we work collaboratively to
          ensure the success of your legal endeavors.
        </p>

        <div className="container">
          <div className="row"> 
            <div className="col-md-4"> 
              <div className="card h-100">
                <img
                  className="card-img-top landinserviceimg" 
                  src={img11}
                  alt="Card image cap"
                />
                <div className="card-body"> 
                  <h5 className="card-title">Elza</h5> 
                  <p className="card-text"> 
                    Our experienced advocates provide expert legal advice on
                    various legal matters.{" "}
                  </p>
                </div>{" "}
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100">
                <img
                  className="card-img-top landinserviceimg"
                  src={img12}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title">Josphine</h5>
                  <p className="card-text">
                    Hire our skilled advocates to represent you in court.{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100">
                <img
                  className="card-img-top landinserviceimg"
                  src={img13}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title">Christine</h5>
                  <p className="card-text">
                    Track the status of your case in real-time through our
                    online portal.
                  </p>
                </div>{" "}
              </div>
            </div>
          </div><br/>
        </div>
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

export default AboutUs;