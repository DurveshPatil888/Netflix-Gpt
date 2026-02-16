import React, { useRef, useState } from 'react';
import Header from './Header';
import { background } from '../assets/constants';
import { CheckValidData } from '../utils/validate';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {
  const [IsSignIn, setSignIn] = useState(true);
  const [errorMsg, seterrorMsg] = useState();
  const email = useRef(null);
  const password = useRef(null);
  const fullname = useRef(null);
  const dispatch = useDispatch();
  const toggleSignInForm = () => {
    setSignIn(!IsSignIn);
  };

  const HandleButtonClick = () => {
    const message = CheckValidData(
      fullname.current?.value,
      email.current.value,
      password.current.value,
      IsSignIn
    );
    seterrorMsg(message);

    if (message) return;
    //Sign / Sign Up
    if (!IsSignIn) {
      createUserWithEmailAndPassword(
        auth,

        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;

          updateProfile(user, {
            displayName: fullname.current.value,
            photoURL:
              'https://avatars.githubusercontent.com/u/216418613?v=4&s=200',
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid,
                  email,
                  displayName,
                  photoURL,
                })
              );
            })
            .catch((error) => {
              seterrorMsg(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          seterrorMsg(errorCode + '-' + errorMessage);
        });
    } else {
      //Sign In Logic

      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode + '' + errorMessage);
        });
    }
  };

  return (
    <div>
      <Header />
      <div>
        <img
          src={background}
          alt="background"
          className="absolute inset-0 w-full h-full object-cover  "
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90"></div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="absolute text-white bg-black w-3/12 p-12 my-44  mx-auto left-0 right-0 h-auto rounded-lg bg-opacity-80"
      >
        <h1 className="font-bold text-2xl">
          {IsSignIn ? 'Sign In' : 'Sign Up'}
        </h1>
        {!IsSignIn && (
          <input
            ref={fullname}
            type="text"
            placeholder=" Full Name"
            className="p-4 my-4 w-full bg-gray-600"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-600"
        />

        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-600"
        />
        <button
          className="bg-red-700 p-4 my-6 w-full rounded-lg hover:bg-red-800 transition-all duration-300"
          onClick={HandleButtonClick}
        >
          {IsSignIn ? 'Sign In' : 'Sign Up'}
        </button>
        <p className="text-red-600 py-2 text-base font-bold ">{errorMsg}</p>
        <p className="py-3 cursor-pointer" onClick={toggleSignInForm}>
          {IsSignIn
            ? 'New to Netflix ? Sign Up Now'
            : 'Already registered? Sign In Now'}
        </p>
      </form>
    </div>
  );
};

export default Login;
