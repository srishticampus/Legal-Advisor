import React from "react";
import "./AdvocateChat.css";
import AdvocateChatSidebar from "./AdvocateChatSidebar";
import AdvocateChatBox from "./AdvocateChatBox";

function AdvocateChat({ type }) {
  return (
    <div>
      <div className="container-fluid advocate_main">
        <div className="row">
          <div
            className="col-lg-3 col-md-6 col-sm-12 advocate_chat_sidebar"
            style={{ padding: 0 }}
          >
            <AdvocateChatSidebar />
          </div>
          <div className=" col-lg-9 col-md-6 col-sm-12">
            {type === "noChat" ? (
              <div className="no_chat_container">
                <h3>
                  Please select a person to start a conversation and get the
                  help or information you need.
                </h3>
              </div>
            ) :
              <AdvocateChatBox />
           }
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdvocateChat;
