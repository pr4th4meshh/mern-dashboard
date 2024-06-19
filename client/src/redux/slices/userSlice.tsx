import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: localStorage.getItem('access_token') || null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, accessToken } = action.payload; // Make sure to use the correct payload field name
      state.user = user;
      state.token = accessToken;
      localStorage.setItem('access_token', accessToken);
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('access_token');
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
export const selectCurrentUser = (state) => state.user.user;
export const selectCurrentToken = (state) => state.user.token;
