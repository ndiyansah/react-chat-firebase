import React, { Component } from 'react';
import firebase from 'firebase';
import moment from 'moment';
import config from '../../Config/Firebase';

console.log(config)
var fire = firebase.initializeApp(config);

class Chat extends Component {
	constructor(props){
		super(props);
		this.state = {
			messages : [],
			pesan:'',
		}
		this.fire = fire.database();
		this.cr =  this.fire.ref('/messages/')
		this.handleChange = this.handleChange.bind(this);

	}

	componentDidMount(){
		this.cr.on('child_added', data =>{
			var messages = this.state.messages;
			messages.push(data.val())
			this.setState({messages: messages});
		})
	}

	handleChange(e){
		this.setState({pesan:e.target.value})
	}

	submitChat(e){
		let data = this.state;
		fire.database().ref('/messages/').push().set({
			message: data.pesan,
			time: moment().format('LLL')
		})
		e.preventDefault();
		this.setState({message:''})
	}

  render() {
    return (
      <div className="container">
				<div className="headerChat">
					<h2>React Chat Firebase</h2>
					Github : <a href="https://github.com/ndiyansah/react-chat-firebase">https://github.com/ndiyansah/react-chat-firebase</a>
				</div>
      	<div className="listChat">
      		<ul className="list-group">
      			{this.state.messages.map((v,i) =>
      				<li className="list-group-item" key={i}>{v.message} | <span style={{color:"grey"}}>{v.time}</span></li>)
      			}
					</ul>
      	</div>
      	<div className="container bottomInput">
      		<form onSubmit={this.submitChat.bind(this)}>
	      		<div className="col-md-10 col-xs-10">
	      			<textarea
	      			className="formInput"
	      			value={this.state.pesan}
	      			onChange={this.handleChange}
	      			required></textarea>
	      		</div>
	      		<div className="col-md-2 col-xs-2">
		      		<button
		      			type="submit"
			      		className="btn btn-md btn-success"
		      		>
		      		Submit
		      		</button>
	      		</div>
	      	</form>
      	</div>
      </div>
    );
  }
}

export default Chat;
