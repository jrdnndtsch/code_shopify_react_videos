import React, {Component} from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import {graphql, compose} from 'react-apollo';
import Product from './templates/Product';
import Cart from './templates/Cart';

import {createCheckout, checkoutLineItemsReplace} from './checkout';

class App extends Component {

	constructor() { 
		super();
		this.state = {
			checkout: {}, 
			lineItems: [], 
			cartOpen: false
		}

		this.addVariant = this.addVariant.bind(this);
		this.toggleCart = this.toggleCart.bind(this);
		this.clearCart = this.clearCart.bind(this);
	}

	toggleCart() {
		this.setState({cartOpen: !this.state.cartOpen});
	}

	addVariant(variantId) {
		const lineItems = this.state.storedLineItems.find(item => item.variantId === variantId ) ? this.state.storedLineItems.map(item => ({...item, quantity: item.variantId === variantId ? item.quantity + 1 : item.quantity})) : [...this.state.storedLineItems, {"variantId": variantId, "quantity": 1}];

		this.props.checkoutLineItemsReplace({
			variables: {
				checkoutId: this.state.checkout.id, 
				lineItems: lineItems
			}
		})
			.then(res => this.setState({checkout: res.data.checkoutLineItemsReplace.checkout, lineItems: res.data.checkoutLineItemsReplace.checkout.lineItems.edges}));
	}

	clearCart() {
		this.props.checkoutLineItemsReplace({
			variables: {
				checkoutId: this.state.checkout.id, 
				lineItems: []
			}
		})
			.then(res => this.setState({ checkout: res.data.checkoutLineItemsReplace.checkout, lineItems: res.data.checkoutLineItemsReplace.checkout.lineItems.edges}))
	}

	cartQuantity() {
		return this.state.lineItems.reduce((acc, next) => {
			acc += next.node.quantity
			return acc;
		}, 0)
	}

	addLineItemsToStorage(lineItems){
		const linItemsMapped = lineItems.map(item => ({variantId: item.node.variant.id, quantity: item.node.quantity}))
		localStorage.setItem('react_store_checkout_items', JSON.stringify(linItemsMapped));
		return linItemsMapped
	}

	componentDidMount() {
		const lineItems = localStorage.react_store_checkout_items ? JSON.parse(localStorage.getItem('react_store_checkout_items')) : [];

		this.props.createCheckout({
			variables: {
				input: {lineItems: lineItems}
			}
		})
		.then(res => this.setState({checkout: res.data.checkoutCreate.checkout, lineItems: res.data.checkoutCreate.checkout.lineItems.edges}))
	}

	componentDidUpdate(prevProps, prevState){
		if(prevState.lineItems !== this.state.lineItems){
			const storedLineItems = this.addLineItemsToStorage(this.state.lineItems)
			this.setState({storedLineItems: storedLineItems});
		}
	}

	render() {
		return(
			<React.Fragment>
				<Router>
					<Route
						path="/products/:handle"
						exact
						render={(props) => <Product {...props} addVariant={this.addVariant}/>}
					>
					</Route>
				</Router>
				<span className="Cart_open" onClick={this.toggleCart}>cart {this.cartQuantity()}</span>
				{this.state.cartOpen && 
					<Cart 
						checkout={this.state.checkout}
						clearCart={ this.clearCart }
						toggleCart={ this.toggleCart }
					/>
				}
				
			</React.Fragment>
			

		)
	}
}

const AppWithData = compose(
	graphql(createCheckout, {name: 'createCheckout'}), 
	graphql(checkoutLineItemsReplace, {name: 'checkoutLineItemsReplace'})
)(App)

export default AppWithData;