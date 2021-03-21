import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from '../../components/Navigation/Navigation.js'; 
import FaceRecognition from '../../components/FaceRecognition/FaceRecognition.js'; 
import ImageLinkForm from '../../components/ImageLinkForm/ImageLinkForm.js'; 
import Logo from '../../components/Logo/Logo.js';
import Rank from '../../components/Rank/Rank.js';
import SignIn from '../../components/SignIn/SignIn.js';
import Register from '../../components/Register/Register.js';


const particlesOption = {
	particles: {
		number: {
			value: 80,
			density:{
				enable: true,
				value_area: 800,
			}
		}
	}
}

const initialState = {

		input:'',
		imageUrl:'',
		place: 'signin',
		isSignIn: false,
		box:{},
		user: {
			id: '',
		 name:'',
		 email:'',
		 entries: 0,
		 joined: ''
		}
	}


class App extends Component {
	constructor(){
		super()
		this.state= initialState
	}

	loadUser = (data) => {
		this.setState({user: {
			id: data.id,
       name: data.name,
       email: data.email,
       entries: data.entries,
       joined: data.joined
		}
	}
	)}

	calculateFaceLocation = (data) => {
		const clarifaiFace= data.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById('inputImage');
		const width = Number(image.width);
		const height = Number(image.height);
		return {
			leftCol: clarifaiFace.left_col * width,
			topRow: clarifaiFace.top_row * height,
			rightCol: width - (clarifaiFace.right_col*width),
			bottomRow: height - (clarifaiFace.bottom_row*width)
		}
	}

	displayFacebox = (box) =>{
		this.setState({box: box});
	}



	onInputChange = (event) => {
		this.setState({input: event.target.value})
	}

	onButtonsubmit = () => {
		this.setState({imageUrl:this.state.input});
			fetch('https://sleepy-basin-27459.herokuapp.com/imageUrl', {
					method: 'post',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify({
						input: this.state.input
					}) 
				})
				.then(response => response.json())
				.then(response => {
				if (response) {
					fetch('https://sleepy-basin-27459.herokuapp.com/image', {
						method: 'put',
						headers: {'Content-Type': 'application/json'},
						body: JSON.stringify({
						id: this.state.user.id
					}) 
				})
				.then(response => response.json())
				.then(count => {
					this.setState(Object.assign(this.state.user, {entries: count}))
				})
				.catch(console.log)
			}
			this.displayFacebox(this.calculateFaceLocation(response))
		})
		.catch(err => console.log(err));
	}

	onPlaceChange = (place) =>{	
		if (place === 'signin') {
			this.setState(initialState)
		} else if (place === 'inside') {
			this.setState({isSignIn: true})
		}	
		this.setState({place:place})
	}
	

	render(){
		return(
		<div>
			<Particles className='part'
				params={particlesOption}
			/>
	   	<Navigation onPlaceChange= {this.onPlaceChange} isSignIn={this.state.isSignIn} />
			 {
				 this.state.place === 'inside' 
				 	? <div>
							<Logo/>
							<Rank name={this.state.user.name} entries={this.state.user.entries}/>
							<ImageLinkForm onInputChange={this.onInputChange} onButtonsubmit={this.onButtonsubmit}/>
							<FaceRecognition imageUrl={this.state.imageUrl} box= {this.state.box} />
					 </div>
					: ( 
						this.state.place === 'signin' 
							?  <SignIn onPlaceChange={this.onPlaceChange} loadUser={this.loadUser}  />
							:	 <Register onPlaceChange={this.onPlaceChange} loadUser={this.loadUser} />
					)
				}	
    </div>
  );
	}
}
 


export default App;