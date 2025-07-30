import React, { RefObject, useRef } from "react";

import EmailEditor, { EditorRef, EmailEditorProps } from "react-email-editor";

interface CustomEmailEditorProps {
  emailEditorRef: RefObject<EditorRef | null>;
}

export const CustomEmailEditor = ({
  emailEditorRef,
}: CustomEmailEditorProps) => {
  const onReady: EmailEditorProps["onReady"] = (unlayer) => {
    // editor is ready
    // you can load your template here;
    // the design json can be obtained by calling
    // unlayer.loadDesign(callback) or unlayer.exportHtml(callback)
    // const templateJson = { DESIGN JSON GOES HERE };
    // unlayer.loadDesign(templateJson);
  };

  return (
    <div className="h-full overflow-hidden flex flex-col">
      {/* <div>
        <button onClick={exportHtml}>Export HTML</button>
      </div> */}

      <div className="flex-1 flex flex-col overflow-hidden">
        <EmailEditor
          options={{
            displayMode: "email",
            features: {
              stockImages: true,
            },
            id: "dy-email-editor",
          }}
          ref={emailEditorRef}
          onReady={onReady}
          style={{
            flex: 1,
          }}
        />
      </div>
    </div>
  );
};
