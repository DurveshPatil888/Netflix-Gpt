import { useDispatch } from 'react-redux';
import { addPopularMovies } from '../movieSlice';
import { useEffect } from 'react';
import { API_OPTIONS } from '../../assets/constants';

const usePopularMovies = () => {
  //Fetch Data From TMDB API and Update Store
  const dispatch = useDispatch();
  const getPopularMovies = async () => {
    const data = await fetch(
      'https://api.themoviedb.org/3/movie/popular?page=1',
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addPopularMovies(json.results));
  };
  useEffect(() => {
    getPopularMovies();
  }, []);
};

export default usePopularMovies;
