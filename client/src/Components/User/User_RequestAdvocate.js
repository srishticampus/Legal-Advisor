import React, { useState, useEffect } from 'react';
import './User_RequestAdvocate.css';
import axiosMultipartInstance from '../Constants/FormDataUrl';
import { imageUrl } from '../Constants/Image_Url';
import { Link, useParams } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";


function User_RequestAdvocate() {
    const [currentPage, setCurrentPage] = useState(0);
  const [advocates, setAdvocates] = useState([]);
  const advocatesPerPage = 4;

  const {id}=useParams();

  useEffect(() => {
    axiosMultipartInstance
      .post('/viewAdvocates')
      .then((res) => {
        if (res.data.status === 200) {
          setAdvocates(res.data.data || []);
        } else {
          setAdvocates([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching advocates:', error);
      });
  }, []);

  const prevPage = () => {
    setCurrentPage(prevPage => (prevPage === 0 ? advocates.length - 1 : prevPage - 1));
  };
  
  const nextPage = () => {
    setCurrentPage(prevPage => (prevPage === advocates.length - 1 ? 0 : prevPage + 1));
  };

  const currentAdvocates = advocates.slice(currentPage, currentPage + advocatesPerPage);
  
  return (
    <div>
        <div className='junior-heading-div container-fluid'>
        <label className='junior-reg-title'>View Advocates</label>
        </div>
        <div className="carousel req-main-caro">
        <h2 className='req-heading-padding'>All Advocates</h2>
        <div className="carousel-inner req-caro-inner-style">
          <button className="carousel-control req-control-caro prev" onClick={prevPage}>‹</button>
          <div className="carousel-track req-track-caro">
            {currentAdvocates.map((advocate, index) => (
              <div
                key={index}
                className="carousel-card req-card-style"
              >
                
                <div className="card-body card-height">
                  <div className='req-client-main-div'>
                    <div className='req-client-view-ad-namearea'>
                      <h3>{advocate.name}</h3>
                      <p>{advocate.specialization}</p>
                      
                    </div>
                    <div>
                      <img src={`${imageUrl}/${advocate.profilePic.filename}`} alt={advocate.name} className='image-fluid req-image-style' />
                    </div>
                    
                    <div className='req-view-ad-button-div'>
                    <Link to={`/user_bookappoinment/${advocate._id}/${id}`}>
                      <button className='btn btn-warning btn-warning-style'>Request</button>
                    </Link>
                    <br />
                      <div className="d-flex justify-content-center pb-2">
                        <ReactStars
                          count={5}
                          value={advocate.rating ? advocate.rating : 0}
                          size={24}
                          activeColor="#ffd700"
                          edit={false}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="carousel-control req-control-caro next" onClick={nextPage}>›</button>
        </div>
      </div><br/><br/><br/>
    </div>
  )
}

export default User_RequestAdvocate