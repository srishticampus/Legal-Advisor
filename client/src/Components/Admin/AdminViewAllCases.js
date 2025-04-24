import React, { useEffect, useState } from "react";
import img from "../../Assets/Vecto(2).png";
import axiosInstance from "../Constants/BaseUrl";
import { Link } from "react-router-dom";
import noData from "../../Assets/noDataFound.json";
import Lottie from "lottie-react";
function AdminViewAllCases() {

    const [data, setData] = useState([]);


    useEffect(() => {
      axiosInstance
        .post("/getAllCases")
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

      {data.length !== 0 ? (
        <div className="table-container table-striped">
          <table className="table-change container-fluid">
            <thead>
              <tr>
                <th className="table-header">Case Title</th>
                <th className="table-header">Type</th>
                <th className="table-header">Date Of Incident</th>
                <th className="table-header">User Name</th>
                <th className="table-header">Advocate Name</th>
              </tr>
            </thead>
            <tbody>
              {data.length ? (
                data.map((advocate) => (
                  <tr>
                    <td className="table-data">{advocate.title}</td>
                    <td className="table-data">{advocate.type}</td>
                    <td className="table-data">{advocate.dateOfIncident.slice(0,10)}</td>
                    <td className="table-data">{advocate.userId.name}</td>
                    <td className="table-data">{advocate.advocateStatus==true?advocate.advocateId.name:'-'}</td>
                    <td className="table-data">
                      <Link to={`/admin_view_single_case/${advocate._id}`}>
                        <button className="btn btn-outline-secondary">
                          Details
                        </button>
                      </Link>
                    </td>{" "}
                    {/* <td className="table-data">
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
                    </td> */}
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

export default AdminViewAllCases
