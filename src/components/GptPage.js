import React from 'react';
import GptSearchBar from './GptSearchBar';
import GptMovieSuggestion from './GptMovieSuggestion';

const GptPage = () => {
  return (
    <div>
      <img
        className="fixed top-0 left-0 -z-10 h-screen w-screen object-cover bg-black"
        alt="background"
      />
      <GptSearchBar />
    </div>
  );
};

export default GptPage;
