import { IMG_CDN_URL } from '../assets/constants';

import { useSelector } from 'react-redux';
const GptMovieSuggestion = ({ loading }) => {
  const { movieResults } = useSelector((store) => store.gpt);

  return (
    <div className="bg-black w-full h-auto">
      {loading && (
        <h2 className="text-white text-3xl text-center p-4">Loading...</h2>
      )}
      {movieResults && (
        <h1 className="text-white text-3xl font-semibold m-4 p-4">
          Movies suggestions
        </h1>
      )}
      <div className="flex flex-wrap p-4 m-4 gap-9 cursor-pointer overscroll-y-auto">
        {movieResults?.map((movieArray) => {
          const movie = movieArray[0];
          if (!movie?.poster_path) return null;

          return (
            <img
              key={movie.id}
              src={IMG_CDN_URL + movie.poster_path}
              alt={movie.title}
              className="w-40 m-2"
            />
          );
        })}
      </div>
    </div>
  );
};

export default GptMovieSuggestion;
