import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const hashtagsSlice = createSlice({
  name: 'hashtags',
  initialState,
  reducers: {
    addHashtagsToStorage: (state, action) => {
      state.value.push(action.payload)
    },
    updateHashtagsToStorage: (state, action) => {
        state.value=action.payload
    },
  },
});

export const { addHashtagsToStorage,updateHashtagsToStorage } = hashtagsSlice.actions;
export default hashtagsSlice.reducer;