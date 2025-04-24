import React, { useState } from "react";
import "./AdminLogin.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { AdminSchema } from "../Constants/Schema";
import img from "../../Assets/adminLogin.png";

function AdminLogin() {
  const [isToastVisible, setToastVisible] = useState(false);

  const navigate = useNavigate();

  const onSubmit = (values) => {
    if (values.email === "Admin" && values.password === "admin123") {
      if (!isToastVisible) {
        setToastVisible(true);
        toast.success("Login Successful", {
          onClose: () => setToastVisible(false),
        });

      }
      navigate('/admin-dashboard');
      localStorage.setItem('adminId',1)
    } else if (values.email === "Admin") {
      if (!isToastVisible) {
        setToastVisible(true);
        toast.warning("Password Mismatch", {
          onClose: () => setToastVisible(false),
        });
      }
    } else {
      if (!isToastVisible) {
        setToastVisible(true);
        toast.warning("Username Not Found", {
          onClose: () => setToastVisible(false),
        });
      }
    }
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, resetForm } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: AdminSchema,
      onSubmit: onSubmit,
    });

  return (
    <div>
      <div className="user_registration">
        <div className="user_registration_container">
          <div className="user_registration_box1">
            <div className="user_registration_input_group">
              <form
                onSubmit={(e) => {
                  handleSubmit(e);
                }} onReset={resetForm}
              >
                <div className="user_registration_input mt-5">
                  <label>Username</label>
                  <input
                    type="text"
                    className="form-control border border-dark"
                    placeholder="Enter Username"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email && (
                    <span className="text-danger">{errors.email}</span>
                  )}
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
                  {errors.password && touched.password && (
                    <span className="text-danger">{errors.password}</span>
                  )}
                </div>
                {/* <div className="user_registration_forgot_pass text-end mt-3 fs-6">
                  <Link
                    to="/forgot-password"
                    className="text-decoration-none text-dark"
                  >
                    <p>Forgot Password?</p>
                  </Link>
                </div> */}
                <div className="user_registration_button text-center mt-5 d-flex justify-content-evenly">
                  <button type="submit">Submit</button>
                  <button type="reset">Reset</button>
                </div>
              </form>
              {/* <div className="mt-4">
                <p>
                  Don't have an account?{" "}
                  <Link
                    to="/UserRegistration"
                    className="text-decoration-none text-gold"
                  >
                    Register here.
                  </Link>
                </p>
              </div> */}
            </div>
          </div>
          <div className="user_registration_box2 justify-content-center">
            <img src={img} className="img-fluid w-100" alt="user_reg_img" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
