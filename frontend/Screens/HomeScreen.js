import React, { useEffect, useState } from "react";
import { CLIENT_ID, API_TOKEN } from "@env";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Input } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import { MaterialCommunityIcons, AntDesign } from "react-native-vector-icons";
import { getMyGameInfo } from "../redux/GameSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getGameInfo } from "../redux/FetchCalls.js/GameApi.js/GameFetch";
// import { gamepad } from "react-native-vector-icons/FontAwesome";
import { gameSelector } from "../redux/GameSlice";

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import GameList from "../Components/GameList";
import { authSelector, clearState, signUp } from "../redux/AuthSlice";

import { fetchUserByToken } from "../redux/UserSlice";
const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [games, setGames] = useState([]);

  const [text, setText] = useState("");
  // const { isSuccess, isError, errorMessage, token } = useSelector(authSelector);
  const { isFetching, isAuthenticated, isSuccess } = useSelector(authSelector);
  const { userGames } = useSelector(gameSelector);
  useEffect(() => {
    fetchUser();
  }, [isAuthenticated, isSuccess]);

  const fetchUser = async () => {
    try {
      const token = dispatch(
        fetchUserByToken({ token: await AsyncStorage.getItem("token") })
      );
      if (token) {
        await AsyncStorage.setItem("token", token.arg.token);
      }
      await getAllGames(token.arg.token);
    } catch (err) {
      console.log("errror token app", err.message);
    }
  };
  const getAllGames = async (token) => {
    dispatch(getMyGameInfo(token));
  };

  useEffect(() => {
    getInfo(
      "fields name, summary, genres.name, rating, first_release_date, game_modes.name, storyline, platforms.name, cover.url, cover.image_id; where release_dates.platform = (6, 48, 55, 167, 169, 49); limit 200;"
    );
  }, []);

  const getInfo = async (Mbody) => {
    const res = await getGameInfo(Mbody);
    setGames(res);
  };

  //GET games for platforms
  const getGamesForPlatform = async (Mbody) => {
    try {
      const response = await fetch("https://api.igdb.com/v4/" + "games", {
        method: "POST",
        headers: {
          "Client-ID": `${CLIENT_ID}`,
          Authorization: `Bearer ${API_TOKEN}`,
          "content-type": "text/plain",
        },
        body: Mbody,
      });
      const data = await response.json();
      data.map((game) => {
        if (game.cover) {
          game.cover.url = `http://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`;
        } else {
          game.cover = {
            url: "http://example.com",
          };
        }
      });
      setGames(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = async (value) => {
    try {
      const response = await fetch("https://api.igdb.com/v4/" + "games", {
        method: "POST",
        headers: {
          "Client-ID": `${CLIENT_ID}`,
          Authorization: `Bearer ${API_TOKEN}`,
          "content-type": "text/plain",
        },
        body: `fields name, summary,slug, genres.name, total_rating, first_release_date, game_modes.name, storyline, platforms.name, cover.url, cover.image_id; where slug = "${value}";`,
      });
      const data = await response.json();
      data.map((game) => {
        if (game.cover) {
          game.cover.url = `http://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`;
        } else {
          game.cover = {
            url: "http://example.com",
          };
        }
      });
      // setGames(data);
    } catch (err) {
      console.log(err);
    }
  };
  // Sets up buton on right side of header
  const icon = <AntDesign name="search1" size={24} />;
  return (
    <>
      {isFetching ? (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      ) : (
        // Sets up buton on right side of header
        (React.useLayoutEffect(() => {
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
                    onSelect={() =>
                      getGamesForPlatform(
                        "fields *, platforms.name, cover.url, cover.image_id; where release_dates.platform = 6; limit 200;"
                      )
                    }
                    text="PC"
                  />
                  <MenuOption
                    onSelect={() =>
                      getGamesForPlatform(
                        "fields *, platforms.name, cover.url, cover.image_id; where release_dates.platform = 49; limit 200;"
                      )
                    }
                    text="Xbox"
                  />
                  <MenuOption
                    onSelect={() =>
                      getGamesForPlatform(
                        "fields *, platforms.name, cover.url, cover.image_id; where release_dates.platform = 48; limit 200;"
                      )
                    }
                    text="Ps4"
                  />
                  <MenuOption
                    onSelect={() =>
                      getGamesForPlatform(
                        "fields *, platforms.name, cover.url, cover.image_id; where release_dates.platform = 167; limit 200;"
                      )
                    }
                    text="Ps5"
                  />
                  <MenuOption
                    onSelect={() =>
                      getGamesForPlatform(
                        "fields *, platforms.name, cover.url, cover.image_id; where release_dates.platform = 169; limit 200;"
                      )
                    }
                    text="Xbox X"
                  />
                  <MenuOption
                    onSelect={() =>
                      getGamesForPlatform(
                        "fields name, summary, id, platforms.name, cover.url, cover.image_id; where release_dates.platform = 55; limit 200;"
                      )
                    }
                    text="Mobile"
                  />
                </MenuOptions>
              </Menu>
            ),
          });
        }, [navigation]),
        (
          <View style={{ flex: 1, backgroundColor: "#555c63" }}>
            <Input
              placeholder="Search..."
              leftIcon={icon}
              onSubmitEditing={(value) => handleSearch(value)}
            ></Input>

            <GameList
              // token={token}
              navigation={navigation}
              games={games}
              userGames={userGames}
            />
          </View>
        ))
      )}
    </>
  );
};

const styles = StyleSheet.create({
  icon: {
    paddingRight: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

export default HomeScreen;
