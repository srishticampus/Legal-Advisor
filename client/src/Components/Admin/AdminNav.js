import React, { useEffect } from "react";
import img1 from "../../Assets/logo2.png";
import { Link, useNavigate } from "react-router-dom";
import "./AdminNav.css";

function AdminNav() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    if (localStorage.getItem("adminId" == null)) {
      navigate("/");
    }
  },[navigate]);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark landing_custom_navbar nav">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#home">
            <img
              alt="Logo"
              src={img1}
              width="70"
              height="75"
              className="d-inline-block align-top logo-adjust"
            />{" "}
            LEGAL LIAISON
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/admin-dashboard">
                  Home
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link" to="#about-us">
                  ChangePassword
                </Link>
              </li> */}
              <li className="nav-item">
                <Link to={'/'} onClick={logout} className="nav-link" >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default AdminNav;
