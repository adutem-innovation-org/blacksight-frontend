import React from "react";
import { createRoot } from "react-dom/client";
import WidgetApp from "./widget/WidgetApp";
import "./widget/widget.css";

const container = document.getElementById("blacksight-widget-root") || (() => {
  const el = document.createElement("div");
  el.id = "blacksight-widget-root";
  document.body.appendChild(el);
  return el;
})();

createRoot(container).render(<WidgetApp />); 