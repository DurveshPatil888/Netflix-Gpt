import React from 'react';
import { Logo } from '../assets/images';
const Header = () => {
  return (
    <div className="absolute px-32 py-2 z-40 bg-black w-full bg-opacity-40">
      <img src={Logo} className="h-20" alt="logo" />
    </div>
  );
};

export default Header;
