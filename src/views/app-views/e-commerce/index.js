import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import ProductList from './product-list'
import AddProduct from './add-product'
import EditProduct from './edit-product'

const Ecommerce = props => {
  const { match } = props
  //console.log("match",match)
	return (
		<Switch>
			<Redirect exact from={`${match.url}`} to={`${match.url}/lista-prodotti`} />
			<Route path={`${match.url}/aggiungi-prodotto`} component={AddProduct} />
			<Route path={`${match.url}/modifica-prodotto/:id`} component={EditProduct} />
			<Route path={`${match.url}/lista-prodotti`} component={ProductList} />
		</Switch>
	)
}

export default Ecommerce;