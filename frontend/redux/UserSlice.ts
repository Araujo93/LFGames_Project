import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LOCAL_URL } from 'react-native-dotenv';
import AsyncStorage from '@react-native-async-storage/async-storage';

const URL = LOCAL_URL;

export const fetchUserByToken = createAsyncThunk(
  'user/fetchUserByToken',
  async (thunkAPI) => {
    const token = await AsyncStorage.getItem('token')
    try {
      const response = await fetch(`${URL}user`, {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.status === 200) return data;
      return thunkAPI.rejectWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userName: '',
    email: '',

    token: '',
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserByToken.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchUserByToken.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.email = payload.user.email;
        state.userName = payload.user.userName;
        state.token = payload.token;
      })
      .addCase(fetchUserByToken.rejected, (state) => {
        state.isFetching = false;
        state.isError = true;
      });
  },
});

export const userSelector = (state) => state.user;
