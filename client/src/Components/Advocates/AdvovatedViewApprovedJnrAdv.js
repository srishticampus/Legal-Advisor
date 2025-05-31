import React, { useEffect, useState } from "react";
import "./AdvovatedViewApprovedJnrAdv";
import axiosInstance from "../Constants/BaseUrl";
import Lottie from "lottie-react";
import img from "../../Assets/Vecto(2).png";
import img1 from "../../Assets/Vectorsymbol.png";
import img2 from "../../Assets/raphael_cross.png";
import noData from "../../Assets/noDataFound.json";
import { Link } from "react-router-dom";

function AdvovatedViewApprovedJnrAdv() {
  const [data, setData] = useState([]);
  const id = localStorage.getItem("advocateId");

  useEffect(() => {
    axiosInstance
      .post(`/getApprovedJnrAppointmentsForAdv/${id}`)
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
      <div className="junior-heading-div container-fluid">
        <label className="junior-reg-title">View Junior Advocates</label>
      </div>
      <div className="main-div">
        {data.length !== 0 ? (
          <div className="table-container table-striped">
            <table className="table-change container-fluid">
              <thead>
                <tr>
                  <th className="table-header">Name</th>
                  <th className="table-header">Practice Area</th>
                  <th className="table-header">Institution</th>
                  <th className="table-header">Qualification</th>
                  <th className="table-header">Contact No</th>
                  <th className="table-header">Bar council enrollment no</th>
                  <th className="table-header">Date of enrollment</th>
                  <th className="table-header">View details</th>
                  
                </tr>
              </thead>
              <tbody>
                {data.length ? (
                  data.map((juadvocatereq) => (
                    <tr>
                      <td className="table-data">{juadvocatereq.jrId.name}</td>
                      <td className="table-data">
                        {juadvocatereq.jrId.specialization}
                      </td>
                      <td className="table-data">
                        {juadvocatereq.jrId.institute}
                      </td>
                      <td className="table-data">
                        {juadvocatereq.jrId.qualification}
                      </td>
                      <td className="table-data">
                        {juadvocatereq.jrId.contact}
                      </td>

                      <td className="table-data">{juadvocatereq.jrId.bcNo}</td>
                      <td className="table-data">
                        {juadvocatereq.jrId.dateOfEnrollment}
                      </td>
                      <td className="table-data">
                        <Link
                          to={`/advocate_view_jnr_adv_profile_req/${juadvocatereq.jrId._id}/${juadvocatereq._id}`}
                        >
                          <button className="btn1 btn btn-outline-secondary">
                            <img src={img} alt="View Details" />
                          </button>
                        </Link>
                      </td>
                      <td className="table-data">
                      <Link
                          to={`/advocate_assign_cases_to_jnradv/${juadvocatereq.jrId._id}`}
                        >
                          <button className=" btn btn-outline-secondary">
                            Assign Cases
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

export default AdvovatedViewApprovedJnrAdv;
