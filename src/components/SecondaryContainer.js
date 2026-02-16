import React from 'react';
import MovieList from './MovieList';
import { useSelector } from 'react-redux';

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  return (
    <div className="  bg-black">
      <div className=" -mt-44 pl-12  relative z-20">
        <MovieList title={'Now Playing'} movies={movies.nowPlayingMovies} />
        <MovieList title={'TopRated Movies'} movies={movies.TopRatedMovies} />
        <MovieList title={'Upcoming Movies'} movies={movies.UpcomingMovies} />
        <MovieList title={'Popular Movies'} movies={movies.PopularMovies} />
      </div>
    </div>
  );
};

export default SecondaryContainer;
