import React, { useState } from 'react';
import './Advocate_PaymentRequest.css';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../Constants/BaseUrl';
import { toast } from 'react-toastify';

function Advocate_PaymentRequest() {
  const [data, setData] = useState({ amount: '', category: '' });

  const { id } = useParams();
  const navigate=useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    axiosInstance
      .post(`/reqPayment/${id}`,data)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          toast.success("Request Added Successfully");
          navigate(-1);
        } else {
          toast.error("Failed");
        }
      })
      .catch(() => {
        toast.error("Failed");
      });
  };

  const handleReset = () => {
    setData({ amount: '', category: '' });
  };

  return (
    <div>
      <div className='junior-heading-div container-fluid'>
        <label className='junior-reg-title'>Payment Request</label>
      </div>
      <div className='payment-card-center'>
        <div className="card card-style-change">
          <form onSubmit={handleSubmit} onReset={handleReset}>
            <div className="card-body">
              <div className='row row-position-adjust'>
                <div className='col-5'>
                  <p className='payment-name-style'>Category</p>
                </div>
                <div className='col-2'>
                  <div className='payment-name-style'>:</div>
                </div>
                <div className='col-5'>
                  <select
                    className="form-select control-border"
                    aria-label="Default select example"
                    name="category"
                    value={data.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">--Select--</option>
                    <option value="Initial Payment">Initial Payment</option>
                    <option value="Registration Fee">Registration Fee</option>
                  </select>
                </div>
              </div>

              <div className='row row-position-adjust sep-pading'>
                <div className='col-5'>
                  <p className='payment-name-style'>Amount</p>
                </div>
                <div className='col-2'>
                  <div className='payment-name-style'>:</div>
                </div>
                <div className='col-5'>
                  <input
                    className="form-control form-control-lg control-border"
                    type="number"
                    name="amount"
                    value={data.amount}
                    onChange={handleChange}
                    required
                    aria-label=".form-control-lg example"
                  />
                </div>
              </div>

              <div className="col-12 text-center mt-3">
                <button type="submit" className="btn bg-gold but-move">
                  Send
                </button>
                <button type="reset" className="btn bg-gold but-move">
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

export default Advocate_PaymentRequest;
