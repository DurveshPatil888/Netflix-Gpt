// import { useDispatch } from 'react-redux';
// import { addTopRatedMovies } from '../movieSlice';
// import { useEffect } from 'react';
// import { API_OPTIONS } from '../../assets/constants';

// const useTopRatedMovies = () => {
//   //Fetch Data From TMDB API and Update Store
//   const dispatch = useDispatch();
//   const getTopRatedMovies = async () => {
//     const data = await fetch(
//       'https://api.themoviedb.org/3/movie/top_rated?page=1',
//       API_OPTIONS
//     );
//     const json = await data.json();
//     dispatch(addTopRatedMovies(json.results));
//   };
//   useEffect(() => {
//     getTopRatedMovies();
//   }, []);
// };

// export default useTopRatedMovies;

import { useDispatch } from 'react-redux';
import { addTopRatedMovies } from '../movieSlice';
import { useEffect } from 'react';
import { API_OPTIONS } from '../../assets/constants';

const useTopRatedMovies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getTopRatedMovies = async () => {
      const data = await fetch(
        'https://api.themoviedb.org/3/movie/top_rated?page=1',
        API_OPTIONS
      );
      const json = await data.json();
      dispatch(addTopRatedMovies(json.results));
    };

    getTopRatedMovies();
  }, [dispatch]);
};

export default useTopRatedMovies;
