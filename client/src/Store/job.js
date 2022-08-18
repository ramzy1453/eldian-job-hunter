import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    jobs: {},
  },
  reducers: {
    setJobs: (state, action) => {
      state.jobs = action.payload;
    },
    removeJob: (state, action) => {
      state.jobs = action.payload.jobs;
    },
    updateJob: (state, action) => {
      state.jobs = action.payload.jobs;
    },
  },
});

export const jobActions = jobSlice.actions;
export default jobSlice.reducer;
