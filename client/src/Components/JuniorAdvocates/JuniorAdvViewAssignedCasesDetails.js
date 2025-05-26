import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import img from "../../Assets/adv4.avif";
import icon1 from "../../Assets/profile.png";
import icon2 from "../../Assets/mail.png";
import icon3 from "../../Assets/contact.png";
import icon4 from "../../Assets/house.png";
import icon5 from "../../Assets/location.png";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
import { imageUrl } from "../Constants/Image_Url";
import axiosInstance from "../Constants/BaseUrl";

function JuniorAdvViewAssignedCasesDetails() {
  const [data, setData] = useState({});
  const [caseDetails, setCaseDetails] = useState({userId:{profilePic:{filename:''}},dateOfIncident:'',evidence:{filename:''}});
  const { id } = useParams();
  const { cid } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [evidenceUrl, setEvidenceUrl] = useState("");

  useEffect(() => {
    axiosInstance
      .post(`/getAssignedCaseReqsById/${id}`)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          setData(res.data.data);
        } else {
          setData({});
        }
      })
      .catch((error) => {
        console.error("Error!", error);
      });

    axiosInstance
      .post(`/getCaseById/${cid}`)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          setCaseDetails(res.data.data);
        } else {
          setData({});
        }
      })
      .catch((error) => {
        console.error("Error!", error);
      });
  }, [id]);

  const handleEvidenceClick = () => {
    setEvidenceUrl(`${imageUrl}/${caseDetails.evidence.filename}`);
    setShowModal(true);
  };

    const handleClose = () => setShowModal(false);

  return (
    <div className="adv_view_case_req">
      <div className="container">
        <div className="row">
          <div className="col-5">
            <div className="adv_case_req_left_container1">
              <div className="adv_case_req_left_container1_head">
                <p>Client Details</p>
              </div>
              <div className="adv_case_req_left_container1_content d-flex">
                <div className="adv_case_req_left_container1_content_img">
                <img src={`${imageUrl}/${caseDetails.userId.profilePic.filename}`} alt="Client" />
                </div>
                <div>
                  <div className="d-flex mt-2">
                    <div className="px-3">
                      <img src={icon1} alt="icon1" />
                    </div>
                    <div>{caseDetails.userId.name}</div>
                  </div>
                  <div className="d-flex mt-2">
                    <div className="px-3">
                      <img src={icon2} alt="icon2" />
                    </div>
                    <div>{caseDetails.userId.email}</div>
                  </div>
                  <div className="d-flex mt-2">
                    <div className="px-3">
                      <img src={icon3} alt="icon3" />
                    </div>
                    <div>{caseDetails.userId.contact}</div>
                  </div>
                  <div className="d-flex mt-2">
                    <div className="px-3">
                      <img src={icon4} alt="icon4" />
                    </div>
                    <div>{caseDetails.userId.address}</div>
                  </div>
                  <div className="d-flex mt-2">
                    <div className="px-3">
                      <img src={icon5} alt="icon5" />
                    </div>
                    <div>{caseDetails.userId.nationality}</div>
                  </div>
                  {
                    data.isChatEnabled==true?
                    <div className="text-center" >
                  <Link to={`/junior_adv_chat_to_user/${caseDetails.userId._id}/${cid}`}>
                  <button className="btn btn-outline-dark m-3" >Chat</button>
                  </Link>
                  
                </div>:''

                  }
                </div>
              </div>
            </div>
            <div className="adv_case_req_left_container2">
              <div className="adv_case_req_left_container1_head">
                <p>Opponent Details</p>
              </div>
              <div className="adv_case_req_left_container1_content">
                <div className="d-flex mt-2">
                  <div className="px-3">Name : </div>
                  <div>
                    {caseDetails.opponentName
                      ? caseDetails.opponentName
                      : "Unknown"}
                  </div>
                </div>
                <div className="d-flex mt-2">
                  <div className="px-3">Address :</div>
                  <div>
                    {caseDetails.opponentAddress
                      ? caseDetails.opponentAddress
                      : "Unknown"}
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-7">
            {/* <div className="adv_case_req_left_container2 mb-3">
              <div className="adv_case_req_left_container1_head">
                <p>Opponent Details</p>
              </div>
              <div className="adv_case_req_left_container1_content">
                <div className="d-flex mt-2">
                  <div className="px-3">Name : </div>
                  <div>
                    {data.caseId.opponentName
                      ? data.caseId.opponentName
                      : "Unknown"}
                    unknown
                  </div>
                </div>
                <div className="d-flex mt-2">
                  <div className="px-3">Address :</div>
                  <div>
                    {data.caseId.opponentAddress
                      ? data.caseId.opponentAddress
                      : "Unknown"}
                    unknown
                  </div>
                </div>
              </div>
            </div> */}

            <div className="adv_case_req_right_container" id="min-h">
              <div className="adv_case_req_left_container1_head">
                <p>Case Details</p>
              </div>
              <div className="adv_case_req_left_container1_content">
                <table>
                  <tbody>
                    <tr>
                      <td>Case Title</td>
                      <td>: {caseDetails.title}</td>
                    </tr>
                    <tr>
                      <td>Case Description</td>
                      <td>: {caseDetails.description}</td>
                    </tr>
                    <tr>
                      <td>Case Type</td>
                      <td>: {caseDetails.type}</td>
                    </tr>
                    <tr>
                      <td>Date of Request</td>
                      <td>: {caseDetails.dateOfIncident.slice(0,10)}</td>
                    </tr>
                    <tr>
                      <td>Evidence</td>
                      <td>
                        :{" "}
                        <Link
                          to="#"
                          onClick={handleEvidenceClick}
                        >
                          Click here
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="text-center" >
                  <Link to={`/junior_adv_view_assigned_case_evidences/${caseDetails._id}`}>
                  <button className="btn btn-outline-dark m-3" >View all evidences</button>
                  </Link>
                  
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
          {evidenceUrl.endsWith('.pdf') ? (
            <iframe src={evidenceUrl} width="100%" height="500px" title="Evidence PDF" />
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
  );
}

export default JuniorAdvViewAssignedCasesDetails;
