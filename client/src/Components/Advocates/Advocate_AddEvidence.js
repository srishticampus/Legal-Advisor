import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosMultipartInstance from '../Constants/FormDataUrl';
import { toast } from 'react-toastify';

function Advocate_AddEvidence() {
  const [data, setData] = useState({ title: '', description: '', file: null });
  const { id } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      file: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    axiosMultipartInstance
    .post(`/addEvidence/${id}`,data)
    .then((res) => {
      console.log(res);
      if (res.data.status === 200) {
        toast.success("Evidence Added Successfully");
        navigate(-1);
      } else {
        toast.error("Failed");
      }
    })
    .catch(() => {
      toast.error("Failed");
    });  };

  return (
    <div>
      <div className='junior-heading-div container-fluid'>
        <label className='junior-reg-title'>Add Evidence</label>
      </div>
      <div className='payment-card-center'>
        <div className="card card-style-change">
          <form onSubmit={handleSubmit}>
            <div className="card-body">
              <div className='row row-position-adjust'>
                <div className='col-5'>
                  <p className='payment-name-style'>Evidence Title</p>
                </div>
                <div className='col-2'>
                  <div className='payment-name-style'>:</div>
                </div>
                <div className='col-5'>
                  <input
                    className="form-control form-control-lg control-border"
                    type="text"
                    name="title"
                    value={data.title}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className='row row-position-adjust'>
                <div className='col-5'>
                  <p className='payment-name-style'>Description</p>
                </div>
                <div className='col-2'>
                  <div className='payment-name-style'>:</div>
                </div>
                <div className='col-5'>
                  <input
                    className="form-control form-control-lg control-border"
                    type="text"
                    name="description"
                    value={data.description}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className='row row-position-adjust sep-pading'>
                <div className='col-5'>
                  <p className='payment-name-style'>Upload File</p>
                </div>
                <div className='col-2'>
                  <div className='payment-name-style'>:</div>
                </div>
                <div className='col-5'>
                  <input
                    className="form-control form-control-lg control-border"
                    type="file"
                    onChange={handleFileChange}
                    required
                  />
                </div>
              </div>

              <div className="col-12 text-center mt-3">
                <button type="submit" className="btn bg-gold but-move">
                  Add
                </button>
                <button type="button" className="btn bg-gold but-move" onClick={() => navigate(-1)}>
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Advocate_AddEvidence;
