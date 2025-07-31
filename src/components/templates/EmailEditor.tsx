import React, { RefObject, useRef } from "react";

import EmailEditor, { EditorRef, EmailEditorProps } from "react-email-editor";
import { Loader } from "../progress";

interface CustomEmailEditorProps {
  emailEditorRef: RefObject<EditorRef | null>;
}

export const CustomEmailEditor = ({
  emailEditorRef,
}: CustomEmailEditorProps) => {
  const [loading, setLoading] = React.useState(true);
  const [loadState, setLoadState] = React.useState("Initializing editor...");

  const onReady: EmailEditorProps["onReady"] = (unlayer) => {
    setLoadState("Ready...");
    setLoading(false);
    unlayer.setAppearance({
      theme: "dark",
    });
    unlayer.setBodyValues({
      contentWidth: "inherit",
    });
    unlayer.addEventListener("design:updated", () => {
      unlayer.setBodyValues({
        contentWidth: "inherit",
      });
    });
    // editor is ready
    // you can load your template here;
    // the design json can be obtained by calling
    // unlayer.loadDesign(callback) or unlayer.exportHtml(callback)
    // const templateJson = { DESIGN JSON GOES HERE };
    // unlayer.loadDesign(templateJson);
  };

  const onLoad: EmailEditorProps["onLoad"] = (unlayer) => {
    setLoadState("Loading plugins...");
  };

  return (
    <div className="h-full overflow-hidden flex flex-col relative">
      {/* <div>
        <button onClick={exportHtml}>Export HTML</button>
      </div> */}
      {loading && (
        <Loader
          text1={"Just a moment, please..."}
          text2={loadState}
          className="bg-white"
        />
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <EmailEditor
          options={{
            displayMode: "email",
            features: {
              stockImages: true,
            },
            fonts: {
              showDefaultFonts: true,
              customFonts: [
                {
                  label: "Poppins",
                  value: "Poppins",
                  url: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap",
                  weights: [300, 400, 500, 600, 700, 800],
                },
                {
                  label: "Inter",
                  value: "Inter",
                  url: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap",
                  weights: [300, 400, 500, 600, 700, 800],
                },
                {
                  label: "Lato",
                  value: "Lato",
                  url: "https://fonts.googleapis.com/css2?family=Lato:wght@300;400;500;600;700;800&display=swap",
                  weights: [300, 400, 500, 600, 700, 800],
                },
                {
                  label: "Roboto",
                  value: "Roboto",
                  url: "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700;800&display=swap",
                  weights: [300, 400, 500, 600, 700, 800],
                },
              ],
            },
            id: "dy-email-editor",
            tools: {
              bodies: {
                properties: {
                  contentWidth: {
                    editor: {
                      enabled: false,
                    },
                  },
                },
              },
            },
          }}
          ref={emailEditorRef}
          onReady={onReady}
          onLoad={onLoad}
          style={{
            flex: 1,
          }}
        />
      </div>
    </div>
  );
};
