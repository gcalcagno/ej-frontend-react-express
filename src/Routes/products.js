const express = require("express")
const router = express.Router()
const ProductsService = require("../Services/ApiML")

const productsService = new ProductsService()


// Get Item List
router.get("/", async function(req, res, next) {
  let searchString = req.query.q
  try {
    const data = await productsService.getProductsList({searchString})
    res.send(
      {
          "author":{
          "name": "Giannina",
          "lastname": "Calcagno"},
          categories: data.categories,
          items: data.items,
          breadCrumbs: data.breadCrumbs
      }
  )
  } catch (err) {
    next(err)
  }
})



// Get Item Data
router.get("/:id", async function(req, res, next) {
  const { id } = req.params
  try {
    const item = await productsService.getProduct({id})
    res.send({
        "author":{
        "name": "Giannina",
        "lastname": "Calcagno"
      },
      item
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router