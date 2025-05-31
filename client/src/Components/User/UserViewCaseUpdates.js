import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../Constants/BaseUrl";
import { imageUrl } from "../Constants/Image_Url";
import { Modal, Button } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import { toast } from "react-toastify";
import icon1 from "../../Assets/profile.png";
import icon2 from "../../Assets/mail.png";
import icon3 from "../../Assets/contact.png";
import icon4 from "../../Assets/house.png";
import icon5 from "../../Assets/location.png";
import "./UserViewCaseUpdates.css";

function UserViewCaseUpdates() {
  const [data, setData] = useState({
    advocateId: { profilePic: { filename: "" } },
    dateOfIncident: "",
    evidence: { filename: "" },
  });

  const [review, setReview] = useState("");
  const [isJunior, setIsJunior] = useState([]);

  // Function to update review state when textarea value changes
  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [evidenceUrl, setEvidenceUrl] = useState("");
  const [reviews, setReviews] = useState([]);

  const uid = localStorage.getItem("userId");

  // console.log("caseId", id);

  useEffect(() => {
    axiosInstance
      .post(`/getCaseById/${id}`)
      .then((res) => {
        if (res.data.status === 200) {
          setData(res.data.data || []);
          console.log("Data fetched:", res.data.data);
        } else {
          setData([]);
        }
      })
      .catch((error) => {
        console.error("Error!", error);
      });
  }, [id]);

  useEffect(() => {
    axiosInstance
      .post(`/checkIfJrInchat`, { userId: uid, caseId: id })
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          setIsJunior(res.data.data);
        } else {
        }
      })
      .catch((error) => {
        console.error("Error!", error);
      });
  }, []);

  // useEffect(() => {
  //   axiosInstance
  //     .post(`/getAppointmentReqsByUserId/${uid}`)
  //     .then((res) => {
  //       console.log(res);
  //       if (res.data.status === 200) {
  //         setIsJunior(res.data.data);
  //       } else {
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error!", error);
  //     });
  // }, []);

  const handleEvidenceClick = () => {
    setEvidenceUrl(`${imageUrl}/${data.evidence.filename}`);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const addRating = (newRating) => {
    axiosInstance
      .post(`/addRating/${data.advocateId._id}`, { rating: newRating })
      .then((res) => {
        if (res.data.status === 200) {
          toast.success("Rating Added");
        } else {
          console.log("Failed to add rating");
        }
      })
      .catch((error) => {
        console.error("Error!", error);
      });
  };
  const [reloadReviews, setReloadReviews] = useState(false);

  useEffect(() => {
    axiosInstance
      .post(`/viewAllreviewsByAdvId/${data.advocateId._id}`)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          setReviews(res.data.data);
        } else {
          console.log("Failed to fetch reviews");
        }
      })
      .catch((error) => {
        console.error("Error!", error);
      });
  }, [reloadReviews]);

  let a = data.advocateId.rating ? data.advocateId.rating : 0;

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("Review:", review);
    axiosInstance
      .post(`/addReview`, {
        userId: uid,
        advId: data.advocateId._id,
        review: review,
      })
      .then((res) => {
        if (res.data.status === 200) {
          toast.success("Review Added");
          setReview("");
          setReloadReviews((prev) => !prev);
        } else {
          console.log("Failed to add review");
        }
      })
      .catch((error) => {
        console.error("Error!", error);
      });
  };

  return (
    <div>
      <div className="adv_view_case_req">
        <div className="container">
          <div className="d-flex justify-content-end">
            {/* Action buttons */}
          </div>

          <div className="row mt-3">
            <div className="col-5">
              <div className="adv_case_req_left_container1">
                <div className="adv_case_req_left_container1_head">
                  <p>Advocate Details</p>
                </div>
                <div className="adv_case_req_left_container1_content d-flex">
                  <div className="adv_case_req_left_container1_content_img">
                    <img
                      src={`${imageUrl}/${data.advocateId.profilePic.filename}`}
                      alt="Client"
                    />
                  </div>
                  <div>
                    <div className="d-flex mt-2">
                      <div className="px-3">
                        <img src={icon1} alt="icon1" />
                      </div>
                      <div>{data.advocateId.name}</div>
                    </div>
                    <div className="d-flex mt-2">
                      <div className="px-3">
                        <img src={icon2} alt="icon2" />
                      </div>
                      <div>{data.advocateId.email}</div>
                    </div>
                    <div className="d-flex mt-2">
                      <div className="px-3">
                        <img src={icon3} alt="icon3" />
                      </div>
                      <div>{data.advocateId.contact}</div>
                    </div>
                    <div className="d-flex mt-2">
                      <div className="px-3">
                        <img src={icon4} alt="icon4" />
                      </div>
                      <div>{data.advocateId.address}</div>
                    </div>
                    <div className="d-flex mt-2">
                      <div className="px-3">
                        <img src={icon5} alt="icon5" />
                      </div>
                      <div>{data.advocateId.nationality}</div>
                    </div>
                    <div className="d-flex mt-2">
                      <ReactStars
                        count={5}
                        size={30}
                        value={a}
                        onChange={addRating}
                        activeColor="#ffd700"
                      />
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
                      {data.opponentName ? data.opponentName : "Unknown"}
                    </div>
                  </div>
                  <div className="d-flex mt-2">
                    <div className="px-3">Address :</div>
                    <div>
                      {data.opponentAddress ? data.opponentAddress : "Unknown"}
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
                        <td>: {data.title}</td>
                      </tr>
                      <tr>
                        <td>Case Description</td>
                        <td>: {data.description}</td>
                      </tr>
                      <tr>
                        <td>Case Type</td>
                        <td>: {data.type}</td>
                      </tr>
                      <tr>
                        <td>Date of Request</td>
                        <td>: {data.dateOfIncident.slice(0, 10)}</td>
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
                    {console.log(isJunior)}
                    {isJunior.length > 0 ? (
                      <div className="col-auto">
                        <Link to={`/user_chat_to_jnr_adv/${data._id}`}>
                          <button className="btn btn-warning btn-style me-2">
                            Chat to Junior
                          </button>
                        </Link>
                      </div>
                    ) : (
                      ""
                    )}

                    <div className="col-auto">
                      <Link to={`/user_view_case_status/${data._id}`}>
                        <button className="btn btn-warning btn-style me-2">
                          Case Updates
                        </button>
                      </Link>
                    </div>
                    <div className="col-auto">
                      <Link to={`/user_view_added_evidences/${data._id}`}>
                        <button className="btn btn-warning btn-style me-2">
                          Evidences Info
                        </button>
                      </Link>
                    </div>
                    <div className="col-auto">
                      <Link to={`/user_view_adv_payment_req/${data._id}`}>
                        <button className="btn btn-warning btn-style me-2">
                          Payment Info
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="user_add_review">
              <p>
                <b>Reviews ({reviews.length})</b>
              </p>
              <p>Write a review</p>
              <form onSubmit={handleSubmit}>
                <div className="review_form">
                  <div className="review_form_textarea">
                    <textarea
                      className="form-control border border-dark mb-2"
                      name="review"
                      value={review}
                      onChange={handleReviewChange}
                      required
                    />
                  </div>
                  <div className="review_form_button">
                    <button className="btn bg-gold" type="submit">
                      Add Review
                    </button>
                  </div>
                </div>
              </form>
              {reviews.length ? (
                reviews.map((e) => {
                  return (
                    <div className="view_review_container mt-1">
                      <div className="d-flex">
                        <p>
                          <i class="ri-star-fill"></i>
                        </p>
                        <p className="px-2">{e.review}</p>
                      </div>
                      <div className="d-flex justify-content-end">
                        <p>
                          <small>
                            {e.userId.name}. {e.date.slice(0, 10)}
                          </small>
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p id="min-h" className="mt-3">
                  No Reviews Found
                </p>
              )}
            </div>
          </div>
        </div>

        <Modal show={showModal} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Evidence</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {evidenceUrl.endsWith(".pdf") ? (
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

export default UserViewCaseUpdates;
