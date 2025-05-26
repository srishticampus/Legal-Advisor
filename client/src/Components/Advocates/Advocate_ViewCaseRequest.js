import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import './Advocate_ViewCaseRequest.css';
import axiosInstance from "../Constants/BaseUrl";
import noData from "../../Assets/noDataFound.json";
import Lottie from "lottie-react"; 

function Advocate_ViewCaseRequest() {
  const [data, setData] = useState([]);
  const id=localStorage.getItem('advocateId');

  useEffect(() => {
    axiosInstance
      .post(`/getAppointmentReqsForAdv/${id}`)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          setData(res.data.data || []);
        } else {
          setData([]);
        }
      })
      .catch((error) => {
        console.error("Error!", error);
      });
  }, [id]);

  console.log(data); 


  return (
    <div>
      <div className='junior-heading-div container-fluid'>
        <label className='junior-reg-title'>Case Request</label>
        </div>
    <div className="main-div">
      
      {data.length !== 0 ? (
        <div className="table-container table-striped">
          <table className="table-change container-fluid">
            <thead>
              <tr>
                <th className="table-header">Case Title</th>
                <th className="table-header">Client Name</th>
                <th className="table-header">Phone Number</th>
                <th className="table-header">Case Type</th>
                <th className="table-header">Date of Incident</th>
                <th className="table-header">Opponent Name</th>
                <th className="table-header">Opponent Details</th>
                <th className="table-header">Case Location</th>
                <th className="table-header"> </th>
              </tr>
            </thead>
            <tbody>
              {data.length ? (
                data.map((caseReq) => (
                  <tr>
                    <td className="table-data">{caseReq.caseId.title}</td>
                    <td className="table-data">{caseReq.userId.name}</td>
                    <td className="table-data">{caseReq.userId.contact}</td>
                    <td className="table-data">{caseReq.caseId.type}</td>
                    <td className="table-data">{caseReq.caseId.dateOfIncident}</td>
                    <td className="table-data">{caseReq.caseId.opponentName?caseReq.caseId.opponentName:'Unknown'}</td>
                    <td className="table-data">{caseReq.caseId.opponentAddress?caseReq.caseId.opponentAddress:'Unknown'}</td>
                    <td className="table-data">{caseReq.caseId.location}</td>
                    <td className="table-data">
                      <Link to={`/advocate_view_single_case_req/${caseReq._id}`}>
                        <button className="btn btn-outline-secondary">
                           View Details
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <h1>No Data obtained</h1>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no_data_animation">
          <Lottie animationData={noData} className="no_data_animation" />
        </div>
      )}
    </div>
    </div>
  );
}

export default Advocate_ViewCaseRequest;
