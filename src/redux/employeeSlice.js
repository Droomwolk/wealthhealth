/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable quotes */
import { createSlice } from "@reduxjs/toolkit";
import { employee as initialEmployees } from "../data/data";

// petit utilitaire : Date -> ISO string (ou vide)
const toISO = (d) => (d instanceof Date ? d.toISOString() : d ?? "");

export const employeeSlice = createSlice({
  name: "employee",
  initialState: initialEmployees, // garde tes données seed si tu veux
  reducers: {
    // on garde la même API côté composants (tu peux continuer à passer des Date)
    createEmployee: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(emp) {
        return {
          payload: {
            ...emp,
            dateOfBirth: toISO(emp.dateOfBirth), // <-- sérialisé
            startDate: toISO(emp.startDate), // <-- sérialisé
          },
        };
      },
    },
  },
});

export const { createEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
