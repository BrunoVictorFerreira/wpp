/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type { Node } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { io } from "socket.io-client";
const socket = io("http://localhost:3000");
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ChangeACurrentUser from "./src/screens/ChangeACurrentUser"
import Feed from "./src/screens/Feed"
import IndividualMessage from "./src/screens/IndividualMessage"
import AllUsers from "./src/screens/AllUsers"

const App: () => Node = () => {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ChangeACurrentUser">
        <Stack.Screen name="ChangeACurrentUser" component={ChangeACurrentUser} />
        <Stack.Screen name="Feed" component={Feed} />
        <Stack.Screen name="IndividualMessage" component={IndividualMessage} />
        <Stack.Screen name="AllUsers" component={AllUsers} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
