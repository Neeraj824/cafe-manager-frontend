import { createSlice } from '@reduxjs/toolkit';

const cafeSlice = createSlice({
  name: 'cafe',
  initialState: {
    cafes: [],
    selectedCafe: null,
  },
  reducers: {
    setCafes: (state, action) => {
      state.cafes = action.payload;
    },
    setSelectedCafe: (state, action) => {
      state.selectedCafe = action.payload;
    },
    addCafe: (state, action) => {
      state.cafes.push(action.payload);
    },
    updateCafe: (state, action) => {
      const index = state.cafes.findIndex(cafe => cafe.id === action.payload.id);
      if (index !== -1) {
        state.cafes[index] = action.payload;
      }
    },
    deleteCafe: (state, action) => {
      state.cafes = state.cafes.filter(cafe => cafe.id !== action.payload);
    },
  },
});

export const { setCafes, setSelectedCafe, addCafe, updateCafe, deleteCafe } = cafeSlice.actions;

export default cafeSlice.reducer;