import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import img1 from '../../Assets/logo2.png';
import axiosInstance from '../Constants/BaseUrl';


function JuniorAdvocateNavbar() {
const [advocate, setAdvocate] = useState({});
const navigate = useNavigate();

useEffect(() => {
  if (localStorage.getItem('junioradvocateId') == null) {
    navigate('/');
  }
}, [navigate]);

const handleLogout = () => {                
  localStorage.clear();
  window.location.reload()
};

  const id = localStorage.getItem('junioradvocateId');

  useEffect(() => {
    axiosInstance
      .post(`/viewJuniorAdvocateById/${id}`)
      .then((response) => {
        console.log(response);
        setAdvocate(response.data.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the junior advocate details!", error);
      });
  }, [id]);

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
          LEGAL LIAISON
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/JuniorAdvocate-homepage">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">Advocates</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">Mentorship</Link>
            </li>
            {/* <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Legal Resource
              </Link>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link to='' className="dropdown-item" >Request</Link>
                <Link to=''  className="dropdown-item" >View Profile</Link>
              </div>
            </li> */}
            <li className="nav-item">
              <Link className="nav-link" to="#">Asigned Cases</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">Complaint</Link>
            </li>
            
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Settings
              </Link>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link to={`/JuniorAdvocate-editprofile`} className="dropdown-item" >Profile View</Link>
                {/* <Link to=''  className="dropdown-item" >Change Password</Link> */}
                <Link onClick={handleLogout}  className="dropdown-item" >Logout</Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </div>
  )
}

export default JuniorAdvocateNavbar