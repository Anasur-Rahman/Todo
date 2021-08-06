import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDe__hk231JKyuzMIkdWpTRQvImy4F3AqA",
  authDomain: "csb-todo.firebaseapp.com",
  projectId: "csb-todo",
  storageBucket: "csb-todo.appspot.com",
  messagingSenderId: "1014310243329",
  appId: "1:1014310243329:web:16a8ce2a889c4896934400",
  measurementId: "G-XP8SCDH6EE"
});

const db = firebaseApp.firestore();
export default db;
