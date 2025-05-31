import React, { useEffect, useState } from 'react';
import axiosInstance from '../Constants/BaseUrl';
import noData from "../../Assets/noDataFound.json";
import Lottie from "lottie-react";
import { Link } from 'react-router-dom'; 

function AdvocateViewAllRecentCases() { 
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const id = localStorage.getItem('advocateId');

  useEffect(() => {
    axiosInstance
      .post(`/getApprovedAppointmentsForAdv/${id}`)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          setData(res.data.data.reverse() || []);
          setFilteredData(res.data.data.reverse() || []);
        } else {
          setData([]);
          setFilteredData([]);
        }
      })
      .catch((error) => {
        console.error("Error!", error);
      });
  }, [id]);

  const handleMonthChange = (e) => {
    const month = e.target.value;
    setSelectedMonth(month);

    if (month === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((caseReq) => {
        const date = new Date(caseReq.caseId.dateOfIncident);
        return date.getMonth() === parseInt(month);
      });
      setFilteredData(filtered);
    }
  };

  return (
    <div>
      <div className="main-div">
        <div className="row mb-3 w-25">
          <div className="col-12 d-flex">
            <p>Sort</p>
            <select
              value={selectedMonth}
              onChange={handleMonthChange}
              className="form-select mx-3"
            >
              <option value="">Select Month</option>
              <option value="0">January</option>
              <option value="1">February</option>
              <option value="2">March</option>
              <option value="3">April</option>
              <option value="4">May</option>
              <option value="5">June</option>
              <option value="6">July</option>
              <option value="7">August</option>
              <option value="8">September</option>
              <option value="9">October</option>
              <option value="10">November</option>
              <option value="11">December</option>
            </select>
          </div>
        </div>

        {filteredData.length !== 0 ? (
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
                {filteredData.length ? (
                  filteredData.map((caseReq) => (
                    <tr key={caseReq._id}>
                      <td className="table-data">NO{caseReq.caseId._id.slice(19, 24)}</td> 
                      <td className="table-data">{caseReq.caseId.title}</td> 
                      <td className="table-data">{caseReq.userId.name}</td>
                      <td className="table-data">{caseReq.userId.contact}</td>
                      <td className="table-data">{caseReq.caseId.type}</td>
                      <td className="table-data">{caseReq.caseId.dateOfIncident.slice(0, 10)}</td>
                      <td className="table-data">{caseReq.caseId.opponentName ? caseReq.caseId.opponentName : 'Unknown'}</td>
                      <td className="table-data">{caseReq.caseId.opponentAddress ? caseReq.caseId.opponentAddress : 'Unknown'}</td>
                      <td className="table-data">{caseReq.caseId.location}</td>
                      <td className="table-data">
                        <Link to={`/advocate_view_single_recent_case/${caseReq._id}`}>
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

export default AdvocateViewAllRecentCases;
