import React from "react";
import Chat from "../assets/images/chat.png";
import { ReactComponent as ChatIcon } from "../assets/images/chat-icon.svg";

const Sidebar = ({ onNewChat }) => {

  const openPDF = () => {
    const pdfFile = require('../assets/pdf/certification.pdf'); 
    const newTab = window.open('', '_blank');
  
    if (newTab) {
      newTab.document.write(
        `<iframe width='100%' height='100%' src='${pdfFile}'></iframe>`
      );
    } else {
      console.error('Popup blocked. Please allow popups for this site.');
    }
  };

  return (
    <div className="sidebar-section">
      <div className="list-sidebar">
        <div className="main-logo">
          <h1 className="d-flex"><img style={{width:"58px", marginRight: "15px"}} src={Chat}/>Assistant</h1>
        </div>
        <div className="side-menu custom-scrollbar mt-5">
          <div className="new-chat d-flex">
            <ChatIcon className="chat-icon" />
            <p
              className="new-chat-button align-self-center"
              onClick={onNewChat}
            >
              + New chat
            </p>
          </div>
          <div className="d-flex new-chat">
            <button
                className="certificate-button font-bold py-2 rounded"
              onClick={openPDF}
            >Open Certificate</button>
           
          </div>
        </div>

      </div>
    </div>
  );
};

export default Sidebar;
