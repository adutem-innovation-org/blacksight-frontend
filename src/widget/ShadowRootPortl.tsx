// src/widget/ShadowRootPortal.tsx
import React, { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export const ShadowRootPortal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const [shadowRoot, setShadowRoot] = useState<ShadowRoot | null>(null);

  useEffect(() => {
    if (hostRef.current && !shadowRoot) {
      const root = hostRef.current.attachShadow({ mode: "open" });
      setShadowRoot(root);

      // Inject CSS
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "blacksight-widget.css"; // Make sure this matches your output!
      root.appendChild(link);
    }
  }, [shadowRoot]);

  if (!shadowRoot) return <div ref={hostRef} />;

  return createPortal(children, shadowRoot);
};