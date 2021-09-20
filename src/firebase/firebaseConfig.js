import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyAA0YDs8g1qP--wVVMkioWcUgIUG7ehWQU",
    authDomain: "food-app-4ebe5.firebaseapp.com",
    projectId: "food-app-4ebe5",
    storageBucket: "food-app-4ebe5.appspot.com",
    messagingSenderId: "501015599340",
    appId: "1:501015599340:web:8986adc13d8075ad17adc9"
  };
const app = initializeApp(firebaseConfig);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
const auth = getAuth()
export const db = getFirestore()
export default auth