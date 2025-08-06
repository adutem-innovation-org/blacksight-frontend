import React, { useState, useEffect, Suspense } from "react";
import { Provider } from "react-redux";
import { store, setCurrentBot } from "../store";
import { BotStatus } from "../enums/bot";
import { createRoot } from "react-dom/client";
import "../index.css"; // Tailwind CSS
import botIcon from "@/assets/images/botIcon.png";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { MantineProvider } from "@mantine/core";
import { Toaster } from "react-hot-toast";

// Lazy load LiveAgent so it’s only loaded when needed
const LiveAgent = React.lazy(() =>
  import("@/components/agent/LiveAgent").then(module => ({
    default: module.LiveAgent
  }))
);


const getWidgetAttributes = () => {
  const script = document.querySelector('script[data-api-key][data-agent-id]');
  const apiKey = script?.getAttribute('data-api-key') || "";
  const agentId = script?.getAttribute('data-agent-id') || "";
  return { apiKey, agentId };
};

const WidgetApp = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const { apiKey, agentId } = getWidgetAttributes();

    // const BOT = {
    //   _id: agentId,
    //   name: "Widget Bot",
    //   businessId: apiKey,
    //   knowledgeBaseIds: [],
    //   scheduleMeeting: false,
    //   welcomeMessage: "Hello! How can I help you?",
    //   createdAt: new Date().toISOString(),
    //   updatedAt: new Date().toISOString(),
    //   isActive: true,
    //   meetingProviderId: "",
    //   instructions: "",
    //   status: BotStatus.ACTIVE,
    //   knowledgeBase: { tag: "", isActive: true },
    //   knowledgeBases: [
    //     { tag: "", isActive: true, _id: "kb1", id: "kb1" }
    //   ]
    // };

    // store.dispatch(setCurrentBot(BOT));
  }, []);

  return (
    <MantineProvider>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{ duration: 1400 }}
      />
      <Provider store={store}>
        <div className="fixed bottom-5 right-5 z-[9999]">
          {!open && (
            <button
              className="rounded-full w-14 h-14 bg-indigo-500 text-white border-none shadow-md cursor-pointer flex items-center justify-center text-2xl"
              onClick={() => setOpen(true)}
              aria-label="Open chat"
            >
              <img src={botIcon} className="max-h-10 object-contain" />
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
                <Suspense fallback={<div className="p-4">Loading chat...</div>}>
                  <LiveAgent
                    apiKey={getWidgetAttributes().apiKey}
                    agentId={getWidgetAttributes().agentId}
                    shouldDisplayFixed={false}
                  />
                </Suspense>
              </div>
            </div>
          )}
        </div>
      </Provider>
    </MantineProvider>
  );
};

export default WidgetApp;

// Auto-mount
if (typeof window !== "undefined") {
  const ROOT_ID = "blacksight-widget-root";

  if (!document.getElementById(ROOT_ID)) {
    const rootDiv = document.createElement("div");
    rootDiv.id = ROOT_ID;
    document.body.appendChild(rootDiv);

    const root = createRoot(rootDiv);
    root.render(<WidgetApp />);
  }
}
