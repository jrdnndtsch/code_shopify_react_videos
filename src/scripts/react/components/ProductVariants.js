import React from 'react';

const ProductVariants = (props) => {
	const { options, selectedOptions, handleOptionChange } = props

	return(
		<section className="Product_variants">
			{options.map((option, index) => {
				return(
					<div key={`option-${index}`}>
						<span>{option.name}</span>
						{option.values.map((val, i) => {
							return(
								<div key={`option-value-${option.name}-${i}`}>
									<label htmlFor={val}>{val}</label>
									<input
										type="radio"
										name={option.name}
										value={val}
										id={val}
										checked={val == selectedOptions[option.name]}
										onChange={handleOptionChange}
									/>
								</div>
							)
						})}
					</div>
				)

			})}
		</section>
	)
}

export default ProductVariants;