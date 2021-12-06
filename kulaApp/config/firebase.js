import firebase from "firebase/app";
import "firebase/auth";
import Constants from "expo-constants";
import "firebase/firestore";


// Initialize Firebase
const firebaseConfig = {
  apiKey: Constants.manifest.extra.apiKey,
  authDomain: Constants.manifest.extra.authDomain,
  projectId: Constants.manifest.extra.projectId,
  storageBucket: Constants.manifest.extra.storageBucket,
  messagingSenderId: Constants.manifest.extra.messagingSenderId,
  databaseURL: Constants.manifest.extra.databaseURL,
  appId: Constants.manifest.extra.appId,
};

let Firebase;

if (firebase.apps.length === 0) {
  Firebase = firebase.initializeApp(firebaseConfig);
}
export const Firestore = firebase.firestore();
export default Firebase;

