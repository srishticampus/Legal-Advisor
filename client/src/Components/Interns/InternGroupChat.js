import React from 'react'
import InternChatSidebar from './InternChatSidebar'
import InternChatBox from './InternChatBox'

function InternGroupChat({type}) {
  return (
    <div>
      <div className="container-fluid advocate_main">
        <div className="row">
          <div
            className="col-lg-3 col-md-6 col-sm-12 advocate_chat_sidebar"
            style={{ padding: 0 }}
          >
            <InternChatSidebar />
          </div>
          <div className=" col-lg-9 col-md-6 col-sm-12">
            {type === "noChat" ? (
              <div className="no_chat_container">
                <h3>
                  Start chat to join group
                </h3>
              </div>
            ) :
              <InternChatBox />
           
           }
          </div>
        </div>
      </div>
    </div>
  )
}

export default InternGroupChat
