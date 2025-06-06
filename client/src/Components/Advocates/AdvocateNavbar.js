import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import img1 from "../../Assets/logo2.png";
import { toast } from "react-toastify";
function AdvocateNavbar() {
  const navigate = useNavigate();
  const advocateId = localStorage.getItem("advocateId");

  useEffect(() => {
    if (localStorage.getItem("advocateId") == null) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
    toast.success("Logout Successfully")
    navigate("/");

  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark landing_custom_navbar" style={{ minHeight: '10vh' }} >
        <div className="container">
          <Link className="navbar-brand" to="#home">
            <img
              alt="Logo"
              src={img1}
              width="50"
              height="50"
              className="d-inline-block align-top"
            />{" "}
            LEGAL ADVISOR
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
                <Link className="nav-link" to="/advocate_home">
                  Home
                </Link>
              </li>

              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Cases
                </Link>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link to='/advocate_viewcasereq' className="dropdown-item" >New Request</Link>
                  <Link to='/advocate_view_all_recent_case' className="dropdown-item" >Recent Cases</Link>
                </div>
              </li>
              <li className="nav-item">
                <Link to='/advocate_chat' className="nav-link">
                  Chat
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Interns
                </Link>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link to='/advocate_view_intern_req' className="dropdown-item" >New Request</Link>
                  <Link to='/advocate_view_all_interns' className="dropdown-item" >View Interns</Link>
                  <Link to='/advocate_view_case_req_access' className="dropdown-item" >Resource Request</Link>

                </div>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Junior Advocates
                </Link>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link to='/advocate_viewjuadvocatereq' className="dropdown-item" >Request</Link>
                  <Link to='/advocate_view_all_jnr_adv' className="dropdown-item" >View Advocates</Link>

                </div>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Articles
                </Link>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link to='/advocate_add_articles' className="dropdown-item" >Add</Link>
                  <Link to='/advocate_view_articles' className="dropdown-item" >View</Link>

                </div>
              </li>
              <li className="nav-item">
                <Link to='/advocate_add_complaints' className="nav-link" >
                  Complaints
                </Link>
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
    </div>
  );
}

export default AdvocateNavbar;
