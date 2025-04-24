import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../Constants/BaseUrl';
import { imageUrl } from '../Constants/Image_Url';

function AdminViewInternProfile({view}) {

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
      .post(`/viewInternsById/${id}`)
      .then((response) => {
        console.log(response);
        setAdvocate(response.data.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the advocate details!", error);
      });
  }, [id]);

  const handleApprove = (id) => {
    axiosInstance
      .post(`/approveInternsById/${id}`)
      .then((res) => {
        if (res.data.status === 200) {
          const updatedData = data.map((advocate) => {
            if (advocate._id === id) {
              advocate.adminApproved = true;
            }
            return advocate;
          });
          setData(updatedData);
          navigate("/admin_view_intern_adv_req");
        }
      })
      .catch((error) => {
        console.error("Error!", error);
      });
  };

  const handleReject = (id) => {
    axiosInstance
      .post(`/rejectInternsById/${id}`)
      .then((res) => {
        if (res.data.status === 200) {
          const updatedData = data.map((advocate) => {
            if (advocate._id === id) {
              advocate.adminApproved = false;
            }
            return advocate;
          });
          setData(updatedData);
          navigate("/admin_view_intern_adv_req");

        }
      })
      .catch((error) => {
        console.error("Error!", error);
      });
  };

  const handleActivate = (id) => {
    axiosInstance
      .post(`/activateInternsById/${id}`)
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
      .post(`/deactivateInternsById/${id}`)
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
          <label className="practice-area d-block">{advocate.specialization}</label>
          
          <br />
        
        </div>
        <div className="col-lg-8 col-md-6 col-sm-12 ">
          <div>
            <table className="table custom-table">
              <tbody>
                <tr>
                  <td className="left-alignn">
                    <label className="sub-label">Institute Name </label>
                  </td>
                  <td className="left-alignn"> : </td>
                  <td className="left-alignn">
                    <label className="sub-label">{advocate.institute}</label>
                  </td>
                </tr>
                <tr>
                  <td className="left-alignn">
                    <label className="sub-label">Year of Passout</label>
                  </td>
                  <td className="left-alignn"> : </td>
                  <td className="left-alignn">
                    <label className="sub-label">{advocate.yearOfPassout}</label>
                  </td>
                </tr>
                <tr>
                  <td className="left-alignn">
                    <label className="sub-label">Percentage of Mark </label>
                  </td>
                  <td className="left-alignn"> : </td>
                  <td className="left-alignn">
                    <label className="sub-label">{advocate.percentage}%</label>
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
                    <label className="sub-label">Educational Qualification </label>
                  </td>
                  <td className="left-alignn"> : </td>
                  <td className="left-alignn">
                    <label className="sub-label">{advocate.qualification}</label>
                  </td>
                </tr>
                <tr>
                  <td className="left-alignn">
                    <label className="sub-label">Address </label>
                  </td>
                  <td className="left-alignn"> : </td>
                  <td className="left-alignn">
                    <label className="sub-label">{advocate.address}</label>
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
                  <div className=" mt-4 arr">
                    <div className="d-flex justify-content-center">
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
      

      {/* Backdrop */}
      {showModal && <div className="modal-backdrop fade show" />}
    </div>
  )
}

export default AdminViewInternProfile
