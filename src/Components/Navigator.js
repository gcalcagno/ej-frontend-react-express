import React, { Component } from 'react'
import { Route } from 'react-router-dom'
// Screens
import HomeScreen from '../Screens/HomeScreen.js'
import ProductScreen from '../Screens/ProductScreen.js'
import SearchScreen from '../Screens/SearchScreen.js'

class Navigator extends Component {

	render () {
	    return (
	    	<div>
	    		<Route exact path="/" component={HomeScreen} />
                <Route exact path="/items/search/:searchString" component={SearchScreen} />
                <Route exact path="/items/:id" component={ProductScreen} />
	        </div>
	    )
	}

}

export default Navigator