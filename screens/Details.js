import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Details = ({route, navigation}) => {
  const movieDetail = route.params.movieDetail;
  console.log('movieDetail>>', movieDetail);
  return (
    <View>
      <Text>{movieDetail.title}</Text>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({});
