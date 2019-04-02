import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// Screen Styles
import '../Styles/Css/SearchScreen.css'
// Images
import {Images} from '../Images/Images'
// components
import BreadCrumb from '../Components/BreadCrumb.js'

class SearchScreen extends Component {

  constructor (props) {
    super(props)
    this.state = {
      productsList: null
    }

    this.searchString = props.match.params.searchString

    this.retina = window.devicePixelRatio > 1
    this.imgShipping = this.retina ? Images.shippingRetina : Images.shipping
  }


  componentDidMount () {
    if (this.searchString) {
      this._getProducts(this.searchString)
    }
  }


  componentWillReceiveProps (nextProps) {
    console.log('nextProps', nextProps)
    if (this.searchString && this.searchString !== nextProps.match.params.searchString) {
      this._getProducts(nextProps.match.params.searchString)
    }
  }


  // Retrieves the list of products from the Express app
  _getProducts (searchString) {
    fetch(`http://localhost:5000/api/items?q=${searchString}`)
    .then(res => res.json())
    .then(productsList => this.setState({ productsList }))
    .catch(function() {
      console.log("Can't connect to backend try latter");
    });
  }


  // Render Product List
  _renderProductList () {
    return this.state.productsList.items.map((d, i) => {
      return (
        <Link to={`/items/${d.id}`} key={i} className="productContainer">
          <div className="container-fluid">
            <div className="row item">
              <div className="col-auto">
                <img src={d.picture} alt={d.title} className="productImg" />
              </div>
              <div className="col">
                <div className="container-fluid">
                  <div className="row productPrice justify-content-between">
                    <div className="priceContainer">
                      <p className="price">$ {d.price.amount} </p>
                      {d.free_shipping === true && <img src={this.imgShipping} alt={"free shipping"} className="shipping" />}
                    </div>
                    <p className="city"> {d.city} </p>
                  </div>
                </div>
                <div className="container-fluid">
                  <p className="row productTitle">{d.title}</p>
                </div>
              </div>
            </div>
          </div>
        </Link> 
      )
    })
  }


  // Render Product
  _renderProduct (product) {
    return (
      <div className="itemsGroup">
        <p> {this.state.product.description} </p>
      </div>
    )
  }

  // Render Breadcrumb
  _renderBreadcrumb () {
    if (this.state.productsList.breadCrumbs) {
      return <BreadCrumb categories={this.state.productsList.breadCrumbs}/>
    }
  }


  render () {
    return (
      <div className="container-fluid appContainer">
        <div className="col-md-10 offset-md-1 col-lg-8 offset-lg-2">
          {this.state.productsList && this._renderBreadcrumb()}
          <div className="bgWhite">
            {this.state.productsList && this._renderProductList()}
          </div>
        </div>
      </div>
    )
  }
}

export default SearchScreen
