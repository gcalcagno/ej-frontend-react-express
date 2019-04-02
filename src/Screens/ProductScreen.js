import React, { Component } from 'react'
// Screen Styles
import '../Styles/Css/ProductScreen.css'
// Components
import BreadCrumb from '../Components/BreadCrumb.js'

class ProductScreen extends Component {

  constructor (props) {
    super(props)
    this.state = {
      product : {}
    }
    this.productID = (this.props.match.params && this.props.match.params.id) || null
  }


  componentDidMount () {
    this._getProduct()
  }


  // Get Product Data
  _getProduct (searchString) {
    fetch(`http://localhost:5000/api/items/${this.productID}`)
    .then(res => res.json())
    .then(product => this.setState({ product: product.item }))
    .catch(function() {
      console.log("Can't connect to backend try latter");
    });
  }


  // Render Breadcrumb
  _renderBreadcrumb () {
    if (this.state.product.item.breadCrumbs) {
      return <BreadCrumb categories={this.state.product.item.breadCrumbs}/>
    }
  }


  // Render Product 
  _renderProduct () {
    const { product } =  this.state
    let condition = product.item.condition === 'new' ? 'Nuevo' : 'Usado'
    return (
      <div className="container-fluid productDetailContainer">
        <div className="row">
          <div className="col-sm-8 col-md-8 columnLeft">
            <img src={product.item.picture} alt={product.item.title} className="productImg" />
            <h3 className="titleDescription">Descripción del producto</h3>
            <p> {product.item.description} </p>
          </div>
          <div className=" col-sm-4 order-sm-0 order-first col-md-4 columnRight">
            <div className="container-fluid groupItems">
              <div className="row">
                <p className="new">{condition}</p>
                <p className="soldQuantity"> - {product.item.sold_quantity} vendidos </p>
              </div>
            </div>
            <div>
              <h1 className="title">{product.item.title}</h1>
              <p className="price">$ {product.item.price.amount} </p>
              <button className="btn">Comprar</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render () {
    return (
      <div className="container-fluid appContainer">
        <div className="col-sm-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
          {this.state.product.item && this._renderBreadcrumb()}
          <div className="bgWhite">
            {this.state.product.item && this._renderProduct()}
          </div>
        </div>
      </div>
    );
  }
}

export default ProductScreen
