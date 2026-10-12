// import { useSelector } from 'react-redux';
// import useMovieTrailer from '../utils/Hooks/useMovieTrailer';
// const VideoBackground = ({ MovieId }) => {
//   const trailerVedio = useSelector((store) => store.movies?.trailerVedio);
//   useMovieTrailer(MovieId);

//   return (
//     <div className="-mt-20 w-full aspect-video ">
//       <iframe
//         className="w-screen aspect-video "
//         src={
//           'https://www.youtube.com/embed/' +
//           trailerVedio?.key +
//           '?autoplay=1&mute=1&controls=0&loop=1&playlist=' +
//           trailerVedio?.key +
//           '&disablekb=1&modestbranding=1'
//         }
//         title="YouTube video player"
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//         referrerPolicy="strict-origin-when-cross-origin"
//       ></iframe>
//     </div>
//   );
// };

// export default VideoBackground;

import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import useMovieTrailer from '../utils/Hooks/useMovieTrailer';

const VideoBackground = ({ MovieId }) => {
  const trailerVedio = useSelector((store) => store.movies?.trailerVedio);
  const containerRef = useRef(null);
  const playerRef = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const key = trailerVedio?.key;
  useMovieTrailer(MovieId);

  useEffect(() => {
    if (!key || !containerRef.current) return;
    const container = containerRef.current;

    setRevealed(false);
    let timer = null;

    const createPlayer = () => {
      const holder = document.createElement('div');
      container.appendChild(holder);
      playerRef.current = new window.YT.Player(holder, {
        videoId: key,
        width: '100%',
        height: '100%',
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          disablekb: 1,
          modestbranding: 1,
          playsinline: 1,
        },
        events: {
          onReady: (e) => {
            e.target.mute();
            e.target.playVideo();
          },
          onStateChange: (e) => {
            if (e.data === window.YT.PlayerState.ENDED) e.target.playVideo();
            if (e.data === window.YT.PlayerState.PLAYING && !timer) {
              timer = setTimeout(() => setRevealed(true), 3000);
            }
          },
        },
      });
    };

    if (window.YT?.Player) {
      createPlayer();
    } else {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      window.onYouTubeIframeAPIReady = createPlayer;
    }

    return () => {
      clearTimeout(timer);
      playerRef.current?.destroy?.();
      playerRef.current = null;
      container.innerHTML = '';
    };
  }, [key]);

  return (
    <div className="-mt-20 w-full aspect-video pointer-events-none">
      <div
        ref={containerRef}
        className={`w-full h-full ${revealed ? 'visible' : 'invisible'}`}
      />
    </div>
  );
};

export default VideoBackground;
