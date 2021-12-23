import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    Login: (state, action) => {
      state.user = action.payload;
    },
    Logout: (state) => {
      state.user = null;
    }
  },
});

export const {Login, Logout} = userSlice.actions;

export const selectuser = (state) => state.user.user;


export default userSlice.reducer;
