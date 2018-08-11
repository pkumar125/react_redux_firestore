import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCS0GlXTqMZt3ecewphx5_aeYLZqRa8pS0",
  authDomain: "reduxreactfirebase.firebaseapp.com",
  databaseURL: "https://reduxreactfirebase.firebaseio.com",
  projectId: "reduxreactfirebase",
  storageBucket: "reduxreactfirebase.appspot.com",
  messagingSenderId: "503003533124"
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
/* your settings... */
const settings = {timestampsInSnapshots: true };
firestore.settings(settings);

export default firebase;
