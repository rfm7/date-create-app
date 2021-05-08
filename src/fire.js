import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyC0-TimqJoYIwNPzPKf8bS3-xP41P2OCoM",
    authDomain: "date-create-d397a.firebaseapp.com",
    projectId: "date-create-d397a",
    storageBucket: "date-create-d397a.appspot.com",
    messagingSenderId: "136105040057",
    appId: "1:136105040057:web:51ea4d6033535d8d8ca368"
  };
  
const fire = firebase.initializeApp(firebaseConfig);

export default fire;