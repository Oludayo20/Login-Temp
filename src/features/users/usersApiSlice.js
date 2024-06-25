import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from './message';

import AuthService from '../services/auth.service';

const user = JSON.parse(localStorage.getItem('user'));

export const register = createAsyncThunk(
  'users',
  async ({ username, email, password }, thunkAPI) => {
    try {
      const response = await AuthService.register(username, email, password);
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

const authSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
    [register.rejected]: (state, action) => {
      state.isLoggedIn = false;
    }
  }
});

const { reducer } = authSlice;
export default reducer;

// import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
// import { apiSlice } from '../../app/api/apiSlice';

// const usersAdapter = createEntityAdapter({});

// const initialState = usersAdapter.getInitialState();

// export const usersApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     addNewUser: builder.mutation({
//       query: (initialUserData) => ({
//         url: '/users',
//         method: 'POST',
//         body: {
//           ...initialUserData
//         }
//       }),
//       invalidatesTags: [{ type: 'User', id: 'LIST' }]
//     }),
//     verifyUser: builder.mutation({
//       query: (initialUserData) => ({
//         url: '/users/confirm/:confirmationCode',
//         method: 'GET',
//         body: {
//           ...initialUserData
//         }
//       }),
//       invalidatesTags: (result, error, arg) => [{ type: 'Users', code: arg.id }]
//     })
//   })
// });

// export const { useAddNewUserMutation, useVerifyUserMutation } = usersApiSlice;
