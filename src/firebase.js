import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCgZ6lDLqE6xdrMmy8nDB4GVJNPeUuBpaM",
  authDomain: "volunteer-a8b1f.firebaseapp.com",
  databaseURL: "https://volunteer-a8b1f.firebaseio.com",
  projectId: "volunteer-a8b1f",
  storageBucket: "volunteer-a8b1f.appspot.com",
  messagingSenderId: "413876170213"
}

firebase.initializeApp(config);

export default firebase;
