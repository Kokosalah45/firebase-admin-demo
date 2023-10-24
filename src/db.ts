// Import the functions you need from the SDKs you need
import { initializeApp  } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwHBRUgo5iCkSYwGubgNgYnN5W08u-mNg",
  authDomain: "authz-test-43c1d.firebaseapp.com",
  projectId: "authz-test-43c1d",
  storageBucket: "authz-test-43c1d.appspot.com",
  messagingSenderId: "1012396737081",
  appId: "1:1012396737081:web:09721919afa0db049d83e8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);



