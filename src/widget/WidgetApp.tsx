import React, { useState } from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import { ChatBot } from "../components/tabs/dashboard/bot/playground";
import { createRoot } from "react-dom/client";
import { setCurrentBot } from "../store"; // Adjust the path if needed
import { useEffect } from "react";
import { BotStatus } from "../enums/bot"; // Adjust the path if needed
import '../index.css'; // Adjust the path to your Tailwind entry file


const DEFAULT_BOT = {
  _id: "YOUR_BOT_ID",
  name: "Widget Bot",
  businessId: "YOUR_BUSINESS_ID",
  knowledgeBaseIds: [],
  scheduleMeeting: false,
  welcomeMessage: "Hello! How can I help you?",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  isActive: true,
  meetingProviderId: "",
  instructions: "",
  status: BotStatus.ACTIVE, // Use the enum, not a string
  knowledgeBase: { tag: "", isActive: true },
  knowledgeBases: [{ tag: "", isActive: true, _id: "kb1", id: "kb1" }] as [
    { tag: string; isActive: boolean; _id: string; id: string }
  ],
};

const WidgetApp = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    store.dispatch(setCurrentBot(DEFAULT_BOT));
  }, []);

  return (

      <Provider store={store}>
        <div className="fixed bottom-5 right-5 z-[9999]">
          {!open && (
            <button
              className="rounded-full w-14 h-14 bg-indigo-500 text-white border-none shadow-md cursor-pointer flex items-center justify-center text-2xl"
              onClick={() => setOpen(true)}
              aria-label="Open chat"
            >
              💬
            </button>
          )}
          {open && (
            <div className="w-[400px] h-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden relative">
              <button
                className="absolute top-2 right-2 bg-transparent border-none text-2xl cursor-pointer z-20"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
              >
                ×
              </button>
              <div className="w-full h-full">
                <h1>Testing if div works</h1>
                <ChatBot openBotConfig={() => { }} />
              </div>
            </div>
          )}
        </div>
      </Provider>


  );
};

export default WidgetApp; 