import React, {Component} from 'react';

import ProductGallery from './ProductGallery';
import ProductVariants from './ProductVariants';
import ProductDetails from './ProductDetails';
import ProductBtn from './ProductBtn';

class ProductFull extends Component {
	constructor(){
		super();
		this.state = {
			selectedImg: {}, 
			selectedOptions: {}, 
			selectedVariant: {}
		}
		this.updateSelectedImg = this.updateSelectedImg.bind(this);
		this.handleOptionChange = this.handleOptionChange.bind(this);
	}

	updateSelectedImg(image){
		this.setState({selectedImg: image})
	}

	getInitialSelectedOptions(options){
		return options.reduce((acc, next) => {
			acc[next.name] = next.values[0]
			return acc;
		}, {})
	}

	handleOptionChange(event){
		const newSelectedOptions = Object.assign({...this.state.selectedOptions}, {[event.target.name]: event.target.value})
		this.setState({selectedOptions: newSelectedOptions})
	}

	getVariantForSelectedOptions(selectedOptions, variants){
		return variants.find(variant => {
			return variant.node.selectedOptions.every(selectedOption => selectedOptions[selectedOption.name] === selectedOption.value)
		}).node
	}


	componentDidUpdate(prevProps, prevState){
		if(prevState.selectedOptions !== this.state.selectedOptions) {
			this.setState({selectedVariant: this.getVariantForSelectedOptions(this.state.selectedOptions, this.props.product.variants.edges)})
		}
	}

	componentDidMount(){
		const selectedOptions = this.getInitialSelectedOptions(this.props.product.options);
		this.setState({selectedImg: this.props.product.images.edges[0].node, selectedOptions: selectedOptions})
	}
	render() {
		const { product } = this.props
		const { selectedImg, selectedOptions, selectedVariant } = this.state
		return(
			<div className="Product">
				<ProductGallery
					images={product.images.edges}
					selectedImg={selectedImg}
					updateSelectedImg={this.updateSelectedImg}
				/>
				<section className="Product_info">
					<ProductDetails
						title={product.title}
						description={product.description}
						tags={product.tags}
					/>
					<ProductVariants
						options={product.options}
						selectedOptions={selectedOptions}
						handleOptionChange={this.handleOptionChange}
					/>
					<ProductBtn
						selectedVariant={selectedVariant}
						addVariant={this.props.addVariant}
					/>
				</section>
			</div>
		)
	}
}

export default ProductFull;