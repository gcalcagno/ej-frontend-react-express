// Functions
const fetch = require("node-fetch");

class ProductsService {

	// Get Product List
    getProductsList({ searchString }) {
        return fetch(`https://api.mercadolibre.com//sites/MLA/search?q=${searchString}`)
	    .then((response) => response.json())
	    .then((res) => {
	    	if (res) {
	    		let items = res.results
	    		let limit = 4

	    		// category with more results
	    		let categories = res.available_filters[0].values
	    		let categoryMoreResults = categories.reduce((prev, current) => {
				    return (prev.results > current.results) ? prev : current
				})

				return fetch(`https://api.mercadolibre.com/categories/${categoryMoreResults.id}`)
    				.then((response) => response.json())
    				.then((category) => {

			    		if (limit && items.length > limit) {
			    			items = items.slice(0, limit)
			    		}

			    		let productsList = {
				            categories:[],
				            items:[],
				            breadCrumbs: category.path_from_root,
				        }

			    		items.map(r => {
			    			let item = {
				            	"id": r.id,
				            	"title": r.title,
				            	"price": {
				            		"currency": r.currency_id,
				            		"amount": r.price,
				            		"decimals": r.price.toFixed(2).split(".")[1]
				            	},
				           		"picture": r.thumbnail,
				            	"condition": r.condition,
				            	"free_shipping": r.shipping.free_shipping,
				            	"city": r.seller_address.city.name
				            }
					        productsList.categories.push(r.category_id)
			    			productsList.items.push(item)
			    		})
			    		return productsList
	    			})
		    }
	    })
	    .catch((error) => {
	     console.error(error)
		})
    }



    // Get Product 
    getProduct({ id }) {
        let urls = [
	        `https://api.mercadolibre.com/items/${id}`,
	        `https://api.mercadolibre.com/items/${id}/description`
    	]

	    // get product
	    return Promise.all(urls.map(url => fetch(url)))
			.then(resp => Promise.all( resp.map(r => r.json()) ))
			.then(results => {
			    if (results) {

		    	// get product categories
		    	return fetch(`https://api.mercadolibre.com/categories/${results[0].category_id}`)
    				.then((response) => response.json())
    				.then((category) => {
    					let product = {
				            "item":{
				              "id": results[0].id,
				              "title": results[0].title,
				              "price": {
				                "currency": results[0].currency_id,
				                "amount": results[0].price,
				                "decimals": results[0].price.toFixed(2).split(".")[1]
				              },
				              "picture": results[0].thumbnail,
				              "condition": results[0].condition,
				              "free_shipping": results[0].shipping.free_shipping,
				              "sold_quantity": results[0].sold_quantity,
				              "description": results[1].plain_text,
				              "breadCrumbs": category.path_from_root,
				            }
				        }
				        return product
    				})
		    }
		})
    }


}

module.exports = ProductsService