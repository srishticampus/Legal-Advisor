import React from 'react'
import './InternsHome.css'
import internimg from '../../Assets/intern_home.png'
import tick from '../../Assets/tick.png';
import { IoBriefcaseOutline } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa";
import { VscLaw } from "react-icons/vsc";
import { LuHeartHandshake } from "react-icons/lu";
import { FaUserDoctor } from "react-icons/fa6";
import inter from '../../Assets/intern-img.png';
import intern from '../../Assets/intern-icon.png';



function InternsHome() {
  return (
    <div>
        <div>
            <img src={internimg} className='img-fluid'/>
        </div>

        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-6 col-sm-12 intern-home-sec-div-left'>
                    <h3 className='intern-home-heading'>What We Offer</h3>
                    <ul className="no-bullets">
                        <li>
                            <img src={tick} className='image-style-tick' />
                            <label className='ju-advocate-sublabel'>Criminal Law Services</label>
                        </li>
                        <li>
                            <img src={tick} className='image-style-tick' />
                            <label className='ju-advocate-sublabel'>Business Law Services</label>
                        </li>
                        <li>
                            <img src={tick} className='image-style-tick' />
                            <label className='ju-advocate-sublabel'>Family Law Services</label>
                        </li>
                        <li>
                            <img src={tick} className='image-style-tick' />
                            <label className='ju-advocate-sublabel'>Personal Injury Services</label>
                        </li>
                        <li>
                            <img src={tick} className='image-style-tick' />
                            <label className='ju-advocate-sublabel'>Immigration Law Services</label>
                        </li>
                        <li>
                            <img src={tick} className='image-style-tick' />
                            <label className='ju-advocate-sublabel'>Tax Law Services</label>
                        </li>
                        <li>
                            <img src={tick} className='image-style-tick' />
                            <label className='ju-advocate-sublabel'>Constructional Law Services</label>
                        </li>
                        <li>
                            <img src={tick} className='image-style-tick' />
                            <label className='ju-advocate-sublabel'>Corporate Law Services</label>
                        </li>
                    </ul>
                </div>
                <div className='col-md-6 second-div-interns'>
                    <div className='row'>
                        <div className='col-6 col-adjust-interns'>
                            <div className="interns-home-box">
                                <IoBriefcaseOutline className='icon-style-internshome' />
                                <div className="text-container">
                                    <label className="interns-label">Business Law Services</label>
                                    <FaArrowRight className='icon-style-internshome-arrow' />
                                </div>
                            </div>
                        </div>
                        <div className='col-6 col-adjust-interns'>
                            <div className="interns-home-box">
                                <VscLaw className='icon-style-internshome' />
                                <div className="text-container">
                                    <label className="interns-label">Family Law<br />Services</label>
                                    <FaArrowRight className='icon-style-internshome-arrow' />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-6  col-adjust-interns'>
                            <div className="interns-home-box">
                                <LuHeartHandshake className='icon-style-internshome' />
                                <div className="text-container">
                                    <label className="interns-label">Criminal Defence Services</label>
                                    <FaArrowRight className='icon-style-internshome-arrow' />
                                </div>
                            </div>
                        </div>
                        <div className='col-6 col-adjust-interns'>
                            <div className="interns-home-box">
                                <FaUserDoctor className='icon-style-internshome' />
                                <div className="text-container">
                                    <label className="interns-label">Personal Injury Services</label>
                                    <FaArrowRight className='icon-style-internshome-arrow' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className='interns-third-div container-fluid'>
            <div className='row'>
                <div className='col-md-6 col-sm-12 intern-last-left-col'>
                    <img src={inter} className='img-fluid intern-img-last'/>
                </div>
     
                <div className='col-md-6 col-sm-12'>
                        <h6 className='intern-aboutus'>About Us</h6>
                        <p className='intern-heading-last'>Your Legal Safety Is Our Top <br/>Priority</p>
                        <p className='intern-sub'>Identify and meet the needs of clients who may have 
                            <br/>difficulty using legal services or be at risk of acting against
                            <br/> their own best interests.</p>
                        <div className='row'>
                            <div className='col-6 col-pad-sub'>
                            <img src={intern} className='img-fluid tick-pad'/>Best Legal Service
                            </div>
                            <div className='col-6 col-pad-sub'>
                            <img src={intern} className='img-fluid tick-pad'/>100% Success Rate
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-6 col-pad-sub'>
                            <img src={intern} className='img-fluid tick-pad'/>Expert Lawyer
                            </div>
                            <div className='col-6 col-pad-sub'>
                            <img src={intern} className='img-fluid tick-pad'/>Affordable Cost Rate
                            </div>
                        </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default InternsHome