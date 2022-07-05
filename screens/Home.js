import {
  View,
  Image,
  Dimensions,
  ScrollView,
  StyleSheet,
  FlatList,
  Text,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {
  getPopularMoviews,
  getPopularTvSeries,
  getUpcomingMoviews,
} from '../services/services';
import List from '../components/List';
const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');

const Home = () => {
  const [moviesImages, setMoviesImages] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTvs, setPopularTvs] = useState([]);

  useEffect(() => {
    //Getting Upcoming Movies
    getUpcomingMoviews()
      .then(movies => {
        const images = [];
        movies.forEach(movie => {
          images.push('https://image.tmdb.org/t/p/w500/' + movie.poster_path);
        });
        setMoviesImages(images);
      })
      .catch(err => {
        console.log('ErrorCallingGetUpcomingMoviews>>', err);
      });
    //Getting Polular Movies
    getPopularMoviews()
      .then(movies => {
        setPopularMovies(movies);
      })
      .catch(err => {
        console.log('ErrorCallingGetPopularMoviews>>', err);
      });
    //Getting Polular Tv Series
    getPopularTvSeries()
      .then(movies => {
        setPopularTvs(movies);
      })
      .catch(err => {
        console.log('ErrorCallingGetPopularMoviews>>', err);
      });
  }, []);

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      style={{flex: 1, bottom: '2%'}}>
      <View style={style.sliderContainer}>
        <ScrollView
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          style={style.sliderScroll}>
          {moviesImages?.map((image, index) => (
            <Image
              key={index}
              resizeMode="cover"
              source={{uri: image}}
              style={style.sliderImage}
            />
          ))}
        </ScrollView>
      </View>
      <View>
        <List title="Popular Movies" content={popularMovies} />
      </View>
      <View>
        <List title="Popular Tv Series" content={popularTvs} />
      </View>
    </ScrollView>
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
