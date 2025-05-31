import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axiosInstance from '../Constants/BaseUrl';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

// Define the payment schema with updated validation for cardHolderName
const paymentSchema = yup.object().shape({
  cardHolderName: yup
    .string()
    .matches(/^[A-Za-z ]*$/, 'Only alphabets are allowed')
    .min(3, 'Must be at least 3 characters')
    .max(50, 'Must be 50 characters or less')
    .required('Required'),
  cardNo: yup
    .string()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(12, 'Must be at least 12 digits')
    .max(19, 'Must be 19 digits or less')
    .required('Required'),
  cvv: yup
    .string()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(3, 'Must be exactly 3 digits')
    .max(4, 'Must be exactly 4 digits')
    .required('Required'),
  month: yup
    .string()
    .required('Required'),
  year: yup
    .string()
    .required('Required')
});

function UserPayAdvReq() {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; // getMonth() is zero-based

  const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' }
  ].filter(month => month.value >= currentMonth);
  
  const years = Array.from({ length: 11 }, (_, i) => currentYear + i);

  const onSubmit = (values) => {
    console.log(values);
    axiosInstance
      .post(`/receivePaymentsById/${id}`, values) // Added values to the post request
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          navigate(-1)
          toast.success("Payment Completed");
        } else {
          toast.error("Failed ");
        }
      })
      .catch(() => {
        toast.error("Failed to Add Case");
      });
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue, isSubmitting } = useFormik({
    initialValues: {
      cardHolderName: '',
      cardNo: '',
      cvv: '',
      month: '',
      year: ''
    },
    validationSchema: paymentSchema,
    onSubmit,
  });

  // Function to handle card holder name input (only allow alphabets and spaces)
  const handleNameChange = (e) => {
    const { value } = e.target;
    // Only update if the value is empty or matches alphabets and spaces
    if (value === '' || /^[A-Za-z ]*$/.test(value)) {
      handleChange(e);
    }
  };

  return (
    <div>
      <div className="junior-heading-div container-fluid">
        <label className="junior-reg-title">Pay Now</label>
      </div>
      <div className="payment-card-center">
        <div className="card card-style-change">
          <form onSubmit={handleSubmit}>
            <div className="card-body">
              <div className="row row-position-adjust">
                <div className="col-5">
                  <p className="payment-name-style">Account Holder Name</p>
                </div>
                <div className="col-2">
                  <div className="payment-name-style">:</div>
                </div>
                <div className="col-5">
                  <input
                    className={`form-control control-border ${errors.cardHolderName && touched.cardHolderName ? 'is-invalid' : ''}`}
                    type="text"
                    name="cardHolderName"
                    value={values.cardHolderName}
                    onChange={handleNameChange}
                    onBlur={handleBlur}
                    placeholder="Enter name as on card"
                  />
                  {errors.cardHolderName && touched.cardHolderName && (
                    <div className="invalid-feedback">{errors.cardHolderName}</div>
                  )}
                </div>
              </div>
              <div className="row row-position-adjust">
                <div className="col-5">
                  <p className="payment-name-style">Account Number</p>
                </div>
                <div className="col-2">
                  <div className="payment-name-style">:</div>
                </div>
                <div className="col-5">
                  <input
                    className={`form-control control-border ${errors.cardNo && touched.cardNo ? 'is-invalid' : ''}`}
                    type="text"
                    name="cardNo"
                    value={values.cardNo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter card number"
                  />
                  {errors.cardNo && touched.cardNo && (
                    <div className="invalid-feedback">{errors.cardNo}</div>
                  )}
                </div>
              </div>
              <div className="row row-position-adjust">
                <div className="col-5">
                  <p className="payment-name-style">CVV</p>
                </div>
                <div className="col-2">
                  <div className="payment-name-style">:</div>
                </div>
                <div className="col-5">
                  <input
                    className={`form-control control-border ${errors.cvv && touched.cvv ? 'is-invalid' : ''}`}
                    type="text"
                    name="cvv"
                    value={values.cvv}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter CVV"
                  />
                  {errors.cvv && touched.cvv && (
                    <div className="invalid-feedback">{errors.cvv}</div>
                  )}
                </div>
              </div>
              <div className="row row-position-adjust sep-pading">
                <div className="col-5">
                  <p className="payment-name-style">Expiry</p>
                </div>
                <div className="col-2">
                  <div className="payment-name-style">:</div>
                </div>
                <div className="col-5">
                  <div className="row">
                    <div className="col">
                      <select
                        name="month"
                        className={`form-control control-border ${errors.month && touched.month ? 'is-invalid' : ''}`}
                        value={values.month}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value="" label="Month" />
                        {months.map(month => (
                          <option key={month.value} value={month.value}>
                            {month.label}
                          </option>
                        ))}
                      </select>
                      {errors.month && touched.month && (
                        <div className="invalid-feedback">{errors.month}</div>
                      )}
                    </div>
                    <div className="col">
                      <select
                        name="year"
                        className={`form-control control-border ${errors.year && touched.year ? 'is-invalid' : ''}`}
                        value={values.year}
                        onChange={(e) => {
                          handleChange(e);
                          if (parseInt(e.target.value) > currentYear) {
                            setFieldValue('month', '');
                          }
                        }}
                        onBlur={handleBlur}
                      >
                        <option value="" label="Year" />
                        {years.map(year => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                      {errors.year && touched.year && (
                        <div className="invalid-feedback">{errors.year}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 text-center mt-3">
                <button 
                  type="submit" 
                  className="btn bg-gold but-move"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Submit'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserPayAdvReq;