import { createSlice } from '@reduxjs/toolkit';
import { IGameState } from '../types/types';

const initialState: IGameState = {
  userGames: []
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    clearGameState: (state) => {
      state.userGames = [];
    },
    setGames: (state, body) => {
      const { payload } = body;
      state.userGames = [
        ...payload.games
      ];
    },
    addGame: (state, body) => {
      const { payload } = body;
      state.userGames = [
        payload,
        ...state.userGames
      ];
    },
  },
});

export const { clearGameState, setGames, addGame } = gameSlice.actions;

export const gameSelector = (state) => state.game;
