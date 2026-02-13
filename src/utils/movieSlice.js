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
    addTrailerVedio: (state, action) => {
      state.trailerVedio = action.payload;
    },
  },
});

export const { addNowPlayingMovies, addTrailerVedio } = movieSlices.actions;
export default movieSlices.reducer;
