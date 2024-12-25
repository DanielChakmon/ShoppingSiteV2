// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "", //insert the key here from the txt file
    authDomain: "frontedlectures.firebaseapp.com",
    databaseURL: "https://frontedlectures-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "frontedlectures",
    storageBucket: "frontedlectures.firebasestorage.app",
    messagingSenderId: "62827450167",
    appId: "1:62827450167:web:dcb7b01c573b49d9e414b2",
    measurementId: "G-5XZ927TD49"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)

export default database;
