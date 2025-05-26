import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../Constants/BaseUrl';
import { toast } from 'react-toastify';
import axiosMultipartInstance from '../Constants/FormDataUrl';

function AdvocateEditArticle() {
  const [data, setData] = useState({
    title: '',
    content: '',
    img: ''
  });
  const { id } = useParams();
  const navigate=useNavigate()

  useEffect(() => {
    axiosInstance
      .post(`/viewBlogsById/${id}`)
      .then((res) => {
        if (res.data.status === 200) {
          setData(res.data.data || {});
        } else {
          setData({});
        }
      })
      .catch((error) => {
        console.error('Error!', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'img') {
      setData({ ...data, img: files[0] });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);
    if (data.img) {
      formData.append('img', data.img);
    }

    console.log(formData);

    axiosMultipartInstance
      .post(`/editBlogsById/${id}`, formData)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
            navigate('/advocate_view_articles')
          toast.success('Article updated successfully');
        } else {
          toast.error('Failed to update article');
        }
      })
      .catch((error) => {
        toast.error('Failed to update article');
        console.error('Error!', error);
      });
  };

  return (
    <div>
      <div className="junior-heading-div container-fluid">
        <label className="junior-reg-title">Edit Article</label>
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
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-12 text-center mt-3">
                <button type="submit" className="btn bg-gold but-move">
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdvocateEditArticle;
