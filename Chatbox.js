import React, { Component } from 'react';
import {Link} from 'react-router'
import Mesg from '../../components/mesg/Mesg';

class Chatbox extends Component{
	state = {socket:null,items:[],text:''};

	onChange(e){
		this.setState({text:e.target.value});
	}
	
	handleSubmit = (e) => {
		e.preventDefault();

		if (!this.state.text) return false;
    	if (!this.state.socket) {
      		alert("Error: There is no socket connection.");
      		return false;
    	}

    	this.state.socket.send(this.state.text);
    	return false;
	}


		

	componentDidMount(){

		if (!window["WebSocket"]) {
    		alert("Error: Your browser does not support web sockets.")
  		} else {
    		const newsocket = new WebSocket("ws://localhost:3030/room");
    		this.setState({socket:newsocket})
    		newsocket.onclose = function() {
      		alert("Connection has been closed.");
    		}
    		
    		newsocket.onmessage = (e) => {
    			const nextItems=this.state.items.concat([{text:e.data,id:Date.now()}]);
				const nextText='';
				this.setState({items:nextItems,text:nextText});
    		}			
    	
  		}
	}

	render(){
		return (
			<div>
			<Link to='/'><button>Home</button></Link>
			<Mesg items={this.state.items}/>
			<form onSubmit={this.handleSubmit}>
				<textarea onChange={(e) => this.onChange(e)} value={this.state.text} autoFocus></textarea>
				<button>Send</button>
			</form>
			</div>
			)
	}
}

export default Chatbox;