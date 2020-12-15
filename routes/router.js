const express = require("express")
const CategoryRouter = require("./CategoryRouter")
const ProductRouter = require("./ProductRouter")
const router = express.Router()

router.use("/categories", CategoryRouter)
router.use("/products", ProductRouter)

module.exports = router