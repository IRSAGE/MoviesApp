import axios from 'axios';

const apiUrl = 'https://api.themoviedb.org/3';
const apiKey = 'api_key=733f0b856a2c5f6a7fdc51b1dcaa7842';

//Get Popular Movies
export const getPopularMoviews = async () => {
  const resp = await axios.get(`${apiUrl}/movie/popular?${apiKey}`);
  return resp.data.results;
};

//Get Upcomming Movies
export const getUpcomingMoviews = async () => {
  const resp = await axios.get(`${apiUrl}/movie/upcoming?${apiKey}`);
  return resp.data.results;
};

//Get Popular Tv  Series
export const getPopularTvSeries = async () => {
  const resp = await axios.get(`${apiUrl}/tv/popular?${apiKey}`);
  return resp.data.results;
};

//Get Upcoming Tv  Series
export const getUpcomingTvSeries = async () => {
  const resp = await axios.get(`${apiUrl}/tv/upcoming?${apiKey}`);
  return resp.data.results;
};
//Get Family Movies
export const getFamilyMovies = async () => {
  const resp = await axios.get(
    `${apiUrl}/discover/movie?${apiKey}&with_genres=10751`,
  );
  return resp.data.results;
};
//Get Documentary Movies
export const getDocumentaryMovies = async () => {
  const resp = await axios.get(
    `${apiUrl}/discover/movie?${apiKey}&with_genres=99`,
  );
  return resp.data.results;
};
//Get Movie Details
export const getMovieDetails = async id => {
  const resp = await axios.get(`${apiUrl}/movie/${id}?${apiKey}`);
  return resp.data;
};
