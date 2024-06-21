import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  token: localStorage.getItem('access_token') || null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.currentUser = { ...user }; // Ensure immutability by creating a new object
      state.token = token;
      state.isLoading = false;
      state.error = null;
      localStorage.setItem('access_token', token);
    },
    clearUser: (state) => {
      state.currentUser = null;
      state.token = null;
      state.isLoading = false;
      state.error = null;
      localStorage.removeItem('access_token');
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setUser, clearUser, setLoading, setError } = userSlice.actions;

export const selectCurrentUser = (state) => state.user.currentUser;
export const selectToken = (state) => state.user.token;
export const selectLoading = (state) => state.user.isLoading;
export const selectError = (state) => state.user.error;

export default userSlice.reducer;
