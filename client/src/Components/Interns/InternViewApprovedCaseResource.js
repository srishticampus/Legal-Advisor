import React, { useEffect, useState } from 'react'
import axiosInstance from '../Constants/BaseUrl';
import noData from "../../Assets/noDataFound.json";
import Lottie from "lottie-react";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
function InternViewApprovedCaseResource() {

    const [data, setData] = useState([]);
  const id=localStorage.getItem('internId');

  useEffect(() => {
    axiosInstance
      .post(`/getApprovedAppointmentsForIntern/${id}`)
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

  return (
    <div>
      <div className='junior-heading-div container-fluid'>
        <label className='junior-reg-title'>Approved Resources</label>
        </div>
    <div className="main-div">
      
      {data.length !== 0 ? (
        <div className="table-container table-striped">
          <table className="table-change container-fluid">
            <thead>
              <tr>
                <th className="table-header">Case Title</th>
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
         
                    <td className="table-data">{caseReq.caseId.type}</td>
                    <td className="table-data">{caseReq.caseId.dateOfIncident.slice(0,10)}</td>
                    <td className="table-data">{caseReq.caseId.opponentName?caseReq.caseId.opponentName:'Unknown'}</td>
                    <td className="table-data">{caseReq.caseId.opponentAddress?caseReq.caseId.opponentAddress:'Unknown'}</td>
                    <td className="table-data">{caseReq.caseId.location}</td>
                    <td className="table-data">
                        <Link to={`/intern_view_approved_single_case_resource/${caseReq._id}`}>
                        <button className="btn btn-outline-secondary">
                           View Details
                        </button>
                        </Link>
                       
                    </td>
                  </tr>
                ))
              ) : (
                <h1>No Approved Case Resources</h1>
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

export default InternViewApprovedCaseResource
