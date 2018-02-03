import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'

import Chat from './Modules/Chat/'

export const history = createBrowserHistory();

class App extends Component{
	render(){
		return (
				<BrowserRouter history={history}>
						<Switch>
							<Route exact path="/" name="Chat" component={Chat}></Route>
							<Redirect from="/" to="/"/>
						</Switch>
				</BrowserRouter>
			)
	}
}

export default App;
