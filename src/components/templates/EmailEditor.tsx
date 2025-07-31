import React, { RefObject, useRef } from "react";

import EmailEditor, { EditorRef, EmailEditorProps } from "react-email-editor";
import { Loader } from "../progress";
import { useStore } from "@/hooks";
import { EditorMode } from "@/enums";

interface CustomEmailEditorProps {
  emailEditorRef: RefObject<EditorRef | null>;
}

export const CustomEmailEditor = ({
  emailEditorRef,
}: CustomEmailEditorProps) => {
  const { getState, dispatch } = useStore();
  const [loading, setLoading] = React.useState(true);
  const [loadState, setLoadState] = React.useState("Initializing editor...");
  const { editorMode, currentTemplate, updatingTemplate } =
    getState("Template");

  const onReady: EmailEditorProps["onReady"] = (unlayer) => {
    // editor is ready
    setLoadState("Ready...");
    if (editorMode !== EditorMode.EDIT) {
      setLoading(false);
    }
    // Set default styles and event listeners
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
    // load your template here;
    // the design json can be obtained by calling
    // unlayer.loadDesign(callback) or unlayer.exportHtml(callback)
    // const templateJson = { DESIGN JSON GOES HERE };
    // unlayer.loadDesign(templateJson);
    if (editorMode === EditorMode.EDIT && currentTemplate) {
      setLoadState("Loading design...");
      unlayer.loadDesign(currentTemplate.design);
      setLoading(false);
    }
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

      {updatingTemplate && <Loader className="bg-black/30" />}

      <div className="flex-1 flex flex-col overflow-hidden">
        <EmailEditor
          options={{
            displayMode: "email",
            features: {
              stockImages: true,
              undoRedo: true,
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
