import React, { useEffect } from 'react'
import img1 from '../../Assets/logo2.png';
import { Link, useNavigate } from 'react-router-dom';

function UserNav_Main() {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark landing_custom_navbar">
      <div className="container-fluid">
        <Link className="navbar-brand" to="#home">
          <img
            alt="Logo"
            src={img1}
            width="70"
            height="80"
            className="d-inline-block align-top"
          />{' '}
          LEGAL ADVISOR
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav"> 
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/user_home">Home</Link>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Cases
              </Link>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" >Add New</Link>
                <Link className="dropdown-item" >Recent Cases</Link>
              </div>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/client-viewalladvocate">Advocate</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#services">Notifications</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link">Chat</Link>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown1" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Settings
              </Link>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown1">
                <Link className="dropdown-item" >View Profile</Link>
                <Link className="dropdown-item" >Change Password</Link>
                <Link className="dropdown-item" >Logout</Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </div>
  )
}

export default UserNav_Main