import { createSlice } from "@reduxjs/toolkit";

export interface TSampleData {
  sampleData: boolean;
}

const initialState: TSampleData = {
  sampleData: true,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    handleSample: (state) => {
      state.sampleData = !state.sampleData;
    },
  },
});

export const { handleSample } = globalSlice.actions;

export default globalSlice.reducer;
