import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosMultipartInstance from '../Constants/FormDataUrl';
import '../JuniorAdvocates/JuniorAdvocateRegistration.css';

function JuniorAdvocateRegistration() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: '',
    dob: '',
    gender: '',
    nationality: '',
    address: '',
    contact: '',
    email: '',
    password: '',
    bcNo: '',
    dateOfEnrollment: '',
    bcState: '',
    specialization: '',
    institute: '',
    percentage: '',
    qualification: '',
    profilePic: null,
    idProof: null,
  });

  const [errors, setErrors] = useState({
    name: '',
    dob: '',
    gender: '',
    nationality: '',
    address: '',
    contact: '',
    email: '',
    password: '',
    bcNo: '',
    dateOfEnrollment: '',
    bcState: '',
    specialization: '',
    institute: '',
    percentage: '',
    qualification: '',
    profilePic: '',
    idProof: '',
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
      [name]: '',
    }));
  };

  function validateString(fieldName, value) {
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!value.trim()) {
      return `${fieldName} is required`;
    } else if (!nameRegex.test(value)) {
      return `Please enter a valid ${fieldName}`;
    }
    return '';
  }

  function validateNumber(fieldName, value, length = null) {
    if (!value.trim()) {
      return `${fieldName} is required`;
    } else if (isNaN(value)) {
      return `${fieldName} must be a number`;
    } else if (length && value.length !== length) {
      return `${fieldName} must be ${length} digits long`;
    }
    return '';
  }

  function validateField(fieldName, value) {
    if (!value.trim()) {
      return `${fieldName} is required`;
    }
    return '';
  }

  function validateContact(fieldName, value) {
    const contactRegex = /^[0-9]+$/;
    if (!value.trim()) {
      return `${fieldName} is required`;
    } else if (!contactRegex.test(value) || value.length !== 10) {
      return 'Please enter a valid Contact Number';
    }
    return '';
  }

  function validateEmail(fieldName, value) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value.trim()) {
      return `${fieldName} is required`;
    } else if (!emailPattern.test(value)) {
      return 'Invalid email format';
    }
    return '';
  }

  function validatePassword(fieldName, value) {
    if (!value.trim()) {
      return `${fieldName} is required`;
    } else if (value.length < 6) {
      return `${fieldName} must be at least 6 characters long`;
    }
    return '';
  }

  function validateDate(fieldName, value) {
    const currentDate = new Date();
    const selectedDate = new Date(value);
    if (!value.trim()) {
      return `${fieldName} is required`;
    } else if (selectedDate > currentDate) {
      return `${fieldName} cannot be a future date`;
    }
    return '';
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    let errors = {};
    let formIsValid = true;

    errors.name = validateString('Full Name', data.name);
    errors.dob = validateDate('Date of Birth', data.dob);
    errors.gender = validateField('Gender', data.gender);
    errors.nationality = validateString('Nationality', data.nationality);
    errors.address = validateField('Address', data.address);
    errors.contact = validateContact('Contact', data.contact);
    errors.email = validateEmail('Email', data.email);
    errors.password = validatePassword('Password', data.password);
    errors.bcNo = validateNumber('Bar Council Enrollment Number', data.bcNo);
    errors.dateOfEnrollment = validateDate('Date of Enrollment', data.dateOfEnrollment);
    errors.bcState = validateString('State Bar Council', data.bcState);
    errors.specialization = validateField('Specialization Areas', data.specialization);
    errors.institute = validateString('Institute Name', data.institute);
    errors.percentage = validateNumber('Percentage', data.percentage);
    errors.qualification = validateString('Educational Qualification', data.qualification);
    errors.profilePic = validateField('Profile Photo', data.profilePic ? data.profilePic.name : '');
    errors.idProof = validateField('ID Proof Document', data.idProof ? data.idProof.name : '');

    setErrors(errors);

    for (let key in errors) {
      if (errors[key]) {
        formIsValid = false;
        break;
      }
    }

    if (formIsValid) {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('dob', data.dob);
      formData.append('gender', data.gender);
      formData.append('nationality', data.nationality);
      formData.append('address', data.address);
      formData.append('contact', data.contact);
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('bcNo', data.bcNo);
      formData.append('dateOfEnrollment', data.dateOfEnrollment);
      formData.append('bcState', data.bcState);
      formData.append('specialization', data.specialization);
      formData.append('institute', data.institute);
      formData.append('percentage', data.percentage);
      formData.append('qualification', data.qualification);
      formData.append('files', data.profilePic);
      formData.append('files', data.idProof);

      try {
        const res = await axiosMultipartInstance.post('/registerJuniorAdvocate', formData);
        if (res.data.status === 200) {
          alert('Junior Advocate registered successfully');
          navigate('/AdvocateLogin');
        } else {
          alert(`Junior Advocate Registration Failed: ${res.data.msg}`);
        }
      } catch (error) {
        console.error('There was an error!', error);
        alert('Error');
      }
    }
  };

  return (
    <div>
      <div className='junior-heading-div container-fluid'>
        <label className='junior-reg-title'>Junior Advocate Registration Form</label>
      </div>
      <div className='container-fluid bckcolor'>
        <div className='advocateRegistrationmaindiv'>
          <div className='container'>
            <form onSubmit={handleSubmit}>
              <div className="row mt-3">
                <div className="col-sm-6 col-lg-6">
                  <label className="form-label">Full Name :</label>
                  <input
                    type="text"
                    className={errors.name ? "error form-control form-control-lg junior-form-input-style" : "form-control form-control-lg junior-form-input-style"}
                    placeholder="Enter your Full Name"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                  />
                  {errors.name && <div className="text-danger">{errors.name}</div>}
                </div>
                <div className="col-sm-6 col-lg-6">
                  <label className="form-label">Bar Council Enrollment Number :</label>
                  <input
                    type="text"
                    className={errors.bcNo ? "error form-control form-control-lg junior-form-input-style" : "form-control form-control-lg junior-form-input-style"}
                    placeholder="Enter your Bar Council enrollment number"
                    name="bcNo"
                    value={data.bcNo}
                    onChange={handleChange}
                  />
                  {errors.bcNo && <div className="text-danger">{errors.bcNo}</div>}
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-sm-6 col-lg-6">
                  <label className="form-label">Date of Birth :</label>
                  <input
                    type="date"
                    className={errors.dob ? "error form-control form-control-lg junior-form-input-style" : "form-control form-control-lg junior-form-input-style"}
                    name="dob"
                    value={data.dob}
                    onChange={handleChange}
                  />
                  {errors.dob && <div className="text-danger">{errors.dob}</div>}
                </div>
                <div className="col-sm-6 col-lg-6">
                  <label className="form-label">Date of Enrollment :</label>
                  <input
                    type="date"
                    className={errors.dateOfEnrollment ? "error form-control form-control-lg junior-form-input-style" : "form-control form-control-lg junior-form-input-style"}
                    name="dateOfEnrollment"
                    value={data.dateOfEnrollment}
                    onChange={handleChange}
                  />
                  {errors.dateOfEnrollment && <div className="text-danger">{errors.dateOfEnrollment}</div>}
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-sm-6 col-lg-6">
                  <label className="form-label">Gender :</label>
                  <select
                    className={errors.gender ? "error form-select form-control-lg junior-specialization-form-select" : "form-select form-control-lg junior-specialization-form-select"}
                    name="gender"
                    value={data.gender}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Select your Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && <div className="text-danger">{errors.gender}</div>}
                </div>
                <div className="col-sm-6 col-lg-6">
                  <label className="form-label">State Bar Council :</label>
                  <input
                    type="text"
                    className={errors.bcState ? "error form-control form-control-lg junior-form-input-style" : "form-control form-control-lg junior-form-input-style"}
                    placeholder="Enter your State Bar Council"
                    name="bcState"
                    value={data.bcState}
                    onChange={handleChange}
                  />
                  {errors.bcState && <div className="text-danger">{errors.bcState}</div>}
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-sm-6 col-lg-6">
                  <label className="form-label">Nationality :</label>
                  <input
                    type="text"
                    className={errors.nationality ? "error form-control form-control-lg junior-form-input-style" : "form-control form-control-lg junior-form-input-style"}
                    placeholder="Enter your Nationality"
                    name="nationality"
                    value={data.nationality}
                    onChange={handleChange}
                  />
                  {errors.nationality && <div className="text-danger">{errors.nationality}</div>}
                </div>
                <div className="col-sm-6 col-lg-6">
                  <label className="form-label">Specialization Areas :</label>
                  <div className="select-container">
                    <select
                      className={errors.specialization ? "error form-select form-control-lg specialization-form-select" : "form-select form-control-lg specialization-form-select"}
                      name="specialization"
                      value={data.specialization}
                      onChange={handleChange}
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
                    {errors.specialization && <div className="text-danger">{errors.specialization}</div>}
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-sm-6 col-lg-6">
                  <label className="form-label">Address :</label>
                  <input
                    type="text"
                    className={errors.address ? "error form-control form-control-lg junior-form-input-style" : "form-control form-control-lg junior-form-input-style"}
                    placeholder="Enter your address"
                    name="address"
                    value={data.address}
                    onChange={handleChange}
                  />
                  {errors.address && <div className="text-danger">{errors.address}</div>}
                </div>
                <div className="col-sm-6 col-lg-6">
                  <label className="form-label">Educational Qualification :</label>
                  <input
                    type="text"
                    className={errors.qualification ? "error form-control form-control-lg junior-form-input-style" : "form-control form-control-lg junior-form-input-style"}
                    placeholder="Enter your educational qualification"
                    name="qualification"
                    value={data.qualification}
                    onChange={handleChange}
                  />
                  {errors.qualification && <div className="text-danger">{errors.qualification}</div>}
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-sm-6 col-lg-6">
                  <label className="form-label">Contact Number :</label>
                  <input
                    type="text"
                    className={errors.contact ? "error form-control form-control-lg junior-form-input-style" : "form-control form-control-lg junior-form-input-style"}
                    placeholder="Enter your contact number"
                    name="contact"
                    value={data.contact}
                    onChange={handleChange}
                  />
                  {errors.contact && <div className="text-danger">{errors.contact}</div>}
                </div>
                <div className="col-sm-6 col-lg-6">
                  <label className="form-label">Institute Name :</label>
                  <input
                    type="text"
                    className={errors.institute ? "error form-control form-control-lg junior-form-input-style" : "form-control form-control-lg junior-form-input-style"}
                    placeholder="Enter your Institute Name"
                    name="institute"
                    value={data.institute}
                    onChange={handleChange}
                  />
                  {errors.institute && <div className="text-danger">{errors.institute}</div>}
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-sm-6 col-lg-6">
                  <label className="form-label">Email :</label>
                  <input
                    type="email"
                    className={errors.email ? "error form-control form-control-lg junior-form-input-style" : "form-control form-control-lg junior-form-input-style"}
                    placeholder="Enter your email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                  />
                  {errors.email && <div className="text-danger">{errors.email}</div>}
                </div>
                <div className="col-sm-6 col-lg-6">
                  <label className="form-label">Percentage of Marks :</label>
                  <input
                    type="number"
                    className={errors.percentage ? "error form-control form-control-lg junior-form-input-style" : "form-control form-control-lg junior-form-input-style"}
                    placeholder="Enter your Percentage of Marks"
                    name="percentage"
                    value={data.percentage}
                    onChange={handleChange}
                  />
                  {errors.percentage && <div className="text-danger">{errors.percentage}</div>}
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-sm-6 col-lg-6">
                  <label className="form-label">Password :</label>
                  <input
                    type="password"
                    className={errors.password ? "error form-control form-control-lg junior-form-input-style" : "form-control form-control-lg junior-form-input-style"}
                    placeholder="Enter your password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                  />
                  {errors.password && <div className="text-danger">{errors.password}</div>}
                </div>
                <div className="col-sm-6 col-lg-6">
                  <label className="form-label">ID Proof Document :</label>
                  <input
                    type="file"
                    className={errors.idProof ? "error form-control form-control-lg junior-form-input-style" : "form-control form-control-lg junior-form-input-style"}
                    name="idProof"
                    onChange={handleChange}
                  />
                  {errors.idProof && <div className="text-danger">{errors.idProof}</div>}
                </div>
                <div className="col-sm-6 col-lg-6">
                  <label className="form-label">Profile Photo :</label>
                  <input
                    type="file"
                    className={errors.profilePic ? "error form-control form-control-lg junior-form-input-style" : "form-control form-control-lg junior-form-input-style"}
                    name="profilePic"
                    onChange={handleChange}
                  />
                  {errors.profilePic && <div className="text-danger">{errors.profilePic}</div>}
                </div>
              </div><br />
              <div className="row mt-3">
                <div className="col-12 junior-submit-btn-div">
                  <button type="submit" className="btn btn-primary btn-lg junior-button-submit">Register</button>
                </div>
              </div><br /><br />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JuniorAdvocateRegistration;
