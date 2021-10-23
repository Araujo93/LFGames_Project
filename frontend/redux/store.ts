import { configureStore } from '@reduxjs/toolkit';
import { gameSlice } from './GameSlice';
import { userSlice } from './UserSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authSlice } from './NewUserSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    game: gameSlice.reducer,
    user: userSlice.reducer,
  },
});

setupListeners(store.dispatch);
