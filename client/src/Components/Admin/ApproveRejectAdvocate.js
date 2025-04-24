import React, { useEffect, useState } from "react";
import "./ViewAllAdvocates.css";
import img from "../../Assets/Vecto(2).png";
import img1 from "../../Assets/Vectorsymbol.png";
import img2 from "../../Assets/raphael_cross.png";
import axiosInstance from "../Constants/BaseUrl";
import { Link, useNavigate } from "react-router-dom";
import noReqFound from "../../Assets/noReqFound.json";
import Lottie from "lottie-react";

function ApproveRejectAdvocate() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("adminId") == null) {
      navigate("/");
    }
  }, [navigate]);

  const [data, setData] = useState([]);

  const handleApprove = (id) => {
    axiosInstance
      .post(`/approveAdvocateById/${id}`)
      .then((res) => {
        if (res.data.status === 200) {
          const updatedData = data.map((advocate) => {
            if (advocate._id === id) {
              return { ...advocate, adminApproved: true };
            }
            return advocate;
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
      .post(`/rejectAdvocateById/${id}`)
      .then((res) => {
        if (res.data.status === 200) {
          const updatedData = data.map((advocate) => {
            if (advocate._id === id) {
              return { ...advocate, adminApproved: false };
            }
            return advocate;
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
      .post("/viewAdvocateReqs")
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
    <div className="main-div">
      {data.length !== 0 ? (
        <div className="table-container table-striped">
          <table className="table-change container-fluid">
            <thead>
              <tr>
                <th className="table-header">Bar council Enrolment No</th>
                <th className="table-header">Advocate Name</th>
                <th className="table-header">Specialization areas</th>
                <th className="table-header">Bar Council Area</th>
                <th className="table-header">Educational qualification</th>
                <th className="table-header">Years of Experience</th>
                <th className="table-header">View full Details</th>
                <th className="table-header">Accept</th>
                <th className="table-header">Reject</th>
              </tr>
            </thead>
            <tbody>
              {data.length ? (
                data.map((advocate) => (
                  <tr key={advocate._id}>
                    <td className="table-data">{advocate.bcNo}</td>
                    <td className="table-data">{advocate.name}</td>
                    <td className="table-data">{advocate.specialization}</td>
                    <td className="table-data">{advocate.bcState}</td>
                    <td className="table-data">{advocate.qualification}</td>
                    <td className="table-data">{advocate.experience} years</td>
                    <td className="table-data">
                      <Link to={`/adminviewrequest/${advocate._id}`}>
                        <button className="btn1 btn btn-outline-secondary">
                          <img src={img} alt="View Details" />
                        </button>
                      </Link>
                    </td>
                    <td className="table-data">
                      <button
                        className="btn btn-outline-success"
                        onClick={() => handleApprove(advocate._id)}
                      >
                        <img src={img1} alt="Approve Advocate" />
                      </button>
                    </td>
                    <td className="table-data">
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => handleReject(advocate._id)}
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
  );
}

export default ApproveRejectAdvocate;
