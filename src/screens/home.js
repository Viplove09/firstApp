import React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import ScreenA from './ScreenA';
import ScreenB from './ScreenB';

const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <Tab.Navigator
      barStyle={styles.tabBarStyle}
      screenOptions={({route}) => ({
        header: () => null,
        tabBarIcon: ({focused, size, color}) => {
          let iconName;
          if (route.name === 'Screen_A') {
            iconName = 'ambulance';
            size = focused ? 25 : 20;
            color = focused ? '#00ff00' : '#555';
          } else if (route.name === 'Screen_B') {
            iconName = 'autoprefixer';
            size = focused ? 25 : 20;
            color = focused ? '#00ff00' : '#555';
          }
          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
        tabBarShowIcon: true,
        // tabBarStyle: styles.tabBarStyle,
        tabBarShowLabel: false,
      })}>
      <Tab.Screen
        name="Screen_A"
        component={ScreenA}
        options={{
          // header: () => null,
          tabBarBadge: 3,
        }}
      />
      <Tab.Screen name="Screen_B" component={ScreenB} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    bottom: 25,
    left: 20,
    right: 20,
    elevation: 5,
    backgroundColor: '#000',
    borderRadius: 15,
    height: 60,
    // elevation: 5,
    shadowColor: '#7f5df0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
});

export default HomeScreen;
