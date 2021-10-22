// @ts-ignore
import { LOCAL_URL, CLIENT_ID, API_TOKEN } from 'react-native-dotenv';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IGamesService } from '../types/types'

const GameService: IGamesService = {
  addGameToList: () => {},
  getGameDetails: () => {},
};

GameService.addGameToList = async (game) => {
  const token = await AsyncStorage.getItem('token');
  const res = await fetch(`${LOCAL_URL}games`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify(game),
  });
  const data = await res.json();
  return data;
};

GameService.getGameDetails = async (gameDetails) => {
  try {
    const response = await fetch('https://api.igdb.com/v4/games', {
      method: 'POST',
      headers: {
        'Client-ID': `${CLIENT_ID}`,
        Authorization: `Bearer ${API_TOKEN}`,
        'content-type': 'text/plain',
      },
      body: gameDetails,
    });
    const data = await response.json();
    data.forEach((game) => {
      if (game.cover) {
        game.cover.url = `http://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`;
      }
    });
    return data;
  } catch (err) {
    return console.log(err);
  }
};

export default GameService;

