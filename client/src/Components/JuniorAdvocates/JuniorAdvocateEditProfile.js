import React, { useEffect, useState } from "react";
import "./JuniorAdvocateEditProfile.css";
import img from "../../Assets/logo2.png";
import tick from "../../Assets/editPofileCheckmark.png";
import axiosMultipartInstance from "../Constants/FormDataUrl";
import { imageUrl } from "../Constants/Image_Url";
import { useNavigate } from "react-router-dom";
import upimg from "../../Assets/updateImage.jpg";

function JuniorAdvocateEditProfile() {
  const id = localStorage.getItem("junioradvocateId");

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("junioradvocateId") == null) {
      navigate("/");
    }
  }, [navigate]);

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
    percentage: "",
    institute: "",
    qualification: "",
    profilePic: {},
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
    percentage: "",
    institute: "",
    qualification: "",
    profilePic: "",
    idProof: "",
  });

  useEffect(() => {
    const ReadData = async () => {
      try {
        const res = await axiosMultipartInstance.post(
          `/viewJuniorAdvocateById/${id}`
        );
        if (res.data.status === 200) {
          console.log(res.data);
          setData(res.data.data);
        } else {
          alert(`Failed to view junior advocate data: ${res.data.msg}`);
        }
      } catch (error) {
        console.error(
          "There was an error read the junior advocate data!",
          error
        );
        alert("Error view junior advocate data");
      }
    };
    if (id !== null) {
      ReadData();
    }
  }, []);

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

  function validateField(fieldName, value) {
    if (!value.toString().trim()) {
      return `${fieldName} is required`;
    }
    return "";
  }

  function validateContact(fieldName, value) {
    if (!value.toString().trim()) {
      return `${fieldName} is required`;
    } else if (value.length !== 10) {
      return "Please enter a valid Contact Number";
    }
    return "";
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    let errors = {};
    let formIsValid = true;

    errors.name = validateField("Full Name", data.name);
    errors.dob = validateField("Date of Birth", data.dob);
    errors.gender = validateField("Gender", data.gender);
    errors.nationality = validateField("Nationality", data.nationality);
    errors.address = validateField("Address", data.address);
    // errors.contact = validateContact('Contact', data.contact);
    errors.email = validateField("Email", data.email);
    errors.password = validateField("Password", data.password);
    errors.bcNo = validateField("Bar Council Enrollment Number", data.bcNo);
    errors.dateOfEnrollment = validateField(
      "Date of Enrollment",
      data.dateOfEnrollment
    );
    errors.bcState = validateField("State Bar Council", data.bcState);
    errors.specialization = validateField(
      "Specialization Areas",
      data.specialization
    );
    errors.percentage = validateField("Years of Experience", data.percentage);
    errors.institute = validateField("Institute Name", data.qualification);
    // errors.profilePic = validateField('Profile Photo', data.profilePic ? data.profilePic.name : '');
    // errors.idProof = validateField('ID Proof Document', data.idProof ? data.idProof.name : '');

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
      formData.append("percentage", data.percentage);
      formData.append("institute", data.institute);
      formData.append("qualification", data.qualification);
      formData.append("profilePic", data.profilePic);

      try {
        const res = await axiosMultipartInstance.post(
          `/editJuniorAdvocateById/${id}`,
          formData
        );
        if (res.data.status === 200) {
          alert("Junior Advocate profile updated successfully");
          window.location.reload();
        } else {
          alert(`Junior Advocate Profile Update Failed: ${res.data.msg}`);
        }
      } catch (error) {
        console.error("There was an error!", error);
        alert("Error updating junior advocate profile");
      }
    }
  };

  return (
    <div>
      <div className="junior-heading-div container-fluid">
        <label className="junior-reg-title">Junior Advocate Profile View</label>
      </div>
      <div className="ju-advocate_edit_profile">
        <div className="container">
          <div className="row ">
            <div className=" col-5 mt-5">
              <div className="advocate_edit_profile_img d-flex justify-content-center">
                {data.profilePic.filename ? (
                  <img
                    src={`${imageUrl}/${data.profilePic.filename}`}
                    className="img-fluid"
                    alt="Update Profile"
                  />
                ) : (
                  <div>
                    <img src={upimg} />
                  <p className="mx-4" >Complete Updations</p>
                  </div>
                  
                )}

                {/* <img src={img}></img> */}
              </div>
              <p className="ju-advocate_edit_profile_title mt-5">
                Stay Ahead{" "}
                <span className="text-gold">: Keep Your Profile Updated!</span>
              </p>
              <p className="ju-advocate_edit_profile_sub_title mt-4">
                Regularly updating your information ensures you;
              </p>
              <div className="ju-advocate_edit_profile_sub_title2 d-flex align-items-center">
                <img src={tick} className="img-fluid" />
                <p>Highlight Your new legal skills and certifications.</p>
              </div>
              <div className="ju-advocate_edit_profile_sub_title2 d-flex align-items-center">
                <img src={tick} className="img-fluid" />
                <p>Present your most recent experiences and specialization.</p>
              </div>
              <div className="ju-advocate_edit_profile_sub_title2 d-flex align-items-center">
                <img src={tick} className="img-fluid" />
                <p>
                  Reflect your ongoing professional devolepment and education.
                </p>
              </div>
              <div className="ju-advocate_edit_profile_sub_title2 d-flex align-items-center">
                <img src={tick} className="img-fluid" />
                <p>
                  Provide potential clients with up-to-date contact information.
                </p>
              </div>
              <div className="ju-advocate_edit_profile_sub_title2 d-flex align-items-center">
                <img src={tick} className="img-fluid" />
                <p>Ensure accuracy in your areas of expertse and practice.</p>
              </div>
            </div>
            <div className="col-7">
              <div className="container-fluid bckcolor">
                <div className="">
                  <div className="container">
                    <form onSubmit={handleSubmit}>
                      <div className="row mt-3">
                        <div className="col-sm-6 col-lg-6">
                          <label className="form-label advocateRegistrationlabel">
                            Full Name :
                          </label>
                          <input
                            type="text"
                            className="form-control textbox-style"
                            placeholder="Enter your Full Name"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                          />
                          {errors.name && (
                            <div className="text-danger">{errors.name}</div>
                          )}
                        </div>
                        <div className="col-6">
                          <label className="form-label advocateRegistrationlabel">
                            Bar Council Enrollment Number :
                          </label>
                          <input
                            type="text"
                            className="form-control textbox-style"
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
                      <div className="row mt-2">
                        <div className="col-6">
                          <label className="form-label advocateRegistrationlabel">
                            Date of Birth :
                          </label>
                          {/* {console.log((data.dob).slice(0,10))} */}
                          <input
                            type="date"
                            className="form-control textbox-style"
                            name="dob"
                            value={data.dob.slice(0, 10)}
                            onChange={handleChange}
                          />
                          {errors.dob && (
                            <div className="text-danger">{errors.dob}</div>
                          )}
                        </div>
                        <div className="col-6">
                          <label className="form-label advocateRegistrationlabel">
                            Date of Enrollment :
                          </label>
                          <input
                            type="date"
                            className="form-control textbox-style"
                            name="dateOfEnrollment"
                            value={data.dateOfEnrollment}
                            onChange={handleChange}
                          />
                          {errors.dateOfEnrollment && (
                            <div className="text-danger">
                              {errors.dateOfEnrollment}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-6">
                          <label className="form-label advocateRegistrationlabel">
                            Gender :
                          </label>
                          <select
                            className="form-select textbox-style"
                            name="gender"
                            value={data.gender}
                            onChange={handleChange}
                          >
                            <option value="" disabled>
                              Select your Gender
                            </option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                          {errors.gender && (
                            <div className="text-danger">{errors.gender}</div>
                          )}
                        </div>

                        <div className="col-6">
                          <label className="form-label advocateRegistrationlabel">
                            State Bar Council :
                          </label>
                          <input
                            type="text"
                            className="form-control textbox-style"
                            placeholder="Enter your State Bar Council"
                            name="bcState"
                            value={data.bcState}
                            onChange={handleChange}
                          />
                          {errors.bcState && (
                            <div className="text-danger">{errors.bcState}</div>
                          )}
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-6">
                          <label className="form-label advocateRegistrationlabel">
                            Nationality :
                          </label>
                          <input
                            type="text"
                            className="form-control textbox-style"
                            placeholder="Enter your Nationality"
                            name="nationality"
                            value={data.nationality}
                            onChange={handleChange}
                          />
                          {errors.nationality && (
                            <div className="text-danger">
                              {errors.nationality}
                            </div>
                          )}
                        </div>
                        <div className="col-6">
                          <label className="form-label advocateRegistrationlabel">
                            Specialization Areas :
                          </label>
                          <div className="select-container">
                            <select
                              className="form-select textbox-style"
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
                              <option value="Corporate Law">
                                Corporate Law
                              </option>
                              <option value="Intellectual Property Law">
                                Intellectual Property Law
                              </option>
                              <option value="Environmental Law">
                                Environmental Law
                              </option>
                              <option value="Tax Law">Tax Law</option>
                              <option value="Real Estate Law">
                                Real Estate Law
                              </option>
                              <option value="Constitutional Law">
                                Constitutional Law
                              </option>
                              <option value="Human Rights Law">
                                Human Rights Law
                              </option>
                              <option value="International Law">
                                International Law
                              </option>
                              <option value="TBanking and Finance Law">
                                Banking and Finance Law
                              </option>
                              <option value="Immigration Law">
                                Immigration Law
                              </option>
                              <option value="Health Care Law">
                                Health Care Law
                              </option>
                            </select>
                            {errors.specialization && (
                              <div className="text-danger">
                                {errors.specialization}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-6">
                          <label className="form-label advocateRegistrationlabel">
                            Address :
                          </label>
                          <input
                            type="text"
                            className="form-control textbox-style"
                            placeholder="Enter your address"
                            name="address"
                            value={data.address}
                            onChange={handleChange}
                          />
                          {errors.address && (
                            <div className="text-danger">{errors.address}</div>
                          )}
                        </div>
                        <div className="col-6">
                          <label className="form-label advocateRegistrationlabel">
                            Educational Qualification :
                          </label>
                          <input
                            type="text"
                            className="form-control textbox-style"
                            placeholder="Enter your Educational Qualification"
                            name="qualification"
                            value={data.qualification}
                            onChange={handleChange}
                          />
                          {errors.qualification && (
                            <div className="text-danger">
                              {errors.qualification}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-6">
                          <label className="form-label advocateRegistrationlabel">
                            Contact Number :
                          </label>
                          <input
                            type="text"
                            className="form-control textbox-style"
                            placeholder="Enter your contact number"
                            name="contact"
                            value={data.contact}
                            onChange={handleChange}
                          />
                          {errors.contact && (
                            <div className="text-danger">{errors.contact}</div>
                          )}
                        </div>
                        <div className="col-6">
                          <label className="form-label advocateRegistrationlabel">
                            Institute Name :
                          </label>
                          <input
                            type="text"
                            className="form-control textbox-style"
                            placeholder="Enter your Institute Name"
                            name="institute"
                            value={data.institute}
                            onChange={handleChange}
                          />
                          {errors.institute && (
                            <div className="text-danger">
                              {errors.institute}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-6">
                          <label className="form-label advocateRegistrationlabel">
                            Email :
                          </label>
                          <input
                            type="email"
                            className="form-control textbox-style"
                            placeholder="Enter your email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                          />
                          {errors.email && (
                            <div className="text-danger">{errors.email}</div>
                          )}
                        </div>
                        <div className="col-6">
                          <label className="form-label advocateRegistrationlabel">
                            Percentage of Marks :
                          </label>
                          <input
                            type="text"
                            className="form-control textbox-style"
                            placeholder="Enter your Percentage of Marks"
                            name="percentage"
                            value={data.percentage}
                            onChange={handleChange}
                          />
                          {errors.percentage && (
                            <div className="text-danger">
                              {errors.percentage}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-6">
                          <label className="form-label advocateRegistrationlabel">
                            Profile Photo :
                          </label>
                          {/* {console.log(data.profilePic)} */}
                          <input
                            type="file"
                            className="form-control textbox-style"
                            name="profilePic"
                            onChange={handleChange}
                          />
                          {errors.profilePic && (
                            <div className="text-danger">
                              {errors.profilePic}
                            </div>
                          )}
                        </div>
                        {/* <div className="col-6">
                            {console.log(.filename)}
                            <label className="form-label advocateRegistrationlabel">Upload ID Proof :</label>
                            {console.log(data.profilePic)}
                            <input
                              type="file"
                              className="form-control textbox-style"
                              name="profilePic"
                              onChange={handleChange}
                            />
                            {errors.profilePic && <div className="text-danger">{errors.profilePic}</div>}
                          </div> */}
                      </div>
                      <div className="row mt-3">
                        <div className="col-12 button-col">
                          <button
                            type="submit"
                            className="btn btn-warning button-style-change"
                          >
                            Update
                          </button>
                        </div>
                      </div>
                      <br />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JuniorAdvocateEditProfile;
