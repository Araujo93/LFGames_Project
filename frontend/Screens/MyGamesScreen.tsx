import React from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image,
} from 'react-native';
import { useSelector } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Feather } from 'react-native-vector-icons';
import { gameSelector } from '../redux/GameSlice';

const MyGamesScreen = () => {
  const { userGames } = useSelector(gameSelector);
  const navigation = useNavigation();

  if (userGames.length < 1) {
    return (
      <SafeAreaView style={styles.container1}>
        <View style={styles.center1}>
          <Image
            source={require('../../assets/Logo.jpeg')}
            style={{
              width: 125, height: 125, borderRadius: 30, marginTop: 50,
            }}
          />
          <Text style={styles.noGameTitle}> No Games Yet</Text>
          <Text style={styles.back}> See all games on Home Screen </Text>

          <TouchableOpacity
            style={styles.btn_style}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={{ color: 'red' }}> Go back Home</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // return for a user game list
  return (
    <SafeAreaView style={styles.container1}>
      <FlatList
        data={userGames}
        keyExtractor={(user, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Details', { id: item.id })}
          >
            <View style={styles.container}>
              <Image
                style={styles.imageStyle}
                source={{
                  uri: item.cover.url,
                }}
              />

              <View style={styles.center}>
                {item.name.length > 25 ? (
                  <Text style={styles.title}>
                    {item.name.slice(0, 26).concat('...')}
                  </Text>
                ) : (
                  <Text style={styles.title}>
                    {' '}
                    {item.name}
                    {' '}
                  </Text>
                )}
                <Text style={styles.text}>
                  {item.platforms[0].name}
                  {' '}
                </Text>
                <Text style={styles.text}>
                  Released:
                  {new Date(item.first_release_date * 1000).toDateString()}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
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
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    borderColor: 'black',
    borderBottomWidth: 1,
  },
  container1: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#555c63',
    justifyContent: 'center',
  },

  imageStyle: {
    height: 100,
    width: 75,
    marginLeft: 10,
    marginTop: 10,
    borderColor: 'black',
    borderWidth: 1,
  },
  noGameTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 10,
    alignSelf: 'center',
    color: 'white',
  },
  move: {
    width: 20,
    marginLeft: 50,
    backgroundColor: '#555c63',
    marginTop: 30,
    height: 50,
  },
  btn_style: {
    marginBottom: 100,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  center: {
    justifyContent: 'center',
  },
  text: {
    marginLeft: 10,
  },
  back: {
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 100,
  },
  center1: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-evenly',
  },
});

export default MyGamesScreen;
