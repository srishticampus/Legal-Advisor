import React, { useState } from 'react';
import img from "../../Assets/image23.png";
import './AdvocateLogin.css';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../Constants/BaseUrl';

function AdvocateLogin() {
    const [data, setData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [formIsValid, setFormIsValid] = useState(true);

    const navigate =useNavigate()

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

    const validateField = (fieldName, value) => {
        if (!value.trim()) {
            setFormIsValid(false);
            return `${fieldName} is required`;
        }
        return '';
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let errors = {};
        let formIsValid = true;

        errors.email = validateField('Email', data.email);
        if (errors.email) formIsValid = false;

        errors.password = validateField('Password', data.password);
        if (errors.password) formIsValid = false;

        setErrors(errors);
        setFormIsValid(formIsValid);

        if (formIsValid) {
            console.log("data", data);
            axiosInstance.post('/loginAdvocate', data)
                .then(response => {
                    console.log("Response:", response);
                    if (response.data.status === 200&&response.data.type=='advocate') {
                        console.log("Login Successful");
                        alert("Login Successful");
                        navigate('/advocate_home')
                        localStorage.setItem('advocateId',response.data.data._id)
                    } else if (response.data.status === 200&&response.data.type=='user') {
                        console.log("Login Successful");
                        alert("Login Successful");
                        localStorage.setItem('userId',response.data.data._id)
                        navigate('/user_home');
                    }else if (response.data.status === 200&&response.data.type=='junior') {
                        console.log("Login Successful");
                        alert("Login Successful");
                        navigate('/JuniorAdvocate-homepage')
                        localStorage.setItem('junioradvocateId',response.data.data._id)
                    }else if (response.data.status === 200&&response.data.type=='intern') {
                        console.log("Login Successful");
                        alert("Login Successful");
                        navigate('/intern_home');
                        localStorage.setItem('internId', response.data.data._id);
                    }
                    
                    
                    else if(response.data.status==405){
                        console.log("Login Failed");
                        alert(response.data.msg);
                    }else{
                        alert('Login Failed');
                    }
                })
                .catch(error => {
                    console.error("There was an error!", error);
                });
        }
    };

    const handleReset = () => {
        setData({ email: '', password: '' });
        setErrors({ email: '', password: '' });
        setFormIsValid(true);
    };

    return (
        <div>
            <div className="user_registration">
            <div className='heading-div container-fluid'>
        <label className='reg-title'>Login</label>
      </div>
                <div className="user_registration_container">
                    <div className="user_registration_box1">
                        <div className="user_registration_input_group">
                            <form onSubmit={handleSubmit}>
                                <label className='advocate-text-edit'>Login Here</label>
                                <div className="user_registration_input mt-5">
                                    <label>Email Id</label>
                                    <input
                                        type="text"
                                        className="form-control border border-dark"
                                        placeholder="Email Id"
                                        name="email"
                                        value={data.email}
                                        onChange={handleChange}
                                    />
                                    {errors.email && <div className="text-danger">{errors.email}</div>}
                                </div>
                                <div className="user_registration_input mt-4">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        className="form-control border border-dark"
                                        placeholder="Password"
                                        name="password"
                                        value={data.password}
                                        onChange={handleChange}
                                    />
                                    {errors.password && <div className="text-danger">{errors.password}</div>}
                                </div>
                                <div className="user_registration_forgot_pass text-end mt-3 fs-6">
                                    <Link
                                        to="/AdvocateForgot"
                                        className="text-decoration-none text-dark"
                                    >
                                        <p>Forgot Password?</p>
                                    </Link>
                                </div>
                                <div className="user_registration_button text-center mt-5 d-flex justify-content-evenly">
                                    <button type="submit">Submit</button>
                                    <button type="button" onClick={handleReset}>Reset</button>
                                </div>
                            </form>
                            {/* <div className="mt-4">
                                <p>
                                    Don't have an account?{" "}
                                    <Link
                                        to="/AdvcateRegister"
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

export default AdvocateLogin;
