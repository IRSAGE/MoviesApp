import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Image,
  View,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getMovieDetails} from '../services/services';
const placeHolderImage = require('../assets/images/placeholder.png');
const {height} = Dimensions.get('window');

const Details = ({route, navigation}) => {
  const movieId = route.params.movieId;
  const [moviesDetails, setMoviesDetails] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMovieDetails(movieId)
      .then(movieData => {
        setMoviesDetails(movieData);
      })
      .catch(err => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [movieId]);

  return (
    <>
      {loading && (
        <View style={styles.loadingView}>
          <ActivityIndicator size="large" color="green" />
        </View>
      )}
      {!loading && (
        <ScrollView style={styles.container}>
          <Image
            style={styles.image}
            resizeMode="cover"
            source={
              moviesDetails.poster_path
                ? {
                    uri:
                      'https://image.tmdb.org/t/p/w500/' +
                      moviesDetails.poster_path,
                  }
                : placeHolderImage
            }
          />
        </ScrollView>
      )}
    </>
  );
};

export default Details;

const styles = StyleSheet.create({
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: height / 2.5,
  },
  movieName: {
    position: 'absolute',
    width: 100,
    textAlign: 'center',
    top: 20,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
  },
});
