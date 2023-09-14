// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdctVVcMIqe0aDkCFlrzEL014UiXOBLq8",
  authDomain: "upload-file-7ec08.firebaseapp.com",
  projectId: "upload-file-7ec08",
  storageBucket: "upload-file-7ec08.appspot.com",
  messagingSenderId: "549433512407",
  appId: "1:549433512407:web:611d5a0bd32ed3565a7b92",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
