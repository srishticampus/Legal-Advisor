import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../Constants/BaseUrl";
import "../Admin/ViewProfile_AR.css";
import img from "../../Assets/image 21.png";
import { imageUrl } from '../Constants/Image_Url' 

function ViewProfile_AR({ view }) {
  const [advocate, setAdvocate] = useState(null);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (localStorage.getItem("adminId") == null) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    axiosInstance
      .post(`/viewAdvocateById/${id}`)
      .then((response) => {
        setAdvocate(response.data.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the advocate details!", error);
      });
  }, [id]);

  const handleApprove = (id) => {
    axiosInstance
      .post(`/approveAdvocateById/${id}`)
      .then((res) => {
        if (res.data.status === 200) {
          const updatedData = data.map((advocate) => {
            if (advocate._id === id) {
              advocate.adminApproved = true;
            }
            return advocate;
          });
          setData(updatedData);
          navigate("/admin-viewalladvocates");
        }
      })
      .catch((error) => {
        console.error("Error!", error);
      });
  };

  const handleReject = (id) => {
    axiosInstance
      .post(`/rejectAdvocateById/${id}`)
      .then((res) => {
        if (res.data.status === 200) {
          const updatedData = data.map((advocate) => {
            if (advocate._id === id) {
              advocate.adminApproved = false;
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

  const handleActivate = (id) => {
    axiosInstance
      .post(`/activateAdvocateById/${id}`)
      .then((res) => {
        if (res.data.status === 200) {
          setAdvocate((prevAdvocate) => ({
            ...prevAdvocate,
            isActive: true,
          }));
        }
      })
      .catch((error) => {
        console.error("Error!", error);
      });
  };

  const handleDeactivate = (id) => {
    axiosInstance
      .post(`/deactivateAdvocateById/${id}`)
      .then((res) => {
        if (res.data.status === 200) {
          setAdvocate((prevAdvocate) => ({
            ...prevAdvocate,
            isActive: false,
          }));
        }
      })
      .catch((error) => {
        console.error("Error!", error);
      });
  };

  const toggleModal = () => setShowModal(!showModal);

  if (!advocate) {
    return "";
  }

  return (
    <div className="container-fluid mt-4">
      <div className="row justify-content-center">
        <div className="admin_view_advocate_img col-lg-4 col-md-6 col-sm-12 text-center">
          <img src={`${imageUrl}/${advocate.profilePic.filename}`} className="img-fluid rounded" alt="Advocate" />
          <br />
          <label className="advocate-name d-block mt-3">{advocate.name}</label>
          <label className="practice-area d-block">Practice Area</label>
          <label className="experience-label d-block">
            {advocate.experience} Years of Experience in Various Cases
          </label>
          <br />
          <Link className="link-label" to="#!" onClick={toggleModal}>
            View Id Proof
          </Link>
        </div>
        <div className="col-lg-8 col-md-6 col-sm-12 ">
          <div>
            <table className="table custom-table">
              <tbody>
                <tr>
                  <td className="left-alignn">
                    <label className="sub-label">Bar Council Enrollment Number </label>
                  </td>
                  <td className="left-alignn"> : </td>
                  <td className="left-alignn">
                    <label className="sub-label">{advocate.bcNo}</label>
                  </td>
                </tr>
                <tr>
                  <td className="left-alignn">
                    <label className="sub-label">Date of Enrollment </label>
                  </td>
                  <td className="left-alignn"> : </td>
                  <td className="left-alignn">
                    <label className="sub-label">{advocate.dateOfEnrollment}</label>
                  </td>
                </tr>
                <tr>
                  <td className="left-alignn">
                    <label className="sub-label">State Bar Council </label>
                  </td>
                  <td className="left-alignn"> : </td>
                  <td className="left-alignn">
                    <label className="sub-label">{advocate.bcState}</label>
                  </td>
                </tr>
                <tr>
                  <td className="left-alignn">
                    <label className="sub-label">Specialization Areas </label>
                  </td>
                  <td className="left-alignn"> : </td>
                  <td className="left-alignn">
                    <label className="sub-label">{advocate.specialization}</label>
                  </td>
                </tr>
                <tr>
                  <td className="left-alignn">
                    <label className="sub-label">Years of Experience </label>
                  </td>
                  <td className="left-alignn"> : </td>
                  <td className="left-alignn">
                    <label className="sub-label">{advocate.experience} years</label>
                  </td>
                </tr>
                <tr>
                  <td className="left-alignn">
                    <label className="sub-label">Educational Qualification </label>
                  </td>
                  <td className="left-alignn"> : </td>
                  <td className="left-alignn">
                    <label className="sub-label">{advocate.qualification}</label>
                  </td>
                </tr>
                 

                {view === "view" ? (
                  <div className="row justify-content-center mt-4 arr">
                    <div className="col-auto">
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
                    </div>
                  </div>
                ) : view === "request" ? (
                  <div className="row justify-content-center mt-4 arr">
                    <div className="col-auto">
                      <button
                        className="btn btn-warning btn-style  me-2"
                        onClick={() => handleApprove(advocate._id)}
                      >
                        Accept
                      </button>
                      <button
                        className="btn btn-style btn-warning"
                        onClick={() => handleReject(advocate._id)}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div className={`modal fade ${showModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">ID Proof</h5>
              <button type="button" className="close" onClick={toggleModal} aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <img src={`${imageUrl}/${advocate.idProof.filename}`} className="img-fluid" alt="ID Proof" />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={toggleModal}>Close</button>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {showModal && <div className="modal-backdrop fade show" />}
    </div>
  );
}

export default ViewProfile_AR;
