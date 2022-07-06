import {
  View,
  Image,
  Dimensions,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {
  getDocumentaryMovies,
  getFamilyMovies,
  getPopularMoviews,
  getPopularTvSeries,
  getUpcomingMoviews,
} from '../services/services';
import List from '../components/List';
import Error from '../components/Error';
const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');

const Home = ({navigation}) => {
  const [moviesImages, setMoviesImages] = useState();
  const [popularMovies, setPopularMovies] = useState();
  const [popularTvSeries, setPopularTvSeries] = useState();
  const [familyMovies, setFamilyMovies] = useState();
  const [documentaryMovies, setDocumentalyMovies] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData()
      .then(
        ([
          familyMoviesData,
          popularMoviesData,
          upcomingMoviesData,
          documentaryMoviesData,
        ]) => {
          const images = [];
          upcomingMoviesData.forEach(movie => {
            images.push('https://image.tmdb.org/t/p/w500/' + movie.poster_path);
          });
          setMoviesImages(images);
          setFamilyMovies(familyMoviesData);
          setPopularMovies(popularMoviesData);
          setDocumentalyMovies(documentaryMoviesData);
        },
      )
      .catch(err => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const getData = () => {
    return Promise.all([
      getFamilyMovies(),
      getPopularMoviews(),
      getUpcomingMoviews(),
      getDocumentaryMovies(),
    ]);
  };

  return (
    <>
      {loading && (
        <View style={style.loadingView}>
          <ActivityIndicator size="large" color="green" />
        </View>
      )}
      {!loading && !error && (
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
              <List
                navigation={navigation}
                title="Popular Movies"
                content={popularMovies}
              />
            </View>
          )}
          {familyMovies && (
            <View>
              <List
                navigation={navigation}
                title="Family Movies"
                content={familyMovies}
              />
            </View>
          )}
          {documentaryMovies && (
            <View>
              <List
                navigation={navigation}
                title="Documentary Movies"
                content={documentaryMovies}
              />
            </View>
          )}
        </ScrollView>
      )}
      {error && <Error />}
    </>
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
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
