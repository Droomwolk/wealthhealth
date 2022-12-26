/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable quotes */
import { createSlice } from "@reduxjs/toolkit";
import { employee } from "../data/data";

export const employeeSlice = createSlice({
  name: "employee",
  initialState: employee,
  reducers: {
    createEmployee: (state, action) => {
      const newEmployee = action.payload;
      state.push(newEmployee);
    },
  },
});
export const { createEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
