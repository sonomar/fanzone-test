import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth()
    this.db = app.database();
    this.storage = app.storage();
    this.actionCodeSettings = {
      url: 'http://localhost:3000/signin',
      handleCodeInApp: true,
    };
  }

  // *** Auth API ***

  doSendSignInLinkToEmail = (email) =>
  this.auth.sendSignInLinkToEmail(email, this.actionCodeSettings)
  .then(function() {
    window.localStorage.setItem('emailForSignIn', email);
  })
  .catch(function(error) {
    console.log(error);
  });

  doSignInWithEmailLink = (email) => {
    console.log(window.location.href);
    this.auth.signInWithEmailLink(email, window.location.href);
  }

  checkSignInToEmailLink = (link) =>
  this.auth.isSignInWithEmailLink(link);
 
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
 
  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  // *** User API ***
 
  user = uid => this.db.ref(`users/${uid}`);
 
  users = () => this.db.ref('users');
}
 
export default Firebase;