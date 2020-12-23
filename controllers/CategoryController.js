const Category = require("../models/Category")
const {validationResult} = require("express-validator")
const checkError = require("../helper/checkError")

exports.addCategory = async (req, res) => {
    try {
        //field validation
        const {categoryName, description} = req.body;
        const validationErr = validationResult(req)
        checkError(res, validationErr?.errors?.length > 0, validationErr.array())
        
        // category exist check
        const existCategory = await Category.findOne({categoryName:categoryName});
        checkError(res, existCategory, "Category already exist")
        
        
        //save category
        const category = new Category(req.body)
        // const category = new Category(req.body)

        const addedCategory = await category.save({new: true});

        // res.status(200).send("Category is added")
        res.status(200).json(addedCategory)

    } catch (err) {
        checkError(res, err, err.message, 500)
        
    }
    
}

exports.getCategory = async (req, res) => {
    try {
        const category = await Category.findById({_id: req.params.id})
        res.status(200).json(category)
    } catch (err) {
        checkError(res, err, err.message, 500)
        
    }
}




exports.updateCategory = async (req, res) => {
    try {
        //validation
        const validationErr = validationResult(req)
        checkError(res, validationErr?.errors?.length > 0, validationErr.array())
        

        //update
        const updatedCategory = await Category.findOneAndUpdate(
            {_id:req.body.id},
            {
                // categoryName: req.body.categoryName,
                // description: req.body.description
                ...req.body,
                status: "updated",
                
            },
            {
                new: true,
                runValidators: true
            }
        );
        // res.status(200).json("Category updated")
        res.status(200).json(updatedCategory)

    } catch (err) {
        checkError(res, err, err.message, 500)
        
    }
}







exports.deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await Category.findOneAndUpdate(
            {_id:req.params.id},
            {
                status: "deteled",
                deletedAt: Date.now
            },
            {
                new: true,
            }
        );
        // res.status(200).json("Category deleted")
        res.status(200).json(deletedCategory)
    } catch (err) {
        checkError(res, err, err.message, 500)
        
    }
}






exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find({}).where("status", /[^deleted]/).select("-status")
        res.status(200).json(categories)
    } catch (err) {
        checkError(res, err, err.message, 500);
    }
}

exports.destroyCategory = async (req, res) =>{
    try {
        await Category.deleteOne({_id: req.params.id})
        res.status(200).send("Category is completely deleted")
    } catch (err) {
        checkError(res, err, err.message, 500);
    }
}


