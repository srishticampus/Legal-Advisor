import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../Constants/BaseUrl';
import { toast } from 'react-toastify';

function Advocate_UpdateCaseStatus() {
  const [data, setData] = useState({ status: '', date: '', description: '' });
  const [errors, setErrors] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Validate date if it's the date field being changed
    if (name === 'date') {
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time to compare dates only
      
      if (selectedDate < today) {
        setErrors({ ...errors, date: 'Past dates are not allowed' });
      } else {
        const newErrors = { ...errors };
        delete newErrors.date;
        setErrors(newErrors);
      }
    }
    
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Final validation before submit
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(data.date);
    
    if (selectedDate < today) {
      toast.error("Please select a current or future date");
      return;
    }
    
    if (Object.keys(errors).length > 0) {
      toast.error("Please fix the errors in the form");
      return;
    }

    console.log(data);
    axiosInstance
      .post(`/createStatus/${id}`, data)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          toast.success("Updated Successfully");
          navigate(-1);
        } else {
          toast.error("Failed");
        }
      })
      .catch(() => {
        toast.error("Failed");
      });
  };

  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <div>
      <div className="junior-heading-div container-fluid">
        <label className="junior-reg-title">Case Updates</label>
      </div>
      <div className="payment-card-center">
        <div className="card card-style-change">
          <form onSubmit={handleSubmit}>
            <div className="card-body">
              <div className="row row-position-adjust">
                <div className="col-5">
                  <p className="payment-name-style">Case Status</p>
                </div>
                <div className="col-2">
                  <div className="payment-name-style">:</div>
                </div>
                <div className="col-5">
                  <select
                    className="form-select control-border"
                    aria-label="Default select example"
                    name="status"
                    value={data.status}
                    onChange={handleChange}
                    required
                  >
                    <option value="">--Select--</option>
                    <option value="Hearning Status">Hearing Status</option>
                    <option value="Trial">Trial</option>
                    <option value="Final Judgement">Final Judgement</option>
                  </select>
                </div>
              </div>

              <div className="row row-position-adjust">
                <div className="col-5">
                  <p className="payment-name-style">Date</p>
                </div>
                <div className="col-2">
                  <div className="payment-name-style">:</div>
                </div>
                <div className="col-5">
                  <input
                    className={`form-control control-border ${errors.date ? 'is-invalid' : ''}`}
                    type="date"
                    name="date"
                    value={data.date}
                    onChange={handleChange}
                    min={today}
                    required
                  />
                  {errors.date && (
                    <div className="invalid-feedback">{errors.date}</div>
                  )}
                </div>
              </div>
              <div className="row row-position-adjust sep-pading">
                <div className="col-5">
                  <p className="payment-name-style">Description</p>
                </div>
                <div className="col-2">
                  <div className="payment-name-style">:</div>
                </div>
                <div className="col-5">
                  <textarea
                    className="form-control control-border"
                    rows="3"
                    name="description"
                    value={data.description}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
              </div>

              <div className="col-12 text-center mt-3">
                <button type="submit" className="btn bg-gold but-move">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Advocate_UpdateCaseStatus;