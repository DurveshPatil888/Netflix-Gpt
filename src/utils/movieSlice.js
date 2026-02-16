import { createSlice } from '@reduxjs/toolkit';

const movieSlices = createSlice({
  name: 'movies',
  initialState: {
    nowPlayingMovies: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.PopularMovies = action.payload;
    },
    addTopRatedMovies: (state, action) => {
      state.TopRatedMovies = action.payload;
    },
    addUpcomingMovies: (state, action) => {
      state.UpcomingMovies = action.payload;
    },
    addTrailerVedio: (state, action) => {
      state.trailerVedio = action.payload;
    },
  },
});

export const {
  addNowPlayingMovies,
  addTrailerVedio,
  addPopularMovies,
  addTopRatedMovies,
  addUpcomingMovies,
} = movieSlices.actions;
export default movieSlices.reducer;
