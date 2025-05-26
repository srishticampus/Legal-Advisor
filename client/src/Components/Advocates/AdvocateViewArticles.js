import React, { useEffect, useState } from "react";
import "./AdvocateViewArticles.css";
import axiosInstance from "../Constants/BaseUrl";
import { imageUrl } from "../Constants/Image_Url";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import noReqFound from "../../Assets/noReqFound.json";
import Lottie from "lottie-react";

function AdvocateViewArticles() {
    const [data, setData] = useState([]);
    const id=localStorage.getItem('advocateId')

    useEffect(() => {
      axiosInstance
        .post(`/viewMyBlogsByadvocateId/${id}`)
        .then((res) => {
          if (res.data.status === 200) {
            console.log(res);
            setData(res.data.data || []);
          } else {
            setData([]);
          }
        })
        .catch((error) => {
          console.error("Error!", error);
        });
    }, []);

    const handleRemove = (articleId) => {
        axiosInstance
          .post(`/deleteBlogsById/${articleId}`)
          .then((res) => {
            console.log(res);
            if (res.data.status === 200) {
              toast.success("Article Removed");
              setData((prevData) => prevData.filter((article) => article._id !== articleId));
            } else {
              toast.error("Failed to Remove Article");
            }
          })
          .catch(() => {
            toast.error("Failed to Remove Article");
          });
      };

  return (
    <div>
      <div className="adv_view_articles">
        <div className="container">
          <div className="row">

            {
                data.length?data.map((e)=>{
                    return(
                        <div className="col-12 mb-2">
              <div className="article_cards">
                <div className="row">
                  <div className="col-lg-4 col-md-6 col-sm-12 article_card_image">
                    <img
                      src={`${imageUrl}/${e.img.filename}`}
                      alt="article_img"
                    />
                  </div>
                  <div className="col-lg-8 col-md-6 col-sm-12">
                    <div className="article_card_container">
                      <div className="article_card_container_head">
                        <p>
                          <b>{e.title}</b>
                        </p>
                        <p>
                          <b>
                            <i class="ri-calendar-2-line"></i> {e.date.slice(0,10)}
                          </b>
                        </p>
                      </div>
                      <div className="d-flex align-items-center">
                        <p>
                          {e.content}
                        </p>
                      </div>
                      <div className="article_card_container_actions d-flex justify-content-end">
                        <div>
                            <Link to={`/advocate_edit_articles/${e._id}`}> <button className="btn">
                            <i class="ri-edit-box-fill mx-2"></i> Edit
                          </button></Link>
                         
                          <button className="btn" onClick={()=>{handleRemove(e._id)}} >
                            <i class="ri-delete-bin-6-line "></i> Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
                    )
                }):<div className="no_data_animation">
                <Lottie
                  animationData={noReqFound}
                  className="no_data_animation"
                />
                {/* <h1 className="text-center">No Articles Found</h1> */}
              </div>
            }

            
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdvocateViewArticles;
