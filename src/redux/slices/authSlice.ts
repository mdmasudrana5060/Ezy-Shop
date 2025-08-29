import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type AuthState = {
  accessToken: string | null;
};
const initialState: AuthState = {
  accessToken: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
    },
    clearAuth: (state) => {
      state.accessToken = null;
    },
  },
});
export const { setAccessToken, clearAuth } = authSlice.actions;
export default authSlice.reducer;
