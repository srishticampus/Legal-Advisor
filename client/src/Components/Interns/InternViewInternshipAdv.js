import React, { useEffect, useState } from 'react'
import axiosInstance from '../Constants/BaseUrl';
import { Link } from 'react-router-dom';
import { imageUrl } from '../Constants/Image_Url';

function InternViewInternshipAdv() {

    const [advocate, setAdvocate] = useState({ 
        profilePic: { filename: "" },
        idProof: { filename: "" },
      });
      const id = localStorage.getItem("internId");
    
      useEffect(() => {
        axiosInstance
          .post(`interngetApprovedMentorForInterns/${id}`)
          .then((res) => {
            console.log(res);
            if (res.data.data == null) {
              setAdvocate(null);
            } else if (res.data.status === 200) {
              setAdvocate(res.data.data.advocateId);
            }
          })
          .catch(() => {
            console.log("Failed to Add Case"); 
          });
      }, [id]);
    
      console.log(advocate);

  return (
    <div>
      {advocate == null ? (
        <div className="adv_client_payment_status d-flex justify-content-center align-items-center" >
        <h3>No Advocate Found</h3>
        </div>
      ) : (
        <div>
          <div className="junior-heading-div container-fluid">
            <label className="junior-reg-title">View Internship Advocate</label>
          </div>
          <div className="container-fluid mt-5 ">
            <div className="row justify-content-center">
              <div className="admin_view_junioradvocate_img col-lg-4 col-md-6 col-sm-12 text-center">
                <br />
                <img
                  src={`${imageUrl}/${advocate.profilePic.filename}`}
                  className="img-fluid rounded image-size"
                  alt="Advocate"
                />

                <label className="ju-advocate-name d-block mt-3">
                  {advocate.name}
                </label>
                <label className="ju-practice-area d-block">
                  {advocate.specialization}
                </label>
                <label className="client-view-ad-experiance d-block">
                  {advocate.experience} Years of Experience in Various Cases
                </label>
                {/* <Link
                  className="ju-link-label"
                  to="#"
                  data-toggle="modal"
                  data-target="#idProofModal"
                >
                  View Id Proof
                </Link> */}
              </div>
              <div className="col-sm-6 col-lg-6">
                <div>
                  <table className="table ju-custom-table">
                    <tbody>
                      <tr>
                        <td className="left-alignn">
                          <label className="ju-sub-label">
                            Bar Council Enrollment Number
                          </label>
                        </td>
                        <td className="left-alignn">:</td>
                        <td className="left-alignn">
                          <label className="ju-sub-label">
                            {advocate.bcNo}
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td className="left-alignn">
                          <label className="ju-sub-label">
                            Date of Enrollment
                          </label>
                        </td>
                        <td className="left-alignn">:</td>
                        <td className="left-alignn">
                          <label className="ju-sub-label">
                            {advocate.dateOfEnrollment}
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td className="left-alignn">
                          <label className="ju-sub-label">
                            State Bar Council
                          </label>
                        </td>
                        <td className="left-alignn">:</td>
                        <td className="left-alignn">
                          <label className="ju-sub-label">
                            {advocate.bcState}
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td className="left-alignn">
                          <label className="ju-sub-label">
                            Specialization Areas
                          </label>
                        </td>
                        <td className="left-alignn">:</td>
                        <td className="left-alignn">
                          <label className="ju-sub-label">
                            {advocate.specialization}
                          </label>
                        </td>
                      </tr>

                      <tr>
                        <td className="left-alignn">
                          <label className="ju-sub-label">
                            Educational Qualification
                          </label>
                        </td>
                        <td className="left-alignn">:</td>
                        <td className="left-alignn">
                          <label className="ju-sub-label">
                            {advocate.qualification}
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td className="left-alignn">
                          <label className="ju-sub-label">Gender</label>
                        </td>
                        <td className="left-alignn">:</td>
                        <td className="left-alignn">
                          <label className="ju-sub-label">
                            {advocate.gender}
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td className="left-alignn">
                          <label className="ju-sub-label">Email Address</label>
                        </td>
                        <td className="left-alignn">:</td>
                        <td className="left-alignn">
                          <label className="ju-sub-label">
                            {advocate.email}
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td className="left-alignn">
                          <label className="ju-sub-label">Contact Number</label>
                        </td>
                        <td className="left-alignn">:</td>
                        <td className="left-alignn">
                          <label className="ju-sub-label">
                            {advocate.contact}
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td className="left-alignn">
                          <label className="ju-sub-label">Nationality</label>
                        </td>
                        <td className="left-alignn">:</td>
                        <td className="left-alignn">
                          <label className="ju-sub-label">
                            {advocate.nationality}
                          </label>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <br />
                  <div className="appoinment-btn-div">
                    <Link to={`/intern_chat_to_adv/${advocate._id}`}>
                      <button className="btn btn-warning button-style-appoinment">
                        Chat Now
                      </button>
                    </Link>
                    <Link to={`/intern_view_adv_cases/${advocate._id}`}>
                      <button className="btn btn-warning button-style-appoinment mx-2">
                        View Cases
                      </button>
                    </Link>
                    <Link to={`/intern_view_approved_case_resource`}>
                      <button className="btn btn-warning button-style-appoinment">
                      Case Resources
                      </button>
                    </Link>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default InternViewInternshipAdv
