import React, { useEffect, useState } from "react";
import "./UserViewRecentCases.css";
import icon1 from "../../Assets/recentCaseTitle.png";
import icon2 from "../../Assets/recentIcon2.png";
import icon3 from "../../Assets/recentIcon3.png";
import icon4 from "../../Assets/recentIcon4.png";
import icon5 from "../../Assets/recentIcon5.png";
import icon6 from "../../Assets/recentIcon6.png";
import icon7 from "../../Assets/recentIcon7.png";
import icon8 from "../../Assets/recentIcon8.png";
import icon9 from "../../Assets/recentIcon9.png";
import axiosInstance from "../Constants/BaseUrl";
import noReqFound from "../../Assets/noReqFound.json";
import Lottie from "lottie-react";
import { Modal, Button } from "react-bootstrap";
import { imageUrl } from "../Constants/Image_Url";
import { Link } from "react-router-dom";

function UserViewRecentCases() {
  const [array, setArray] = useState([]);
  const [filteredArray, setFilteredArray] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileType, setFileType] = useState(""); // State to store the file type
  const [selectedMonth, setSelectedMonth] = useState("");
  const id = localStorage.getItem("userId");

  useEffect(() => {
    axiosInstance
      .post(`/getCaseByUserId/${id}`)
      .then((response) => {
        console.log("Response Data:", response.data.data);
        if (response.status === 200) {
          const reversedArray = response.data.data.reverse();
          setArray(reversedArray);
          setFilteredArray(reversedArray);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleViewEvidence = (fileUrl) => {
    if (!fileUrl) {
      setFileType("none");
      setSelectedFile(null);
    } else {
      const fileExtension = fileUrl.split(".").pop().toLowerCase();
      setFileType(fileExtension);
      setSelectedFile(fileUrl);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedFile(null);
    setFileType("");
  };

  const handleMonthChange = (e) => {
    const month = e.target.value;
    setSelectedMonth(month);

    if (month === "") {
      setFilteredArray(array);
    } else {
      const filtered = array.filter((e) => {
        const date = new Date(e.dateOfIncident);
        return date.getMonth() === parseInt(month);
      });
      setFilteredArray(filtered);
    }
  };

  return (
    <div>
      <div className="user_view_recent_cases pt-5">
        <div className="container">
          <div className="row mb-3 w-25">
            <div className="col-12 d-flex">
              <p>Sort </p>
              <select
                value={selectedMonth}
                onChange={handleMonthChange}
                className="form-select mx-3"
              >
                <option value="">Select Month</option>
                <option value="0">January</option>
                <option value="1">February</option>
                <option value="2">March</option>
                <option value="3">April</option>
                <option value="4">May</option>
                <option value="5">June</option>
                <option value="6">July</option>
                <option value="7">August</option>
                <option value="8">September</option>
                <option value="9">October</option>
                <option value="10">November</option>
                <option value="11">December</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="user_recent_cases_container">
                {filteredArray.length > 0 ? (
                  <table className="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">Case Details</th>
                        <th scope="col">Opponent Details</th>
                        <th scope="col">Case Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredArray.map((e) => {
                        const fileUrl = e.evidence ? `${imageUrl}/${e.evidence.filename}` : null;
                        const formattedDate = e.dateOfIncident
                          ? new Date(e.dateOfIncident).toLocaleDateString()
                          : "Unknown";

                        return (
                          <tr key={e._id}>
                            <td>
                              <div className="d-flex">
                                <div className="px-3">
                                  <img src={icon1} alt="icon1" />
                                </div>
                                <div>{e.title}</div>
                              </div>
                              <div className="d-flex mt-2">
                                <div className="px-3">
                                  <img src={icon2} alt="icon2" />
                                </div>
                                <div>{e.type}</div>
                              </div>
                              <div className="d-flex mt-2">
                                <div className="px-3">
                                  <img src={icon3} alt="icon3" />
                                </div>
                                <div>{formattedDate}</div>
                              </div>
                              <div className="d-flex mt-2">
                                <div className="px-3">
                                  <img src={icon4} alt="icon4" />
                                </div>
                                <div>{e.location}</div>
                              </div>
                            </td>
                            <td>
                              <div className="d-flex">
                                <div className="px-3">
                                  <img src={icon5} alt="icon5" />
                                </div>
                                <div>
                                  {e.opponentName ? e.opponentName : "Unknown"}
                                </div>
                              </div>
                              <div className="d-flex mt-2">
                                <div className="px-3">
                                  <img src={icon6} alt="icon6" />
                                </div>
                                <div>
                                  {e.opponentAddress
                                    ? e.opponentAddress
                                    : "Unknown"}
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="mt-2">
                                <div className="px-3">
                                  <p>{e.description}</p>
                                </div>
                              </div>
                              <div className="d-flex justify-content-between pt-4">
                                <div className="d-flex mt-2">
                                  <div className="px-2">
                                    <img src={icon7} alt="icon7" />
                                  </div>
                                  <div
                                    onClick={() => handleViewEvidence(fileUrl)}
                                    style={{ cursor: "pointer" }}
                                  >
                                    [View Evidence]
                                  </div>
                                </div>
                                <div className="d-flex">
                                  <div className="px-2">
                                    {e.advocateStatus == false ? (
                                      <Link
                                        to={`/user-requestanadvocate/${e._id}`}
                                      >
                                        <button className="btn btn-recent">
                                          Request an advocate
                                        </button>
                                      </Link>
                                    ) : (
                                      <Link
                                        to={`/user_chat_to_advocate/${e.advocateId}`}
                                      >
                                        <button className="btn btn-recent">
                                          Chat
                                        </button>
                                      </Link>
                                    )}
                                  </div>
                                </div>
                                <div className="d-flex">
                                  <div className="px-2">
                                    {e.advocateStatus == false ? (
                                      ""
                                    ) : (
                                      <Link
                                        to={`/user_view_case_updations/${e._id}`}
                                      >
                                        <button className="btn btn-recent">
                                          View Updates
                                        </button>
                                      </Link>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <div className="no_data_animation">
                    <Lottie
                      animationData={noReqFound}
                      className="no_data_animation"
                    />
                    <h1 className="text-center">No Recent Cases</h1>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for viewing evidence */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>View Evidence</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {fileType === "none" ? (
            <p>No Evidence Added</p>
          ) : fileType === "pdf" ? (
            <iframe
              src={selectedFile}
              width="100%"
              height="500px"
              title="Evidence PDF"
            ></iframe>
          ) : (
            <img src={selectedFile} className="img-fluid" alt="Evidence" />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UserViewRecentCases;
