import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../Constants/BaseUrl';
import img from "../../Assets/userLogin.png";
import { toast } from 'react-toastify';

function UserForgotPassword() {
    const [data, setData] = useState({ email: '', password: '', repassword: '' });
    const [errors, setErrors] = useState({ email: '', password: '', repassword: '' });
    const [formIsValid, setFormIsValid] = useState(true);
    const [isToastVisible, setToastVisible] = useState(false);

    const navigate = useNavigate();

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
        if (fieldName === 'repassword' && value !== data.password) {
            setFormIsValid(false);
            return `Passwords do not match`;
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

        errors.repassword = validateField('Re-Enter Password', data.repassword);
        if (errors.repassword) formIsValid = false;

        setErrors(errors);
        setFormIsValid(formIsValid);

        if (formIsValid) {
            axiosInstance.post('/userforgotPassword', { email: data.email, password: data.password })
                .then(response => {
                    if (response.data.status === 200) {
                        if (!isToastVisible) {
                            setToastVisible(true);
                            toast.success("Password Reset Successful", {
                                onClose: () => setToastVisible(false),
                            });
                        }
                        navigate('/UserLogin'); 
                    } else if(response.data.status==500){
                        if (!isToastVisible) {
                            setToastVisible(true);
                            toast.error(response.data.msg, {
                                onClose: () => setToastVisible(false),
                            });
                        }
                    
                    } else {
                        if (!isToastVisible) {
                            setToastVisible(true);
                            toast.error('Password Reset Failed', {
                                onClose: () => setToastVisible(false),
                            });
                        }
                    }
                })
                .catch(error => {
                    if (!isToastVisible) {
                        setToastVisible(true);
                        toast.error('Password Reset Failed', {
                            onClose: () => setToastVisible(false),
                        });
                    }
                });
        }
    };

    const handleReset = () => {
        setData({ email: '', password: '', repassword: '' });
        setErrors({ email: '', password: '', repassword: '' });
        setFormIsValid(true);
    };

    return (
        <div className="user_registration">
            <div className='heading-div container-fluid'>
                <label className='reg-title'>User Forgot Password</label>
            </div>
            <div className="user_registration_container">
                <div className="user_registration_box1">
                    <div className="user_registration_input_group">
                        <form onSubmit={handleSubmit}>
                            <label className='user-text-edit'>Reset Password Here</label>
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
                            <div className="user_registration_input mt-4">
                                <label>Re-Enter Password</label>
                                <input
                                    type="password"
                                    className="form-control border border-dark"
                                    placeholder="Re-enter Password"
                                    name="repassword"
                                    value={data.repassword}
                                    onChange={handleChange}
                                />
                                {errors.repassword && <div className="text-danger">{errors.repassword}</div>}
                            </div>
                            <div className="user_registration_button text-center mt-5 d-flex justify-content-evenly">
                                <button type="submit">Submit</button>
                                <button type="button" onClick={handleReset}>Reset</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="user_registration_box2 justify-content-center">
                    <img src={img} className="img-fluid w-100" alt="user_reg_img" />
                </div>
            </div>
        </div>
    );
}

export default UserForgotPassword;
