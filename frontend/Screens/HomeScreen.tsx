import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Input } from 'react-native-elements';
import { useDispatch } from 'react-redux';
// @ts-ignore
import { MaterialCommunityIcons, AntDesign } from 'react-native-vector-icons';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import GameService from '../Services/GameService';

import GameList from '../Components/GameList';

const HomeScreen = ({ navigation }) => {
  const [games, setGames] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const getInfo = async (Mbody) => {
    const res = await GameService.getGameDetails(Mbody);
    setGames(res);
  };

  useEffect(() => {
    getInfo(
      'fields name, summary, genres.name, rating, first_release_date, game_modes.name, storyline, platforms.name, cover.url, cover.image_id; where release_dates.platform = (6, 48, 55, 167, 169, 49); limit 200;',
    );
  }, []);

  const handleSearch = async () => {
    if (searchValue) {
      const re = new RegExp(searchValue, 'i');
      const filteredGames = games.filter((game) => re.test(game.name));
      setGames(filteredGames);
      setSearchValue('');
    }
  };

  const icon = <AntDesign name="search1" size={24} />;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Menu>
          <MenuTrigger>
            <MaterialCommunityIcons
              name="controller-classic"
              size={26}
              style={styles.icon}
            />
          </MenuTrigger>
          <MenuOptions>
            <MenuOption
              onSelect={() => getInfo(
                'fields name, summary, genres.name, rating, first_release_date, game_modes.name, storyline, platforms.name, cover.url, cover.image_id; where release_dates.platform = (6, 48, 55, 167, 169, 49); limit 200;',
              )}
              text='all'
            />
            <MenuOption
              onSelect={() => getInfo(
                'fields *, platforms.name, cover.url, cover.image_id; where release_dates.platform = 6; limit 200;',
              )}
              text="PC"
            />
            <MenuOption
              onSelect={() => getInfo(
                'fields *, platforms.name, cover.url, cover.image_id; where release_dates.platform = 49; limit 200;',
              )}
              text="Xbox"
            />
            <MenuOption
              onSelect={() => getInfo(
                'fields *, platforms.name, cover.url, cover.image_id; where release_dates.platform = 48; limit 200;',
              )}
              text="Ps4"
            />
            <MenuOption
              onSelect={() => getInfo(
                'fields *, platforms.name, cover.url, cover.image_id; where release_dates.platform = 167; limit 200;',
              )}
              text="Ps5"
            />
            <MenuOption
              onSelect={() => getInfo(
                'fields *, platforms.name, cover.url, cover.image_id; where release_dates.platform = 169; limit 200;',
              )}
              text="Xbox X"
            />
            <MenuOption
              onSelect={() => getInfo(
                'fields name, summary, id, platforms.name, cover.url, cover.image_id; where release_dates.platform = 55; limit 200;',
              )}
              text="Mobile"
            />
          </MenuOptions>
        </Menu>
      ),
    });
  }, [navigation]);

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#555c63' }}>
        <Input
          placeholder="search"
          leftIcon={icon}
          onChangeText={(text) => setSearchValue(text)}
          onSubmitEditing={() => handleSearch()}
          value={searchValue}
        />

        <GameList navigation={navigation} games={games} />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  icon: {
    paddingRight: 20,
  },
});

export default HomeScreen;
