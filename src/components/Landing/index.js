import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase'; 
import * as ROUTES from '../../constants/routes';
import { Plugins } from '@capacitor/core';
import {
    IonPage,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    button,
    IonCol,
    IonRow,
    IonInput,
    IonText,
} from '@ionic/react';
 
const Landing = () => (
  <div>
    <IonTitle>Landing</IonTitle>
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
		  team: [],
		  prize: '',
		  firstName: '',
		  lastName: '',
		  profilePic: '',
		  friendEmail: '',
		  allInputs: {imgUrl: ''},
		  imageAsFile: '',
		  imageAsUrl: '',
		  setImageAsUrl: '',
		  imagePrefix: '',
		  imageFileName: '',
		  showAll: false,  
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

	handleImageAsFile = event => {
		const image = event.target.files[0];
		const { imageAsFile } = this.state;
		this.setState({imageAsFile: image});
	}

	handleFireBaseUpload = event => {
	  event.preventDefault()
	  const code = window.localStorage.getItem('userCode');
	  if(this.state.imageAsFile === '' ) {
      	console.error('not an image, the image file is a ${typeof(imageAsFile)}')
	  }
	  const uploadTask = this.props.firebase.storage.ref(`/images/${this.state.imageAsFile.name}`).put(this.state.imageAsFile)
	   uploadTask.on('state_changed', 
	    (snapShot) => {
	      //takes a snap shot of the process as it is happening
	      console.log(snapShot)
	    }, (err) => {
	      //catches the errors
	      console.log(err)
	    }, () => {
	      // gets the functions from storage refences the image storage in firebase by the children
	      // gets the download url then sets the image from firebase as the value for the imgUrl key:
	      this.props.firebase.storage.ref('images').child(this.state.imageAsFile.name).getDownloadURL()
	       .then(profilePicUrl => {
	       	 const { imageAsUrl, imageAsFile } = this.state;
	         this.setState({imageAsUrl: profilePicUrl});
	            this.props.firebase.user(code).update({
		        profilePicUrl,
		     })
		    .catch(error => {
			    this.setState({ error });
			    console.log(error);
			});
     }) }
    )
	}

	 onSubmitEmail = event => {
	 	const code = this.makeId(8);
		const { email, showAll } = this.state;
	     this.props.firebase.user(code).set({
	     	email, sports: 'soccer', username: this.state.email,
	     })
	  	.then(result => {
    		window.localStorage.setItem('userCode', code);
    		this.setState({showAll: true});
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

	 onChangeTeam = event => {
	 	console.log(this.state.team);
	 	let teamsArray = this.state.team;
	 	if(event.target.checked == true) {
	 		teamsArray.push(event.target.value)
	 	}
	 	else {
	 		teamsArray = teamsArray.filter(function(element) {
	 			return element != event.target.value;
	 		});
	 	}
	 	console.log(teamsArray);
	    this.setState({ team: teamsArray.sort() });
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
	      showAll,
	    } = this.state;

	    console.log(this.state.imageAsFile)

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

		      {   this.state.showAll &&
		      	  <React.Fragment>	
			      <form onSubmit={this.onSubmitTeam} name="team">

					<label>Choose a team:</label>
					<div id="teams">
						  <div className="team_radio">
							  <input type="checkbox" name="team" value="Berlin" onChange={this.onChangeTeam} />
							  <label>Berlin</label>
					      </div>
						  <div className="team_radio">
							  <input type="checkbox" name="team" value="Cologne" onChange={this.onChangeTeam} />
							  <label>Cologne</label>
					      </div>
						  <div className="team_radio">
							  <input type="checkbox" name="team" value="Frankfurt" onChange={this.onChangeTeam} />
							  <label>Frankfurt</label>
					      </div>
					 </div>
			          <button type="submit">
			          Submit Team
			        </button>
			 
			        {error && <p>{error.message}</p>}
			      </form>

			       <form onSubmit={this.onSubmitPrize} name="prize">

					<label>Choose a Prize:</label>
					<div id="prizes">
					   <div className="prize_radio">
						   <input type="radio" name="prize" value="Card" onChange={this.onChange} />
						   <label>Card</label>
					   </div>
					   <div className="prize_radio">
						   <input type="radio" name="prize" value="Hat" onChange={this.onChange} />
						   <label>Hat</label>
					   </div>
					   <div className="prize_radio">
						   <input type="radio" name="prize" value="Sticker" onChange={this.onChange} />
						   <label>Sticker</label>
					   </div>
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

			      <form onSubmit={this.handleFireBaseUpload}>
			      	<input type="file"  onChange={this.handleImageAsFile}/>
			      	<button>upload to firebase</button>
			      </form>

			      <img src={this.state.imageAsUrl} alt="image tag" />

			      </React.Fragment>	

		     }

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