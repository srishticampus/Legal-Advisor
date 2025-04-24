import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import "./UserLogin.css";
import img from "../../Assets/userLogin.png";
import { toast } from "react-toastify";
import axiosInstance from "../Constants/BaseUrl";
import { LoginSchema } from "../Constants/Schema";

function UserLogin() {

  const [isToastVisible, setToastVisible] = useState(false);

  const navigate = useNavigate();

  const onSubmit = (values) => {
    axiosInstance.post('/loginUser', values)
        .then((res) => {
            console.log(res);
            if (res.data.status === 200) {
                if (!isToastVisible) {
                    setToastVisible(true);
                    toast.success("Registration Successful", {
                        onClose: () => setToastVisible(false),
                    });
                }
                localStorage.setItem('userId',res.data.data._id)
                navigate('/user_home');
            } else if (res.data.status === 405) {
                if (!isToastVisible) {
                    setToastVisible(true);
                    toast.warning(res.data.msg, {
                        onClose: () => setToastVisible(false),
                    });
                }
            } else {
                if (!isToastVisible) {
                    setToastVisible(true);
                    toast.error('Registration Failed', {
                        onClose: () => setToastVisible(false),
                    });
                }
            }
        })
        .catch(() => {
            if (!isToastVisible) {
                setToastVisible(true);
                toast.error('Registration Failed', {
                    onClose: () => setToastVisible(false),
                });
            }
        });
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, resetForm } = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: LoginSchema,
    onSubmit: onSubmit
  });

  return (
    <div className="user_registration">
      <div className="user_registration_container">
        <div className="user_registration_box1">
          <div className="user_registration_input_group">
            <form onSubmit={(e)=>{handleSubmit(e)}} onReset={resetForm}>
              <div className="user_registration_input mt-5">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control border border-dark"
                  placeholder="Enter your email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email && (<span className="text-danger">{errors.email}</span>)}
              </div>
              <div className="user_registration_input mt-4">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control border border-dark"
                  placeholder="Password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.password && touched.password && (<span className="text-danger">{errors.password}</span>)}
              </div>
              <div className="user_registration_forgot_pass text-end mt-3 fs-6">
                <Link to='/Userforgot' className="text-decoration-none text-dark"><p>Forgot Password?</p></Link>
              </div>
              <div className="user_registration_button text-center mt-4 d-flex justify-content-evenly">
                  <button type="submit">Submit</button>
                  <button type="reset">Reset</button>
              </div>
            </form>
            <div className="mt-4">
              <p>Don't have an account? <Link to='/UserRegistration' className="text-decoration-none text-gold">Register here.</Link></p>
            </div>
          </div>
        </div>
        <div className="user_registration_box2 justify-content-center">
          <img src={img} className="img-fluid" alt="user_reg_img" />
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
