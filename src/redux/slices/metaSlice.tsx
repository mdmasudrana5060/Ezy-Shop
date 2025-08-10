// redux/slices/productsSlice.ts
import { IMeta } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type MetaState = {
  meta: IMeta;
};

const initialState: MetaState = {
  meta: [],
};

const metaSlice = createSlice({
  name: "meta",
  initialState,
  reducers: {
    setMeta(state, action: PayloadAction<IMeta>) {
      state.meta = action.payload;
    },
    clearMeta(state) {
      state.meta = [];
    },
  },
});

export const { setMeta, clearMeta } = metaSlice.actions;
export default metaSlice.reducer;
