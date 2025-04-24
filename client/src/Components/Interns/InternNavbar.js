import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import img1 from '../../Assets/logo2.png'; 

function InternNavbar() {

  const navigate = useNavigate();
  const advocateId = localStorage.getItem("internId");

  useEffect(() => {
    if (localStorage.getItem("internId") == null) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

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
              <Link className="nav-link" to="/intern_home">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">Advocates</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">Mentorship</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">Discussion Forum</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">Complaint</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default InternNavbar
