import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expdata: [],
};

const ExpenseDataSlice = createSlice({
  name: "Expdata",
  initialState,
  reducers: {
    submitForm: (state, action) => {
      // console.log('state', state.data)
      // console.log('action', action)
      state.expdata.push(action.payload);
    },
    deleteRecord: (state, action) => {
      state.expdata.splice(action.payload, 1);
    },
  },
});

export const { submitForm, deleteRecord } = ExpenseDataSlice.actions;
export default ExpenseDataSlice.reducer;
