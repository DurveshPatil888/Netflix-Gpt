import React, { useRef, useState } from 'react';
import lang from '../utils/lang';
import { useDispatch, useSelector } from 'react-redux';
import { API_OPTIONS } from '../assets/constants';
import { addGptMovieResult } from '../utils/GptSlice';
import GptMovieSuggestion from './GptMovieSuggestion';
const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);

  const [loading, setLoading] = useState(false);
  const SearchText = useRef(null);
  const dispatch = useDispatch();
  //search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      'https://api.themoviedb.org/3/search/movie?query=' +
        movie +
        '&include_adult=false&language=en-US&page=1',
      API_OPTIONS
    );
    const json = await data.json();

    return json.results;
  };

  const HandleGptSearchClick = async () => {
    const query = SearchText.current.value.trim();
    if (!query) return;
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_OPENROUTER_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'openrouter/free',
          messages: [
            {
              role: 'system',
              content: `
You are a movie recommendation system.

Always return EXACTLY 14 movie names separated by commas.
Do NOT include numbering or explanations. and if the user add any same name of movie then disply only that movie.

If the user asks anything related to movies, genres, actors, countries, or film industries, suggest movies.

Only if the request is completely unrelated to movies (e.g., weather, math, coding), reply exactly:
I only suggest movies.
`,
            },
            {
              role: 'user',
              content: query,
            },
          ],
        }),
      });

      const data = await res.json();

      const result = data?.choices?.[0]?.message?.content || '';
      if (result.includes('I only suggest movies')) {
        console.log(result);
        setLoading(false);
        return;
      }

      const GptMovies = result
        .split(',')
        .map((m) => m.trim())
        .slice(0, 14);
      const moviesNames = GptMovies.join(', ');
      console.log(moviesNames);

      const data1 = GptMovies.map((movie) => searchMovieTMDB(movie));
      const tmdbResults = await Promise.all(data1);
      console.log(tmdbResults);

      dispatch(
        addGptMovieResult({
          movieNames: moviesNames,
          movieResults: tmdbResults,
        })
      );
    } catch (err) {
      console.log('Error:', err);
    }

    setLoading(false);
  };
  return (
    <div className="pt-[9%] flex flex-col items-center">
      <form
        className="w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => {
          e.preventDefault();
          HandleGptSearchClick();
        }}
      >
        <input
          ref={SearchText}
          type="text"
          className="m-4 p-4 col-span-9"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          disabled={loading}
          type="submit"
          className="col-span-3 m-4 py-2 px-4 rounded-lg bg-red-800 text-white "
        >
          {lang[langKey].search}
        </button>
      </form>
      <GptMovieSuggestion loading={loading} />
    </div>
  );
};

export default GptSearchBar;
