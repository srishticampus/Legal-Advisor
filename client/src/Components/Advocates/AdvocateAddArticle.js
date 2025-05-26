import React, { useState } from "react";
import axiosMultipartInstance from "../Constants/FormDataUrl";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AdvocateAddArticle() {
  const [data, setData] = useState({ title: "", content: "", img: "" });

  const id = localStorage.getItem("advocateId");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setData({ ...data, [name]: files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    axiosMultipartInstance
      .post(`/addBlog/${id}`, data)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          navigate("/advocate_view_articles");
          toast.success("Article Added Successfully");
        } else {
          toast.error("Failed to Add Article");
        }
      })
      .catch(() => {
        toast.error("Failed to Add Case");
      });
  };

  return (
    <div>
      <div className="junior-heading-div container-fluid">
        <label className="junior-reg-title">Add Articles</label>
      </div>
      <div className="payment-card-center">
        <div className="card card-style-change">
          <form onSubmit={handleSubmit}>
            <div className="card-body">
              <div className="row row-position-adjust">
                <div className="col-5">
                  <p className="payment-name-style">Title</p>
                </div>
                <div className="col-2">
                  <div className="payment-name-style">:</div>
                </div>
                <div className="col-5">
                  <input
                    className="form-control border border-dark mb-2"
                    type="text"
                    name="title"
                    value={data.title}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row row-position-adjust">
                <div className="col-5">
                  <p className="payment-name-style">Article Contents</p>
                </div>
                <div className="col-2">
                  <div className="payment-name-style">:</div>
                </div>
                <div className="col-5">
                  <textarea
                    className="form-control border border-dark mb-2"
                    name="content"
                    value={data.content}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row row-position-adjust">
                <div className="col-5">
                  <p className="payment-name-style">Upload Cover Image</p>
                </div>
                <div className="col-2">
                  <div className="payment-name-style">:</div>
                </div>
                <div className="col-5">
                  <input
                    className="form-control border border-dark mb-2"
                    type="file"
                    name="img"
                    onChange={handleFileChange}
                    required
                  />
                </div>
              </div>
              <div className="col-12 text-center mt-3">
                <button type="submit" className="btn bg-gold but-move">
                  Add
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdvocateAddArticle;
