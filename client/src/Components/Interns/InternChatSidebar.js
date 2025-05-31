import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from "react-toastify";
import axiosInstance from "../Constants/BaseUrl";

function InternChatSidebar() {
  const [showModal, setShowModal] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [groupData, setGroupData] = useState([]);
  const users = [{ name: "radhul" }, { name: "Name2" }];

  const id = localStorage.getItem('internId');
  const navigate=useNavigate()
  
  const handleCreateClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {  
    axiosInstance
        .post(`viewAllActiveGroups`)
        .then((res) => {
          if (res.data.status === 200) {
            setGroupData(res.data.data.reverse());
          }
        })
        .catch((err) => {
          console.log(err);
        });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post(`createGroup/${id}`, {
        title: inputValue
      })
      .then((res) => {
        console.log(res);

        if (res.data.status === 200) {
          toast.success('Created');
          setGroupData([...groupData, res.data.data]);
          navigate(`/intern_single_chat/${res.data.data._id}`)
        } else {
          toast.error("Failed to create group");
        }
      })
      .catch(() => {
        toast.error("Failed to create group");
      });

    setInputValue("");
    setShowModal(false);
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-end">
              <div className="intern_add_forum">
                <p onClick={handleCreateClick}>Create + </p>
              </div>
            </div>

            <div className="mt-3">
              {groupData.length
                ? groupData.map((e, index) => (
                    <div key={index} className="adv_chat_sidebar_name">
                      <Link to={`/intern_single_chat/${e._id}`}>
                        <div className="d-flex">
                          <div className="adv_chat_sidebar_name_img">
                            {/* <img
                              src={`${imageUrl}/${e.profilePic.filename}`}
                              className="img-fluid"
                              alt="Advocate"
                            /> */}
                          </div>
                          <div className="adv_chat_sidebar_name_content px-3">
                            <div>
                              <p>
                                <b>{e.title}</b>
                              </p>
                              <p>
                                <small>[ Created By {e.adminId._id === id ? 'You' : e.adminId.name} ]</small>
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))
                : ""}
            </div>
          </div>
        </div>
      </div>

      {/* Bootstrap Modal */}
      <div className={`modal fade ${showModal ? "show d-block" : ""}`} tabIndex="-1" style={{ backgroundColor: showModal ? 'rgba(0, 0, 0, 0.5)' : 'transparent' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Create</h5>
              <button type="button" className="btn-close" onClick={handleCloseModal}></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="inputField" className="form-label">Enter Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputField"
                    value={inputValue}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InternChatSidebar;
