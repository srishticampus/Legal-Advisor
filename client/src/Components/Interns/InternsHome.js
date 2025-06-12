import React, { useState } from 'react'; 
import './InternsHome.css';
import internimg from '../../Assets/intern_home.png';
import tick from '../../Assets/tick.png';
import { IoBriefcaseOutline } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa";
import { VscLaw } from "react-icons/vsc";
import { LuHeartHandshake } from "react-icons/lu";
import { FaUserDoctor } from "react-icons/fa6";
import inter from '../../Assets/intern-img.png';
import intern from '../../Assets/intern-icon.png';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';

function InternsHome() {
    const [hoveredCardId, setHoveredCardId] = useState(null);

    const serviceCardsData = [
        {
            id: 'business-law',
            icon: <IoBriefcaseOutline className='icon-style-internshome' />,
            title: 'Business Law Services',
            details: 'Providing comprehensive legal support for businesses, including contracts, formation, and dispute resolution.',
        },
        {
            id: 'family-law',
            icon: <VscLaw className='icon-style-internshome' />,
            title: 'Family Law Services',
            details: 'Assisting with family-related legal matters such as divorce, child custody, and domestic disputes.',
        },
        {
            id: 'criminal-defence',
            icon: <LuHeartHandshake className='icon-style-internshome' />,
            title: 'Criminal Defence Services',
            details: 'Expert defense for individuals facing criminal charges, ensuring fair representation and protection of rights.',
        },
        {
            id: 'personal-injury',
            icon: <FaUserDoctor className='icon-style-internshome' />,
            title: 'Personal Injury Services',
            details: 'Representing clients who have suffered injuries due to negligence, seeking compensation for damages.',
        },
    ];

    return (
        <div>
            <div>
                <img src={internimg} className='img-fluid' alt="Interns Home Banner" />
            </div>

            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-6 col-sm-12 intern-home-sec-div-left'>
                        <h3 className='intern-home-heading'>What We Offer</h3>
                        <ul className="no-bullets">
                            <li>
                                <img src={tick} className='image-style-tick' alt="tick" />
                                <label className='ju-advocate-sublabel'>Criminal Law Services</label>
                            </li>
                            <li>
                                <img src={tick} className='image-style-tick' alt="tick" />
                                <label className='ju-advocate-sublabel'>Business Law Services</label>
                            </li>
                            <li>
                                <img src={tick} className='image-style-tick' alt="tick" />
                                <label className='ju-advocate-sublabel'>Family Law Services</label>
                            </li>
                            <li>
                                <img src={tick} className='image-style-tick' alt="tick" />
                                <label className='ju-advocate-sublabel'>Personal Injury Services</label>
                            </li>
                            <li>
                                <img src={tick} className='image-style-tick' alt="tick" />
                                <label className='ju-advocate-sublabel'>Immigration Law Services</label>
                            </li>
                            <li>
                                <img src={tick} className='image-style-tick' alt="tick" />
                                <label className='ju-advocate-sublabel'>Tax Law Services</label>
                            </li>
                            <li>
                                <img src={tick} className='image-style-tick' alt="tick" />
                                <label className='ju-advocate-sublabel'>Constructional Law Services</label>
                            </li>
                            <li>
                                <img src={tick} className='image-style-tick' alt="tick" />
                                <label className='ju-advocate-sublabel'>Corporate Law Services</label>
                            </li>
                        </ul>
                    </div>
                    <div className='col-md-6 second-div-interns'> 
                        <div className='row inner-card-row'> 
                            {serviceCardsData.map((card) => (
                                <div className='col-6 col-adjust-interns' key={card.id}>
                                    <Card
                                        onMouseEnter={() => setHoveredCardId(card.id)}
                                        onMouseLeave={() => setHoveredCardId(null)}
                                        sx={{
                                            height: hoveredCardId === card.id ? 'auto' : '160px',
                                            transition: 'height 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'flex-start', 
                                            textAlign: 'center',
                                            padding: '10px', 
                                            margin: '10px', 
                                            borderRadius: '10px',
                                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                            '&:hover': {
                                                boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                                                transform: 'translateY(-3px)', 
                                            },
                                            cursor: 'pointer',
                                            backgroundColor: '#2A2A2A', 
                                            position: 'relative', 
                                            overflow: 'hidden', 
                                        }}
                                    >
                                        <CardContent sx={{
                                            padding: '16px',
                                            paddingBottom: hoveredCardId === card.id ? '8px' : '16px', 
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            width: '100%',
                                        }}>
                                            {card.icon}
                                            <div className="text-container" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Typography variant="subtitle1" component="label" className="interns-label" sx={{ flexGrow: 1, textAlign: 'left', marginLeft: '10px' , }}>
                                                    {card.title.split('<br />').map((line, index) => (
                                                        <React.Fragment key={index}>
                                                            {line}
                                                            {index < card.title.split('<br />').length - 1 && <br />}
                                                        </React.Fragment>
                                                    ))}
                                                </Typography>
                                                {/* <FaArrowRight className='icon-style-internshome-arrow' /> */}
                                            </div>
                                        </CardContent>
                                        <Collapse in={hoveredCardId === card.id} timeout="auto" unmountOnExit>
                                            <CardContent sx={{ paddingTop: '0 !important', paddingBottom: '16px !important', textAlign: 'left' }}>
                                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem', lineHeight: '1.4', color: '#B0B0B0' }}>
                                                    {card.details}
                                                </Typography>
                                            </CardContent>
                                        </Collapse>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className='interns-third-div container-fluid'>
                <div className='row'>
                    <div className='col-md-6 col-sm-12 intern-last-left-col'>
                        <img src={inter} className='img-fluid intern-img-last' alt="Interns Image" />
                    </div>

                    <div className='col-md-6 col-sm-12'>
                        <h6 className='intern-aboutus'>About Us</h6>
                        <p className='intern-heading-last'>Your Legal Safety Is Our Top <br />Priority</p>
                        <p className='intern-sub'>Identify and meet the needs of clients who may have
                            <br />difficulty using legal services or be at risk of acting against
                            <br /> their own best interests.</p>
                        <div className='row'>
                            <div className='col-6 col-pad-sub'>
                                <img src={intern} className='img-fluid tick-pad' alt="tick" />Best Legal Service
                            </div>
                            <div className='col-6 col-pad-sub'>
                                <img src={intern} className='img-fluid tick-pad' alt="tick" />100% Success Rate
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-6 col-pad-sub'>
                                <img src={intern} className='img-fluid tick-pad' alt="tick" />Expert Lawyer
                            </div>
                            <div className='col-6 col-pad-sub'>
                                <img src={intern} className='img-fluid tick-pad' alt="tick" />Affordable Cost Rate
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InternsHome;