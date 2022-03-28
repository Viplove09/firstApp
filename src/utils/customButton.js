import React from 'react';
import {StyleSheet, Pressable, Text} from 'react-native';

const TestButton = props => {
  {
    /* <Button
            title={Submitted ? 'Clear' : 'Submit'}
            onPress={onPressHandler}
        /> */
    /* <TouchableOpacity
            onPress={onPressHandler}
            style={styles.button}
            activeOpacity={0.5}>
            <Text style={styles.text}>{Submitted ? 'Clear' : 'Submit'}</Text>
        </TouchableOpacity> */
    /* <TouchableHighlight
            onPress={onPressHandler}
            style={styles.button}
            underlayColor={'#0ff'}>
            <Text style={styles.text}>{Submitted ? 'Clear' : 'Submit'}</Text>
        </TouchableHighlight> */
  }
  return (
    <Pressable
      onPress={props.onPressFunction}
      // onLongPress={onPressHandler}
      android_ripple={{color: '#00ff'}}
      hitSlop={{top: 10, bottom: 10, right: 10, left: 10}}
      style={({pressed}) => [
        {backgroundColor: pressed ? '#ddd' : props.color},
        styles.button,
        {...props.style},
      ]}>
      <Text style={styles.text}>{props.title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#000',
    fontSize: 20,
    // fontStyle: 'italic',
    margin: 10,
    textAlign: 'center',
  },
  button: {
    width: 150,
    height: 50,
    alignItems: 'center',
  },
});

export default TestButton;
