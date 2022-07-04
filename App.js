import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {getPopularMoviews} from './services/services';

const App = () => {
  const [movie, setMovie] = useState('');

  useEffect(() => {
    getPopularMoviews()
      .then(movies => {
        setMovie(movies[0].original_title);
      })
      .catch(err => {
        console.log('ErrorCallingMovies>>', err);
      });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>{movie}</Text>
    </View>
  );
};
export default App;
