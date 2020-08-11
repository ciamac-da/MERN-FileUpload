import React, { Component } from 'react';
import axios from 'axios';
import { Button, Card } from 'react-bootstrap';
// Home component! 
class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedFile: null
		}
	}
	singleFileChangedHandler = ( event ) => {
       console.log(event.target.files);
		this.setState({
		 selectedFile: event.target.files[0]
		});
	};
	
	singleFileUploadHandler = ( event ) => {
		const data = new FormData();
		if ( this.state.selectedFile ) {
			data.append( 'profileImage', this.state.selectedFile, this.state.selectedFile.name );
			axios.post( '/api/profile/profile-img-upload', 
			data, {
				headers: {
			'accept': 'application/json',
			'Accept-Language': 'en-US,en;q=0.8',
			'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
			}
		})
		.then( ( response ) => {if ( 200 === response.status ) {
		if( response.data.error ) {
		
		} else {
		let fileName = response.data;
			console.log( 'filedata', fileName );
		}
		}
		}).catch( ( error ) => {
	});
	} else {
    	}};
	render() {
		console.log(this.state)
		return (
			<div className="container">
				{/* Single File Upload*/}
				<div id="oc-alert-container"></div>
				<div className="card border-light mb-3 mt-5" style={{ boxShadow: '0 5px 10px 2px rgba(195,192,192,.5)' }}>
					<div className="card-header">
						<h3 style={{ color: '#555', marginLeft: '12px' }}>Single Image Upload</h3>
						<p className="text-muted" style={{ marginLeft: '12px' }}>Upload Size: 250px x 250px ( Max 2MB )</p>
					</div>
					<div className="card-body">
						<p className="card-text">Please upload an image for your profile</p>
						<input type="file" onChange={this.singleFileChangedHandler} />
						<div className="mt-5">
							<Button className="btn btn-info" onClick={this.singleFileUploadHandler}>Upload!</Button>
						</div>
					</div>
				</div>
			</div>


);
	}
}

export default Home;