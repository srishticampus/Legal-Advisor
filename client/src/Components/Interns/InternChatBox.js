import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../Constants/BaseUrl";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is included

function InternChatBox() {
  const { id } = useParams();
  const iId = localStorage.getItem("internId"); 
  const  navigate=useNavigate();

  const [messageList, setMessageList] = useState([]);
  const [userDetails, setUserDetails] = useState({ adminId: {} });
  const [inputValue, setInputValue] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility
  const chatBodyRef = useRef(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messageList]);

  useEffect(() => {
    // Fetch messages
    axiosInstance
      .post(`viewgroupChatsByGroupId/${id}`)
      .then((res) => {
        if (res.data.status === 200) {
          setMessageList(res.data.data);
        } else {
          toast.error("Failed to load messages");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load messages");
      });

    // Fetch group details
    axiosInstance
      .post(`viewGroupById/${id}`)
      .then((res) => {
        if (res.data.status === 200) {
          console.log(res);
          setUserDetails(res.data.data);
        } else {
          toast.error("Failed to load group details");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load group details");
      });
  }, [id]);

  const handleClientSend = (e) => {
    e.preventDefault();
    axiosInstance
      .post(`joinGroup/${id}`, { internId: iId, msg: inputValue })
      .then((res) => {
        if (res.data.status === 200) {
          setInputValue("");
          setMessageList((prevMessageList) => [
            ...prevMessageList,
            res.data.data,
          ]);
        } else {
          toast.error("Failed to send message");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to send message");
      });
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const closeDiscussion = () => {
    axiosInstance
      .post(`closeGroupById/${id}`)
      .then((res) => {
        if (res.data.status === 200) {
          setUserDetails((prevDetails) => ({
            ...prevDetails,
            status: false,
          }));
          // navigate('/intern_group_chat')
          setIsDropdownOpen((prev) => !prev);
          navigate(-1)
          toast.success("Discussion closed by Admin");
        } else {
          toast.error("Failed to close discussion");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to close discussion");
      });
  };

  return (
    <div>
      <div className="advocate_chat">
        {messageList.length ? (
          <div className="adv_chat_container">
            <div className="chat-header d-flex justify-content-between">
              <span className="fs-5 px-3">{userDetails.title}</span>
              {userDetails.adminId._id === iId && (
                <div className="dropdown-wrapper" style={{ position: "relative" }}>
                  <i
                    className="ri-more-2-fill"
                    onClick={toggleDropdown}
                    aria-expanded={isDropdownOpen}
                    aria-haspopup="true"
                  ></i>
                  {isDropdownOpen && (
                    <ul
                      className="dropdown-menu show"
                      id="intern_dropdown"
                    >
                      <li>
                        <button className="dropdown-item" onClick={closeDiscussion}>
                          Close Discussion
                        </button>
                      </li>
                    </ul>
                  )}
                </div>
              )}
            </div>
            <div className="adv_chat-body" ref={chatBodyRef}>
              {messageList.map((msg) => {
                const isSentMessage =
                  msg.internId?._id === iId || msg.internId === iId;

                return (
                  <div key={msg._id}>
                    <div
                      className={`chat-message ${
                        isSentMessage ? "sent" : "received"
                      }`}
                    >
                      <div className="message-header">
                        <span className="username">
                          <small>
                            {/* {msg.from === "users" ? msg.userId.name : msg.advId.name} */}
                          </small>
                        </span>
                        <span className="timestamp">
                          {/* {msg.createdAt.slice(0, 10)} */}
                          date
                        </span>
                      </div>
                      <p className="message-content">{msg.msg}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            {userDetails.status === true ? (
              <form onSubmit={handleClientSend}>
                <div className="chat-input">
                  <input
                    type="text"
                    placeholder="Type Your Message"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <button type="submit">
                    <i className="ri-send-plane-fill"></i>
                  </button>
                </div>
              </form>
            ) : (
              <div className="discussion_closed" >
                <p className="" >Discussion is closed by Admin</p>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="no_chat_container_chat">
              <h3>Start Conversation.</h3>
            </div>
            {userDetails.status === true ? (
              <form onSubmit={handleClientSend}>
                <div className="chat-input">
                  <input
                    type="text"
                    placeholder="Type Your Message"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <button type="submit">
                    <i className="ri-send-plane-fill"></i>
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <p>Discussion is closed by Admin</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default InternChatBox;
