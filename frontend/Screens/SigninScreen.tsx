import React, { useState } from 'react';
import { Text, Button, Input } from 'react-native-elements';
import {
  View, SafeAreaView, StyleSheet, Image,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import UserService from '../Services/UserService'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signIn } from '../redux/NewUserSlice'
import { setGames } from '../redux/GameSlice'
const img = require('../../assets/Logo.jpeg');

const SigninScreen = ({ navigation }) => {
  const [userState, setUserState] = useState({
    userName: '',
    email: '',
    password: '',
  });
  const [serverRes, setServerRes] = useState('')

  const dispatch = useDispatch();
  const signInUser = async () => {
    const res = await UserService.signIn(userState);
    if (res.error) {
      setServerRes(res.error);
      return;
    }
    await AsyncStorage.setItem('token', res.token);
    dispatch(signIn(res.user));
    dispatch(setGames(res.games));
  } 

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          source={img}
          style={{
            width: 90,
            height: 90,
            borderRadius: 30,
            alignSelf: 'center',
          }}
        />
        <Text h3 h3Style={styles.headerTitle}>
          Sign In
        </Text>
        <Input
          leftIcon={{ type: 'font-awesome', name: 'user' }}
          label="username"
          placeholder="John Doe"
          value={userState.userName}
          onChangeText={(userName) => setUserState({ ...userState, userName })}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          leftIcon={{ type: 'font-awesome', name: 'envelope-square' }}
          label="Email Address"
          placeholder="email@example.com"
          value={userState.email}
          onChangeText={(email) => setUserState({
            ...userState,
            email,
          })}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          label="Password"
          placeholder="Password"
          value={userState.password}
          onChangeText={(password) => setUserState({ ...userState, password })}
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry
        />
        {<Text style={styles.error}>{serverRes}</Text>}
        <Button
          title="Sign In"
          onPress={signInUser}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('signUp')}
        >
          <Text style={styles.link}>Dont have an account? Go to Register!</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: '#dbeaff',
    flex: 1,
  },
  link: {
    color: '#2e7eff',
    width: 200,
    alignSelf: 'center',
    marginTop: 10,
  },
  error: {
    fontSize: 18,
    alignSelf: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    alignSelf: 'center',
    marginBottom: 50,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
});

export default SigninScreen;
