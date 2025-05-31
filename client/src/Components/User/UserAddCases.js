import React, { useEffect, useState } from "react";
import "./UserAddCases.css";
import img from "../../Assets/adv2.avif";
import { useFormik } from "formik";
import { UserAddCaseSchema } from "../Constants/Schema";
import { toast } from "react-toastify";
import axiosMultipartInstance from "../Constants/FormDataUrl";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../Constants/BaseUrl";
import { imageUrl } from "../Constants/Image_Url";
import * as Yup from 'yup';

function UserAddCases() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userId") == null) {
      navigate("/");
    }
  }, [navigate]);

  const [status, setStatus] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [advSug, setAdvSug] = useState([]);
  const [caseId, setCaseId] = useState('');

  const id = localStorage.getItem("userId");

  // Updated validation schema with all requested validations
  const UpdatedUserAddCaseSchema = Yup.object().shape({
    title: Yup.string()
      .required("Case Title is required")
      .matches(/^[a-zA-Z\s]+$/, "Case Title should contain only alphabets"),
    description: Yup.string()
      .required("Case Description is required"),
    type: Yup.string()
      .required("Case Type is required"),
    dateOfIncident: Yup.date()
      .required("Date of Incident is required")
      .max(new Date(), "Date of Incident cannot be in the future"),
    opponentName: Yup.string()
      .required("Opposing Party Name is required")
      .matches(/^[a-zA-Z\s]+$/, "Opposing Party Name should contain only alphabets"),
    opponentAddress: Yup.string()
      .required("Opposing Party Address is required"),
    location: Yup.string()
      .required("Case Location is required")
      .matches(/^[a-zA-Z\s]+$/, "Case Location should contain only alphabets"),
    evidence: Yup.mixed()
      .required("Evidence/Document is required")
  });

  const onSubmit = (values) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });

    axiosMultipartInstance
      .post(`/createCase/${id}`, formData)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          setAdvSug(res.data.suggestions);
          setCaseId(res.data.data._id)
          toast.success("Case Added Successfully");
          // navigate("/user_view_recent_cases")
        } else {
          toast.error("Failed to Add Case");
        }
      })
      .catch(() => {
        toast.error("Failed to Add Case");
      });
  };

  // Helper function to prevent non-alphabet characters
  const handleAlphabetInput = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      handleChange(e);
    }
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      userId: "",
      title: "",
      description: "",
      type: "",
      dateOfIncident: "",
      opponentName: "",
      opponentAddress: "",
      location: "",
      evidence: "",
    },
    validationSchema: UpdatedUserAddCaseSchema,
    onSubmit,
  });

  useEffect(() => {
    if (values.description) {
      axiosInstance
        .post("/getCaseType", { description: values.description })
        .then((res) => {
          console.log("API Response: ", res.data);
          if (res.data.status == 200) {
            setSuggestions(res.data.data);
          } else {
            setSuggestions([]);
          }
        })
        .catch((error) => {
          console.error("API Error: ", error);
        });
    }
  }, [values.description]);

  return (
    <div className="user_add_cases">
      <div className="container">
        <div className="row">
          <div className="col-7">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-6">
                  <div className="user_add_cases_title">
                    <label>Case Title</label>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex justify-content-between">
                    <div>: &nbsp;</div>
                    <input
                      type="text"
                      className="form-control border border-dark"
                      name="title"
                      value={values.title}
                      onChange={handleAlphabetInput}
                      onBlur={handleBlur}
                    />
                  </div>
                  {errors.title && touched.title && (
                    <span className="text-danger px-3">{errors.title}</span>
                  )}
                </div>

                <div className="col-6">
                  <div className="user_add_cases_title">
                    <label>Case Description</label>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex justify-content-between">
                    <div>: &nbsp;</div>
                    <textarea
                      className="form-control border border-dark mb-2"
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  {errors.description && touched.description && (
                    <span className="text-danger px-3">
                      {errors.description}
                    </span>
                  )}
                </div>

                <div className="col-6">
                  <div className="user_add_cases_title">
                    <label>Case Type</label>
                  </div>
                </div>
                <div className="col-6">
                {suggestions.length ? (
                    <div className="px-3 mb-1 text-danger">
                      <b>Suggestions</b>: {suggestions.join(", ")}
                    </div>
                  ) : (
                    ""
                  )}
                  {errors.type && touched.type && (
                    <span className="text-danger px-3">{errors.type}</span>
                  )}
                  <div className="d-flex justify-content-between">
                    <div>: &nbsp;</div>
                    <select
                      className="form-select form-control-lg specialization-form-select mb-2"
                      name="type"
                      value={values.type}
                      onChange={handleChange}
                      onBlur={handleBlur}
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
                      <option value="Environmental Law">
                        Environmental Law
                      </option>
                      <option value="Tax Law">Tax Law</option>
                      <option value="Real Estate Law">Real Estate Law</option>
                      <option value="Constitutional Law">
                        Constitutional Law
                      </option>
                      <option value="Human Rights Law">Human Rights Law</option>
                      <option value="International Law">
                        International Law
                      </option>
                      <option value="Banking and Finance Law">
                        Banking and Finance Law
                      </option>
                      <option value="Immigration Law">Immigration Law</option>
                      <option value="Health Care Law">Health Care Law</option>
                    </select>
                  </div>
                  
                </div>

                <div className="col-6">
                  <div className="user_add_cases_title">
                    <label>Date of Incident</label>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex justify-content-between">
                    <div>: &nbsp;</div>
                    <input
                      type="date"
                      className="form-control border border-dark"
                      name="dateOfIncident"
                      value={values.dateOfIncident}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      max={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  {errors.dateOfIncident && touched.dateOfIncident && (
                    <span className="text-danger px-3">
                      {errors.dateOfIncident}
                    </span>
                  )}
                </div>

                <div className="col-6">
                  <div className="user_add_cases_title">
                    <label>Opposing Party Name</label>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex justify-content-between">
                    <div>: &nbsp;</div>
                    <input
                      type="text"
                      className="form-control border border-dark"
                      name="opponentName"
                      value={values.opponentName}
                      onChange={handleAlphabetInput}
                      onBlur={handleBlur}
                    />
                  </div>
                  {errors.opponentName && touched.opponentName && (
                    <span className="text-danger px-3">
                      {errors.opponentName}
                    </span>
                  )}
                </div>

                <div className="col-6">
                  <div className="user_add_cases_title">
                    <label>Opposing Party Address</label>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex justify-content-between">
                    <div>: &nbsp;</div>
                    <input
                      type="text"
                      className="form-control border border-dark"
                      name="opponentAddress"
                      value={values.opponentAddress}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  {errors.opponentAddress && touched.opponentAddress && (
                    <span className="text-danger px-3">
                      {errors.opponentAddress}
                    </span>
                  )}
                </div>

                <div className="col-6">
                  <div className="user_add_cases_title">
                    <label>Case Location</label>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex justify-content-between">
                    <div>: &nbsp;</div>
                    <input
                      type="text"
                      className="form-control border border-dark"
                      name="location"
                      value={values.location}
                      onChange={handleAlphabetInput}
                      onBlur={handleBlur}
                    />
                  </div>
                  {errors.location && touched.location && (
                    <span className="text-danger px-3">{errors.location}</span>
                  )}
                </div>

                <div className="col-6">
                  <div className="user_add_cases_title">
                    <label>Upload Evidence/Document</label>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex justify-content-between">
                    <div>: &nbsp;</div>
                    <input
                      type="file"
                      className="form-control border border-dark"
                      name="evidence"
                      onChange={(event) => {
                        setFieldValue("evidence", event.currentTarget.files[0]);
                      }}
                      onBlur={handleBlur}
                    />
                  </div>
                  {errors.evidence && touched.evidence && (
                    <span className="text-danger px-3">{errors.evidence}</span>
                  )}
                </div>

                <div className="col-12 text-center mt-3">
                  <button type="submit" className="btn bg-gold">
                    Add Case
                  </button>
                </div>
              </div>
            </form>
          </div>

          {advSug.length > 0 ? (
            <div className="col-5">
              <div className="user_add_case_sugg_box2">
                <div className="user_add_case_sugg_box1_title text-center">
                  <p>Advocate Suggestions</p>
                </div>

                {advSug.map((e) => {
                  return (
                    <div className="user_add_case_sugg_box1_cards mt-4">
                      <div className="user_add_case_sugg_box1_img">
                        <img
                          src={`${imageUrl}/${e.profilePic.filename}`}
                          className="img-fluid"
                          alt="Profile"
                        />
                      </div>
                      <div className="user_add_case_sugg_box1_details">
                        <p className="user_add_case_sugg_box1_details_head mb-2">
                          {e.name}
                        </p>
                        <p>{e.specialization}</p>
                        <p className="text-end">
                          <Link to={`/user_bookappoinment/${e._id}/${caseId}`}><i class="ri-arrow-right-line"></i></Link> 
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="col-4">
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <div className="user_add_case_sugg_box1">
                      <div className="user_add_case_sugg_box1_title">
                        <p>Advocate Suggestions </p>
                      </div>
                      <div className="user_add_case_sugg_box1_content">
                        <p>
                          Please enter your case details completely to receive
                          the most updated suggestions for advocates. Providing
                          comprehensive information about your case will help us
                          match you with the best legal professionals suited to
                          your specific needs.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserAddCases;