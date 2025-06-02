import { BotState } from "@/interfaces";
import { speechToText } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const speechToTextBuilder = (
  builder: ActionReducerMapBuilder<BotState>
) => {
  builder.addCase(speechToText.pending, (state) => {
    state.transcribingSpeech = true;
  });

  builder.addCase(speechToText.fulfilled, (state, action) => {
    state.transcribingSpeech = false;
    state.speechTranscribed = true;
    state.transcribedText = action.payload;
  });

  builder.addCase(speechToText.rejected, (state, action) => {
    state.transcribingSpeech = false;
    state.transcribeSpeechError =
      action?.payload || "Unable to transcribe speech";
  });
};
