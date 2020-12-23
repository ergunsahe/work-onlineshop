const Product = require("../models/Product")
const {validationResult, check} = require("express-validator")
const checkError = require("../helper/checkError")

exports.addProduct = async (req, res) => {
    try {
        const {productName} = req.body

        //field validation
        const validationErr = validationResult(req)
        checkError(res, validationErr?.errors?.length > 0, validationErr.array())

        //product exist  check
        const existProduct = await Product.findOne({productName: productName})
        checkError(res, existProduct, "Product is already exist")

        //save product 
        const product = new Product(req.body)
        const addeProduct = await product.save({new:true})
        res.status(200).json(addeProduct)
    } catch (err) {
        checkError(res, err, err.message )
    }
    const {categoryName, description} = req.body;

}

exports.getProduct = async (req, res) => {
    
}
exports.updateProduct = async (req, res) => {

}
exports.deleteProduct = async (req, res) => {

}
exports.getProducts = async (req, res) => {

}