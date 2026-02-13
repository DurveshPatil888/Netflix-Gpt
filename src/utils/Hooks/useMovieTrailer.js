import { useDispatch } from 'react-redux';
import { API_OPTIONS } from '../../assets/constants';
import { addTrailerVedio } from '../movieSlice';
import { useEffect } from 'react';

const useMovieTrailer = (MovieId) => {
  const dispatch = useDispatch();

  const getMoviesVedio = async () => {
    const data = await fetch(
      'https://api.themoviedb.org/3/movie/' +
        MovieId +
        '/videos?language=en-US',
      API_OPTIONS
    );
    const json = await data.json();

    const filterData = json.results.filter((video) => video.type === 'Trailer');
    const trailer = filterData.length ? filterData[0] : json.results[0];
    dispatch(addTrailerVedio(trailer));
  };

  useEffect(() => {
    getMoviesVedio();
  }, []);
};

export default useMovieTrailer;
