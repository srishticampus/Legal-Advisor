import React, { useEffect, useState } from "react";
import "./AdvocateHome.css";
import icon from "../../Assets/policeHomeCaseIcon.png";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../Constants/BaseUrl";
import { imageUrl } from "../Constants/Image_Url";
import noData from "../../Assets/noDataFound.json";
import Lottie from "lottie-react";

function AdvocateHome() {
  const [advocate, setAdvocate] = useState({ profilePic: {}, idProof: {} });
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('advocateId') == null) {
      navigate('/');
    }
  }, [navigate]);

  const id = localStorage.getItem('advocateId');

  useEffect(() => {
    axiosInstance
      .post(`/viewAdvocateById/${id}`)
      .then((response) => {
        console.log(response);
        setAdvocate(response.data.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the advocate details!", error);
      });
  }, [id]);

  const toggleModal = () => setShowModal(!showModal);

  const [data, setData] = useState([]);
  const [intern, setIntern] = useState([]);
  const [jr, setJr] = useState([]);
  const [resource, setResource] = useState([]);

  useEffect(() => {
    axiosInstance
      .post(`/getAppointmentReqsForAdv/${id}`)
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
    axiosInstance
      .post(`/interngetAppointmentReqsForAdv/${id}`)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          setIntern(res.data.data || []);
        } else {
          setIntern([]);
        }
      })
      .catch((error) => {
        console.error("Error!", error);
      });
    axiosInstance
      .post(`/getAppointmentReqsJnrForAdv/${id}`)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          setJr(res.data.data || []);
        } else {
          setJr([]);
        }
      })
      .catch((error) => {
        console.error("Error!", error);
      });
    axiosInstance
      .post(`/getAppointmentCaseReqsForAdv/${id}`)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          setResource(res.data.data || []);
        } else {
          setResource([]);
        }
      })
      .catch((error) => {
        console.error("Error!", error);
      });
  }, [id]);

  console.log(data);

  return (
    <div className="advocate_home">
      <div className="advocate_home_banner">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <p>
                Lawyers are the only persons in whom ignorance of the law is not
                punished...
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="advocate_home_container">
        <div className="container">
          <div className="row advocate_home_content">
            <div className="col-lg-8 col-md-6 col-sm-12 mt-3">
              <div className="container advocate_home_container1">
                <div className="advocate_home_container_card">
                  <p className="advocate_home_container_card_count">{data.length}</p>
                  <p className="advocate_home_container_card_title">
                    Case Requests
                  </p>
                </div>
                <div className="advocate_home_container_card">
                  <p className="advocate_home_container_card_count">{intern.length}</p>
                  <p className="advocate_home_container_card_title">
                    Intern Requests
                  </p>
                </div>
                <div className="advocate_home_container_card">
                  <p className="advocate_home_container_card_count">{jr.length}</p>
                  <p className="advocate_home_container_card_title">
                    Jr Advocate Requests
                  </p>
                </div>
                <div className="advocate_home_container_card">
                  <p className="advocate_home_container_card_count">{resource.length}</p>
                  <p className="advocate_home_container_card_title">
                    Resource Request
                  </p>
                </div>
              </div>
              <div className="container advocate_home_container2">
                <div className="advocate_home_container2_title mt-3">
                  <p>Recent Case Requests</p>
                </div>
                <div className="advocate_home_container2_table table-responsive">
                  {data.length !== 0 ? (
                    <table className="table align-center">
                      <thead>
                        <tr>
                          <th scope="col">Client Name</th>
                          <th scope="col">Email</th>
                          <th scope="col">Phone Number</th>
                          <th scope="col">Case Type</th>
                          <th scope="col">Date of Request</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.slice(0, 4).map((caseReq) => (
                          <tr key={caseReq._id}>
                            <td>{caseReq.userId.name}</td>
                            <td>{caseReq.userId.email}</td>
                            <td>{caseReq.userId.contact}</td>
                            <td>{caseReq.caseId.type}</td>
                            <td>{caseReq.caseId.dateOfIncident.slice(0,10)}</td>
                            <td>
                              <Link to={`/advocate_view_single_case_req/${caseReq._id}`}>
                                <button
                                  type="button"
                                  className="btn btn-outline px-3"
                                >
                                  <img src={icon} className="img-fluid" alt="View Case" />
                                </button>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="no_data_animation">
                      <Lottie animationData={noData} className="no_data_animation" />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 mt-3 advocate_home_profile_container pb-2">
              <div className="container">
                <div className="advocate_home_profile_container_img ">
                  <img src={`${imageUrl}/${advocate.profilePic.filename}`} alt="Profile" />
                </div>
                <div className="advocate_home_profile_container_head">
                  <p className="advocate_home_profile_container_head_title">
                    {advocate.name}
                  </p>
                  <p className="advocate_home_profile_container_head_subtitle mt-1">
                    <span className="text-gold">{advocate.specialization}</span>
                  </p>
                  <p className="advocate_home_profile_container_head_subtitle mt-1">
                    <span className="text-gold">{advocate.experience}</span> Years Of Experience
                  </p>
                </div>
                <div className="advocate_home_profile_container_body mt-3 text-wrap">
                  <table className="w-100">
                    <thead>
                      <tr>
                        <td scope="col">Email Address</td>
                        <td scope="col">{advocate.email}</td>
                      </tr>
                      <tr>
                        <td scope="col">Contact Number</td>
                        <td scope="col">{advocate.contact}</td>
                      </tr>
                      <tr>
                        <td scope="col">Bar Council Enrollment Number</td>
                        <td scope="col">{advocate.bcNo}</td>
                      </tr>
                      <tr>
                        <td scope="col">Date of Enrollment</td>
                        <td scope="col">{advocate.dateOfEnrollment}</td>
                      </tr>
                      <tr>
                        <td scope="col">State Bar Council</td>
                        <td scope="col">{advocate.bcState}</td>
                      </tr>
                      <tr>
                        <td scope="col">Specialization Areas</td>
                        <td scope="col">{advocate.specialization}</td>
                      </tr>
                      <tr>
                        <td scope="col">Educational Qualification</td>
                        <td scope="col">{advocate.qualification}</td>
                      </tr>
                    </thead>
                    <caption className="px-1">
                      <a href="#!" onClick={toggleModal}>View Id Proof</a>
                    </caption>
                  </table>
                  <div className="advocate_home_edit_btn text-center mt-3">
                    <Link to={`/advocate_edit_profile/${id}`}>
                      <button type="submit">Edit</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
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

export default AdvocateHome;
