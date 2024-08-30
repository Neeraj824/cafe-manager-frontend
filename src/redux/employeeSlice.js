import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchEmployeesByCafe = createAsyncThunk('employee/fetchEmployeesByCafe', async (cafeId) => {
  const response = await axios.get(`/api/employees?cafeId=${cafeId}`);
  return response.data;
});

const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    employees: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEmployeesByCafe.fulfilled, (state, action) => {
      state.employees = action.payload;
    });
  },
});

export default employeeSlice.reducer;