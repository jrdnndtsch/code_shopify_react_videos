import React, {Component} from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import ProductFull from '../components/ProductFull';

class Product extends Component {

	createProductQuery(handle) {
		return gql `
			query query {
				shop{
						productByHandle(handle:"${handle}"){
						  title
						  id
						  description
						  tags
						  options {
						    id
						    name
						    values
						  }
						  variants(first:100) {
						    edges {
						      node {
						        id 
						        title
						        priceV2 {
						          amount
						        }
						        compareAtPriceV2 {
						          amount
						        }
						        availableForSale
						        selectedOptions {
						          name
						          value
						        }
						        image {
						          altText
						          thumbnailImg: transformedSrc(maxWidth:100, maxHeight: 120, crop:CENTER)
						          productImg: transformedSrc(maxWidth:800, maxHeight: 960, crop: CENTER)
						        }
						      }
						    }
						  }
						  images(first:50) {
						    edges {
						      node {
						        altText
						        thumbnailImg: transformedSrc(maxWidth:100, maxHeight: 120, crop:CENTER)
						        productImg: transformedSrc(maxWidth:800, maxHeight: 960, crop: CENTER)
						      }
						    }
						  }
						}
					}
				}
		`
	}
	render() {
		return(
			<Query query={this.createProductQuery(this.props.match.params.handle)}>
				{({loading, err, data}) => {
					if(!loading) {
						const product = data.shop.productByHandle
						return(<ProductFull product={product}/>)
					} else {
						return(<div>Loading...</div>)
					}

				}}
			</Query>
		)
	}
}

export default Product;