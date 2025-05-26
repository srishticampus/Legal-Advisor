import React, { useEffect, useState } from "react";
import "./AdvAssignCasesToJnrAdv.css";
import axiosInstance from "../Constants/BaseUrl";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function AdvAssignCasesToJnrAdv() {
  const [data, setData] = useState([]);
  const [advocate, setAdvocate] = useState({
    profilePic: { filename: "" },
    idProof: { filename: "" },
  });

  const navigate=useNavigate()

  const [selectedCase, setSelectedCase] = useState('');
  const [caseDetails, setCaseDetails] = useState({ dateOfIncident: '',_id:'' });
  const [allowChat, setAllowChat] = useState(false);

  const id = localStorage.getItem("advocateId");
  const { jid } = useParams();

  useEffect(() => {
    axiosInstance
      .post(`/getApprovedAppointmentsForAdv/${id}`)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          setData(res.data.data || []);
        } else {
          setData([]);
        }
      })
      .catch((error) => {
        console.error("Error!", error);
      });

    axiosInstance
      .post(`/viewJuniorAdvocateById/${jid}`)
      .then((response) => {
        console.log(response);
        setAdvocate(response.data.data);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the advocate details!",
          error
        );
      });
  }, [id, jid]);

  useEffect(() => {
    if (selectedCase) {
      axiosInstance
        .post(`/getCaseById/${selectedCase}`)
        .then((res) => {
          console.log(res);
          if (res.data.status === 200) {
            setCaseDetails(res.data.data);
          }
        })
        .catch((error) => {
          console.error("Error!", error);
        });
    }
  }, [selectedCase]);

  const handleCheckboxChange = (event) => {
    setAllowChat(event.target.checked);
  };

  console.log(allowChat);

  const handleClientSend = (e) => {
    e.preventDefault();
    axiosInstance
      .post(`assignCaseforJr`, { jrId: jid, caseId: selectedCase,isChatEnabled:allowChat })
      .then((res) => {
        if (res.data.status === 200) {
          
          toast.success('Case Assigned')
          navigate('/advocate_view_all_jnr_adv')
          
        } else if(res.data.ststus==500) {
          toast.error(res.data.msg);
        }else{
          toast.warning('Something went wrong')
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to send message");
      });
  };

  return (
    <div className="container">
      <div className="row">
        <form onSubmit={handleClientSend} >
          <div className="adv_assign_cases col-12">
            <div className="adv_assign_cases_case">
              <div className="select-label">Select a Case :</div>
              <div className="select-container w-50">
                <select
                  className="form-control-sm specialization-form-select mx-4"
                  name="specialization"
                  onChange={(e) => { setSelectedCase(e.target.value); }}
                  required
                >
                  <option value="">
                    - Select -
                  </option>
                  {data.length
                    ? data.map((e) => {
                      return (
                        <option key={e.caseId._id} value={e.caseId._id}>
                          NO{e.caseId._id.slice(19,24)}
                        </option>
                      );
                    })
                    : ""}
                </select>
              </div>
            </div>
            <div className="adv_assign_cases_container d-flex">
              <div className="adv_assign_cases_container_head1 ">
                <div className="d-flex justify-content-center align-items-center">
                  <h3>Case Details</h3>
                </div>
                <div className="adv_assign_cases_container_content text-start">
                  <div className="d-flex justify-content-between ">
                    <p>Case Number</p>
                    <p>NO{caseDetails._id.slice(19,24)}</p>
                  </div>
                  <div className="d-flex justify-content-between ">
                    <p>Case Title</p>
                    <p>{caseDetails.title}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p>Case Description </p>
                    <p>{caseDetails.description}</p>
                  </div>

                  <div className="d-flex justify-content-between">
                    <p>Case Type</p>
                    <p>{caseDetails.type}</p>
                  </div>

                  <div className="d-flex justify-content-between">
                    <p>Case Location</p>
                    <p>{caseDetails.location}</p>
                  </div>

                  <div className="d-flex justify-content-between">
                    <p>Date of Incident</p>
                    <p>{caseDetails.dateOfIncident.slice(0, 10)}</p>
                  </div>
                </div>
              </div>
              <div className="adv_assign_cases_container_head2">
                <div className="d-flex justify-content-center align-items-center">
                  <h3>Junior Advocate Details</h3>
                </div>
                <div className="adv_assign_cases_container_content">
                  <div className="d-flex justify-content-between">
                    <p>Junior advocate name</p>
                    <p>{advocate.name}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p>Bar Council Enrollment Number</p>
                    <p>{advocate.bcNo}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p>Date of Enrollment</p>
                    <p>{advocate.dateOfEnrollment}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p>State Bar Council</p>
                    <p>{advocate.bcState}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p>Specialisation Areas</p>
                    <p>{advocate.specialization}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p>Educational Qualification</p>
                    <p>{advocate.qualification}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="client-chat-option">
              <input
                type="checkbox"
                id="allowClientChat"
                checked={allowChat}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="allowClientChat">Allow Client chat</label>
            </div>
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-assign">Assign</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdvAssignCasesToJnrAdv;
