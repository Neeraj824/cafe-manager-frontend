import { createSlice } from '@reduxjs/toolkit';

const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    employees: [],
    selectedCafe: null,
  },
  reducers: {
    setEmployees: (state, action) => {
      state.employees = action.payload;
    },
    setSelectedEmployee: (state, action) => {
      state.selectedEmployee = action.payload;
    },
    addEmployee: (state, action) => {
      state.employees.push(action.payload);
    },
    updateEmployee: (state, action) => {
      const index = state.employees.findIndex(employee => employee.id === action.payload.id);
      if (index !== -1) {
        state.employees[index] = action.payload;
      }
    },
    deleteEmployee: (state, action) => {
      state.employees = state.employees.filter(employee => employee.id !== action.payload);
    },
  },
});

export const { setEmployees, setSelectedEmployee, addEmployee, updateEmployee, deleteEmployee} = employeeSlice.actions;

export default employeeSlice.reducer;