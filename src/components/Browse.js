import Header from './Header';
import useNowPlayingMovies from '../utils/Hooks/useNowPlayingMovies';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import usePopularMovies from '../utils/Hooks/usePopularMovies';
import useTopRatedMovies from '../utils/Hooks/useTopRatedMovies';
import useUpcomingMovies from '../utils/Hooks/useUpcomingMovies';
import GptPage from './GptPage';
import { useSelector } from 'react-redux';
const Browse = () => {
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  return (
    <div>
      <Header />
      {showGptSearch ? (
        <GptPage />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
    </div>
  );
};

export default Browse;
