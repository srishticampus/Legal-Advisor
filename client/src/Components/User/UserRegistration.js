import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import "./UserRegistration.css";
import img from '../../Assets/clientReg.png';
import axiosInstance from "../Constants/BaseUrl";
import { UserRegistrationSchema } from "../Constants/Schema";
import { toast } from "react-toastify";
import 'remixicon/fonts/remixicon.css';
import axiosMultipartInstance from "../Constants/FormDataUrl";

function UserRegistration() {
    const navigate = useNavigate();

    const [isToastVisible, setToastVisible] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = (values) => {
        console.log(values);

        const formData = new FormData();
        Object.keys(values).forEach(key => {
            formData.append(key, values[key]);
        });

        axiosMultipartInstance.post('/registerUser', formData)
            .then((res) => {
                console.log(res);
                if (res.data.status === 200) {
                    if (!isToastVisible) {
                        setToastVisible(true);
                        toast.success("Registration Successful", {
                            onClose: () => setToastVisible(false),
                        });
                    }
                    navigate('/AdvocateLogin');
                } else if (res.data.status === 409) {
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
        console.log(formData);
    };

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
        useFormik({
            initialValues: {
                name: "",
                contact: "",
                email: "",
                password: "",
                address: "",
                gender: "",
                dob: "",
                profilePic: null,
                nationality: ""
            },
            validationSchema: UserRegistrationSchema,
            onSubmit,
        });

    return (
        <div className="user_registration">
            <div className="user_registration_container">
                <div className="user_registration_box1">
                    <div className="user_registration_input_group">
                        <form onSubmit={(e)=>{handleSubmit(e)}}>
                            <div className="user_registration_input">
                                <label>Name</label>
                                <input
                                    type="text"
                                    className="form-control border border-dark"
                                    placeholder="Enter your name"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.name && touched.name && (
                                    <span className="text-danger">{errors.name}</span>
                                )}
                            </div>
                            <div className="user_registration_input mt-3">
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
                                {errors.email && touched.email && (
                                    <span className="text-danger">{errors.email}</span>
                                )}
                            </div>
                            <div className="user_registration_input mt-3">
                                <label>Contact</label>
                                <input
                                    type="number"
                                    className="form-control border border-dark"
                                    placeholder="Enter your contact"
                                    name="contact"
                                    value={values.contact}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.contact && touched.contact && (
                                    <span className="text-danger">{errors.contact}</span>
                                )}
                            </div>
                            <div className="user_registration_input mt-3">
                                <label>Address</label>
                                <input
                                    type="text"
                                    className="form-control border border-dark"
                                    placeholder="Enter your address"
                                    name="address"
                                    value={values.address}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.address && touched.address && (
                                    <span className="text-danger">{errors.address}</span>
                                )}
                            </div>
                            <div className="user_registration_input mt-3">
                                <label>DOB</label>
                                <input
                                    type="date"
                                    className="form-control border border-dark"
                                    name="dob"
                                    value={values.dob}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.dob && touched.dob && (
                                    <span className="text-danger">{errors.dob}</span>
                                )}
                            </div>
                            <div className="user_registration_input mt-3">
                                <label>Gender</label>
                                <select
                                    className="form-control border border-dark"
                                    name="gender"
                                    value={values.gender}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <option value="" label="Select gender" />
                                    <option value="male" label="Male" />
                                    <option value="female" label="Female" />
                                    <option value="other" label="Other" />
                                </select>
                                {errors.gender && touched.gender && (
                                    <span className="text-danger">{errors.gender}</span>
                                )}
                            </div>
                            <div className="user_registration_input mt-3">
                                <label>Profile Picture</label>
                                <input
                                    type="file"
                                    className="form-control border border-dark"
                                    name="profilePic"
                                    onChange={(event) => {
                                        setFieldValue("profilePic", event.currentTarget.files[0]);
                                    }}
                                />
                                {errors.profilePic && touched.profilePic && (
                                    <span className="text-danger">{errors.profilePic}</span>
                                )}
                            </div>
                            <div className="user_registration_input mt-3">
                                <label>Nationality</label>
                                <input
                                    type="text"
                                    className="form-control border border-dark"
                                    placeholder="Enter your nationality"
                                    name="nationality"
                                    value={values.nationality}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.nationality && touched.nationality && (
                                    <span className="text-danger">{errors.nationality}</span>
                                )}
                            </div>
                            <div className="user_registration_input mt-3">
                                <label>Password</label>
                                <div className="password-field">
                                    <input
                                        type="password"
                                        className="form-control border border-dark"
                                        placeholder="Password"
                                        name="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                   
                                </div>
                                {errors.password && touched.password && (
                                    <span className="text-danger">{errors.password}</span>
                                )}
                            </div>
                            <div className="user_registration_button text-center mt-3">
                                <button type="submit">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="user_registration_box2">
                    <img src={img} className="img-fluid" alt="user_reg_img" />
                </div>
            </div>
        </div>
    );
}

export default UserRegistration;
