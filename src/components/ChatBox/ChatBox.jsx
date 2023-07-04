import "./ChatBox.css";
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import botImage from "../../assets/bot.jpg";
import SendIcon from '@mui/icons-material/Send';
import ChatSwitch from '../../helper/ChatSwitch';
import { useState, useRef, useEffect } from 'react';
import { useMyContext } from "../../context/MyContext";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const ChatBox = () => {

    const { chats, setChats, activateChat, setActivateChat } = useMyContext();
    const [currentMessage, setCurrentMessage] = useState();
    const [loading, setLoading] = useState(false);
    const containerRef = useRef(null);
    const [errorMessage, setErrorMessage] = useState("");

    const handlechange = (e) => {
        if (!e.target.checked) setChats([]);
        setActivateChat(e.target.checked);
    }

    const sendChat = async (e) => {
        e.preventDefault();
        if (currentMessage.length) {
            try {
                setLoading(true);
                setChats(prevChats => [...prevChats, { sender: 'user', message: currentMessage },]);
                setCurrentMessage("");
                setTimeout(async () => {
                    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', { message: currentMessage });
                    const receivedMessage = response.data.message;
                    setChats(prevChats => [...prevChats, { sender: 'bot', message: receivedMessage },]);
                    setLoading(false);
                }, 1000);
            } catch (error) {
                setErrorMessage(error);
            }
        }
    }

    useEffect(() => {
        const container = containerRef.current;
        container.scrollTop = container.scrollHeight;
    }, [chats]);

    return (
        <div className='chatbox-container'>
            <div className='chatbox-title-cont'>
                <div className='chatbox-title'>Chat with ChatGPT</div>
                <ChatSwitch handlechange={handlechange} activateChat={activateChat} />
            </div>
            {errorMessage && <div>Having issues connecting with ChatGPT. Try again later.</div>}
            <div className='chatbox-input-container'>
                <div className='chat-content-container' ref={containerRef}>
                    {chats && chats.map((chat) => {
                        return (
                            chat.sender === "user" ? <div className="user-message"><div className='chat-content'>{chat.message}</div><AccountCircleIcon className='user-icon' /></div> :
                                <div className="bot-message">
                                    <Avatar
                                        alt="Remy Sharp"
                                        className='user-icon'
                                        src={botImage}
                                        sx={{ width: 24, height: 24 }}
                                    />
                                    <div className='chat-content'>{chat.message}</div>
                                </div>
                        )
                    })}
                    {loading && <div className="typing-dots"><span></span><span></span><span></span></div>}
                </div>
                <div className='chat-input'>
                    <textarea
                        value={currentMessage}
                        rows={1}
                        placeholder='Ask a question'
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                event.preventDefault();
                                sendChat(event);
                            }
                        }}
                    />
                    <SendIcon onClick={sendChat} style={{ cursor: "pointer" }} />
                </div>
            </div>
        </div>
    )
}

export default ChatBox