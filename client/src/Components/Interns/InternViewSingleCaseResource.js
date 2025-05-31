import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../Constants/BaseUrl";
import { imageUrl } from "../Constants/Image_Url";
import { Modal, Button } from "react-bootstrap";
import img from "../../Assets/adv4.avif";
import icon1 from "../../Assets/profile.png";
import icon2 from "../../Assets/mail.png";
import icon3 from "../../Assets/contact.png";
import icon4 from "../../Assets/house.png";
import icon5 from "../../Assets/location.png";
import { toast } from 'react-toastify';

function InternViewSingleCaseResource() {

    const [data, setData] = useState({
       
        caseId: { dateOfIncident: "", evidence: { filename: "" } },
      });
      const { id } = useParams();
      const navigate = useNavigate();
      const iId = localStorage.getItem("internId");
      const [showModal, setShowModal] = useState(false);
      const [caseId, setcaseId] = useState('');
      const [userDetalis, setUserDetails] = useState({ userId: {profilePic:{filename:''}}});
      const [evidenceUrl, setEvidenceUrl] = useState("");
      const [fileType, setFileType] = useState(""); // State to store the file type
    
      useEffect(() => {
        axiosInstance
          .post(`/interngetCaseAppointmentReqsById/${id}`)
          .then((res) => {
            // console.log(res);
            if (res.data.status === 200) {
              setData(res.data.data || {});
              setcaseId(res.data.data.caseId._id)
            } else {
              setData({});
            }
          })
          .catch((error) => {
            console.error("Error!", error);
          });
      }, [id]);

      useEffect(() => {
        axiosInstance
          .post(`/getCaseById/${caseId}`)
          .then((res) => {
            console.log(res);
            if (res.data.status === 200) {
                setUserDetails(res.data.data);
            } else {
              setData({});
            }
          })
          .catch((error) => {
            console.error("Error!", error);
          });

      }, [caseId]);
    
      const handleEvidenceClick = () => {
        const evidence = data.caseId.evidence || {};
        const fileUrl = evidence.filename
          ? `${imageUrl}/${evidence.filename}`
          : null;
        if (!fileUrl) {
          setFileType("none");
          setEvidenceUrl(null);
        } else {
          const fileExtension = fileUrl.split(".").pop().toLowerCase();
          setFileType(fileExtension);
          setEvidenceUrl(fileUrl);
        }
        setShowModal(true);
      };
    
      const handleClose = () => setShowModal(false);
    

      

  return (
    <div>
      <div className="adv_view_case_req">
        <div className="container">
         

          <div className="row mt-3">
            <div className="col-5">
              <div className="adv_case_req_left_container1">
                <div className="adv_case_req_left_container1_head">
                  <p>Client Details</p>
                </div>
                <div className="adv_case_req_left_container1_content d-flex">
                  <div className="adv_case_req_left_container1_content_img">
                  <img src={`${imageUrl}/${userDetalis.userId.profilePic.filename}`} alt="Client" />
                  </div>
                  <div>
                    <div className="d-flex mt-2">
                      <div className="px-3">
                        <img src={icon1} alt="icon1" />
                      </div>
                      <div>{userDetalis.userId.name}</div>
                    </div>
                    <div className="d-flex mt-2">
                      <div className="px-3">
                        <img src={icon2} alt="icon2" />
                      </div>
                      <div>{userDetalis.userId.email}</div>
                    </div>
                    <div className="d-flex mt-2">
                      <div className="px-3">
                        <img src={icon3} alt="icon3" />
                      </div>
                      <div>{userDetalis.userId.contact}</div>
                    </div>
                    <div className="d-flex mt-2">
                      <div className="px-3">
                        <img src={icon4} alt="icon4" />
                      </div>
                      <div>{userDetalis.userId.address}</div>
                    </div>
                    <div className="d-flex mt-2">
                      <div className="px-3">
                        <img src={icon5} alt="icon5" />
                      </div>
                      <div>{userDetalis.userId.nationality}</div>
                    </div>
                  
                    
                  </div>
                </div>
              </div>
              <div className="adv_case_req_left_container2">
                <div className="adv_case_req_left_container1_head">
                  <p>Opponent Details</p>
                </div>
                <div className="adv_case_req_left_container1_content">
                  <div className="d-flex mt-2">
                    <div className="px-3">Name :</div>
                    <div>
                      {data.caseId.opponentName
                        ? data.caseId.opponentName
                        : "Unknown"}
                    </div>
                  </div>
                  <div className="d-flex mt-2">
                    <div className="px-3">Address :</div>
                    <div>
                      {data.caseId.opponentAddress
                        ? data.caseId.opponentAddress
                        : "Unknown"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-7">
              <div className="adv_case_req_right_container">
                <div className="adv_case_req_left_container1_head">
                  <p>Case Details</p>
                </div>
                <div className="adv_case_req_left_container1_content">
                  <table>
                    <tbody>
                      <tr>
                        <td>Case Title</td>
                        <td>: {data.caseId.title}</td>
                      </tr>
                      <tr>
                        <td>Case Description</td>
                        <td>: {data.caseId.description}</td>
                      </tr>
                      <tr>
                        <td>Case Type</td>
                        <td>: {data.caseId.type}</td>
                      </tr>
                      <tr>
                        <td>Date of Request</td>
                        <td>: {data.caseId.dateOfIncident.slice(0, 10)}</td>
                      </tr>
                     <tr>
                        <td>Evidence</td>
                        <td>
                          :{" "}
                          <Link to="#" onClick={handleEvidenceClick}>
                            Click here
                          </Link>
                        </td>
                      </tr>
                      
                    </tbody>
                  </table>
                  <div className="row justify-content-center mt-4 arr">
                    <div className="col-auto">
                      <Link
                        to={`/intern_view_resource_case_status/${data.caseId._id}`}
                      >
                        <button className="btn btn-warning btn-style  me-2">
                          Case Status
                        </button>
                      </Link>
                    </div>
                    <div className="col-auto">
                      <Link
                        to={`/intern_view_resource_evidence_info/${data.caseId._id}`}
                      >
                        <button className="btn btn-warning btn-style  me-2">
                          Evidences Info
                        </button>
                      </Link>
                    </div>
                    <div className="col-auto">
                     
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal show={showModal} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Evidence</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {fileType === "none" ? (
              <p>No Evidence Added</p>
            ) : fileType === "pdf" ? (
              <iframe
                src={evidenceUrl}
                width="100%"
                height="500px"
                title="Evidence PDF"
              />
            ) : (
              <img src={evidenceUrl} alt="Evidence" className="img-fluid" />
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  )
}

export default InternViewSingleCaseResource
