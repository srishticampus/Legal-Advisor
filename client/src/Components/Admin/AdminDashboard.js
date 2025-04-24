import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";
import userimg from "../../Assets/Vector (1).png";
import casesimg from "../../Assets/Vector (2).png";
import adimg from "../../Assets/image 19.png";
import complaintimg from "../../Assets/codiconbriefcase.png";
import axiosInstance from "../Constants/BaseUrl";

function AdminDashboard() {
  const [userCount, setUserCount] = useState(0);
  const [advocateCount, setAdvocateCount] = useState(0);
  const [cases, setCases] = useState(0);
  const [complaints, setComplaints] = useState(0);

  useEffect(() => {
    axiosInstance
      .post("/viewUsers")
      .then((response) => {
        console.log("Response from backend:", response.data);
        if (response.data.status === 200 && response.data.data) {
          setUserCount(response.data.data.length);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the user data!", error);
      });
    axiosInstance
      .post("/viewAdvocates")
      .then((response) => {
        console.log("Response from backend:", response.data);
        if (response.data.status === 200 && response.data.data) {
          setAdvocateCount(response.data.data.length);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the user data!", error);
      });
    axiosInstance
      .post("/getAllCases")
      .then((response) => {
        console.log("Response from backend:", response.data);
        if (response.data.status === 200 && response.data.data) {
          setCases(response.data.data.length);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the user data!", error);
      });
    axiosInstance
      .post("/viewAllComplaints")
      .then((response) => {
        console.log("Response from backend:", response.data);
        if (response.data.status === 200 && response.data.data) {
          setComplaints(response.data.data.length);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the user data!", error);
      });
  }, []);

  return (
 
      <div className="container">
        <label className="main-label container">Dashboard</label>
        <div className="row dashboard-adjust">
          <div className="col-12 col-sm-6 col-md-3 mb-4 adjust-box">
            <div className="dashbord-box">
              <img className="image-adjust" src={userimg} />
              <div className="text-container">
                <label className="count-label">{userCount}</label>
                <label className="content-label">Users</label>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-3 mb-4">
            <div className="dashbord-box">
              <img className="image-adjust" src={casesimg} />
              <div className="text-container">
                <label className="count-label">{cases}</label>
                <label className="content-label">Cases</label>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-3 mb-4">
            <div className="dashbord-box">
              <img className="image-adjust" src={adimg} />
              <div className="text-container">
                <label className="count-label">{advocateCount}</label>
                <label className="content-label">Advocates</label>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-3 mb-4">
            <div className="dashbord-box">
              <img className="image-adjust" src={complaintimg} />
              <div className="text-container">
                <label className="count-label">{complaints}</label>
                <label className="content-label">Complaints</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    
  );
}

export default AdminDashboard;
