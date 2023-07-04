import { useContext, useState, createContext, useEffect } from "react";

const MyContext = createContext();
const { chrome } = window;

export function MyContextProvider({ children }) {
    const [activateChat, setActivateChat] = useState(false);
    const [chats, setChats] = useState([]);

    useEffect(() => {
        chrome.storage.local.get(['chatHistory', 'chatActivated'], (result) => {
            const chatHistory = result.chatHistory;
            const chatActivated = result.chatActivated;
            setActivateChat(chatActivated);
            setChats(chatHistory);
        });
    }, []);

    useEffect(() => {
        chrome.storage.local.set({ chatHistory: chats, chatActivated: activateChat });
    }, [activateChat, chats])

    return (
        <MyContext.Provider
            value={{
                chats,
                setChats,
                activateChat,
                setActivateChat,
            }}
        >
            {children}
        </MyContext.Provider>
    );
}

export function useMyContext() {
    const context = useContext(MyContext);
    if (context === undefined) {
        throw new Error("Context must be used within a Provider");
    }
    return context;
}
