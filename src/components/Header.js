import React, { useEffect } from 'react';
import { Logo, SUPPORTED_LANGUAGES, userIcon } from '../assets/constants';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { toggleGptSearchView } from '../utils/GptSlice';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };
  const showGptsearch = useSelector((store) => store.gpt.showGptSearch);
  const handleSignOut = () => {
    //firebase signout code
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate('/');
      })
      .catch((error) => {
        navigate('/error');
      });
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };
  useEffect(() => {
    //firbase Get the currently signed-in user code
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid,
            email,
            displayName,
            photoURL,
          })
        );
        navigate('/browse');
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, []);
  return (
    <div
      className="fixed top-0 left-0 w-full h-28
     z-[100] flex justify-between px-32 py-2
    bg-gradient-to-b from-black via-black/70 to-transparent items-center "
    >
      <img src={Logo} className="h-20" alt="logo" />
      {user && (
        <div className="flex items-center gap-3">
          {showGptsearch && (
            <select
              className=" bg-gray-900 text-white rounded-lg px-4 h-10"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="bg-gray-900 text-white rounded-lg py-2 px-4 h-10  "
            onClick={handleGptSearchClick}
          >
            {showGptsearch ? 'Home' : 'Gpt Search'}
          </button>
          <img
            className="h-10 w-10 rounded-lg object-cover"
            src={user?.photoURL || userIcon}
            alt="usericon "
          />
          <button
            onClick={handleSignOut}
            className="bg-white/10 hover:bg-white/20 text-white rounded-lg px-4 h-10 font-semibold transition"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
