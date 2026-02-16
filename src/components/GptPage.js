import React from 'react';
import GptSearchBar from './GptSearchBar';
import GptMovieSuggestion from './GptMovieSuggestion';
import { background } from '../assets/constants';

const GptPage = () => {
  return (
    <div>
      <img className="absolute -z-10" src={background} />
      <GptSearchBar />
      <GptMovieSuggestion />
    </div>
  );
};

export default GptPage;
