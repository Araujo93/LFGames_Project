import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOCAL_URL } from 'react-native-dotenv';

interface IState {
  user: {
    userName: string;
    email: string;
  };
  isAuthenticated: boolean;
}

const initialState: IState = {
  user: {
    userName: '',
    email: '',
  },
  isAuthenticated: false,
};

export const signOutUser = createAsyncThunk(
  'auth/signOutUser',
  async (payload, thunkAPI) => {
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await fetch(`${LOCAL_URL}signout`, {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      let data = await response.json();
      if (response.status === 200) {
        await AsyncStorage.removeItem('token');
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      userName: '',
      email: '',
    },
    isAuthenticated: false,
  },
  reducers: {
    clearState: (state) => {
      state.user = initialState.user;
      state.isAuthenticated = false;
    },
    signIn: (state, body) => {
      const { payload } = body;
      // console.log("CALLING", payload);
      state.user = {
        ...payload,
      };
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signOutUser.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(signOutUser.fulfilled, (state, { payload }) => {
        state.isFetching = false;

        state.isSuccess = true;
        state.isAuthenticated = false;
      })
      .addCase(signOutUser.rejected, (state, payload) => {
        state.isFetching = false;
      });
  },
});

export const { signIn, clearState } = authSlice.actions;
export const authSelector = (state) => state.auth;
// export const userSelector = (state) => state.authInfo.user;
export default authSlice.reducer;
