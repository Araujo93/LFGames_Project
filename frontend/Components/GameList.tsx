import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import GameShow from './GameShow';
import GameService from '../Services/GameService';
import { addGame } from '../redux/GameSlice'
import { useDispatch } from 'react-redux';

const GameList = ({
  games,
  navigation,
}) => {

  const dispatch = useDispatch();
  const [serverRes, setServerRes] = useState('');

  const addToList = async (game) => {
    const res = await GameService.addGameToList(game);
    dispatch(addGame(game));
    if (res.error) setServerRes(res.error);
    else setServerRes('Game added to list!');
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Text style={styles.error}>{serverRes}</Text>
      <FlatList
        data={games}
        keyExtractor={(game, index) => `A${index.toString()}`}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Details', { id: item.id })}
          >
            <GameShow
              game={item}
              addGameToList={() => addToList(item)}
            />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  error: {
    fontSize: 16,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
});

export default GameList;
