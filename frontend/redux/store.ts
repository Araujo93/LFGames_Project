import { configureStore } from '@reduxjs/toolkit';
import { gameSlice } from './GameSlice';
import { userSlice } from './NewUserSlice';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    authInfo: userSlice.reducer,
    game: gameSlice.reducer,
  },
});

setupListeners(store.dispatch)
