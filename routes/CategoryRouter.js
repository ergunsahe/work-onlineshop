const express = require("express")
const CategoryController = require("../controllers/CategoryController")
const router = express.Router()

router.post("/addCategory", CategoryController.addCategory)

router.get("/getCategory/:id", CategoryController.getCategory)

router.post("/updateCategory", CategoryController.updateCategory)

router.get("/deleteCategory/:id", CategoryController.deleteCategory)

router.get("/", CategoryController.getCategories)

module.exports = router