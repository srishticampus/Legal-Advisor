import React, { useEffect, useState } from 'react'
import axiosInstance from '../Constants/BaseUrl';
import { Link } from "react-router-dom";
import img from "../../Assets/Vecto(2).png";
import noData from "../../Assets/noDataFound.json";
import Lottie from "lottie-react";

function AdminViewApprovedInterns() {

    const [data, setData] = useState([]);

  const handleActivate = (id) => {
    axiosInstance
      .post(`/activateInternsById/${id}`)
      .then((res) => {
        if (res.data.status === 200) {
          const updatedData = data.map((advocate) => {
            if (advocate._id === id) {
              advocate.isActive = true;
            }
            return advocate;
          });
          setData(updatedData);
        }
      })
      .catch((error) => {
        console.error("Error!", error);
      });
  };

  const handleDeactivate = (id) => {
    axiosInstance
      .post(`/deactivateInternsById/${id}`)
      .then((res) => {
        if (res.data.status === 200) {
          const updatedData = data.map((advocate) => {
            if (advocate._id === id) {
              advocate.isActive = false;
            }
            return advocate;
          });
          setData(updatedData);
        }
      })
      .catch((error) => {
        console.error("Error!", error);
      });
  };

  useEffect(() => {
    axiosInstance
      .post("/viewInternss")
      .then((res) => {
        if (res.data.status === 200) {
          console.log(res);
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
      <Link to="/admin_view_intern_adv_req">View Interns Request</Link>

      {data.length !== 0 ? (
        <div className="table-container table-striped">
          <table className="table-change container-fluid">
            <thead>
              <tr>
              <th className="table-header">Institute Name</th>
              <th className="table-header">Intern Name</th>
              <th className="table-header">Specialization areas</th>
              <th className="table-header">Educational qualification</th>
              <th className="table-header">Years of Passout</th>
              <th className="table-header">View full Details</th>
                <th className="table-header">User Status</th>
              </tr>
            </thead>
            <tbody>
              {data.length ? (
                data.map((advocate) => (
                  <tr>
                    <td className="table-data">{advocate.institute}</td>
                  <td className="table-data">{advocate.name}</td>
                  <td className="table-data">{advocate.specialization}</td>
                  <td className="table-data">{advocate.qualification}</td>
                  <td className="table-data">{advocate.yearOfPassout}</td>
                    <td className="table-data">
                      <Link to={`/admin_view_intern_details/${advocate._id}`}>
                        <button className="btn1 btn btn-outline-secondary">
                          <img src={img} alt="View Details" />
                        </button>
                      </Link>
                    </td>{" "}
                    {console.log(advocate.isActive)}
                    <td className="table-data">
                      {advocate.isActive ? (
                        <button
                          className="btn btn-outline-danger button-size1"
                          onClick={() => handleDeactivate(advocate._id)}
                        >
                          Deactivate
                        </button>
                      ) : (
                        <button
                          className="btn btn-outline-success button-size1"
                          onClick={() => handleActivate(advocate._id)}
                        >
                          Activate
                        </button>
                      )}
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
  )
}

export default AdminViewApprovedInterns
