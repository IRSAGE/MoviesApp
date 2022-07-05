import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
const placeHolderImage = require('../assets/images/placeholder.png');

const Card = ({item}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image
        style={styles.image}
        resizeMode="cover"
        source={
          item.poster_path
            ? {
                uri: 'https://image.tmdb.org/t/p/w500/' + item.poster_path,
              }
            : placeHolderImage
        }
      />
      {!item.poster_path && (
        <Text numberOfLines={2} style={styles.movieName}>
          {item.title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    height: 200,
    padding: 5,
    position: 'relative',
    alignItems: 'center',
  },
  image: {
    height: 200,
    width: 120,
    borderRadius: 20,
  },
  movieName: {
    position: 'absolute',
    width: 100,
    textAlign: 'center',
    top: 20,
    fontWeight: 'bold',
  },
});
