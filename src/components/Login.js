import React, { useState } from 'react';
import Header from './Header';
import { background } from '../assets/images';
const Login = () => {
  const [IsSignIn, setSignIn] = useState();

  const setsignup = () => {
    setSignIn(!IsSignIn);
  };

  return (
    <div>
      <Header />
      <div>
        <img src={background} alt="background" className="absolute z-auto" />
      </div>
      <form className="absolute text-white bg-black w-3/12 p-12 my-40  mx-auto left-0 right-0 h-auto rounded-lg bg-opacity-80">
        <h1 className="font-bold text-2xl">
          {IsSignIn ? 'Sign In' : 'Sign Up'}
        </h1>
        {!IsSignIn && (
          <input
            type="text"
            placeholder=" Full Name"
            className="p-2 my-4 w-full bg-gray-600"
          />
        )}
        <input
          type="text"
          placeholder="Email Address"
          className="p-2 my-4 w-full bg-gray-600"
        />

        <input
          type="password"
          placeholder="Password"
          className="p-2 my-4 w-full bg-gray-600"
        />
        <button className="bg-red-700 p-4 my-4 w-full rounded-lg">
          {IsSignIn ? 'Sign In' : 'Sign Up'}
        </button>
        <p className="p-2 cursor-pointer" onClick={setsignup}>
          {IsSignIn
            ? 'New to Netflix ? Sign Up Now'
            : 'Already registered? Sign In Now'}
        </p>
      </form>
    </div>
  );
};

export default Login;
