import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome";

import { Text, Button, Input } from "react-native-elements";
import { View, SafeAreaView, StyleSheet, Image } from "react-native";
import { authSelector } from "../redux/AuthSlice";
import { useSelector, useDispatch } from "react-redux";
import { signInUser } from "../redux/AuthSlice";
import { TouchableOpacity } from "react-native-gesture-handler";

const SigninScreen = ({ navigation }) => {
  const [userState, setUserState] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
  });
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const { errorMessage } = useSelector(authSelector);

  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          source={require("../../assets/Logo.jpeg")}
          style={{
            width: 90,
            height: 90,
            borderRadius: 30,
            alignSelf: "center",
          }}
        />
        <Text h3 h3Style={styles.headerTitle}>
          Sign In
        </Text>
        <Input
          leftIcon={{ type: "font-awesome", name: "user" }}
          label="username"
          placeholder="John Doe"
          value={userState.userName}
          onChangeText={(userName) => setUserState({ ...userState, userName })}
          autoCapitalize="none"
          autoCorrect={false}
          required
        />
        <Input
          leftIcon={{ type: "font-awesome", name: "envelope-square" }}
          label="Email Address"
          placeholder="email@example.com"
          value={userState.userEmail}
          onChangeText={(userEmail) =>
            setUserState({
              ...userState,
              userEmail,
            })
          }
          autoCapitalize="none"
          autoCorrect={false}
          required
        />
        <Input
          leftIcon={{ type: "font-awesome", name: "lock" }}
          label="Password"
          placeholder="Password"
          value={userState.userPassword}
          onChangeText={(userPassword) =>
            setUserState({ ...userState, userPassword })
          }
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry
        />
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
        {reg.test(userState.userEmail) !== true ? (
          <Button disabled title="Sign In" />
        ) : (
          <Button
            title="Sign In"
            onPress={() => dispatch(signInUser(userState))}
          />
        )}
        <TouchableOpacity
          title="Sign Up"
          onPress={() => navigation.navigate("signUp")}
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
    backgroundColor: "#dbeaff",
    flex: 1,
  },
  link: {
    color: "#2e7eff",
    width: 200,
    alignSelf: "center",
    marginTop: 10,
  },
  error: {
    fontSize: 18,
    alignSelf: "center",
    marginBottom: 20,
  },
  headerTitle: {
    alignSelf: "center",
    marginBottom: 50,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
});

export default SigninScreen;
