const Category = require("../models/Category")
const {validationResult} = require("express-validator")

exports.addCategory = async (req, res) => {
    try {
        //field validation
        const {categoryName, description} = req.body;
        const validationErr = validationResult(req)
        if (validationErr?.errors?.length > 0) {
            return res.status(400).json({errors:validationErr.array()})
        }
        // category exist check
        const existCategory = await Category.findOne({categoryName:categoryName});
        if (existCategory) {
            return res.status(400).json({errors:[{message: "Category already exist"}]})

        }
        
        //save category
        const category = new Category({
            categoryName,
            description,
        })
        // const category = new Category(req.body)

        const addedCategory = await category.save({new: true});

        // res.status(200).send("Category is added")
        res.status(200).json(addedCategory)

    } catch (error) {
        return res.status(500).json({errors: [{message: error.message}]})
    }
    
}

exports.getCategory = async (req, res) => {
    try {
        const category = await Category.findById({_id: req.params.id})
        res.status(200).json(category)
    } catch (error) {
        return res.status(500).json({errors: [{message:error.message}]})
    }
}




exports.updateCategory = async (req, res) => {
    try {
        //validation
        const validationErr = validationResult(req)
        if (validationErr?.errors?.length > 0) {
            return res.status(400).json({errors:validationErr.array()})
        }

        //update
        const updatedCategory = await Category.findOneAndUpdate(
            {_id:req.body.id},
            {
                // categoryName: req.body.categoryName,
                // description: req.body.description
                ...req.body,
                status: "updated",
                updateddate: Date.now
            },
            {
                new: true,
                runValidators: true
            }
        );
        // res.status(200).json("Category updated")
        res.status(200).json(updatedCategory)

    } catch (err) {
        return res.status(500).json({errors: [{message:err.message}]})
    }
}







exports.deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await Category.findOneAndUpdate(
            {_id:req.params.id},
            {
                status: "deteled",
                deletedDate: Date.now
            },
            {
                new: true,
            }
        );
        // res.status(200).json("Category deleted")
        res.status(200).json(deletedCategory)
    } catch (err) {
        return res.status(500).json({errors: [{message:err.message}]})
    }
}






exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find({}).where("status", /[^deleted]/).select("-status")
        res.status(200).json(categories)
    } catch (err) {
        return res.status(500).json({errors: [{message:err.message}]})
    }
}

exports.destroyCategory = async (req, res) =>{
    try {
        await Category.deleteOne({_id: req.params.id})
        res.status(200).send("Category is completly deleted")
    } catch (error) {
        return res.status(500).json({errors: [{message:err.message}]})
    }
}