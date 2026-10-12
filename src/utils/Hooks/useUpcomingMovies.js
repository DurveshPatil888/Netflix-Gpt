// import { useDispatch } from 'react-redux';
// import { addUpcomingMovies } from '../movieSlice';
// import { useEffect } from 'react';
// import { API_OPTIONS } from '../../assets/constants';

// const useUpcomingMovies = () => {
//   //Fetch Data From TMDB API and Update Store
//   const dispatch = useDispatch();
//   const getUpcomingMovies = async () => {
//     const data = await fetch(
//       'https://api.themoviedb.org/3/movie/upcoming?page=1',
//       API_OPTIONS
//     );
//     const json = await data.json();
//     dispatch(addUpcomingMovies(json.results));
//   };
//   useEffect(() => {
//     getUpcomingMovies();
//   }, []);
// };

// export default useUpcomingMovies;

import { useDispatch } from 'react-redux';
import { addUpcomingMovies } from '../movieSlice';
import { useEffect } from 'react';
import { API_OPTIONS } from '../../assets/constants';

const useUpcomingMovies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getUpcomingMovies = async () => {
      const data = await fetch(
        'https://api.themoviedb.org/3/movie/upcoming?page=1',
        API_OPTIONS
      );
      const json = await data.json();
      dispatch(addUpcomingMovies(json.results));
    };

    getUpcomingMovies();
  }, [dispatch]);
};

export default useUpcomingMovies;
