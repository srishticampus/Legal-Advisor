import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axiosMultipartInstance from "../Constants/FormDataUrl";
import { InternRegistrationSchema } from "../Constants/Schema";
import { toast } from "react-toastify";
import 'remixicon/fonts/remixicon.css';

function InternRegistration() {
    const navigate = useNavigate();

    const [isToastVisible, setToastVisible] = useState(false);

    const onSubmit = (values) => {
        console.log(values);

        const formData = new FormData();
        Object.keys(values).forEach(key => {
            formData.append(key, values[key]);
        });

        axiosMultipartInstance.post('/registerInterns', formData)
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
                gender: "",
                address: "",
                percentage: "",
                qualification: "",
                dob: "",
                institute: "",
                yearOfPassout: "",
                specialization: "",
                profilePic: null,
            },
            validationSchema: InternRegistrationSchema,
            onSubmit,
        });

    return (
        <div className="user_registration">
            <div className="user_registration_container">
                <div className="user_registration_input_group m-auto mt-5 mb-5">
                    <form onSubmit={(e) => { handleSubmit(e) }}>
                        <div className="row">
                            <div className="col-md-6">
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
                            </div>
                            <div className="col-md-6">
                                <div className="user_registration_input">
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
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-6">
                                <div className="user_registration_input">
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
                            </div>
                            <div className="col-md-6">
                                <div className="user_registration_input">
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
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-6">
                                <div className="user_registration_input">
                                    <label>Percentage</label>
                                    <input
                                        type="number"
                                        className="form-control border border-dark"
                                        placeholder="Enter your percentage"
                                        name="percentage"
                                        value={values.percentage}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.percentage && touched.percentage && (
                                        <span className="text-danger">{errors.percentage}</span>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="user_registration_input">
                                    <label>Qualification</label>
                                    <input
                                        type="text"
                                        className="form-control border border-dark"
                                        placeholder="Enter your qualification"
                                        name="qualification"
                                        value={values.qualification}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.qualification && touched.qualification && (
                                        <span className="text-danger">{errors.qualification}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-6">
                                <div className="user_registration_input">
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
                            </div>
                            <div className="col-md-6">
                                <div className="user_registration_input">
                                    <label>Institute</label>
                                    <input
                                        type="text"
                                        className="form-control border border-dark"
                                        placeholder="Enter your institute"
                                        name="institute"
                                        value={values.institute}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.institute && touched.institute && (
                                        <span className="text-danger">{errors.institute}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-6">
                                <div className="user_registration_input">
                                    <label>Year of Passout</label>
                                    <input
                                        type="number"
                                        className="form-control border border-dark"
                                        placeholder="Enter your year of passout"
                                        name="yearOfPassout"
                                        value={values.yearOfPassout}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.yearOfPassout && touched.yearOfPassout && (
                                        <span className="text-danger">{errors.yearOfPassout}</span>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="user_registration_input">
                                    <label>Specialization</label>
                                    <select
                                        className="form-control border border-dark"
                                        name="specialization"
                                        value={values.specialization}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    >
                                        <option value="" disabled>Select your Specialization Area</option>
                                        <option value="Criminal Law">Criminal Law</option>
                                        <option value="Civil Law">Civil Law</option>
                                        <option value="Family Law">Family Law</option>
                                        <option value="Corporate Law">Corporate Law</option>
                                        <option value="Intellectual Property Law">Intellectual Property Law</option>
                                        <option value="Environmental Law">Environmental Law</option>
                                        <option value="Tax Law">Tax Law</option>
                                        <option value="Real Estate Law">Real Estate Law</option>
                                        <option value="Constitutional Law">Constitutional Law</option>
                                        <option value="Human Rights Law">Human Rights Law</option>
                                        <option value="International Law">International Law</option>
                                        <option value="Banking and Finance Law">Banking and Finance Law</option>
                                        <option value="Immigration Law">Immigration Law</option>
                                        <option value="Health Care Law">Health Care Law</option>
                                    </select>
                                    {errors.specialization && touched.specialization && (
                                        <span className="text-danger">{errors.specialization}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-6">
                                <div className="user_registration_input">
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
                            </div>
                            <div className="col-md-6">
                                <div className="user_registration_input">
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
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-6">
                                <div className="user_registration_input">
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
                            </div>
                        </div>
                        <div className="user_registration_button text-center mt-3">
                            <button type="submit">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default InternRegistration;
