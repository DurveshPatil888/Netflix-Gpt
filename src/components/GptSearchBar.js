// import React, { useRef, useState } from 'react';
// import lang from '../utils/lang';
// import { useDispatch, useSelector } from 'react-redux';
// import { API_OPTIONS } from '../assets/constants';
// import { addGptMovieResult } from '../utils/GptSlice';
// import GptMovieSuggestion from './GptMovieSuggestion';
// const GptSearchBar = () => {
//   const langKey = useSelector((store) => store.config.lang);

//   const [loading, setLoading] = useState(false);
//   const SearchText = useRef(null);
//   const dispatch = useDispatch();
//   //search movie in TMDB
//   const searchMovieTMDB = async (movie) => {
//     const data = await fetch(
//       'https://api.themoviedb.org/3/search/movie?query=' +
//         movie +
//         '&include_adult=false&language=en-US&page=1',
//       API_OPTIONS
//     );
//     const json = await data.json();

//     return json.results;
//   };

//   const HandleGptSearchClick = async () => {
//     const query = SearchText.current.value.trim();
//     if (!query) return;
//     if (loading) return;
//     setLoading(true);
//     try {
//       const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${process.env.REACT_APP_OPENROUTER_KEY}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           model: 'openrouter/free',
//           messages: [
//             {
//               role: 'system',
//               content: `
// You are a movie recommendation system.

// Always return EXACTLY 14 movie names separated by commas.
// Do NOT include numbering or explanations. and if the user add any same name of movie then disply only that movie.

// If the user asks anything related to movies, genres, actors, countries, or film industries, suggest movies.

// Only if the request is completely unrelated to movies (e.g., weather, math, coding), reply exactly:
// I only suggest movies.
// `,
//             },
//             {
//               role: 'user',
//               content: query,
//             },
//           ],
//         }),
//       });
//       if (!res.ok) {
//         throw new Error(
//           `OpenRouter error: ${res.status} - ${await res.text()}`
//         );
//       }

//       const data = await res.json();

//       const result = data?.choices?.[0]?.message?.content || '';
//       if (result.includes('I only suggest movies')) {
//         console.log(result);
//         setLoading(false);
//         return;
//       }

//       const GptMovies = result
//         .split(',')
//         .map((m) => m.trim())
//         .slice(0, 14);
//       const moviesNames = GptMovies.join(', ');
//       console.log(moviesNames);

//       const data1 = GptMovies.map((movie) => searchMovieTMDB(movie));
//       const tmdbResults = await Promise.all(data1);
//       console.log(tmdbResults);

//       dispatch(
//         addGptMovieResult({
//           movieNames: moviesNames,
//           movieResults: tmdbResults,
//         })
//       );
//     } catch (err) {
//       console.log('Error:', err);
//     }

//     setLoading(false);
//   };
//   return (
//     <div className="pt-[9%] flex flex-col items-center">
//       <form
//         className="w-1/2 bg-black grid grid-cols-12"
//         onSubmit={(e) => {
//           e.preventDefault();
//           HandleGptSearchClick();
//         }}
//       >
//         <input
//           ref={SearchText}
//           type="text"
//           className="m-4 p-4 col-span-9"
//           placeholder={lang[langKey].gptSearchPlaceholder}
//         />
//         <button
//           disabled={loading}
//           type="submit"
//           className="col-span-3 m-4 py-2 px-4 rounded-lg bg-red-800 text-white "
//         >
//           {lang[langKey].search}
//         </button>
//       </form>
//       <GptMovieSuggestion loading={loading} />
//     </div>
//   );
// };

// export default GptSearchBar;

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

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movie)}&include_adult=false&language=en-US&page=1`,
      API_OPTIONS
    );

    if (!data.ok) throw new Error(`TMDB error: ${data.status}`);

    const json = await data.json();
    return json.results;
  };

  const getMovieSuggestions = async (query) => {
    const systemPrompt = `
You are a movie recommendation system.
Return exactly 14 movie names separated by commas.
Do not include numbering, explanations, or extra text.
If the user asks for one specific movie, return that movie only.
For movie genres, actors, countries, or film industries, suggest relevant movies.
If the request is completely unrelated to movies, reply exactly:
I only suggest movies.
`;

    // Try OpenRouter first
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
            { role: 'system', content: systemPrompt },
            { role: 'user', content: query },
          ],
        }),
      });

      if (!res.ok) {
        throw new Error(`OpenRouter error: ${res.status}`);
      }

      const data = await res.json();
      const result = data?.choices?.[0]?.message?.content;

      if (!result) throw new Error('Empty OpenRouter response');

      console.log('AI provider: OpenRouter');
      return result;
    } catch (error) {
      console.warn('OpenRouter failed; trying Gemini:', error.message);
    }

    // Fallback to Gemini
    const geminiKey = process.env.REACT_APP_GEMINI_API_KEY;

    if (!geminiKey) {
      throw new Error('Gemini API key is missing from .env');
    }

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${geminiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: systemPrompt }],
          },
          contents: [
            {
              role: 'user',
              parts: [{ text: query }],
            },
          ],
          generationConfig: {
            temperature: 0.7,
          },
        }),
      }
    );

    if (!res.ok) {
      throw new Error(`Gemini error: ${res.status} - ${await res.text()}`);
    }

    const data = await res.json();
    const result = data?.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || '')
      .join('')
      .trim();

    if (!result) throw new Error('Empty Gemini response');

    console.log('AI provider: Gemini');
    return result;
  };

  const HandleGptSearchClick = async () => {
    const query = SearchText.current?.value.trim();

    if (!query || loading) return;

    setLoading(true);

    try {
      const result = await getMovieSuggestions(query);

      if (result.includes('I only suggest movies')) {
        console.log(result);
        return;
      }

      const GptMovies = result
        .split(',')
        .map((movie) => movie.trim())
        .filter(Boolean)
        .slice(0, 14);

      if (!GptMovies.length) {
        throw new Error('No movie suggestions received');
      }

      const moviesNames = GptMovies.join(', ');
      const tmdbResults = await Promise.all(
        GptMovies.map((movie) => searchMovieTMDB(movie))
      );

      dispatch(
        addGptMovieResult({
          movieNames: moviesNames,
          movieResults: tmdbResults,
        })
      );
    } catch (err) {
      console.error('Movie suggestion error:', err);
    } finally {
      setLoading(false);
    }
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
          className="col-span-3 m-4 py-2 px-4 rounded-lg bg-red-800 text-white"
        >
          {loading ? 'Searching...' : lang[langKey].search}
        </button>
      </form>

      <GptMovieSuggestion loading={loading} />
    </div>
  );
};

export default GptSearchBar;
