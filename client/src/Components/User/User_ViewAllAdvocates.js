import React, { useState, useEffect } from "react";
import "./User_ViewAllAdvocates.css";
import axiosMultipartInstance from "../Constants/FormDataUrl";
import { imageUrl } from "../Constants/Image_Url";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import Rating from "react-rating";


function User_ViewAllAdvocates() {
  const [currentPage, setCurrentPage] = useState(0);
  const [advocates, setAdvocates] = useState([]);
  const advocatesPerPage = 4;

  useEffect(() => {
    axiosMultipartInstance
      .post("/viewAdvocates")
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          setAdvocates(res.data.data || []);
        } else {
          setAdvocates([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching advocates:", error);
      });
  }, []);

  const prevPage = () => {
    setCurrentPage((prevPage) =>
      prevPage === 0 ? advocates.length - 1 : prevPage - 1
    );
  };

  const nextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage === advocates.length - 1 ? 0 : prevPage + 1
    );
  };

  const currentAdvocates = advocates.slice(
    currentPage,
    currentPage + advocatesPerPage
  );

  return (
    <div>
      <div className="junior-heading-div container-fluid">
        <label className="junior-reg-title">View Advocates</label>
      </div>
      <div className="carousel main-caro">
        <h2 className="heading-padding">All Advocates</h2>
        <div className="carousel-inner caro-inner-style">
          <button
            className="carousel-control control-caro prev"
            onClick={prevPage}
          >
            ‹
          </button>
          <div className="carousel-track track-caro">
            {currentAdvocates.map((advocate, index) => (
              <div key={index} className="carousel-card card-style">
                <div className="card-body card-body-style">
                  <div className="client-main-div">
                    <div className="client-view-ad-namearea">
                      <h3>{advocate.name}</h3>
                      <p>{advocate.specialization}</p>
                    </div>
                    <div>
                      <img
                        src={`${imageUrl}/${advocate.profilePic.filename}`}
                        alt={advocate.name}
                        className="image-fluid image-style"
                      />
                    </div>

                    <div className="view-ad-button-div">
                      <Link to={`/user_view_advocate_detail/${advocate._id}`}>
                        <button>View full Details</button>
                      </Link>
                      <br />
                      <div className="d-flex justify-content-center pb-2">
                        {/* <ReactStars
                          count={5}
                          value={advocate.rating ? advocate.rating : 0}
                          size={24}
                          activeColor="#F1B31C"
                          edit={false}
                        /> */}
                        <Rating
                          initialRating={advocate.rating}
                          readonly
                          fullSymbol={
                            <span
                              style={{ fontSize: "24px", color: "#F1B31C" }}
                            >
                              ★
                            </span>
                          }
                          emptySymbol={
                            <span style={{ fontSize: "24px" }}>☆</span>
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            className="carousel-control control-caro next"
            onClick={nextPage}
          >
            ›
          </button>
        </div>
      </div>
      <br />
    </div>
  );
}

export default User_ViewAllAdvocates;
