import React from 'react';

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[27%] px-20 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-5xl font-bold">{title}</h1>
      <p className="py-8 text-base w-1/3">{overview}</p>
      <div className="">
        <button className=" bg-white text-black text-xl p-4 px-12 rounded-lg hover:bg-opacity-80">
          ▶︎ Play
        </button>
        <button className="mx-2 bg-gray-700 text-white text-xl p-4 px-12 hover:bg-opacity-80 rounded-lg">
          ⓘ More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
