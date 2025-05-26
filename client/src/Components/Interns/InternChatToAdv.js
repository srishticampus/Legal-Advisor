import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import axiosInstance from '../Constants/BaseUrl';
import { imageUrl } from '../Constants/Image_Url';
import { toast } from 'react-toastify';

function InternChatToAdv() {

    const jid = localStorage.getItem("internId");
    const { aid } = useParams();
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
        .post(`viewChatBetweenInternAndAdv`, { advId: aid, internId: jid })
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
        .post(`viewAdvocateById/${aid}`)
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

    console.log(userDetalis);
  
    const handleSend = (e) => {
      e.preventDefault();
      console.log(inputValue);
  
      console.log(jid);
      axiosInstance
        .post(`chatting`, {
          msg: inputValue,
          from: "interns",
          to: "advocates",
          advId: aid,
          internId: jid,
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
    console.log(aid);

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
                msg.from == "interns" ? "sent" : "received"
              }`}
            >
              <div className="message-header">
                <span className="username">
                  <small>
                    {msg.from == "interns" ? msg.internId.name : msg.advId.name}
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

export default InternChatToAdv
