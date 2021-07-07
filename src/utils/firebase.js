import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCMXydlNPLDFIMTJqK4MyUboM4KwzWSABs",
    authDomain: "inventories-45968.firebaseapp.com",
    projectId: "inventories-45968",
    storageBucket: "inventories-45968.appspot.com",
    messagingSenderId: "839383039978",
    appId: "1:839383039978:web:27d96d40dd684b1a613c93"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;