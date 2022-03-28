// import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View, LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
// import 'react-native-reanimated';
// import {createDrawerNavigator} from '@react-navigation/drawer';
// import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Provider} from 'react-redux';
import {Store} from './src/redux/stores';

import ScreenA from './src/screens/ScreenA';
import ScreenB from './src/screens/ScreenB';
import LoginScreen from './src/screens/login';
import HomeScreen from './src/screens/home';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const Stack = createStackNavigator();
// const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();
// const Tab = createMaterialBottomTabNavigator();
// const Tab = createMaterialTopTabNavigator();
// const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="login"
          screenOptions={{
            headerTitleAlign: 'center',
            headerStyle: {backgroundColor: '#0080ff'},
          }}>
          <Stack.Screen
            name="login"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen name="home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'column',
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#000',
    fontSize: 40,
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'center',
  },
});

export default App;
