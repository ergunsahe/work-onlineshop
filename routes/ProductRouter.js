const express= require("express")
const router = express.Router()
const ProductController = require("../controllers/ProductController")
const {productValidation }= require("../middleware/validationMiddleware")

router.post("/addProduct", productValidation, ProductController.addProduct)

router.get("/getProduct/:id", ProductController.getProduct)

router.post("/updateProduct", ProductController.updateProduct)

router.get("/deleteProduct/:id", ProductController.deleteProduct)

router.get("/", ProductController.getProducts)

module.exports = router