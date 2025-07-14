import React, { useState } from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import { ChatBot } from "../components/tabs/dashboard/bot/playground";
import { createRoot } from "react-dom/client";

// Only auto-mount if running outside the main app
if (typeof window !== "undefined" && !document.getElementById("blacksight-widget-root")) {
  const rootDiv = document.createElement("div");
  rootDiv.id = "blacksight-widget-root";
  document.body.appendChild(rootDiv);
  // Defer WidgetApp reference until after its declaration
  setTimeout(() => {
    createRoot(rootDiv).render(<WidgetApp />);
  }, 0);
}

const WidgetApp = () => {
  const [open, setOpen] = useState(false);

  return (
    <Provider store={store}>
      <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 9999 }}>
        {!open && (
          <button
            style={{ borderRadius: "50%", width: 56, height: 56, background: "#6366f1", color: "#fff", border: "none", boxShadow: "0 2px 8px #0002", cursor: "pointer" }}
            onClick={() => setOpen(true)}
            aria-label="Open chat"
          >
            💬
          </button>
        )}
        {open && (
          <div style={{ width: 400, height: 600, background: "#fff", borderRadius: 16, boxShadow: "0 4px 24px #0003", overflow: "hidden", position: "relative" }}>
            <button
              style={{ position: "absolute", top: 8, right: 8, background: "none", border: "none", fontSize: 20, cursor: "pointer", zIndex: 2 }}
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              ×
            </button>
            <div style={{ width: "100%", height: "100%" }}>
              <h1>Testing if div works</h1>
              <ChatBot openBotConfig={() => {}} />
            </div>
          </div>
        )}
      </div>
    </Provider>
  );
};

export default WidgetApp; 