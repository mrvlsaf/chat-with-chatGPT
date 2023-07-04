import "./App.css";
import { useMyContext } from "./context/MyContext";
import ChatBox from "./components/ChatBox/ChatBox";
import LandingPage from "./components/LandingPage/LandingPage";

function App() {
  
  const { activateChat } = useMyContext();

  return (
    <div className="app-container">
      {activateChat ? <ChatBox /> : <LandingPage />}
    </div>
  );
}

export default App;
