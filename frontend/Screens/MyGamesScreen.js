import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import {
  clearGameState,
  gameSelector,
  gameSlice,
  getGameInfo,
} from "../redux/GameSlice";
import { useSelector, useDispatch } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import GameShow from "../Components/GameShow";
import { authSelector } from "../redux/AuthSlice";
import { useNavigation } from "@react-navigation/native";
import { addGame } from "../redux/GameSlice";
import Spacer from "../Components/Spacer";
import { AntDesign, Feather } from "react-native-vector-icons";

const MyGamesScreen = (game, route) => {
  const { userGames } = useSelector(gameSelector);
  const { token, isSuccess } = useSelector(authSelector);
  const navigation = useNavigation();
  // const { id } = route.params;

  const [myGames, setMyGames] = useState([]);
  useEffect(() => {
    setMyGames(userGames);
  }, [isSuccess]);
  return (
    <SafeAreaView style={styles.container1}>
      {userGames.length < 1 ? (
        <View style={styles.center1}>
          <Image
            source={require("../../assets/Logo.jpeg")}
            style={{ width: 125, height: 125, borderRadius: 30, marginTop: 50 }}
          />
          <Text style={styles.noGameTitle}> No Games Yet</Text>
          <Spacer />
          <Text style={styles.back}> See all games on Home Screen </Text>

          <TouchableOpacity
            style={styles.btn_style}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={{ color: "red" }}> Go back Home</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={userGames}
          keyExtractor={(index) => index.toString()}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Details", { id: item.gameId })
                }
              >
                <View style={styles.container}>
                  <Image
                    style={styles.imageStyle}
                    source={{
                      uri: item.cover.url,
                    }}
                  ></Image>
                  <View style={styles.center}>
                    {item.name.length > 25 ? (
                      <Text style={styles.title}>
                        {item.name.slice(0, 26).concat("...")}
                      </Text>
                    ) : (
                      <Text style={styles.title}> {item.name} </Text>
                    )}
                    <Text style={styles.text}>{item.platforms[0].name} </Text>
                    <Text style={styles.text}>
                      Released:
                      {new Date(item.first_release_date * 1000).toDateString(
                        "en-US"
                      )}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Text>completed: </Text>
                      {!item.completed ? (
                        <Feather name="x" size={26} />
                      ) : (
                        <AntDesign name="checkmark-circle" size={26} />
                      )}
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    borderColor: "black",
    borderBottomWidth: 1,
  },
  container1: {
    flexDirection: "row",
    flex: 1,
    backgroundColor: "#555c63",
    justifyContent: "center",
    backgroundColor: "#555c63",
  },

  imageStyle: {
    height: 100,
    width: 75,
    marginLeft: 10,
    marginTop: 10,
    borderColor: "black",
    borderWidth: 1,
  },
  noGameTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 10,
    alignSelf: "center",
    color: "white",
  },
  move: {
    width: 20,
    marginLeft: 50,
    backgroundColor: "#555c63",
    marginTop: 30,
    height: 50,
  },
  btn_style: {
    marginBottom: 100,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },
  center: {
    justifyContent: "center",
  },
  text: {
    marginLeft: 10,
  },
  back: {
    color: "red",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 100,
  },
  center1: {
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-evenly",
  },
});

export default MyGamesScreen;
