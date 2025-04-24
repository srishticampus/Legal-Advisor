import React, { useEffect, useState } from "react";
import img from "../../Assets/Vecto(2).png";
import axiosInstance from "../Constants/BaseUrl";
import { Link } from "react-router-dom";
import noData from "../../Assets/noDataFound.json";
import Lottie from "lottie-react";
function AdminViewUsers() {

    const [data, setData] = useState([]);


  useEffect(() => {
    axiosInstance
      .post("/viewUsers")
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
                <th className="table-header">Name</th>
                <th className="table-header">Email</th>
                <th className="table-header">Contact</th>
                <th className="table-header">address</th>
                <th className="table-header">Nationality</th>
              </tr>
            </thead>
            <tbody>
              {data.length ? (
                data.map((advocate) => (
                  <tr>
                    <td className="table-data">{advocate.name}</td>
                    <td className="table-data">{advocate.email}</td>
                    <td className="table-data">{advocate.contact}</td>
                    <td className="table-data">{advocate.address}</td>
                    <td className="table-data">{advocate.nationality}</td>
                    <td className="table-data">
                      <Link to={`/admin_view_single_user/${advocate._id}`}>
                        <button className="btn1 btn btn-outline-secondary">
                          <img src={img} alt="View Details" />
                        </button>
                      </Link>
                    </td>{" "}
                    {console.log(advocate.isActive)}
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

export default AdminViewUsers
