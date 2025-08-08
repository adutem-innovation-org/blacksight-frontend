import React, { useState, useEffect, Suspense } from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import { createRoot } from "react-dom/client";
// import "../index.css"; // Tailwind CSS
import botIcon from "@/assets/images/botIcon.png";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { MantineProvider } from "@mantine/core";

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
  // --- PATCH: Prevent Fast Refresh from running in Shadow DOM ---
  if (
    process.env.NODE_ENV !== "production" &&
    (window as any).RefreshRuntime &&
    typeof (window as any).RefreshRuntime.injectIntoGlobalHook !== "function"
  ) {
    // Remove the runtime to prevent the error
    delete (window as any).RefreshRuntime;
  }
  // -------------------------------------------------------------

  const ROOT_ID = "blacksight-widget-root";
  if (!document.getElementById(ROOT_ID)) {
    const host = document.createElement("div");
    host.id = ROOT_ID;
    document.body.appendChild(host);

    // Inject Tailwind CSS link (optional, for both envs)
    const TAILWIND_CDN = "https://cdn.jsdelivr.net/npm/tailwindcss@3.4.1/dist/tailwind.min.css";
    if (!document.querySelector(`link[href="${TAILWIND_CDN}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = TAILWIND_CDN;
      document.head.appendChild(link);
    }

    if (process.env.NODE_ENV === "production") {
      // Attach Shadow Root in production
      const shadowRoot = host.attachShadow({ mode: "open" });
      const wrapper = document.createElement("div");
      shadowRoot.appendChild(wrapper);
      const root = createRoot(wrapper);
      root.render(<WidgetApp />);
    } else {
      // Mount directly in development (no Shadow DOM)
      const root = createRoot(host);
      root.render(<WidgetApp />);
    }
  }
}