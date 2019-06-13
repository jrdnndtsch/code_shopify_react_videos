import React from 'react';

const ProductDetails = (props) => {
	const { title, description, tags } = props;
	return(
		<section className="Product_details">
			<h1>{title}</h1>
			<div>{description}</div>
			{tags.map((tag, index) => <span key={`tag-${index}`}>{tags}</span>)}
		</section>
	)
}

export default ProductDetails;