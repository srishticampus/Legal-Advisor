import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../Constants/BaseUrl';
import img from '../../Assets/junioradvocate-loginimg.png';

function JuniorAdvocateForgotPassword() {
    const [data, setData] = useState({ email: '', password: '', repassword: '' });
    const [errors, setErrors] = useState({ email: '', password: '', repassword: '' });
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
        return '';
    };

    const validatePasswordMatch = (password, repassword) => {
        if (password !== repassword) {
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

        errors.password = validateField('Password', data.password);
        if (errors.password) formIsValid = false;

        errors.repassword = validateField('Re-Enter Password', data.repassword);
        if (errors.repassword) formIsValid = false;

        if (!errors.password && !errors.repassword) {
            errors.repassword = validatePasswordMatch(data.password, data.repassword);
            if (errors.repassword) formIsValid = false;
        }

        setErrors(errors);
        setFormIsValid(formIsValid);

        if (formIsValid) {
            console.log("data", data);
            axiosInstance.post('/junioradvocateforgotPassword', { email: data.email, password: data.password })
                .then(response => {
                    console.log("Response:", response);
                    if (response.data.status === 200) {
                        console.log("Password Reset Successful");
                        alert("Password Reset Successful");
                        navigate('/JuniorAdvocateLogin');
                    } else if(response.data.status==500) {
                        console.log(response.data.msg);
                        alert("Password Reset Failed");
                    }
                     else {
                        console.log("Password Reset Failed");
                        alert("Password Reset Failed");
                    }
                })
                .catch(error => {
                    console.error("There was an error!", error);
                });
        }
    };

    const handleReset = () => {
        setData({ email: '', password: '', repassword: '' });
        setErrors({ email: '', password: '', repassword: '' });
        setFormIsValid(true);
    };

    return (
        <div>
            <div className="user_registration">
                <div className='junior-heading-div container-fluid'>
                    <label className='junior-reg-title'>Junior Advocate Forgot Password</label>
                </div>
                <div className="user_registration_container">
                    <div className="user_registration_box">
                        <div className="user_registration_input_group">
                            <form onSubmit={handleSubmit}>
                                <label className='junior-text-loginhere'>Reset Password Here</label>
                                <div className="user_registration_input mt-5">
                                    <label>Email Id</label>
                                    <input
                                        type="text"
                                        className="form-control junior-advocate-input"
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
                                        className="form-control junior-advocate-input"
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
                                        className="form-control junior-advocate-input"
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
        </div>
    );
}

export default JuniorAdvocateForgotPassword;
