import React from 'react'
import ProductForm from '../ProductForm';

const EditProduct = props => {
	console.log(props)
	return (
		<ProductForm mode="EDIT" param={props.match.params} articolo={props} />
	)
}

export default EditProduct
