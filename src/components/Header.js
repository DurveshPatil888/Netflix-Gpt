import React from 'react';
import { Logo } from '../assets/images';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Header = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
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
  return (
    <div className="absolute w-full px-32 py-1 z-40 flex justify-between bg-black  ">
      <img src={Logo} className="h-20" alt="logo" />
      {user && (
        <div className="flex p-2 m-2">
          <img className="w-10 h-10 " src={user?.photoURL} alt="usericon " />
          <button onClick={handleSignOut} className="font-bold p-2 text-white">
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
