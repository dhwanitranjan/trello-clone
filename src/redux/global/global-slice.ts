import { createSlice } from "@reduxjs/toolkit";

export interface TSampleData {
  sampleData: boolean;
  loginUserDetails: TLoginUserInfo | null;
}

const initialState: TSampleData = {
  sampleData: true,
  loginUserDetails: null,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    handleSample: (state) => {
      state.sampleData = !state.sampleData;
    },
    handleLogInDetails: (state, { payload }) => {
      state.loginUserDetails =
        typeof payload === "string" && payload !== ""
          ? JSON.parse(localStorage.getItem("loginUserDetails") || "")
          : payload;
    },
  },
});

export const { handleSample, handleLogInDetails } = globalSlice.actions;

export default globalSlice.reducer;
