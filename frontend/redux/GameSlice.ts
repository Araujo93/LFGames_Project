import { createSlice } from '@reduxjs/toolkit';
import { IGameState } from '../types/types';

const initialState: IGameState = {
  userGames: [],
  isSuccess: false,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    clearGameState: (state) => {
      state.userGames = [];
      state.isSuccess = false;
    },
    setGames: (state, body) => {
      const { payload } = body;
      state.userGames = [...payload.games];
    },
    addGame: (state, body) => {
      const { payload } = body;
      if (payload.error) return;
      // console.log('PAYLOAD', payload);
      state.userGames = [payload, ...state.userGames];
      state.isSuccess = true;
    },
  },
});

export const { clearGameState, setGames, addGame } = gameSlice.actions;

export const gameSelector = (state) => state.game;
