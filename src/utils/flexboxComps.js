import React, {useState} from 'react';
import {StyleSheet, Text, useColorScheme, View} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const flexBoxFlex = () => {
  // const isDarkMode = useColorScheme() === 'dark';
  const isDarkMode = true;

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [counter, setCounter] = useState({clicks: 0, value: 0});

  const onClickHandler = () => {
    setCounter({clicks: counter.clicks + 1, value: counter.value + 5});
  };

  return (
    <View style={styles.body}>
      <View style={styles.view1}>
        <View style={styles.subView1}>
          <Text style={styles.text}>1</Text>
        </View>
        <View style={styles.subView2}>
          <Text style={styles.text}>2</Text>
        </View>
        <View style={styles.subView3}>
          <Text style={styles.text}>3</Text>
        </View>
      </View>
      <View style={styles.view2}>
        <Text style={styles.text}>4</Text>
      </View>
      <View style={styles.view3}>
        <Text style={styles.text}>5</Text>
      </View>
      <View style={styles.view4}>
        <View style={styles.subView4}>
          <Text style={styles.text}>6</Text>
        </View>
        <View style={styles.subView5}>
          <Text style={styles.text}>7</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#000',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  view1: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#000',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  view2: {
    flex: 1,
    // width: 100,
    // height: 100,
    backgroundColor: '#ff0000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view3: {
    flex: 1,
    // width: 100,
    // height: 100,
    backgroundColor: '#0f0f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view4: {
    flex: 6,
    // width: 100,
    // height: 100,
    flexDirection: 'row',
    backgroundColor: '#000',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  subView1: {
    flex: 1,
    backgroundColor: '#0fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subView2: {
    flex: 2,
    backgroundColor: '#ff00ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subView3: {
    flex: 3,
    backgroundColor: '#ff0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subView4: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subView5: {
    flex: 1,
    backgroundColor: '#00ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#000',
    fontSize: 20,
    fontStyle: 'italic',
    margin: 10,
  },
});

export default flexBoxFlex;
