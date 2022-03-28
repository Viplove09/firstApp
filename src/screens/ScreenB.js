import React, {useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import TestButton from '../utils/customButton';
import PushNotification from 'react-native-push-notification';

import {useSelector, useDispatch} from 'react-redux';
import {getCities} from '../redux/actions';
import {TouchableOpacity} from 'react-native-gesture-handler';

function ScreenB({navigation, route}) {
  const {Name, Age, Cities} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCities());
  }, []);

  // const {ItemName, ItemID} = route.params;
  const onPressHandler = () => {
    // navigation.navigate('Screen_A');
    // navigation.goBack();
    // navigation.replace('Screen_A');
    // navigation.setParams({ItemID: 14});
    navigation.navigate('Screen_A');
  };

  const handleNotification = item => {
    PushNotification.localNotification({
      channelId: 'test-channel',
      title: `You clicked on ${item.country}`,
      message: item.city,
    });
  };
  return (
    <View style={styles.body}>
      <Text style={styles.text}>REST API</Text>
      <FlatList
        data={Cities}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              handleNotification(item);
            }}>
            <View style={styles.item}>
              <Text style={styles.title}>{item.country}</Text>
              <Text style={styles.subtitle}>{item.city}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    color: '#000',
    fontSize: 40,
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 5,
    margin: 7,
    width: 350,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    margin: 10,
  },
  subtitle: {
    fontSize: 20,
    margin: 10,
    color: '#999',
  },
});

export default ScreenB;
