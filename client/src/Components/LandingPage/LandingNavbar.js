import React from 'react';
import { Link } from 'react-router-dom';
import './LandingNavbar.css';
import img1 from '../../Assets/logo2.png'; 

function LandingNavbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark landing_custom_navbar">
      <div className="container-fluid ">
        <Link className="navbar-brand" to="#home">
          <img
            alt="Logo"
            src={img1}
            width="70"
            height="80"
            className="d-inline-block align-top"
          />{' '}
          LEGAL LIAISON
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse padding-right" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/aboutus">About Us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/services">Services</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/AdvocateLogin">Login</Link>
            </li>
          
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Sign Up
              </Link>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link to='/UserRegistration' className="dropdown-item" >Client</Link>
                <Link to={'/AdvcateRegister'}  className="dropdown-item" >Advocates</Link>
                <Link to='/JuniorAdvocateRegister'  className="dropdown-item" >Junior Advocates</Link>
                <Link to={'/intern_registration'} className="dropdown-item" >Students</Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default LandingNavbar;
