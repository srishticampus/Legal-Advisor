import React, { useEffect, useRef, useState } from 'react'
import axiosInstance from '../Constants/BaseUrl';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { imageUrl } from '../Constants/Image_Url';

function JuniorAdvChatToUser() {
    const jid = localStorage.getItem("junioradvocateId");
  const { aid } = useParams();
  const { cid } = useParams();
  console.log(jid);

  const [messageList, setMessageList] = useState([]);
  const [userDetalis, setUserDetails] = useState({
    profilePic: { filename: "" },
  });
  const [inputValue, setInputValue] = useState("");
  const chatBodyRef = useRef(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messageList]);

  useEffect(() => {
    axiosInstance
      .post(`viewChatBetweenAdvAndJr`, { userId: aid, jrId: jid })
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          setMessageList(res.data.data);
        } else {
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axiosInstance
      .post(`viewUserById/${aid}`)
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
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    console.log(inputValue);

    console.log(jid);
    axiosInstance
      .post(`chatting`, {
        msg: inputValue,
        from: "jradvocate",
        to: "user",
        userId: aid,
        jrId: jid,
        caseId:cid
      })
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          setInputValue('');
              setMessageList(prevMessageList => [...prevMessageList, res.data.data]);
        } else {
        }
      })
      .catch(() => {
        toast.error("Failed to Add Case");
      });
  };

  console.log(messageList);
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
                  msg.from == "jradvocate" ? "sent" : "received"
                }`}
              >
                <div className="message-header">
                  <span className="username">
                    <small>
                      {msg.from == "jradvocate" ? msg.jrId.name : msg.userId.name}
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

export default JuniorAdvChatToUser
