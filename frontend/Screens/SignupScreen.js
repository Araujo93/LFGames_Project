import React, { useState, useEffect } from "react";
import { Text, Button, Input } from "react-native-elements";
import { View, SafeAreaView, StyleSheet, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { authSelector, signUp } from "../redux/AuthSlice";
import { TouchableOpacity } from "react-native-gesture-handler";

const SignupScreen = ({ navigation }) => {
  const [userState, setState] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
  });
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const dispatch = useDispatch();
  const { errorMessage } = useSelector(authSelector);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image source={require("../../assets/Logo.jpeg")} style={styles.logo} />
        <Text h3 h3Style={styles.headerTitle}>
          Create New Account
        </Text>
        <Input
          leftIcon={{ type: "font-awesome", name: "user" }}
          label="Username"
          placeholder="John Doe"
          value={userState.userName}
          onChangeText={(userName) => setState({ ...userState, userName })}
          autoCapitalize="none"
          autoCorrect={false}
          required
        />
        <Input
          leftIcon={{ type: "font-awesome", name: "envelope-square" }}
          label="Email Address"
          placeholder="email@example.com"
          value={userState.userEmail}
          onChangeText={(userEmail) => setState({ ...userState, userEmail })}
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
            setState({ ...userState, userPassword })
          }
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry
          required
        />
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
        {reg.test(userState.userEmail) !== true ? (
          <Button disabled title="Sign Up" />
        ) : (
          <Button title="Sign Up" onPress={() => dispatch(signUp(userState))} />
        )}
        <TouchableOpacity onPress={() => navigation.push("signIn")}>
          <Text style={styles.link}>
            {" "}
            Already have an account? Go to Sign In page!
          </Text>
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
  logo: {
    width: 90,
    height: 90,
    borderRadius: 30,
    alignSelf: "center",
  },
});

export default SignupScreen;
