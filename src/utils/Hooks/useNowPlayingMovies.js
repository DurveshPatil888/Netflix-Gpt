// import { useDispatch } from 'react-redux';
// import { addNowPlayingMovies } from '../movieSlice';
// import { useEffect } from 'react';
// import { API_OPTIONS } from '../../assets/constants';

// const useNowPlayingMovies = () => {
//   //Fetch Data From TMDB API and Update Store
//   const dispatch = useDispatch();
//   const getNowPlayingMovies = async () => {
//     const data = await fetch(
//       'https://api.themoviedb.org/3/movie/now_playing?page=1',
//       API_OPTIONS
//     );
//     const json = await data.json();
//     dispatch(addNowPlayingMovies(json.results));
//   };
//   useEffect(() => {
//     getNowPlayingMovies();
//   }, []);
// };

// export default useNowPlayingMovies;

import { useDispatch } from 'react-redux';
import { addNowPlayingMovies } from '../movieSlice';
import { useEffect } from 'react';
import { API_OPTIONS } from '../../assets/constants';

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getNowPlayingMovies = async () => {
      const data = await fetch(
        'https://api.themoviedb.org/3/movie/now_playing?page=1',
        API_OPTIONS
      );
      const json = await data.json();
      dispatch(addNowPlayingMovies(json.results));
    };

    getNowPlayingMovies();
  }, [dispatch]);
};

export default useNowPlayingMovies;
