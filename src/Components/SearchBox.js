import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// Component Styles
import '../Styles/Css/SearchBox.css'
// Images
import {Images} from '../Images/Images'


class SearchBox extends Component {

	constructor (props) {
        super(props)
        this.state = {
            inputValue: ''
        } 

        this.retina = window.devicePixelRatio > 1
        this.imgLogo = this.retina ? Images.logoRetina : Images.logo
        this.imgSearch = this.retina ? Images.searchRetina : Images.search
    }


    // Handle input change
    _handleInputChange (event) {
		this.setState({inputValue: event.target.value})
	}


    // Handle submit
	handleSubmit (event) {
		if (this.state.inputValue) {
            this.props.history.push(`/items/search/${this.state.inputValue}`) 
            event.preventDefault()
		}
	}


	render () {
		return (
			<nav className="nav justify-content-center col-12">
            	<ul className="col-sm-12 col-md-10 col-lg-8">
        			<li className="col-12">
        				<form onSubmit={this.handleSubmit.bind(this)}>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <Link to="/"><img src={this.imgLogo} alt="Logo MercadoLibre" className="brandIcon"/></Link>
                                </div>
                                <input type="text" className="form-control" aria-label="Buscar" 
                                    value={this.state.inputValue} 
                                    onChange={this._handleInputChange.bind(this)} 
                                    placeholder="Nunca dejes de buscar"/>
                                <div className="input-group-append">
                                    <span className="input-group-text">
                                        <input type="image" src={this.imgSearch} value="Buscar" className="searchIcon" alt={'buscar'}/>
                                    </span>
                                </div>
                            </div>
                        </form>
                    </li>
            	</ul>
            </nav>
    	)
	}

}

export default SearchBox