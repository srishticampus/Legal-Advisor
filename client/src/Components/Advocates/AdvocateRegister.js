import React, { useState } from "react";
import "./AdvocateRegister.css";
import axiosMultipartInstance from "../Constants/FormDataUrl";
import { useNavigate } from "react-router-dom";

function AdvocateRegister() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    dob: "",
    gender: "",
    nationality: "",
    address: "",
    contact: "",
    email: "",
    password: "",
    bcNo: "",
    dateOfEnrollment: "",
    bcState: "",
    specialization: "",
    experience: "",
    qualification: "",
    profilePic: null,
    idProof: null,
  });

  const [errors, setErrors] = useState({
    name: "",
    dob: "",
    gender: "",
    nationality: "",
    address: "",
    contact: "",
    email: "",
    password: "",
    bcNo: "",
    dateOfEnrollment: "",
    bcState: "",
    specialization: "",
    experience: "",
    qualification: "",
    profilePic: "",
    idProof: "",
  });

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (files) {
      setData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  function validateString(fieldName, value) {
    const nameRegex = /^[a-zA-Z\s]+$/;
    const noNumberRegex = /^[^\d]+$/;
    if (!value.trim()) {
      return `${fieldName} is required`;
    } else if (!nameRegex.test(value)) {
      return `${fieldName} should not contain any numerical value`;
    } else if (!noNumberRegex.test(value)) {
      return `${fieldName} should not contain any numerical value`;
    }
    return "";
  }

  function validateNumber(fieldName, value, length = null) {
    if (!value.trim()) {
      return `${fieldName} is required`;
    } else if (isNaN(value)) {
      return `${fieldName} must be a number`;
    } else if (length && value.length !== length) {
      return `${fieldName} must be ${length} digits long`;
    }
    return "";
  }

  function validateField(fieldName, value) {
    if (!value.trim()) {
      return `${fieldName} is required`;
    }
    return "";
  }

  function validateContact(fieldName, value) {
    const contactRegex = /^[0-9]+$/;
    if (!value.trim()) {
      return `${fieldName} is required`;
    } else if (!contactRegex.test(value) || value.length !== 10) {
      return "Please enter a valid Contact Number";
    }
    return "";
  }

  function validateEmail(fieldName, value) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value.trim()) {
      return `${fieldName} is required`;
    } else if (!emailPattern.test(value)) {
      return "Invalid email format";
    }
    return "";
  }

  function validatePassword(fieldName, value) {
    if (!value.trim()) {
      return `${fieldName} is required`;
    } else if (value.length < 6) {
      return `${fieldName} must be at least 6 characters long`;
    }
    return "";
  }

  function validateDate(fieldName, value) {
    if (!value.trim()) {
      return `${fieldName} is required`;
    }
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
    if (value > today) {
      return `${fieldName} cannot be a future date`;
    }
    return "";
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    let errors = {};
    let formIsValid = true;

    errors.name = validateString("Full Name", data.name);
    errors.dob = validateDate("Date of Birth", data.dob);
    errors.gender = validateField("Gender", data.gender);
    errors.nationality = validateString("Nationality", data.nationality);
    errors.address = validateField("Address", data.address);
    errors.contact = validateContact("Contact", data.contact);
    errors.email = validateEmail("Email", data.email);
    errors.password = validatePassword("Password", data.password);
    errors.bcNo = validateNumber("Bar Council Enrollment Number", data.bcNo);
    errors.dateOfEnrollment = validateDate(
      "Date of Enrollment",
      data.dateOfEnrollment
    );
    errors.bcState = validateString("State Bar Council", data.bcState);
    errors.specialization = validateField(
      "Specialization Areas",
      data.specialization
    );
    errors.experience = validateNumber("Years of Experience", data.experience);
    errors.qualification = validateString(
      "Educational Qualification",
      data.qualification
    );
    errors.profilePic = validateField(
      "Profile Photo",
      data.profilePic ? data.profilePic.name : ""
    );
    errors.idProof = validateField(
      "ID Proof Document",
      data.idProof ? data.idProof.name : ""
    );

    setErrors(errors);

    for (let key in errors) {
      if (errors[key]) {
        formIsValid = false;
        break;
      }
    }

    if (formIsValid) {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("dob", data.dob);
      formData.append("gender", data.gender);
      formData.append("nationality", data.nationality);
      formData.append("address", data.address);
      formData.append("contact", data.contact);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("bcNo", data.bcNo);
      formData.append("dateOfEnrollment", data.dateOfEnrollment);
      formData.append("bcState", data.bcState);
      formData.append("specialization", data.specialization);
      formData.append("experience", data.experience);
      formData.append("qualification", data.qualification);
      formData.append("files", data.profilePic);
      formData.append("files", data.idProof);

      try {
        const res = await axiosMultipartInstance.post(
          "/registerAdvocate",
          formData
        );
        if (res.data.status === 200) {
          alert("Advocate registered successfully");
          navigate("/AdvocateLogin");
        } else {
          alert(`Advocate Registration Failed: ${res.data.msg}`);
        }
      } catch (error) {
        console.error("There was an error!", error);
        alert("Error");
      }
      console.log(formData);
    }
  };

  return (
    <div>
      <div className="heading-div container-fluid">
        <label className="reg-title">Advocate Registration Form</label>
      </div>
      <div className="container-fluid bckcolor">
        <div className="advocateRegistrationmaindiv">
          <div className="container">
            <form onSubmit={handleSubmit}>
              <div className="row mt-3">
                <div className="col-sm-6 col-lg-6">
                  <label className="form-label advocateRegistrationlabel">
                    Full Name :
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg form-input-style"
                    placeholder="Enter your Full Name"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <div className="text-danger">{errors.name}</div>
                  )}
                </div>
                <div className="col-sm-6 col-lg-6">
                  <label className="form-label advocateRegistrationlabel">
                    Bar Council Enrollment Number :
                  </label>
                  <input
                    type="number"
                    className="form-control form-control-lg form-input-style"
                    placeholder="Enter your Bar Council enrollment number"
                    name="bcNo"
                    value={data.bcNo}
                    onChange={handleChange}
                  />
                  {errors.bcNo && (
                    <div className="text-danger">{errors.bcNo}</div>
                  )}
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-sm-6 col-lg-6">
                  <label className="form-label advocateRegistrationlabel">
                    Date of Birth :
                  </label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={data.dob}
                    onChange={handleChange}
                    className={errors.dob ? "error form-control form-control-lg form-input-style" : "form-control form-control-lg form-input-style"}
                  />
                  {errors.dob && (
                    <div className="text-danger">{errors.dob}</div>
                  )}
                </div>
                <div className="col-sm-6 col-lg-6">
                  <label className="form-label advocateRegistrationlabel">
                    Date of Enrollment :
                  </label>
                  <input
                    type="date"
                    id="dateOfEnrollment"
                    name="dateOfEnrollment"
                    value={data.dateOfEnrollment}
                    onChange={handleChange}
                    className={errors.dateOfEnrollment ? "error form-control form-control-lg form-input-style" : " form-control form-control-lg form-input-style"}
                  />
                  {errors.dateOfEnrollment && (
                    <div className="text-danger">{errors.dateOfEnrollment}</div>
                  )}
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-sm-6 col-lg-6">
                  <label className="form-label advocateRegistrationlabel">
                    Gender :
                  </label>
                  <select
                    className="form-select form-control-lg form-input-style"
                    name="gender"
                    value={data.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && (
                    <div className="text-danger">{errors.gender}</div>
                  )}
                </div>
                <div className="col-sm-6 col-lg-6">
                  <label className="form-label advocateRegistrationlabel">
                    State Bar Council :
                  </label>
                  <select
                    className="form-select form-control-lg form-input-style"
                    name="bcState"
                    value={data.bcState}
                    onChange={handleChange}
                  >
                    <option value="">Select State</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                  </select>
                  {errors.bcState && (
                    <div className="text-danger">{errors.bcState}</div>
                  )}
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-sm-6 col-lg-6">
                  <label className="form-label advocateRegistrationlabel">
                    Nationality :
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg form-input-style"
                    placeholder="Enter your Nationality"
                    name="nationality"
                    value={data.nationality}
                    onChange={handleChange}
                  />
                  {errors.nationality && (
                    <div className="text-danger">{errors.nationality}</div>
                  )}
                </div>
                <div className="col-sm-6 col-lg-6">
                  <label className="form-label advocateRegistrationlabel">
                    Contact Number :
                  </label>
                  <input
                    type="tel"
                    className="form-control form-control-lg form-input-style"
                    placeholder="Enter your Contact Number"
                    name="contact"
                    value={data.contact}
                    onChange={handleChange}
                  />
                  {errors.contact && (
                    <div className="text-danger">{errors.contact}</div>
                  )}
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-sm-6 col-lg-6">
                  <label className="form-label advocateRegistrationlabel">
                    Educational Qualification :
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg form-input-style"
                    placeholder="Enter your Educational Qualification"
                    name="qualification"
                    value={data.qualification}
                    onChange={handleChange}
                  />
                  {errors.qualification && (
                    <div className="text-danger">{errors.qualification}</div>
                  )}
                </div>
                <div className="col-sm-6 col-lg-6">
                  <label className="form-label advocateRegistrationlabel">
                    Specialization Areas :
                  </label>
                  <select
                    className="form-select form-control-lg specialization-form-select"
                    name="specialization"
                    value={data.specialization}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select your Specialization Area
                    </option>
                    <option value="Criminal Law">Criminal Law</option>
                    <option value="Civil Law">Civil Law</option>
                    <option value="Family Law">Family Law</option>
                    <option value="Corporate Law">Corporate Law</option>
                    <option value="Intellectual Property Law">
                      Intellectual Property Law
                    </option>
                    <option value="Environmental Law">Environmental Law</option>
                    <option value="Tax Law">Tax Law</option>
                    <option value="Real Estate Law">Real Estate Law</option>
                    <option value="Constitutional Law">
                      Constitutional Law
                    </option>
                    <option value="Human Rights Law">Human Rights Law</option>
                    <option value="International Law">International Law</option>
                    <option value="TBanking and Finance Law">
                      Banking and Finance Law
                    </option>
                    <option value="Immigration Law">Immigration Law</option>
                    <option value="Health Care Law">Health Care Law</option>
                  </select>
                  {errors.specialization && (
                    <div className="text-danger">{errors.specialization}</div>
                  )}
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-sm-6 col-lg-6">
                  <label className="form-label advocateRegistrationlabel">
                    Email ID :
                  </label>
                  <input
                    type="email"
                    className="form-control form-control-lg form-input-style"
                    placeholder="Enter your Email ID"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <div className="text-danger">{errors.email}</div>
                  )}
                </div>
                <div className="col-sm-6 col-lg-6">
                  <label className="form-label advocateRegistrationlabel">
                    Password :
                  </label>
                  <input
                    type="password"
                    className="form-control form-control-lg form-input-style"
                    placeholder="Enter your Password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <div className="text-danger">{errors.password}</div>
                  )}
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-sm-6 col-lg-6">
                  <label className="form-label advocateRegistrationlabel">
                    Profile Photo :
                  </label>
                  <input
                    type="file"
                    className="form-control form-control-lg form-input-style"
                    name="profilePic"
                    onChange={handleChange}
                  />
                  {errors.profilePic && (
                    <div className="text-danger">{errors.profilePic}</div>
                  )}
                </div>
                <div className="col-sm-6 col-lg-6">
                  <label className="form-label advocateRegistrationlabel">
                    Years of Experience :
                  </label>
                  <input
                    type="number"
                    className="form-control form-control-lg form-input-style"
                    placeholder="Enter your Experience"
                    name="experience"
                    value={data.experience}
                    onChange={handleChange}
                  />
                  {errors.experience && (
                    <div className="text-danger">{errors.experience}</div>
                  )}
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-sm-6 col-lg-6">
                  <label className="form-label advocateRegistrationlabel">
                    ID Proof Document :
                  </label>
                  <input
                    type="file"
                    className="form-control form-control-lg form-input-style"
                    name="idProof"
                    onChange={handleChange}
                  />
                  {errors.idProof && (
                    <div className="text-danger">{errors.idProof}</div>
                  )}
                </div>
                <div className="col-sm-6 col-lg-6">
                  <label className="form-label advocateRegistrationlabel">
                    Address :
                  </label>
                  <textarea
                    className="form-control form-control-lg form-input-style"
                    placeholder="Enter your Address"
                    name="address"
                    value={data.address}
                    onChange={handleChange}
                  />
                  {errors.address && (
                    <div className="text-danger">{errors.address}</div>
                  )}
                </div>
              </div>
              <div className="row mt-3 mb-2">
                <div className="col-12 junior-submit-btn-div">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg junior-button-submit"
                  >
                    Register
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdvocateRegister;
