import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyDoPFdt3ohS8n_PbYlhBRCW4g4Kl0E2mW4",
    authDomain: "androit-ded01.firebaseapp.com",
    databaseURL: "https://androit-ded01.firebaseio.com",
    projectId: "androit-ded01",
    storageBucket: "",
    messagingSenderId: "419821017985",
    appId: "1:419821017985:web:a92f19acc59958d5"
  };
  const fire = firebase.initializeApp(config) 

export default fire;
