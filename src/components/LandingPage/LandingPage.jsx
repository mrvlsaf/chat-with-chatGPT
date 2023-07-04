import "./LandingPage.css";
import { useState, useEffect } from "react";
import ChatSwitch from "../../helper/ChatSwitch";
import { useMyContext } from "../../context/MyContext";

const LandingPage = () => {

  const { setActivateChat } = useMyContext();
  const [showLoading, setShowLoading] = useState(false);
  const [startLoader, setStartLoader] = useState(false);

  const handlechange = (e) => {
    setStartLoader(e.target.checked);
  }

  useEffect(() => {
    if (startLoader) {
      setShowLoading(true);
      setTimeout(() => {
        setShowLoading(false);
        setActivateChat(startLoader);
        setStartLoader(false);
      }, 1000);
    }
  }, [startLoader]);

  return (
    <div className="home-container">
      <div className="title">Chat with ChatGPT</div>
      <div className="chat-switch-container">
        <ChatSwitch handlechange={handlechange} activateChat={startLoader} />
        {showLoading ?
          <div className="chat-connected-status">Activating...</div> :
          <div className="chat-disconnected-status">Deactivated</div>
        }
      </div>
    </div>
  );
};

export default LandingPage;
