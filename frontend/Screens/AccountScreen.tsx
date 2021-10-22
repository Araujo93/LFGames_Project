import React, { useState } from 'react';
import {
  View, Button, Text, StyleSheet,
} from 'react-native';
import { Avatar, BottomSheet, ListItem } from 'react-native-elements';
import { useSelector } from 'react-redux';
import Spacer from '../Components/Spacer';
import { userSelector } from '../redux/NewUserSlice';

const AccountScreen = () => {
  const { email, userName } = useSelector(userSelector);
  const [isVisible, setIsVisible] = useState(false);
  return (
    <View style={styles.container}>
      <Avatar
        containerStyle={styles.avatar}
        size="large"
        rounded
        icon={{ name: 'user', type: 'font-awesome' }}
      />
      <Spacer />
      <Text style={styles.name}>
        Username: {userName}
      </Text>
      <Spacer />
      <Text style={styles.name}>
        Email: {email}
      </Text>
      <Spacer />
      <View style={styles.btn}>
        <Spacer />
        <Button
          title="Edit Account Details"
          onPress={() => setIsVisible(true)}
        />
      </View>

      <BottomSheet isVisible={isVisible} containerStyle={styles.bottomSheet}>
        <ListItem>
          <ListItem.Content>
            <ListItem.Title style={styles.btn}>
              <Button title="change username" onPress={() => {}} />
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem>
          <ListItem.Content>
            <ListItem.Title style={styles.btn}>
              <Button title="change password" onPress={() => {}} />
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem>
          <ListItem.Content>
            <ListItem.Title style={styles.btn}>
              <Button onPress={() => setIsVisible(false)} title="close" />
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#555c63',
    flex: 1,
    alignItems: 'center',
  },
  btn: {
    flex: 1,
    alignSelf: 'center',
  },
  avatar: {
    alignContent: 'center',
    alignSelf: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 20,
  },
  bottomSheet: {
    backgroundColor: 'rgba(85, 92, 99, 0.2)',
    height: 100,
  },
  name: {
    fontSize: 20,
    color: 'white',
  },
});

export default AccountScreen;
