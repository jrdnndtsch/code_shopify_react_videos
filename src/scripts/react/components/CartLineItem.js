import React from 'react';

const CartLineItem = (props) => {
	const { title, image, price } = props.item.variant
	const { quantity } = props.item

	return(
		<div className="Cart_line-item">
			<img src={image.transformedSrc}/>
			<div>
				<span>{title}</span>
				<span>quantity: {quantity}</span>
				<span>${price * quantity}</span>
			</div>
		</div>
	)
}

export default CartLineItem;