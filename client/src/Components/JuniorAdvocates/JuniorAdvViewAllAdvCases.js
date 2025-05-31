import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../Constants/BaseUrl';
import noData from "../../Assets/noDataFound.json";
import Lottie from "lottie-react";

function JuniorAdvViewAllAdvCases() {

    const [data, setData] = useState([]);
  const {id}=useParams();

  useEffect(() => {
    axiosInstance
      .post(`/getApprovedAppointmentsForAdv/${id}`)
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

  console.log(id);

  return (
    <div>
      
    <div className="main-div">
      
      {data.length !== 0 ? (
        <div className="table-container table-striped">
          <table className="table-change container-fluid">
            <thead>
              <tr>
                <th className="table-header">Case No</th>
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
                    <td className="table-data">NO{caseReq.caseId._id.slice(19,24)}</td> 
                    <td className="table-data">{caseReq.userId.name}</td>
                    <td className="table-data">{caseReq.userId.contact}</td>
                    <td className="table-data">{caseReq.caseId.type}</td>
                    <td className="table-data">{caseReq.caseId.dateOfIncident.slice(0,10)}</td>
                    <td className="table-data">{caseReq.caseId.opponentName?caseReq.caseId.opponentName:'Unknown'}</td>
                    <td className="table-data">{caseReq.caseId.opponentAddress?caseReq.caseId.opponentAddress:'Unknown'}</td>
                    <td className="table-data">{caseReq.caseId.location}</td>
                    <td className="table-data">
                      <Link to={`/junior_adv_view_adv_single_case/${caseReq._id}`}>
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
  )
}

export default JuniorAdvViewAllAdvCases
