import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase'; 
import * as ROUTES from '../../constants/routes';
 
const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
);



const INITIAL_STATE = {
  email: '',
  error: null,
  user: '',
};
 
class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }
 
  onSubmit = event => {
	const { email } = this.state;
 
     this.props.firebase
      .doSendSignInLinkToEmail(email)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        console.log(this.props.firebase.user);
        console.log(authUser);
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            email,
          });
      })
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
        console.log(error);
      });
 
    event.preventDefault();
  }
 
 onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };


 
  render() {

  	const {
      email,
      error,
    } = this.state;

const makeid = (length) => {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
} 

console.log(this.props.firebase.checkSignInToEmailLink(window.location.href));
     // const isInvalid =
     //  passwordOne !== passwordTwo ||
     //  passwordOne === '' ||
     //  email === '' ||
     //  username === '';

    return (
      <React.Fragment>
      <form onSubmit={this.onSubmit}>

        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
  
        <button type="submit">
          Sign Up
        </button>
 
        {error && <p>{error.message}</p>}
      </form>
      </React.Fragment>
    );
  }
}
 
const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);
 
export default SignUpPage;
 
export { SignUpForm, SignUpLink };