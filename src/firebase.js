// src/firebase.js

// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase/app';

// Add the Firebase products that you want to use
import 'firebase/firestore';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyBnkwIdKLETP1LfjP8G7idDNUxD4LqKmhQ",
    authDomain: "lieforalife-f1479.firebaseapp.com",
    databaseURL: "https://lieforalife-f1479.firebaseio.com",
    projectId: "lieforalife-f1479",
    storageBucket: "lieforalife-f1479.appspot.com",
    messagingSenderId: "295040554059",
    appId: "1:295040554059:web:99bad4c700afd1eb16e9ce",
    measurementId: "G-E5DXPPYHTQ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
