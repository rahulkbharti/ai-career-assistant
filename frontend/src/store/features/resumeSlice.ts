import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ResumeDataCreate } from "../schema/resume.schema";

type ResumeState = {
  resumes: ResumeDataCreate[];
};

const initialState: ResumeState = {
  resumes: [],
};

const resumeSlice = createSlice({
  name: "resumes",
  initialState,
  reducers: {
    addResume(state, action: PayloadAction<ResumeDataCreate>) {
      state.resumes.push(action.payload);
    },
    removeResume(state, action: PayloadAction<string>) {
      state.resumes = state.resumes.filter(
        (resume) => resume.id !== action.payload
      );
    },
  },
});

export const { addResume, removeResume } = resumeSlice.actions;
export default resumeSlice.reducer;
