import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../Constants/BaseUrl';
import { toast } from 'react-toastify';
import img from "../../Assets/intern-login.png";

function InternForgotPassword() {
    const [data, setData] = useState({ email: '', newPassword: '', confirmPassword: '' });
    const [errors, setErrors] = useState({ email: '', newPassword: '', confirmPassword: '' });
    const [formIsValid, setFormIsValid] = useState(true);
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
        if (fieldName === 'confirmPassword' && value !== data.newPassword) {
            setFormIsValid(false);
            return 'Passwords do not match';
        }
        return '';
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let errors = {};
        let formIsValid = true;

        errors.email = validateField('Email', data.email);
        if (errors.email) formIsValid = false;

        errors.newPassword = validateField('New Password', data.newPassword);
        if (errors.newPassword) formIsValid = false;

        errors.confirmPassword = validateField('Confirm Password', data.confirmPassword);
        if (errors.confirmPassword) formIsValid = false;

        setErrors(errors);
        setFormIsValid(formIsValid);

        if (formIsValid) {
            axiosInstance.post('/internforgotPassword', { email: data.email, password: data.newPassword })
            .then(response => {
                if (response.data.status === 200) {
                    toast.success("Password Reset Successful");
                    navigate('/intern_login');
                } else if(response.data.status==500) {
                    toast.error(response.data.msg);
                }
                 else {
                    toast.error('Password Reset Failed');
                }
            })
            .catch(error => {
                console.error("Error while resetting password:", error);
                toast.error('Password Reset Failed');
            });
        }
    };

    const handleReset = () => {
        setData({ email: '', newPassword: '', confirmPassword: '' });
        setErrors({ email: '', newPassword: '', confirmPassword: '' });
        setFormIsValid(true);
    };

    return (
        <div className="user_registration">
            <div className='heading-div container-fluid'>
                <label className='reg-title'>Intern Forgot Password</label>
            </div>
            <div className="user_registration_container">
                <div className="user_registration_box1">
                    <div className="user_registration_input_group">
                        <form onSubmit={handleSubmit}>
                            <label className='advocate-text-edit'>Reset Password Here</label>
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
                                <label>New Password</label>
                                <input
                                    type="password"
                                    className="form-control border border-dark"
                                    placeholder="New Password"
                                    name="newPassword"
                                    value={data.newPassword}
                                    onChange={handleChange}
                                />
                                {errors.newPassword && <div className="text-danger">{errors.newPassword}</div>}
                            </div>
                            <div className="user_registration_input mt-4">
                                <label>Confirm Password</label>
                                <input
                                    type="password"
                                    className="form-control border border-dark"
                                    placeholder="Confirm Password"
                                    name="confirmPassword"
                                    value={data.confirmPassword}
                                    onChange={handleChange}
                                />
                                {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
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

export default InternForgotPassword;
