import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    LoginUser: (state, action) => {
      state.user = action.payload;
    },
    LogoutUser: (state) => {
      state.user = null;
    }
  },
});

export const {LoginUser, LogoutUser} = userSlice.actions;

export const selectuser = (state) => state.user.user;


export default userSlice.reducer;
