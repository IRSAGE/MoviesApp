import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Image,
  View,
  Dimensions,
  Text,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getMovieDetails} from '../services/services';
const placeHolderImage = require('../assets/images/placeholder.png');
const {height} = Dimensions.get('window');
import dateFormat from 'dateformat';
import PlayButton from '../components/PlayButton';

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
          <View style={styles.centeredView}>
            <View style={styles.playButton}>
              <PlayButton />
            </View>
            <Text style={styles.movieName}>{moviesDetails.title}</Text>
            {moviesDetails.genres && (
              <View style={styles.genresView}>
                {moviesDetails.genres.map(genre => {
                  return (
                    <Text style={styles.genresText} key={genre.id}>
                      {genre.name}
                    </Text>
                  );
                })}
              </View>
            )}
            <View style={styles.ratingView}>
              {Array(Math.round(moviesDetails.vote_average / 2))
                .fill()
                .map((_, i) => (
                  <Text style={[styles.genresText, {fontSize: 25}]} key={i}>
                    ⭐️
                  </Text>
                ))}
            </View>
            <Text style={styles.overview}>{moviesDetails.overview}</Text>
            <Text style={styles.realeaseDate}>
              {'Release Date: ' +
                dateFormat(moviesDetails.release_date, 'mmmm dd, yyyy')}
            </Text>
          </View>
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: height / 2.5,
  },
  movieName: {
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 15,
    textAlign: 'center',
  },
  container: {
    flex: 1,
  },
  genresView: {
    flexDirection: 'row',
  },
  genresText: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  ratingView: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overview: {
    padding: 18,
    textAlign: 'center',
  },
  realeaseDate: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  playButton: {
    position: 'absolute',
    top: -20,
    right: 18,
  },
});
