import React, { useEffect, useState } from "react";
import "./AdminViewAllJuniorAdvocate.css";
import img from "../../Assets/Vecto(2).png";
import axiosInstance from "../Constants/BaseUrl";
import { Link } from "react-router-dom";
import noData from "../../Assets/noDataFound.json";
import Lottie from "lottie-react";

function AdminViewAllJuniorAdvocate() {
    const [data, setData] = useState([]);

  const handleActivate = (id) => {
    axiosInstance
      .post(`/activateJuniorAdvocateById/${id}`)
      .then((res) => {
        if (res.data.status === 200) {
          const updatedData = data.map((junioradvocate) => {
            if (junioradvocate._id === id) {
                junioradvocate.isActive = true;
            }
            return junioradvocate;
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
      .post(`/deactivateJuniorAdvocateById/${id}`)
      .then((res) => {
        if (res.data.status === 200) {
          const updatedData = data.map((junioradvocate) => {
            if (junioradvocate._id === id) {
                junioradvocate.isActive = false;
            }
            return junioradvocate;
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
      .post("/viewJuniorAdvocates")
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
    <div>
<div className="main-div">
      <Link to="/adminviewjunioradvocaterequest">View Junior Advocate request</Link>

      {data.length !== 0 ? (
        <div className="table-container table-striped">
          <table className="table-change container-fluid">
            <thead>
              <tr>
                <th className="juniorad-table-header">Bar council Enrolment No</th>
                <th className="juniorad-table-header">Junior Advocate Name</th>
                <th className="juniorad-table-header">Specialization areas</th>
                <th className="juniorad-table-header">Bar Council Area</th>
                <th className="juniorad-table-header">Educational qualification</th>
                <th className="juniorad-table-header">Institute Name</th>
                <th className="juniorad-table-header">Percentage of Marks</th>
                <th className="juniorad-table-header">View full Details</th>
                <th className="juniorad-table-header">User Status</th>
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
                    <td className="ju-table-data">{junioradvocate.percentage} %</td>

                    <td className="ju-table-data">
                      <Link to={`/JuniorAdvocateViewProfile/${junioradvocate._id}`}>
                        <button className="btn1 btn btn-outline-secondary">
                          <img src={img} alt="View Details" />
                        </button>
                      </Link>
                    </td>{" "}
                    <td className="table-data">
                      {junioradvocate.isActive ? (
                        <button
                          className="btn btn-outline-danger button-size1"
                          onClick={() => handleDeactivate(junioradvocate._id)}
                        >
                          Deactivate
                        </button>
                      ) : (
                        <button
                          className="btn btn-outline-success button-size1"
                          onClick={() => handleActivate(junioradvocate._id)}
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
    </div>
  )
}

export default AdminViewAllJuniorAdvocate