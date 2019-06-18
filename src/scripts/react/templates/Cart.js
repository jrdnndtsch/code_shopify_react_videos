import React from 'react';
import CartLineItem from '../components/CartLineItem';

const Cart = (props) => {
	const { checkout, clearCart, toggleCart } = props;
	return(
		<div className="Cart">
			{checkout.lineItems ? (
				<div>
					<span onClick={ toggleCart }>Close</span>
					{checkout.lineItems.edges.map((item, index) => (
						<CartLineItem item={item.node} key={`line-item-${index}`} />
					))}
					<a href={checkout.webUrl}>Checkout</a>
					<span onClick={ clearCart }>Clear Cart</span>
				</div>
			) : (
				<div>Loading...</div>
			)}
		</div>
	)
}	

export default Cart;