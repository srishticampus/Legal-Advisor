import React, { useEffect, useRef, useState } from 'react'
import axiosInstance from '../Constants/BaseUrl';
import { imageUrl } from '../Constants/Image_Url';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function UserChatToJuniorAdv() {

  const uid = localStorage.getItem("userId"); 
  const { cid } = useParams();

  const [messageList, setMessageList] = useState([]);
  const [userDetalis, setUserDetails] = useState({
    profilePic: { filename: "" },
  });
  const [inputValue, setInputValue] = useState("");
  const [jrId, setJrId] = useState("");
  const chatBodyRef = useRef(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messageList]);

  useEffect(() => {
    axiosInstance
      .post(`checkIfJrInchat`, { userId: uid, caseId: cid })
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          setMessageList(res.data.data);
          extractJrId(res.data.data);
        } else {
        }
      })
      .catch((err) => {
        console.log(err);
      });

    
  }, []);

  const extractJrId = (messages) => {
    for (let message of messages) {
      if (message.jrId && message.jrId._id) {
        setJrId(message.jrId._id);
        break;
      }
    }
  };

  useEffect(()=>{
    axiosInstance
      .post(`viewJuniorAdvocateById/${jrId}`)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          setUserDetails(res.data.data);
        } else {
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },[jrId])

  const handleSend = (e) => {
    e.preventDefault();
    console.log(inputValue);

    axiosInstance
      .post(`chatting`, {
        msg: inputValue,
        from: "user",
        to: "jradvocate",
        userId: uid,
        caseId: cid,
        jrId:jrId
      })
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          setInputValue('');
          setMessageList(prevMessageList => {
            const newMessageList = [...prevMessageList, res.data.data];
            extractJrId(newMessageList);
            return newMessageList;
          });
        } else {
        }
      })
      .catch(() => {
        toast.error("Failed to Add Case");
      });
  };

  console.log(messageList);
  console.log("JrId:", jrId); // For debugging purposes

  return (
    <div className="user_chat">
      <div className="chat-container">
        <div className="chat-header">
          <img
            src={`${imageUrl}/${userDetalis.profilePic.filename}`}
            className="img-fluid"
            alt="Advocate"
          />
          <span className="fs-5 px-3">{userDetalis.name}</span>
        </div>

        <div className="chat-body" ref={chatBodyRef}>
          {messageList.length ? (
            messageList.map((msg) => (
              <div
                key={msg.id}
                className={`chat-message ${
                  msg.from === "jradvocate" ? "received" : "sent"
                }`}
              >
                <div className="message-header">
                  <span className="username">
                    <small>
                      {msg.from === "jradvocate" ? msg.jrId.name : msg.userId.name}
                    </small>
                  </span>
                  <span className="timestamp">
                    {msg.createdAt.slice(0, 10)}
                  </span>
                </div>
                <p className="message-content">{msg.msg}</p>
              </div>
            ))
          ) : (
            <div className="no_chat_container">
              <h3>
                Please start the conversation and get the help or information
                you need.
              </h3>
            </div>
          )}
        </div>
        <form onSubmit={handleSend} >
          <div className="chat-input">
            <input
              type="text"
              placeholder="Type Your Message"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit" >
              <i className="ri-send-plane-fill"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserChatToJuniorAdv
