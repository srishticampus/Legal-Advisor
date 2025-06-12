import React, { useEffect, useState } from "react"; 
import "./UserHome.css";
import icon1 from "../../Assets/userBannerIcon1.png";
import icon2 from "../../Assets/userBannerIcon2.png";
import icon3 from "../../Assets/userBannerIcon3.png";
import icon4 from "../../Assets/userBannerIcon4.png";
import img from "../../Assets/userHomeAboutImage.png";
import ficon1 from "../../Assets/userFeaturesIcon1.png";
import ficon2 from "../../Assets/userFeaturesIcon2.png";
import ficon3 from "../../Assets/userFeaturesIcon3.png";
import { useNavigate } from "react-router-dom";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import { Box } from "@mui/material"; 

function UserHome() {
  const navigate = useNavigate();
  const [hoveredCardId, setHoveredCardId] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('userId') === null || localStorage.getItem('userId') === 'null') {
      navigate('/');
    }
  }, [navigate]);

  const cardData = [
    {
      id: 'business',
      icon: icon1,
      title: 'Bussiness Law',
      details: 'Comprehensive legal support for business formation, contracts, mergers, and dispute resolution.',
    },
    {
      id: 'civil',
      icon: icon2,
      title: 'Civil Litigation',
      details: 'Skilled representation in civil disputes, personal injury, property claims, and contractual disagreements.',
    },
    {
      id: 'insurance',
      icon: icon3,
      title: 'Insurance Defence',
      details: 'Specialized legal defence for insurance companies against various types of claims and litigation.',
    },
    {
      id: 'support',
      icon: icon4,
      title: 'Quick Support',
      details: 'Prompt and efficient assistance for urgent legal queries and immediate client needs.',
    },
  ];

  return (
    <div>
      <div className="user_home bg-dark">
        <div className="container">
          <div className="row">
            <div className="col-6"></div>
            <div className="col-6">
              <div className="user_home_container">
                <div className="user_home_content_box">
                  <p className="user_home_title text-justify">
                    Reputation. Respect, Results.
                  </p>
                  <p className="user_home_content mt-4 text-justify">
                    We know what is to defend rights.We work with people for,and
                    with the full respect to the law.
                  </p>
                </div>
              </div>
            </div>
            <div className="user_home_card_container">
              {cardData.map((card) => (
                <Card
                  key={card.id}
                  onMouseEnter={() => setHoveredCardId(card.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                  sx={{
                    width: 'calc(25% - 20px)',
                    margin: '10px',
                    textAlign: 'center',
                    padding: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
                    },
                    borderRadius: '8px',
                    overflow: 'hidden',
                    minHeight: hoveredCardId === card.id ? 'auto' : '150px', 
                                                                         
                  }}
                >
                  <CardContent sx={{ padding: '16px', paddingBottom: hoveredCardId === card.id ? '8px' : '16px' }}>
                    <img src={card.icon} alt={card.title} style={{ marginBottom: '10px', width: '50px', height: '50px' }} />
                    <Typography variant="h6" component="div" sx={{ fontFamily: 'inherit', color: '#333' }}>
                      {card.title}
                    </Typography>
                  </CardContent>
                  <Collapse in={hoveredCardId === card.id} timeout="auto" unmountOnExit>
                    <CardContent sx={{ paddingTop: '0', paddingBottom: '16px !important' }}>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem', lineHeight: '1.4', fontFamily: 'inherit' }}>
                        {card.details}
                      </Typography>
                    </CardContent>
                  </Collapse>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="user_home_about">
        <div className="container">
          <div className="row">
            <div className="col-8 pt-5 pb-4">
              <p className="user_home_about_title">Learn About Us</p>
              <p className="user_home_about_content text-justify">
                welcome to our platform, where innovation meets efficiency in
                the legal landscape, wpride ourselves on offering a cutting-edge
                solution designed to simplfy and streamlinethe complexities of
                legal processe.our platform serves as a hub for
                administrates,advocates, judges, and court coordinators alike,
                providing intitute tols and resources tallored to their
                respective roles
              </p>
              <p className="user_home_about_content text-justify">
                For administrators, our feature-rich dashboard empovers seamless
                management of useraccounts, including the addition and removal
                of judges, verification of advocates credentials, and
                appointment of court coordinators.
              </p>
            </div>
            <div className="col-4">
              <div className="user_home_about_image">
                <img src={img} className="img-fluid" alt="About Us" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="user_home_features">
        <div className="container">
          <div className="row">
            <div className="user_home_features_title mt-4">
              <p className="user_home_about_title" >Our Features</p>
            </div>
            <div className="user_home_features_container" >
              <div className="user_features_cards">
                <img src={ficon1} alt="Results you deserve" />
                <div className="mx-4" >
                  <p className="user_features_card_title" >Results you deserve</p>
                  <p className="user_features_card_content text-justify" >ensuring that you receive the outcomes you rightfully meritthrough our dedicaed efforts and commitment to inevery aspect of our service.</p>
                </div>
              </div>
              <div className="user_features_cards">
                <img src={ficon2} alt="Efficiency & Trust" />
                <div className="mx-4" >
                  <p className="user_features_card_title" >Efficiency & Trust</p>
                  <p className="user_features_card_content text-justify" >Delivering services with a focus on botheffectiveness and reliability, ensuring that you can acheive your goals efficiently and with unwavering trust.</p>
                </div>
              </div>
              <div className="user_features_cards">
                <img src={ficon3} alt="Best Law Practices" />
                <div className="mx-4" >
                  <p className="user_features_card_title" >Best Law Practices</p>
                  <p className="user_features_card_content text-justify" >implementing superior methods and strategies to provideexceptional legal services and uphold the higheststandards of client satisfaction.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserHome;