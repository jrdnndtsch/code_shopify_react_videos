import React from 'react';

const ProductBtn = (props) => {
	const { selectedVariant, addVariant } = props;
	return(
		<div>
			{selectedVariant.availableForSale ? (
				<button onClick={() => addVariant(selectedVariant.id)}>Add to Cart</button>
			) : (
				<button>Sold Out</button>
			)}
		</div>
	)

}

export default ProductBtn;