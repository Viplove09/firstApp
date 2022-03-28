import React from 'react';
import {Modal, StyleSheet} from 'react-native';

const WarningModal = () => {
  return (
    <Modal
      visible={props.visible}
      onRequestClose={props.onRequestClose}
      transparent={props.transparent}
      animationType={props.animationType}>
      <View style={styles.centered_view}>
        <View style={styles.warning_modal}>
          <View style={styles.warning_title}>
            <Text style={styles.text}>{props.title}</Text>
          </View>
          <View style={styles.warning_body}>
            <Text style={styles.text}>{props.body}</Text>
          </View>
          <Pressable
            style={styles.warning_button}
            onPress={props.onRequestClose}>
            <Text style={styles.text}>OK</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
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
  centered_view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000099',
  },
  warning_modal: {
    width: 300,
    height: 300,
    backgroundColor: '#fff',
    // borderWidth: 1,
    // borderColor: '#000',
    borderRadius: 20,
  },
  warning_title: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#999',
  },
  warning_body: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  warning_button: {
    backgroundColor: '#ff0000',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});

export default WarningModal;
