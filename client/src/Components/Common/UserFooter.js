import React from 'react'
import './UserFooter.css'
import logo from '../../Assets/logo2.png'
import { Link } from 'react-router-dom'


function UserFooter() {
  return (
    <div className='user-footer container-fluid'>
        <div>
          <div className='row'>
            <div className='col-lg-3 col-md-6 col-sm-12'>
            <img  className='col-4 footer-img' src={logo} alt='Admin Footer Logo'/>
            <span className="footer-logo-text-change1 ml-2">LEGAL LIAISON</span>           
            </div>
            <div className='col-lg-3 col-md-6 col-sm-12'>
                <h2 className='footer-title lawyer'>Lawyer</h2>
                <p className='footer-list lawyer-intro'>Welcome to Legal Liaision. 
                    Your trusted Partner in legal services.
                    We are a team of dedicated and experienced legal professionals commited to providing high-quality legal solutions tailored to your needs.</p>
            </div>

            <div className='col-lg-2 col-md-6 col-sm-12'>
            <h2 className='footer-title quick'>Quick Links</h2>
            <ul className='footer-list'>
                <li className='list-style'>Home</li>
                <li className='list-style'>About Us</li>
                <li className='list-style'>Services</li>
                <li className='list-style'>Blog</li>
                </ul>
            </div>

            <div className='col-lg-2 col-md-6 col-sm-12'>
            <h2 className='footer-title legal'>Our Legal</h2>
                <ul className='footer-list'>
                <li className='list-style'>Civil Law</li>
                <li className='list-style'>Family Law</li>
                <li className='list-style'>Business Law</li>
                <li className='list-style'>Criminal Law</li>
            </ul>
            </div>

            <div className='col-lg-2 col-md-6 col-sm-12'>
            <h2 className='footer-title help'>Help</h2>
            <ul className='footer-list'>
                <li className='list-style'>Help Center</li>
                <li className='list-style'>Become an Afflicate</li>
            </ul>
            </div>
            <br/><br/>
        </div>  
        </div>
        
    </div>
  )
}

export default UserFooter