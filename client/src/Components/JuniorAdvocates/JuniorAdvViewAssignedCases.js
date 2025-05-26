import React, { useEffect, useState } from 'react'
import axiosInstance from '../Constants/BaseUrl';
import noData from "../../Assets/noDataFound.json";
import img from "../../Assets/Vecto(2).png";
import Lottie from "lottie-react";
import { Link } from 'react-router-dom';



function JuniorAdvViewAssignedCases() {

    const [data, setData] = useState([]);
  const id = localStorage.getItem("junioradvocateId");

  useEffect(() => {
    axiosInstance
      .post(`/getCasesAssignedForJrId/${id}`)
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
      <div>
      <div className="junior-heading-div container-fluid">
        <label className="junior-reg-title">Assigned Cases</label>
      </div>
      <div className="main-div">
        {data.length !== 0 ? (
          <div className="table-container table-striped">
            <table className="table-change container-fluid">
              <thead>
                <tr>
                  <th className="table-header">Case No</th>
                  <th className="table-header">Case Title</th>
               
                  <th className="table-header">Case Type</th>
                  <th className="table-header">Date of Incident</th>
                  <th className="table-header">Opponent Name</th>
                  <th className="table-header">Opponent Details</th>
                  <th className="table-header">Case Location</th>
                  
                </tr>
              </thead>
              <tbody>
                {data.length ? (
                  data.map((juadvocatereq) => (
                    <tr>
                      <td className="table-data">NO{juadvocatereq.caseId._id.slice(19,24)}</td>
                      <td className="table-data">{juadvocatereq.caseId.title}</td>
                      <td className="table-data">
                        {juadvocatereq.caseId.type}
                      </td>
                      <td className="table-data">
                        {juadvocatereq.caseId.dateOfIncident.slice(0,10)}
                      </td>
                      <td className="table-data">
                        {juadvocatereq.caseId.opponentName} 
                      </td>
                      <td className="table-data">
                        {juadvocatereq.caseId.opponentAddress}
                      </td>

                      {/* <td className="table-data">{juadvocatereq.jrId.caseId}</td> */}
                      <td className="table-data">
                        {juadvocatereq.caseId.location}
                      </td>
                      
                      <td className="table-data">
                      <Link
                          to={`/junior_adv_view_assigned_cases_details/${juadvocatereq._id}/${juadvocatereq.caseId._id}`}
                        >
                          <button className=" btn btn-outline-secondary">
                            More
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
    </div>
  )
}

export default JuniorAdvViewAssignedCases
