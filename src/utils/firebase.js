// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDO2FGPjXfgAzvQehCnN3qvKV_7pdFAcVI',
  authDomain: 'netflixgpt-79492.firebaseapp.com',
  projectId: 'netflixgpt-79492',
  storageBucket: 'netflixgpt-79492.firebasestorage.app',
  messagingSenderId: '1093923999247',
  appId: '1:1093923999247:web:af457f2e47e13ad8e31d7a',
  measurementId: 'G-4PELTB6CDW',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
