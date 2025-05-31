import React, { useEffect, useState } from "react";
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

function JuniorAdvViewAdvDetailCase() {
  const [data, setData] = useState({
    userId: {profilePic:{filename:''}},
    caseId: { _id:'',dateOfIncident: "", evidence: { filename: "" } },
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const aid = localStorage.getItem("advocateId");
  const [showModal, setShowModal] = useState(false);
  const [evidenceUrl, setEvidenceUrl] = useState("");
  const [fileType, setFileType] = useState(""); // State to store the file type

  useEffect(() => {
    axiosInstance
      .post(`/getAppointmentReqsById/${id}`)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          setData(res.data.data || {});
        } else {
          setData({});
        }
      })
      .catch((error) => {
        console.error("Error!", error);
      });
  }, [id]);

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

  let a = false;

  return (
    <div>
      <div className="adv_view_case_req">
        <div className="container">
          <div className="d-flex justify-content-end">
         
          </div>

          <div className="row mt-3">
            <div className="col-5">
              <div className="adv_case_req_left_container1">
                <div className="adv_case_req_left_container1_head">
                  <p>Client Details</p>
                </div>
                <div className="adv_case_req_left_container1_content d-flex">
                  <div className="adv_case_req_left_container1_content_img">
                  <img src={`${imageUrl}/${data.userId.profilePic.filename}`} alt="Client" />
                  </div>
                  <div>
                    <div className="d-flex mt-2">
                      <div className="px-3">
                        <img src={icon1} alt="icon1" />
                      </div>
                      <div>{data.userId.name}</div>
                    </div>
                    <div className="d-flex mt-2">
                      <div className="px-3">
                        <img src={icon2} alt="icon2" />
                      </div>
                      <div>{data.userId.email}</div>
                    </div>
                    <div className="d-flex mt-2">
                      <div className="px-3">
                        <img src={icon3} alt="icon3" />
                      </div>
                      <div>{data.userId.contact}</div>
                    </div>
                    <div className="d-flex mt-2">
                      <div className="px-3">
                        <img src={icon4} alt="icon4" />
                      </div>
                      <div>{data.userId.address}</div>
                    </div>
                    <div className="d-flex mt-2">
                      <div className="px-3">
                        <img src={icon5} alt="icon5" />
                      </div>
                      <div>{data.userId.nationality}</div>
                    </div>
                    {
                        a==true?<div className="col-auto">
                      <Link
                        to={``}
                      >
                        <button className="btn btn-outline-dark mt-4  me-2">
                          Chat
                        </button>
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
                        <td>Case Number</td>
                        <td>: NO{data.caseId._id.slice(19,24)}</td>
                      </tr>
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
                      {
                        a.true?<tr>
                        <td>Evidence</td>
                        <td>
                          :{" "}
                          <Link to="#" onClick={handleEvidenceClick}>
                            Click here
                          </Link>
                        </td>
                      </tr>:''
                      }
                      
                    </tbody>
                  </table>
                  {a == true ?
                  <div className="row justify-content-center mt-4 arr">
                    <div className="col-auto">
                      <Link
                        to={`/advocate_view_case_status/${data.caseId._id}`}
                      >
                        <button className="btn btn-warning btn-style  me-2">
                          Case Status
                        </button>
                      </Link>
                    </div>
                    <div className="col-auto">
                      <Link
                        to={`/advocate_view_added_evidences/${data.caseId._id}`}
                      >
                        <button className="btn btn-warning btn-style  me-2">
                          Evidences Info
                        </button>
                      </Link>
                    </div>
                    <div className="col-auto">
                      <Link
                        to={`/advocate_view_client_payment_status/${data.caseId._id}`}
                      >
                        <button className="btn btn-warning btn-style  me-2">
                          Payment Info
                        </button>
                      </Link>
                    </div>
                  </div>:''
                }
                  
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
  );
}

export default JuniorAdvViewAdvDetailCase;
