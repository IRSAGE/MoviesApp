import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Icon} from 'react-native-vector-icons/Ionicons';

const PlayButton = () => {
  return (
    <Pressable style={styles.button}>
      <Text style={{fontSize: 11, fontWeight: 'bold', color: 'white'}}>
        Play
      </Text>
    </Pressable>
  );
};

export default PlayButton;

const styles = StyleSheet.create({
  button: {
    alignContent: 'center',
    borderRadius: 50,
    width: 38,
    height: 38,
    backgroundColor: '#4481FC',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
