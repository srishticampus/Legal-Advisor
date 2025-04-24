import React, { useState } from 'react';
import img2 from "../../Assets/adv3.avif";
import './BarCouncilLogin.css';
import { Link } from 'react-router-dom';

function BarCouncilLogin() {
  const [data, setData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));

    setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
    }));
  };

  const validateEmail = (value) => {
    if (!value.trim()) {
      return 'Email is required';
    }
    // Add more email validation logic if needed
    return '';
  };

  const validatePassword = (value) => {
    if (!value.trim()) {
      return 'Password is required';
    }
    // Add more password validation logic if needed
    return '';
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let errors = {};

    errors.email = validateEmail(data.email);
    errors.password = validatePassword(data.password);

    setErrors(errors);

    // Proceed with login if there are no errors
    if (Object.values(errors).every(error => error === '')) {
      // Perform login logic here
    }
  };

  return (
    <div>
      <div class="container barcouncillogindiv1">
        <div class="card-header mx-auto  bg-img1">
          <h3 class="mx-auto  barcouncilloginformhead d-flex justify-content-center"> BarCouncil Login  </h3>
        </div>
        <div className="container d-flex flex-row bd-highlight mb-3 barcouncillogindiv2 ">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <input
                                type="text"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                className="form-control form-control-lg"
                                placeholder="Your Email Here"
                            />
                            {errors.email && <div className="text-danger">{errors.email}</div>}
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={handleChange}
                                className="form-control form-control-lg advocateloginform1"
                                placeholder="Password Here"
                            />
                            {errors.password && <div className="text-danger">{errors.password}</div>}
                        </div>

                        <div className="form-group">
                            <input
                                type="submit"
                                name="btn"
                                value="Login"
                                className="btn  btn-outline-danger float-right login_btn advocateloginbtn"
                            />
                        </div>
                        
                    </form>

                </div>
      </div>
    </div>
  );
}

export default BarCouncilLogin;
