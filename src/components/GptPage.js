import React from 'react';
import GptSearchBar from './GptSearchBar';
import GptMovieSuggestion from './GptMovieSuggestion';
import { background } from '../assets/constants';

const GptPage = () => {
  return (
    <div>
      <img
        className="fixed top-0 left-0 -z-10 h-screen w-screen object-cover"
        src={background}
        alt="background"
      />
      <GptSearchBar />
      <GptMovieSuggestion />
    </div>
  );
};

export default GptPage;
