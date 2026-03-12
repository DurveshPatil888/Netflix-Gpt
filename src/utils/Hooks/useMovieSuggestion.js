import { useDispatch } from 'react-redux';
import { API_OPTIONS } from '../../assets/constants';
import { useEffect } from 'react';
import { addGptMovieResult } from '../GptSlice';

const useMovieSuggestion = (MovieId) => {
  const dispatch = useDispatch();

  const getMovies = async () => {
    const data = await fetch(
      'https://api.themoviedb.org/3/movie/popular?page=1',
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addGptMovieResult(json.results));
  };

  useEffect(() => {
    getMovies();
  }, []);
};

export default useMovieSuggestion;
