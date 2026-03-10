import { useSelector } from 'react-redux';
import useMovieTrailer from '../utils/Hooks/useMovieTrailer';
const VideoBackground = ({ MovieId }) => {
  const trailerVedio = useSelector((store) => store.movies?.trailerVedio);
  useMovieTrailer(MovieId);

  return (
    <div className="-mt-20 w-full aspect-video ">
      <iframe
        className="w-screen aspect-video "
        src={
          'https://www.youtube.com/embed/' +
          trailerVedio?.key +
          '?autoplay=1&mute=1&loop=1&playlist=' +
          trailerVedio?.key
        }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
