import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { ResumeSchema } from "../../schema/types/resume.types";
type ResumeState = {
  resumes: ResumeSchema[];
};

const initialState: ResumeState = {
  resumes: [],
};

const resumeSlice = createSlice({
  name: "resumes",
  initialState,
  reducers: {
    addResume(state, action: PayloadAction<ResumeSchema>) {
      state.resumes.push(action.payload);
    },
    updateResume(state, action: PayloadAction<ResumeSchema>) {
      const id: string = action.payload.id;
      const index = state.resumes.findIndex((resume) => resume.id === id);
      if (index !== -1) {
        state.resumes[index] = action.payload;
      }
    },
    removeResume(state, action: PayloadAction<string>) {
      state.resumes = state.resumes.filter(
        (resume) => resume.id !== action.payload
      );
    },
  },
});

export const { addResume, updateResume, removeResume } = resumeSlice.actions;
export default resumeSlice.reducer;
