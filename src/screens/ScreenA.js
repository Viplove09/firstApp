import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  NativeModules,
  DeviceEventEmitter,
  NativeEventEmitter,
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import {useSelector, useDispatch} from 'react-redux';
import {setName, setAge, increaseAge, setSpeechToText} from '../redux/actions';
import {checkPermissions} from '../utils/checkPermissions';

import TestButton from '../utils/customButton';
import globalStyle from '../utils/globalStyle';

const db = SQLite.openDatabase(
  {
    name: 'MainDB',
    location: 'default',
  },
  () => {},
  error => {
    console.log(error);
  },
);

const onTestEvent = event => {
  console.log(event);
};

const nativeEmitter = new NativeEventEmitter(NativeModules.CalendarModule);

nativeEmitter.addListener('testEvent', onTestEvent);

const onRecognizingEvent = event => {
  console.log('recognizing', event);
};

nativeEmitter.addListener('recognizingEvent', onRecognizingEvent);

const onRecognizedEvent = event => {
  console.log('recognized', event);
};

nativeEmitter.addListener('recognizedEvent', onRecognizedEvent);

function ScreenA({navigation}) {
  const Users = [
    {id: 1, name: 'User A'},
    {id: 2, name: 'User B'},
    {id: 3, name: 'User C'},
  ];

  const [User, setUser] = useState('');

  // const [Name, setName] = useState('');
  // const [Age, setAge] = useState('');
  const {Name, Age, SpeechToTextRunning} = useSelector(
    state => state.userReducer,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    try {
      // const value = await AsyncStorage.getItem('UserName');
      // if (value) {
      //   let user = JSON.parse(value);
      //   setName(user.name);
      //   setAge(user.age);
      // }
      db.transaction(tx => {
        tx.executeSql(
          'SELECT Name, Age from Users',
          [],
          (tx, results) => {
            let len = results.rows.length;
            if (len > 0) {
              // setName(results.rows.item(0).Name);
              // setAge(results.rows.item(0).Age);
              dispatch(setName(results.rows.item(0).Name));
              dispatch(setAge(results.rows.item(0).Age));
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

  const updateData = () => {
    const obj = {
      name: Name,
      age: Age,
    };
    if (Name.length === 0) {
      Alert.alert('Warning!', 'Enter a Name');
    } else {
      try {
        // await AsyncStorage.setItem('UserName', JSON.stringify(obj));
        // Alert.alert('Success', 'Your data has been updated!');
        db.transaction(tx => {
          tx.executeSql(
            'UPDATE Users SET Name=?',
            [Name],
            results => {
              console.log(results);
              Alert.alert('Success', 'Your data has been updated!');
            },
            error => {
              console.log(error);
            },
          );
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const removeData = () => {
    try {
      // await AsyncStorage.removeItem('UserName');
      // await AsyncStorage.clear();
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM Users',
          [],
          res => {
            navigation.navigate('login');
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

  const {CalendarModule} = NativeModules;

  const nativeCall = async () => {
    if (SpeechToTextRunning) {
      //stop recognition here
      CalendarModule.stopRecognition(res => {
        if (res != 0) {
          console.error('Stopping failed');
          return;
        }
      });
    } else {
      console.warn('here comes the big show');
      CalendarModule.createCalendarEvent('testName', 'testLocation', res => {
        console.log(res);
      });

      const permsObtained = await checkPermissions();
      if (permsObtained === 0) {
        console.log('where perms?');
        return;
      }
      CalendarModule.createRecognizer(
        '', //insert secret key here
        '', //insert location here
        (code, s, e) => {
          if (code === 1) {
            console.error('Recognizer init failed');
            return;
          }
          if (code > 1) {
            console.log('>! was sent', s, e);
          }
          if (code === 0) {
            console.log('0 was sent');
          }
        },
      );

      //Start recognition
      CalendarModule.startRecognition(res => {
        if (res != 0) {
          console.error('Starting failed');
          return;
        }
      });
    }
    //update State
    dispatch(setSpeechToText(SpeechToTextRunning));
  };

  const onPressHandler = () => {
    // navigation.navigate('Screen_B');
    // navigation.replace('Screen_B');
    // navigation.navigate('Screen_B', {ItemName: 'Testing data', ItemID: '12'});
    // navigation.navigate('Screen_B');
    for (let user of Users) {
      setUser(user.name);
    }
  };
  return (
    <View style={styles.body}>
      <Text style={[globalStyle.CustomFont, styles.text]}>welcome {Name}</Text>
      <Text style={[globalStyle.CustomFont, styles.text]}>
        Your age is {Age}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={Name}
        onChangeText={value => {
          // setName(value);
          dispatch(setName(value));
        }}
      />
      <TestButton
        title="Update"
        color="#ff7f00"
        // onPressFunction={onPressHandler}
        onPressFunction={updateData}
      />
      <TestButton
        title="Increase"
        color="#0ff"
        onPressFunction={() => {
          dispatch(increaseAge());
        }}
        style={{margin: 10}}
      />
      <TestButton
        title="Remove"
        color="#f40100"
        onPressFunction={removeData}
        style={{margin: 10}}
      />
      <TestButton
        title="Call Native"
        // color={recognizing ? '#ff00ff' : '#00ff00'}
        onPressFunction={nativeCall}
        style={SpeechToTextRunning ? styles.purple : styles.green}
      />
      <Text style={styles.bodyText}>{User}</Text>
    </View>
  );
}

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
    fontSize: 35,
    // fontWeight: 'bold',
    margin: 10,
    textAlign: 'center',
  },
  bodyText: {
    color: '#000',
    fontSize: 20,
    margin: 10,
    fontFamily: 'Montserrat-BoldItalic',
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
  purple: {
    margin: 10,
    backgroundColor: '#ff00ff',
  },
  green: {
    margin: 10,
    backgroundColor: '#00ff00',
  },
});

export default ScreenA;
