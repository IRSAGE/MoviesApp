import {View, Image, Dimensions, ScrollView, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';

import {getPopularTvSeries} from '../services/services';
const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');

const Home = () => {
  const [moviesImages, setMoviesImages] = useState([]);

  useEffect(() => {
    //Getting Upcoming Movies
    getPopularTvSeries()
      .then(movies => {
        const images = [];
        movies.forEach(movie => {
          images.push('https://image.tmdb.org/t/p/w500/' + movie.poster_path);
        });
        setMoviesImages(images);
      })
      .catch(err => {
        console.log('ErrorCallingMovies>>', err);
      });
  }, []);

  return (
    <View style={style.sliderContainer}>
      <ScrollView
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        style={style.sliderScroll}>
        {moviesImages?.map((image, index) => (
          <Image key={index} source={{uri: image}} style={style.sliderImage} />
        ))}
      </ScrollView>
    </View>
  );
};

export default Home;

const style = StyleSheet.create({
  sliderContainer: {
    height: height / 1.8,
    width,
  },
  sliderScroll: {
    height: height / 1.8,
    width,
  },
  sliderImage: {
    height: height / 1.8,
    width,
    resizeMode: 'cover',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  paginationText: {
    color: 'white',
  },
});
