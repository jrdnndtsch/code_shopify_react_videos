import React, {Component} from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import Product from './templates/Product';

class App extends Component {
	render() {
		return(
			<Router>
				<Route
					path="/products/:handle"
					exact
					render={(props) => <Product {...props}/>}
				>
				</Route>
			</Router>
		)
	}
}

export default App;