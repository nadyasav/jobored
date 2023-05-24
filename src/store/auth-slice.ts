import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_URL, REQUEST_STATUS, X_SECRET_KEY, userData } from '../constants/constants';
import axios from 'axios';
import { IAuthData, IUserData } from '../types/types';

interface IAuthSlice {
  token: string;
  refreshToken: string;
  authData: IAuthData | null;
  authStatus: string;
}

const initialState: IAuthSlice = {
  token: localStorage.getItem('token') as string | '',
  refreshToken: '',
  authData: null,
  authStatus: '',
};

export const login = createAsyncThunk<IAuthData, IUserData, { rejectValue: string }>(
  'auth/setAuth',
  async (params, { rejectWithValue }) => {
    return await axios
      .get<IAuthData>(`${API_URL}/2.0/oauth2/password`, {
        headers: {
          'x-secret-key': X_SECRET_KEY,
          'X-Api-App-id': userData.client_secret,
        },
        withCredentials: true,
        params: { ...params },
      })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        if (error?.response) {
          return rejectWithValue(error.message);
        } else {
          return rejectWithValue('Something went wrong, please try reloading the page.');
        }
      });
  },
  {
    condition: (_, { getState }) => {
      const { auth } = getState() as { auth: IAuthSlice };

      if (auth.authStatus === REQUEST_STATUS.pending) {
        return false;
      }

      return true;
    },
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.authStatus = REQUEST_STATUS.fulfilled;
      state.authData = action.payload;
      state.token = action.payload.access_token;
      localStorage.setItem('token', action.payload.access_token);
      state.refreshToken = action.payload.refresh_token;
      localStorage.setItem('refreshToken', action.payload.refresh_token);
    });
    builder.addCase(login.pending, (state) => {
      state.authStatus = REQUEST_STATUS.pending;
    });
    builder.addCase(login.rejected, (state, action) => {
      console.log(action.payload);
    });
  },
});
