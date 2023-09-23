// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCi1AONZpJdK8FU5IrFjwBCQXf0r6-sedI',
  authDomain: 'saitynai-aa9d9.firebaseapp.com',
  projectId: 'saitynai-aa9d9',
  storageBucket: 'saitynai-aa9d9.appspot.com',
  messagingSenderId: '738242207301',
  appId: '1:738242207301:web:ace5eb113ab15ebc9f8d2c',
  measurementId: 'G-4N8D3WY44D',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
