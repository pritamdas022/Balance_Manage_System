import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  incomdata: [],
};

const formSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    insubmitForm: (state, action) => {
      // console.log("action",action)
      state.incomdata.push(action.payload);
    },
    deleteRecord: (state, action) => {
      state.incomdata.splice(action.payload, 1);
    },
  },
});

export const { insubmitForm, deleteRecord } = formSlice.actions;
export default formSlice.reducer;
