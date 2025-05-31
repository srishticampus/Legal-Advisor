import React, { useEffect, useState } from 'react'
import axiosInstance from '../Constants/BaseUrl';
import noData from "../../Assets/noDataFound.json";
import Lottie from "lottie-react";
import { Link } from 'react-router-dom';
import img1 from "../../Assets/Vectorsymbol.png";
import img2 from "../../Assets/raphael_cross.png";
import { toast } from 'react-toastify';

function AdvocateViewInternReq() {

    const [data, setData] = useState([]);
  const id=localStorage.getItem('advocateId');

  useEffect(() => {
    axiosInstance
      .post(`/interngetAppointmentReqsForAdv/${id}`)
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

  const handleApprove = (id) => {
    axiosInstance
      .post(`/internacceptReqbyAdv/${id}`)
      .then((res) => {
        if (res.data.status === 200) {
            toast.success('Approved')
                window.location.reload()
     
        }
      })
      .catch((error) => {
        console.error("Error!", error);
      });
  };

  const handleReject = (id) => {
    axiosInstance
      .post(`/internrejectReqbyAdv/${id}`)
      .then((res) => {
        if (res.data.status === 200) {
            toast.warning('Rejected')

          window.location.reload()
        }
      })
      .catch((error) => {
        console.error("Error!", error);
      });
  };


  return (
    <div>
      <div className='junior-heading-div container-fluid'>
        <label className='junior-reg-title'>Intern Request</label>
        </div>
    <div className="main-div">
      
      {data.length !== 0 ? (
        <div className="table-container table-striped">
          <table className="table-change container-fluid">
            <thead>
              <tr>
                <th className="table-header">Name</th>
                <th className="table-header">E-mail</th>
                <th className="table-header">Phone Number</th>
                <th className="table-header">Institution</th>
                <th className="table-header">Qualification</th>
                <th className="table-header">% of Mark</th>
                <th className="table-header">Specialization</th>
                <th className="table-header">Year of Passout</th>
                <th className="table-header">Actions </th>
              </tr>
            </thead>
            <tbody>
              {data.length ? (
                data.map((caseReq) => (
                  <tr>
                    <td className="table-data">{caseReq.internId.name}</td>
                    <td className="table-data">{caseReq.internId.email}</td>
                    <td className="table-data">{caseReq.internId.contact}</td>
                    <td className="table-data">{caseReq.internId.institute}</td>
                    <td className="table-data">{caseReq.internId.qualification}</td>
                    <td className="table-data">{caseReq.internId.percentage}</td>
                    <td className="table-data">{caseReq.internId.specialization}</td>
                    <td className="table-data">{caseReq.internId.yearOfPassout}</td>
                    <td className="table-data">
                    <button
                        className="btn btn-outline-success p-2 px-3 mx-1"
                        onClick={() => handleApprove(caseReq._id)}
                      >
                        <img src={img1} alt="Approve Advocate" />
                      </button>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => handleReject(caseReq._id)}
                      >
                        <img src={img2} alt="Reject Advocate" />
                      </button>
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

export default AdvocateViewInternReq
