import React from 'react';

const ProductGallery = (props) => {
	const {images, selectedImg, updateSelectedImg} = props
	return(
		<section className="Product_gallery">
			<img src={selectedImg.productImg} alt={selectedImg.altText}/>
			<ul className="thumbnails">
				{ images.map((image, index) => (
					<li key={`thumbnail-${index}`} onClick={() => updateSelectedImg(image.node)}>
						<img src={image.node.thumbnailImg} alt={image.node.altText}/>
					</li>
				)) }
			</ul>
		</section>
	)
}

export default ProductGallery;