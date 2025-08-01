import { AgentState } from "@/interfaces";
import { transcribeSpeech } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const transcribeSpeechBuilder = (
  builder: ActionReducerMapBuilder<AgentState>
) => {
  builder.addCase(transcribeSpeech.pending, (state) => {
    state.transcribingSpeech = true;
  });

  builder.addCase(transcribeSpeech.fulfilled, (state, action) => {
    state.transcribingSpeech = false;
    state.speechTranscribed = true;
    state.transcribedText = action.payload;
  });

  builder.addCase(transcribeSpeech.rejected, (state, action) => {
    state.transcribingSpeech = false;
    state.transcribeSpeechError =
      action.payload?.message || "Unable to transcribe speech";
  });
};
