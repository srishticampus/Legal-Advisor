import React, { useEffect, useState } from "react";
import './ViewJuniorAdvocateRequest.css'
import img from "../../Assets/Vecto(2).png";
import img1 from "../../Assets/Vectorsymbol.png";
import img2 from "../../Assets/raphael_cross.png";
import axiosInstance from "../Constants/BaseUrl";
import { Link, useNavigate } from "react-router-dom";
import noReqFound from "../../Assets/noReqFound.json";
import Lottie from "lottie-react";

function ViewJuniorAdvocateRequest() {
    const navigate = useNavigate();

    useEffect(() => {
      if (localStorage.getItem("adminId") == null) {
        navigate("/");
      }
    }, [navigate]);
  
    const [data, setData] = useState([]);
  
    const handleApprove = (id) => {
      axiosInstance
        .post(`/approveJuniorAdvocateById/${id}`)
        .then((res) => {
          if (res.data.status === 200) {
            const updatedData = data.map((junioradvocate) => {
              if (junioradvocate._id === id) {
                return { ...junioradvocate, adminApproved: true };
              }
              return junioradvocate;
            });
            setData(updatedData);
            window.location.reload()
  
          }
        })
        .catch((error) => {
          console.error("Error!", error);
        });
    };
  
    const handleReject = (id) => {
      axiosInstance
        .post(`/rejectJuniorAdvocateById/${id}`)
        .then((res) => {
          if (res.data.status === 200) {
            const updatedData = data.map((junioradvocate) => {
              if (junioradvocate._id === id) {
                return { ...junioradvocate, adminApproved: false };
              }
              return junioradvocate;
            });
            setData(updatedData);
            window.location.reload()
          }
        })
        .catch((error) => {
          console.error("Error!", error);
        });
    };
  
    useEffect(() => {
      axiosInstance
        .post("/viewJuniorAdvocateReqs")
        .then((res) => {
          if (res.data.status === 200) {
            setData(res.data.data || []);
          } else {
            setData([]);
          }
        })
        .catch((error) => {
          console.error("Error!", error);
        });
    }, []);
  return (
    <div>
<div className="main-div">
      {data.length !== 0 ? (
        <div className="table-container table-striped">
          <table className="table-change container-fluid">
            <thead>
              <tr>
                <th className="ju-table-header">Bar council Enrolment No</th>
                <th className="ju-table-header">Junior Advocate Name</th>
                <th className="ju-table-header">Specialization areas</th>
                <th className="ju-table-header">Bar Council Area</th>
                <th className="ju-table-header">Educational qualification</th>
                <th className="ju-table-header">Institute Name</th>
                <th className="ju-table-header">Percentage of Marks</th>
                <th className="ju-table-header">View full Details</th>
                <th className="ju-table-header">Accept</th>
                <th className="ju-table-header">Reject</th>
              </tr>
            </thead>
            <tbody> 
              {data.length ? (
                data.map((junioradvocate) => (
                  <tr>
                    <td className="ju-table-data">{junioradvocate.bcNo}</td>
                    <td className="ju-table-data">{junioradvocate.name}</td>
                    <td className="ju-table-data">{junioradvocate.specialization}</td>
                    <td className="ju-table-data">{junioradvocate.bcState}</td>
                    <td className="ju-table-data">{junioradvocate.qualification}</td>
                    <td className="ju-table-data">{junioradvocate.institute}</td>
                    <td className="ju-table-data">{junioradvocate.percentage}%</td>
                    <td className="ju-table-data">
                      <Link to={`/JuniorAdvocate-profile-request/${junioradvocate._id}`}>
                        <button className="btn1 btn btn-outline-secondary">
                          <img src={img} alt="View Details" />
                        </button>
                      </Link>
                    </td>
                    <td className="ju-table-data">
                      <button
                        className="btn btn-outline-success success-size"
                        onClick={() => handleApprove(junioradvocate._id)}
                      >
                        <img src={img1} alt="Approve Advocate" />
                      </button>
                    </td>
                    <td className="table-data">
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => handleReject(junioradvocate._id)}
                      >
                        <img src={img2} alt="Reject Advocate" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center">No Data obtained</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no_data_animation">
          <Lottie animationData={noReqFound} className="no_data_animation" />
          <h1 className="text-center">No New Requests</h1>
        </div>
      )}
    </div>
    </div>
  )
}

export default ViewJuniorAdvocateRequest