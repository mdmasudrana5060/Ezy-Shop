// redux/slices/productsSlice.ts
import { IMeta } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type MetaState = {
  meta: IMeta;
};

const initialState: MetaState = {
  meta: {
    page: 1,
    limit: 10,
    total: 0,
    totalPage: 0,
  },
};

const metaSlice = createSlice({
  name: "meta",
  initialState,
  reducers: {
    setMeta(state, action: PayloadAction<IMeta>) {
      state.meta = action.payload;
    },
    clearMeta(state) {
      state.meta = {
        page: 0,
        limit: 0,
        total: 0,
        totalPage: 0,
      };
    },
  },
});

export const { setMeta, clearMeta } = metaSlice.actions;
export default metaSlice.reducer;
