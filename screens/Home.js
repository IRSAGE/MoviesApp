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
  getFamilyMovies,
  getPopularMoviews,
  getPopularTvSeries,
  getUpcomingMoviews,
} from '../services/services';
import List from '../components/List';
const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');

const Home = () => {
  const [moviesImages, setMoviesImages] = useState();
  const [popularMovies, setPopularMovies] = useState();
  const [popularTvSeries, setPopularTvSeries] = useState();
  const [familyMovies, setFamilyMovies] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    getData()
      .then(
        ([
          familyMoviesData,
          popularTvSeriesData,
          popularMoviesData,
          upcomingMoviesData,
        ]) => {
          const images = [];
          upcomingMoviesData.forEach(movie => {
            images.push('https://image.tmdb.org/t/p/w500/' + movie.poster_path);
          });
          setMoviesImages(images);
          setFamilyMovies(familyMoviesData);
          setPopularTvSeries(popularTvSeriesData);
          setPopularMovies(popularMoviesData);
        },
      )
      .catch(err => {
        setError(true);
      });
  }, []);

  const getData = () => {
    return Promise.all([
      getFamilyMovies(),
      getPopularTvSeries(),
      getPopularMoviews(),
      getUpcomingMoviews(),
    ]);
  };

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      style={{flex: 1, bottom: '2%'}}>
      {moviesImages && (
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
      )}
      {popularMovies && (
        <View>
          <List title="Popular Movies" content={popularMovies} />
        </View>
      )}
      {popularTvSeries && (
        <View>
          <List title="Popular Tv Shows" content={popularTvSeries} />
        </View>
      )}
      {familyMovies && (
        <View>
          <List title="Family Movies" content={familyMovies} />
        </View>
      )}
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
