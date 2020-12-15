import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase'; 
import * as ROUTES from '../../constants/routes';
 
const Landing = () => (
  <div>
    <h1>Landing</h1>
    <LandingForm />
  </div>
);


class LandingBase extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      email: '',
	      code: '',
		  error: null,
		  team: '',
		  prize: '',
		  firstName: '',
		  lastName: '',
		  profilePic: '',
		  friendEmail: '',
  		};
 	}

 	makeId = (length) => {
	   var result           = '';
	   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	   var charactersLength = characters.length;
	   for ( var i = 0; i < length; i++ ) {
	      result += characters.charAt(Math.floor(Math.random() * charactersLength));
	   }
	   return result;
	} 

	 onSubmitEmail = event => {
	 	const code = this.makeId(8);
		const { email } = this.state;
	     this.props.firebase.user(code).set({
	     	email,
	     })
	  	.then(function() {
    		window.localStorage.setItem('userCode', code);
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

	 onSubmitTeam = event => {
	 	let code = window.localStorage.getItem('userCode');
		const { team } = this.state;
	     this.props.firebase.user(code).update({
	     	team,
	     })
	    .catch(error => {
		    this.setState({ error });
		    console.log(error);
		});
	 
	 
	    event.preventDefault();
	  }

	  onSubmitPrize = event => {
	 	let code = window.localStorage.getItem('userCode');
		const { prize } = this.state;
	     this.props.firebase.user(code).update({
	     	prize,
	     })
	    .catch(error => {
		    this.setState({ error });
		    console.log(error);
		});
	 
	 
	    event.preventDefault();
	  }

	  onSubmitName = event => {
	 	let code = window.localStorage.getItem('userCode');
		const { firstName, lastName } = this.state;
	     this.props.firebase.user(code).update({
	     	firstName, lastName
	     })
	    .catch(error => {
		    this.setState({ error });
		    console.log(error);
		});
	 
	 
	    event.preventDefault();
	  }

	render() {
		const {
	      email,
	      code,
	      error,
	      team,
	      prize,
	      firstName,
	      lastName,
	      profilePic,
	      friendEmail,
	    } = this.state;

	 	return (
		 	<React.Fragment>	
			  <form onSubmit={this.onSubmitEmail}>
		        <input
		          name="email"
		          value={email}
		          onChange={this.onChange}
		          type="text"
		          placeholder="Email Address"
		        />
		  
		        <button type="submit">
		          Submit Email
		        </button>
		 
		        {error && <p>{error.message}</p>}
		      </form>

		      <form onSubmit={this.onSubmitTeam} name="team">

				<label>Choose a team:</label>
				<div id="teams">
				  <input type="radio" name="team" value="Berlin" onChange={this.onChange} />
				   <label>Berlin</label>
				  <input type="radio" name="team" value="Cologne" onChange={this.onChange} />
				   <label>Cologne</label>
				  <input type="radio" name="team" value="Frankfurt" onChange={this.onChange} />
				   <label>Frankfurt</label>
				 </div>
		          <button type="submit">
		          Submit Team
		        </button>
		 
		        {error && <p>{error.message}</p>}
		      </form>

		       <form onSubmit={this.onSubmitPrize} name="prize">

				<label>Choose a team:</label>
				<div id="teams">
				  <input type="radio" name="prize" value="Card" onChange={this.onChange} />
				   <label>Card</label>
				  <input type="radio" name="prize" value="Hat" onChange={this.onChange} />
				   <label>Hat</label>
				  <input type="radio" name="prize" value="Sticker" onChange={this.onChange} />
				   <label>Sticker</label>
				 </div>
		          <button type="submit">
		          Submit Prize
		        </button>
		 
		        {error && <p>{error.message}</p>}
		      </form>

		      <form onSubmit={this.onSubmitName}>
		        <input
		          name="firstName"
		          value={firstName}
		          onChange={this.onChange}
		          type="text"
		          placeholder="First Name"
		        />

		        <input
		          name="lastName"
		          value={lastName}
		          onChange={this.onChange}
		          type="text"
		          placeholder="Last Name"
		        />
		  
		        <button type="submit">
		          Submit Name
		        </button>
		 
		        {error && <p>{error.message}</p>}
		      </form>

		      <button>Upload Image</button>

		    </React.Fragment>
		);
	}
}

const LandingForm = compose(
	  withRouter,
	  withFirebase,
	)(LandingBase);
 
export default Landing;

export {LandingForm}