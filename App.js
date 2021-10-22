import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { MenuProvider } from "react-native-popup-menu";
import HomeScreen from "./frontend/Screens/HomeScreen";
import GameDetailScreen from "./frontend/Screens/GameDetailsScreen";
import SignupScreen from "./frontend/Screens/SignupScreen";
import SigninScreen from "./frontend/Screens/SigninScreen";
import MyGamesScreen from "./frontend/Screens/MyGamesScreen";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from "react-redux";
import { authSelector, userSelector } from "./frontend/redux/NewUserSlice";
import { store } from './frontend/redux/store';
import { useSelector, useDispatch } from "react-redux";
import AccountScreen from "./frontend/Screens/AccountScreen";

const Auth = createNativeStackNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const isFetching = false;

const AuthStack = () => (
  <Auth.Navigator>
    <Auth.Screen
      name="signIn"
      component={SigninScreen}
      options={{ headerShown: false }}
    />
    <Auth.Screen
      name="signUp"
      component={SignupScreen}
      options={{ headerShown: false }}
    />
  </Auth.Navigator>
);

const DrawerStack = () => (
  <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
    <Drawer.Screen
      name="Home"
      component={HomeScreen}
      options={{ title: "Games" }}
    />
    <Drawer.Screen name="myGames" component={MyGamesScreen} />
    <Drawer.Screen name="Account" component={AccountScreen} />

  </Drawer.Navigator>
);

const CustomDrawer = (props) => {
  const dispatch = useDispatch();
  const { email, userName, token } = useSelector(userSelector);
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View
          style={styles.custom_drawer}
        >
          <Image
            source={require("./assets/Logo.jpeg")}
            style={{ width: 80, height: 80, borderRadius: 30 }}
          />
<<<<<<< HEAD
          <View> 
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>{userName}</Text>
          
=======
          <View>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>{userName}</Text>

>>>>>>> 15a6fc3b596094b7cbbfb333ca1ddff2dc8f7b14
          <Text>{email}</Text>

          </View>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 50,
          right: 0,
          left: 0,
          backgroundColor: "#f6f6f6",
          padding: 20,
        }}
      >
        <Text> Logout</Text>
      </TouchableOpacity>
    </View>
  );
};
function App() {
<<<<<<< HEAD
  const {  isFetching, isAuthenticated } = useSelector(authSelector);
=======
  const isAuthenticated = useSelector(authSelector);
>>>>>>> 15a6fc3b596094b7cbbfb333ca1ddff2dc8f7b14
  return (
    <SafeAreaProvider>
    <MenuProvider>
      <NavigationContainer>
        {isFetching ? (
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#00ff00" />
          </View>
        ) : (
          <Stack.Navigator>
            {!isAuthenticated ? (
              <Stack.Screen
                options={{ headerShown: false }}
                name="auth"
                component={AuthStack}
              />
            ) : (
              <Stack.Screen
                name="drawer"
                component={DrawerStack}
                options={{ headerShown: false }}

              />
            )}
            <Stack.Screen name="Details" component={GameDetailScreen} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </MenuProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  custom_drawer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
