import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, TextInput, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SQLite from 'react-native-sqlite-storage';
import PushNotification from 'react-native-push-notification';

import {useSelector, useDispatch} from 'react-redux';
import {setName, setAge} from '../redux/actions';

import TestButton from '../utils/customButton';

const db = SQLite.openDatabase(
  {
    name: 'MainDB',
    location: 'default',
  },
  () => {
    console.log('Success');
  },
  error => {
    console.log(error);
  },
);

const LoginScreen = ({navigation, route}) => {
  const {Name, Age} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  // const [Name, setName] = useState ('');
  // const [Age, setAge] = useState('');

  useEffect(() => {
    createTable();
    getData();
    createChannels();
  }, []);

  const createChannels = () => {
    PushNotification.createChannel({
      channelId: 'test-channel',
      channelName: 'test-channel',
    });
  };

  const createTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS ' +
          'Users ' +
          '(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Age INTEGER)',
        [],
        msg => {
          console.log('create success');
        },
        error => {
          console.log(error);
        },
      );
    });
  };

  const setData = () => {
    if (Name.length === 0) {
      Alert.alert('Warning!', 'Enter a Name');
    } else {
      dispatch(setName(Name));
      dispatch(setAge(Age));
      // try {
      // const obj = {
      //   name: Name,
      // };
      // await AsyncStorage.setItem('UserName', JSON.stringify(obj));

      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO Users (Name,Age) VALUES (?,?)',
          [Name, Age],
          success => {
            console.log('Insert Success');
          },
          error => {
            console.log(error);
          },
        );
      });
      navigation.replace('home');
      // } catch (error) {
      //   console.log(error);
      // }
    }
  };

  const getData = () => {
    try {
      // const value = await AsyncStorage.getItem('UserName');
      // if (value) {
      //   navigation.navigate('home');
      // }
      db.transaction(tx => {
        tx.executeSql(
          'SELECT Name, Age from Users',
          [],
          (tx, results) => {
            let len = results.rows.length;
            if (len > 0) {
              navigation.replace('home');
            }
          },
          error => {
            console.log(error);
          },
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.body}>
      <Image
        style={styles.logo}
        source={require('../../assets/bg_shapes.jpg')}
      />
      {/* <Text style={styles.text}>Async Storage</Text> */}
      {/* <Text style={styles.text}>SQLite Storage</Text> */}
      <Text style={styles.text}>Redux</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        onChangeText={value => {
          // setName(value);
          dispatch(setName(value));
        }}
      />
      <TextInput
        style={[styles.input, {marginTop: 0}]}
        placeholder="Enter your age"
        onChangeText={value => {
          // setAge(value);
          dispatch(setAge(value));
        }}
      />
      <TestButton
        title="Login"
        onPressFunction={setData}
        color="#00ff00"
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#0080ff',
  },
  button: {
    margin: 10,
  },
  logo: {
    width: 100,
    height: 100,
    margin: 20,
  },
  text: {
    fontSize: 20,
    color: '#fff',
  },
  input: {
    width: 300,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 10,
    backgroundColor: '#fff',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 130,
    marginBottom: 20,
  },
});

export default LoginScreen;
